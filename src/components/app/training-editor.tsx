import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DIAS, DIA_LABEL, type DiaSemana, type TreinoSemana, emptyTraining } from "@/lib/types";

interface Props {
  value: TreinoSemana;
  onChange: (v: TreinoSemana) => void;
}

export function TrainingEditor({ value, onChange }: Props) {
  const [day, setDay] = useState<DiaSemana>("segunda");
  const safe = value ?? emptyTraining();

  function updateDay(d: DiaSemana, partial: Partial<TreinoSemana[DiaSemana]>) {
    onChange({ ...safe, [d]: { ...safe[d], ...partial } });
  }

  function addExercise() {
    const cur = safe[day];
    updateDay(day, {
      exercises: [...cur.exercises, { name: "", series: "3", reps: "12", video: "" }],
    });
  }

  function removeExercise(i: number) {
    const cur = safe[day];
    updateDay(day, { exercises: cur.exercises.filter((_, idx) => idx !== i) });
  }

  function updateExercise(i: number, patch: Partial<TreinoSemana[DiaSemana]["exercises"][number]>) {
    const cur = safe[day];
    const next = cur.exercises.map((ex, idx) => (idx === i ? { ...ex, ...patch } : ex));
    updateDay(day, { exercises: next });
  }

  return (
    <Tabs value={day} onValueChange={(v) => setDay(v as DiaSemana)}>
      <TabsList className="grid w-full grid-cols-5">
        {DIAS.map((d) => (
          <TabsTrigger key={d} value={d} className="text-xs">
            {DIA_LABEL[d].slice(0, 3)}
          </TabsTrigger>
        ))}
      </TabsList>
      {DIAS.map((d) => {
        const dt = safe[d];
        return (
          <TabsContent key={d} value={d} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Foco do dia</Label>
              <Input
                value={dt.focus}
                onChange={(e) => updateDay(d, { focus: e.target.value })}
                placeholder="Ex.: Peito e tríceps"
              />
            </div>
            <div className="space-y-2">
              {dt.exercises.length === 0 && (
                <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                  Nenhum exercício para {DIA_LABEL[d]}.
                </p>
              )}
              {dt.exercises.map((ex, i) => (
                <Card key={i} className="border-border/60">
                  <CardContent className="grid gap-2 p-3 md:grid-cols-[16px_1fr_80px_80px_1fr_36px] md:items-center">
                    <GripVertical className="hidden h-4 w-4 text-muted-foreground md:block" />
                    <Input
                      value={ex.name}
                      onChange={(e) => updateExercise(i, { name: e.target.value })}
                      placeholder="Exercício"
                    />
                    <Input
                      value={ex.series}
                      onChange={(e) => updateExercise(i, { series: e.target.value })}
                      placeholder="Séries"
                    />
                    <Input
                      value={ex.reps}
                      onChange={(e) => updateExercise(i, { reps: e.target.value })}
                      placeholder="Reps"
                    />
                    <Input
                      value={ex.video ?? ""}
                      onChange={(e) => updateExercise(i, { video: e.target.value })}
                      placeholder="Link do vídeo (opcional)"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeExercise(i)} aria-label="Remover">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button variant="outline" onClick={addExercise} className="w-full">
              <Plus className="h-4 w-4" /> Adicionar exercício
            </Button>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}