import { c as createServerRpc } from "./createServerRpc-BBFx9diD.mjs";
import { d as dbError } from "../_errors-DhTy7-Fu.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { r as requireAdminSession } from "./admin-auth.server-DLi38Do9.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { s as stringType, o as objectType } from "../_libs/zod.mjs";
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
const KeySchema = stringType().min(1).max(120).regex(/^[a-zA-Z0-9_\-.]+$/);
const getConfigFn_createServerFn_handler = createServerRpc({
  id: "512c5b97f06068ec9f07e41004850852f8fc341aab3a7c3bd546d5bdd9479766",
  name: "getConfigFn",
  filename: "src/lib/api/config.functions.ts"
}, (opts) => getConfigFn.__executeServer(opts));
const getConfigFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  chave: KeySchema
}).parse(input)).handler(getConfigFn_createServerFn_handler, async ({
  data
}) => {
  const {
    data: row,
    error
  } = await supabaseAdmin.from("configuracoes").select("valor").eq("chave", data.chave).maybeSingle();
  if (error) throw dbError(error);
  return row?.valor ?? null;
});
const setConfigFn_createServerFn_handler = createServerRpc({
  id: "cde84908810506b7caf7b02fc34b8e1ef308bfd3561d4cd43a80d9cc0fee12d3",
  name: "setConfigFn",
  filename: "src/lib/api/config.functions.ts"
}, (opts) => setConfigFn.__executeServer(opts));
const setConfigFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  chave: KeySchema,
  valor: stringType().max(1e4)
}).parse(input)).handler(setConfigFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    error
  } = await supabaseAdmin.from("configuracoes").upsert({
    chave: data.chave,
    valor: data.valor,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }, {
    onConflict: "chave"
  });
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
export {
  getConfigFn_createServerFn_handler,
  setConfigFn_createServerFn_handler
};
