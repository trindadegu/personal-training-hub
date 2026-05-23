import { listNotasFn, createNotaFn, deleteNotaFn } from "./notas.functions";

export interface Nota {
  id: string;
  aluno_id: string;
  data: string;
  titulo: string;
  conteudo: string;
  tipo: string;
  created_at: string;
}

export async function listNotas(alunoId: string): Promise<Nota[]> {
  return ((await listNotasFn({ data: { alunoId } })) ?? []) as Nota[];
}

export async function createNota(input: Omit<Nota, "id" | "created_at">): Promise<void> {
  await createNotaFn({ data: input });
}

export async function deleteNota(id: string): Promise<void> {
  await deleteNotaFn({ data: { id } });
}