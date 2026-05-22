import { supabase } from "@/integrations/supabase/client";

export async function getConfig(chave: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("configuracoes")
    .select("valor")
    .eq("chave", chave)
    .maybeSingle();
  if (error) throw error;
  return data?.valor ?? null;
}

export async function setConfig(chave: string, valor: string): Promise<void> {
  const { error } = await supabase
    .from("configuracoes")
    .upsert({ chave, valor, updated_at: new Date().toISOString() }, { onConflict: "chave" });
  if (error) throw error;
}

export function onlyDigits(s: string | null | undefined): string {
  return (s ?? "").replace(/\D/g, "");
}

export function whatsappLink(telefone: string, mensagem: string): string {
  const phone = onlyDigits(telefone);
  const full = phone.length <= 11 ? `55${phone}` : phone;
  return `https://wa.me/${full}?text=${encodeURIComponent(mensagem)}`;
}

export function formatBRL(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatDateBR(d: string): string {
  const [y, m, day] = d.split("-");
  if (!y || !m || !day) return d;
  return `${day}/${m}/${y}`;
}