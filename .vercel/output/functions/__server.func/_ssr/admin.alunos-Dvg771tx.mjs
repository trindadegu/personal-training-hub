import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as useQueryClient, b as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-DWfIo_Ug.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { C as Card, a as CardContent } from "./card-DIV666p3.mjs";
import { D as Dialog, f as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle, e as DialogFooter } from "./dialog-Ci2xTPzf.mjs";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-CB3UFTw-.mjs";
import { f as createStudent, h as deleteStudent, b as listStudents } from "./students-DLnr-SLK.mjs";
import { f as formatBRL } from "./config-BwxWJN3e.mjs";
import { a as listPlanosAdmin } from "./planos-C6Ei3CbB.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B91GfZkm.mjs";
import "../_libs/seroval.mjs";
import { V as Plus, $ as Search, a0 as KeyRound, a1 as Copy, x as ExternalLink, R as Trash2 } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
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
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "./types-DN-33vrr.mjs";
import "./students.functions-SKg7Ok10.mjs";
import "./createSsrRpc-BaOR-_gw.mjs";
import "./server-DVxLX_uO.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function AlunosPage() {
  const qc = useQueryClient();
  const {
    data: alunos = [],
    isLoading
  } = useQuery({
    queryKey: ["alunos"],
    queryFn: listStudents
  });
  const {
    data: planosAll = []
  } = useQuery({
    queryKey: ["planos-admin"],
    queryFn: listPlanosAdmin
  });
  const planos = planosAll.filter((p) => p.ativo);
  const [open, setOpen] = reactExports.useState(false);
  const [nome, setNome] = reactExports.useState("");
  const [tel, setTel] = reactExports.useState("");
  const [valor, setValor] = reactExports.useState("");
  const [dia, setDia] = reactExports.useState("5");
  const [planoId, setPlanoId] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const planoEscolhido = planos.find((p) => p.id === planoId);
  const filtered = alunos.filter((a) => a.nome.toLowerCase().includes(filter.toLowerCase()));
  async function add() {
    if (!nome.trim() || !planoId) return;
    setSaving(true);
    try {
      await createStudent(nome.trim(), {
        telefone: tel.trim() || void 0,
        valor_mensalidade: Number(valor.replace(",", ".")) || 0,
        dia_vencimento: Math.min(Math.max(Number(dia) || 5, 1), 28),
        plano_id: planoId
      });
      toast.success("Aluno criado!");
      setNome("");
      setTel("");
      setValor("");
      setDia("5");
      setPlanoId("");
      setOpen(false);
      qc.invalidateQueries({
        queryKey: ["alunos"]
      });
    } catch (err) {
      toast.error(err?.message ?? "Erro ao criar.");
    } finally {
      setSaving(false);
    }
  }
  async function remove(id) {
    try {
      await deleteStudent(id);
      toast.success("Aluno removido.");
      qc.invalidateQueries({
        queryKey: ["alunos"]
      });
    } catch (err) {
      toast.error(err?.message ?? "Erro.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight", children: "Alunos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          alunos.length,
          " cadastrados"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          "Novo aluno"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Cadastrar aluno" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nome", children: "Nome" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "nome", value: nome, onChange: (e) => setNome(e.target.value), placeholder: "Nome completo" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tel", children: "Telefone (opcional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "tel", value: tel, onChange: (e) => setTel(e.target.value), placeholder: "(85) 99999-9999" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "plano", children: "Plano contratado *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: planoId, onValueChange: (v) => {
                setPlanoId(v);
                const p = planos.find((x) => x.id === v);
                if (p) setValor(String(Number(p.preco_mensal)).replace(".", ","));
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "plano", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: planos.length ? "Selecione um plano" : "Cadastre planos primeiro" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: planos.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: p.id, children: [
                  p.nome,
                  " — ",
                  formatBRL(Number(p.preco_mensal))
                ] }, p.id)) })
              ] }),
              planoEscolhido && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 rounded-lg border border-border bg-muted/40 p-3", children: [
                planoEscolhido.descricao && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: planoEscolhido.descricao }),
                Array.isArray(planoEscolhido.beneficios) && planoEscolhido.beneficios.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 flex flex-wrap gap-1.5", children: planoEscolhido.beneficios.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary", children: b }, i)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "valor", children: "Mensalidade (R$)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "valor", inputMode: "decimal", value: valor, onChange: (e) => setValor(e.target.value), placeholder: "150,00" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "dia", children: "Vence dia" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "dia", type: "number", min: 1, max: 28, value: dia, onChange: (e) => setDia(e.target.value) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground", children: "A senha do aluno será os últimos 6 caracteres do ID gerado automaticamente." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: add, disabled: saving || !nome.trim() || !planoId, children: "Criar" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: filter, onChange: (e) => setFilter(e.target.value), placeholder: "Buscar por nome...", className: "pl-9" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-10 text-center text-sm text-muted-foreground", children: "Nenhum aluno encontrado." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: filtered.map((a, i) => {
      const senha = a.id.slice(-6);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 8
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: i * 0.02
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center justify-between gap-3 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/aluno/$id", params: {
            id: a.id
          }, className: "block hover:opacity-80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-display font-semibold", children: a.nome }),
            a.telefone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: a.telefone }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-xs text-muted-foreground", children: [
              a.valor_mensalidade ? formatBRL(Number(a.valor_mensalidade)) : "Sem mensalidade",
              a.dia_vencimento ? ` · vence dia ${a.dia_vencimento}` : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 font-mono text-[11px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-3 w-3" }),
              " ",
              senha
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "rounded p-1 text-muted-foreground hover:text-foreground", onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              navigator.clipboard?.writeText(senha);
              toast.success("Senha copiada");
            }, "aria-label": "Copiar senha", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/aluno/$id", params: {
              id: a.id
            }, className: "ml-1 inline-flex items-center gap-1 text-[11px] text-primary hover:underline", children: [
              "Abrir prontuário ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Remover", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { children: [
                "Remover ",
                a.nome,
                "?"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Esta ação não pode ser desfeita." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancelar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => remove(a.id), children: "Remover" })
            ] })
          ] })
        ] })
      ] }) }) }, a.id);
    }) })
  ] });
}
export {
  AlunosPage as component
};
