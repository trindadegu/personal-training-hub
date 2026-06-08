import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireStudentSession } from "@/lib/student-auth.server";
import {
  type StripeEnv,
  createStripeClient,
  getStripeErrorMessage,
} from "@/lib/stripe.server";
import { mesLabel } from "@/lib/api/pagamentos";

type CheckoutResult = { clientSecret: string } | { error: string };

export const createPagamentoCheckoutFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        pagamentoId: z.string().uuid(),
        returnUrl: z.string().url().max(500),
        environment: z.enum(["sandbox", "live"]),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<CheckoutResult> => {
    try {
      const session = await requireStudentSession();
      const alunoId = session.data!.alunoId!;

      const { data: pagamento, error } = await supabaseAdmin
        .from("pagamentos")
        .select("id, aluno_id, valor, mes_referencia, status")
        .eq("id", data.pagamentoId)
        .maybeSingle();
      if (error || !pagamento) return { error: "Fatura não encontrada" };
      if (pagamento.aluno_id !== alunoId) return { error: "Fatura inválida" };
      if (pagamento.status === "pago") return { error: "Fatura já paga" };

      const stripe = createStripeClient(data.environment as StripeEnv);
      const amountInCents = Math.round(Number(pagamento.valor) * 100);
      const description = `Mensalidade ${mesLabel(pagamento.mes_referencia)}`;

      const checkout = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "brl",
              product_data: { name: description },
              unit_amount: amountInCents,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        ui_mode: "embedded" as any,
        return_url: data.returnUrl,
        payment_intent_data: { description },
        client_reference_id: pagamento.id,
        metadata: {
          pagamento_id: pagamento.id,
          aluno_id: pagamento.aluno_id,
          mes_referencia: pagamento.mes_referencia,
        },
      });

      return { clientSecret: checkout.client_secret ?? "" };
    } catch (err) {
      return { error: getStripeErrorMessage(err) };
    }
  });

/** Returns true if the logged student has any overdue (pendente + vencimento < hoje) invoice. */
export const myHasOverdueFn = createServerFn({ method: "GET" }).handler(async () => {
  const session = await requireStudentSession();
  const alunoId = session.data!.alunoId!;
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabaseAdmin
    .from("pagamentos")
    .select("id, vencimento, valor, mes_referencia")
    .eq("aluno_id", alunoId)
    .eq("status", "pendente")
    .lt("vencimento", today)
    .order("vencimento", { ascending: true })
    .limit(1);
  if (error) return { overdue: false, pagamento: null as any };
  const row = data?.[0] ?? null;
  return { overdue: !!row, pagamento: row };
});