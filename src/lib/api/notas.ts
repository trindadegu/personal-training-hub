import { supabase } from "@/integrations/supabase/client";

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
  const { data, error } = await supabase
    .from("aluno_notas")
    .select("*")
    .eq("aluno_id", alunoId)
    .order("data", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Nota[];
}

export async function createNota(input: Omit<Nota, "id" | "created_at">): Promise<void> {
  const { error } = await supabase.from("aluno_notas").insert(input);
  if (error) throw error;
}

export async function deleteNota(id: string): Promise<void> {
  const { error } = await supabase.from("aluno_notas").delete().eq("id", id);
  if (error) throw error;
}