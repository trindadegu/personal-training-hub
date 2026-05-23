import {
  listLancamentosFn,
  addLancamentoFn,
  deleteLancamentoFn,
  listRecorrentesFn,
  addRecorrenteFn,
  deleteRecorrenteFn,
  gerarRecorrentesDoMesFn,
} from "./financeiro.functions";

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
  const rows = await listLancamentosFn({ data: opts ?? {} });
  return rows as unknown as Lancamento[];
}

export async function addLancamento(input: Omit<Lancamento, "id" | "created_at" | "recorrente_id" | "aluno_id" | "pagamento_id"> & { recorrente?: boolean }) {
  await addLancamentoFn({
    data: {
      escopo: input.escopo,
      tipo: input.tipo,
      categoria: input.categoria ?? null,
      descricao: input.descricao,
      valor: Number(input.valor),
      data: input.data,
      recorrente: input.recorrente ?? false,
    },
  });
}

export async function deleteLancamento(id: string) {
  await deleteLancamentoFn({ data: { id } });
}

export async function listRecorrentes(escopo?: Escopo): Promise<Recorrente[]> {
  const rows = await listRecorrentesFn({ data: { escopo } });
  return rows as unknown as Recorrente[];
}

export async function addRecorrente(input: Omit<Recorrente, "id" | "created_at" | "ultimo_gerado_mes" | "ativo"> & { ativo?: boolean }) {
  await addRecorrenteFn({
    data: {
      escopo: input.escopo,
      descricao: input.descricao,
      categoria: input.categoria ?? null,
      valor: Number(input.valor),
      dia: input.dia,
      ativo: input.ativo ?? true,
    },
  });
}

export async function deleteRecorrente(id: string) {
  await deleteRecorrenteFn({ data: { id } });
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
  const res = await gerarRecorrentesDoMesFn({ data: { mes } });
  return res.criados;
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