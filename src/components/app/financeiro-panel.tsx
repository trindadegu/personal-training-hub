import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  Download,
  Repeat,
  TrendingUp,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  addLancamento, addRecorrente, deleteLancamento, deleteRecorrente,
  gerarRecorrentesDoMes, listLancamentos, listRecorrentes, porDia, resumo,
  type Escopo,
} from "@/lib/api/financeiro";
import { formatBRL, formatDateBR } from "@/lib/api/config";
import { exportFinanceiroPDF } from "@/lib/pdf";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend,
} from "recharts";

function mesInputDefault() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
const MESES_PT = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
function anosDisponiveis() {
  const atual = new Date().getFullYear();
  const arr: number[] = [];
  for (let y = atual - 5; y <= atual; y++) arr.push(y);
  return arr;
}
function rangeOfMonth(mes: string) {
  const [y, m] = mes.split("-").map(Number);
  const from = `${y}-${String(m).padStart(2, "0")}-01`;
  const lastDay = new Date(y, m, 0).getDate();
  const to = `${y}-${String(m).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
  return { from, to };
}

export function FinanceiroPanel({ escopo, titulo }: { escopo: Escopo; titulo: string }) {
  const qc = useQueryClient();
  const [mes, setMes] = useState(mesInputDefault());
  const { from, to } = rangeOfMonth(mes);
  const [anoStr, mesStr] = mes.split("-");
  const ano = Number(anoStr);
  const mesNum = Number(mesStr);
  const hoje = new Date();
  const anoAtual = hoje.getFullYear();
  const mesAtualNum = hoje.getMonth() + 1;
  const mesBloqueado = (m: number, y: number) =>
    y > anoAtual || (y === anoAtual && m > mesAtualNum);
  function setMesAno(novoMes: number, novoAno: number) {
    if (mesBloqueado(novoMes, novoAno)) {
      toast.error("Não é possível visualizar meses futuros.");
      return;
    }
    setMes(`${novoAno}-${String(novoMes).padStart(2, "0")}`);
  }

  useEffect(() => {
    // Gera recorrentes automaticamente ao entrar
    gerarRecorrentesDoMes(mes).then((n) => {
      if (n > 0) {
        toast.success(`${n} despesa(s) recorrente(s) lançada(s) automaticamente.`);
        qc.invalidateQueries({ queryKey: ["lanc", escopo] });
      }
    });
  }, [mes, qc, escopo]);

  const { data: lanc = [] } = useQuery({
    queryKey: ["lanc", escopo, from, to],
    queryFn: () => listLancamentos({ escopo, from, to }),
  });
  const { data: recs = [] } = useQuery({
    queryKey: ["rec", escopo],
    queryFn: () => listRecorrentes(escopo),
  });

  const r = useMemo(() => resumo(lanc), [lanc]);
  const chart = useMemo(() => porDia(lanc).map((d) => ({
    ...d,
    label: formatDateBR(d.data).slice(0, 5),
  })), [lanc]);

  function exportPDF() {
    exportFinanceiroPDF({
      titulo,
      mes,
      receitas: r.receitas,
      despesas: r.despesas,
      lancamentos: lanc,
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">{titulo}</h1>
          <p className="text-sm text-muted-foreground">Receitas, despesas e gráfico do mês.</p>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <div className="space-y-1">
            <Label className="text-xs">Mês</Label>
            <Select value={String(mesNum)} onValueChange={(v) => setMesAno(Number(v), ano)}>
              <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {MESES_PT.map((nome, i) => (
                  <SelectItem
                    key={i}
                    value={String(i + 1)}
                    disabled={mesBloqueado(i + 1, ano)}
                  >
                    {nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Ano</Label>
            <Select value={String(ano)} onValueChange={(v) => setMesAno(mesNum, Number(v))}>
              <SelectTrigger className="w-[110px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {anosDisponiveis().map((y) => (
                  <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={exportPDF}>
            <Download className="h-4 w-4" /> PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <StatCard label="Receitas" value={formatBRL(r.receitas)} icon={TrendingUp} tone="emerald" />
        <StatCard label="Despesas" value={formatBRL(r.despesas)} icon={TrendingDown} tone="rose" />
        <StatCard label="Saldo" value={formatBRL(r.saldo)} icon={Wallet} tone={r.saldo >= 0 ? "emerald" : "rose"} />
      </div>

      <Card>
        <CardHeader><CardTitle className="font-display text-base">Faturamento por dia</CardTitle></CardHeader>
        <CardContent>
          {chart.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">Sem lançamentos no mês.</p>
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <BarChart data={chart}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="label" fontSize={11} />
                  <YAxis fontSize={11} tickFormatter={(v) => `${v}`} />
                  <Tooltip formatter={(v: any) => formatBRL(Number(v))} />
                  <Legend />
                  <Bar dataKey="receita" name="Receita" fill="hsl(160 84% 39%)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="despesa" name="Despesa" fill="hsl(0 84% 60%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="font-display text-base">Lançamentos</CardTitle>
            <NovoLancDialog escopo={escopo} onDone={() => qc.invalidateQueries({ queryKey: ["lanc", escopo] })} />
          </CardHeader>
          <CardContent className="space-y-2">
            {lanc.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">Sem lançamentos no mês.</p>
            ) : lanc.map((l) => (
              <div key={l.id} className="flex items-center justify-between rounded-lg border border-border/60 p-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                      l.tipo === "receita"
                        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                        : "bg-rose-500/15 text-rose-700 dark:text-rose-400"
                    }`}>{l.tipo}</span>
                    <span className="text-xs text-muted-foreground">{formatDateBR(l.data)}</span>
                    {l.recorrente && <Repeat className="h-3 w-3 text-muted-foreground" />}
                  </div>
                  <p className="truncate font-medium">{l.descricao}</p>
                  <p className="text-xs text-muted-foreground">{l.categoria ?? "Sem categoria"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className={`font-semibold ${l.tipo === "receita" ? "text-emerald-600" : "text-rose-600"}`}>
                    {l.tipo === "receita" ? "+" : "−"}{formatBRL(Number(l.valor))}
                  </p>
                  <Button variant="ghost" size="icon" onClick={async () => {
                    await deleteLancamento(l.id);
                    qc.invalidateQueries({ queryKey: ["lanc", escopo] });
                  }}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="font-display text-base">Despesas recorrentes</CardTitle>
            <NovaRecorrenteDialog escopo={escopo} onDone={() => qc.invalidateQueries({ queryKey: ["rec", escopo] })} />
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-xs text-muted-foreground">
              Lançadas automaticamente no início de cada mês, no dia informado.
            </p>
            {recs.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">Nenhuma despesa recorrente.</p>
            ) : recs.map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-lg border border-border/60 p-3">
                <div>
                  <p className="font-medium">{r.descricao}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.categoria ?? "Sem categoria"} · dia {r.dia}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{formatBRL(Number(r.valor))}</p>
                  <Button variant="ghost" size="icon" onClick={async () => {
                    await deleteRecorrente(r.id);
                    qc.invalidateQueries({ queryKey: ["rec", escopo] });
                  }}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  label, value, icon: Icon, tone,
}: { label: string; value: string; icon: any; tone: "emerald" | "rose" }) {
  const toneCls = tone === "emerald"
    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
    : "bg-rose-500/10 text-rose-700 dark:text-rose-400";
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{label}</p>
            <span className={`grid h-8 w-8 place-items-center rounded-lg ${toneCls}`}>
              <Icon className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-3 font-display text-2xl font-bold">{value}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function NovoLancDialog({ escopo, onDone }: { escopo: Escopo; onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState<"receita" | "despesa">("despesa");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState(new Date().toISOString().slice(0, 10));

  async function save() {
    if (!descricao.trim() || !valor.trim()) return;
    await addLancamento({
      escopo, tipo, descricao,
      categoria: categoria || null,
      valor: Number(valor.replace(",", ".")) || 0,
      data,
      recorrente: false,
    });
    setOpen(false); setDescricao(""); setCategoria(""); setValor("");
    toast.success("Lançado!");
    onDone();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="h-4 w-4" /> Novo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle className="font-display">Novo lançamento</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Tipo</Label>
              <Select value={tipo} onValueChange={(v) => setTipo(v as any)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="receita">Receita</SelectItem>
                  <SelectItem value="despesa">Despesa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Data</Label>
              <Input type="date" value={data} onChange={(e) => setData(e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Descrição</Label>
            <Input value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Categoria</Label>
              <Input value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Ex: Aluguel" />
            </div>
            <div className="space-y-1.5">
              <Label>Valor (R$)</Label>
              <Input inputMode="decimal" value={valor} onChange={(e) => setValor(e.target.value)} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={save}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function NovaRecorrenteDialog({ escopo, onDone }: { escopo: Escopo; onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  const [dia, setDia] = useState("1");

  async function save() {
    if (!descricao.trim() || !valor.trim()) return;
    await addRecorrente({
      escopo,
      descricao,
      categoria: categoria || null,
      valor: Number(valor.replace(",", ".")) || 0,
      dia: Math.min(Math.max(Number(dia) || 1, 1), 28),
    });
    setOpen(false); setDescricao(""); setCategoria(""); setValor(""); setDia("1");
    toast.success("Recorrência criada");
    onDone();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline"><Plus className="h-4 w-4" /> Recorrente</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle className="font-display">Nova despesa recorrente</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>Descrição</Label>
            <Input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Ex: Aluguel da sala" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label>Categoria</Label>
              <Input value={categoria} onChange={(e) => setCategoria(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Valor (R$)</Label>
              <Input inputMode="decimal" value={valor} onChange={(e) => setValor(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Dia</Label>
              <Input type="number" min={1} max={28} value={dia} onChange={(e) => setDia(e.target.value)} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={save}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}