import { c as createSsrRpc } from "./createSsrRpc-BaOR-_gw.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
const listPdfsAdminFn = createServerFn({
  method: "POST"
}).inputValidator((i) => objectType({
  alunoId: stringType().min(1).max(120)
}).parse(i)).handler(createSsrRpc("ca1c2c7f7e0265e15979223b9ebd0ccad4801cd8662166b72e1119fdc8bb78ba"));
const listMyPdfsFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("6e257664172aa7abcc336286d20af5cdee9fad7453de92d37bce1189e5982ac3"));
const uploadPdfAdminFn = createServerFn({
  method: "POST"
}).inputValidator((i) => objectType({
  alunoId: stringType().min(1).max(120),
  nome: stringType().min(1).max(200),
  descricao: stringType().max(1e3).optional().nullable(),
  base64: stringType().min(8).max(16e6)
  // ~12 MB
}).parse(i)).handler(createSsrRpc("c32d13f43fe7526b5583a33e543960f03decc4484328a43972354235687a8c62"));
const deletePdfAdminFn = createServerFn({
  method: "POST"
}).inputValidator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(createSsrRpc("cf4fc9b1d6a82a93189e82003d6ca6eec469bc7bdb56ae60e7889ff806de3be6"));
async function listPdfsAdmin(alunoId) {
  return await listPdfsAdminFn({ data: { alunoId } }) ?? [];
}
async function listMyPdfs() {
  return await listMyPdfsFn() ?? [];
}
async function uploadPdf(input) {
  await uploadPdfAdminFn({ data: input });
}
async function deletePdf(id) {
  await deletePdfAdminFn({ data: { id } });
}
export {
  listPdfsAdmin as a,
  deletePdf as d,
  listMyPdfs as l,
  uploadPdf as u
};
