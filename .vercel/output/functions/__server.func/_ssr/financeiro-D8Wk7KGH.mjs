import { c as createSsrRpc } from "./createSsrRpc-BaOR-_gw.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { o as objectType, s as stringType, b as booleanType, n as numberType, e as enumType } from "../_libs/zod.mjs";
const escopoSchema = enumType(["negocio", "pessoal"]);
const tipoSchema = enumType(["receita", "despesa"]);
const listLancamentosFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  escopo: escopoSchema.optional(),
  from: stringType().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  to: stringType().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
}).parse(input ?? {})).handler(createSsrRpc("da4fdd2e3dd0eb9172cd69eb4ecbdadb1d83906411e88569a28a3f9bb820b431"));
const addLancamentoFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  escopo: escopoSchema,
  tipo: tipoSchema,
  categoria: stringType().max(80).nullable().optional(),
  descricao: stringType().min(1).max(200),
  valor: numberType().min(0).max(1e7),
  data: stringType().regex(/^\d{4}-\d{2}-\d{2}$/),
  recorrente: booleanType().optional()
}).parse(input)).handler(createSsrRpc("c8b72510a5888c71dca4753f99b31f785e452b5c6846270bcef9a4b5ce5cee11"));
const deleteLancamentoFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(createSsrRpc("f01129b20a35d25968205742793dc69bd38297e752325fbdf03effdd31764dba"));
const listRecorrentesFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  escopo: escopoSchema.optional()
}).parse(input ?? {})).handler(createSsrRpc("d95f171a8fd74a4a03b29c88322b8fad2365704ad415851da78718eb12a8fdd8"));
const addRecorrenteFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  escopo: escopoSchema,
  descricao: stringType().min(1).max(200),
  categoria: stringType().max(80).nullable().optional(),
  valor: numberType().min(0).max(1e7),
  dia: numberType().int().min(1).max(28),
  ativo: booleanType().optional()
}).parse(input)).handler(createSsrRpc("f07bc71dad10e86811d8f9f20e18f28eef9d624b2e36ccdf18d4f0becfc8c183"));
const deleteRecorrenteFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(createSsrRpc("b841923b087b73d4a230490be354f87a330404df0878697ef733ebe2c6dbef97"));
const gerarRecorrentesDoMesFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  mes: stringType().regex(/^\d{4}-\d{2}$/)
}).parse(input)).handler(createSsrRpc("8fa1934202d659da526af248333e0ebdcfaa972f45831787fc41852b925577a5"));
async function listLancamentos(opts) {
  const rows = await listLancamentosFn({ data: opts ?? {} });
  return rows;
}
async function addLancamento(input) {
  await addLancamentoFn({
    data: {
      escopo: input.escopo,
      tipo: input.tipo,
      categoria: input.categoria ?? null,
      descricao: input.descricao,
      valor: Number(input.valor),
      data: input.data,
      recorrente: input.recorrente ?? false
    }
  });
}
async function deleteLancamento(id) {
  await deleteLancamentoFn({ data: { id } });
}
async function listRecorrentes(escopo) {
  const rows = await listRecorrentesFn({ data: { escopo } });
  return rows;
}
async function addRecorrente(input) {
  await addRecorrenteFn({
    data: {
      escopo: input.escopo,
      descricao: input.descricao,
      categoria: input.categoria ?? null,
      valor: Number(input.valor),
      dia: input.dia,
      ativo: input.ativo ?? true
    }
  });
}
async function deleteRecorrente(id) {
  await deleteRecorrenteFn({ data: { id } });
}
function mesAtual() {
  const d = /* @__PURE__ */ new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
async function gerarRecorrentesDoMes(mes = mesAtual()) {
  const res = await gerarRecorrentesDoMesFn({ data: { mes } });
  return res.criados;
}
function resumo(lanc) {
  let r = 0, d = 0;
  for (const l of lanc) {
    if (l.tipo === "receita") r += Number(l.valor);
    else d += Number(l.valor);
  }
  return { receitas: r, despesas: d, saldo: r - d };
}
function porDia(lanc) {
  const map = /* @__PURE__ */ new Map();
  for (const l of lanc) {
    const cur = map.get(l.data) ?? { data: l.data, receita: 0, despesa: 0 };
    if (l.tipo === "receita") cur.receita += Number(l.valor);
    else cur.despesa += Number(l.valor);
    map.set(l.data, cur);
  }
  return Array.from(map.values()).sort((a, b) => a.data.localeCompare(b.data));
}
export {
  deleteRecorrente as a,
  addLancamento as b,
  addRecorrente as c,
  deleteLancamento as d,
  listRecorrentes as e,
  gerarRecorrentesDoMes as g,
  listLancamentos as l,
  porDia as p,
  resumo as r
};
