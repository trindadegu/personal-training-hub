import { dbError } from "@/lib/api/_errors";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdminSession } from "@/lib/admin-auth.server";
import { requireStudentSessionFor, requireAdminOrStudentSessionFor } from "@/lib/student-auth.server";

const AlunoIdSchema = z.object({ alunoId: z.string().min(1).max(120) });

export const getTrainingFn = createServerFn({ method: "POST" })
  .inputValidator((input) => AlunoIdSchema.parse(input))
  .handler(async ({ data }) => {
    await requireAdminOrStudentSessionFor(data.alunoId);
    const { data: row, error } = await supabaseAdmin
      .from("treinos")
      .select("treino")
      .eq("aluno_id", data.alunoId)
      .maybeSingle();
    if (error) throw dbError(error);
    return row?.treino ?? null;
  });

export const saveTrainingFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        alunoId: z.string().min(1).max(120),
        treino: z.any(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await supabaseAdmin
      .from("treinos")
      .upsert(
        { aluno_id: data.alunoId, treino: data.treino, updated_at: new Date().toISOString() },
        { onConflict: "aluno_id" },
      );
    if (error) throw dbError(error);
    return { ok: true };
  });

export const getProgressFn = createServerFn({ method: "POST" })
  .inputValidator((input) => AlunoIdSchema.parse(input))
  .handler(async ({ data }) => {
    await requireAdminOrStudentSessionFor(data.alunoId);
    const { data: row, error } = await supabaseAdmin
      .from("progresso")
      .select("progresso")
      .eq("aluno_id", data.alunoId)
      .maybeSingle();
    if (error) throw dbError(error);
    return row?.progresso ?? {};
  });

const MAX_JSON_BYTES = 50_000;
const boundedJson = z.any().superRefine((val, ctx) => {
  try {
    if (JSON.stringify(val ?? {}).length > MAX_JSON_BYTES) {
      ctx.addIssue({ code: "custom", message: "Payload too large" });
    }
  } catch {
    ctx.addIssue({ code: "custom", message: "Invalid payload" });
  }
});

export const saveProgressFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        alunoId: z.string().min(1).max(120),
        progresso: boundedJson,
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    // Only the signed-in student can write their own progress.
    await requireStudentSessionFor(data.alunoId);
    // Validate the aluno exists to prevent garbage rows
    const { data: aluno } = await supabaseAdmin
      .from("alunos")
      .select("id")
      .eq("id", data.alunoId)
      .maybeSingle();
    if (!aluno) throw new Error("Aluno não encontrado");
    const { error } = await supabaseAdmin
      .from("progresso")
      .upsert(
        {
          aluno_id: data.alunoId,
          progresso: data.progresso,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "aluno_id" },
      );
    if (error) throw dbError(error);
    return { ok: true };
  });

export const getDefaultTrainingFn = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("treinos_padroes")
    .select("treino")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw dbError(error);
  return data?.treino ?? null;
});

export const saveDefaultTrainingFn = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ treino: z.any() }).parse(input))
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await supabaseAdmin
      .from("treinos_padroes")
      .upsert(
        { id: 1, treino: data.treino, updated_at: new Date().toISOString() },
        { onConflict: "id" },
      );
    if (error) throw dbError(error);
    return { ok: true };
  });