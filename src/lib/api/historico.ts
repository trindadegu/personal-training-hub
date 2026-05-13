import { supabase } from "@/integrations/supabase/client";
import type { DiaTreino, HistoricoEntry } from "../types";

function todayDateOnly(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

/**
 * Registra (ou atualiza, via upsert por aluno+data+dia) uma sessão de treino
 * concluída. Esta é a fonte do histórico mensal.
 */
export async function registerCompletedSession(params: {
  alunoId: string;
  diaSemana: string;
  dia: DiaTreino;
  exerciciosFeitosIdx: number[];
  checkinId?: string | null;
}): Promise<void> {
  const { alunoId, diaSemana, dia, exerciciosFeitosIdx, checkinId } = params;
  const exFeitos = exerciciosFeitosIdx
    .map((i) => dia.exercises[i])
    .filter(Boolean)
    .map((e) => ({ name: e.name, series: e.series, reps: e.reps }));

  const { error } = await supabase.from("treino_historico").upsert(
    {
      aluno_id: alunoId,
      data: todayDateOnly(),
      dia_semana: diaSemana,
      foco: dia.focus || null,
      exercicios_feitos: exFeitos as any,
      total_exercicios: dia.exercises.length,
      checkin_id: checkinId ?? null,
    },
    { onConflict: "aluno_id,data,dia_semana" }
  );
  if (error) throw error;
}

export async function listHistorico(
  alunoId: string,
  fromISO: string,
  toISO: string
): Promise<HistoricoEntry[]> {
  const { data, error } = await supabase
    .from("treino_historico")
    .select("*")
    .eq("aluno_id", alunoId)
    .gte("data", fromISO)
    .lte("data", toISO)
    .order("data", { ascending: false });
  if (error) throw error;
  return (data ?? []) as HistoricoEntry[];
}

export async function listHistoricoAll(alunoId: string): Promise<HistoricoEntry[]> {
  const { data, error } = await supabase
    .from("treino_historico")
    .select("*")
    .eq("aluno_id", alunoId)
    .order("data", { ascending: false })
    .limit(500);
  if (error) throw error;
  return (data ?? []) as HistoricoEntry[];
}