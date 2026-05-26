import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Save, Sparkles, Loader2, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { TrainingEditor } from "@/components/app/training-editor";
import {
  getDefaultTraining,
  getTraining,
  listStudents,
  saveTraining,
} from "@/lib/api/students";
import { emptyTraining, type TreinoSemana } from "@/lib/types";

export const Route = createFileRoute("/admin/treinos")({
  component: TreinosPage,
});

function TreinosPage() {
  const qc = useQueryClient();
  const { data: alunos = [] } = useQuery({ queryKey: ["alunos"], queryFn: listStudents });
  const [alunoId, setAlunoId] = useState<string>("");
  const [treino, setTreino] = useState<TreinoSemana>(emptyTraining());
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const alunoSelecionado = useMemo(
    () => alunos.find((a) => a.id === alunoId),
    [alunos, alunoId],
  );
  const filtrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return alunos;
    return alunos.filter((a) => a.nome.toLowerCase().includes(q));
  }, [alunos, query]);

  const { data: loaded, isFetching } = useQuery({
    queryKey: ["treino", alunoId],
    queryFn: () => getTraining(alunoId),
    enabled: !!alunoId,
  });

  useEffect(() => {
    if (loaded) setTreino(loaded);
  }, [loaded]);

  async function applyPadrao() {
    const padrao = await getDefaultTraining();
    if (!padrao) {
      toast.message("Nenhum treino padrão configurado ainda.");
      return;
    }
    setTreino(padrao);
    toast.success("Treino padrão aplicado. Não esqueça de salvar.");
  }

  async function save() {
    if (!alunoId) return;
    setSaving(true);
    try {
      await saveTraining(alunoId, treino);
      toast.success("Treino salvo!");
      qc.invalidateQueries({ queryKey: ["treino", alunoId] });
    } catch (err: any) {
      toast.error(err?.message ?? "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Treinos</h1>
        <p className="text-sm text-muted-foreground">Edite o treino semanal de cada aluno.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <CardTitle className="font-display text-base">Aluno</CardTitle>
            <div className="relative mt-2">
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                  if (alunoId) setAlunoId("");
                }}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
                placeholder="Digite o nome do aluno..."
                className="pr-9"
              />
              {(query || alunoSelecionado) && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setAlunoId("");
                    setOpen(false);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
                  aria-label="Limpar"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              {open && filtrados.length > 0 && (
                <div className="absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                  {filtrados.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setAlunoId(a.id);
                        setQuery(a.nome);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground",
                        alunoId === a.id && "bg-accent/50",
                      )}
                    >
                      <Check
                        className={cn(
                          "h-4 w-4",
                          alunoId === a.id ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {a.nome}
                    </button>
                  ))}
                </div>
              )}
              {open && filtrados.length === 0 && (
                <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover p-3 text-sm text-muted-foreground shadow-md">
                  Nenhum aluno encontrado.
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        {alunoId && (
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={applyPadrao}>
                <Sparkles className="h-4 w-4" />
                Aplicar treino padrão
              </Button>
              <Button onClick={save} disabled={saving} className="ml-auto">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Salvar
              </Button>
            </div>
            {isFetching ? (
              <p className="text-sm text-muted-foreground">Carregando...</p>
            ) : (
              <TrainingEditor value={treino} onChange={setTreino} />
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}