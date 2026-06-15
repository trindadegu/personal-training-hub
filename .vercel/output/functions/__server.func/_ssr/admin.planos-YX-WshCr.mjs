import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as useQueryClient, b as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-DWfIo_Ug.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { C as Card, a as CardContent } from "./card-DIV666p3.mjs";
import { S as Switch } from "./switch-CQ4rbtn8.mjs";
import { D as Dialog, f as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle, e as DialogFooter } from "./dialog-Ci2xTPzf.mjs";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-CB3UFTw-.mjs";
import { u as updatePlano, c as createPlano, d as deletePlano, a as listPlanosAdmin } from "./planos-C6Ei3CbB.mjs";
import { f as formatBRL } from "./config-BwxWJN3e.mjs";
import "../_libs/seroval.mjs";
import { V as Plus, b as Check, Y as Pencil, R as Trash2 } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/dotenv.mjs";
import "fs";
import "path";
import "os";
import "crypto";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
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
import "../_libs/radix-ui__react-alert-dialog.mjs";
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
import "../_libs/isbot.mjs";
import "../_libs/zod.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const empty = {
  nome: "",
  descricao: "",
  preco_mensal: "",
  beneficios: "",
  ordem: "0",
  ativo: true
};
function toForm(p) {
  return {
    nome: p.nome,
    descricao: p.descricao ?? "",
    preco_mensal: String(p.preco_mensal).replace(".", ","),
    beneficios: (p.beneficios ?? []).join("\n"),
    ordem: String(p.ordem),
    ativo: p.ativo
  };
}
function fromForm(f) {
  const beneficios = f.beneficios.split("\n").map((s) => s.trim()).filter(Boolean);
  return {
    nome: f.nome.trim(),
    descricao: f.descricao.trim() || null,
    preco_mensal: Number(f.preco_mensal.replace(",", ".")) || 0,
    beneficios,
    ordem: Number(f.ordem) || 0,
    ativo: f.ativo
  };
}
function PlanosPage() {
  const qc = useQueryClient();
  const {
    data: planos = [],
    isLoading
  } = useQuery({
    queryKey: ["planos-admin"],
    queryFn: listPlanosAdmin
  });
  const [open, setOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(empty);
  const [saving, setSaving] = reactExports.useState(false);
  function openNew() {
    setEditing(null);
    setForm({
      ...empty,
      ordem: String(planos.length + 1)
    });
    setOpen(true);
  }
  function openEdit(p) {
    setEditing(p);
    setForm(toForm(p));
    setOpen(true);
  }
  async function save() {
    const payload = fromForm(form);
    if (!payload.nome || payload.beneficios.length === 0) {
      toast.error("Nome e ao menos 1 benefício são obrigatórios.");
      return;
    }
    setSaving(true);
    try {
      if (editing) await updatePlano(editing.id, payload);
      else await createPlano(payload);
      toast.success(editing ? "Plano atualizado." : "Plano criado.");
      qc.invalidateQueries({
        queryKey: ["planos-admin"]
      });
      qc.invalidateQueries({
        queryKey: ["planos-public"]
      });
      setOpen(false);
    } catch (e) {
      toast.error(e?.message ?? "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }
  async function remove(p) {
    try {
      await deletePlano(p.id);
      toast.success("Plano removido.");
      qc.invalidateQueries({
        queryKey: ["planos-admin"]
      });
      qc.invalidateQueries({
        queryKey: ["planos-public"]
      });
    } catch (e) {
      toast.error(e?.message ?? "Erro.");
    }
  }
  async function toggle(p) {
    await updatePlano(p.id, {
      ativo: !p.ativo
    });
    qc.invalidateQueries({
      queryKey: ["planos-admin"]
    });
    qc.invalidateQueries({
      queryKey: ["planos-public"]
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight", children: "Planos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          planos.length,
          " cadastrados · aparecem na página inicial e no cadastro de alunos."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openNew, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Novo plano"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: editing ? "Editar plano" : "Novo plano" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nome" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.nome, onChange: (e) => setForm({
                ...form,
                nome: e.target.value
              }), placeholder: "Treino + Acompanhamento" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Descrição curta" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.descricao, onChange: (e) => setForm({
                ...form,
                descricao: e.target.value
              }), placeholder: "Aparece abaixo do nome do plano." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Preço mensal (R$)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { inputMode: "decimal", value: form.preco_mensal, onChange: (e) => setForm({
                  ...form,
                  preco_mensal: e.target.value
                }), placeholder: "150,00" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Ordem" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.ordem, onChange: (e) => setForm({
                  ...form,
                  ordem: e.target.value
                }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Benefícios (1 por linha)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 6, value: form.beneficios, onChange: (e) => setForm({
                ...form,
                beneficios: e.target.value
              }), placeholder: "Ficha de treino semanal\nCheck-in com GPS\nSuporte WhatsApp" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-border/60 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: "Plano ativo (visível para alunos)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: form.ativo, onCheckedChange: (v) => setForm({
                ...form,
                ativo: v
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: save, disabled: saving, children: "Salvar" })
          ] })
        ] })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando…" }) : planos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-10 text-center text-sm text-muted-foreground", children: "Nenhum plano cadastrado." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2 lg:grid-cols-3", children: planos.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 8
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: i * 0.04
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: p.ativo ? "" : "opacity-60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-bold", children: p.nome }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-2xl font-bold text-primary", children: [
            formatBRL(Number(p.preco_mensal)),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: " /mês" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: p.ativo, onCheckedChange: () => toggle(p) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: [
            "ordem ",
            p.ordem
          ] })
        ] })
      ] }),
      p.descricao && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: p.descricao }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 text-xs", children: (p.beneficios ?? []).map((b, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mt-0.5 h-3 w-3 shrink-0 text-emerald-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: b })
      ] }, idx)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => openEdit(p), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" }),
          " Editar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3 text-destructive" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { children: [
                "Remover ",
                p.nome,
                "?"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Alunos vinculados a esse plano ficam sem plano (não são deletados)." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancelar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => remove(p), children: "Remover" })
            ] })
          ] })
        ] })
      ] })
    ] }) }) }, p.id)) })
  ] });
}
export {
  PlanosPage as component
};
