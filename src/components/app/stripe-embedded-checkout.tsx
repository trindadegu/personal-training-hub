import { useCallback } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { createPagamentoCheckoutFn } from "@/lib/api/checkout.functions";

interface Props {
  pagamentoId: string;
  returnUrl: string;
}

export function StripePagamentoCheckout({ pagamentoId, returnUrl }: Props) {
  const fetchClientSecret = useCallback(async (): Promise<string> => {
    const result = await createPagamentoCheckoutFn({
      data: {
        pagamentoId,
        returnUrl,
        environment: getStripeEnvironment(),
      },
    });
    if ("error" in result) throw new Error(result.error);
    if (!result.clientSecret) throw new Error("Stripe não retornou client_secret");
    return result.clientSecret;
  }, [pagamentoId, returnUrl]);

  return (
    <div id="checkout" className="min-h-[520px]">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}