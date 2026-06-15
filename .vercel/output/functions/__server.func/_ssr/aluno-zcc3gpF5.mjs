import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, f as useLocation, O as Outlet, L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as useQuery } from "../_libs/tanstack__react-query.mjs";
import { B as Button } from "./button-DWfIo_Ug.mjs";
import { T as ThemeToggle } from "./theme-toggle-t8P3na68.mjs";
import { c as clearStudentSession } from "./session-DWdtqcAN.mjs";
import { b as getStudentMe, c as logoutStudent } from "./auth-BBDnHtYh.mjs";
import { m as myHasOverdueFn } from "./checkout.functions-DYVnlb3z.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "../_libs/stripe.mjs";
import { D as Dumbbell, e as LogOut, f as CalendarDays, N as NotebookPen, W as Wallet, U as User, T as TriangleAlert } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "./types-DN-33vrr.mjs";
import "./router-DNEfQkU_.mjs";
import "./createSsrRpc-BaOR-_gw.mjs";
import "./server-DVxLX_uO.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "./tslib.js";
import "../_libs/supabase__functions-js.mjs";
import "./stripe.server-Dfh-S32c.mjs";
import "../_libs/zod.mjs";
import "events";
import "http";
import "https";
import "./students.functions-SKg7Ok10.mjs";
const clientToken = "pk_test_51TfiWsB55TOdsEPBVRojHlSDB7hCP172Btb2IVwoln4KCh5qMz8j03wYrN6zAibcznNESoIohqmnHZpRcQxjXJwR00NKdVoS0w";
function PaymentTestModeBanner() {
  if (clientToken.startsWith("pk_test_")) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-orange-100 border-b border-orange-300 px-4 py-1.5 text-center text-[11px] font-medium text-orange-800", children: "Modo de teste — use o cartão 4242 4242 4242 4242 para simular pagamentos." });
  }
  return null;
}
function AlunoLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = reactExports.useState(null);
  const [ready, setReady] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await getStudentMe();
        if (cancelled) return;
        if (!me) {
          clearStudentSession();
          setReady(true);
          navigate({
            to: "/login"
          });
          return;
        }
        setSession({
          id: me.id,
          name: me.nome,
          expiresAt: Date.now() + 1e3 * 60 * 60 * 24
        });
        setReady(true);
      } catch {
        if (cancelled) return;
        clearStudentSession();
        setReady(true);
        navigate({
          to: "/login"
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);
  if (!ready || !session) return null;
  const tabs = [{
    to: "/aluno",
    label: "Treino",
    icon: Dumbbell,
    exact: true
  }, {
    to: "/aluno/historico",
    label: "Histórico",
    icon: CalendarDays,
    exact: false
  }, {
    to: "/aluno/anotacoes",
    label: "Anotações",
    icon: NotebookPen,
    exact: false
  }, {
    to: "/aluno/pagamentos",
    label: "Pagamentos",
    icon: Wallet,
    exact: false
  }, {
    to: "/aluno/perfil",
    label: "Perfil",
    icon: User,
    exact: false
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentTestModeBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(OverdueBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto flex items-center justify-between px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-md)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: "Olá," }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold leading-none", children: session.name })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: async () => {
          try {
            await logoutStudent();
          } catch {
          }
          clearStudentSession();
          navigate({
            to: "/login"
          });
        }, "aria-label": "Sair", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "container mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto grid max-w-xl grid-cols-5 px-2 py-2", children: tabs.map((t) => {
      const active = t.exact ? location.pathname === t.to : location.pathname.startsWith(t.to);
      const Icon = t.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: t.to, className: `flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-medium transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }),
        t.label
      ] }, t.to);
    }) }) })
  ] });
}
function OverdueBanner() {
  const {
    data
  } = useQuery({
    queryKey: ["my-overdue"],
    queryFn: () => myHasOverdueFn(),
    refetchInterval: 3e4
  });
  if (!data?.overdue) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/aluno/pagamentos", className: "flex items-center justify-center gap-2 bg-destructive px-4 py-2 text-center text-sm font-semibold text-destructive-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4" }),
    "Mensalidade em atraso — toque para pagar agora"
  ] });
}
export {
  AlunoLayout as component
};
