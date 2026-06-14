import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as useQueryClient, b as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-DWfIo_Ug.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-DIV666p3.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B91GfZkm.mjs";
import { D as Dialog, f as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle, e as DialogFooter } from "./dialog-Ci2xTPzf.mjs";
import { g as gerarRecorrentesDoMes, r as resumo, p as porDia, d as deleteLancamento, a as deleteRecorrente, b as addLancamento, c as addRecorrente, l as listLancamentos, e as listRecorrentes } from "./financeiro-D8Wk7KGH.mjs";
import { a as formatDateBR, f as formatBRL } from "./config-BwxWJN3e.mjs";
import { e as exportFinanceiroPDF } from "./pdf-DTBe8puX.mjs";
import { J as Download, y as TrendingUp, Z as TrendingDown, W as Wallet, _ as Repeat, R as Trash2, V as Plus } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, L as Legend, a as Bar } from "../_libs/recharts.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
function mesInputDefault() {
  const d = /* @__PURE__ */ new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
const MESES_PT = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];
function anosDisponiveis() {
  const atual = (/* @__PURE__ */ new Date()).getFullYear();
  const arr = [];
  for (let y = atual - 5; y <= atual; y++) arr.push(y);
  return arr;
}
function rangeOfMonth(mes) {
  const [y, m] = mes.split("-").map(Number);
  const from = `${y}-${String(m).padStart(2, "0")}-01`;
  const lastDay = new Date(y, m, 0).getDate();
  const to = `${y}-${String(m).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
  return { from, to };
}
function FinanceiroPanel({ escopo, titulo }) {
  const qc = useQueryClient();
  const [mes, setMes] = reactExports.useState(mesInputDefault());
  const { from, to } = rangeOfMonth(mes);
  const [anoStr, mesStr] = mes.split("-");
  const ano = Number(anoStr);
  const mesNum = Number(mesStr);
  const hoje = /* @__PURE__ */ new Date();
  const anoAtual = hoje.getFullYear();
  const mesAtualNum = hoje.getMonth() + 1;
  const mesBloqueado = (m, y) => y > anoAtual || y === anoAtual && m > mesAtualNum;
  function setMesAno(novoMes, novoAno) {
    if (mesBloqueado(novoMes, novoAno)) {
      toast.error("Não é possível visualizar meses futuros.");
      return;
    }
    setMes(`${novoAno}-${String(novoMes).padStart(2, "0")}`);
  }
  reactExports.useEffect(() => {
    gerarRecorrentesDoMes(mes).then((n) => {
      if (n > 0) {
        toast.success(`${n} despesa(s) recorrente(s) lançada(s) automaticamente.`);
        qc.invalidateQueries({ queryKey: ["lanc", escopo] });
      }
    });
  }, [mes, qc, escopo]);
  const { data: lanc = [] } = useQuery({
    queryKey: ["lanc", escopo, from, to],
    queryFn: () => listLancamentos({ escopo, from, to })
  });
  const { data: recs = [] } = useQuery({
    queryKey: ["rec", escopo],
    queryFn: () => listRecorrentes(escopo)
  });
  const r = reactExports.useMemo(() => resumo(lanc), [lanc]);
  const chart = reactExports.useMemo(() => porDia(lanc).map((d) => ({
    ...d,
    label: formatDateBR(d.data).slice(0, 5)
  })), [lanc]);
  function exportPDF() {
    exportFinanceiroPDF({
      titulo,
      mes,
      receitas: r.receitas,
      despesas: r.despesas,
      lancamentos: lanc
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight", children: titulo }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Receitas, despesas e gráfico do mês." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Mês" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: String(mesNum), onValueChange: (v) => setMesAno(Number(v), ano), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[150px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: MESES_PT.map((nome, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectItem,
              {
                value: String(i + 1),
                disabled: mesBloqueado(i + 1, ano),
                children: nome
              },
              i
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Ano" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: String(ano), onValueChange: (v) => setMesAno(mesNum, Number(v)), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[110px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: anosDisponiveis().map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(y), children: y }, y)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: exportPDF, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
          " PDF"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Receitas", value: formatBRL(r.receitas), icon: TrendingUp, tone: "emerald" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Despesas", value: formatBRL(r.despesas), icon: TrendingDown, tone: "rose" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Saldo", value: formatBRL(r.saldo), icon: Wallet, tone: r.saldo >= 0 ? "emerald" : "rose" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Faturamento por dia" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: chart.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-12 text-center text-sm text-muted-foreground", children: "Sem lançamentos no mês." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: chart, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", opacity: 0.2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", fontSize: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { fontSize: 11, tickFormatter: (v) => `${v}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => formatBRL(Number(v)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "receita", name: "Receita", fill: "hsl(160 84% 39%)", radius: [6, 6, 0, 0] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "despesa", name: "Despesa", fill: "hsl(0 84% 60%)", radius: [6, 6, 0, 0] })
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Lançamentos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NovoLancDialog, { escopo, onDone: () => qc.invalidateQueries({ queryKey: ["lanc", escopo] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2", children: lanc.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-sm text-muted-foreground", children: "Sem lançamentos no mês." }) : lanc.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-border/60 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${l.tipo === "receita" ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" : "bg-rose-500/15 text-rose-700 dark:text-rose-400"}`, children: l.tipo }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDateBR(l.data) }),
              l.recorrente && /* @__PURE__ */ jsxRuntimeExports.jsx(Repeat, { className: "h-3 w-3 text-muted-foreground" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium", children: l.descricao }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: l.categoria ?? "Sem categoria" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `font-semibold ${l.tipo === "receita" ? "text-emerald-600" : "text-rose-600"}`, children: [
              l.tipo === "receita" ? "+" : "−",
              formatBRL(Number(l.valor))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: async () => {
              await deleteLancamento(l.id);
              qc.invalidateQueries({ queryKey: ["lanc", escopo] });
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
          ] })
        ] }, l.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Despesas recorrentes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NovaRecorrenteDialog, { escopo, onDone: () => qc.invalidateQueries({ queryKey: ["rec", escopo] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Lançadas automaticamente no início de cada mês, no dia informado." }),
          recs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-sm text-muted-foreground", children: "Nenhuma despesa recorrente." }) : recs.map((r2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-border/60 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: r2.descricao }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                r2.categoria ?? "Sem categoria",
                " · dia ",
                r2.dia
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: formatBRL(Number(r2.valor)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: async () => {
                await deleteRecorrente(r2.id);
                qc.invalidateQueries({ queryKey: ["rec", escopo] });
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
            ] })
          ] }, r2.id))
        ] })
      ] })
    ] })
  ] });
}
function StatCard({
  label,
  value,
  icon: Icon,
  tone
}) {
  const toneCls = tone === "emerald" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-rose-500/10 text-rose-700 dark:text-rose-400";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid h-8 w-8 place-items-center rounded-lg ${toneCls}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-display text-2xl font-bold", children: value })
  ] }) }) });
}
function NovoLancDialog({ escopo, onDone }) {
  const [open, setOpen] = reactExports.useState(false);
  const [tipo, setTipo] = reactExports.useState("despesa");
  const [descricao, setDescricao] = reactExports.useState("");
  const [categoria, setCategoria] = reactExports.useState("");
  const [valor, setValor] = reactExports.useState("");
  const [data, setData] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  async function save() {
    if (!descricao.trim() || !valor.trim()) return;
    await addLancamento({
      escopo,
      tipo,
      descricao,
      categoria: categoria || null,
      valor: Number(valor.replace(",", ".")) || 0,
      data,
      recorrente: false
    });
    setOpen(false);
    setDescricao("");
    setCategoria("");
    setValor("");
    toast.success("Lançado!");
    onDone();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      " Novo"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Novo lançamento" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tipo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: tipo, onValueChange: (v) => setTipo(v), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "receita", children: "Receita" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "despesa", children: "Despesa" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Data" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: data, onChange: (e) => setData(e.target.value) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Descrição" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: descricao, onChange: (e) => setDescricao(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Categoria" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: categoria, onChange: (e) => setCategoria(e.target.value), placeholder: "Ex: Aluguel" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Valor (R$)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { inputMode: "decimal", value: valor, onChange: (e) => setValor(e.target.value) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: save, children: "Salvar" })
      ] })
    ] })
  ] });
}
function NovaRecorrenteDialog({ escopo, onDone }) {
  const [open, setOpen] = reactExports.useState(false);
  const [descricao, setDescricao] = reactExports.useState("");
  const [categoria, setCategoria] = reactExports.useState("");
  const [valor, setValor] = reactExports.useState("");
  const [dia, setDia] = reactExports.useState("1");
  async function save() {
    if (!descricao.trim() || !valor.trim()) return;
    await addRecorrente({
      escopo,
      descricao,
      categoria: categoria || null,
      valor: Number(valor.replace(",", ".")) || 0,
      dia: Math.min(Math.max(Number(dia) || 1, 1), 28)
    });
    setOpen(false);
    setDescricao("");
    setCategoria("");
    setValor("");
    setDia("1");
    toast.success("Recorrência criada");
    onDone();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      " Recorrente"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Nova despesa recorrente" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Descrição" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: descricao, onChange: (e) => setDescricao(e.target.value), placeholder: "Ex: Aluguel da sala" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Categoria" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: categoria, onChange: (e) => setCategoria(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Valor (R$)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { inputMode: "decimal", value: valor, onChange: (e) => setValor(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Dia" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 1, max: 28, value: dia, onChange: (e) => setDia(e.target.value) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: save, children: "Salvar" })
      ] })
    ] })
  ] });
}
export {
  FinanceiroPanel as F
};
