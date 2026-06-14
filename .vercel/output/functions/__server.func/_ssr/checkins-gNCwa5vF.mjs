import { c as createSsrRpc } from "./createSsrRpc-BaOR-_gw.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { o as objectType, s as stringType, n as numberType } from "../_libs/zod.mjs";
const CheckinSchema = objectType({
  aluno_id: stringType().min(1).max(120),
  aluno_nome: stringType().min(1).max(200),
  gym_name: stringType().min(1).max(300),
  gym_address: stringType().max(500).optional().nullable(),
  distance_m: numberType().int().min(0).max(1e6),
  lat_aluno: numberType().min(-90).max(90),
  lng_aluno: numberType().min(-180).max(180),
  lat_gym: numberType().min(-90).max(90),
  lng_gym: numberType().min(-180).max(180)
});
const createCheckinFn = createServerFn({
  method: "POST"
}).inputValidator((input) => CheckinSchema.parse(input)).handler(createSsrRpc("5dff7f8c508a84516ea0d31acc0d654366e44be133af9f9f550069e11cd58a0f"));
const listCheckinsAdminFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120).optional()
}).parse(input)).handler(createSsrRpc("a5451ad31fe086b6ae764cf5c15ef93c9fbf0ac810268f931b260c0ca87258ec"));
const lastCheckinForStudentFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120)
}).parse(input)).handler(createSsrRpc("8314950c46773a1d49b977e48fdcaac91ce0e238477eeb44f32997fd363459fc"));
const checkinTodayFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120)
}).parse(input)).handler(createSsrRpc("356aae869bcff7f7b8905b789bb7ba8ed8af25481841bea8e7165cd1aa46270a"));
const finishCheckinFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().min(1).max(120),
  alunoId: stringType().min(1).max(120)
}).parse(input)).handler(createSsrRpc("3b366350d0e1a372d094e7b0164d6f8a4c73833bc0bde18f18e524219219f89e"));
async function createCheckin(c) {
  return await createCheckinFn({ data: c });
}
async function listCheckins(alunoId) {
  return await listCheckinsAdminFn({ data: { alunoId } }) ?? [];
}
async function lastCheckinForStudent(alunoId) {
  return await lastCheckinForStudentFn({ data: { alunoId } }) ?? null;
}
async function checkinToday(alunoId) {
  return await checkinTodayFn({ data: { alunoId } }) ?? null;
}
async function finishCheckin(id, alunoId) {
  return await finishCheckinFn({ data: { id, alunoId } });
}
export {
  checkinToday as a,
  listCheckins as b,
  createCheckin as c,
  finishCheckin as f,
  lastCheckinForStudent as l
};
