import { c as createServerRpc } from "./createServerRpc-BBFx9diD.mjs";
import { d as dbError } from "../_errors-DhTy7-Fu.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { r as requireAdminSession } from "./admin-auth.server-DLi38Do9.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, b as booleanType, n as numberType, c as arrayType, s as stringType } from "../_libs/zod.mjs";
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
const PlanoSchema = objectType({
  nome: stringType().min(1).max(120),
  descricao: stringType().max(500).nullable().optional(),
  preco_mensal: numberType().min(0).max(1e5),
  beneficios: arrayType(stringType().min(1).max(200)).min(1).max(20),
  ordem: numberType().int().min(0).max(99).optional(),
  ativo: booleanType().optional()
});
const listPlanosPublicFn_createServerFn_handler = createServerRpc({
  id: "51f662c7ffbbb7fa6f207d766f77d64a2f64b28c1790b06d84cf76e3094a5a61",
  name: "listPlanosPublicFn",
  filename: "src/lib/api/planos.functions.ts"
}, (opts) => listPlanosPublicFn.__executeServer(opts));
const listPlanosPublicFn = createServerFn({
  method: "GET"
}).handler(listPlanosPublicFn_createServerFn_handler, async () => {
  const {
    data,
    error
  } = await supabaseAdmin.from("planos").select("id, nome, descricao, preco_mensal, beneficios, ordem").eq("ativo", true).order("ordem", {
    ascending: true
  });
  if (error) throw dbError(error);
  return data ?? [];
});
const listPlanosAdminFn_createServerFn_handler = createServerRpc({
  id: "c5ee2b63498e99d7eda1ed4be1c504239e0688e043199656e8ae67117cdff077",
  name: "listPlanosAdminFn",
  filename: "src/lib/api/planos.functions.ts"
}, (opts) => listPlanosAdminFn.__executeServer(opts));
const listPlanosAdminFn = createServerFn({
  method: "GET"
}).handler(listPlanosAdminFn_createServerFn_handler, async () => {
  await requireAdminSession();
  const {
    data,
    error
  } = await supabaseAdmin.from("planos").select("*").order("ordem", {
    ascending: true
  });
  if (error) throw dbError(error);
  return data ?? [];
});
const createPlanoFn_createServerFn_handler = createServerRpc({
  id: "3b78d1cb4b2777c95a9174e2faf2a66786d6f3ac8d532b4a0ac5ed663a042063",
  name: "createPlanoFn",
  filename: "src/lib/api/planos.functions.ts"
}, (opts) => createPlanoFn.__executeServer(opts));
const createPlanoFn = createServerFn({
  method: "POST"
}).inputValidator((input) => PlanoSchema.parse(input)).handler(createPlanoFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    error
  } = await supabaseAdmin.from("planos").insert({
    nome: data.nome,
    descricao: data.descricao ?? null,
    preco_mensal: data.preco_mensal,
    beneficios: data.beneficios,
    ordem: data.ordem ?? 0,
    ativo: data.ativo ?? true
  });
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
const updatePlanoFn_createServerFn_handler = createServerRpc({
  id: "e752e787cf84fae902710e45db586ea4c5c85f6557d61f4f7311a61c3a12059c",
  name: "updatePlanoFn",
  filename: "src/lib/api/planos.functions.ts"
}, (opts) => updatePlanoFn.__executeServer(opts));
const updatePlanoFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().uuid(),
  patch: PlanoSchema.partial()
}).parse(input)).handler(updatePlanoFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    error
  } = await supabaseAdmin.from("planos").update(data.patch).eq("id", data.id);
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
const deletePlanoFn_createServerFn_handler = createServerRpc({
  id: "300a1c44cfb4cd765f95aeeb34ff5452d91d26abd1b504d3be4deff08930a439",
  name: "deletePlanoFn",
  filename: "src/lib/api/planos.functions.ts"
}, (opts) => deletePlanoFn.__executeServer(opts));
const deletePlanoFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(deletePlanoFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    error
  } = await supabaseAdmin.from("planos").delete().eq("id", data.id);
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
export {
  createPlanoFn_createServerFn_handler,
  deletePlanoFn_createServerFn_handler,
  listPlanosAdminFn_createServerFn_handler,
  listPlanosPublicFn_createServerFn_handler,
  updatePlanoFn_createServerFn_handler
};
