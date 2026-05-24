import { getConfigFn, setConfigFn } from "./config.functions";

export async function getConfig(chave: string): Promise<string | null> {
  return (await getConfigFn({ data: { chave } })) ?? null;
}

export async function setConfig(chave: string, valor: string): Promise<void> {
  await setConfigFn({ data: { chave, valor } });
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