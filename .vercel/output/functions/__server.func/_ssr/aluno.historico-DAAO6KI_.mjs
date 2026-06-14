import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useQuery } from "../_libs/tanstack__react-query.mjs";
import { B as Button } from "./button-DWfIo_Ug.mjs";
import { d as getStudentSession } from "./session-DWdtqcAN.mjs";
import { l as listHistorico } from "./historico-BnAbIK1L.mjs";
import "../_libs/seroval.mjs";
import { v as Trophy, t as Target, F as Flame, O as ChevronLeft, P as ChevronRight, y as TrendingUp, f as CalendarDays, l as MapPin } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar } from "../_libs/recharts.mjs";
import "../_libs/dotenv.mjs";
import "fs";
import "path";
import "os";
import "crypto";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "./types-DN-33vrr.mjs";
import "./historico.functions-DYd4kS2c.mjs";
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
const MONTH_NAMES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
function ymd(d) {
  const tz = new Date(d);
  tz.setMinutes(tz.getMinutes() - tz.getTimezoneOffset());
  return tz.toISOString().slice(0, 10);
}
function HistoricoPage() {
  const session = typeof window !== "undefined" ? getStudentSession() : null;
  const alunoId = session?.id ?? "";
  const today = /* @__PURE__ */ new Date();
  const [cursor, setCursor] = reactExports.useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const monthStart = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const monthEnd = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
  const fromISO = ymd(monthStart);
  const toISO = ymd(monthEnd);
  const histQ = useQuery({
    queryKey: ["historico", alunoId, fromISO, toISO],
    queryFn: () => listHistorico(alunoId, fromISO, toISO),
    enabled: !!alunoId
  });
  const entries = histQ.data ?? [];
  const byDate = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const e of entries) {
      const arr = m.get(e.data) ?? [];
      arr.push(e);
      m.set(e.data, arr);
    }
    return m;
  }, [entries]);
  const totalSessions = entries.length;
  const possibleWeekdays = countWeekdaysInMonth(monthStart, monthEnd);
  const adherence = possibleWeekdays === 0 ? 0 : Math.round(totalSessions / possibleWeekdays * 100);
  const streak = computeCurrentStreak(byDate);
  const weeks = buildWeeks(monthStart, monthEnd);
  const chartData = weeks.map((w, i) => {
    const count = entries.filter((e) => e.data >= w.from && e.data <= w.to).length;
    return {
      semana: `S${i + 1}`,
      treinos: count
    };
  });
  const calendar = buildCalendar(monthStart);
  function changeMonth(delta) {
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4" }), label: "Treinos", value: String(totalSessions) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4" }), label: "Adesão", value: `${adherence}%` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-4 w-4" }), label: "Sequência", value: `${streak}d` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-sm)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => changeMonth(-1), "aria-label": "Mês anterior", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-lg font-semibold", children: [
          MONTH_NAMES[cursor.getMonth()],
          " ",
          cursor.getFullYear()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => changeMonth(1), "aria-label": "Próximo mês", disabled: cursor >= new Date(today.getFullYear(), today.getMonth(), 1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground", children: ["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: d }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 grid grid-cols-7 gap-1", children: calendar.map((cell, i) => {
        if (!cell) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square" }, i);
        const dateStr = ymd(cell);
        const has = byDate.has(dateStr);
        const isToday = ymd(today) === dateStr;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `relative grid aspect-square place-items-center rounded-xl text-sm transition-all ${has ? "bg-[image:var(--gradient-primary)] font-semibold text-primary-foreground shadow-[var(--shadow-sm)]" : "bg-muted/40 text-muted-foreground"} ${isToday ? "ring-2 ring-primary ring-offset-2 ring-offset-card" : ""}`, children: cell.getDate() }, i);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-sm)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: "Treinos por semana" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: chartData, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--border)", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "semana", stroke: "var(--muted-foreground)", fontSize: 11, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { allowDecimals: false, stroke: "var(--muted-foreground)", fontSize: 11, tickLine: false, axisLine: false, width: 20 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { cursor: {
          fill: "color-mix(in oklab, var(--muted) 40%, transparent)"
        }, contentStyle: {
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          fontSize: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "treinos", radius: [8, 8, 0, 0], fill: "var(--primary)" })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: "Treinos concluídos" })
      ] }),
      histQ.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 animate-pulse rounded-2xl bg-muted" }, i)) }) : entries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-medium", children: "Nenhum treino registrado neste mês" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Conclua um treino marcando todos os exercícios para que ele apareça aqui." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: entries.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-sm)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-semibold", children: [
              formatDate(e.data),
              " · ",
              capitalize(e.dia_semana)
            ] }),
            e.foco && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-3 w-3" }),
              " ",
              e.foco
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-bold text-primary", children: e.exercicios_feitos.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "exercícios" })
          ] })
        ] }),
        e.checkin_id && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
          " Check-in registrado"
        ] }),
        e.exercicios_feitos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 flex flex-wrap gap-1.5", children: [
          e.exercicios_feitos.slice(0, 6).map((ex, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground", children: ex.name }, idx)),
          e.exercicios_feitos.length > 6 && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground", children: [
            "+",
            e.exercicios_feitos.length - 6
          ] })
        ] })
      ] }, e.id)) })
    ] })
  ] });
}
function StatCard({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-sm)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-medium text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: icon }),
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-2xl font-bold", children: value })
  ] });
}
function buildCalendar(monthStart) {
  const cells = [];
  const firstDow = monthStart.getDay();
  for (let i = 0; i < firstDow; i++) cells.push(null);
  const last = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate();
  for (let d = 1; d <= last; d++) {
    cells.push(new Date(monthStart.getFullYear(), monthStart.getMonth(), d));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
function buildWeeks(monthStart, monthEnd) {
  const weeks = [];
  let cursor = new Date(monthStart);
  while (cursor <= monthEnd) {
    const weekStart = new Date(cursor);
    const weekEnd = new Date(cursor);
    weekEnd.setDate(weekEnd.getDate() + (6 - weekStart.getDay()));
    if (weekEnd > monthEnd) weekEnd.setTime(monthEnd.getTime());
    weeks.push({
      from: ymd(weekStart),
      to: ymd(weekEnd)
    });
    cursor = new Date(weekEnd);
    cursor.setDate(cursor.getDate() + 1);
  }
  return weeks;
}
function countWeekdaysInMonth(monthStart, monthEnd) {
  let count = 0;
  const c = new Date(monthStart);
  const today = /* @__PURE__ */ new Date();
  const limit = monthEnd < today ? monthEnd : today;
  while (c <= limit) {
    const dow = c.getDay();
    if (dow >= 1 && dow <= 5) count++;
    c.setDate(c.getDate() + 1);
  }
  return count;
}
function computeCurrentStreak(byDate) {
  let count = 0;
  const d = /* @__PURE__ */ new Date();
  for (let i = 0; i < 60; i++) {
    const dow = d.getDay();
    if (dow >= 1 && dow <= 5) {
      if (byDate.has(ymd(d))) count++;
      else break;
    }
    d.setDate(d.getDate() - 1);
  }
  return count;
}
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short"
  });
}
export {
  HistoricoPage as component
};
