import { c as createServerRpc } from "./createServerRpc-BBFx9diD.mjs";
import { d as dbError } from "../_errors-DhTy7-Fu.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { r as requireAdminSession } from "./admin-auth.server-DLi38Do9.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { e as enumType, o as objectType, s as stringType, b as booleanType, n as numberType } from "../_libs/zod.mjs";
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
const escopoSchema = enumType(["negocio", "pessoal"]);
const tipoSchema = enumType(["receita", "despesa"]);
const listLancamentosFn_createServerFn_handler = createServerRpc({
  id: "da4fdd2e3dd0eb9172cd69eb4ecbdadb1d83906411e88569a28a3f9bb820b431",
  name: "listLancamentosFn",
  filename: "src/lib/api/financeiro.functions.ts"
}, (opts) => listLancamentosFn.__executeServer(opts));
const listLancamentosFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  escopo: escopoSchema.optional(),
  from: stringType().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  to: stringType().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
}).parse(input ?? {})).handler(listLancamentosFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  let q = supabaseAdmin.from("financeiro_lancamentos").select("*").order("data", {
    ascending: false
  });
  if (data.escopo) q = q.eq("escopo", data.escopo);
  if (data.from) q = q.gte("data", data.from);
  if (data.to) q = q.lte("data", data.to);
  const {
    data: rows,
    error
  } = await q;
  if (error) throw dbError(error);
  return rows ?? [];
});
const addLancamentoFn_createServerFn_handler = createServerRpc({
  id: "c8b72510a5888c71dca4753f99b31f785e452b5c6846270bcef9a4b5ce5cee11",
  name: "addLancamentoFn",
  filename: "src/lib/api/financeiro.functions.ts"
}, (opts) => addLancamentoFn.__executeServer(opts));
const addLancamentoFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  escopo: escopoSchema,
  tipo: tipoSchema,
  categoria: stringType().max(80).nullable().optional(),
  descricao: stringType().min(1).max(200),
  valor: numberType().min(0).max(1e7),
  data: stringType().regex(/^\d{4}-\d{2}-\d{2}$/),
  recorrente: booleanType().optional()
}).parse(input)).handler(addLancamentoFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    error
  } = await supabaseAdmin.from("financeiro_lancamentos").insert({
    escopo: data.escopo,
    tipo: data.tipo,
    categoria: data.categoria ?? null,
    descricao: data.descricao,
    valor: data.valor,
    data: data.data,
    recorrente: data.recorrente ?? false
  });
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
const deleteLancamentoFn_createServerFn_handler = createServerRpc({
  id: "f01129b20a35d25968205742793dc69bd38297e752325fbdf03effdd31764dba",
  name: "deleteLancamentoFn",
  filename: "src/lib/api/financeiro.functions.ts"
}, (opts) => deleteLancamentoFn.__executeServer(opts));
const deleteLancamentoFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(deleteLancamentoFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    error
  } = await supabaseAdmin.from("financeiro_lancamentos").delete().eq("id", data.id);
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
const listRecorrentesFn_createServerFn_handler = createServerRpc({
  id: "d95f171a8fd74a4a03b29c88322b8fad2365704ad415851da78718eb12a8fdd8",
  name: "listRecorrentesFn",
  filename: "src/lib/api/financeiro.functions.ts"
}, (opts) => listRecorrentesFn.__executeServer(opts));
const listRecorrentesFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  escopo: escopoSchema.optional()
}).parse(input ?? {})).handler(listRecorrentesFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  let q = supabaseAdmin.from("despesas_recorrentes").select("*").order("dia");
  if (data.escopo) q = q.eq("escopo", data.escopo);
  const {
    data: rows,
    error
  } = await q;
  if (error) throw dbError(error);
  return rows ?? [];
});
const addRecorrenteFn_createServerFn_handler = createServerRpc({
  id: "f07bc71dad10e86811d8f9f20e18f28eef9d624b2e36ccdf18d4f0becfc8c183",
  name: "addRecorrenteFn",
  filename: "src/lib/api/financeiro.functions.ts"
}, (opts) => addRecorrenteFn.__executeServer(opts));
const addRecorrenteFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  escopo: escopoSchema,
  descricao: stringType().min(1).max(200),
  categoria: stringType().max(80).nullable().optional(),
  valor: numberType().min(0).max(1e7),
  dia: numberType().int().min(1).max(28),
  ativo: booleanType().optional()
}).parse(input)).handler(addRecorrenteFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    error
  } = await supabaseAdmin.from("despesas_recorrentes").insert({
    escopo: data.escopo,
    descricao: data.descricao,
    categoria: data.categoria ?? null,
    valor: data.valor,
    dia: data.dia,
    ativo: data.ativo ?? true
  });
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
const deleteRecorrenteFn_createServerFn_handler = createServerRpc({
  id: "b841923b087b73d4a230490be354f87a330404df0878697ef733ebe2c6dbef97",
  name: "deleteRecorrenteFn",
  filename: "src/lib/api/financeiro.functions.ts"
}, (opts) => deleteRecorrenteFn.__executeServer(opts));
const deleteRecorrenteFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(deleteRecorrenteFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    error
  } = await supabaseAdmin.from("despesas_recorrentes").delete().eq("id", data.id);
  if (error) throw dbError(error);
  return {
    ok: true
  };
});
const gerarRecorrentesDoMesFn_createServerFn_handler = createServerRpc({
  id: "8fa1934202d659da526af248333e0ebdcfaa972f45831787fc41852b925577a5",
  name: "gerarRecorrentesDoMesFn",
  filename: "src/lib/api/financeiro.functions.ts"
}, (opts) => gerarRecorrentesDoMesFn.__executeServer(opts));
const gerarRecorrentesDoMesFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  mes: stringType().regex(/^\d{4}-\d{2}$/)
}).parse(input)).handler(gerarRecorrentesDoMesFn_createServerFn_handler, async ({
  data
}) => {
  await requireAdminSession();
  const {
    data: recs,
    error: e1
  } = await supabaseAdmin.from("despesas_recorrentes").select("*").order("dia");
  if (e1) throw new Error(e1.message);
  const [y, m] = data.mes.split("-").map(Number);
  let criados = 0;
  for (const r of recs ?? []) {
    if (!r.ativo) continue;
    if (r.ultimo_gerado_mes === data.mes) continue;
    const dia = Math.min(Math.max(r.dia, 1), 28);
    const dataStr = `${y}-${String(m).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
    const {
      error
    } = await supabaseAdmin.from("financeiro_lancamentos").insert({
      escopo: r.escopo,
      tipo: "despesa",
      categoria: r.categoria,
      descricao: r.descricao,
      valor: r.valor,
      data: dataStr,
      recorrente: true,
      recorrente_id: r.id
    });
    if (!error) {
      await supabaseAdmin.from("despesas_recorrentes").update({
        ultimo_gerado_mes: data.mes
      }).eq("id", r.id);
      criados++;
    }
  }
  return {
    criados
  };
});
export {
  addLancamentoFn_createServerFn_handler,
  addRecorrenteFn_createServerFn_handler,
  deleteLancamentoFn_createServerFn_handler,
  deleteRecorrenteFn_createServerFn_handler,
  gerarRecorrentesDoMesFn_createServerFn_handler,
  listLancamentosFn_createServerFn_handler,
  listRecorrentesFn_createServerFn_handler
};
