import { c as createServerRpc } from "./createServerRpc-BBFx9diD.mjs";
import { d as dbError } from "../_errors-DhTy7-Fu.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { r as requireAdminSession } from "./admin-auth.server-DLi38Do9.mjs";
import { r as requireAdminOrStudentSessionFor } from "./student-auth.server-BKD3yxe_.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, n as numberType } from "../_libs/zod.mjs";
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
const statsAlunoFn_createServerFn_handler = createServerRpc({
  id: "bca07238cfb0c6832dd1fbe6f093d46b8db18241f840a38d109564e067e8927e",
  name: "statsAlunoFn",
  filename: "src/lib/api/frequencia.functions.ts"
}, (opts) => statsAlunoFn.__executeServer(opts));
const statsAlunoFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120)
}).parse(input)).handler(statsAlunoFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminOrStudentSessionFor(data.alunoId);
  const {
    data: aluno,
    error: eA
  } = await supabaseAdmin.from("alunos").select("meta_frequencia_semanal, meta_frequencia_mensal").eq("id", data.alunoId).maybeSingle();
  if (eA) throw dbError(eA);
  const since = /* @__PURE__ */ new Date();
  since.setDate(since.getDate() - 60);
  const {
    data: rows,
    error
  } = await supabaseAdmin.from("checkins").select("created_at").eq("aluno_id", data.alunoId).gte("created_at", since.toISOString()).order("created_at", {
    ascending: false
  });
  if (error) throw dbError(error);
  const now = /* @__PURE__ */ new Date();
  const dow = now.getDay();
  const segundaOffset = dow === 0 ? -6 : 1 - dow;
  const startSemana = new Date(now);
  startSemana.setDate(now.getDate() + segundaOffset);
  startSemana.setHours(0, 0, 0, 0);
  const startMes = new Date(now.getFullYear(), now.getMonth(), 1);
  const dias = /* @__PURE__ */ new Set();
  let semana = 0;
  let mes = 0;
  for (const r of rows ?? []) {
    const d = new Date(r.created_at);
    dias.add(d.toISOString().slice(0, 10));
    if (d >= startSemana) semana++;
    if (d >= startMes) mes++;
  }
  let streak = 0;
  const cursor = /* @__PURE__ */ new Date();
  cursor.setHours(0, 0, 0, 0);
  if (!dias.has(cursor.toISOString().slice(0, 10))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (dias.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return {
    semana,
    mes,
    streak,
    meta_semanal: aluno?.meta_frequencia_semanal ?? 4,
    meta_mensal: aluno?.meta_frequencia_mensal ?? 16
  };
});
const alunosEmRiscoFn_createServerFn_handler = createServerRpc({
  id: "7dfc7a016d6f238885ca9210fcb7ff73ec616854c619ce62857ec5818d8865f5",
  name: "alunosEmRiscoFn",
  filename: "src/lib/api/frequencia.functions.ts"
}, (opts) => alunosEmRiscoFn.__executeServer(opts));
const alunosEmRiscoFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  diasSemCheckin: numberType().int().min(1).max(90).optional()
}).parse(input ?? {})).handler(alunosEmRiscoFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const limite = data.diasSemCheckin ?? 7;
  const {
    data: alunos,
    error
  } = await supabaseAdmin.from("alunos").select("id, nome, telefone, status");
  if (error) throw dbError(error);
  const since = /* @__PURE__ */ new Date();
  since.setDate(since.getDate() - limite);
  const result = [];
  for (const a of alunos ?? []) {
    if (a.status && a.status !== "ativo") continue;
    const {
      data: ultimo
    } = await supabaseAdmin.from("checkins").select("created_at").eq("aluno_id", a.id).order("created_at", {
      ascending: false
    }).limit(1).maybeSingle();
    const ultimoDate = ultimo?.created_at ? new Date(ultimo.created_at) : null;
    const dias = ultimoDate ? Math.floor((Date.now() - ultimoDate.getTime()) / 864e5) : 999;
    if (dias >= limite) {
      result.push({
        id: a.id,
        nome: a.nome,
        telefone: a.telefone ?? null,
        dias_sem_treinar: dias
      });
    }
  }
  return result.sort((a, b) => b.dias_sem_treinar - a.dias_sem_treinar);
});
export {
  alunosEmRiscoFn_createServerFn_handler,
  statsAlunoFn_createServerFn_handler
};
