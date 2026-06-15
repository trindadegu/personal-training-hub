import { c as createServerRpc } from "./createServerRpc-BBFx9diD.mjs";
import { d as dbError } from "../_errors-DhTy7-Fu.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { r as requireAdminSession } from "./admin-auth.server-DLi38Do9.mjs";
import { a as requireStudentSessionFor, r as requireAdminOrStudentSessionFor } from "./student-auth.server-BKD3yxe_.mjs";
import { h as haversineMeters } from "./academias.functions-ohabDq9L.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, n as numberType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/dotenv.mjs";
import "fs";
import "path";
import "os";
import "crypto";
import "util";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "./tslib.js";
import "../_libs/supabase__functions-js.mjs";
import "./createSsrRpc-BaOR-_gw.mjs";
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
const createCheckinFn_createServerFn_handler = createServerRpc({
  id: "5dff7f8c508a84516ea0d31acc0d654366e44be133af9f9f550069e11cd58a0f",
  name: "createCheckinFn",
  filename: "src/lib/api/checkins.functions.ts"
}, (opts) => createCheckinFn.__executeServer(opts));
const createCheckinFn = createServerFn({
  method: "POST"
}).inputValidator((input) => CheckinSchema.parse(input)).handler(createCheckinFn_createServerFn_handler, async ({
  data
}) => {
  await requireStudentSessionFor(data.aluno_id);
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const {
    data: overdue
  } = await supabaseAdmin.from("pagamentos").select("id").eq("aluno_id", data.aluno_id).eq("status", "pendente").lt("vencimento", today).limit(1);
  if (overdue && overdue.length > 0) {
    throw new Error("Você tem mensalidade em atraso. Regularize o pagamento para registrar check-in.");
  }
  const {
    data: aluno
  } = await supabaseAdmin.from("alunos").select("id, nome").eq("id", data.aluno_id).maybeSingle();
  if (!aluno) throw new Error("Aluno não encontrado");
  if (aluno.nome !== data.aluno_nome) {
    data = {
      ...data,
      aluno_nome: aluno.nome
    };
  }
  const distAteGym = haversineMeters(data.lat_aluno, data.lng_aluno, data.lat_gym, data.lng_gym);
  if (distAteGym > 500) {
    throw new Error("Você precisa estar a no máximo 500 m da academia escolhida para fazer check-in.");
  }
  const startDay = /* @__PURE__ */ new Date();
  startDay.setHours(0, 0, 0, 0);
  const {
    data: jaHoje
  } = await supabaseAdmin.from("checkins").select("id").eq("aluno_id", data.aluno_id).gte("created_at", startDay.toISOString()).limit(1);
  if (jaHoje && jaHoje.length > 0) {
    throw new Error("Você já fez check-in hoje.");
  }
  const {
    data: row,
    error
  } = await supabaseAdmin.from("checkins").insert({
    ...data,
    inicio_at: (/* @__PURE__ */ new Date()).toISOString()
  }).select().single();
  if (error) throw dbError(error);
  return row;
});
const listCheckinsAdminFn_createServerFn_handler = createServerRpc({
  id: "a5451ad31fe086b6ae764cf5c15ef93c9fbf0ac810268f931b260c0ca87258ec",
  name: "listCheckinsAdminFn",
  filename: "src/lib/api/checkins.functions.ts"
}, (opts) => listCheckinsAdminFn.__executeServer(opts));
const listCheckinsAdminFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120).optional()
}).parse(input)).handler(listCheckinsAdminFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  let q = supabaseAdmin.from("checkins").select("*").order("created_at", {
    ascending: false
  }).limit(500);
  if (data.alunoId) q = q.eq("aluno_id", data.alunoId);
  const {
    data: rows,
    error
  } = await q;
  if (error) throw dbError(error);
  return rows ?? [];
});
const lastCheckinForStudentFn_createServerFn_handler = createServerRpc({
  id: "8314950c46773a1d49b977e48fdcaac91ce0e238477eeb44f32997fd363459fc",
  name: "lastCheckinForStudentFn",
  filename: "src/lib/api/checkins.functions.ts"
}, (opts) => lastCheckinForStudentFn.__executeServer(opts));
const lastCheckinForStudentFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120)
}).parse(input)).handler(lastCheckinForStudentFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminOrStudentSessionFor(data.alunoId);
  const {
    data: row,
    error
  } = await supabaseAdmin.from("checkins").select("id, aluno_id, aluno_nome, gym_name, gym_address, distance_m, created_at").eq("aluno_id", data.alunoId).order("created_at", {
    ascending: false
  }).limit(1).maybeSingle();
  if (error) throw dbError(error);
  return row;
});
const checkinTodayFn_createServerFn_handler = createServerRpc({
  id: "356aae869bcff7f7b8905b789bb7ba8ed8af25481841bea8e7165cd1aa46270a",
  name: "checkinTodayFn",
  filename: "src/lib/api/checkins.functions.ts"
}, (opts) => checkinTodayFn.__executeServer(opts));
const checkinTodayFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120)
}).parse(input)).handler(checkinTodayFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminOrStudentSessionFor(data.alunoId);
  const start = /* @__PURE__ */ new Date();
  start.setHours(0, 0, 0, 0);
  const {
    data: row,
    error
  } = await supabaseAdmin.from("checkins").select("id, aluno_id, aluno_nome, gym_name, gym_address, distance_m, created_at, inicio_at, fim_at, duracao_segundos").eq("aluno_id", data.alunoId).gte("created_at", start.toISOString()).order("created_at", {
    ascending: false
  }).limit(1).maybeSingle();
  if (error) throw dbError(error);
  return row;
});
const finishCheckinFn_createServerFn_handler = createServerRpc({
  id: "3b366350d0e1a372d094e7b0164d6f8a4c73833bc0bde18f18e524219219f89e",
  name: "finishCheckinFn",
  filename: "src/lib/api/checkins.functions.ts"
}, (opts) => finishCheckinFn.__executeServer(opts));
const finishCheckinFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().min(1).max(120),
  alunoId: stringType().min(1).max(120)
}).parse(input)).handler(finishCheckinFn_createServerFn_handler, async ({
  data
}) => {
  await requireStudentSessionFor(data.alunoId);
  const {
    data: cur
  } = await supabaseAdmin.from("checkins").select("id, aluno_id, inicio_at, created_at, fim_at").eq("id", data.id).maybeSingle();
  if (!cur || cur.aluno_id !== data.alunoId) throw new Error("Check-in não encontrado");
  if (cur.fim_at) return cur;
  const inicio = new Date(cur.inicio_at ?? cur.created_at).getTime();
  const fim = Date.now();
  const duracao = Math.max(0, Math.round((fim - inicio) / 1e3));
  const {
    data: row,
    error
  } = await supabaseAdmin.from("checkins").update({
    fim_at: new Date(fim).toISOString(),
    duracao_segundos: duracao
  }).eq("id", data.id).select().single();
  if (error) throw dbError(error);
  return row;
});
export {
  checkinTodayFn_createServerFn_handler,
  createCheckinFn_createServerFn_handler,
  finishCheckinFn_createServerFn_handler,
  lastCheckinForStudentFn_createServerFn_handler,
  listCheckinsAdminFn_createServerFn_handler
};
