import { emptyTraining, type Aluno, type Progresso, type TreinoSemana } from "../types";

async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || `HTTP error! status: ${res.status}`)
  }
  if (res.status === 204) return null
  return res.json()
}

/** Admin-only: full student rows. */
export async function listStudents(): Promise<Aluno[]> {
  return apiFetch('/api/alunos')
}

/** Public: id + nome only (used by the login dropdown). */
export async function listStudentsPublic(): Promise<Array<{ id: string; nome: string }>> {
  // Para manter compatibilidade enquanto não criamos uma rota pública específica,
  // podemos usar a mesma rota, mas o backend precisaria permitir acesso público a id/nome.
  // Por agora, vamos assumir que o admin está logado ou que adaptaremos a rota.
  return apiFetch('/api/alunos')
}

export async function updateStudent(id: string, patch: Partial<Aluno>): Promise<void> {
  await apiFetch(`/api/alunos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(patch),
  })
}

export async function findStudent(id: string): Promise<Aluno | null> {
  return apiFetch(`/api/alunos/${id}`)
}

export async function createStudent(
  nome: string,
  opts: { telefone?: string; valor_mensalidade?: number; dia_vencimento?: number } = {}
): Promise<Aluno> {
  return apiFetch('/api/alunos', {
    method: 'POST',
    body: JSON.stringify({
      nome,
      telefone: opts.telefone,
      valor_mensalidade: opts.valor_mensalidade,
      dia_vencimento: opts.dia_vencimento,
    }),
  })
}

export async function deleteStudent(id: string): Promise<void> {
  await apiFetch(`/api/alunos/${id}`, {
    method: 'DELETE',
  })
}

export async function getTraining(alunoId: string): Promise<TreinoSemana> {
  const data = await apiFetch(`/api/treinos?alunoId=${alunoId}`)
  return (data?.treino as TreinoSemana) ?? emptyTraining()
}

export async function saveTraining(alunoId: string, treino: TreinoSemana): Promise<void> {
  await apiFetch('/api/treinos', {
    method: 'PUT',
    body: JSON.stringify({ aluno_id: alunoId, treino }),
  })
}

export async function getProgress(alunoId: string): Promise<Progresso> {
  // Rota de progresso pode ser integrada ao histórico ou ter sua própria
  const data = await apiFetch(`/api/treinos?alunoId=${alunoId}`)
  return (data?.progresso as Progresso) ?? {}
}

export async function saveProgress(alunoId: string, progresso: Progresso): Promise<void> {
  await apiFetch('/api/treinos', {
    method: 'PUT',
    body: JSON.stringify({ aluno_id: alunoId, progresso }),
  })
}

export async function getDefaultTraining(): Promise<TreinoSemana | null> {
  // Implementar se necessário
  return null
}

export async function saveDefaultTraining(treino: TreinoSemana): Promise<void> {
  // Implementar se necessário
}
