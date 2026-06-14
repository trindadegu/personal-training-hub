import { c as createServerRpc } from "./createServerRpc-BBFx9diD.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { d as dbError } from "../_errors-DhTy7-Fu.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
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
const getAdminWhatsappFn_createServerFn_handler = createServerRpc({
  id: "1db090d5281dab0f07bc638b19bfa915393c3520fd650392ea1b685b567ad40b",
  name: "getAdminWhatsappFn",
  filename: "src/lib/api/admin-contact.functions.ts"
}, (opts) => getAdminWhatsappFn.__executeServer(opts));
const getAdminWhatsappFn = createServerFn({
  method: "GET"
}).handler(getAdminWhatsappFn_createServerFn_handler, async () => {
  const {
    data,
    error
  } = await supabaseAdmin.rpc("get_admin_whatsapp");
  if (error) throw dbError(error);
  return data ?? "";
});
export {
  getAdminWhatsappFn_createServerFn_handler
};
