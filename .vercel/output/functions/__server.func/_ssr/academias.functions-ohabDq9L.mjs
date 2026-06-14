import { c as createSsrRpc } from "./createSsrRpc-BaOR-_gw.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { o as objectType, s as stringType, b as booleanType, n as numberType } from "../_libs/zod.mjs";
const AcademiaSchema = objectType({
  nome: stringType().min(1).max(200),
  endereco: stringType().max(500).nullable().optional(),
  lat: numberType().min(-90).max(90),
  lng: numberType().min(-180).max(180),
  raio_metros: numberType().int().min(20).max(5e3).optional(),
  ativo: booleanType().optional()
});
createServerFn({
  method: "GET"
}).handler(createSsrRpc("39ead6ca247aa8b4e12c85bc32eb4b2d8905ae8c94a5de8dcefda8fb26d7e116"));
const listAcademiasAdminFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("10dc32ff0008f197c6f3f48c9ab31b86dd11312c4410b952c72bea0de6616d92"));
const createAcademiaFn = createServerFn({
  method: "POST"
}).inputValidator((input) => AcademiaSchema.parse(input)).handler(createSsrRpc("5bc29bb5a7c9fe77398088f2c368ecb5216798c750c6e2538cfeaa48bbd42dbb"));
const updateAcademiaFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().uuid(),
  patch: AcademiaSchema.partial()
}).parse(input)).handler(createSsrRpc("def321a5ebc33694a53b3bf00ee8c9dce96577425e382344b9c55bafd5fdb2de"));
const deleteAcademiaFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(createSsrRpc("db2b7c364b923d922526e69fc6dd428a189d9e3d1c9c21d847aede9711059cbc"));
function haversineMeters(lat1, lng1, lat2, lng2) {
  const R = 6371e3;
  const toRad = (v) => v * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
export {
  createAcademiaFn as c,
  deleteAcademiaFn as d,
  haversineMeters as h,
  listAcademiasAdminFn as l,
  updateAcademiaFn as u
};
