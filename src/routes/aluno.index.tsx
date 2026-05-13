import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  CheckCircle2,
  Circle,
  ExternalLink,
  Flame,
  Loader2,
  MapPin,
  Target,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getStudentSession } from "@/lib/session";
import {
  DIAS,
  DIA_LABEL,
  DIA_SHORT,
  type DiaSemana,
  type DiaTreino,
  type Progresso,
} from "@/lib/types";
import {
  getProgress,
  getTraining,
  saveProgress,
} from "@/lib/api/students";
import {
  checkinToday,
  createCheckin,
  lastCheckinForStudent,
} from "@/lib/api/checkins";
import { registerCompletedSession } from "@/lib/api/historico";
import {
  fetchNearbyGyms,
  formatDistance,
  requestLocation,
  type GeoResult,
  type NearbyGym,
} from "@/lib/geo";

export const Route = createFileRoute("/aluno/")({
  component: AlunoHomePage,
});

function currentWeekday(): DiaSemana | null {
  const map: Record<number, DiaSemana> = {
    1: "segunda",
    2: "terca",
    3: "quarta",
    4: "quinta",
    5: "sexta",
  };
  return map[new Date().getDay()] ?? null;
}

function AlunoHomePage() {
  const session = typeof window !== "undefined" ? getStudentSession() : null;
  const qc = useQueryClient();
  const alunoId = session?.id ?? "";

  const [selected, setSelected] = useState<DiaSemana>(
    () => currentWeekday() ?? "segunda"
  );

  const treinoQ = useQuery({
    queryKey: ["treino", alunoId],
    queryFn: () => getTraining(alunoId),
    enabled: !!alunoId,
  });
  const progQ = useQuery({
    queryKey: ["progresso", alunoId],
    queryFn: () => getProgress(alunoId),
    enabled: !!alunoId,
  });
  const lastCheckinQ = useQuery({
    queryKey: ["last-checkin", alunoId],
    queryFn: () => lastCheckinForStudent(alunoId),
    enabled: !!alunoId,
  });
  const todayCheckinQ = useQuery({
    queryKey: ["today-checkin", alunoId],
    queryFn: () => checkinToday(alunoId),
    enabled: !!alunoId,
  });

  const dia: DiaTreino | undefined = treinoQ.data?.[selected];
  const progresso: Progresso = progQ.data ?? {};
  const checkedIdx = progresso[selected] ?? [];

  const totalEx = dia?.exercises.length ?? 0;
  const doneEx = totalEx === 0 ? 0 : Math.min(checkedIdx.length, totalEx);
  const pct = totalEx === 0 ? 0 : Math.round((doneEx / totalEx) * 100);

  const completedDays = useMemo(() => {
    const t = treinoQ.data;
    if (!t) return new Set<DiaSemana>();
    const done = new Set<DiaSemana>();
    for (const d of DIAS) {
      const ex = t[d]?.exercises ?? [];
      const done_idx = progresso[d] ?? [];
      if (ex.length > 0 && done_idx.length >= ex.length) done.add(d);
    }
    return done;
  }, [treinoQ.data, progresso]);

  const completedJustNowRef = useRef<DiaSemana | null>(null);

  async function toggleExercise(idx: number) {
    if (!dia) return;
    const current = new Set(progresso[selected] ?? []);
    if (current.has(idx)) current.delete(idx);
    else current.add(idx);
    const nextDayIdx = Array.from(current).sort((a, b) => a - b);
    const nextProg: Progresso = { ...progresso, [selected]: nextDayIdx };
    qc.setQueryData(["progresso", alunoId], nextProg);
    try {
      await saveProgress(alunoId, nextProg);
      const justCompleted =
        nextDayIdx.length >= dia.exercises.length &&
        dia.exercises.length > 0 &&
        completedJustNowRef.current !== selected;
      if (justCompleted) {
        completedJustNowRef.current = selected;
        const todayCheckin = todayCheckinQ.data;
        await registerCompletedSession({
          alunoId,
          diaSemana: selected,
          dia,
          exerciciosFeitosIdx: nextDayIdx,
          checkinId: todayCheckin?.id ?? null,
        });
        qc.invalidateQueries({ queryKey: ["historico", alunoId] });
        toast.success("Treino concluído! 🔥", {
          description: `${dia.exercises.length} exercícios registrados no histórico.`,
        });
      }
    } catch (e: any) {
      toast.error("Erro ao salvar progresso", { description: e.message });
      qc.invalidateQueries({ queryKey: ["progresso", alunoId] });
    }
  }

  // ---------- Check-in ----------
  const [checkinOpen, setCheckinOpen] = useState(false);
  const [checkinLoading, setCheckinLoading] = useState(false);
  const [geo, setGeo] = useState<GeoResult | null>(null);
  const [gyms, setGyms] = useState<NearbyGym[] | null>(null);
  const [confirming, setConfirming] = useState<NearbyGym | null>(null);

  function handleCheckinClick() {
    // CRÍTICO iOS: chamar getCurrentPosition SINCRONAMENTE no clique.
    if (!session) return;
    if (todayCheckinQ.data) {
      toast.info("Você já fez check-in hoje", {
        description: todayCheckinQ.data.gym_name,
      });
      return;
    }
    setCheckinOpen(true);
    setCheckinLoading(true);
    setGyms(null);
    setGeo(null);
    setConfirming(null);

    requestLocation()
      .then(async (g) => {
        setGeo(g);
        const list = await fetchNearbyGyms(g.lat, g.lng, 1500);
        setGyms(list);
      })
      .catch((err) => {
        toast.error("Não foi possível obter a localização", {
          description: err.message,
        });
        setCheckinOpen(false);
      })
      .finally(() => setCheckinLoading(false));
  }

  async function confirmCheckin(gym: NearbyGym) {
    if (!session || !geo) return;
    try {
      const c = await createCheckin({
        aluno_id: session.id,
        aluno_nome: session.name,
        gym_name: gym.name,
        gym_address: gym.address,
        distance_m: Math.round(gym.distance),
        lat_aluno: geo.lat,
        lng_aluno: geo.lng,
        lat_gym: gym.lat,
        lng_gym: gym.lng,
      });
      toast.success("Check-in registrado!", { description: gym.name });
      qc.setQueryData(["today-checkin", alunoId], c);
      qc.invalidateQueries({ queryKey: ["last-checkin", alunoId] });
      setCheckinOpen(false);
    } catch (e: any) {
      toast.error("Falha ao registrar check-in", { description: e.message });
    }
  }

  useEffect(() => {
    completedJustNowRef.current = null;
  }, [selected]);

  return (
    <div className="space-y-6">
      {/* Hero card */}
      <section className="overflow-hidden rounded-3xl border border-border bg-[image:var(--gradient-primary)] p-6 text-primary-foreground shadow-[var(--shadow-lg)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] opacity-80">Hoje é</p>
            <h2 className="font-display text-2xl font-bold leading-tight">
              {currentWeekday() ? DIA_LABEL[currentWeekday() as DiaSemana] : "Fim de semana"}
            </h2>
            {dia?.focus && (
              <p className="mt-1 flex items-center gap-2 text-sm opacity-90">
                <Target className="h-4 w-4" /> {dia.focus}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider opacity-80">Progresso</p>
            <p className="font-display text-3xl font-bold">{pct}%</p>
          </div>
        </div>
        <Progress value={pct} className="mt-4 h-2 bg-white/20" />
        <div className="mt-4 flex items-center justify-between text-xs opacity-90">
          <span>{doneEx} de {totalEx} exercícios</span>
          {todayCheckinQ.data ? (
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> Check-in feito
            </span>
          ) : (
            <span className="opacity-80">Sem check-in hoje</span>
          )}
        </div>
      </section>

      {/* Day picker */}
      <section>
        <div className="grid grid-cols-5 gap-2">
          {DIAS.map((d) => {
            const isActive = d === selected;
            const isDone = completedDays.has(d);
            return (
              <button
                key={d}
                onClick={() => setSelected(d)}
                className={`relative flex flex-col items-center gap-1 rounded-2xl border px-2 py-3 text-xs font-medium transition-all ${
                  isActive
                    ? "border-primary bg-primary/10 text-primary shadow-[var(--shadow-sm)]"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40"
                }`}
              >
                <span className="font-display text-sm">{DIA_SHORT[d]}</span>
                {isDone && (
                  <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-white">
                    <CheckCircle2 className="h-3 w-3" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Check-in card */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-sm)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold">Check-in da academia</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Registre sua presença usando o GPS do celular.
            </p>
            {lastCheckinQ.data && (
              <p className="mt-2 text-xs text-muted-foreground">
                Último: <span className="text-foreground">{lastCheckinQ.data.gym_name}</span> ·{" "}
                {new Date(lastCheckinQ.data.created_at).toLocaleString("pt-BR")}
              </p>
            )}
          </div>
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <MapPin className="h-5 w-5" />
          </span>
        </div>
        <Button
          onClick={handleCheckinClick}
          className="mt-4 w-full"
          disabled={!!todayCheckinQ.data}
        >
          {todayCheckinQ.data ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" /> Check-in já feito hoje
            </>
          ) : (
            <>
              <MapPin className="mr-2 h-4 w-4" /> Fazer check-in
            </>
          )}
        </Button>
      </section>

      {/* Exercises */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">
            Treino de {DIA_LABEL[selected]}
          </h3>
          {pct === 100 && totalEx > 0 && (
            <Badge className="gap-1 bg-emerald-500 text-white hover:bg-emerald-500">
              <Trophy className="h-3.5 w-3.5" /> Concluído
            </Badge>
          )}
        </div>

        {treinoQ.isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : !dia || dia.exercises.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center">
            <Flame className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 font-medium">Sem treino para este dia</p>
            <p className="text-sm text-muted-foreground">
              Fale com seu personal para configurar a rotina.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            <AnimatePresence initial={false}>
              {dia.exercises.map((ex, idx) => {
                const done = checkedIdx.includes(idx);
                return (
                  <motion.li
                    key={`${selected}-${idx}-${ex.name}`}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <button
                      onClick={() => toggleExercise(idx)}
                      className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                        done
                          ? "border-emerald-500/40 bg-emerald-500/5"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-full">
                        {done ? (
                          <CheckCircle2 className="h-7 w-7 text-emerald-500" />
                        ) : (
                          <Circle className="h-7 w-7 text-muted-foreground" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate font-medium ${
                            done ? "text-muted-foreground line-through" : ""
                          }`}
                        >
                          {ex.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {ex.series} séries · {ex.reps} reps
                        </span>
                      </span>
                      {ex.video && (
                        <a
                          href={ex.video}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground hover:text-primary"
                          aria-label="Ver vídeo"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}
      </section>

      {/* Check-in sheet */}
      <Sheet open={checkinOpen} onOpenChange={setCheckinOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader className="text-left">
            <SheetTitle className="font-display">Selecione a academia</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            {checkinLoading && (
              <div className="flex flex-col items-center gap-3 py-10 text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin" />
                <p className="text-sm">Buscando academias próximas…</p>
              </div>
            )}

            {!checkinLoading && gyms && gyms.length === 0 && (
              <div className="py-10 text-center text-sm text-muted-foreground">
                Nenhuma academia encontrada num raio de 1,5 km.
              </div>
            )}

            {!checkinLoading && gyms && gyms.length > 0 && (
              <ul className="max-h-[55vh] space-y-2 overflow-y-auto pr-1">
                {gyms.slice(0, 12).map((g, i) => (
                  <li key={`${g.lat}-${g.lng}-${i}`}>
                    <button
                      onClick={() => setConfirming(g)}
                      className={`flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition-colors ${
                        confirming?.lat === g.lat && confirming?.lng === g.lng
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{g.name}</span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {g.address}
                        </span>
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {formatDistance(g.distance)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {confirming && (
              <Button
                className="mt-4 w-full"
                onClick={() => confirming && confirmCheckin(confirming)}
              >
                Confirmar check-in em {confirming.name}
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}