import { c as createSsrRpc } from "./createSsrRpc-BaOR-_gw.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { o as objectType, s as stringType, n as numberType } from "../_libs/zod.mjs";
const listPagamentosFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().max(120).optional(),
  mes: stringType().regex(/^\d{4}-\d{2}$/).optional()
}).parse(input ?? {})).handler(createSsrRpc("0eb7b6a9c4fac9ac77f8f86f40dffe2fbad1ef5ffe618d4f2312c8e8e249d47b"));
createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  aluno_id: stringType().min(1).max(120),
  mes_referencia: stringType().regex(/^\d{4}-\d{2}$/),
  valor: numberType().min(0).max(1e6),
  vencimento: stringType().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: stringType().max(20).optional()
}).parse(input)).handler(createSsrRpc("0b5fa4915a63e58ad9e45d1448a2717500f826aef783b374b2900b9fc0268d93"));
const marcarPagoFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().uuid(),
  alunoId: stringType().min(1).max(120),
  valor: numberType().min(0).max(1e6),
  mes: stringType().regex(/^\d{4}-\d{2}$/)
}).parse(input)).handler(createSsrRpc("7d2b1cbab6355bf19ba4d1b32453189c55e8c504215380708aae696ff0873520"));
const marcarPendenteFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(createSsrRpc("79e43bd6a3acf29bdafd35c9e8c52acf33292e7f663cdc467ed22203a47f7318"));
const gerarMensalidadesDoMesFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  mes: stringType().regex(/^\d{4}-\d{2}$/)
}).parse(input)).handler(createSsrRpc("7a339db76ac6f3c49de9bda62c55cad9ba502cf43567ec924d4cea59cacd5968"));
function mesAtual() {
  const d = /* @__PURE__ */ new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function mesLabel(mes) {
  const [y, m] = mes.split("-");
  const d = new Date(Number(y), Number(m) - 1, 1);
  return d.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
}
async function listPagamentos(filter) {
  const rows = await listPagamentosFn({ data: filter ?? {} });
  return rows;
}
async function marcarPago(id, alunoId, valor, mes) {
  await marcarPagoFn({ data: { id, alunoId, valor: Number(valor), mes } });
}
async function marcarPendente(id) {
  await marcarPendenteFn({ data: { id } });
}
async function gerarMensalidadesDoMes(mes = mesAtual()) {
  const res = await gerarMensalidadesDoMesFn({ data: { mes } });
  return res.criados;
}
export {
  mesAtual as a,
  marcarPago as b,
  marcarPendente as c,
  gerarMensalidadesDoMes as g,
  listPagamentos as l,
  mesLabel as m
};
