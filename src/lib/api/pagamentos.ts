import {
  listPagamentosFn,
  upsertPagamentoFn,
  marcarPagoFn,
  marcarPendenteFn,
  gerarMensalidadesDoMesFn,
} from "./pagamentos.functions";

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
  const rows = await listPagamentosFn({ data: filter ?? {} });
  return rows as unknown as Pagamento[];
}

export async function upsertPagamento(p: Omit<Pagamento, "id" | "created_at" | "pago_em" | "status"> & { status?: string }) {
  await upsertPagamentoFn({
    data: {
      aluno_id: p.aluno_id,
      mes_referencia: p.mes_referencia,
      valor: Number(p.valor),
      vencimento: p.vencimento,
      status: p.status,
    },
  });
}

export async function marcarPago(id: string, alunoId: string, valor: number, mes: string) {
  await marcarPagoFn({ data: { id, alunoId, valor: Number(valor), mes } });
}

export async function marcarPendente(id: string) {
  await marcarPendenteFn({ data: { id } });
}

/**
 * Garante que cada aluno tenha um pagamento gerado para o mês informado,
 * com base no valor_mensalidade e dia_vencimento do cadastro.
 */
export async function gerarMensalidadesDoMes(mes: string = mesAtual()): Promise<number> {
  const res = await gerarMensalidadesDoMesFn({ data: { mes } });
  return res.criados;
}