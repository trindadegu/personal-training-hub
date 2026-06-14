import { c as createServerRpc } from "./createServerRpc-BBFx9diD.mjs";
import { d as dbError } from "../_errors-DhTy7-Fu.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { r as requireAdminSession } from "./admin-auth.server-DLi38Do9.mjs";
import { b as requireStudentSession } from "./student-auth.server-BKD3yxe_.mjs";
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
import "tslib";
import "../_libs/supabase__functions-js.mjs";
async function withSignedUrls(rows) {
  const out = [];
  for (const r of rows) {
    const {
      data: signed
    } = await supabaseAdmin.storage.from("treino-pdfs").createSignedUrl(r.storage_path, 60 * 60 * 6);
    out.push({
      ...r,
      signed_url: signed?.signedUrl ?? null
    });
  }
  return out;
}
const listPdfsAdminFn_createServerFn_handler = createServerRpc({
  id: "ca1c2c7f7e0265e15979223b9ebd0ccad4801cd8662166b72e1119fdc8bb78ba",
  name: "listPdfsAdminFn",
  filename: "src/lib/api/pdfs.functions.ts"
}, (opts) => listPdfsAdminFn.__executeServer(opts));
const listPdfsAdminFn = createServerFn({
  method: "POST"
}).inputValidator((i) => objectType({
  alunoId: stringType().min(1).max(120)
}).parse(i)).handler(listPdfsAdminFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    data: rows,
    error
  } = await supabaseAdmin.from("treino_pdfs").select("*").eq("aluno_id", data.alunoId).order("created_at", {
    ascending: false
  });
  if (error) throw dbError(error);
  return await withSignedUrls(rows ?? []);
});
const listMyPdfsFn_createServerFn_handler = createServerRpc({
  id: "6e257664172aa7abcc336286d20af5cdee9fad7453de92d37bce1189e5982ac3",
  name: "listMyPdfsFn",
  filename: "src/lib/api/pdfs.functions.ts"
}, (opts) => listMyPdfsFn.__executeServer(opts));
const listMyPdfsFn = createServerFn({
  method: "GET"
}).handler(listMyPdfsFn_createServerFn_handler, async () => {
  const session = await requireStudentSession();
  const {
    data: rows,
    error
  } = await supabaseAdmin.from("treino_pdfs").select("*").eq("aluno_id", session.data.alunoId).order("created_at", {
    ascending: false
  });
  if (error) throw dbError(error);
  return await withSignedUrls(rows ?? []);
});
const uploadPdfAdminFn_createServerFn_handler = createServerRpc({
  id: "c32d13f43fe7526b5583a33e543960f03decc4484328a43972354235687a8c62",
  name: "uploadPdfAdminFn",
  filename: "src/lib/api/pdfs.functions.ts"
}, (opts) => uploadPdfAdminFn.__executeServer(opts));
const uploadPdfAdminFn = createServerFn({
  method: "POST"
}).inputValidator((i) => objectType({
  alunoId: stringType().min(1).max(120),
  nome: stringType().min(1).max(200),
  descricao: stringType().max(1e3).optional().nullable(),
  base64: stringType().min(8).max(16e6)
  // ~12 MB
}).parse(i)).handler(uploadPdfAdminFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const raw = data.base64.replace(/^data:[^;]+;base64,/, "");
  const bytes = Buffer.from(raw, "base64");
  const safeName = data.nome.replace(/[^a-zA-Z0-9_\-\. ]/g, "_");
  const path = `treinos/${data.alunoId}/${Date.now()}-${safeName}.pdf`;
  const {
    error: upErr
  } = await supabaseAdmin.storage.from("treino-pdfs").upload(path, bytes, {
    contentType: "application/pdf",
    upsert: false
  });
  if (upErr) throw new Error(upErr.message);
  const {
    error
  } = await supabaseAdmin.from("treino_pdfs").insert({
    aluno_id: data.alunoId,
    nome: data.nome,
    descricao: data.descricao ?? null,
    storage_path: path,
    tamanho_bytes: bytes.length
  });
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
const deletePdfAdminFn_createServerFn_handler = createServerRpc({
  id: "cf4fc9b1d6a82a93189e82003d6ca6eec469bc7bdb56ae60e7889ff806de3be6",
  name: "deletePdfAdminFn",
  filename: "src/lib/api/pdfs.functions.ts"
}, (opts) => deletePdfAdminFn.__executeServer(opts));
const deletePdfAdminFn = createServerFn({
  method: "POST"
}).inputValidator((i) => objectType({
  id: stringType().uuid()
}).parse(i)).handler(deletePdfAdminFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    data: row
  } = await supabaseAdmin.from("treino_pdfs").select("storage_path").eq("id", data.id).maybeSingle();
  if (row?.storage_path) {
    await supabaseAdmin.storage.from("treino-pdfs").remove([row.storage_path]);
  }
  const {
    error
  } = await supabaseAdmin.from("treino_pdfs").delete().eq("id", data.id);
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
export {
  deletePdfAdminFn_createServerFn_handler,
  listMyPdfsFn_createServerFn_handler,
  listPdfsAdminFn_createServerFn_handler,
  uploadPdfAdminFn_createServerFn_handler
};
