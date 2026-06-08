import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { type StripeEnv, verifyWebhook } from "@/lib/stripe.server";

let _supabase: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  }
  return _supabase;
}

async function markPagamentoPaid(pagamentoId: string) {
  const supabase = getSupabase();
  const today = new Date().toISOString().slice(0, 10);

  const { data: pag } = await supabase
    .from("pagamentos")
    .select("id, aluno_id, valor, mes_referencia, status")
    .eq("id", pagamentoId)
    .maybeSingle();
  if (!pag) {
    console.error("Webhook: pagamento not found", pagamentoId);
    return;
  }
  if ((pag as any).status === "pago") return; // idempotente

  await supabase
    .from("pagamentos")
    .update({ status: "pago", pago_em: today })
    .eq("id", pagamentoId);

  await supabase.from("financeiro_lancamentos").insert({
    escopo: "negocio",
    tipo: "receita",
    categoria: "Mensalidade",
    descricao: `Mensalidade ${(pag as any).mes_referencia} (Stripe)`,
    valor: (pag as any).valor,
    data: today,
    aluno_id: (pag as any).aluno_id,
    pagamento_id: pagamentoId,
  });
}

async function handleWebhook(req: Request, env: StripeEnv) {
  const event = await verifyWebhook(req, env);

  switch (event.type) {
    case "checkout.session.completed":
    case "transaction.completed": {
      const obj = event.data.object as any;
      const pagamentoId =
        obj?.metadata?.pagamento_id || obj?.client_reference_id;
      if (pagamentoId) await markPagamentoPaid(pagamentoId);
      break;
    }
    default:
      console.log("Unhandled payment event:", event.type);
  }
}

export const Route = createFileRoute("/api/public/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawEnv = new URL(request.url).searchParams.get("env");
        if (rawEnv !== "sandbox" && rawEnv !== "live") {
          return Response.json({ received: true, ignored: "invalid env" });
        }
        try {
          await handleWebhook(request, rawEnv);
          return Response.json({ received: true });
        } catch (e) {
          console.error("Payment webhook error:", e);
          return new Response("Webhook error", { status: 400 });
        }
      },
    },
  },
});