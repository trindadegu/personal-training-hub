import { dbError } from "@/lib/api/_errors";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdminSession } from "@/lib/admin-auth.server";
import { requireStudentSessionFor, requireStudentSession } from "@/lib/student-auth.server";

async function withSignedUrls(rows: any[]) {
  const out = [];
  for (const r of rows) {
    const { data: signed } = await supabaseAdmin.storage
      .from("treino-pdfs")
      .createSignedUrl(r.storage_path, 60 * 60 * 6);
    out.push({ ...r, signed_url: signed?.signedUrl ?? null });
  }
  return out;
}

/** Admin: list PDFs of a given aluno. */
export const listPdfsAdminFn = createServerFn({ method: "POST" })
  .inputValidator((i) => z.object({ alunoId: z.string().min(1).max(120) }).parse(i))
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { data: rows, error } = await supabaseAdmin
      .from("treino_pdfs")
      .select("*")
      .eq("aluno_id", data.alunoId)
      .order("created_at", { ascending: false });
    if (error) throw dbError(error);
    return await withSignedUrls(rows ?? []);
  });

/** Student: list own PDFs. */
export const listMyPdfsFn = createServerFn({ method: "GET" }).handler(async () => {
  const session = await requireStudentSession();
  const { data: rows, error } = await supabaseAdmin
    .from("treino_pdfs")
    .select("*")
    .eq("aluno_id", session.data!.alunoId!)
    .order("created_at", { ascending: false });
  if (error) throw dbError(error);
  return await withSignedUrls(rows ?? []);
});

/** Admin: upload a new PDF for a student. */
export const uploadPdfAdminFn = createServerFn({ method: "POST" })
  .inputValidator((i) =>
    z
      .object({
        alunoId: z.string().min(1).max(120),
        nome: z.string().min(1).max(200),
        descricao: z.string().max(1000).optional().nullable(),
        base64: z.string().min(8).max(16_000_000), // ~12 MB
      })
      .parse(i),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const raw = data.base64.replace(/^data:[^;]+;base64,/, "");
    const bytes = Buffer.from(raw, "base64");
    const safeName = data.nome.replace(/[^a-zA-Z0-9_\-\. ]/g, "_");
    const path = `treinos/${data.alunoId}/${Date.now()}-${safeName}.pdf`;
    const { error: upErr } = await supabaseAdmin.storage
      .from("treino-pdfs")
      .upload(path, bytes, { contentType: "application/pdf", upsert: false });
    if (upErr) throw new Error(upErr.message);
    const { error } = await supabaseAdmin.from("treino_pdfs").insert({
      aluno_id: data.alunoId,
      nome: data.nome,
      descricao: data.descricao ?? null,
      storage_path: path,
      tamanho_bytes: bytes.length,
    });
    if (error) throw dbError(error);
    return { ok: true };
  });

/** Admin: delete a PDF. */
export const deletePdfAdminFn = createServerFn({ method: "POST" })
  .inputValidator((i) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { data: row } = await supabaseAdmin
      .from("treino_pdfs")
      .select("storage_path")
      .eq("id", data.id)
      .maybeSingle();
    if (row?.storage_path) {
      await supabaseAdmin.storage.from("treino-pdfs").remove([row.storage_path]);
    }
    const { error } = await supabaseAdmin.from("treino_pdfs").delete().eq("id", data.id);
    if (error) throw dbError(error);
    return { ok: true };
  });