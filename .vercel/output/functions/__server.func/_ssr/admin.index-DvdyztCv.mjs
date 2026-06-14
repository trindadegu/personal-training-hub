import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as useQueryClient, b as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-DWfIo_Ug.mjs";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-DIV666p3.mjs";
import { b as listStudents } from "./students-DLnr-SLK.mjs";
import { b as listCheckins } from "./checkins-gNCwa5vF.mjs";
import { c as countHistoricoSinceFn } from "./historico.functions-DYd4kS2c.mjs";
import { a as mesAtual, g as gerarMensalidadesDoMes, b as marcarPago, m as mesLabel, l as listPagamentos } from "./pagamentos-D1w0ItLO.mjs";
import { g as gerarRecorrentesDoMes, r as resumo, p as porDia, l as listLancamentos } from "./financeiro-D8Wk7KGH.mjs";
import { a as formatDateBR, f as formatBRL, g as getConfig, w as whatsappLink } from "./config-BwxWJN3e.mjs";
import "../_libs/seroval.mjs";
import { y as TrendingUp, W as Wallet, z as CircleAlert, i as Users, M as MessageCircle, u as CircleCheck, l as MapPin, B as Activity, D as Dumbbell, o as ArrowRight } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar } from "../_libs/recharts.mjs";
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
import "./types-DN-33vrr.mjs";
import "./students.functions-SKg7Ok10.mjs";
import "./createSsrRpc-BaOR-_gw.mjs";
import "./server-DVxLX_uO.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
async function countHistorico() {
  const start = /* @__PURE__ */ new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  return await countHistoricoSinceFn({
    data: {
      fromISO: start.toISOString().slice(0, 10)
    }
  });
}
function rangeMonth(mes) {
  const [y, m] = mes.split("-").map(Number);
  const lastDay = new Date(y, m, 0).getDate();
  return {
    from: `${y}-${String(m).padStart(2, "0")}-01`,
    to: `${y}-${String(m).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`
  };
}
function AdminDashboard() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const mes = mesAtual();
  const {
    from,
    to
  } = rangeMonth(mes);
  reactExports.useEffect(() => {
    Promise.all([gerarMensalidadesDoMes(mes), gerarRecorrentesDoMes(mes)]).then(([m, r]) => {
      if (m || r) {
        qc.invalidateQueries({
          queryKey: ["pagamentos-all"]
        });
        qc.invalidateQueries({
          queryKey: ["lanc-all"]
        });
      }
    });
  }, [mes, qc]);
  const {
    data: alunos = []
  } = useQuery({
    queryKey: ["alunos"],
    queryFn: listStudents
  });
  const {
    data: checkins = []
  } = useQuery({
    queryKey: ["checkins"],
    queryFn: () => listCheckins()
  });
  const {
    data: treinosMes = 0
  } = useQuery({
    queryKey: ["treinos-mes"],
    queryFn: countHistorico
  });
  const {
    data: pagamentos = []
  } = useQuery({
    queryKey: ["pagamentos-all", mes],
    queryFn: () => listPagamentos({
      mes
    })
  });
  const {
    data: negocio = []
  } = useQuery({
    queryKey: ["lanc-all", "negocio", from, to],
    queryFn: () => listLancamentos({
      escopo: "negocio",
      from,
      to
    })
  });
  const {
    data: pessoal = []
  } = useQuery({
    queryKey: ["lanc-all", "pessoal", from, to],
    queryFn: () => listLancamentos({
      escopo: "pessoal",
      from,
      to
    })
  });
  const rNeg = reactExports.useMemo(() => resumo(negocio), [negocio]);
  const rPes = reactExports.useMemo(() => resumo(pessoal), [pessoal]);
  const consolidado = {
    receitas: rNeg.receitas + rPes.receitas,
    despesas: rNeg.despesas + rPes.despesas,
    saldo: rNeg.receitas + rPes.receitas - (rNeg.despesas + rPes.despesas)
  };
  const chart = porDia([...negocio, ...pessoal]).map((d) => ({
    ...d,
    label: formatDateBR(d.data).slice(0, 5)
  }));
  const start = /* @__PURE__ */ new Date();
  start.setHours(0, 0, 0, 0);
  const checkinsHoje = checkins.filter((c) => new Date(c.created_at) >= start).length;
  const hoje = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const pendentes = pagamentos.filter((p) => p.status === "pendente");
  const atrasados = pendentes.filter((p) => p.vencimento < hoje);
  const aReceber = pendentes.reduce((s, p) => s + Number(p.valor), 0);
  const faturado = pagamentos.filter((p) => p.status === "pago").reduce((s, p) => s + Number(p.valor), 0);
  const atendimentos = reactExports.useMemo(() => {
    const since = /* @__PURE__ */ new Date();
    since.setDate(since.getDate() - 30);
    const map = /* @__PURE__ */ new Map();
    for (const c of checkins) {
      if (new Date(c.created_at) < since) continue;
      const cur = map.get(c.aluno_id) ?? {
        nome: c.aluno_nome,
        count: 0
      };
      cur.count++;
      map.set(c.aluno_id, cur);
    }
    return Array.from(map.values()).sort((a, b) => b.count - a.count).slice(0, 6);
  }, [checkins]);
  async function cobrarTodos() {
    const tpl = await getConfig("mensagem_cobranca") ?? "";
    let enviados = 0;
    for (const p of atrasados) {
      const aluno = alunos.find((a) => a.id === p.aluno_id);
      if (!aluno?.telefone) continue;
      const msg = tpl.replace("{nome}", aluno.nome.split(" ")[0]).replace("{mes}", mesLabel(p.mes_referencia)).replace("{valor}", Number(p.valor).toFixed(2).replace(".", ",")).replace("{vencimento}", formatDateBR(p.vencimento));
      window.open(whatsappLink(aluno.telefone, msg), "_blank");
      enviados++;
    }
    if (!enviados) toast.info("Sem atrasados com telefone cadastrado.");
  }
  const stats = [{
    label: "Faturado no mês",
    value: formatBRL(faturado),
    icon: TrendingUp,
    tone: "emerald"
  }, {
    label: "A receber",
    value: formatBRL(aReceber),
    icon: Wallet,
    tone: aReceber > 0 ? "amber" : "muted"
  }, {
    label: "Atrasados",
    value: String(atrasados.length),
    icon: CircleAlert,
    tone: atrasados.length > 0 ? "rose" : "muted"
  }, {
    label: "Alunos ativos",
    value: String(alunos.length),
    icon: Users,
    tone: "muted"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight", children: "Visão geral" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Operação, finanças e cobranças do mês." })
      ] }),
      atrasados.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: cobrarTodos, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
        " Cobrar atrasados (",
        atrasados.length,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: stats.map((s, i) => {
      const Icon = s.icon;
      const toneCls = s.tone === "emerald" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : s.tone === "rose" ? "bg-rose-500/10 text-rose-700 dark:text-rose-400" : s.tone === "amber" ? "bg-amber-500/10 text-amber-700 dark:text-amber-500" : "bg-primary/10 text-primary";
      return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 10
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: i * 0.04
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid h-8 w-8 place-items-center rounded-lg ${toneCls}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-display text-2xl font-bold", children: s.value })
      ] }) }) }, s.label);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Faturamento e despesas (consolidado)" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 grid gap-3 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResumoChip, { label: "Negócio", r: rNeg.receitas, d: rNeg.despesas }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResumoChip, { label: "Pessoal", r: rPes.receitas, d: rPes.despesas }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResumoChip, { label: "Consolidado", r: consolidado.receitas, d: consolidado.despesas, highlight: true })
        ] }),
        chart.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-12 text-center text-sm text-muted-foreground", children: "Sem lançamentos no mês." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: chart, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", opacity: 0.2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", fontSize: 11 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { fontSize: 11 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => formatBRL(Number(v)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "receita", name: "Receita", fill: "hsl(160 84% 39%)", radius: [6, 6, 0, 0] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "despesa", name: "Despesa", fill: "hsl(0 84% 60%)", radius: [6, 6, 0, 0] })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Pagamentos pendentes" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2", children: pendentes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-sm text-muted-foreground", children: "Sem pendências." }) : pendentes.slice(0, 8).map((p) => {
          const aluno = alunos.find((a) => a.id === p.aluno_id);
          const atrasado = p.vencimento < hoje;
          async function cobrarUm() {
            if (!aluno?.telefone) return toast.error("Aluno sem telefone");
            const tpl = await getConfig("mensagem_cobranca") ?? "";
            const msg = tpl.replace("{nome}", aluno.nome.split(" ")[0]).replace("{mes}", mesLabel(p.mes_referencia)).replace("{valor}", Number(p.valor).toFixed(2).replace(".", ",")).replace("{vencimento}", formatDateBR(p.vencimento));
            window.open(whatsappLink(aluno.telefone, msg), "_blank");
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center justify-between rounded-lg border p-3 ${atrasado ? "border-destructive/40" : "border-border/60"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium", children: aluno?.nome ?? p.aluno_id }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                formatBRL(Number(p.valor)),
                " · vence ",
                formatDateBR(p.vencimento)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: cobrarUm, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: async () => {
                await marcarPago(p.id, p.aluno_id, Number(p.valor), p.mes_referencia);
                qc.invalidateQueries({
                  queryKey: ["pagamentos-all"]
                });
                qc.invalidateQueries({
                  queryKey: ["lanc-all"]
                });
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) })
            ] })
          ] }, p.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Atendimentos por aluno (30 dias)" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2", children: atendimentos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-sm text-muted-foreground", children: "Sem check-ins recentes." }) : atendimentos.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-border/60 p-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: a.nome }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary", children: [
            a.count,
            " ",
            a.count === 1 ? "treino" : "treinos"
          ] })
        ] }, a.nome)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(QuickStat, { label: "Check-ins hoje", value: checkinsHoje, icon: MapPin }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(QuickStat, { label: "Treinos no mês", value: treinosMes, icon: Activity }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(QuickStat, { label: "Treino padrão", value: 1, icon: Dumbbell }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
        to: "/admin/alunos"
      }), className: "rounded-2xl border border-border bg-card p-5 text-left transition-colors hover:border-primary/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Gerenciar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base font-semibold", children: "Alunos →" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-muted-foreground" })
        ] })
      ] })
    ] })
  ] });
}
function ResumoChip({
  label,
  r,
  d,
  highlight
}) {
  const saldo = r - d;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-xl border p-3 ${highlight ? "border-primary/40 bg-primary/5" : "border-border/60"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-baseline justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-600", children: [
          "+",
          formatBRL(r)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-rose-600", children: [
          "−",
          formatBRL(d)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-display text-base font-bold ${saldo >= 0 ? "text-emerald-600" : "text-rose-600"}`, children: formatBRL(saldo) })
    ] })
  ] });
}
function QuickStat({
  label,
  value,
  icon: Icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/checkins", className: "block rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-8 w-8 place-items-center rounded-lg bg-muted text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-display text-2xl font-bold", children: value })
  ] });
}
export {
  AdminDashboard as component
};
