import { c as createServerRpc } from "./createServerRpc-BBFx9diD.mjs";
import { d as dbError } from "../_errors-DhTy7-Fu.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { r as requireAdminSession } from "./admin-auth.server-DLi38Do9.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
const listNotasFn_createServerFn_handler = createServerRpc({
  id: "727f09755b380c9d6539af17acc2286b7c6ed99cb52cc56583399eb6df45b54b",
  name: "listNotasFn",
  filename: "src/lib/api/notas.functions.ts"
}, (opts) => listNotasFn.__executeServer(opts));
const listNotasFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120)
}).parse(input)).handler(listNotasFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    data: rows,
    error
  } = await supabaseAdmin.from("aluno_notas").select("*").eq("aluno_id", data.alunoId).order("data", {
    ascending: false
  }).order("created_at", {
    ascending: false
  });
  if (error) throw dbError(error);
  return rows ?? [];
});
const createNotaFn_createServerFn_handler = createServerRpc({
  id: "b76ab2981fa98c90ee3b86ea35daa1138a650864e0838c93ba1568dc76d9b2b7",
  name: "createNotaFn",
  filename: "src/lib/api/notas.functions.ts"
}, (opts) => createNotaFn.__executeServer(opts));
const createNotaFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  aluno_id: stringType().min(1).max(120),
  data: stringType().min(1).max(40),
  titulo: stringType().min(1).max(300),
  conteudo: stringType().min(1).max(1e4),
  tipo: stringType().min(1).max(40)
}).parse(input)).handler(createNotaFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    error
  } = await supabaseAdmin.from("aluno_notas").insert(data);
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
const deleteNotaFn_createServerFn_handler = createServerRpc({
  id: "0a4df19ddd1f535dc98453868daf66e57eeaaa0b647bf1edcd751eebe567b1f4",
  name: "deleteNotaFn",
  filename: "src/lib/api/notas.functions.ts"
}, (opts) => deleteNotaFn.__executeServer(opts));
const deleteNotaFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().min(1).max(120)
}).parse(input)).handler(deleteNotaFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    error
  } = await supabaseAdmin.from("aluno_notas").delete().eq("id", data.id);
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
export {
  createNotaFn_createServerFn_handler,
  deleteNotaFn_createServerFn_handler,
  listNotasFn_createServerFn_handler
};
