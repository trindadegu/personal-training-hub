import { c as createServerRpc } from "./createServerRpc-BBFx9diD.mjs";
import { d as dbError } from "../_errors-DhTy7-Fu.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { r as requireAdminSession } from "./admin-auth.server-DLi38Do9.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, n as numberType } from "../_libs/zod.mjs";
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
const listPagamentosFn_createServerFn_handler = createServerRpc({
  id: "0eb7b6a9c4fac9ac77f8f86f40dffe2fbad1ef5ffe618d4f2312c8e8e249d47b",
  name: "listPagamentosFn",
  filename: "src/lib/api/pagamentos.functions.ts"
}, (opts) => listPagamentosFn.__executeServer(opts));
const listPagamentosFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().max(120).optional(),
  mes: stringType().regex(/^\d{4}-\d{2}$/).optional()
}).parse(input ?? {})).handler(listPagamentosFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  let q = supabaseAdmin.from("pagamentos").select("*").order("vencimento", {
    ascending: false
  });
  if (data.alunoId) q = q.eq("aluno_id", data.alunoId);
  if (data.mes) q = q.eq("mes_referencia", data.mes);
  const {
    data: rows,
    error
  } = await q;
  if (error) throw dbError(error);
  return rows ?? [];
});
const upsertPagamentoFn_createServerFn_handler = createServerRpc({
  id: "0b5fa4915a63e58ad9e45d1448a2717500f826aef783b374b2900b9fc0268d93",
  name: "upsertPagamentoFn",
  filename: "src/lib/api/pagamentos.functions.ts"
}, (opts) => upsertPagamentoFn.__executeServer(opts));
const upsertPagamentoFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  aluno_id: stringType().min(1).max(120),
  mes_referencia: stringType().regex(/^\d{4}-\d{2}$/),
  valor: numberType().min(0).max(1e6),
  vencimento: stringType().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: stringType().max(20).optional()
}).parse(input)).handler(upsertPagamentoFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    error
  } = await supabaseAdmin.from("pagamentos").upsert(data, {
    onConflict: "aluno_id,mes_referencia"
  });
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
const marcarPagoFn_createServerFn_handler = createServerRpc({
  id: "7d2b1cbab6355bf19ba4d1b32453189c55e8c504215380708aae696ff0873520",
  name: "marcarPagoFn",
  filename: "src/lib/api/pagamentos.functions.ts"
}, (opts) => marcarPagoFn.__executeServer(opts));
const marcarPagoFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().uuid(),
  alunoId: stringType().min(1).max(120),
  valor: numberType().min(0).max(1e6),
  mes: stringType().regex(/^\d{4}-\d{2}$/)
}).parse(input)).handler(marcarPagoFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const {
    error
  } = await supabaseAdmin.from("pagamentos").update({
    status: "pago",
    pago_em: today,
    pago_via: "manual"
  }).eq("id", data.id);
  if (error) throw dbError(error);
  const {
    data: existing
  } = await supabaseAdmin.from("financeiro_lancamentos").select("id").eq("pagamento_id", data.id).limit(1);
  if (existing && existing.length > 0) return {
    ok: true
  };
  const {
    error: e2
  } = await supabaseAdmin.from("financeiro_lancamentos").insert({
    escopo: "negocio",
    tipo: "receita",
    categoria: "Mensalidade",
    descricao: `Mensalidade ${data.mes}`,
    valor: data.valor,
    data: today,
    aluno_id: data.alunoId,
    pagamento_id: data.id
  });
  if (e2) throw new Error(e2.message);
  return {
    ok: true
  };
});
const marcarPendenteFn_createServerFn_handler = createServerRpc({
  id: "79e43bd6a3acf29bdafd35c9e8c52acf33292e7f663cdc467ed22203a47f7318",
  name: "marcarPendenteFn",
  filename: "src/lib/api/pagamentos.functions.ts"
}, (opts) => marcarPendenteFn.__executeServer(opts));
const marcarPendenteFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(marcarPendenteFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    error
  } = await supabaseAdmin.from("pagamentos").update({
    status: "pendente",
    pago_em: null
  }).eq("id", data.id);
  if (error) throw dbError(error);
  await supabaseAdmin.from("financeiro_lancamentos").delete().eq("pagamento_id", data.id);
  return {
    ok: true
  };
});
const gerarMensalidadesDoMesFn_createServerFn_handler = createServerRpc({
  id: "7a339db76ac6f3c49de9bda62c55cad9ba502cf43567ec924d4cea59cacd5968",
  name: "gerarMensalidadesDoMesFn",
  filename: "src/lib/api/pagamentos.functions.ts"
}, (opts) => gerarMensalidadesDoMesFn.__executeServer(opts));
const gerarMensalidadesDoMesFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  mes: stringType().regex(/^\d{4}-\d{2}$/)
}).parse(input)).handler(gerarMensalidadesDoMesFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    data: alunos,
    error: e1
  } = await supabaseAdmin.from("alunos").select("id, valor_mensalidade, dia_vencimento, status");
  if (e1) throw new Error(e1.message);
  const [y, m] = data.mes.split("-").map(Number);
  let criados = 0;
  for (const a of alunos ?? []) {
    if (a.status && a.status !== "ativo") continue;
    const valor = Number(a.valor_mensalidade ?? 0);
    if (!valor) continue;
    const dia = Math.min(Math.max(Number(a.dia_vencimento ?? 5), 1), 28);
    const venc = `${y}-${String(m).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
    const {
      data: existing
    } = await supabaseAdmin.from("pagamentos").select("id").eq("aluno_id", a.id).eq("mes_referencia", data.mes).maybeSingle();
    if (existing) continue;
    const {
      error
    } = await supabaseAdmin.from("pagamentos").insert({
      aluno_id: a.id,
      mes_referencia: data.mes,
      valor,
      vencimento: venc,
      status: "pendente"
    });
    if (!error) criados++;
  }
  return {
    criados
  };
});
export {
  gerarMensalidadesDoMesFn_createServerFn_handler,
  listPagamentosFn_createServerFn_handler,
  marcarPagoFn_createServerFn_handler,
  marcarPendenteFn_createServerFn_handler,
  upsertPagamentoFn_createServerFn_handler
};
