import { c as createSsrRpc } from "./createSsrRpc-BaOR-_gw.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { o as objectType, s as stringType, n as numberType, c as arrayType, u as unionType } from "../_libs/zod.mjs";
const ExSchema = objectType({
  name: stringType().min(1).max(300),
  series: unionType([stringType().max(40), numberType()]).optional(),
  reps: unionType([stringType().max(40), numberType()]).optional()
});
const registerCompletedSessionFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120),
  data: stringType().min(1).max(40),
  diaSemana: stringType().min(1).max(40),
  foco: stringType().max(300).nullable().optional(),
  exerciciosFeitos: arrayType(ExSchema).max(200),
  totalExercicios: numberType().int().min(0).max(200),
  checkinId: stringType().max(120).nullable().optional()
}).parse(input)).handler(createSsrRpc("f4b5c4fd0fd59023c094a8c6a1c10e161856190931b5ae11fcc07e7d6fa010cc"));
const listHistoricoFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120),
  fromISO: stringType().min(1).max(40),
  toISO: stringType().min(1).max(40)
}).parse(input)).handler(createSsrRpc("a7502540880fb29c6ec2143b6457156004b0fe21d900c4df03a826ed545b4c94"));
const listHistoricoAllFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120)
}).parse(input)).handler(createSsrRpc("5831aa41161c64bc519a1ee873ab62e6b26baa6074bdff2ddf5328908dcb6e3b"));
const countHistoricoSinceFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  fromISO: stringType().min(1).max(40)
}).parse(input)).handler(createSsrRpc("fa55cdea767cd45c1c4e63cc2007972fc95c5f1160c6d5e2233f0da1a0d6ca14"));
export {
  listHistoricoAllFn as a,
  countHistoricoSinceFn as c,
  listHistoricoFn as l,
  registerCompletedSessionFn as r
};
