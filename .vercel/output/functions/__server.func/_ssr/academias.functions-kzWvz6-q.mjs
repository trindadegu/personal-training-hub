import { c as createServerRpc } from "./createServerRpc-BBFx9diD.mjs";
import { d as dbError } from "../_errors-DhTy7-Fu.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { r as requireAdminSession } from "./admin-auth.server-DLi38Do9.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, b as booleanType, n as numberType, s as stringType } from "../_libs/zod.mjs";
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
const AcademiaSchema = objectType({
  nome: stringType().min(1).max(200),
  endereco: stringType().max(500).nullable().optional(),
  lat: numberType().min(-90).max(90),
  lng: numberType().min(-180).max(180),
  raio_metros: numberType().int().min(20).max(5e3).optional(),
  ativo: booleanType().optional()
});
const listAcademiasPublicFn_createServerFn_handler = createServerRpc({
  id: "39ead6ca247aa8b4e12c85bc32eb4b2d8905ae8c94a5de8dcefda8fb26d7e116",
  name: "listAcademiasPublicFn",
  filename: "src/lib/api/academias.functions.ts"
}, (opts) => listAcademiasPublicFn.__executeServer(opts));
const listAcademiasPublicFn = createServerFn({
  method: "GET"
}).handler(listAcademiasPublicFn_createServerFn_handler, async () => {
  const {
    data,
    error
  } = await supabaseAdmin.from("academias").select("id, nome, endereco, lat, lng, raio_metros").eq("ativo", true).order("nome");
  if (error) throw dbError(error);
  return data ?? [];
});
const listAcademiasAdminFn_createServerFn_handler = createServerRpc({
  id: "10dc32ff0008f197c6f3f48c9ab31b86dd11312c4410b952c72bea0de6616d92",
  name: "listAcademiasAdminFn",
  filename: "src/lib/api/academias.functions.ts"
}, (opts) => listAcademiasAdminFn.__executeServer(opts));
const listAcademiasAdminFn = createServerFn({
  method: "GET"
}).handler(listAcademiasAdminFn_createServerFn_handler, async () => {
  await requireAdminSession();
  const {
    data,
    error
  } = await supabaseAdmin.from("academias").select("*").order("nome");
  if (error) throw dbError(error);
  return data ?? [];
});
const createAcademiaFn_createServerFn_handler = createServerRpc({
  id: "5bc29bb5a7c9fe77398088f2c368ecb5216798c750c6e2538cfeaa48bbd42dbb",
  name: "createAcademiaFn",
  filename: "src/lib/api/academias.functions.ts"
}, (opts) => createAcademiaFn.__executeServer(opts));
const createAcademiaFn = createServerFn({
  method: "POST"
}).inputValidator((input) => AcademiaSchema.parse(input)).handler(createAcademiaFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    error
  } = await supabaseAdmin.from("academias").insert({
    nome: data.nome,
    endereco: data.endereco ?? null,
    lat: data.lat,
    lng: data.lng,
    raio_metros: data.raio_metros ?? 150,
    ativo: data.ativo ?? true
  });
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
const updateAcademiaFn_createServerFn_handler = createServerRpc({
  id: "def321a5ebc33694a53b3bf00ee8c9dce96577425e382344b9c55bafd5fdb2de",
  name: "updateAcademiaFn",
  filename: "src/lib/api/academias.functions.ts"
}, (opts) => updateAcademiaFn.__executeServer(opts));
const updateAcademiaFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().uuid(),
  patch: AcademiaSchema.partial()
}).parse(input)).handler(updateAcademiaFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    error
  } = await supabaseAdmin.from("academias").update(data.patch).eq("id", data.id);
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
const deleteAcademiaFn_createServerFn_handler = createServerRpc({
  id: "db2b7c364b923d922526e69fc6dd428a189d9e3d1c9c21d847aede9711059cbc",
  name: "deleteAcademiaFn",
  filename: "src/lib/api/academias.functions.ts"
}, (opts) => deleteAcademiaFn.__executeServer(opts));
const deleteAcademiaFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(deleteAcademiaFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    error
  } = await supabaseAdmin.from("academias").delete().eq("id", data.id);
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
export {
  createAcademiaFn_createServerFn_handler,
  deleteAcademiaFn_createServerFn_handler,
  listAcademiasAdminFn_createServerFn_handler,
  listAcademiasPublicFn_createServerFn_handler,
  updateAcademiaFn_createServerFn_handler
};
