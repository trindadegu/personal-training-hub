import { dbError } from "@/lib/api/_errors";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireStudentSession, requireAdminOrStudentSessionFor } from "@/lib/student-auth.server";

/** Student: own aluno row (full). */
export const myProfileFn = createServerFn({ method: "GET" }).handler(async () => {
  const session = await requireStudentSession();
  const id = session.data!.alunoId!;
  const { data, error } = await supabaseAdmin
    .from("alunos")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw dbError(error);
  return data;
});

/** Student: own plano (or null). */
export const myPlanoFn = createServerFn({ method: "GET" }).handler(async () => {
  const session = await requireStudentSession();
  const { data: aluno } = await supabaseAdmin
    .from("alunos")
    .select("plano_id")
    .eq("id", session.data!.alunoId!)
    .maybeSingle();
  if (!aluno?.plano_id) return null;
  const { data, error } = await supabaseAdmin
    .from("planos")
    .select("*")
    .eq("id", aluno.plano_id)
    .maybeSingle();
  if (error) throw dbError(error);
  return data;
});

/** Student: own pagamentos. */
export const myPagamentosFn = createServerFn({ method: "GET" }).handler(async () => {
  const session = await requireStudentSession();
  const { data, error } = await supabaseAdmin
    .from("pagamentos")
    .select("*")
    .eq("aluno_id", session.data!.alunoId!)
    .order("vencimento", { ascending: false });
  if (error) throw dbError(error);
  return data ?? [];
});

/** Student: own notas (read-only). */
export const myNotasFn = createServerFn({ method: "GET" }).handler(async () => {
  const session = await requireStudentSession();
  const { data, error } = await supabaseAdmin
    .from("aluno_notas")
    .select("*")
    .eq("aluno_id", session.data!.alunoId!)
    .order("data", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw dbError(error);
  return data ?? [];
});

/** Student: update own basic profile fields (telefone, objetivo). */
export const updateMyProfileFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        telefone: z.string().max(40).nullable().optional(),
        objetivo: z.string().max(2000).nullable().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const session = await requireStudentSession();
    const { error } = await supabaseAdmin
      .from("alunos")
      .update(data as any)
      .eq("id", session.data!.alunoId!);
    if (error) throw dbError(error);
    return { ok: true };
  });

/** Student: upload avatar (base64 data URL or raw base64 + mime). */
export const uploadMyAvatarFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        base64: z.string().min(8).max(8_000_000), // ~6MB
        mime: z.string().regex(/^image\/(png|jpeg|jpg|webp)$/),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const session = await requireStudentSession();
    const alunoId = session.data!.alunoId!;
    const ext = data.mime === "image/png" ? "png" : data.mime === "image/webp" ? "webp" : "jpg";
    const path = `avatars/${alunoId}.${ext}`;
    const bytes = Buffer.from(data.base64.replace(/^data:[^;]+;base64,/, ""), "base64");
    const { error: upErr } = await supabaseAdmin.storage
      .from("treino-pdfs")
      .upload(path, bytes, { contentType: data.mime, upsert: true });
    if (upErr) throw new Error(upErr.message);
    const { error: e2 } = await supabaseAdmin
      .from("alunos")
      .update({ foto_url: path } as any)
      .eq("id", alunoId);
    if (e2) throw dbError(e2);
    return { ok: true, path };
  });

/** Signed URL helper for the avatar of a given aluno (used by admin/student UI). */
export const avatarSignedUrlFn = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ alunoId: z.string().min(1).max(120) }).parse(input))
  .handler(async ({ data }) => {
    await requireAdminOrStudentSessionFor(data.alunoId);
    const { data: row } = await supabaseAdmin
      .from("alunos")
      .select("foto_url")
      .eq("id", data.alunoId)
      .maybeSingle();
    const path = (row as any)?.foto_url as string | null | undefined;
    if (!path) return null;
    const { data: signed, error } = await supabaseAdmin.storage
      .from("treino-pdfs")
      .createSignedUrl(path, 60 * 60 * 24);
    if (error) return null;
    return signed?.signedUrl ?? null;
  });