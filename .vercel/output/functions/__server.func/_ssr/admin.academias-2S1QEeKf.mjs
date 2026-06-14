import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as useQueryClient, b as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-DWfIo_Ug.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { C as Card, a as CardContent } from "./card-DIV666p3.mjs";
import { S as Switch } from "./switch-CQ4rbtn8.mjs";
import { D as Dialog, f as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle, e as DialogFooter } from "./dialog-Ci2xTPzf.mjs";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-CB3UFTw-.mjs";
import { u as updateAcademiaFn, c as createAcademiaFn, d as deleteAcademiaFn, l as listAcademiasAdminFn } from "./academias.functions-ohabDq9L.mjs";
import "../_libs/seroval.mjs";
import { V as Plus, L as LoaderCircle, $ as Search, l as MapPin, Y as Pencil, R as Trash2 } from "../_libs/lucide-react.mjs";
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
import "tslib";
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
async function listAcademiasAdmin() {
  return await listAcademiasAdminFn() ?? [];
}
async function createAcademia(input) {
  await createAcademiaFn({ data: input });
}
async function updateAcademia(id, patch) {
  await updateAcademiaFn({ data: { id, patch } });
}
async function deleteAcademia(id) {
  await deleteAcademiaFn({ data: { id } });
}
async function geocodeAddress(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: { "Accept-Language": "pt-BR" }
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((d) => ({
    display: d.display_name,
    lat: Number(d.lat),
    lng: Number(d.lon)
  }));
}
const empty = {
  nome: "",
  endereco: "",
  lat: "",
  lng: "",
  raio_metros: "150",
  ativo: true
};
function toForm(a) {
  return {
    nome: a.nome,
    endereco: a.endereco ?? "",
    lat: String(a.lat),
    lng: String(a.lng),
    raio_metros: String(a.raio_metros),
    ativo: a.ativo
  };
}
function AcademiasPage() {
  const qc = useQueryClient();
  const {
    data: academias = [],
    isLoading
  } = useQuery({
    queryKey: ["academias-admin"],
    queryFn: listAcademiasAdmin
  });
  const [open, setOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(empty);
  const [saving, setSaving] = reactExports.useState(false);
  const [searching, setSearching] = reactExports.useState(false);
  const [searchResults, setSearchResults] = reactExports.useState([]);
  function openNew() {
    setEditing(null);
    setForm(empty);
    setSearchResults([]);
    setOpen(true);
  }
  function openEdit(a) {
    setEditing(a);
    setForm(toForm(a));
    setSearchResults([]);
    setOpen(true);
  }
  async function buscarEndereco() {
    if (!form.endereco.trim()) return;
    setSearching(true);
    try {
      const res = await geocodeAddress(form.endereco);
      if (res.length === 0) toast.info("Nenhum endereço encontrado.");
      setSearchResults(res);
    } catch {
      toast.error("Erro ao buscar endereço.");
    } finally {
      setSearching(false);
    }
  }
  function pickResult(r) {
    setForm({
      ...form,
      endereco: r.display,
      lat: r.lat.toFixed(6),
      lng: r.lng.toFixed(6)
    });
    setSearchResults([]);
  }
  async function save() {
    const lat = Number(form.lat);
    const lng = Number(form.lng);
    if (!form.nome.trim() || Number.isNaN(lat) || Number.isNaN(lng)) {
      toast.error("Nome, latitude e longitude são obrigatórios.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        nome: form.nome.trim(),
        endereco: form.endereco.trim() || null,
        lat,
        lng,
        raio_metros: Math.min(Math.max(Number(form.raio_metros) || 150, 20), 5e3),
        ativo: form.ativo
      };
      if (editing) await updateAcademia(editing.id, payload);
      else await createAcademia(payload);
      toast.success(editing ? "Academia atualizada." : "Academia cadastrada.");
      qc.invalidateQueries({
        queryKey: ["academias-admin"]
      });
      qc.invalidateQueries({
        queryKey: ["academias-public"]
      });
      setOpen(false);
    } catch (e) {
      toast.error(e?.message ?? "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }
  async function remove(a) {
    try {
      await deleteAcademia(a.id);
      toast.success("Removida.");
      qc.invalidateQueries({
        queryKey: ["academias-admin"]
      });
    } catch (e) {
      toast.error(e?.message ?? "Erro.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight", children: "Academias parceiras" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Apenas dentro do raio dessas academias os alunos podem fazer check-in." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openNew, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Nova academia"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: editing ? "Editar academia" : "Cadastrar academia" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nome" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.nome, onChange: (e) => setForm({
                ...form,
                nome: e.target.value
              }), placeholder: "Smart Fit Centro" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Endereço" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.endereco, onChange: (e) => setForm({
                  ...form,
                  endereco: e.target.value
                }), placeholder: "Rua das Flores, 123, Fortaleza" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", size: "icon", onClick: buscarEndereco, disabled: searching, "aria-label": "Buscar coordenadas", children: searching ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" }) })
              ] }),
              searchResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 rounded-lg border border-border/60 p-2 text-xs", children: searchResults.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => pickResult(r), className: "w-full rounded p-2 text-left hover:bg-muted", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2", children: r.display }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-[10px] text-muted-foreground", children: [
                  r.lat.toFixed(5),
                  ", ",
                  r.lng.toFixed(5)
                ] })
              ] }) }, i)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Latitude" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.lat, onChange: (e) => setForm({
                  ...form,
                  lat: e.target.value
                }), placeholder: "-3.7172" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Longitude" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.lng, onChange: (e) => setForm({
                  ...form,
                  lng: e.target.value
                }), placeholder: "-38.5433" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Raio (m)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.raio_metros, onChange: (e) => setForm({
                  ...form,
                  raio_metros: e.target.value
                }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-border/60 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: "Ativa" }),
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
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando…" }) : academias.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-10 text-center text-sm text-muted-foreground", children: "Nenhuma academia cadastrada. Enquanto não houver, o check-in aceita qualquer localização." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: academias.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 8
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: i * 0.03
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: a.ativo ? "" : "opacity-60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-start justify-between gap-3 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 font-display font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary" }),
          " ",
          a.nome
        ] }),
        a.endereco && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-2 text-xs text-muted-foreground", children: a.endereco }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[11px] text-muted-foreground", children: [
          a.lat.toFixed(5),
          ", ",
          a.lng.toFixed(5),
          " · raio ",
          a.raio_metros,
          "m"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => openEdit(a), "aria-label": "Editar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => remove(a), children: "Remover" })
            ] })
          ] })
        ] })
      ] })
    ] }) }) }, a.id)) })
  ] });
}
export {
  AcademiasPage as component
};
