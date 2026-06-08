import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  Download,
  Plus,
  Trash2,
  MessageCircle,
  Save,
  CheckCircle2,
  RotateCcw,
  Calendar,
  Activity,
  Wallet,
  NotebookPen,
  FileText,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { findStudent, updateStudent } from "@/lib/api/students";
import { listHistoricoAll } from "@/lib/api/historico";
import { listNotas, createNota, deleteNota } from "@/lib/api/notas";
import { listPagamentos, marcarPago, marcarPendente, gerarMensalidadesDoMes, mesLabel } from "@/lib/api/pagamentos";
import { listPdfsAdmin, uploadPdf, deletePdf } from "@/lib/api/pdfs";
import { getConfig, whatsappLink, formatBRL, formatDateBR } from "@/lib/api/config";
import { exportProntuarioPDF } from "@/lib/pdf";

export const Route = createFileRoute("/admin/aluno/$id")({
  component: AlunoDetail,
});

function AlunoDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: aluno } = useQuery({ queryKey: ["aluno", id], queryFn: () => findStudent(id) });
  const { data: notas = [] } = useQuery({ queryKey: ["notas", id], queryFn: () => listNotas(id) });
  const { data: historico = [] } = useQuery({ queryKey: ["historico-all", id], queryFn: () => listHistoricoAll(id) });
  const { data: pagamentos = [] } = useQuery({ queryKey: ["pagamentos", id], queryFn: () => listPagamentos({ alunoId: id }) });
  const { data: pdfs = [] } = useQuery({ queryKey: ["pdfs", id], queryFn: () => listPdfsAdmin(id) });

  if (!aluno) return <p className="text-sm text-muted-foreground">Carregando...</p>;

  async function exportPDF() {
    if (!aluno) return;
    await gerarMensalidadesDoMes(); // garante mês atual
    exportProntuarioPDF({ aluno, historico, notas, pagamentos });
    toast.success("PDF gerado!");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate({ to: "/admin/alunos" })}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="font-display text-2xl font-bold leading-tight">{aluno.nome}</h1>
            <p className="text-xs text-muted-foreground">
              {aluno.telefone ?? "Sem telefone"} · {aluno.valor_mensalidade ? formatBRL(Number(aluno.valor_mensalidade)) : "Sem mensalidade"}
              {aluno.dia_vencimento ? ` · vence dia ${aluno.dia_vencimento}` : ""}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/treinos" className="text-xs text-primary underline">Editar treino</Link>
          <Button onClick={exportPDF}>
            <Download className="h-4 w-4" /> Exportar prontuário (PDF)
          </Button>
        </div>
      </div>

      <Tabs defaultValue="resumo">
        <TabsList className="flex w-full flex-wrap">
          <TabsTrigger value="resumo"><Activity className="mr-1 h-3.5 w-3.5" />Resumo</TabsTrigger>
          <TabsTrigger value="dados"><Save className="mr-1 h-3.5 w-3.5" />Dados</TabsTrigger>
          <TabsTrigger value="notas"><NotebookPen className="mr-1 h-3.5 w-3.5" />Caderno</TabsTrigger>
          <TabsTrigger value="historico"><Calendar className="mr-1 h-3.5 w-3.5" />Histórico</TabsTrigger>
          <TabsTrigger value="pagamentos"><Wallet className="mr-1 h-3.5 w-3.5" />Pagamentos</TabsTrigger>
          <TabsTrigger value="pdfs"><FileText className="mr-1 h-3.5 w-3.5" />PDFs</TabsTrigger>
        </TabsList>

        <TabsContent value="resumo" className="mt-4 space-y-4">
          <ResumoTab alunoId={id} notas={notas.length} treinos={historico.length} pagamentos={pagamentos} />
        </TabsContent>

        <TabsContent value="dados" className="mt-4">
          <DadosTab aluno={aluno} onSaved={() => qc.invalidateQueries({ queryKey: ["aluno", id] })} />
        </TabsContent>

        <TabsContent value="notas" className="mt-4">
          <NotasTab alunoId={id} notas={notas} onChange={() => qc.invalidateQueries({ queryKey: ["notas", id] })} />
        </TabsContent>

        <TabsContent value="historico" className="mt-4">
          <HistoricoTab historico={historico} />
        </TabsContent>

        <TabsContent value="pagamentos" className="mt-4">
          <PagamentosTab
            aluno={aluno}
            pagamentos={pagamentos}
            onChange={() => qc.invalidateQueries({ queryKey: ["pagamentos", id] })}
          />
        </TabsContent>

        <TabsContent value="pdfs" className="mt-4">
          <PdfsTab
            alunoId={id}
            pdfs={pdfs}
            onChange={() => qc.invalidateQueries({ queryKey: ["pdfs", id] })}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ResumoTab({ alunoId, notas, treinos, pagamentos }: {
  alunoId: string; notas: number; treinos: number;
  pagamentos: Awaited<ReturnType<typeof listPagamentos>>;
}) {
  const pendentes = pagamentos.filter((p) => p.status === "pendente");
  const pago = pagamentos.filter((p) => p.status === "pago").reduce((s, p) => s + Number(p.valor), 0);
  const aReceber = pendentes.reduce((s, p) => s + Number(p.valor), 0);

  const stats = [
    { label: "Treinos registrados", value: treinos },
    { label: "Anotações", value: notas },
    { label: "Já pago", value: formatBRL(pago) },
    { label: "A receber", value: formatBRL(aReceber) },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-display text-2xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function DadosTab({ aluno, onSaved }: { aluno: NonNullable<Awaited<ReturnType<typeof findStudent>>>; onSaved: () => void }) {
  const [nome, setNome] = useState(aluno.nome);
  const [telefone, setTelefone] = useState(aluno.telefone ?? "");
  const [valor, setValor] = useState(String(aluno.valor_mensalidade ?? ""));
  const [dia, setDia] = useState(String(aluno.dia_vencimento ?? 5));
  const [status, setStatus] = useState(aluno.status ?? "ativo");
  const [objetivo, setObjetivo] = useState(aluno.objetivo ?? "");
  const [obs, setObs] = useState(aluno.observacoes ?? "");
  const [saving, setSaving] = useState(false);

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
        observacoes: obs || null,
      });
      toast.success("Salvo!");
      onSaved();
    } catch (e: any) {
      toast.error(e?.message ?? "Erro");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Nome</Label>
            <Input value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Telefone</Label>
            <Input value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="(DDD) 9XXXX-XXXX" />
          </div>
          <div className="space-y-1.5">
            <Label>Mensalidade (R$)</Label>
            <Input inputMode="decimal" value={valor} onChange={(e) => setValor(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Vence dia</Label>
            <Input type="number" min={1} max={28} value={dia} onChange={(e) => setDia(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="pausado">Pausado</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Objetivo</Label>
          <Textarea value={objetivo} onChange={(e) => setObjetivo(e.target.value)} placeholder="O que o aluno busca?" />
        </div>
        <div className="space-y-1.5">
          <Label>Observações gerais</Label>
          <Textarea value={obs} onChange={(e) => setObs(e.target.value)} placeholder="Histórico médico, restrições, preferências..." />
        </div>
        <Button onClick={save} disabled={saving}><Save className="h-4 w-4" />Salvar</Button>
      </CardContent>
    </Card>
  );
}

function NotasTab({ alunoId, notas, onChange }: { alunoId: string; notas: Awaited<ReturnType<typeof listNotas>>; onChange: () => void }) {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [tipo, setTipo] = useState("evolucao");

  async function add() {
    if (!titulo.trim() || !conteudo.trim()) return;
    await createNota({ aluno_id: alunoId, data: new Date().toISOString().slice(0, 10), titulo, conteudo, tipo });
    setTitulo(""); setConteudo("");
    toast.success("Anotação adicionada");
    onChange();
  }
  async function rm(id: string) {
    await deleteNota(id);
    onChange();
  }

  const tipoLabel: Record<string, string> = {
    evolucao: "Evolução",
    tecnica: "Técnica",
    proximo: "Próximo passo",
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
      <Card>
        <CardHeader><CardTitle className="font-display text-base">Nova anotação</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <Label>Tipo</Label>
            <Select value={tipo} onValueChange={setTipo}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="evolucao">Evolução</SelectItem>
                <SelectItem value="tecnica">Técnica usada</SelectItem>
                <SelectItem value="proximo">Próximo passo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Título</Label>
            <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ex: Avaliação trimestral" />
          </div>
          <div className="space-y-1.5">
            <Label>Conteúdo</Label>
            <Textarea rows={6} value={conteudo} onChange={(e) => setConteudo(e.target.value)} placeholder="Detalhe o que aconteceu, o que foi trabalhado..." />
          </div>
          <Button onClick={add} disabled={!titulo.trim() || !conteudo.trim()}>
            <Plus className="h-4 w-4" /> Adicionar
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {notas.length === 0 ? (
          <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">Sem anotações ainda.</CardContent></Card>
        ) : (
          notas.map((n) => (
            <Card key={n.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary">
                        {tipoLabel[n.tipo] ?? n.tipo}
                      </span>
                      <span className="text-xs text-muted-foreground">{formatDateBR(n.data)}</span>
                    </div>
                    <p className="mt-1 font-display font-semibold">{n.titulo}</p>
                    <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">{n.conteudo}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => rm(n.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

function HistoricoTab({ historico }: { historico: Awaited<ReturnType<typeof listHistoricoAll>> }) {
  if (historico.length === 0)
    return <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">Sem treinos registrados.</CardContent></Card>;
  return (
    <div className="space-y-2">
      {historico.map((h) => (
        <Card key={h.id}>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="font-display font-semibold">{formatDateBR(h.data)} · {h.dia_semana}</p>
              <p className="text-xs text-muted-foreground">{h.foco ?? "-"}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              {h.exercicios_feitos?.length ?? 0}/{h.total_exercicios} exercícios
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function PagamentosTab({
  aluno,
  pagamentos,
  onChange,
}: {
  aluno: NonNullable<Awaited<ReturnType<typeof findStudent>>>;
  pagamentos: Awaited<ReturnType<typeof listPagamentos>>;
  onChange: () => void;
}) {
  async function gerar() {
    const n = await gerarMensalidadesDoMes();
    toast.success(n ? `${n} cobrança(s) criada(s) para o mês.` : "Mês já gerado.");
    onChange();
  }
  async function pago(p: typeof pagamentos[number]) {
    await marcarPago(p.id, p.aluno_id, Number(p.valor), p.mes_referencia);
    toast.success("Marcado como pago");
    onChange();
  }
  async function reabrir(p: typeof pagamentos[number]) {
    await marcarPendente(p.id);
    toast.success("Reaberto");
    onChange();
  }
  async function cobrar(p: typeof pagamentos[number]) {
    if (!aluno.telefone) {
      toast.error("Aluno sem telefone cadastrado.");
      return;
    }
    const tpl = (await getConfig("mensagem_cobranca")) ?? "";
    const msg = tpl
      .replace("{nome}", aluno.nome.split(" ")[0])
      .replace("{mes}", mesLabel(p.mes_referencia))
      .replace("{valor}", Number(p.valor).toFixed(2).replace(".", ","))
      .replace("{vencimento}", formatDateBR(p.vencimento));
    window.open(whatsappLink(aluno.telefone, msg), "_blank");
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button variant="outline" onClick={gerar}>
          <Plus className="h-4 w-4" /> Gerar mensalidade do mês
        </Button>
      </div>
      {pagamentos.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">Sem cobranças. Clique acima para gerar.</CardContent></Card>
      ) : (
        pagamentos.map((p) => {
          const atrasado = p.status === "pendente" && new Date(p.vencimento) < new Date(new Date().toISOString().slice(0, 10));
          return (
            <Card key={p.id} className={atrasado ? "border-destructive/40" : ""}>
              <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-display font-semibold">{mesLabel(p.mes_referencia)}</p>
                  <p className="text-xs text-muted-foreground">
                    Vence {formatDateBR(p.vencimento)} · {formatBRL(Number(p.valor))}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase ${
                    p.status === "pago"
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                      : atrasado
                        ? "bg-destructive/15 text-destructive"
                        : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                  }`}>
                    {p.status === "pago" ? "Pago" : atrasado ? "Atrasado" : "Pendente"}
                  </span>
                  {p.status === "pendente" ? (
                    <>
                      <Button size="sm" variant="outline" onClick={() => cobrar(p)}>
                        <MessageCircle className="h-4 w-4" /> WhatsApp
                      </Button>
                      <Button size="sm" onClick={() => pago(p)}>
                        <CheckCircle2 className="h-4 w-4" /> Pago
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" variant="ghost" onClick={() => reabrir(p)}>
                      <RotateCcw className="h-4 w-4" /> Reabrir
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}