import { dbError } from "@/lib/api/_errors";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdminSession } from "@/lib/admin-auth.server";
import { requireStudentSessionFor, requireAdminOrStudentSessionFor } from "@/lib/student-auth.server";

const ExSchema = z.object({
  name: z.string().min(1).max(300),
  series: z.union([z.string().max(40), z.number()]).optional(),
  reps: z.union([z.string().max(40), z.number()]).optional(),
});

export const registerCompletedSessionFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        alunoId: z.string().min(1).max(120),
        data: z.string().min(1).max(40),
        diaSemana: z.string().min(1).max(40),
        foco: z.string().max(300).nullable().optional(),
        exerciciosFeitos: z.array(ExSchema).max(200),
        totalExercicios: z.number().int().min(0).max(200),
        checkinId: z.string().max(120).nullable().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    await requireStudentSessionFor(data.alunoId);
    const { data: aluno } = await supabaseAdmin
      .from("alunos")
      .select("id")
      .eq("id", data.alunoId)
      .maybeSingle();
    if (!aluno) throw new Error("Aluno não encontrado");

    const { error } = await supabaseAdmin.from("treino_historico").upsert(
      {
        aluno_id: data.alunoId,
        data: data.data,
        dia_semana: data.diaSemana,
        foco: data.foco ?? null,
        exercicios_feitos: data.exerciciosFeitos as any,
        total_exercicios: data.totalExercicios,
        checkin_id: data.checkinId ?? null,
      },
      { onConflict: "aluno_id,data,dia_semana" },
    );
    if (error) throw dbError(error);
    return { ok: true };
  });

export const listHistoricoFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        alunoId: z.string().min(1).max(120),
        fromISO: z.string().min(1).max(40),
        toISO: z.string().min(1).max(40),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    await requireAdminOrStudentSessionFor(data.alunoId);
    const { data: rows, error } = await supabaseAdmin
      .from("treino_historico")
      .select("*")
      .eq("aluno_id", data.alunoId)
      .gte("data", data.fromISO)
      .lte("data", data.toISO)
      .order("data", { ascending: false });
    if (error) throw dbError(error);
    return rows ?? [];
  });

export const listHistoricoAllFn = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ alunoId: z.string().min(1).max(120) }).parse(input))
  .handler(async ({ data }) => {
    await requireAdminOrStudentSessionFor(data.alunoId);
    const { data: rows, error } = await supabaseAdmin
      .from("treino_historico")
      .select("*")
      .eq("aluno_id", data.alunoId)
      .order("data", { ascending: false })
      .limit(500);
    if (error) throw dbError(error);
    return rows ?? [];
  });

export const countHistoricoSinceFn = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ fromISO: z.string().min(1).max(40) }).parse(input))
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { count, error } = await supabaseAdmin
      .from("treino_historico")
      .select("*", { count: "exact", head: true })
      .gte("data", data.fromISO);
    if (error) throw dbError(error);
    return count ?? 0;
  });