import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useIsFetching, a as useIsMutating } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { S as redirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BaOR-_gw.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { v as verifyWebhook } from "./stripe.server-Dfh-S32c.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/dotenv.mjs";
import "fs";
import "path";
import "os";
import "crypto";
import "util";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/stripe.mjs";
import "events";
import "http";
import "https";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function RouteLoadingBar() {
  const isRouting = useRouterState({
    select: (s) => s.isLoading || s.isTransitioning
  });
  const fetching = useIsFetching();
  const mutating = useIsMutating();
  const active = isRouting || fetching > 0 || mutating > 0;
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (active) {
      const t2 = setTimeout(() => setVisible(true), 80);
      return () => clearTimeout(t2);
    }
    const t = setTimeout(() => setVisible(false), 200);
    return () => clearTimeout(t);
  }, [active]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "aria-hidden": !visible,
      role: "progressbar",
      "aria-label": "Carregando",
      className: "pointer-events-none fixed left-0 right-0 top-0 z-[9999] h-[2px] overflow-hidden",
      style: { opacity: visible ? 1 : 0, transition: "opacity 200ms ease" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full w-1/3 rounded-r-full bg-primary",
            style: {
              boxShadow: "0 0 10px hsl(var(--primary) / 0.6), 0 0 4px hsl(var(--primary) / 0.8)",
              animation: "route-loading-slide 1.1s cubic-bezier(0.4, 0, 0.2, 1) infinite"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes route-loading-slide {
          0%   { transform: translateX(-100%) scaleX(0.6); }
          50%  { transform: translateX(80%)  scaleX(1); }
          100% { transform: translateX(260%) scaleX(0.5); }
        }
      ` })
      ]
    }
  );
}
const appCss = "/assets/styles-dEPGfJk9.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$m = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Acessoria Atlântida — Sistema de Treinos" },
      {
        name: "description",
        content: "Plataforma de treinos e acompanhamento da Acessoria Atlântida — treinos personalizados, check-in na academia e histórico mensal."
      },
      { property: "og:title", content: "Acessoria Atlântida — Sistema de Treinos" },
      {
        property: "og:description",
        content: "Treinos personalizados, check-in e acompanhamento mensal."
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Acessoria Atlântida" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Acessoria Atlântida — Sistema de Treinos" },
      { name: "twitter:description", content: "Treinos personalizados, check-in e acompanhamento mensal." }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Inter:wght@300;400;500;600;700&display=swap"
      },
      { rel: "stylesheet", href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$m.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(RouteLoadingBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-center" })
  ] });
}
const BASE_URL = "https://acessoriaatlantida.lovable.app";
const Route$l = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/login", changefreq: "monthly", priority: "0.5" }
        ];
        const urls = entries.map(
          (e) => [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`
          ].filter(Boolean).join("\n")
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const $$splitComponentImporter$j = () => import("./login-B_AYKoSJ.mjs");
const Route$k = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$j, "component"),
  head: () => ({
    meta: [{
      title: "Entrar — Acessoria Atlântida"
    }, {
      name: "description",
      content: "Acesse sua conta de aluno ou de professor na Acessoria Atlântida para ver treinos, check-ins e pagamentos."
    }, {
      property: "og:title",
      content: "Entrar — Acessoria Atlântida"
    }, {
      property: "og:description",
      content: "Acesse sua conta de aluno ou professor."
    }, {
      property: "og:url",
      content: "https://personal-training-hub-six.vercel.app/login"
    }],
    links: [{
      rel: "canonical",
      href: "https://personal-training-hub-six.vercel.app/login"
    }]
  })
});
const $$splitComponentImporter$i = () => import("./aluno-zcc3gpF5.mjs");
const Route$j = createFileRoute("/aluno")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component"),
  head: () => ({
    meta: [{
      title: "Meu painel — Acessoria Atlântida"
    }, {
      name: "description",
      content: "Área do aluno: treinos, check-in e pagamentos."
    }, {
      name: "robots",
      content: "noindex, nofollow"
    }]
  })
});
const loginAdminFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  username: stringType().min(1).max(120),
  password: stringType().min(1).max(200)
}).parse(input)).handler(createSsrRpc("623e95bf16c11dfee03260261c5ae06e4b0fcc1509a1a8ec58f9e51ee2ab5fcf"));
const logoutAdminFn = createServerFn({
  method: "POST"
}).handler(createSsrRpc("f572985f74d4e9f1a775e40a8d6cbda3f2fc84539550b0eda346adc42d528b0b"));
const getAdminMeFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("14afb1c60ca3aa9e8148ba068ec1f03e17c46cc31c521f72f48f8fe0903208a7"));
const getAdminConfigFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("91554b298c92b1662780f42a236f952912684b7a32739702a01dbf03f91c980e"));
const updateAdminConfigFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  username: stringType().min(1).max(120),
  password: stringType().max(200).optional(),
  whatsapp: stringType().max(40)
}).parse(input)).handler(createSsrRpc("37bc0fc39a696b2a4bc8718f2dda23361122f54075e641c00bce5a63ec41fafe"));
const getAdminWhatsappPublicFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("a872b7d9ebd91e0a8be1bcc8859b34bf08e8cc1e8a2d3a0fdbe3e9931c3e4f00"));
const $$splitComponentImporter$h = () => import("./admin-GvqR3XuJ.mjs");
const Route$i = createFileRoute("/admin")({
  loader: async () => {
    const me = await getAdminMeFn();
    if (!me?.username) {
      throw redirect({
        to: "/login"
      });
    }
    return {
      username: me.username
    };
  },
  head: () => ({
    meta: [{
      title: "Painel do professor — Acessoria Atlântida"
    }, {
      name: "description",
      content: "Área restrita para administração de alunos e treinos."
    }, {
      name: "robots",
      content: "noindex, nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./index-D8uxpSqT.mjs");
const Route$h = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component"),
  head: () => ({
    meta: [
      {
        title: "Acessoria Atlântida — Treinos personalizados e check-in na academia"
      },
      {
        name: "description",
        content: "Treinos personalizados, check-in com GPS na academia e histórico mensal. Conheça os planos da Acessoria Atlântida."
      },
      {
        property: "og:title",
        content: "Acessoria Atlântida — Treinos personalizados"
      },
      {
        property: "og:description",
        content: "Treinos personalizados, check-in com GPS e histórico mensal na palma da mão."
      },
      // ATUALIZE A URL AQUI para o seu domínio da Vercel
      {
        property: "og:url",
        content: "https://personal-training-hub-six.vercel.app/"
      },
      {
        property: "og:type",
        content: "website"
      }
    ],
    links: [
      // ATUALIZE O CANONICAL AQUI
      {
        rel: "canonical",
        href: "https://personal-training-hub-six.vercel.app/"
      }
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Acessoria Atlântida",
        url: "https://personal-training-hub-six.vercel.app/",
        description: "Acessoria esportiva com treinos personalizados, check-in na academia e acompanhamento mensal."
      })
    }]
  })
});
const $$splitComponentImporter$f = () => import("./aluno.index-BBq9C4LY.mjs");
const Route$g = createFileRoute("/aluno/")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./admin.index-DvdyztCv.mjs");
const Route$f = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./aluno.perfil-Ck398lrW.mjs");
const Route$e = createFileRoute("/aluno/perfil")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./aluno.pagamentos-DPZFG2kC.mjs");
const Route$d = createFileRoute("/aluno/pagamentos")({
  validateSearch: (s) => ({
    paid: typeof s.paid === "string" ? s.paid : void 0
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./aluno.historico-DAAO6KI_.mjs");
const Route$c = createFileRoute("/aluno/historico")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./aluno.anotacoes-ZKFtiGiO.mjs");
const Route$b = createFileRoute("/aluno/anotacoes")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./admin.treinos-CKIyX1Fe.mjs");
const Route$a = createFileRoute("/admin/treinos")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./admin.planos-YX-WshCr.mjs");
const Route$9 = createFileRoute("/admin/planos")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./admin.pessoal-CkLKW4E3.mjs");
const Route$8 = createFileRoute("/admin/pessoal")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin.padrao-BJvJvyXJ.mjs");
const Route$7 = createFileRoute("/admin/padrao")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin.financeiro-BemUOfMJ.mjs");
const Route$6 = createFileRoute("/admin/financeiro")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.configuracoes-DIbZXacL.mjs");
const Route$5 = createFileRoute("/admin/configuracoes")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.checkins-B49l8Kse.mjs");
const Route$4 = createFileRoute("/admin/checkins")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.alunos-Dvg771tx.mjs");
const Route$3 = createFileRoute("/admin/alunos")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.academias-2S1QEeKf.mjs");
const Route$2 = createFileRoute("/admin/academias")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.aluno._id-yx-rzh7R.mjs");
const Route$1 = createFileRoute("/admin/aluno/$id")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
let _supabase = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
  }
  return _supabase;
}
async function markPagamentoPaid(pagamentoId, sessionId) {
  const supabase = getSupabase();
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const { data: pag } = await supabase.from("pagamentos").select("id, aluno_id, valor, mes_referencia, status, stripe_session_id").eq("id", pagamentoId).maybeSingle();
  if (!pag) {
    console.error("Webhook: pagamento not found", pagamentoId);
    return;
  }
  if (pag.status === "pago") {
    if (sessionId && !pag.stripe_session_id) {
      await supabase.from("pagamentos").update({ stripe_session_id: sessionId, pago_via: "stripe" }).eq("id", pagamentoId);
    }
    return;
  }
  await supabase.from("pagamentos").update({
    status: "pago",
    pago_em: today,
    stripe_session_id: sessionId,
    pago_via: "stripe"
  }).eq("id", pagamentoId);
  const { data: existingLanc } = await supabase.from("financeiro_lancamentos").select("id").eq("pagamento_id", pagamentoId).limit(1);
  if (existingLanc && existingLanc.length > 0) return;
  await supabase.from("financeiro_lancamentos").insert({
    escopo: "negocio",
    tipo: "receita",
    categoria: "Mensalidade",
    descricao: `Mensalidade ${pag.mes_referencia} (Stripe)`,
    valor: pag.valor,
    data: today,
    aluno_id: pag.aluno_id,
    pagamento_id: pagamentoId
  });
}
async function handleWebhook(req, env) {
  const event = await verifyWebhook(req, env);
  switch (event.type) {
    case "checkout.session.completed":
    case "transaction.completed": {
      const obj = event.data.object;
      const pagamentoId = obj?.metadata?.pagamento_id || obj?.client_reference_id;
      const sessionId = obj?.id ?? null;
      if (pagamentoId) await markPagamentoPaid(pagamentoId, sessionId);
      break;
    }
    default:
      console.log("Unhandled payment event:", event.type);
  }
}
const Route = createFileRoute("/api/public/payments/webhook")({
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
      }
    }
  }
});
const SitemapDotxmlRoute = Route$l.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$m
});
const LoginRoute = Route$k.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$m
});
const AlunoRoute = Route$j.update({
  id: "/aluno",
  path: "/aluno",
  getParentRoute: () => Route$m
});
const AdminRoute = Route$i.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$m
});
const IndexRoute = Route$h.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$m
});
const AlunoIndexRoute = Route$g.update({
  id: "/",
  path: "/",
  getParentRoute: () => AlunoRoute
});
const AdminIndexRoute = Route$f.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const AlunoPerfilRoute = Route$e.update({
  id: "/perfil",
  path: "/perfil",
  getParentRoute: () => AlunoRoute
});
const AlunoPagamentosRoute = Route$d.update({
  id: "/pagamentos",
  path: "/pagamentos",
  getParentRoute: () => AlunoRoute
});
const AlunoHistoricoRoute = Route$c.update({
  id: "/historico",
  path: "/historico",
  getParentRoute: () => AlunoRoute
});
const AlunoAnotacoesRoute = Route$b.update({
  id: "/anotacoes",
  path: "/anotacoes",
  getParentRoute: () => AlunoRoute
});
const AdminTreinosRoute = Route$a.update({
  id: "/treinos",
  path: "/treinos",
  getParentRoute: () => AdminRoute
});
const AdminPlanosRoute = Route$9.update({
  id: "/planos",
  path: "/planos",
  getParentRoute: () => AdminRoute
});
const AdminPessoalRoute = Route$8.update({
  id: "/pessoal",
  path: "/pessoal",
  getParentRoute: () => AdminRoute
});
const AdminPadraoRoute = Route$7.update({
  id: "/padrao",
  path: "/padrao",
  getParentRoute: () => AdminRoute
});
const AdminFinanceiroRoute = Route$6.update({
  id: "/financeiro",
  path: "/financeiro",
  getParentRoute: () => AdminRoute
});
const AdminConfiguracoesRoute = Route$5.update({
  id: "/configuracoes",
  path: "/configuracoes",
  getParentRoute: () => AdminRoute
});
const AdminCheckinsRoute = Route$4.update({
  id: "/checkins",
  path: "/checkins",
  getParentRoute: () => AdminRoute
});
const AdminAlunosRoute = Route$3.update({
  id: "/alunos",
  path: "/alunos",
  getParentRoute: () => AdminRoute
});
const AdminAcademiasRoute = Route$2.update({
  id: "/academias",
  path: "/academias",
  getParentRoute: () => AdminRoute
});
const AdminAlunoIdRoute = Route$1.update({
  id: "/aluno/$id",
  path: "/aluno/$id",
  getParentRoute: () => AdminRoute
});
const ApiPublicPaymentsWebhookRoute = Route.update({
  id: "/api/public/payments/webhook",
  path: "/api/public/payments/webhook",
  getParentRoute: () => Route$m
});
const AdminRouteChildren = {
  AdminAcademiasRoute,
  AdminAlunosRoute,
  AdminCheckinsRoute,
  AdminConfiguracoesRoute,
  AdminFinanceiroRoute,
  AdminPadraoRoute,
  AdminPessoalRoute,
  AdminPlanosRoute,
  AdminTreinosRoute,
  AdminIndexRoute,
  AdminAlunoIdRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const AlunoRouteChildren = {
  AlunoAnotacoesRoute,
  AlunoHistoricoRoute,
  AlunoPagamentosRoute,
  AlunoPerfilRoute,
  AlunoIndexRoute
};
const AlunoRouteWithChildren = AlunoRoute._addFileChildren(AlunoRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AdminRoute: AdminRouteWithChildren,
  AlunoRoute: AlunoRouteWithChildren,
  LoginRoute,
  SitemapDotxmlRoute,
  ApiPublicPaymentsWebhookRoute
};
const routeTree = Route$m._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$i as R,
  getAdminConfigFn as a,
  loginAdminFn as b,
  Route$1 as c,
  getAdminWhatsappPublicFn as g,
  logoutAdminFn as l,
  router as r,
  updateAdminConfigFn as u
};
