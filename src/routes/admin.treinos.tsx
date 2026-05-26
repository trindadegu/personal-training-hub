import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Save, Sparkles, Loader2, Check, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/components/ui/command";
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
  const [open, setOpen] = useState(false);
  const alunoSelecionado = useMemo(
    () => alunos.find((a) => a.id === alunoId),
    [alunos, alunoId],
  );

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
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {alunoSelecionado ? alunoSelecionado.nome : "Selecione ou digite o nome do aluno"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Digite o nome..." />
                    <CommandList>
                      <CommandEmpty>Nenhum aluno encontrado.</CommandEmpty>
                      <CommandGroup>
                        {alunos.map((a) => (
                          <CommandItem
                            key={a.id}
                            value={a.nome}
                            onSelect={() => {
                              setAlunoId(a.id);
                              setOpen(false);
                            }}
                          >
                            <Check className={cn("mr-2 h-4 w-4", alunoId === a.id ? "opacity-100" : "opacity-0")} />
                            {a.nome}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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