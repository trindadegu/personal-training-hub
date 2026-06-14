import { c as createSsrRpc } from "./createSsrRpc-BaOR-_gw.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
const myProfileFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("e94c59379092d5f60cafa632cffa57d5a514e8bc00e9ea03b171ebf04a744d3a"));
const myPlanoFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("86b3afc9f282a9b27b2ad7ad81a2597ab8595a7a5915594fa4681b1298dff24e"));
const myPagamentosFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("dff285738d588eacced944ba9d48a6b7e59f9f3bf7bcd17b9ee892223c333c8a"));
const myNotasFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("cf0bbfa3f4677529e47ab572b520c25145eb0d98c5ca5f4ca19c25572df6cc35"));
const updateMyProfileFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  telefone: stringType().max(40).nullable().optional(),
  objetivo: stringType().max(2e3).nullable().optional()
}).parse(input)).handler(createSsrRpc("9eb0645aa312ca60cd3a330bd140263276506cc23438c0e040b574e76df0860f"));
const uploadMyAvatarFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  base64: stringType().min(8).max(8e6),
  // ~6MB
  mime: stringType().regex(/^image\/(png|jpeg|jpg|webp)$/)
}).parse(input)).handler(createSsrRpc("4067b7470ed3b61beb5fd520dafa81f8f0ed83bc7800897878b2872386bfcbd3"));
const avatarSignedUrlFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120)
}).parse(input)).handler(createSsrRpc("f7beb63b7fc3694ad8301bef4758b00728f00254540737f3e71623990a96568f"));
async function getMyProfile() {
  return await myProfileFn() ?? null;
}
async function getMyPlano() {
  return await myPlanoFn() ?? null;
}
async function getMyPagamentos() {
  return await myPagamentosFn() ?? [];
}
async function getMyNotas() {
  return await myNotasFn() ?? [];
}
async function updateMyProfile(patch) {
  await updateMyProfileFn({ data: patch });
}
async function uploadMyAvatar(base64, mime) {
  await uploadMyAvatarFn({ data: { base64, mime } });
}
async function getAvatarSignedUrl(alunoId) {
  return await avatarSignedUrlFn({ data: { alunoId } });
}
export {
  updateMyProfile as a,
  getMyPlano as b,
  getAvatarSignedUrl as c,
  getMyPagamentos as d,
  getMyNotas as e,
  getMyProfile as g,
  uploadMyAvatar as u
};
