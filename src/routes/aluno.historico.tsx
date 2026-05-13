import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Flame,
  MapPin,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStudentSession } from "@/lib/session";
import { listHistorico } from "@/lib/api/historico";
import type { HistoricoEntry } from "@/lib/types";

export const Route = createFileRoute("/aluno/historico")({
  component: HistoricoPage,
});

const MONTH_NAMES = [
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
  "Dezembro",
];

function ymd(d: Date): string {
  const tz = new Date(d);
  tz.setMinutes(tz.getMinutes() - tz.getTimezoneOffset());
  return tz.toISOString().slice(0, 10);
}

function HistoricoPage() {
  const session = typeof window !== "undefined" ? getStudentSession() : null;
  const alunoId = session?.id ?? "";

  const today = new Date();
  const [cursor, setCursor] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const monthStart = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const monthEnd = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
  const fromISO = ymd(monthStart);
  const toISO = ymd(monthEnd);

  const histQ = useQuery({
    queryKey: ["historico", alunoId, fromISO, toISO],
    queryFn: () => listHistorico(alunoId, fromISO, toISO),
    enabled: !!alunoId,
  });

  const entries: HistoricoEntry[] = histQ.data ?? [];

  // Map: data -> entries
  const byDate = useMemo(() => {
    const m = new Map<string, HistoricoEntry[]>();
    for (const e of entries) {
      const arr = m.get(e.data) ?? [];
      arr.push(e);
      m.set(e.data, arr);
    }
    return m;
  }, [entries]);

  // Stats
  const totalSessions = entries.length;
  const possibleWeekdays = countWeekdaysInMonth(monthStart, monthEnd);
  const adherence =
    possibleWeekdays === 0 ? 0 : Math.round((totalSessions / possibleWeekdays) * 100);
  const streak = computeCurrentStreak(byDate);

  // Bar chart by week
  const weeks = buildWeeks(monthStart, monthEnd);
  const chartData = weeks.map((w, i) => {
    const count = entries.filter((e) => e.data >= w.from && e.data <= w.to).length;
    return { semana: `S${i + 1}`, treinos: count };
  });

  // Calendar grid
  const calendar = buildCalendar(monthStart);

  function changeMonth(delta: number) {
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1));
  }

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon={<Trophy className="h-4 w-4" />} label="Treinos" value={String(totalSessions)} />
        <StatCard icon={<Target className="h-4 w-4" />} label="Adesão" value={`${adherence}%`} />
        <StatCard icon={<Flame className="h-4 w-4" />} label="Sequência" value={`${streak}d`} />
      </div>

      {/* Month nav */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-sm)]">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => changeMonth(-1)} aria-label="Mês anterior">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-display text-lg font-semibold">
            {MONTH_NAMES[cursor.getMonth()]} {cursor.getFullYear()}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => changeMonth(1)}
            aria-label="Próximo mês"
            disabled={cursor >= new Date(today.getFullYear(), today.getMonth(), 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Weekday header */}
        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>

        {/* Calendar */}
        <div className="mt-1 grid grid-cols-7 gap-1">
          {calendar.map((cell, i) => {
            if (!cell) return <div key={i} className="aspect-square" />;
            const dateStr = ymd(cell);
            const has = byDate.has(dateStr);
            const isToday = ymd(today) === dateStr;
            return (
              <div
                key={i}
                className={`relative grid aspect-square place-items-center rounded-xl text-sm transition-all ${
                  has
                    ? "bg-[image:var(--gradient-primary)] font-semibold text-primary-foreground shadow-[var(--shadow-sm)]"
                    : "bg-muted/40 text-muted-foreground"
                } ${isToday ? "ring-2 ring-primary ring-offset-2 ring-offset-card" : ""}`}
              >
                {cell.getDate()}
              </div>
            );
          })}
        </div>
      </section>

      {/* Chart */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-sm)]">
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="font-display text-lg font-semibold">Treinos por semana</h3>
        </div>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="semana" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} width={20} />
              <Tooltip
                cursor={{ fill: "color-mix(in oklab, var(--muted) 40%, transparent)" }}
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="treinos" radius={[8, 8, 0, 0]} fill="var(--primary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* List */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-primary" />
          <h3 className="font-display text-lg font-semibold">Treinos concluídos</h3>
        </div>

        {histQ.isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : entries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center">
            <Flame className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 font-medium">Nenhum treino registrado neste mês</p>
            <p className="text-sm text-muted-foreground">
              Conclua um treino marcando todos os exercícios para que ele apareça aqui.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {entries.map((e) => (
              <li
                key={e.id}
                className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-sm)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display font-semibold">
                      {formatDate(e.data)} · {capitalize(e.dia_semana)}
                    </p>
                    {e.foco && (
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <Target className="h-3 w-3" /> {e.foco}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-bold text-primary">
                      {e.exercicios_feitos.length}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      exercícios
                    </p>
                  </div>
                </div>
                {e.checkin_id && (
                  <p className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                    <MapPin className="h-3 w-3" /> Check-in registrado
                  </p>
                )}
                {e.exercicios_feitos.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {e.exercicios_feitos.slice(0, 6).map((ex, idx) => (
                      <li
                        key={idx}
                        className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {ex.name}
                      </li>
                    ))}
                    {e.exercicios_feitos.length > 6 && (
                      <li className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                        +{e.exercicios_feitos.length - 6}
                      </li>
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-sm)]">
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <p className="mt-1 font-display text-2xl font-bold">{value}</p>
    </div>
  );
}

function buildCalendar(monthStart: Date): (Date | null)[] {
  const cells: (Date | null)[] = [];
  const firstDow = monthStart.getDay();
  for (let i = 0; i < firstDow; i++) cells.push(null);
  const last = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate();
  for (let d = 1; d <= last; d++) {
    cells.push(new Date(monthStart.getFullYear(), monthStart.getMonth(), d));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function buildWeeks(monthStart: Date, monthEnd: Date): { from: string; to: string }[] {
  const weeks: { from: string; to: string }[] = [];
  let cursor = new Date(monthStart);
  while (cursor <= monthEnd) {
    const weekStart = new Date(cursor);
    const weekEnd = new Date(cursor);
    weekEnd.setDate(weekEnd.getDate() + (6 - weekStart.getDay()));
    if (weekEnd > monthEnd) weekEnd.setTime(monthEnd.getTime());
    weeks.push({ from: ymd(weekStart), to: ymd(weekEnd) });
    cursor = new Date(weekEnd);
    cursor.setDate(cursor.getDate() + 1);
  }
  return weeks;
}

function countWeekdaysInMonth(monthStart: Date, monthEnd: Date): number {
  let count = 0;
  const c = new Date(monthStart);
  const today = new Date();
  const limit = monthEnd < today ? monthEnd : today;
  while (c <= limit) {
    const dow = c.getDay();
    if (dow >= 1 && dow <= 5) count++;
    c.setDate(c.getDate() + 1);
  }
  return count;
}

function computeCurrentStreak(byDate: Map<string, HistoricoEntry[]>): number {
  let count = 0;
  const d = new Date();
  // walk back, skipping weekends
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

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}