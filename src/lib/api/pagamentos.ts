import { supabase } from "@/integrations/supabase/client";

export interface Pagamento {
  id: string;
  aluno_id: string;
  mes_referencia: string; // "YYYY-MM"
  valor: number;
  vencimento: string; // date
  status: "pago" | "pendente";
  pago_em: string | null;
  created_at: string;
}

export function mesAtual(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function mesLabel(mes: string): string {
  const [y, m] = mes.split("-");
  const d = new Date(Number(y), Number(m) - 1, 1);
  return d.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
}

export async function listPagamentos(filter?: { alunoId?: string; mes?: string }): Promise<Pagamento[]> {
  let q = supabase.from("pagamentos").select("*").order("vencimento", { ascending: false });
  if (filter?.alunoId) q = q.eq("aluno_id", filter.alunoId);
  if (filter?.mes) q = q.eq("mes_referencia", filter.mes);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Pagamento[];
}

export async function upsertPagamento(p: Omit<Pagamento, "id" | "created_at" | "pago_em" | "status"> & { status?: string }) {
  const { error } = await supabase
    .from("pagamentos")
    .upsert(p as any, { onConflict: "aluno_id,mes_referencia" });
  if (error) throw error;
}

export async function marcarPago(id: string, alunoId: string, valor: number, mes: string) {
  const today = new Date().toISOString().slice(0, 10);
  const { error } = await supabase
    .from("pagamentos")
    .update({ status: "pago", pago_em: today })
    .eq("id", id);
  if (error) throw error;
  // gera receita no financeiro do negócio
  await supabase.from("financeiro_lancamentos").insert({
    escopo: "negocio",
    tipo: "receita",
    categoria: "Mensalidade",
    descricao: `Mensalidade ${mes}`,
    valor,
    data: today,
    aluno_id: alunoId,
    pagamento_id: id,
  });
}

export async function marcarPendente(id: string) {
  const { error } = await supabase
    .from("pagamentos")
    .update({ status: "pendente", pago_em: null })
    .eq("id", id);
  if (error) throw error;
  await supabase.from("financeiro_lancamentos").delete().eq("pagamento_id", id);
}

/**
 * Garante que cada aluno tenha um pagamento gerado para o mês informado,
 * com base no valor_mensalidade e dia_vencimento do cadastro.
 */
export async function gerarMensalidadesDoMes(mes: string = mesAtual()): Promise<number> {
  const { data: alunos, error: e1 } = await supabase
    .from("alunos")
    .select("id, valor_mensalidade, dia_vencimento, status");
  if (e1) throw e1;

  const [y, m] = mes.split("-").map(Number);
  let criados = 0;

  for (const a of alunos ?? []) {
    if (a.status && a.status !== "ativo") continue;
    const valor = Number(a.valor_mensalidade ?? 0);
    if (!valor) continue;
    const dia = Math.min(Math.max(Number(a.dia_vencimento ?? 5), 1), 28);
    const venc = `${y}-${String(m).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

    const { data: existing } = await supabase
      .from("pagamentos")
      .select("id")
      .eq("aluno_id", a.id)
      .eq("mes_referencia", mes)
      .maybeSingle();
    if (existing) continue;

    const { error } = await supabase.from("pagamentos").insert({
      aluno_id: a.id,
      mes_referencia: mes,
      valor,
      vencimento: venc,
      status: "pendente",
    });
    if (!error) criados++;
  }
  return criados;
}