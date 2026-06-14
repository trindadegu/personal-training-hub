import { c as createSsrRpc } from "./createSsrRpc-BaOR-_gw.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
const KeySchema = stringType().min(1).max(120).regex(/^[a-zA-Z0-9_\-.]+$/);
const getConfigFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  chave: KeySchema
}).parse(input)).handler(createSsrRpc("512c5b97f06068ec9f07e41004850852f8fc341aab3a7c3bd546d5bdd9479766"));
const setConfigFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  chave: KeySchema,
  valor: stringType().max(1e4)
}).parse(input)).handler(createSsrRpc("cde84908810506b7caf7b02fc34b8e1ef308bfd3561d4cd43a80d9cc0fee12d3"));
async function getConfig(chave) {
  return await getConfigFn({ data: { chave } }) ?? null;
}
async function setConfig(chave, valor) {
  await setConfigFn({ data: { chave, valor } });
}
function onlyDigits(s) {
  return (s ?? "").replace(/\D/g, "");
}
function whatsappLink(telefone, mensagem) {
  const phone = onlyDigits(telefone);
  const full = phone.length <= 11 ? `55${phone}` : phone;
  return `https://wa.me/${full}?text=${encodeURIComponent(mensagem)}`;
}
function formatBRL(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function formatDateBR(d) {
  const [y, m, day] = d.split("-");
  if (!y || !m || !day) return d;
  return `${day}/${m}/${y}`;
}
export {
  formatDateBR as a,
  formatBRL as f,
  getConfig as g,
  setConfig as s,
  whatsappLink as w
};
