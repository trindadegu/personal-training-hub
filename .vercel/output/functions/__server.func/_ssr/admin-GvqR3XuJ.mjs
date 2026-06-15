import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, O as Outlet, f as useLocation, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-DWfIo_Ug.mjs";
import { T as ThemeToggle } from "./theme-toggle-t8P3na68.mjs";
import { b as clearAdminSession } from "./session-DWdtqcAN.mjs";
import { d as logoutAdmin } from "./auth-BBDnHtYh.mjs";
import { S as Sheet, a as SheetTrigger, b as SheetContent } from "./sheet-Jd10ol5m.mjs";
import { R as Route$i } from "./router-DNEfQkU_.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import "../_libs/stripe.mjs";
import { g as Menu, e as LogOut, D as Dumbbell, h as LayoutDashboard, i as Users, j as Sparkles, k as ClipboardList, l as MapPin, W as Wallet, m as WalletMinimal, n as Settings } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "./types-DN-33vrr.mjs";
import "./students.functions-SKg7Ok10.mjs";
import "./createSsrRpc-BaOR-_gw.mjs";
import "./server-DVxLX_uO.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
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
import "./tslib.js";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "./stripe.server-Dfh-S32c.mjs";
import "events";
import "http";
import "https";
const NAV = [{
  to: "/admin",
  label: "Visão geral",
  icon: LayoutDashboard,
  exact: true
}, {
  to: "/admin/alunos",
  label: "Alunos",
  icon: Users,
  exact: false
}, {
  to: "/admin/planos",
  label: "Planos",
  icon: Sparkles,
  exact: false
}, {
  to: "/admin/treinos",
  label: "Treinos",
  icon: Dumbbell,
  exact: false
}, {
  to: "/admin/padrao",
  label: "Treino padrão",
  icon: ClipboardList,
  exact: false
}, {
  to: "/admin/checkins",
  label: "Check-ins",
  icon: MapPin,
  exact: false
}, {
  to: "/admin/financeiro",
  label: "Financeiro · Negócio",
  icon: Wallet,
  exact: false
}, {
  to: "/admin/pessoal",
  label: "Financeiro · Pessoal",
  icon: WalletMinimal,
  exact: false
}, {
  to: "/admin/configuracoes",
  label: "Configurações",
  icon: Settings,
  exact: false
}];
function AdminLayout() {
  const navigate = useNavigate();
  const {
    username
  } = Route$i.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-card md:flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-1 flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card/80 px-4 py-3 backdrop-blur md:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "md:hidden", "aria-label": "Menu", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetContent, { side: "left", className: "w-72 p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, {}) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: "Painel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-base font-semibold leading-none", children: [
              "Admin · ",
              username
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Sair", onClick: async () => {
            clearAdminSession();
            try {
              await logoutAdmin();
            } catch {
            }
            navigate({
              to: "/login"
            });
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "container mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-6 md:py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] }) });
}
function SidebarContent() {
  const location = useLocation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "mb-6 flex items-center gap-2 px-2 font-display text-lg font-bold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-md)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { className: "h-4 w-4" }) }),
      "Atlântida"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 space-y-1", children: NAV.map((n) => {
      const active = n.exact ? location.pathname === n.to : location.pathname.startsWith(n.to);
      const Icon = n.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: n.to, className: `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
        n.label
      ] }, n.to);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 pt-4 text-[10px] uppercase tracking-wider text-muted-foreground", children: "v1 · Painel do personal" })
  ] });
}
export {
  AdminLayout as component
};
