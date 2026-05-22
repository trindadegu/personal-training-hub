import { supabase } from "@/integrations/supabase/client";

export type Escopo = "negocio" | "pessoal";
export type TipoLanc = "receita" | "despesa";

export interface Lancamento {
  id: string;
  escopo: Escopo;
  tipo: TipoLanc;
  categoria: string | null;
  descricao: string;
  valor: number;
  data: string;
  recorrente: boolean;
  recorrente_id: string | null;
  aluno_id: string | null;
  pagamento_id: string | null;
  created_at: string;
}

export interface Recorrente {
  id: string;
  escopo: Escopo;
  descricao: string;
  categoria: string | null;
  valor: number;
  dia: number;
  ativo: boolean;
  ultimo_gerado_mes: string | null;
  created_at: string;
}

export async function listLancamentos(opts?: { escopo?: Escopo; from?: string; to?: string }) {
  let q = supabase.from("financeiro_lancamentos").select("*").order("data", { ascending: false });
  if (opts?.escopo) q = q.eq("escopo", opts.escopo);
  if (opts?.from) q = q.gte("data", opts.from);
  if (opts?.to) q = q.lte("data", opts.to);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Lancamento[];
}

export async function addLancamento(input: Omit<Lancamento, "id" | "created_at" | "recorrente_id" | "aluno_id" | "pagamento_id"> & { recorrente?: boolean }) {
  const { error } = await supabase.from("financeiro_lancamentos").insert({
    ...input,
    recorrente: input.recorrente ?? false,
  });
  if (error) throw error;
}

export async function deleteLancamento(id: string) {
  const { error } = await supabase.from("financeiro_lancamentos").delete().eq("id", id);
  if (error) throw error;
}

export async function listRecorrentes(escopo?: Escopo): Promise<Recorrente[]> {
  let q = supabase.from("despesas_recorrentes").select("*").order("dia");
  if (escopo) q = q.eq("escopo", escopo);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Recorrente[];
}

export async function addRecorrente(input: Omit<Recorrente, "id" | "created_at" | "ultimo_gerado_mes" | "ativo"> & { ativo?: boolean }) {
  const { error } = await supabase.from("despesas_recorrentes").insert({
    ...input,
    ativo: input.ativo ?? true,
  });
  if (error) throw error;
}

export async function deleteRecorrente(id: string) {
  const { error } = await supabase.from("despesas_recorrentes").delete().eq("id", id);
  if (error) throw error;
}

export function mesAtual(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

/**
 * Gera os lançamentos das despesas recorrentes para o mês informado se
 * ainda não foram geradas. Chamado uma vez na entrada do financeiro.
 */
export async function gerarRecorrentesDoMes(mes: string = mesAtual()): Promise<number> {
  const recs = await listRecorrentes();
  const [y, m] = mes.split("-").map(Number);
  let criados = 0;
  for (const r of recs) {
    if (!r.ativo) continue;
    if (r.ultimo_gerado_mes === mes) continue;
    const dia = Math.min(Math.max(r.dia, 1), 28);
    const data = `${y}-${String(m).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
    const { error } = await supabase.from("financeiro_lancamentos").insert({
      escopo: r.escopo,
      tipo: "despesa",
      categoria: r.categoria,
      descricao: r.descricao,
      valor: r.valor,
      data,
      recorrente: true,
      recorrente_id: r.id,
    });
    if (!error) {
      await supabase.from("despesas_recorrentes").update({ ultimo_gerado_mes: mes }).eq("id", r.id);
      criados++;
    }
  }
  return criados;
}

export interface ResumoMes {
  receitas: number;
  despesas: number;
  saldo: number;
}

export function resumo(lanc: Lancamento[]): ResumoMes {
  let r = 0, d = 0;
  for (const l of lanc) {
    if (l.tipo === "receita") r += Number(l.valor);
    else d += Number(l.valor);
  }
  return { receitas: r, despesas: d, saldo: r - d };
}

/** Agrupa por dia para o gráfico de faturamento. */
export function porDia(lanc: Lancamento[]) {
  const map = new Map<string, { data: string; receita: number; despesa: number }>();
  for (const l of lanc) {
    const cur = map.get(l.data) ?? { data: l.data, receita: 0, despesa: 0 };
    if (l.tipo === "receita") cur.receita += Number(l.valor);
    else cur.despesa += Number(l.valor);
    map.set(l.data, cur);
  }
  return Array.from(map.values()).sort((a, b) => a.data.localeCompare(b.data));
}