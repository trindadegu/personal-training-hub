import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as useQueryClient, b as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-DWfIo_Ug.mjs";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-DIV666p3.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { T as TrainingEditor } from "./training-editor-Tl7XBU0L.mjs";
import { c as getDefaultTraining, d as saveTraining, b as listStudents, g as getTraining } from "./students-DLnr-SLK.mjs";
import { e as emptyTraining } from "./types-DN-33vrr.mjs";
import "../_libs/seroval.mjs";
import { X, b as Check, j as Sparkles, L as LoaderCircle, H as Save } from "../_libs/lucide-react.mjs";
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
import "../_libs/tailwind-merge.mjs";
import "./label-JU3yqRBo.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "./tabs-fMRf3trd.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "./students.functions-SKg7Ok10.mjs";
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
function TreinosPage() {
  const qc = useQueryClient();
  const {
    data: alunos = []
  } = useQuery({
    queryKey: ["alunos"],
    queryFn: listStudents
  });
  const [alunoId, setAlunoId] = reactExports.useState("");
  const [treino, setTreino] = reactExports.useState(emptyTraining());
  const [saving, setSaving] = reactExports.useState(false);
  const [query, setQuery] = reactExports.useState("");
  const [open, setOpen] = reactExports.useState(false);
  const alunoSelecionado = reactExports.useMemo(() => alunos.find((a) => a.id === alunoId), [alunos, alunoId]);
  const filtrados = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return alunos;
    return alunos.filter((a) => a.nome.toLowerCase().includes(q));
  }, [alunos, query]);
  const {
    data: loaded,
    isFetching
  } = useQuery({
    queryKey: ["treino", alunoId],
    queryFn: () => getTraining(alunoId),
    enabled: !!alunoId
  });
  reactExports.useEffect(() => {
    if (loaded) setTreino(loaded);
  }, [loaded]);
  async function applyPadrao() {
    const padrao = await getDefaultTraining();
    if (!padrao) {
      toast.message("Nenhum treino padrão configurado ainda.");
      return;
    }
    setTreino(padrao);
    toast.success("Treino padrão aplicado. Não esqueça de salvar.");
  }
  async function save() {
    if (!alunoId) return;
    setSaving(true);
    try {
      await saveTraining(alunoId, treino);
      toast.success("Treino salvo!");
      qc.invalidateQueries({
        queryKey: ["treino", alunoId]
      });
    } catch (err) {
      toast.error(err?.message ?? "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight", children: "Treinos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Edite o treino semanal de cada aluno." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "flex flex-row items-center justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Aluno" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: query, onChange: (e) => {
            setQuery(e.target.value);
            setOpen(true);
            if (alunoId) setAlunoId("");
          }, onFocus: () => setOpen(true), onBlur: () => setTimeout(() => setOpen(false), 150), placeholder: "Digite o nome do aluno...", className: "pr-9" }),
          (query || alunoSelecionado) && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
            setQuery("");
            setAlunoId("");
            setOpen(false);
          }, className: "absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground", "aria-label": "Limpar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) }),
          open && filtrados.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md", children: filtrados.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onMouseDown: (e) => {
            e.preventDefault();
            setAlunoId(a.id);
            setQuery(a.nome);
            setOpen(false);
          }, className: cn("flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground", alunoId === a.id && "bg-accent/50"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: cn("h-4 w-4", alunoId === a.id ? "opacity-100" : "opacity-0") }),
            a.nome
          ] }, a.id)) }),
          open && filtrados.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute z-50 mt-1 w-full rounded-md border bg-popover p-3 text-sm text-muted-foreground shadow-md", children: "Nenhum aluno encontrado." })
        ] })
      ] }) }),
      alunoId && /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: applyPadrao, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
            "Aplicar treino padrão"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: save, disabled: saving, className: "ml-auto", children: [
            saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
            "Salvar"
          ] })
        ] }),
        isFetching ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrainingEditor, { value: treino, onChange: setTreino })
      ] })
    ] })
  ] });
}
export {
  TreinosPage as component
};
