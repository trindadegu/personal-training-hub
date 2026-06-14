import { c as createServerRpc } from "./createServerRpc-BBFx9diD.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { b as requireStudentSession } from "./student-auth.server-BKD3yxe_.mjs";
import { c as createStripeClient, g as getStripeErrorMessage } from "./stripe.server-Dfh-S32c.mjs";
import { m as mesLabel } from "./pagamentos-D1w0ItLO.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/stripe.mjs";
import { o as objectType, e as enumType, s as stringType } from "../_libs/zod.mjs";
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
import "./createSsrRpc-BaOR-_gw.mjs";
import "events";
import "http";
import "https";
const createPagamentoCheckoutFn_createServerFn_handler = createServerRpc({
  id: "2f06a034265b06b69152a68bc408232e21547ec9ac87c003807e7d86393bf7ed",
  name: "createPagamentoCheckoutFn",
  filename: "src/lib/api/checkout.functions.ts"
}, (opts) => createPagamentoCheckoutFn.__executeServer(opts));
const createPagamentoCheckoutFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  pagamentoId: stringType().uuid(),
  returnUrl: stringType().url().max(500),
  environment: enumType(["sandbox", "live"])
}).parse(input)).handler(createPagamentoCheckoutFn_createServerFn_handler, async ({
  data
}) => {
  try {
    const session = await requireStudentSession();
    const alunoId = session.data.alunoId;
    const {
      data: pagamento,
      error
    } = await supabaseAdmin.from("pagamentos").select("id, aluno_id, valor, mes_referencia, status").eq("id", data.pagamentoId).maybeSingle();
    if (error || !pagamento) return {
      error: "Fatura não encontrada"
    };
    if (pagamento.aluno_id !== alunoId) return {
      error: "Fatura inválida"
    };
    if (pagamento.status === "pago") return {
      error: "Fatura já paga"
    };
    const stripe = createStripeClient(data.environment);
    const amountInCents = Math.round(Number(pagamento.valor) * 100);
    const description = `Mensalidade ${mesLabel(pagamento.mes_referencia)}`;
    const checkout = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: "brl",
          product_data: {
            name: description
          },
          unit_amount: amountInCents
        },
        quantity: 1
      }],
      mode: "payment",
      ui_mode: "embedded_page",
      return_url: data.returnUrl,
      payment_intent_data: {
        description
      },
      client_reference_id: pagamento.id,
      metadata: {
        pagamento_id: pagamento.id,
        aluno_id: pagamento.aluno_id,
        mes_referencia: pagamento.mes_referencia
      }
    });
    return {
      clientSecret: checkout.client_secret ?? ""
    };
  } catch (err) {
    return {
      error: getStripeErrorMessage(err)
    };
  }
});
const myHasOverdueFn_createServerFn_handler = createServerRpc({
  id: "6b4504be85b69592a4c7b8469f8bbe933d46dc98629a895883aa2f80a6234560",
  name: "myHasOverdueFn",
  filename: "src/lib/api/checkout.functions.ts"
}, (opts) => myHasOverdueFn.__executeServer(opts));
const myHasOverdueFn = createServerFn({
  method: "GET"
}).handler(myHasOverdueFn_createServerFn_handler, async () => {
  const session = await requireStudentSession();
  const alunoId = session.data.alunoId;
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const {
    data,
    error
  } = await supabaseAdmin.from("pagamentos").select("id, vencimento, valor, mes_referencia").eq("aluno_id", alunoId).eq("status", "pendente").lt("vencimento", today).order("vencimento", {
    ascending: true
  }).limit(1);
  if (error) return {
    overdue: false,
    pagamento: null
  };
  const row = data?.[0] ?? null;
  return {
    overdue: !!row,
    pagamento: row
  };
});
export {
  createPagamentoCheckoutFn_createServerFn_handler,
  myHasOverdueFn_createServerFn_handler
};
