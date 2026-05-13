import { supabase } from "@/integrations/supabase/client";
import { emptyTraining, type Aluno, type Progresso, type TreinoSemana } from "../types";

export async function listStudents(): Promise<Aluno[]> {
  const { data, error } = await supabase.from("alunos").select("*").order("nome");
  if (error) throw error;
  return (data ?? []) as Aluno[];
}

export async function findStudent(id: string): Promise<Aluno | null> {
  const { data, error } = await supabase.from("alunos").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as Aluno) ?? null;
}

export async function createStudent(nome: string, telefone?: string): Promise<Aluno> {
  const id = "aluno_" + Date.now();
  const { data, error } = await supabase
    .from("alunos")
    .insert({ id, nome, telefone: telefone || null })
    .select()
    .single();
  if (error) throw error;
  await supabase.from("treinos").insert({ aluno_id: id, treino: emptyTraining() as any });
  return data as Aluno;
}

export async function deleteStudent(id: string): Promise<void> {
  const { error } = await supabase.from("alunos").delete().eq("id", id);
  if (error) throw error;
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