import { dbError } from "@/lib/api/_errors";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdminSession } from "@/lib/admin-auth.server";

const PatchSchema = z
  .object({
    nome: z.string().min(1).max(200).optional(),
    telefone: z.string().max(40).nullable().optional(),
    valor_mensalidade: z.number().min(0).max(1_000_000).optional(),
    dia_vencimento: z.number().int().min(1).max(28).optional(),
    status: z.string().max(40).optional(),
    objetivo: z.string().max(2000).nullable().optional(),
    observacoes: z.string().max(5000).nullable().optional(),
    data_inicio: z.string().max(40).optional(),
  })
  .strict();

/** Admin: full student list (all columns). */
export const listStudentsAdminFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  const { data, error } = await supabaseAdmin.from("alunos").select("*").order("nome");
  if (error) throw dbError(error);
  return data ?? [];
});

/** Public: only id + nome, used by the login dropdown. */
export const listStudentsPublicFn = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("alunos")
    .select("id, nome")
    .order("nome");
  if (error) throw dbError(error);
  return (data ?? []) as Array<{ id: string; nome: string }>;
});

export const findStudentAdminFn = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ id: z.string().min(1).max(120) }).parse(input))
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { data: row, error } = await supabaseAdmin
      .from("alunos")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw dbError(error);
    return row;
  });

export const createStudentFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        nome: z.string().min(1).max(200),
        telefone: z.string().max(40).nullable().optional(),
        valor_mensalidade: z.number().min(0).max(1_000_000).optional(),
        dia_vencimento: z.number().int().min(1).max(28).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const id = "aluno_" + Date.now();
    const { data: row, error } = await supabaseAdmin
      .from("alunos")
      .insert({
        id,
        nome: data.nome,
        telefone: data.telefone ?? null,
        valor_mensalidade: data.valor_mensalidade ?? 0,
        dia_vencimento: data.dia_vencimento ?? 5,
      })
      .select()
      .single();
    if (error) throw dbError(error);
    await supabaseAdmin.from("treinos").insert({ aluno_id: id, treino: {} as any });
    return row;
  });

export const updateStudentFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({ id: z.string().min(1).max(120), patch: PatchSchema }).parse(input),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await supabaseAdmin
      .from("alunos")
      .update(data.patch as any)
      .eq("id", data.id);
    if (error) throw dbError(error);
    return { ok: true };
  });

export const deleteStudentFn = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ id: z.string().min(1).max(120) }).parse(input))
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await supabaseAdmin.from("alunos").delete().eq("id", data.id);
    if (error) throw dbError(error);
    return { ok: true };
  });

/** Public: used by student login. Returns minimal info if the id exists. */
export const lookupStudentLoginFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        id: z.string().min(1).max(120),
        password: z.string().min(1).max(120),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    // Server-side password verification. The student "password" is the last
    // 6 characters of their id. Verifying here prevents the client-side
    // check from being bypassed by calling this endpoint directly.
    const expected = data.id.slice(-6);
    if (data.password !== expected) return null;
    const { data: row, error } = await supabaseAdmin
      .from("alunos")
      .select("id, nome")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw dbError(error);
    return row as { id: string; nome: string } | null;
  });