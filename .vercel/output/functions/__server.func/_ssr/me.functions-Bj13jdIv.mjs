import { c as createServerRpc } from "./createServerRpc-BBFx9diD.mjs";
import { d as dbError } from "../_errors-DhTy7-Fu.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { b as requireStudentSession, r as requireAdminOrStudentSessionFor } from "./student-auth.server-BKD3yxe_.mjs";
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
import "./admin-auth.server-DLi38Do9.mjs";
const myProfileFn_createServerFn_handler = createServerRpc({
  id: "e94c59379092d5f60cafa632cffa57d5a514e8bc00e9ea03b171ebf04a744d3a",
  name: "myProfileFn",
  filename: "src/lib/api/me.functions.ts"
}, (opts) => myProfileFn.__executeServer(opts));
const myProfileFn = createServerFn({
  method: "GET"
}).handler(myProfileFn_createServerFn_handler, async () => {
  const session = await requireStudentSession();
  const id = session.data.alunoId;
  const {
    data,
    error
  } = await supabaseAdmin.from("alunos").select("*").eq("id", id).maybeSingle();
  if (error) throw dbError(error);
  return data;
});
const myPlanoFn_createServerFn_handler = createServerRpc({
  id: "86b3afc9f282a9b27b2ad7ad81a2597ab8595a7a5915594fa4681b1298dff24e",
  name: "myPlanoFn",
  filename: "src/lib/api/me.functions.ts"
}, (opts) => myPlanoFn.__executeServer(opts));
const myPlanoFn = createServerFn({
  method: "GET"
}).handler(myPlanoFn_createServerFn_handler, async () => {
  const session = await requireStudentSession();
  const {
    data: aluno
  } = await supabaseAdmin.from("alunos").select("plano_id").eq("id", session.data.alunoId).maybeSingle();
  if (!aluno?.plano_id) return null;
  const {
    data,
    error
  } = await supabaseAdmin.from("planos").select("*").eq("id", aluno.plano_id).maybeSingle();
  if (error) throw dbError(error);
  return data;
});
const myPagamentosFn_createServerFn_handler = createServerRpc({
  id: "dff285738d588eacced944ba9d48a6b7e59f9f3bf7bcd17b9ee892223c333c8a",
  name: "myPagamentosFn",
  filename: "src/lib/api/me.functions.ts"
}, (opts) => myPagamentosFn.__executeServer(opts));
const myPagamentosFn = createServerFn({
  method: "GET"
}).handler(myPagamentosFn_createServerFn_handler, async () => {
  const session = await requireStudentSession();
  const {
    data,
    error
  } = await supabaseAdmin.from("pagamentos").select("*").eq("aluno_id", session.data.alunoId).order("vencimento", {
    ascending: false
  });
  if (error) throw dbError(error);
  return data ?? [];
});
const myNotasFn_createServerFn_handler = createServerRpc({
  id: "cf0bbfa3f4677529e47ab572b520c25145eb0d98c5ca5f4ca19c25572df6cc35",
  name: "myNotasFn",
  filename: "src/lib/api/me.functions.ts"
}, (opts) => myNotasFn.__executeServer(opts));
const myNotasFn = createServerFn({
  method: "GET"
}).handler(myNotasFn_createServerFn_handler, async () => {
  const session = await requireStudentSession();
  const {
    data,
    error
  } = await supabaseAdmin.from("aluno_notas").select("*").eq("aluno_id", session.data.alunoId).order("data", {
    ascending: false
  }).order("created_at", {
    ascending: false
  });
  if (error) throw dbError(error);
  return data ?? [];
});
const updateMyProfileFn_createServerFn_handler = createServerRpc({
  id: "9eb0645aa312ca60cd3a330bd140263276506cc23438c0e040b574e76df0860f",
  name: "updateMyProfileFn",
  filename: "src/lib/api/me.functions.ts"
}, (opts) => updateMyProfileFn.__executeServer(opts));
const updateMyProfileFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  telefone: stringType().max(40).nullable().optional(),
  objetivo: stringType().max(2e3).nullable().optional()
}).parse(input)).handler(updateMyProfileFn_createServerFn_handler, async ({
  data
}) => {
  const session = await requireStudentSession();
  const {
    error
  } = await supabaseAdmin.from("alunos").update(data).eq("id", session.data.alunoId);
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
const uploadMyAvatarFn_createServerFn_handler = createServerRpc({
  id: "4067b7470ed3b61beb5fd520dafa81f8f0ed83bc7800897878b2872386bfcbd3",
  name: "uploadMyAvatarFn",
  filename: "src/lib/api/me.functions.ts"
}, (opts) => uploadMyAvatarFn.__executeServer(opts));
const uploadMyAvatarFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  base64: stringType().min(8).max(8e6),
  // ~6MB
  mime: stringType().regex(/^image\/(png|jpeg|jpg|webp)$/)
}).parse(input)).handler(uploadMyAvatarFn_createServerFn_handler, async ({
  data
}) => {
  const session = await requireStudentSession();
  const alunoId = session.data.alunoId;
  const ext = data.mime === "image/png" ? "png" : data.mime === "image/webp" ? "webp" : "jpg";
  const path = `avatars/${alunoId}.${ext}`;
  const bytes = Buffer.from(data.base64.replace(/^data:[^;]+;base64,/, ""), "base64");
  const {
    error: upErr
  } = await supabaseAdmin.storage.from("treino-pdfs").upload(path, bytes, {
    contentType: data.mime,
    upsert: true
  });
  if (upErr) throw new Error(upErr.message);
  const {
    error: e2
  } = await supabaseAdmin.from("alunos").update({
    foto_url: path
  }).eq("id", alunoId);
  if (e2) throw dbError(e2);
  return {
    ok: true,
    path
  };
});
const avatarSignedUrlFn_createServerFn_handler = createServerRpc({
  id: "f7beb63b7fc3694ad8301bef4758b00728f00254540737f3e71623990a96568f",
  name: "avatarSignedUrlFn",
  filename: "src/lib/api/me.functions.ts"
}, (opts) => avatarSignedUrlFn.__executeServer(opts));
const avatarSignedUrlFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120)
}).parse(input)).handler(avatarSignedUrlFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminOrStudentSessionFor(data.alunoId);
  const {
    data: row
  } = await supabaseAdmin.from("alunos").select("foto_url").eq("id", data.alunoId).maybeSingle();
  const path = row?.foto_url;
  if (!path) return null;
  const {
    data: signed,
    error
  } = await supabaseAdmin.storage.from("treino-pdfs").createSignedUrl(path, 60 * 60 * 24);
  if (error) return null;
  return signed?.signedUrl ?? null;
});
export {
  avatarSignedUrlFn_createServerFn_handler,
  myNotasFn_createServerFn_handler,
  myPagamentosFn_createServerFn_handler,
  myPlanoFn_createServerFn_handler,
  myProfileFn_createServerFn_handler,
  updateMyProfileFn_createServerFn_handler,
  uploadMyAvatarFn_createServerFn_handler
};
