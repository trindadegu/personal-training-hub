import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Trash2, Copy, Search, KeyRound, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { createStudent, deleteStudent, listStudents } from "@/lib/api/students";
import { formatBRL } from "@/lib/api/config";
import { listPlanosAdmin } from "@/lib/api/planos";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/admin/alunos")({
  component: AlunosPage,
});

function AlunosPage() {
  const qc = useQueryClient();
  const { data: alunos = [], isLoading } = useQuery({ queryKey: ["alunos"], queryFn: listStudents });
  const { data: planosAll = [] } = useQuery({ queryKey: ["planos-admin"], queryFn: listPlanosAdmin });
  const planos = planosAll.filter((p: any) => p.ativo);
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [tel, setTel] = useState("");
  const [valor, setValor] = useState<string>("");
  const [dia, setDia] = useState<string>("5");
  const [planoId, setPlanoId] = useState<string>("");
  const [filter, setFilter] = useState("");
  const [saving, setSaving] = useState(false);

  const planoEscolhido = planos.find((p: any) => p.id === planoId);

  const filtered = alunos.filter((a) =>
    a.nome.toLowerCase().includes(filter.toLowerCase()),
  );

  async function add() {
    if (!nome.trim() || !planoId) return;
    setSaving(true);
    try {
      await createStudent(nome.trim(), {
        telefone: tel.trim() || undefined,
        valor_mensalidade: Number(valor.replace(",", ".")) || 0,
        dia_vencimento: Math.min(Math.max(Number(dia) || 5, 1), 28),
        plano_id: planoId,
      });
      toast.success("Aluno criado!");
      setNome("");
      setTel("");
      setValor("");
      setDia("5");
      setPlanoId("");
      setOpen(false);
      qc.invalidateQueries({ queryKey: ["alunos"] });
    } catch (err: any) {
      toast.error(err?.message ?? "Erro ao criar.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    try {
      await deleteStudent(id);
      toast.success("Aluno removido.");
      qc.invalidateQueries({ queryKey: ["alunos"] });
    } catch (err: any) {
      toast.error(err?.message ?? "Erro.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Alunos</h1>
          <p className="text-sm text-muted-foreground">{alunos.length} cadastrados</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" />
              Novo aluno
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display">Cadastrar aluno</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome completo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tel">Telefone (opcional)</Label>
                <Input id="tel" value={tel} onChange={(e) => setTel(e.target.value)} placeholder="(85) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plano">Plano contratado *</Label>
                <Select
                  value={planoId}
                  onValueChange={(v) => {
                    setPlanoId(v);
                    const p = planos.find((x: any) => x.id === v);
                    if (p) setValor(String(Number(p.preco_mensal)).replace(".", ","));
                  }}
                >
                  <SelectTrigger id="plano">
                    <SelectValue placeholder={planos.length ? "Selecione um plano" : "Cadastre planos primeiro"} />
                  </SelectTrigger>
                  <SelectContent>
                    {planos.map((p: any) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.nome} — {formatBRL(Number(p.preco_mensal))}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {planoEscolhido && (
                  <div className="mt-2 rounded-lg border border-border bg-muted/40 p-3">
                    {planoEscolhido.descricao && (
                      <p className="text-xs text-muted-foreground">{planoEscolhido.descricao}</p>
                    )}
                    {Array.isArray(planoEscolhido.beneficios) && planoEscolhido.beneficios.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {planoEscolhido.beneficios.map((b: string, i: number) => (
                          <li key={i} className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="valor">Mensalidade (R$)</Label>
                  <Input id="valor" inputMode="decimal" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="150,00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dia">Vence dia</Label>
                  <Input id="dia" type="number" min={1} max={28} value={dia} onChange={(e) => setDia(e.target.value)} />
                </div>
              </div>
              <p className="rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
                A senha do aluno será os últimos 6 caracteres do ID gerado automaticamente.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button onClick={add} disabled={saving || !nome.trim() || !planoId}>Criar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Buscar por nome..."
          className="pl-9"
        />
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center text-sm text-muted-foreground">
            Nenhum aluno encontrado.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((a, i) => {
            const senha = a.id.slice(-6);
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="flex items-center justify-between gap-3 p-4">
                    <div className="min-w-0 flex-1">
                      <Link
                        to="/admin/aluno/$id"
                        params={{ id: a.id }}
                        className="block hover:opacity-80"
                      >
                        <p className="truncate font-display font-semibold">{a.nome}</p>
                        {a.telefone && (
                          <p className="truncate text-xs text-muted-foreground">{a.telefone}</p>
                        )}
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {a.valor_mensalidade ? formatBRL(Number(a.valor_mensalidade)) : "Sem mensalidade"}
                          {a.dia_vencimento ? ` · vence dia ${a.dia_vencimento}` : ""}
                        </p>
                      </Link>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 font-mono text-[11px]">
                          <KeyRound className="h-3 w-3" /> {senha}
                        </span>
                        <button
                          type="button"
                          className="rounded p-1 text-muted-foreground hover:text-foreground"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigator.clipboard?.writeText(senha);
                            toast.success("Senha copiada");
                          }}
                          aria-label="Copiar senha"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                        <Link
                          to="/admin/aluno/$id"
                          params={{ id: a.id }}
                          className="ml-1 inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
                        >
                          Abrir prontuário <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Remover">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remover {a.nome}?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => remove(a.id)}>Remover</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}