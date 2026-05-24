import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Users, Dumbbell, MapPin, Activity, ArrowRight, Wallet, AlertCircle,
  MessageCircle, CheckCircle2, TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listStudents } from "@/lib/api/students";
import { listCheckins } from "@/lib/api/checkins";
import { countHistoricoSinceFn } from "@/lib/api/historico.functions";
import { listPagamentos, gerarMensalidadesDoMes, marcarPago, mesAtual, mesLabel } from "@/lib/api/pagamentos";
import { listLancamentos, resumo, gerarRecorrentesDoMes, porDia } from "@/lib/api/financeiro";
import { formatBRL, formatDateBR, getConfig, whatsappLink } from "@/lib/api/config";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

async function countHistorico() {
  const start = new Date(); start.setDate(1); start.setHours(0,0,0,0);
  return await countHistoricoSinceFn({
    data: { fromISO: start.toISOString().slice(0, 10) },
  });
}

function rangeMonth(mes: string) {
  const [y, m] = mes.split("-").map(Number);
  const lastDay = new Date(y, m, 0).getDate();
  return {
    from: `${y}-${String(m).padStart(2, "0")}-01`,
    to: `${y}-${String(m).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`,
  };
}

function AdminDashboard() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const mes = mesAtual();
  const { from, to } = rangeMonth(mes);

  useEffect(() => {
    Promise.all([gerarMensalidadesDoMes(mes), gerarRecorrentesDoMes(mes)]).then(([m, r]) => {
      if (m || r) {
        qc.invalidateQueries({ queryKey: ["pagamentos-all"] });
        qc.invalidateQueries({ queryKey: ["lanc-all"] });
      }
    });
  }, [mes, qc]);

  const { data: alunos = [] } = useQuery({ queryKey: ["alunos"], queryFn: listStudents });
  const { data: checkins = [] } = useQuery({ queryKey: ["checkins"], queryFn: () => listCheckins() });
  const { data: treinosMes = 0 } = useQuery({ queryKey: ["treinos-mes"], queryFn: countHistorico });
  const { data: pagamentos = [] } = useQuery({ queryKey: ["pagamentos-all", mes], queryFn: () => listPagamentos({ mes }) });
  const { data: negocio = [] } = useQuery({ queryKey: ["lanc-all", "negocio", from, to], queryFn: () => listLancamentos({ escopo: "negocio", from, to }) });
  const { data: pessoal = [] } = useQuery({ queryKey: ["lanc-all", "pessoal", from, to], queryFn: () => listLancamentos({ escopo: "pessoal", from, to }) });

  const rNeg = useMemo(() => resumo(negocio), [negocio]);
  const rPes = useMemo(() => resumo(pessoal), [pessoal]);
  const consolidado = {
    receitas: rNeg.receitas + rPes.receitas,
    despesas: rNeg.despesas + rPes.despesas,
    saldo: (rNeg.receitas + rPes.receitas) - (rNeg.despesas + rPes.despesas),
  };
  const chart = porDia([...negocio, ...pessoal]).map((d) => ({ ...d, label: formatDateBR(d.data).slice(0, 5) }));

  const start = new Date(); start.setHours(0, 0, 0, 0);
  const checkinsHoje = checkins.filter((c) => new Date(c.created_at) >= start).length;

  const hoje = new Date().toISOString().slice(0, 10);
  const pendentes = pagamentos.filter((p) => p.status === "pendente");
  const atrasados = pendentes.filter((p) => p.vencimento < hoje);
  const aReceber = pendentes.reduce((s, p) => s + Number(p.valor), 0);
  const faturado = pagamentos.filter((p) => p.status === "pago").reduce((s, p) => s + Number(p.valor), 0);

  // Atendimentos por aluno (últimos 30 dias do histórico já em treinosMes — refazendo via checkins do mês para ranking)
  const atendimentos = useMemo(() => {
    const since = new Date(); since.setDate(since.getDate() - 30);
    const map = new Map<string, { nome: string; count: number }>();
    for (const c of checkins) {
      if (new Date(c.created_at) < since) continue;
      const cur = map.get(c.aluno_id) ?? { nome: c.aluno_nome, count: 0 };
      cur.count++; map.set(c.aluno_id, cur);
    }
    return Array.from(map.values()).sort((a, b) => b.count - a.count).slice(0, 6);
  }, [checkins]);

  async function cobrarTodos() {
    const tpl = (await getConfig("mensagem_cobranca")) ?? "";
    let enviados = 0;
    for (const p of atrasados) {
      const aluno = alunos.find((a) => a.id === p.aluno_id);
      if (!aluno?.telefone) continue;
      const msg = tpl
        .replace("{nome}", aluno.nome.split(" ")[0])
        .replace("{mes}", mesLabel(p.mes_referencia))
        .replace("{valor}", Number(p.valor).toFixed(2).replace(".", ","))
        .replace("{vencimento}", formatDateBR(p.vencimento));
      window.open(whatsappLink(aluno.telefone, msg), "_blank");
      enviados++;
    }
    if (!enviados) toast.info("Sem atrasados com telefone cadastrado.");
  }

  const stats = [
    { label: "Faturado no mês", value: formatBRL(faturado), icon: TrendingUp, tone: "emerald" },
    { label: "A receber", value: formatBRL(aReceber), icon: Wallet, tone: aReceber > 0 ? "amber" : "muted" },
    { label: "Atrasados", value: String(atrasados.length), icon: AlertCircle, tone: atrasados.length > 0 ? "rose" : "muted" },
    { label: "Alunos ativos", value: String(alunos.length), icon: Users, tone: "muted" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Visão geral</h1>
          <p className="text-sm text-muted-foreground">Operação, finanças e cobranças do mês.</p>
        </div>
        {atrasados.length > 0 && (
          <Button onClick={cobrarTodos}>
            <MessageCircle className="h-4 w-4" /> Cobrar atrasados ({atrasados.length})
          </Button>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          const toneCls =
            s.tone === "emerald" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" :
            s.tone === "rose" ? "bg-rose-500/10 text-rose-700 dark:text-rose-400" :
            s.tone === "amber" ? "bg-amber-500/10 text-amber-700 dark:text-amber-500" :
            "bg-primary/10 text-primary";
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <span className={`grid h-8 w-8 place-items-center rounded-lg ${toneCls}`}><Icon className="h-4 w-4" /></span>
                  </div>
                  <p className="mt-3 font-display text-2xl font-bold">{s.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-base">Faturamento e despesas (consolidado)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid gap-3 sm:grid-cols-3">
            <ResumoChip label="Negócio" r={rNeg.receitas} d={rNeg.despesas} />
            <ResumoChip label="Pessoal" r={rPes.receitas} d={rPes.despesas} />
            <ResumoChip label="Consolidado" r={consolidado.receitas} d={consolidado.despesas} highlight />
          </div>
          {chart.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">Sem lançamentos no mês.</p>
          ) : (
            <div className="h-56 w-full">
              <ResponsiveContainer>
                <BarChart data={chart}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="label" fontSize={11} />
                  <YAxis fontSize={11} />
                  <Tooltip formatter={(v: any) => formatBRL(Number(v))} />
                  <Bar dataKey="receita" name="Receita" fill="hsl(160 84% 39%)" radius={[6,6,0,0]} />
                  <Bar dataKey="despesa" name="Despesa" fill="hsl(0 84% 60%)" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-base">Pagamentos pendentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {pendentes.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">Sem pendências.</p>
            ) : pendentes.slice(0, 8).map((p) => {
              const aluno = alunos.find((a) => a.id === p.aluno_id);
              const atrasado = p.vencimento < hoje;
              async function cobrarUm() {
                if (!aluno?.telefone) return toast.error("Aluno sem telefone");
                const tpl = (await getConfig("mensagem_cobranca")) ?? "";
                const msg = tpl
                  .replace("{nome}", aluno.nome.split(" ")[0])
                  .replace("{mes}", mesLabel(p.mes_referencia))
                  .replace("{valor}", Number(p.valor).toFixed(2).replace(".", ","))
                  .replace("{vencimento}", formatDateBR(p.vencimento));
                window.open(whatsappLink(aluno.telefone, msg), "_blank");
              }
              return (
                <div key={p.id} className={`flex items-center justify-between rounded-lg border p-3 ${atrasado ? "border-destructive/40" : "border-border/60"}`}>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{aluno?.nome ?? p.aluno_id}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatBRL(Number(p.valor))} · vence {formatDateBR(p.vencimento)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="outline" onClick={cobrarUm}><MessageCircle className="h-4 w-4" /></Button>
                    <Button size="sm" onClick={async () => {
                      await marcarPago(p.id, p.aluno_id, Number(p.valor), p.mes_referencia);
                      qc.invalidateQueries({ queryKey: ["pagamentos-all"] });
                      qc.invalidateQueries({ queryKey: ["lanc-all"] });
                    }}>
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-base">Atendimentos por aluno (30 dias)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {atendimentos.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">Sem check-ins recentes.</p>
            ) : atendimentos.map((a) => (
              <div key={a.nome} className="flex items-center justify-between rounded-lg border border-border/60 p-3 text-sm">
                <p className="font-medium">{a.nome}</p>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                  {a.count} {a.count === 1 ? "treino" : "treinos"}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <QuickStat label="Check-ins hoje" value={checkinsHoje} icon={MapPin} />
        <QuickStat label="Treinos no mês" value={treinosMes} icon={Activity} />
        <QuickStat label="Treino padrão" value={1} icon={Dumbbell} />
        <button onClick={() => navigate({ to: "/admin/alunos" })} className="rounded-2xl border border-border bg-card p-5 text-left transition-colors hover:border-primary/40">
          <p className="text-sm text-muted-foreground">Gerenciar</p>
          <div className="mt-1 flex items-center justify-between">
            <p className="font-display text-base font-semibold">Alunos →</p>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </button>
      </div>
    </div>
  );
}

function ResumoChip({ label, r, d, highlight }: { label: string; r: number; d: number; highlight?: boolean }) {
  const saldo = r - d;
  return (
    <div className={`rounded-xl border p-3 ${highlight ? "border-primary/40 bg-primary/5" : "border-border/60"}`}>
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="mt-1 flex items-baseline justify-between gap-2">
        <div>
          <p className="text-xs text-emerald-600">+{formatBRL(r)}</p>
          <p className="text-xs text-rose-600">−{formatBRL(d)}</p>
        </div>
        <p className={`font-display text-base font-bold ${saldo >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
          {formatBRL(saldo)}
        </p>
      </div>
    </div>
  );
}

function QuickStat({ label, value, icon: Icon }: { label: string; value: number | string; icon: any }) {
  return (
    <Link to="/admin/checkins" className="block rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-muted text-foreground"><Icon className="h-4 w-4" /></span>
      </div>
      <p className="mt-3 font-display text-2xl font-bold">{value}</p>
    </Link>
  );
}