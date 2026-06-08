import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { NotebookPen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getMyNotas } from "@/lib/api/me";
import { formatDateBR } from "@/lib/api/config";

export const Route = createFileRoute("/aluno/anotacoes")({
  component: AnotacoesPage,
});

const TIPO_LABEL: Record<string, string> = {
  evolucao: "Evolução",
  tecnica: "Técnica",
  proximo: "Próximo passo",
};

function AnotacoesPage() {
  const { data: notas = [], isLoading } = useQuery({
    queryKey: ["my-notas"],
    queryFn: getMyNotas,
  });

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-display text-2xl font-bold">Anotações do professor</h1>
        <p className="text-sm text-muted-foreground">
          Observações registradas para você. Somente leitura.
        </p>
      </header>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : notas.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center text-sm text-muted-foreground">
            <NotebookPen className="mx-auto mb-3 h-8 w-8 opacity-60" />
            Sem anotações ainda.
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-3">
          {notas.map((n) => (
            <Card key={n.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary">
                    {TIPO_LABEL[n.tipo] ?? n.tipo}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDateBR(n.data)}
                  </span>
                </div>
                <p className="mt-2 font-display font-semibold">{n.titulo}</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">
                  {n.conteudo}
                </p>
              </CardContent>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
}