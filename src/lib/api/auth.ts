import { supabase } from "@/integrations/supabase/client";

export async function loginAdmin(username: string, password: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("admin_credentials")
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw error;
  if (!data) return false;
  return data.username === username && data.password === password;
}

export async function getAdminConfig() {
  const { data, error } = await supabase
    .from("admin_credentials")
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function updateAdminConfig(params: {
  username: string;
  password: string;
  whatsapp: string;
}) {
  const { error } = await supabase
    .from("admin_credentials")
    .update({ ...params, updated_at: new Date().toISOString() })
    .eq("id", 1);
  if (error) throw error;
}

export async function loginStudent(id: string, password: string) {
  const { data, error } = await supabase
    .from("alunos")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  if (id.slice(-6) !== password) return null;
  return data;
}