import { dbError } from "@/lib/api/_errors";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdminSession } from "@/lib/admin-auth.server";

/** Aluno: estatísticas de frequência (semana, mês, sequência). */
export const statsAlunoFn = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ alunoId: z.string().min(1).max(120) }).parse(input))
  .handler(async ({ data }) => {
    // Aluno + meta
    const { data: aluno, error: eA } = await supabaseAdmin
      .from("alunos")
      .select("meta_frequencia_semanal, meta_frequencia_mensal")
      .eq("id", data.alunoId)
      .maybeSingle();
    if (eA) throw dbError(eA);

    // Pega últimos 60 dias de check-ins
    const since = new Date();
    since.setDate(since.getDate() - 60);
    const { data: rows, error } = await supabaseAdmin
      .from("checkins")
      .select("created_at")
      .eq("aluno_id", data.alunoId)
      .gte("created_at", since.toISOString())
      .order("created_at", { ascending: false });
    if (error) throw dbError(error);

    // Semana atual (segunda → domingo)
    const now = new Date();
    const dow = now.getDay(); // 0=dom
    const segundaOffset = dow === 0 ? -6 : 1 - dow;
    const startSemana = new Date(now);
    startSemana.setDate(now.getDate() + segundaOffset);
    startSemana.setHours(0, 0, 0, 0);

    const startMes = new Date(now.getFullYear(), now.getMonth(), 1);

    const dias = new Set<string>();
    let semana = 0;
    let mes = 0;
    for (const r of rows ?? []) {
      const d = new Date(r.created_at);
      dias.add(d.toISOString().slice(0, 10));
      if (d >= startSemana) semana++;
      if (d >= startMes) mes++;
    }

    // Streak: dias consecutivos até hoje/ontem
    let streak = 0;
    const cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    // Permite começar de ontem se ainda não treinou hoje
    if (!dias.has(cursor.toISOString().slice(0, 10))) {
      cursor.setDate(cursor.getDate() - 1);
    }
    while (dias.has(cursor.toISOString().slice(0, 10))) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }

    return {
      semana,
      mes,
      streak,
      meta_semanal: aluno?.meta_frequencia_semanal ?? 4,
      meta_mensal: aluno?.meta_frequencia_mensal ?? 16,
    };
  });

/** Admin: alunos em risco (sem check-in há X dias). */
export const alunosEmRiscoFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({ diasSemCheckin: z.number().int().min(1).max(90).optional() }).parse(input ?? {}),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const limite = data.diasSemCheckin ?? 7;
    const { data: alunos, error } = await supabaseAdmin
      .from("alunos")
      .select("id, nome, telefone, status");
    if (error) throw dbError(error);
    const since = new Date();
    since.setDate(since.getDate() - limite);

    const result: Array<{
      id: string;
      nome: string;
      telefone: string | null;
      dias_sem_treinar: number;
    }> = [];

    for (const a of alunos ?? []) {
      if (a.status && a.status !== "ativo") continue;
      const { data: ultimo } = await supabaseAdmin
        .from("checkins")
        .select("created_at")
        .eq("aluno_id", a.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      const ultimoDate = ultimo?.created_at ? new Date(ultimo.created_at) : null;
      const dias = ultimoDate
        ? Math.floor((Date.now() - ultimoDate.getTime()) / 86400000)
        : 999;
      if (dias >= limite) {
        result.push({
          id: a.id,
          nome: a.nome,
          telefone: a.telefone ?? null,
          dias_sem_treinar: dias,
        });
      }
    }
    return result.sort((a, b) => b.dias_sem_treinar - a.dias_sem_treinar);
  });