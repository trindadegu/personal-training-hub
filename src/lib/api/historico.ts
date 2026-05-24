import type { DiaTreino, HistoricoEntry } from "../types";
import {
  registerCompletedSessionFn,
  listHistoricoFn,
  listHistoricoAllFn,
} from "./historico.functions";

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
  await registerCompletedSessionFn({
    data: {
      alunoId,
      data: todayDateOnly(),
      diaSemana,
      foco: dia.focus || null,
      exerciciosFeitos: exFeitos as any,
      totalExercicios: dia.exercises.length,
      checkinId: checkinId ?? null,
    },
  });
}

export async function listHistorico(
  alunoId: string,
  fromISO: string,
  toISO: string
): Promise<HistoricoEntry[]> {
  return ((await listHistoricoFn({ data: { alunoId, fromISO, toISO } })) ?? []) as HistoricoEntry[];
}

export async function listHistoricoAll(alunoId: string): Promise<HistoricoEntry[]> {
  return ((await listHistoricoAllFn({ data: { alunoId } })) ?? []) as HistoricoEntry[];
}