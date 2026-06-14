import { c as createServerRpc } from "./createServerRpc-BBFx9diD.mjs";
import { d as dbError } from "../_errors-DhTy7-Fu.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { r as requireAdminSession } from "./admin-auth.server-DLi38Do9.mjs";
import { g as getStudentSession } from "./student-auth.server-BKD3yxe_.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, n as numberType, s as stringType } from "../_libs/zod.mjs";
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
const PatchSchema = objectType({
  nome: stringType().min(1).max(200).optional(),
  telefone: stringType().max(40).nullable().optional(),
  valor_mensalidade: numberType().min(0).max(1e6).optional(),
  dia_vencimento: numberType().int().min(1).max(28).optional(),
  status: stringType().max(40).optional(),
  objetivo: stringType().max(2e3).nullable().optional(),
  observacoes: stringType().max(5e3).nullable().optional(),
  data_inicio: stringType().max(40).optional(),
  plano_id: stringType().uuid().nullable().optional(),
  meta_frequencia_semanal: numberType().int().min(0).max(7).optional(),
  meta_frequencia_mensal: numberType().int().min(0).max(31).optional()
}).strict();
const listStudentsAdminFn_createServerFn_handler = createServerRpc({
  id: "f54e8129ac7fa59f145a4738547f4a82c9294925ec35d8444a2c1236773e620b",
  name: "listStudentsAdminFn",
  filename: "src/lib/api/students.functions.ts"
}, (opts) => listStudentsAdminFn.__executeServer(opts));
const listStudentsAdminFn = createServerFn({
  method: "GET"
}).handler(listStudentsAdminFn_createServerFn_handler, async () => {
  await requireAdminSession();
  const {
    data,
    error
  } = await supabaseAdmin.from("alunos").select("*").order("nome");
  if (error) throw dbError(error);
  return data ?? [];
});
const listStudentsPublicFn_createServerFn_handler = createServerRpc({
  id: "ef17b9cecf708b333c8d054b55bcf18b15f8f5c2700725f71c6c40f171417704",
  name: "listStudentsPublicFn",
  filename: "src/lib/api/students.functions.ts"
}, (opts) => listStudentsPublicFn.__executeServer(opts));
const listStudentsPublicFn = createServerFn({
  method: "GET"
}).handler(listStudentsPublicFn_createServerFn_handler, async () => {
  const {
    data,
    error
  } = await supabaseAdmin.from("alunos").select("id, nome").order("nome");
  if (error) throw dbError(error);
  return data ?? [];
});
const findStudentAdminFn_createServerFn_handler = createServerRpc({
  id: "eb7190b7ef4106bc36b6c977bc96b9ab525f6f32c98dbb23f36c60c5dec97fa3",
  name: "findStudentAdminFn",
  filename: "src/lib/api/students.functions.ts"
}, (opts) => findStudentAdminFn.__executeServer(opts));
const findStudentAdminFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().min(1).max(120)
}).parse(input)).handler(findStudentAdminFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    data: row,
    error
  } = await supabaseAdmin.from("alunos").select("*").eq("id", data.id).maybeSingle();
  if (error) throw dbError(error);
  return row;
});
const createStudentFn_createServerFn_handler = createServerRpc({
  id: "2427a78193309e882e1a26540685c7befe6bc4203a39c0eb46d320ab3cf4866c",
  name: "createStudentFn",
  filename: "src/lib/api/students.functions.ts"
}, (opts) => createStudentFn.__executeServer(opts));
const createStudentFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  nome: stringType().min(1).max(200),
  telefone: stringType().max(40).nullable().optional(),
  valor_mensalidade: numberType().min(0).max(1e6).optional(),
  dia_vencimento: numberType().int().min(1).max(28).optional(),
  plano_id: stringType().uuid().nullable().optional()
}).parse(input)).handler(createStudentFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const id = "aluno_" + Date.now();
  const {
    data: row,
    error
  } = await supabaseAdmin.from("alunos").insert({
    id,
    nome: data.nome,
    telefone: data.telefone ?? null,
    valor_mensalidade: data.valor_mensalidade ?? 0,
    dia_vencimento: data.dia_vencimento ?? 5,
    plano_id: data.plano_id ?? null
  }).select().single();
  if (error) throw dbError(error);
  await supabaseAdmin.from("treinos").insert({
    aluno_id: id,
    treino: {}
  });
  return row;
});
const updateStudentFn_createServerFn_handler = createServerRpc({
  id: "0ab2afe9f32f8e99ee1b1110caf6cd7ba7548568024da8d5967df6efd32211a5",
  name: "updateStudentFn",
  filename: "src/lib/api/students.functions.ts"
}, (opts) => updateStudentFn.__executeServer(opts));
const updateStudentFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().min(1).max(120),
  patch: PatchSchema
}).parse(input)).handler(updateStudentFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    error
  } = await supabaseAdmin.from("alunos").update(data.patch).eq("id", data.id);
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
const deleteStudentFn_createServerFn_handler = createServerRpc({
  id: "eb10358c943e6b1a216b5c768be6db2f70454c77c050cf70aad1b0d22c852812",
  name: "deleteStudentFn",
  filename: "src/lib/api/students.functions.ts"
}, (opts) => deleteStudentFn.__executeServer(opts));
const deleteStudentFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().min(1).max(120)
}).parse(input)).handler(deleteStudentFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    error
  } = await supabaseAdmin.from("alunos").delete().eq("id", data.id);
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
const lookupStudentLoginFn_createServerFn_handler = createServerRpc({
  id: "097268f5367900d87a887aaaf1858e20a3968147ce3bc1a4d53ed2ec20c9dca8",
  name: "lookupStudentLoginFn",
  filename: "src/lib/api/students.functions.ts"
}, (opts) => lookupStudentLoginFn.__executeServer(opts));
const lookupStudentLoginFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().min(1).max(120),
  password: stringType().min(1).max(120)
}).parse(input)).handler(lookupStudentLoginFn_createServerFn_handler, async ({
  data
}) => {
  const expected = data.id.slice(-6);
  if (data.password !== expected) return null;
  const {
    data: row,
    error
  } = await supabaseAdmin.from("alunos").select("id, nome").eq("id", data.id).maybeSingle();
  if (error) throw dbError(error);
  const aluno = row;
  if (aluno) {
    const session = await getStudentSession();
    await session.update({
      alunoId: aluno.id,
      nome: aluno.nome,
      loggedInAt: Date.now()
    });
  }
  return aluno;
});
const getStudentMeFn_createServerFn_handler = createServerRpc({
  id: "2fb8a4a9682a36fb497c70ce0c2ca7bee74340886fd6e9c48687de1288cd56fb",
  name: "getStudentMeFn",
  filename: "src/lib/api/students.functions.ts"
}, (opts) => getStudentMeFn.__executeServer(opts));
const getStudentMeFn = createServerFn({
  method: "GET"
}).handler(getStudentMeFn_createServerFn_handler, async () => {
  const session = await getStudentSession();
  if (!session.data?.alunoId) return null;
  return {
    id: session.data.alunoId,
    nome: session.data.nome ?? ""
  };
});
const logoutStudentFn_createServerFn_handler = createServerRpc({
  id: "0d4be5278d6792460fce198edc807ac4c38040b98e491c7269d9d6cf2cb819de",
  name: "logoutStudentFn",
  filename: "src/lib/api/students.functions.ts"
}, (opts) => logoutStudentFn.__executeServer(opts));
const logoutStudentFn = createServerFn({
  method: "POST"
}).handler(logoutStudentFn_createServerFn_handler, async () => {
  const session = await getStudentSession();
  await session.clear();
  return {
    ok: true
  };
});
export {
  createStudentFn_createServerFn_handler,
  deleteStudentFn_createServerFn_handler,
  findStudentAdminFn_createServerFn_handler,
  getStudentMeFn_createServerFn_handler,
  listStudentsAdminFn_createServerFn_handler,
  listStudentsPublicFn_createServerFn_handler,
  logoutStudentFn_createServerFn_handler,
  lookupStudentLoginFn_createServerFn_handler,
  updateStudentFn_createServerFn_handler
};
