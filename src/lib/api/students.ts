import { emptyTraining, type Aluno, type Progresso, type TreinoSemana } from "../types";
import {
  listStudentsAdminFn,
  listStudentsPublicFn,
  findStudentAdminFn,
  createStudentFn,
  updateStudentFn,
  deleteStudentFn,
} from "./students.functions";
import {
  getTrainingFn,
  saveTrainingFn,
  getProgressFn,
  saveProgressFn,
  getDefaultTrainingFn,
  saveDefaultTrainingFn,
} from "./training.functions";

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
  opts: {
    telefone?: string;
    valor_mensalidade?: number;
    dia_vencimento?: number;
    plano_id?: string | null;
  } = {}
): Promise<Aluno> {
  const row = await createStudentFn({
    data: {
      nome,
      telefone: opts.telefone ?? null,
      valor_mensalidade: opts.valor_mensalidade,
      dia_vencimento: opts.dia_vencimento,
      plano_id: opts.plano_id ?? null,
    },
  });
  return row as Aluno;
}

export async function deleteStudent(id: string): Promise<void> {
  await deleteStudentFn({ data: { id } });
}

export async function getTraining(alunoId: string): Promise<TreinoSemana> {
  const treino = await getTrainingFn({ data: { alunoId } });
  return ((treino as unknown) as TreinoSemana) ?? emptyTraining();
}

export async function saveTraining(alunoId: string, treino: TreinoSemana): Promise<void> {
  await saveTrainingFn({ data: { alunoId, treino: treino as any } });
}

export async function getProgress(alunoId: string): Promise<Progresso> {
  const p = await getProgressFn({ data: { alunoId } });
  return ((p as unknown) as Progresso) ?? {};
}

export async function saveProgress(alunoId: string, progresso: Progresso): Promise<void> {
  await saveProgressFn({ data: { alunoId, progresso: progresso as any } });
}

export async function getDefaultTraining(): Promise<TreinoSemana | null> {
  const treino = await getDefaultTrainingFn();
  return treino ? ((treino as unknown) as TreinoSemana) : null;
}

export async function saveDefaultTraining(treino: TreinoSemana): Promise<void> {
  await saveDefaultTrainingFn({ data: { treino: treino as any } });
}