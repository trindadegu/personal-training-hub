import { c as createServerRpc } from "./createServerRpc-BBFx9diD.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { d as dbError } from "../_errors-DhTy7-Fu.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { g as getAdminSession, r as requireAdminSession } from "./admin-auth.server-DLi38Do9.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "./tslib.js";
import "../_libs/supabase__functions-js.mjs";
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
const supabaseAdmin = createClient("https://ohnlwhprxzajmsrwisvg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9obmx3aHByeHpham1zcndpc3ZnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTQ1NTk4NiwiZXhwIjoyMDk1MDMxOTg2fQ.jIR8EbXlHv9SWxtBmLgICXjcqFimWmQhCmlyLjF53M4");
const loginAdminFn_createServerFn_handler = createServerRpc({
  id: "623e95bf16c11dfee03260261c5ae06e4b0fcc1509a1a8ec58f9e51ee2ab5fcf",
  name: "loginAdminFn",
  filename: "src/lib/api/auth.functions.ts"
}, (opts) => loginAdminFn.__executeServer(opts));
const loginAdminFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  username: stringType().min(1).max(120),
  password: stringType().min(1).max(200)
}).parse(input)).handler(loginAdminFn_createServerFn_handler, async ({
  data
}) => {
  const {
    data: ok,
    error
  } = await supabaseAdmin.rpc("verify_admin_login", {
    _username: data.username,
    _password: data.password
  });
  if (error) throw dbError(error);
  if (!ok) return {
    ok: false
  };
  const session = await getAdminSession();
  await session.update({
    username: data.username,
    loggedInAt: Date.now()
  });
  return {
    ok: true
  };
});
const logoutAdminFn_createServerFn_handler = createServerRpc({
  id: "f572985f74d4e9f1a775e40a8d6cbda3f2fc84539550b0eda346adc42d528b0b",
  name: "logoutAdminFn",
  filename: "src/lib/api/auth.functions.ts"
}, (opts) => logoutAdminFn.__executeServer(opts));
const logoutAdminFn = createServerFn({
  method: "POST"
}).handler(logoutAdminFn_createServerFn_handler, async () => {
  const session = await getAdminSession();
  await session.clear();
  return {
    ok: true
  };
});
const getAdminMeFn_createServerFn_handler = createServerRpc({
  id: "14afb1c60ca3aa9e8148ba068ec1f03e17c46cc31c521f72f48f8fe0903208a7",
  name: "getAdminMeFn",
  filename: "src/lib/api/auth.functions.ts"
}, (opts) => getAdminMeFn.__executeServer(opts));
const getAdminMeFn = createServerFn({
  method: "GET"
}).handler(getAdminMeFn_createServerFn_handler, async () => {
  const session = await getAdminSession();
  return {
    username: session.data?.username ?? null
  };
});
const getAdminConfigFn_createServerFn_handler = createServerRpc({
  id: "91554b298c92b1662780f42a236f952912684b7a32739702a01dbf03f91c980e",
  name: "getAdminConfigFn",
  filename: "src/lib/api/auth.functions.ts"
}, (opts) => getAdminConfigFn.__executeServer(opts));
const getAdminConfigFn = createServerFn({
  method: "GET"
}).handler(getAdminConfigFn_createServerFn_handler, async () => {
  await requireAdminSession();
  const {
    data,
    error
  } = await supabaseAdmin.from("admin_credentials").select("username, whatsapp").eq("id", 1).maybeSingle();
  if (error) throw dbError(error);
  return data;
});
const updateAdminConfigFn_createServerFn_handler = createServerRpc({
  id: "37bc0fc39a696b2a4bc8718f2dda23361122f54075e641c00bce5a63ec41fafe",
  name: "updateAdminConfigFn",
  filename: "src/lib/api/auth.functions.ts"
}, (opts) => updateAdminConfigFn.__executeServer(opts));
const updateAdminConfigFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  username: stringType().min(1).max(120),
  password: stringType().max(200).optional(),
  whatsapp: stringType().max(40)
}).parse(input)).handler(updateAdminConfigFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    error
  } = await supabaseAdmin.from("admin_credentials").update({
    username: data.username,
    whatsapp: data.whatsapp,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("id", 1);
  if (error) throw dbError(error);
  if (data.password && data.password.length > 0) {
    const {
      error: pwErr
    } = await supabaseAdmin.rpc("set_admin_password", {
      _password: data.password
    });
    if (pwErr) throw new Error(pwErr.message);
  }
  return {
    ok: true
  };
});
const getAdminWhatsappPublicFn_createServerFn_handler = createServerRpc({
  id: "a872b7d9ebd91e0a8be1bcc8859b34bf08e8cc1e8a2d3a0fdbe3e9931c3e4f00",
  name: "getAdminWhatsappPublicFn",
  filename: "src/lib/api/auth.functions.ts"
}, (opts) => getAdminWhatsappPublicFn.__executeServer(opts));
const getAdminWhatsappPublicFn = createServerFn({
  method: "GET"
}).handler(getAdminWhatsappPublicFn_createServerFn_handler, async () => {
  const {
    data,
    error
  } = await supabaseAdmin.rpc("get_admin_whatsapp");
  if (error) throw dbError(error);
  return data ?? null;
});
export {
  getAdminConfigFn_createServerFn_handler,
  getAdminMeFn_createServerFn_handler,
  getAdminWhatsappPublicFn_createServerFn_handler,
  loginAdminFn_createServerFn_handler,
  logoutAdminFn_createServerFn_handler,
  updateAdminConfigFn_createServerFn_handler
};
