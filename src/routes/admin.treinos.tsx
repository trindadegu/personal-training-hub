import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Save, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
            <div className="mt-2">
              <Select value={alunoId} onValueChange={setAlunoId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um aluno" />
                </SelectTrigger>
                <SelectContent>
                  {alunos.map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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