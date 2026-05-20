import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrainingEditor } from "@/components/app/training-editor";
import { getDefaultTraining, saveDefaultTraining } from "@/lib/api/students";
import { emptyTraining, type TreinoSemana } from "@/lib/types";

export const Route = createFileRoute("/admin/padrao")({
  component: PadraoPage,
});

function PadraoPage() {
  const qc = useQueryClient();
  const { data: loaded, isLoading } = useQuery({
    queryKey: ["treino-padrao"],
    queryFn: getDefaultTraining,
  });
  const [treino, setTreino] = useState<TreinoSemana>(emptyTraining());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (loaded) setTreino(loaded);
  }, [loaded]);

  async function save() {
    setSaving(true);
    try {
      await saveDefaultTraining(treino);
      toast.success("Treino padrão salvo!");
      qc.invalidateQueries({ queryKey: ["treino-padrao"] });
    } catch (err: any) {
      toast.error(err?.message ?? "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Treino padrão</h1>
        <p className="text-sm text-muted-foreground">
          Modelo que você pode aplicar rapidamente a qualquer aluno.
        </p>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-display text-base">Semana modelo</CardTitle>
          <Button onClick={save} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Salvar
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Carregando...</p>
          ) : (
            <TrainingEditor value={treino} onChange={setTreino} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}