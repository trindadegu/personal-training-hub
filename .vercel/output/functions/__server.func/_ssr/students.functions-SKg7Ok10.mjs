import { c as createSsrRpc } from "./createSsrRpc-BaOR-_gw.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { o as objectType, s as stringType, n as numberType } from "../_libs/zod.mjs";
const PatchSchema = objectType({
  nome: stringType().min(1).max(200).optional(),
  telefone: stringType().max(40).nullable().optional(),
  valor_mensalidade: numberType().min(0).max(1e6).optional(),
  dia_vencimento: numberType().int().min(1).max(28).optional(),
  status: stringType().max(40).optional(),
  objetivo: stringType().max(2e3).nullable().optional(),
  observacoes: stringType().max(5e3).nullable().optional(),
  data_inicio: stringType().max(40).optional(),
  plano_id: stringType().uuid().nullable().optional(),
  meta_frequencia_semanal: numberType().int().min(0).max(7).optional(),
  meta_frequencia_mensal: numberType().int().min(0).max(31).optional()
}).strict();
const listStudentsAdminFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("f54e8129ac7fa59f145a4738547f4a82c9294925ec35d8444a2c1236773e620b"));
const listStudentsPublicFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("ef17b9cecf708b333c8d054b55bcf18b15f8f5c2700725f71c6c40f171417704"));
const findStudentAdminFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().min(1).max(120)
}).parse(input)).handler(createSsrRpc("eb7190b7ef4106bc36b6c977bc96b9ab525f6f32c98dbb23f36c60c5dec97fa3"));
const createStudentFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  nome: stringType().min(1).max(200),
  telefone: stringType().max(40).nullable().optional(),
  valor_mensalidade: numberType().min(0).max(1e6).optional(),
  dia_vencimento: numberType().int().min(1).max(28).optional(),
  plano_id: stringType().uuid().nullable().optional()
}).parse(input)).handler(createSsrRpc("2427a78193309e882e1a26540685c7befe6bc4203a39c0eb46d320ab3cf4866c"));
const updateStudentFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().min(1).max(120),
  patch: PatchSchema
}).parse(input)).handler(createSsrRpc("0ab2afe9f32f8e99ee1b1110caf6cd7ba7548568024da8d5967df6efd32211a5"));
const deleteStudentFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().min(1).max(120)
}).parse(input)).handler(createSsrRpc("eb10358c943e6b1a216b5c768be6db2f70454c77c050cf70aad1b0d22c852812"));
const lookupStudentLoginFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().min(1).max(120),
  password: stringType().min(1).max(120)
}).parse(input)).handler(createSsrRpc("097268f5367900d87a887aaaf1858e20a3968147ce3bc1a4d53ed2ec20c9dca8"));
const getStudentMeFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("2fb8a4a9682a36fb497c70ce0c2ca7bee74340886fd6e9c48687de1288cd56fb"));
const logoutStudentFn = createServerFn({
  method: "POST"
}).handler(createSsrRpc("0d4be5278d6792460fce198edc807ac4c38040b98e491c7269d9d6cf2cb819de"));
export {
  listStudentsAdminFn as a,
  logoutStudentFn as b,
  createStudentFn as c,
  deleteStudentFn as d,
  lookupStudentLoginFn as e,
  findStudentAdminFn as f,
  getStudentMeFn as g,
  listStudentsPublicFn as l,
  updateStudentFn as u
};
