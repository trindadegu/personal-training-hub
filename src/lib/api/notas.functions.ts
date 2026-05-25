import { dbError } from "@/lib/api/_errors";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdminSession } from "@/lib/admin-auth.server";

export const listNotasFn = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ alunoId: z.string().min(1).max(120) }).parse(input))
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { data: rows, error } = await supabaseAdmin
      .from("aluno_notas")
      .select("*")
      .eq("aluno_id", data.alunoId)
      .order("data", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) throw dbError(error);
    return rows ?? [];
  });

export const createNotaFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        aluno_id: z.string().min(1).max(120),
        data: z.string().min(1).max(40),
        titulo: z.string().min(1).max(300),
        conteudo: z.string().min(1).max(10000),
        tipo: z.string().min(1).max(40),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await supabaseAdmin.from("aluno_notas").insert(data);
    if (error) throw dbError(error);
    return { ok: true };
  });

export const deleteNotaFn = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ id: z.string().min(1).max(120) }).parse(input))
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await supabaseAdmin.from("aluno_notas").delete().eq("id", data.id);
    if (error) throw dbError(error);
    return { ok: true };
  });