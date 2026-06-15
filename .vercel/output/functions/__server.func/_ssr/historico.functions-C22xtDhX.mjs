import { c as createServerRpc } from "./createServerRpc-BBFx9diD.mjs";
import { d as dbError } from "../_errors-DhTy7-Fu.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { r as requireAdminSession } from "./admin-auth.server-DLi38Do9.mjs";
import { a as requireStudentSessionFor, r as requireAdminOrStudentSessionFor } from "./student-auth.server-BKD3yxe_.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, u as unionType, s as stringType, n as numberType, c as arrayType } from "../_libs/zod.mjs";
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
const ExSchema = objectType({
  name: stringType().min(1).max(300),
  series: unionType([stringType().max(40), numberType()]).optional(),
  reps: unionType([stringType().max(40), numberType()]).optional()
});
const registerCompletedSessionFn_createServerFn_handler = createServerRpc({
  id: "f4b5c4fd0fd59023c094a8c6a1c10e161856190931b5ae11fcc07e7d6fa010cc",
  name: "registerCompletedSessionFn",
  filename: "src/lib/api/historico.functions.ts"
}, (opts) => registerCompletedSessionFn.__executeServer(opts));
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
}).parse(input)).handler(registerCompletedSessionFn_createServerFn_handler, async ({
  data
}) => {
  await requireStudentSessionFor(data.alunoId);
  const {
    data: aluno
  } = await supabaseAdmin.from("alunos").select("id").eq("id", data.alunoId).maybeSingle();
  if (!aluno) throw new Error("Aluno não encontrado");
  const {
    error
  } = await supabaseAdmin.from("treino_historico").upsert({
    aluno_id: data.alunoId,
    data: data.data,
    dia_semana: data.diaSemana,
    foco: data.foco ?? null,
    exercicios_feitos: data.exerciciosFeitos,
    total_exercicios: data.totalExercicios,
    checkin_id: data.checkinId ?? null
  }, {
    onConflict: "aluno_id,data,dia_semana"
  });
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
const listHistoricoFn_createServerFn_handler = createServerRpc({
  id: "a7502540880fb29c6ec2143b6457156004b0fe21d900c4df03a826ed545b4c94",
  name: "listHistoricoFn",
  filename: "src/lib/api/historico.functions.ts"
}, (opts) => listHistoricoFn.__executeServer(opts));
const listHistoricoFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120),
  fromISO: stringType().min(1).max(40),
  toISO: stringType().min(1).max(40)
}).parse(input)).handler(listHistoricoFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminOrStudentSessionFor(data.alunoId);
  const {
    data: rows,
    error
  } = await supabaseAdmin.from("treino_historico").select("*").eq("aluno_id", data.alunoId).gte("data", data.fromISO).lte("data", data.toISO).order("data", {
    ascending: false
  });
  if (error) throw dbError(error);
  return rows ?? [];
});
const listHistoricoAllFn_createServerFn_handler = createServerRpc({
  id: "5831aa41161c64bc519a1ee873ab62e6b26baa6074bdff2ddf5328908dcb6e3b",
  name: "listHistoricoAllFn",
  filename: "src/lib/api/historico.functions.ts"
}, (opts) => listHistoricoAllFn.__executeServer(opts));
const listHistoricoAllFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120)
}).parse(input)).handler(listHistoricoAllFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminOrStudentSessionFor(data.alunoId);
  const {
    data: rows,
    error
  } = await supabaseAdmin.from("treino_historico").select("*").eq("aluno_id", data.alunoId).order("data", {
    ascending: false
  }).limit(500);
  if (error) throw dbError(error);
  return rows ?? [];
});
const countHistoricoSinceFn_createServerFn_handler = createServerRpc({
  id: "fa55cdea767cd45c1c4e63cc2007972fc95c5f1160c6d5e2233f0da1a0d6ca14",
  name: "countHistoricoSinceFn",
  filename: "src/lib/api/historico.functions.ts"
}, (opts) => countHistoricoSinceFn.__executeServer(opts));
const countHistoricoSinceFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  fromISO: stringType().min(1).max(40)
}).parse(input)).handler(countHistoricoSinceFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    count,
    error
  } = await supabaseAdmin.from("treino_historico").select("*", {
    count: "exact",
    head: true
  }).gte("data", data.fromISO);
  if (error) throw dbError(error);
  return count ?? 0;
});
export {
  countHistoricoSinceFn_createServerFn_handler,
  listHistoricoAllFn_createServerFn_handler,
  listHistoricoFn_createServerFn_handler,
  registerCompletedSessionFn_createServerFn_handler
};
