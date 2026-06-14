import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useQuery } from "../_libs/tanstack__react-query.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { C as Card, a as CardContent } from "./card-DIV666p3.mjs";
import { b as listCheckins } from "./checkins-gNCwa5vF.mjs";
import "../_libs/seroval.mjs";
import { $ as Search, l as MapPin, x as ExternalLink } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/dotenv.mjs";
import "fs";
import "path";
import "os";
import "crypto";
import "../_libs/tanstack__query-core.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./createSsrRpc-BaOR-_gw.mjs";
import "./server-DVxLX_uO.mjs";
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
import "util";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/zod.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function CheckinsPage() {
  const {
    data: checkins = [],
    isLoading
  } = useQuery({
    queryKey: ["checkins"],
    queryFn: () => listCheckins()
  });
  const [filter, setFilter] = reactExports.useState("");
  const filtered = checkins.filter((c) => {
    const q = filter.toLowerCase();
    return c.aluno_nome.toLowerCase().includes(q) || c.gym_name.toLowerCase().includes(q);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight", children: "Check-ins" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        checkins.length,
        " registros"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: filter, onChange: (e) => setFilter(e.target.value), placeholder: "Buscar por aluno ou academia...", className: "pl-9" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-10 text-center text-sm text-muted-foreground", children: "Nenhum check-in encontrado." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filtered.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 6
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: Math.min(i * 0.02, 0.4)
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center justify-between gap-3 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-display font-semibold", children: c.aluno_nome }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mr-1 inline h-3.5 w-3.5 text-primary" }),
          c.gym_name,
          c.distance_m != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs text-muted-foreground", children: [
            c.distance_m,
            " m"
          ] })
        ] }),
        c.gym_address && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: c.gym_address })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(c.created_at).toLocaleString("pt-BR", {
          dateStyle: "short",
          timeStyle: "short"
        }) }),
        c.duracao_segundos != null && c.duracao_segundos > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400", children: [
          "Duração: ",
          Math.floor(c.duracao_segundos / 60),
          " min"
        ] }) : c.inicio_at && !c.fim_at ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[11px] font-medium text-amber-600", children: "Em andamento" }) : null,
        c.lat_aluno != null && c.lng_aluno != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline", target: "_blank", rel: "noreferrer", href: `https://www.google.com/maps?q=${c.lat_aluno},${c.lng_aluno}`, children: [
          "ver no mapa ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
        ] })
      ] })
    ] }) }) }, c.id)) })
  ] });
}
export {
  CheckinsPage as component
};
