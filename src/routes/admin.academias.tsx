import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Plus, Trash2, Pencil, MapPin, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  listAcademiasAdmin, createAcademia, updateAcademia, deleteAcademia, geocodeAddress,
} from "@/lib/api/academias";
import type { Academia } from "@/lib/types";

export const Route = createFileRoute("/admin/academias")({
  component: AcademiasPage,
});

interface FormState {
  nome: string;
  endereco: string;
  lat: string;
  lng: string;
  raio_metros: string;
  ativo: boolean;
}

const empty: FormState = {
  nome: "", endereco: "", lat: "", lng: "", raio_metros: "150", ativo: true,
};

function toForm(a: Academia): FormState {
  return {
    nome: a.nome,
    endereco: a.endereco ?? "",
    lat: String(a.lat),
    lng: String(a.lng),
    raio_metros: String(a.raio_metros),
    ativo: a.ativo,
  };
}

function AcademiasPage() {
  const qc = useQueryClient();
  const { data: academias = [], isLoading } = useQuery({
    queryKey: ["academias-admin"],
    queryFn: listAcademiasAdmin,
  });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Academia | null>(null);
  const [form, setForm] = useState<FormState>(empty);
  const [saving, setSaving] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<
    Array<{ display: string; lat: number; lng: number }>
  >([]);

  function openNew() {
    setEditing(null);
    setForm(empty);
    setSearchResults([]);
    setOpen(true);
  }
  function openEdit(a: Academia) {
    setEditing(a);
    setForm(toForm(a));
    setSearchResults([]);
    setOpen(true);
  }

  async function buscarEndereco() {
    if (!form.endereco.trim()) return;
    setSearching(true);
    try {
      const res = await geocodeAddress(form.endereco);
      if (res.length === 0) toast.info("Nenhum endereço encontrado.");
      setSearchResults(res);
    } catch {
      toast.error("Erro ao buscar endereço.");
    } finally {
      setSearching(false);
    }
  }

  function pickResult(r: { display: string; lat: number; lng: number }) {
    setForm({
      ...form,
      endereco: r.display,
      lat: r.lat.toFixed(6),
      lng: r.lng.toFixed(6),
    });
    setSearchResults([]);
  }

  async function save() {
    const lat = Number(form.lat);
    const lng = Number(form.lng);
    if (!form.nome.trim() || Number.isNaN(lat) || Number.isNaN(lng)) {
      toast.error("Nome, latitude e longitude são obrigatórios.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        nome: form.nome.trim(),
        endereco: form.endereco.trim() || null,
        lat,
        lng,
        raio_metros: Math.min(Math.max(Number(form.raio_metros) || 150, 20), 5000),
        ativo: form.ativo,
      };
      if (editing) await updateAcademia(editing.id, payload);
      else await createAcademia(payload);
      toast.success(editing ? "Academia atualizada." : "Academia cadastrada.");
      qc.invalidateQueries({ queryKey: ["academias-admin"] });
      qc.invalidateQueries({ queryKey: ["academias-public"] });
      setOpen(false);
    } catch (e: any) {
      toast.error(e?.message ?? "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(a: Academia) {
    try {
      await deleteAcademia(a.id);
      toast.success("Removida.");
      qc.invalidateQueries({ queryKey: ["academias-admin"] });
    } catch (e: any) {
      toast.error(e?.message ?? "Erro.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Academias parceiras</h1>
          <p className="text-sm text-muted-foreground">
            Apenas dentro do raio dessas academias os alunos podem fazer check-in.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}><Plus className="h-4 w-4" /> Nova academia</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display">
                {editing ? "Editar academia" : "Cadastrar academia"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  placeholder="Smart Fit Centro"
                />
              </div>
              <div className="space-y-2">
                <Label>Endereço</Label>
                <div className="flex gap-2">
                  <Input
                    value={form.endereco}
                    onChange={(e) => setForm({ ...form, endereco: e.target.value })}
                    placeholder="Rua das Flores, 123, Fortaleza"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={buscarEndereco}
                    disabled={searching}
                    aria-label="Buscar coordenadas"
                  >
                    {searching
                      ? <Loader2 className="h-4 w-4 animate-spin" />
                      : <Search className="h-4 w-4" />}
                  </Button>
                </div>
                {searchResults.length > 0 && (
                  <ul className="space-y-1 rounded-lg border border-border/60 p-2 text-xs">
                    {searchResults.map((r, i) => (
                      <li key={i}>
                        <button
                          type="button"
                          onClick={() => pickResult(r)}
                          className="w-full rounded p-2 text-left hover:bg-muted"
                        >
                          <span className="line-clamp-2">{r.display}</span>
                          <span className="block text-[10px] text-muted-foreground">
                            {r.lat.toFixed(5)}, {r.lng.toFixed(5)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label>Latitude</Label>
                  <Input
                    value={form.lat}
                    onChange={(e) => setForm({ ...form, lat: e.target.value })}
                    placeholder="-3.7172"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Longitude</Label>
                  <Input
                    value={form.lng}
                    onChange={(e) => setForm({ ...form, lng: e.target.value })}
                    placeholder="-38.5433"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Raio (m)</Label>
                  <Input
                    type="number"
                    value={form.raio_metros}
                    onChange={(e) => setForm({ ...form, raio_metros: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/60 p-3">
                <Label className="text-sm">Ativa</Label>
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
      ) : academias.length === 0 ? (
        <Card><CardContent className="p-10 text-center text-sm text-muted-foreground">
          Nenhuma academia cadastrada. Enquanto não houver, o check-in aceita qualquer localização.
        </CardContent></Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {academias.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className={a.ativo ? "" : "opacity-60"}>
                <CardContent className="flex items-start justify-between gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 font-display font-semibold">
                      <MapPin className="h-4 w-4 text-primary" /> {a.nome}
                    </p>
                    {a.endereco && (
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{a.endereco}</p>
                    )}
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {a.lat.toFixed(5)}, {a.lng.toFixed(5)} · raio {a.raio_metros}m
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(a)} aria-label="Editar">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Remover">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remover {a.nome}?</AlertDialogTitle>
                          <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => remove(a)}>Remover</AlertDialogAction>
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