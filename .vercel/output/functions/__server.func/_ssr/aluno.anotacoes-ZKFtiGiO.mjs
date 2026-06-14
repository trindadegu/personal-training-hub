import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useQuery } from "../_libs/tanstack__react-query.mjs";
import { C as Card, a as CardContent } from "./card-DIV666p3.mjs";
import { e as getMyNotas } from "./me-DNEQf0dF.mjs";
import { a as formatDateBR } from "./config-BwxWJN3e.mjs";
import "../_libs/seroval.mjs";
import { N as NotebookPen } from "../_libs/lucide-react.mjs";
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
const TIPO_LABEL = {
  evolucao: "Evolução",
  tecnica: "Técnica",
  proximo: "Próximo passo"
};
function AnotacoesPage() {
  const {
    data: notas = [],
    isLoading
  } = useQuery({
    queryKey: ["my-notas"],
    queryFn: getMyNotas
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Anotações do professor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Observações registradas para você. Somente leitura." })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 animate-pulse rounded-2xl bg-muted" }, i)) }) : notas.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-10 text-center text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NotebookPen, { className: "mx-auto mb-3 h-8 w-8 opacity-60" }),
      "Sem anotações ainda."
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: notas.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary", children: TIPO_LABEL[n.tipo] ?? n.tipo }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDateBR(n.data) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display font-semibold", children: n.titulo }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 whitespace-pre-wrap text-sm text-muted-foreground", children: n.conteudo })
    ] }) }, n.id)) })
  ] });
}
export {
  AnotacoesPage as component
};
