import { supabase } from "@/integrations/supabase/client";
import { emptyTraining, type Aluno, type Progresso, type TreinoSemana } from "../types";
import {
  listStudentsAdminFn,
  listStudentsPublicFn,
  findStudentAdminFn,
  createStudentFn,
  updateStudentFn,
  deleteStudentFn,
} from "./students.functions";

/** Admin-only: full student rows. */
export async function listStudents(): Promise<Aluno[]> {
  return ((await listStudentsAdminFn()) ?? []) as Aluno[];
}

/** Public: id + nome only (used by the login dropdown). */
export async function listStudentsPublic(): Promise<Array<{ id: string; nome: string }>> {
  return (await listStudentsPublicFn()) ?? [];
}

export async function updateStudent(id: string, patch: Partial<Aluno>): Promise<void> {
  await updateStudentFn({ data: { id, patch: patch as any } });
}

export async function findStudent(id: string): Promise<Aluno | null> {
  return ((await findStudentAdminFn({ data: { id } })) as Aluno | null) ?? null;
}

export async function createStudent(
  nome: string,
  opts: { telefone?: string; valor_mensalidade?: number; dia_vencimento?: number } = {}
): Promise<Aluno> {
  const row = await createStudentFn({
    data: {
      nome,
      telefone: opts.telefone ?? null,
      valor_mensalidade: opts.valor_mensalidade,
      dia_vencimento: opts.dia_vencimento,
    },
  });
  return row as Aluno;
}

export async function deleteStudent(id: string): Promise<void> {
  await deleteStudentFn({ data: { id } });
}

export async function getTraining(alunoId: string): Promise<TreinoSemana> {
  const { data, error } = await supabase
    .from("treinos")
    .select("treino")
    .eq("aluno_id", alunoId)
    .maybeSingle();
  if (error) throw error;
  return ((data?.treino as unknown) as TreinoSemana) ?? emptyTraining();
}

export async function saveTraining(alunoId: string, treino: TreinoSemana): Promise<void> {
  const { error } = await supabase
    .from("treinos")
    .upsert(
      { aluno_id: alunoId, treino: treino as any, updated_at: new Date().toISOString() },
      { onConflict: "aluno_id" }
    );
  if (error) throw error;
}

export async function getProgress(alunoId: string): Promise<Progresso> {
  const { data, error } = await supabase
    .from("progresso")
    .select("progresso")
    .eq("aluno_id", alunoId)
    .maybeSingle();
  if (error) throw error;
  return ((data?.progresso as unknown) as Progresso) ?? {};
}

export async function saveProgress(alunoId: string, progresso: Progresso): Promise<void> {
  const { error } = await supabase
    .from("progresso")
    .upsert(
      { aluno_id: alunoId, progresso: progresso as any, updated_at: new Date().toISOString() },
      { onConflict: "aluno_id" }
    );
  if (error) throw error;
}

export async function getDefaultTraining(): Promise<TreinoSemana | null> {
  const { data, error } = await supabase
    .from("treinos_padroes")
    .select("treino")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw error;
  return data ? ((data.treino as unknown) as TreinoSemana) : null;
}

export async function saveDefaultTraining(treino: TreinoSemana): Promise<void> {
  const { error } = await supabase
    .from("treinos_padroes")
    .upsert(
      { id: 1, treino: treino as any, updated_at: new Date().toISOString() },
      { onConflict: "id" }
    );
  if (error) throw error;
}