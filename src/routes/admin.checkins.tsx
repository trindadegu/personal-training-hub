import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ExternalLink, MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { listCheckins } from "@/lib/api/checkins";

export const Route = createFileRoute("/admin/checkins")({
  component: CheckinsPage,
});

function CheckinsPage() {
  const { data: checkins = [], isLoading } = useQuery({
    queryKey: ["checkins"],
    queryFn: () => listCheckins(),
  });
  const [filter, setFilter] = useState("");

  const filtered = checkins.filter((c) => {
    const q = filter.toLowerCase();
    return (
      c.aluno_nome.toLowerCase().includes(q) || c.gym_name.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Check-ins</h1>
          <p className="text-sm text-muted-foreground">{checkins.length} registros</p>
        </div>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Buscar por aluno ou academia..."
          className="pl-9"
        />
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center text-sm text-muted-foreground">
            Nenhum check-in encontrado.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.4) }}
            >
              <Card className="border-border/60">
                <CardContent className="flex items-center justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <p className="truncate font-display font-semibold">{c.aluno_nome}</p>
                    <p className="truncate text-sm">
                      <MapPin className="mr-1 inline h-3.5 w-3.5 text-primary" />
                      {c.gym_name}
                      {c.distance_m != null && (
                        <span className="ml-2 text-xs text-muted-foreground">{c.distance_m} m</span>
                      )}
                    </p>
                    {c.gym_address && (
                      <p className="truncate text-xs text-muted-foreground">{c.gym_address}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {new Date(c.created_at).toLocaleString("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </p>
                    {c.duracao_segundos != null && c.duracao_segundos > 0 ? (
                      <p className="mt-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                        Duração: {Math.floor(c.duracao_segundos / 60)} min
                      </p>
                    ) : c.inicio_at && !c.fim_at ? (
                      <p className="mt-0.5 text-[11px] font-medium text-amber-600">
                        Em andamento
                      </p>
                    ) : null}
                    {c.lat_aluno != null && c.lng_aluno != null && (
                      <a
                        className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                        target="_blank"
                        rel="noreferrer"
                        href={`https://www.google.com/maps?q=${c.lat_aluno},${c.lng_aluno}`}
                      >
                        ver no mapa <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
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