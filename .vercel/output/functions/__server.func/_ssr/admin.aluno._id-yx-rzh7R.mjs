import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as useQueryClient, b as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-DWfIo_Ug.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-DIV666p3.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-fMRf3trd.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B91GfZkm.mjs";
import { u as updateStudent, i as findStudent } from "./students-DLnr-SLK.mjs";
import { a as listHistoricoAll } from "./historico-BnAbIK1L.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BaOR-_gw.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { g as gerarMensalidadesDoMes, m as mesLabel, b as marcarPago, c as marcarPendente, l as listPagamentos } from "./pagamentos-D1w0ItLO.mjs";
import { u as uploadPdf, d as deletePdf, a as listPdfsAdmin } from "./pdfs-q1P_mHxX.mjs";
import { f as formatBRL, a as formatDateBR, g as getConfig, w as whatsappLink } from "./config-BwxWJN3e.mjs";
import { a as exportProntuarioPDF } from "./pdf-DTBe8puX.mjs";
import { c as Route$1 } from "./router-DNEfQkU_.mjs";
import "../_libs/seroval.mjs";
import "../_libs/jspdf.mjs";
import "../_libs/jspdf-autotable.mjs";
import "../_libs/stripe.mjs";
import { A as ArrowLeft, J as Download, B as Activity, H as Save, N as NotebookPen, a2 as Calendar, W as Wallet, I as FileText, V as Plus, R as Trash2, M as MessageCircle, u as CircleCheck, a3 as RotateCcw, a4 as Upload } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "./tslib.js";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "./types-DN-33vrr.mjs";
import "./students.functions-SKg7Ok10.mjs";
import "./historico.functions-DYd4kS2c.mjs";
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
import "../_libs/supabase__functions-js.mjs";
import "./stripe.server-Dfh-S32c.mjs";
import "events";
import "http";
import "https";
import "../_libs/fflate.mjs";
import "../_libs/fast-png.mjs";
import "../_libs/iobuffer.mjs";
import "../_libs/pako.mjs";
import "../_libs/html2canvas.mjs";
import "../_libs/dompurify.mjs";
import "../_libs/canvg.mjs";
import "../_libs/core-js.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/raf.mjs";
import "../_libs/performance-now.mjs";
import "../_libs/rgbcolor.mjs";
import "../_libs/svg-pathdata.mjs";
import "../_libs/stackblur-canvas.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const listNotasFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120)
}).parse(input)).handler(createSsrRpc("727f09755b380c9d6539af17acc2286b7c6ed99cb52cc56583399eb6df45b54b"));
const createNotaFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  aluno_id: stringType().min(1).max(120),
  data: stringType().min(1).max(40),
  titulo: stringType().min(1).max(300),
  conteudo: stringType().min(1).max(1e4),
  tipo: stringType().min(1).max(40)
}).parse(input)).handler(createSsrRpc("b76ab2981fa98c90ee3b86ea35daa1138a650864e0838c93ba1568dc76d9b2b7"));
const deleteNotaFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType().min(1).max(120)
}).parse(input)).handler(createSsrRpc("0a4df19ddd1f535dc98453868daf66e57eeaaa0b647bf1edcd751eebe567b1f4"));
async function listNotas(alunoId) {
  return await listNotasFn({ data: { alunoId } }) ?? [];
}
async function createNota(input) {
  await createNotaFn({ data: input });
}
async function deleteNota(id) {
  await deleteNotaFn({ data: { id } });
}
function AlunoDetail() {
  const {
    id
  } = Route$1.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const {
    data: aluno
  } = useQuery({
    queryKey: ["aluno", id],
    queryFn: () => findStudent(id)
  });
  const {
    data: notas = []
  } = useQuery({
    queryKey: ["notas", id],
    queryFn: () => listNotas(id)
  });
  const {
    data: historico = []
  } = useQuery({
    queryKey: ["historico-all", id],
    queryFn: () => listHistoricoAll(id)
  });
  const {
    data: pagamentos = []
  } = useQuery({
    queryKey: ["pagamentos", id],
    queryFn: () => listPagamentos({
      alunoId: id
    })
  });
  const {
    data: pdfs = []
  } = useQuery({
    queryKey: ["pdfs", id],
    queryFn: () => listPdfsAdmin(id)
  });
  if (!aluno) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." });
  async function exportPDF() {
    if (!aluno) return;
    await gerarMensalidadesDoMes();
    exportProntuarioPDF({
      aluno,
      historico,
      notas,
      pagamentos
    });
    toast.success("PDF gerado!");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => navigate({
          to: "/admin/alunos"
        }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold leading-tight", children: aluno.nome }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            aluno.telefone ?? "Sem telefone",
            " · ",
            aluno.valor_mensalidade ? formatBRL(Number(aluno.valor_mensalidade)) : "Sem mensalidade",
            aluno.dia_vencimento ? ` · vence dia ${aluno.dia_vencimento}` : ""
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/treinos", className: "text-xs text-primary underline", children: "Editar treino" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: exportPDF, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
          " Exportar prontuário (PDF)"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "resumo", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "flex w-full flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "resumo", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "mr-1 h-3.5 w-3.5" }),
          "Resumo"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "dados", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-1 h-3.5 w-3.5" }),
          "Dados"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "notas", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(NotebookPen, { className: "mr-1 h-3.5 w-3.5" }),
          "Caderno"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "historico", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "mr-1 h-3.5 w-3.5" }),
          "Histórico"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "pagamentos", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "mr-1 h-3.5 w-3.5" }),
          "Pagamentos"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "pdfs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mr-1 h-3.5 w-3.5" }),
          "PDFs"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "resumo", className: "mt-4 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResumoTab, { alunoId: id, notas: notas.length, treinos: historico.length, pagamentos }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "dados", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DadosTab, { aluno, onSaved: () => qc.invalidateQueries({
        queryKey: ["aluno", id]
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "notas", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotasTab, { alunoId: id, notas, onChange: () => qc.invalidateQueries({
        queryKey: ["notas", id]
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "historico", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HistoricoTab, { historico }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pagamentos", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PagamentosTab, { aluno, pagamentos, onChange: () => qc.invalidateQueries({
        queryKey: ["pagamentos", id]
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pdfs", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PdfsTab, { alunoId: id, pdfs, onChange: () => qc.invalidateQueries({
        queryKey: ["pdfs", id]
      }) }) })
    ] })
  ] });
}
function ResumoTab({
  alunoId,
  notas,
  treinos,
  pagamentos
}) {
  const pendentes = pagamentos.filter((p) => p.status === "pendente");
  const pago = pagamentos.filter((p) => p.status === "pago").reduce((s, p) => s + Number(p.valor), 0);
  const aReceber = pendentes.reduce((s, p) => s + Number(p.valor), 0);
  const stats = [{
    label: "Treinos registrados",
    value: treinos
  }, {
    label: "Anotações",
    value: notas
  }, {
    label: "Já pago",
    value: formatBRL(pago)
  }, {
    label: "A receber",
    value: formatBRL(aReceber)
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
    opacity: 0,
    y: 8
  }, animate: {
    opacity: 1,
    y: 0
  }, transition: {
    delay: i * 0.04
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: s.label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-2xl font-bold", children: s.value })
  ] }) }) }, s.label)) });
}
function DadosTab({
  aluno,
  onSaved
}) {
  const [nome, setNome] = reactExports.useState(aluno.nome);
  const [telefone, setTelefone] = reactExports.useState(aluno.telefone ?? "");
  const [valor, setValor] = reactExports.useState(String(aluno.valor_mensalidade ?? ""));
  const [dia, setDia] = reactExports.useState(String(aluno.dia_vencimento ?? 5));
  const [status, setStatus] = reactExports.useState(aluno.status ?? "ativo");
  const [objetivo, setObjetivo] = reactExports.useState(aluno.objetivo ?? "");
  const [obs, setObs] = reactExports.useState(aluno.observacoes ?? "");
  const [saving, setSaving] = reactExports.useState(false);
  async function save() {
    setSaving(true);
    try {
      await updateStudent(aluno.id, {
        nome,
        telefone: telefone || null,
        valor_mensalidade: Number(valor.replace(",", ".")) || 0,
        dia_vencimento: Math.min(Math.max(Number(dia) || 5, 1), 28),
        status,
        objetivo: objetivo || null,
        observacoes: obs || null
      });
      toast.success("Salvo!");
      onSaved();
    } catch (e) {
      toast.error(e?.message ?? "Erro");
    } finally {
      setSaving(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nome" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: nome, onChange: (e) => setNome(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Telefone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: telefone, onChange: (e) => setTelefone(e.target.value), placeholder: "(DDD) 9XXXX-XXXX" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Mensalidade (R$)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { inputMode: "decimal", value: valor, onChange: (e) => setValor(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Vence dia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 1, max: 28, value: dia, onChange: (e) => setDia(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: status, onValueChange: setStatus, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ativo", children: "Ativo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pausado", children: "Pausado" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inativo", children: "Inativo" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Objetivo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: objetivo, onChange: (e) => setObjetivo(e.target.value), placeholder: "O que o aluno busca?" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Observações gerais" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: obs, onChange: (e) => setObs(e.target.value), placeholder: "Histórico médico, restrições, preferências..." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: save, disabled: saving, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
      "Salvar"
    ] })
  ] }) });
}
function NotasTab({
  alunoId,
  notas,
  onChange
}) {
  const [titulo, setTitulo] = reactExports.useState("");
  const [conteudo, setConteudo] = reactExports.useState("");
  const [tipo, setTipo] = reactExports.useState("evolucao");
  async function add() {
    if (!titulo.trim() || !conteudo.trim()) return;
    await createNota({
      aluno_id: alunoId,
      data: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      titulo,
      conteudo,
      tipo
    });
    setTitulo("");
    setConteudo("");
    toast.success("Anotação adicionada");
    onChange();
  }
  async function rm(id) {
    await deleteNota(id);
    onChange();
  }
  const tipoLabel = {
    evolucao: "Evolução",
    tecnica: "Técnica",
    proximo: "Próximo passo"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[1fr_1.4fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Nova anotação" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tipo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: tipo, onValueChange: setTipo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "evolucao", children: "Evolução" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "tecnica", children: "Técnica usada" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "proximo", children: "Próximo passo" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Título" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: titulo, onChange: (e) => setTitulo(e.target.value), placeholder: "Ex: Avaliação trimestral" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Conteúdo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 6, value: conteudo, onChange: (e) => setConteudo(e.target.value), placeholder: "Detalhe o que aconteceu, o que foi trabalhado..." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: add, disabled: !titulo.trim() || !conteudo.trim(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Adicionar"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: notas.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-8 text-center text-sm text-muted-foreground", children: "Sem anotações ainda." }) }) : notas.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary", children: tipoLabel[n.tipo] ?? n.tipo }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDateBR(n.data) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display font-semibold", children: n.titulo }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 whitespace-pre-wrap text-sm text-muted-foreground", children: n.conteudo })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => rm(n.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
    ] }) }) }, n.id)) })
  ] });
}
function HistoricoTab({
  historico
}) {
  if (historico.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-8 text-center text-sm text-muted-foreground", children: "Sem treinos registrados." }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: historico.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center justify-between p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-semibold", children: [
        formatDateBR(h.data),
        " · ",
        h.dia_semana
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: h.foco ?? "-" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
      h.exercicios_feitos?.length ?? 0,
      "/",
      h.total_exercicios,
      " exercícios"
    ] })
  ] }) }, h.id)) });
}
function PagamentosTab({
  aluno,
  pagamentos,
  onChange
}) {
  async function gerar() {
    const n = await gerarMensalidadesDoMes();
    toast.success(n ? `${n} cobrança(s) criada(s) para o mês.` : "Mês já gerado.");
    onChange();
  }
  async function pago(p) {
    await marcarPago(p.id, p.aluno_id, Number(p.valor), p.mes_referencia);
    toast.success("Marcado como pago");
    onChange();
  }
  async function reabrir(p) {
    await marcarPendente(p.id);
    toast.success("Reaberto");
    onChange();
  }
  async function cobrar(p) {
    if (!aluno.telefone) {
      toast.error("Aluno sem telefone cadastrado.");
      return;
    }
    const tpl = await getConfig("mensagem_cobranca") ?? "";
    const msg = tpl.replace("{nome}", aluno.nome.split(" ")[0]).replace("{mes}", mesLabel(p.mes_referencia)).replace("{valor}", Number(p.valor).toFixed(2).replace(".", ",")).replace("{vencimento}", formatDateBR(p.vencimento));
    window.open(whatsappLink(aluno.telefone, msg), "_blank");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: gerar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      " Gerar mensalidade do mês"
    ] }) }),
    pagamentos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-8 text-center text-sm text-muted-foreground", children: "Sem cobranças. Clique acima para gerar." }) }) : pagamentos.map((p) => {
      const atrasado = p.status === "pendente" && new Date(p.vencimento) < new Date((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: atrasado ? "border-destructive/40" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-wrap items-center justify-between gap-3 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold", children: mesLabel(p.mes_referencia) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Vence ",
            formatDateBR(p.vencimento),
            " · ",
            formatBRL(Number(p.valor))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase ${p.status === "pago" ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" : atrasado ? "bg-destructive/15 text-destructive" : "bg-amber-500/15 text-amber-700 dark:text-amber-400"}`, children: p.status === "pago" ? "Pago" : atrasado ? "Atrasado" : "Pendente" }),
          p.status === "pendente" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => cobrar(p), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
              " WhatsApp"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: () => pago(p), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
              " Pago"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", onClick: () => reabrir(p), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
            " Reabrir"
          ] })
        ] })
      ] }) }, p.id);
    })
  ] });
}
function PdfsTab({
  alunoId,
  pdfs,
  onChange
}) {
  const [nome, setNome] = reactExports.useState("");
  const [descricao, setDescricao] = reactExports.useState("");
  const [uploading, setUploading] = reactExports.useState(false);
  async function handleUpload(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.type !== "application/pdf") {
      toast.error("Apenas PDF.");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      toast.error("PDF muito grande (máx 10 MB)");
      return;
    }
    setUploading(true);
    try {
      const b64 = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onerror = () => rej(r.error);
        r.onload = () => res(String(r.result));
        r.readAsDataURL(f);
      });
      await uploadPdf({
        alunoId,
        nome: nome || f.name.replace(/\.pdf$/i, ""),
        descricao: descricao || null,
        base64: b64
      });
      setNome("");
      setDescricao("");
      toast.success("PDF anexado");
      onChange();
    } catch (err) {
      toast.error(err?.message ?? "Falha no upload");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }
  async function rm(id) {
    if (!confirm("Excluir este PDF?")) return;
    await deletePdf(id);
    toast.success("PDF excluído");
    onChange();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[1fr_1.4fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Anexar novo PDF" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nome (opcional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: nome, onChange: (e) => setNome(e.target.value), placeholder: "Ex: Ficha de musculação" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Descrição (opcional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 3, value: descricao, onChange: (e) => setDescricao(e.target.value), placeholder: "Ex: Treino A - hipertrofia" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/40 px-4 py-6 text-sm font-medium text-muted-foreground hover:border-primary/40 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
          uploading ? "Enviando..." : "Selecionar PDF",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "application/pdf", className: "hidden", onChange: handleUpload, disabled: uploading })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: pdfs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-8 text-center text-sm text-muted-foreground", children: "Nenhum PDF anexado." }) }) : pdfs.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center justify-between p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium", children: p.nome }),
          p.descricao && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: p.descricao }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
            (p.tamanho_bytes / 1024).toFixed(0),
            " KB · ",
            formatDateBR(p.created_at.slice(0, 10))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        p.signed_url && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: p.signed_url, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
          " Abrir"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => rm(p.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
      ] })
    ] }) }, p.id)) })
  ] });
}
export {
  AlunoDetail as component
};
