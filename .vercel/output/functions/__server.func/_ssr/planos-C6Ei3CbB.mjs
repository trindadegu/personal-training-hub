import { c as createSsrRpc } from "./createSsrRpc-BaOR-_gw.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { o as objectType, s as stringType, b as booleanType, n as numberType, c as arrayType } from "../_libs/zod.mjs";
const PlanoSchema = objectType({
  nome: stringType().min(1).max(120),
  descricao: stringType().max(500).nullable().optional(),
  preco_mensal: numberType().min(0).max(1e5),
  beneficios: arrayType(stringType().min(1).max(200)).min(1).max(20),
  ordem: numberType().int().min(0).max(99).optional(),
  ativo: booleanType().optional()
});
const listPlanosPublicFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("51f662c7ffbbb7fa6f207d766f77d64a2f64b28c1790b06d84cf76e3094a5a61"));
const listPlanosAdminFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("c5ee2b63498e99d7eda1ed4be1c504239e0688e043199656e8ae67117cdff077"));
const createPlanoFn = createServerFn({
  method: "POST"
}).inputValidator((input) => PlanoSchema.parse(input)).handler(createSsrRpc("3b78d1cb4b2777c95a9174e2faf2a66786d6f3ac8d532b4a0ac5ed663a042063"));
const updatePlanoFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().uuid(),
  patch: PlanoSchema.partial()
}).parse(input)).handler(createSsrRpc("e752e787cf84fae902710e45db586ea4c5c85f6557d61f4f7311a61c3a12059c"));
const deletePlanoFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(createSsrRpc("300a1c44cfb4cd765f95aeeb34ff5452d91d26abd1b504d3be4deff08930a439"));
async function listPlanosPublic() {
  return await listPlanosPublicFn() ?? [];
}
async function listPlanosAdmin() {
  return await listPlanosAdminFn() ?? [];
}
async function createPlano(input) {
  await createPlanoFn({ data: input });
}
async function updatePlano(id, patch) {
  await updatePlanoFn({ data: { id, patch } });
}
async function deletePlano(id) {
  await deletePlanoFn({ data: { id } });
}
export {
  listPlanosAdmin as a,
  createPlano as c,
  deletePlano as d,
  listPlanosPublic as l,
  updatePlano as u
};
