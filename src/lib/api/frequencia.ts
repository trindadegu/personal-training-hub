import { statsAlunoFn, alunosEmRiscoFn } from "./frequencia.functions";

export interface FrequenciaStats {
  semana: number;
  mes: number;
  streak: number;
  meta_semanal: number;
  meta_mensal: number;
}

export interface AlunoEmRisco {
  id: string;
  nome: string;
  telefone: string | null;
  dias_sem_treinar: number;
}

export async function statsAluno(alunoId: string): Promise<FrequenciaStats> {
  return (await statsAlunoFn({ data: { alunoId } })) as FrequenciaStats;
}

export async function alunosEmRisco(diasSemCheckin = 7): Promise<AlunoEmRisco[]> {
  return ((await alunosEmRiscoFn({ data: { diasSemCheckin } })) ?? []) as AlunoEmRisco[];
}