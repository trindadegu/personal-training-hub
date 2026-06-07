import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Plus, Trash2, Pencil, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  listPlanosAdmin, createPlano, updatePlano, deletePlano,
} from "@/lib/api/planos";
import type { Plano } from "@/lib/types";
import { formatBRL } from "@/lib/api/config";

export const Route = createFileRoute("/admin/planos")({
  component: PlanosPage,
});

interface FormState {
  nome: string;
  descricao: string;
  preco_mensal: string;
  beneficios: string;
  ordem: string;
  ativo: boolean;
}

const empty: FormState = {
  nome: "", descricao: "", preco_mensal: "", beneficios: "", ordem: "0", ativo: true,
};

function toForm(p: Plano): FormState {
  return {
    nome: p.nome,
    descricao: p.descricao ?? "",
    preco_mensal: String(p.preco_mensal).replace(".", ","),
    beneficios: (p.beneficios ?? []).join("\n"),
    ordem: String(p.ordem),
    ativo: p.ativo,
  };
}

function fromForm(f: FormState) {
  const beneficios = f.beneficios.split("\n").map((s) => s.trim()).filter(Boolean);
  return {
    nome: f.nome.trim(),
    descricao: f.descricao.trim() || null,
    preco_mensal: Number(f.preco_mensal.replace(",", ".")) || 0,
    beneficios,
    ordem: Number(f.ordem) || 0,
    ativo: f.ativo,
  };
}

function PlanosPage() {
  const qc = useQueryClient();
  const { data: planos = [], isLoading } = useQuery({
    queryKey: ["planos-admin"],
    queryFn: listPlanosAdmin,
  });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Plano | null>(null);
  const [form, setForm] = useState<FormState>(empty);
  const [saving, setSaving] = useState(false);

  function openNew() {
    setEditing(null);
    setForm({ ...empty, ordem: String(planos.length + 1) });
    setOpen(true);
  }
  function openEdit(p: Plano) {
    setEditing(p);
    setForm(toForm(p));
    setOpen(true);
  }

  async function save() {
    const payload = fromForm(form);
    if (!payload.nome || payload.beneficios.length === 0) {
      toast.error("Nome e ao menos 1 benefício são obrigatórios.");
      return;
    }
    setSaving(true);
    try {
      if (editing) await updatePlano(editing.id, payload);
      else await createPlano(payload);
      toast.success(editing ? "Plano atualizado." : "Plano criado.");
      qc.invalidateQueries({ queryKey: ["planos-admin"] });
      qc.invalidateQueries({ queryKey: ["planos-public"] });
      setOpen(false);
    } catch (e: any) {
      toast.error(e?.message ?? "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(p: Plano) {
    try {
      await deletePlano(p.id);
      toast.success("Plano removido.");
      qc.invalidateQueries({ queryKey: ["planos-admin"] });
      qc.invalidateQueries({ queryKey: ["planos-public"] });
    } catch (e: any) {
      toast.error(e?.message ?? "Erro.");
    }
  }

  async function toggle(p: Plano) {
    await updatePlano(p.id, { ativo: !p.ativo });
    qc.invalidateQueries({ queryKey: ["planos-admin"] });
    qc.invalidateQueries({ queryKey: ["planos-public"] });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Planos</h1>
          <p className="text-sm text-muted-foreground">
            {planos.length} cadastrados · aparecem na página inicial e no cadastro de alunos.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}><Plus className="h-4 w-4" /> Novo plano</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display">
                {editing ? "Editar plano" : "Novo plano"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  placeholder="Treino + Acompanhamento"
                />
              </div>
              <div className="space-y-2">
                <Label>Descrição curta</Label>
                <Input
                  value={form.descricao}
                  onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                  placeholder="Aparece abaixo do nome do plano."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Preço mensal (R$)</Label>
                  <Input
                    inputMode="decimal"
                    value={form.preco_mensal}
                    onChange={(e) => setForm({ ...form, preco_mensal: e.target.value })}
                    placeholder="150,00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ordem</Label>
                  <Input
                    type="number"
                    value={form.ordem}
                    onChange={(e) => setForm({ ...form, ordem: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Benefícios (1 por linha)</Label>
                <Textarea
                  rows={6}
                  value={form.beneficios}
                  onChange={(e) => setForm({ ...form, beneficios: e.target.value })}
                  placeholder={"Ficha de treino semanal\nCheck-in com GPS\nSuporte WhatsApp"}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/60 p-3">
                <Label className="text-sm">Plano ativo (visível para alunos)</Label>
                <Switch
                  checked={form.ativo}
                  onCheckedChange={(v) => setForm({ ...form, ativo: v })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button onClick={save} disabled={saving}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando…</p>
      ) : planos.length === 0 ? (
        <Card><CardContent className="p-10 text-center text-sm text-muted-foreground">
          Nenhum plano cadastrado.
        </CardContent></Card>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {planos.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card className={p.ativo ? "" : "opacity-60"}>
                <CardContent className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-display text-lg font-bold">{p.nome}</p>
                      <p className="font-display text-2xl font-bold text-primary">
                        {formatBRL(Number(p.preco_mensal))}
                        <span className="text-xs font-normal text-muted-foreground"> /mês</span>
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Switch checked={p.ativo} onCheckedChange={() => toggle(p)} />
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        ordem {p.ordem}
                      </span>
                    </div>
                  </div>
                  {p.descricao && (
                    <p className="text-xs text-muted-foreground">{p.descricao}</p>
                  )}
                  <ul className="space-y-1 text-xs">
                    {(p.beneficios ?? []).map((b, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" onClick={() => openEdit(p)}>
                      <Pencil className="h-3 w-3" /> Editar
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remover {p.nome}?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Alunos vinculados a esse plano ficam sem plano (não são deletados).
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => remove(p)}>
                            Remover
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}