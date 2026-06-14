import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { g as useSearch } from "../_libs/tanstack__react-router.mjs";
import { c as useQueryClient, b as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { C as Card, a as CardContent } from "./card-DIV666p3.mjs";
import { B as Button } from "./button-DWfIo_Ug.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Ci2xTPzf.mjs";
import { d as getMyPagamentos, b as getMyPlano } from "./me-DNEQf0dF.mjs";
import { f as formatBRL, a as formatDateBR } from "./config-BwxWJN3e.mjs";
import { m as mesLabel } from "./pagamentos-D1w0ItLO.mjs";
import { E as EmbeddedCheckoutProvider, a as EmbeddedCheckout } from "../_libs/stripe__react-stripe-js.mjs";
import { l as loadStripe } from "../_libs/stripe__stripe-js.mjs";
import { c as createPagamentoCheckoutFn } from "./checkout.functions-DYVnlb3z.mjs";
import "../_libs/seroval.mjs";
import { W as Wallet, u as CircleCheck, q as Clock, K as CreditCard } from "../_libs/lucide-react.mjs";
import "../_libs/dotenv.mjs";
import "fs";
import "path";
import "os";
import "crypto";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "./createSsrRpc-BaOR-_gw.mjs";
import "./server-DVxLX_uO.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
import "../_libs/prop-types.mjs";
const clientToken = "pk_test_51TfiWsB55TOdsEPBVRojHlSDB7hCP172Btb2IVwoln4KCh5qMz8j03wYrN6zAibcznNESoIohqmnHZpRcQxjXJwR00NKdVoS0w";
function paymentsEnvironment() {
  if (clientToken?.startsWith("pk_test_")) return "sandbox";
  if (clientToken?.startsWith("pk_live_")) return "live";
  throw new Error(
    "Pagamentos não estão configurados para este ambiente. Complete o go-live para aceitar pagamentos reais."
  );
}
let stripePromise = null;
function getStripe() {
  if (!stripePromise) {
    paymentsEnvironment();
    stripePromise = loadStripe(clientToken);
  }
  return stripePromise;
}
function getStripeEnvironment() {
  return paymentsEnvironment();
}
function hasPaymentsConfigured() {
  return clientToken.startsWith("pk_test_") || clientToken.startsWith("pk_live_");
}
function StripePagamentoCheckout({ pagamentoId, returnUrl }) {
  const fetchClientSecret = reactExports.useCallback(async () => {
    const result = await createPagamentoCheckoutFn({
      data: {
        pagamentoId,
        returnUrl,
        environment: getStripeEnvironment()
      }
    });
    if ("error" in result) throw new Error(result.error);
    if (!result.clientSecret) throw new Error("Stripe não retornou client_secret");
    return result.clientSecret;
  }, [pagamentoId, returnUrl]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "checkout", className: "min-h-[520px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmbeddedCheckoutProvider, { stripe: getStripe(), options: { fetchClientSecret }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmbeddedCheckout, {}) }) });
}
function PagamentosPage() {
  const {
    paid
  } = useSearch({
    from: "/aluno/pagamentos"
  });
  const qc = useQueryClient();
  const [openId, setOpenId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (paid) {
      toast.success("Pagamento processado! Atualizando…");
      setOpenId(null);
      const t = setTimeout(() => {
        qc.invalidateQueries({
          queryKey: ["my-pagamentos"]
        });
        qc.invalidateQueries({
          queryKey: ["my-overdue"]
        });
      }, 2e3);
      return () => clearTimeout(t);
    }
  }, [paid, qc]);
  const {
    data: pagamentos = []
  } = useQuery({
    queryKey: ["my-pagamentos"],
    queryFn: getMyPagamentos
  });
  const {
    data: plano
  } = useQuery({
    queryKey: ["my-plano"],
    queryFn: getMyPlano
  });
  const proxima = pagamentos.find((p) => p.status === "pendente");
  const canPay = hasPaymentsConfigured();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Pagamentos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Histórico e próxima cobrança." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Plano atual" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-lg font-bold", children: plano?.nome ?? "Sem plano vinculado" }),
          plano && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            formatBRL(Number(plano.preco_mensal)),
            " / mês"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-5 w-5" }) })
      ] }),
      proxima && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Próxima cobrança: " }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
          formatDateBR(proxima.vencimento),
          " · ",
          formatBRL(Number(proxima.valor))
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "px-1 text-sm font-semibold text-muted-foreground", children: "Histórico" }),
      pagamentos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-8 text-center text-sm text-muted-foreground", children: "Nenhum pagamento registrado." }) }) : pagamentos.map((p) => {
        const atrasado = p.status === "pendente" && new Date(p.vencimento) < new Date((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold", children: mesLabel(p.mes_referencia) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Vence ",
              formatDateBR(p.vencimento),
              " · ",
              formatBRL(Number(p.valor))
            ] }),
            p.pago_em && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-emerald-700 dark:text-emerald-400", children: [
              "Pago em ",
              formatDateBR(p.pago_em)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase ${p.status === "pago" ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" : atrasado ? "bg-destructive/15 text-destructive" : "bg-amber-500/15 text-amber-700 dark:text-amber-400"}`, children: [
              p.status === "pago" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              p.status === "pago" ? "Pago" : atrasado ? "Atrasado" : "Pendente"
            ] }),
            p.status === "pendente" && canPay && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: atrasado ? "destructive" : "default", onClick: () => setOpenId(p.id), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "mr-1 h-3.5 w-3.5" }),
              "Pagar agora"
            ] })
          ] })
        ] }) }, p.id);
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!openId, onOpenChange: (v) => !v && setOpenId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl p-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "px-6 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Pagamento" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 sm:px-6 sm:pb-6", children: openId && /* @__PURE__ */ jsxRuntimeExports.jsx(StripePagamentoCheckout, { pagamentoId: openId, returnUrl: `${window.location.origin}/aluno/pagamentos?paid=1` }) })
    ] }) })
  ] });
}
export {
  PagamentosPage as component
};
