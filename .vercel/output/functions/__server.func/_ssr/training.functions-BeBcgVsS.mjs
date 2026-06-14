import { c as createServerRpc } from "./createServerRpc-BBFx9diD.mjs";
import { d as dbError } from "../_errors-DhTy7-Fu.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { r as requireAdminSession } from "./admin-auth.server-DLi38Do9.mjs";
import { r as requireAdminOrStudentSessionFor, a as requireStudentSessionFor } from "./student-auth.server-BKD3yxe_.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, a as anyType } from "../_libs/zod.mjs";
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
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const AlunoIdSchema = objectType({
  alunoId: stringType().min(1).max(120)
});
const getTrainingFn_createServerFn_handler = createServerRpc({
  id: "9dc645836fb32a8be66710c0d13cc06e03188c78f93c8d5a263e166f9b17b790",
  name: "getTrainingFn",
  filename: "src/lib/api/training.functions.ts"
}, (opts) => getTrainingFn.__executeServer(opts));
const getTrainingFn = createServerFn({
  method: "POST"
}).inputValidator((input) => AlunoIdSchema.parse(input)).handler(getTrainingFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminOrStudentSessionFor(data.alunoId);
  const {
    data: row,
    error
  } = await supabaseAdmin.from("treinos").select("treino").eq("aluno_id", data.alunoId).maybeSingle();
  if (error) throw dbError(error);
  return row?.treino ?? null;
});
const saveTrainingFn_createServerFn_handler = createServerRpc({
  id: "b12d8e494f085bb0096cc0cb1e429e1b5038f53468f49962da115fd409c8f223",
  name: "saveTrainingFn",
  filename: "src/lib/api/training.functions.ts"
}, (opts) => saveTrainingFn.__executeServer(opts));
const saveTrainingFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120),
  treino: anyType()
}).parse(input)).handler(saveTrainingFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    error
  } = await supabaseAdmin.from("treinos").upsert({
    aluno_id: data.alunoId,
    treino: data.treino,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }, {
    onConflict: "aluno_id"
  });
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
const getProgressFn_createServerFn_handler = createServerRpc({
  id: "49e6e4e9af217ef7f3d9b72c3689aaefd7fa0485deb84555cd716716d26fc53f",
  name: "getProgressFn",
  filename: "src/lib/api/training.functions.ts"
}, (opts) => getProgressFn.__executeServer(opts));
const getProgressFn = createServerFn({
  method: "POST"
}).inputValidator((input) => AlunoIdSchema.parse(input)).handler(getProgressFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminOrStudentSessionFor(data.alunoId);
  const {
    data: row,
    error
  } = await supabaseAdmin.from("progresso").select("progresso").eq("aluno_id", data.alunoId).maybeSingle();
  if (error) throw dbError(error);
  return row?.progresso ?? {};
});
const MAX_JSON_BYTES = 5e4;
const boundedJson = anyType().superRefine((val, ctx) => {
  try {
    if (JSON.stringify(val ?? {}).length > MAX_JSON_BYTES) {
      ctx.addIssue({
        code: "custom",
        message: "Payload too large"
      });
    }
  } catch {
    ctx.addIssue({
      code: "custom",
      message: "Invalid payload"
    });
  }
});
const saveProgressFn_createServerFn_handler = createServerRpc({
  id: "583bb479c7bd5f8da025c7f2e7b67a845381364ee39d9127adfb5336979a3614",
  name: "saveProgressFn",
  filename: "src/lib/api/training.functions.ts"
}, (opts) => saveProgressFn.__executeServer(opts));
const saveProgressFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120),
  progresso: boundedJson
}).parse(input)).handler(saveProgressFn_createServerFn_handler, async ({
  data
}) => {
  await requireStudentSessionFor(data.alunoId);
  const {
    data: aluno
  } = await supabaseAdmin.from("alunos").select("id").eq("id", data.alunoId).maybeSingle();
  if (!aluno) throw new Error("Aluno não encontrado");
  const {
    error
  } = await supabaseAdmin.from("progresso").upsert({
    aluno_id: data.alunoId,
    progresso: data.progresso,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }, {
    onConflict: "aluno_id"
  });
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
const getDefaultTrainingFn_createServerFn_handler = createServerRpc({
  id: "074694c6e2228a7b2088a3688e429ef9371aa0c203bdf2abbbf4d62cc0d39f0e",
  name: "getDefaultTrainingFn",
  filename: "src/lib/api/training.functions.ts"
}, (opts) => getDefaultTrainingFn.__executeServer(opts));
const getDefaultTrainingFn = createServerFn({
  method: "GET"
}).handler(getDefaultTrainingFn_createServerFn_handler, async () => {
  const {
    data,
    error
  } = await supabaseAdmin.from("treinos_padroes").select("treino").eq("id", 1).maybeSingle();
  if (error) throw dbError(error);
  return data?.treino ?? null;
});
const saveDefaultTrainingFn_createServerFn_handler = createServerRpc({
  id: "b7273f019d681f6e9b07320248e4f42c9192eaa12b916f4814af8012d11c1914",
  name: "saveDefaultTrainingFn",
  filename: "src/lib/api/training.functions.ts"
}, (opts) => saveDefaultTrainingFn.__executeServer(opts));
const saveDefaultTrainingFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  treino: anyType()
}).parse(input)).handler(saveDefaultTrainingFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    error
  } = await supabaseAdmin.from("treinos_padroes").upsert({
    id: 1,
    treino: data.treino,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }, {
    onConflict: "id"
  });
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
export {
  getDefaultTrainingFn_createServerFn_handler,
  getProgressFn_createServerFn_handler,
  getTrainingFn_createServerFn_handler,
  saveDefaultTrainingFn_createServerFn_handler,
  saveProgressFn_createServerFn_handler,
  saveTrainingFn_createServerFn_handler
};
