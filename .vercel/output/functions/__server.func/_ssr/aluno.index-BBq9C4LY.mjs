import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as useQueryClient, b as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-DWfIo_Ug.mjs";
import { S as Sheet, b as SheetContent, c as SheetHeader, d as SheetTitle } from "./sheet-Jd10ol5m.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { R as Root, I as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { d as getStudentSession } from "./session-DWdtqcAN.mjs";
import { D as DIAS, a as DIA_LABEL, b as DIA_SHORT } from "./types-DN-33vrr.mjs";
import { s as saveProgress, g as getTraining, a as getProgress } from "./students-DLnr-SLK.mjs";
import { f as finishCheckin, c as createCheckin, l as lastCheckinForStudent, a as checkinToday } from "./checkins-gNCwa5vF.mjs";
import { r as registerCompletedSession } from "./historico-BnAbIK1L.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BaOR-_gw.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import "../_libs/seroval.mjs";
import { t as Target, u as CircleCheck, F as Flame, l as MapPin, v as Trophy, w as Circle, x as ExternalLink, L as LoaderCircle } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import { o as objectType, n as numberType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/dotenv.mjs";
import "fs";
import "path";
import "os";
import "crypto";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "./tslib.js";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./students.functions-SKg7Ok10.mjs";
import "./historico.functions-DYd4kS2c.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/isbot.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const Progress = reactExports.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = Root.displayName;
const statsAlunoFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120)
}).parse(input)).handler(createSsrRpc("bca07238cfb0c6832dd1fbe6f093d46b8db18241f840a38d109564e067e8927e"));
createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  diasSemCheckin: numberType().int().min(1).max(90).optional()
}).parse(input ?? {})).handler(createSsrRpc("7dfc7a016d6f238885ca9210fcb7ff73ec616854c619ce62857ec5818d8865f5"));
async function statsAluno(alunoId) {
  return await statsAlunoFn({ data: { alunoId } });
}
const fetchNearbyGymsFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  lat: numberType(),
  lng: numberType(),
  radiusM: numberType().optional().default(1500)
}).parse(input)).handler(createSsrRpc("6dc08a1185c6ebab9acfc6c17ab3fb4cba4e5827d7ddfd784872c77808467bf4"));
function requestLocation() {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Geolocalização não suportada neste navegador."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      (err) => {
        const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
        const isIOS = /iPhone|iPad|iPod/.test(ua);
        let msg;
        if (err.code === err.PERMISSION_DENIED) {
          msg = isIOS ? "Permissão negada. No iPhone abra Ajustes → Safari → Localização → Permitir, depois recarregue a página." : "Permissão negada. Toque no cadeado da barra de endereço e permita a localização.";
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          msg = "Localização indisponível. Verifique se o GPS/Wi-Fi está ativo.";
        } else if (err.code === err.TIMEOUT) {
          msg = "Tempo esgotado ao obter localização. Tente novamente em local com melhor sinal.";
        } else {
          msg = "Erro ao obter localização.";
        }
        reject(new Error(msg));
      },
      { enableHighAccuracy: true, timeout: 15e3, maximumAge: 0 }
    );
  });
}
function formatDistance(m) {
  if (m < 1e3) return `${Math.round(m)} m`;
  return `${(m / 1e3).toFixed(2)} km`;
}
async function fetchNearbyGyms(lat, lng, radiusM = 1500) {
  const gyms = await fetchNearbyGymsFn({ data: { lat, lng, radiusM } });
  return gyms;
}
function currentWeekday() {
  const map = {
    0: "domingo",
    1: "segunda",
    2: "terca",
    3: "quarta",
    4: "quinta",
    5: "sexta",
    6: "sabado"
  };
  return map[(/* @__PURE__ */ new Date()).getDay()] ?? null;
}
function AlunoHomePage() {
  const session = typeof window !== "undefined" ? getStudentSession() : null;
  const qc = useQueryClient();
  const alunoId = session?.id ?? "";
  const [selected, setSelected] = reactExports.useState(() => currentWeekday() ?? "segunda");
  const treinoQ = useQuery({
    queryKey: ["treino", alunoId],
    queryFn: () => getTraining(alunoId),
    enabled: !!alunoId
  });
  const progQ = useQuery({
    queryKey: ["progresso", alunoId],
    queryFn: () => getProgress(alunoId),
    enabled: !!alunoId
  });
  const lastCheckinQ = useQuery({
    queryKey: ["last-checkin", alunoId],
    queryFn: () => lastCheckinForStudent(alunoId),
    enabled: !!alunoId
  });
  const todayCheckinQ = useQuery({
    queryKey: ["today-checkin", alunoId],
    queryFn: () => checkinToday(alunoId),
    enabled: !!alunoId
  });
  const statsQ = useQuery({
    queryKey: ["stats-aluno", alunoId],
    queryFn: () => statsAluno(alunoId),
    enabled: !!alunoId
  });
  const dia = treinoQ.data?.[selected];
  const progresso = progQ.data ?? {};
  const checkedIdx = progresso[selected] ?? [];
  const totalEx = dia?.exercises.length ?? 0;
  const doneEx = totalEx === 0 ? 0 : Math.min(checkedIdx.length, totalEx);
  const pct = totalEx === 0 ? 0 : Math.round(doneEx / totalEx * 100);
  const completedDays = reactExports.useMemo(() => {
    const t = treinoQ.data;
    if (!t) return /* @__PURE__ */ new Set();
    const done = /* @__PURE__ */ new Set();
    for (const d of DIAS) {
      const ex = t[d]?.exercises ?? [];
      const done_idx = progresso[d] ?? [];
      if (ex.length > 0 && done_idx.length >= ex.length) done.add(d);
    }
    return done;
  }, [treinoQ.data, progresso]);
  const completedJustNowRef = reactExports.useRef(null);
  async function toggleExercise(idx) {
    if (!dia) return;
    const current = new Set(progresso[selected] ?? []);
    if (current.has(idx)) current.delete(idx);
    else current.add(idx);
    const nextDayIdx = Array.from(current).sort((a, b) => a - b);
    const nextProg = {
      ...progresso,
      [selected]: nextDayIdx
    };
    qc.setQueryData(["progresso", alunoId], nextProg);
    try {
      await saveProgress(alunoId, nextProg);
      const justCompleted = nextDayIdx.length >= dia.exercises.length && dia.exercises.length > 0 && completedJustNowRef.current !== selected;
      if (justCompleted) {
        completedJustNowRef.current = selected;
        const todayCheckin = todayCheckinQ.data;
        await registerCompletedSession({
          alunoId,
          diaSemana: selected,
          dia,
          exerciciosFeitosIdx: nextDayIdx,
          checkinId: todayCheckin?.id ?? null
        });
        if (todayCheckin?.id && !todayCheckin.fim_at) {
          try {
            const finalizado = await finishCheckin(todayCheckin.id, alunoId);
            qc.setQueryData(["today-checkin", alunoId], finalizado);
            qc.invalidateQueries({
              queryKey: ["last-checkin", alunoId]
            });
          } catch {
          }
        }
        qc.invalidateQueries({
          queryKey: ["historico", alunoId]
        });
        toast.success("Treino concluído! 🔥", {
          description: `${dia.exercises.length} exercícios registrados no histórico.`
        });
      }
    } catch (e) {
      toast.error("Erro ao salvar progresso", {
        description: e.message
      });
      qc.invalidateQueries({
        queryKey: ["progresso", alunoId]
      });
    }
  }
  const [checkinOpen, setCheckinOpen] = reactExports.useState(false);
  const [checkinLoading, setCheckinLoading] = reactExports.useState(false);
  const [geo, setGeo] = reactExports.useState(null);
  const [gyms, setGyms] = reactExports.useState(null);
  const [confirming, setConfirming] = reactExports.useState(null);
  function handleCheckinClick() {
    if (!session) return;
    if (todayCheckinQ.data) {
      toast.info("Você já fez check-in hoje", {
        description: todayCheckinQ.data.gym_name
      });
      return;
    }
    setCheckinOpen(true);
    setCheckinLoading(true);
    setGyms(null);
    setGeo(null);
    setConfirming(null);
    requestLocation().then(async (g) => {
      setGeo(g);
      const list = await fetchNearbyGyms(g.lat, g.lng, 1500);
      setGyms(list);
    }).catch((err) => {
      toast.error("Não foi possível obter a localização", {
        description: err.message
      });
      setCheckinOpen(false);
    }).finally(() => setCheckinLoading(false));
  }
  async function confirmCheckin(gym) {
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
        lng_gym: gym.lng
      });
      toast.success("Check-in registrado!", {
        description: gym.name
      });
      qc.setQueryData(["today-checkin", alunoId], c);
      qc.invalidateQueries({
        queryKey: ["last-checkin", alunoId]
      });
      setCheckinOpen(false);
    } catch (e) {
      toast.error("Falha ao registrar check-in", {
        description: e.message
      });
    }
  }
  reactExports.useEffect(() => {
    completedJustNowRef.current = null;
  }, [selected]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "overflow-hidden rounded-3xl border border-border bg-[image:var(--gradient-primary)] p-6 text-primary-foreground shadow-[var(--shadow-lg)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.18em] opacity-80", children: "Hoje é" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold leading-tight", children: currentWeekday() ? DIA_LABEL[currentWeekday()] : "Fim de semana" }),
          dia?.focus && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-2 text-sm opacity-90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4" }),
            " ",
            dia.focus
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider opacity-80", children: "Progresso" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-3xl font-bold", children: [
            pct,
            "%"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: pct, className: "mt-4 h-2 bg-white/20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between text-xs opacity-90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          doneEx,
          " de ",
          totalEx,
          " exercícios"
        ] }),
        todayCheckinQ.data ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
          " Check-in feito"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-80", children: "Sem check-in hoje" })
      ] })
    ] }),
    statsQ.data && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-sm)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: "Sua frequência" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Meta semanal de treinos" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3.5 w-3.5" }),
          " ",
          statsQ.data.streak,
          " dias seguidos"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-baseline justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-3xl font-bold", children: [
          statsQ.data.semana,
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-normal text-muted-foreground", children: [
            " ",
            "/ ",
            statsQ.data.meta_semanal
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          statsQ.data.mes,
          " treinos no mês (meta ",
          statsQ.data.meta_mensal,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: Math.min(100, statsQ.data.meta_semanal === 0 ? 0 : statsQ.data.semana / statsQ.data.meta_semanal * 100), className: "mt-3 h-2" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1.5", children: DIAS.map((d) => {
      const isActive = d === selected;
      const isDone = completedDays.has(d);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelected(d), className: `relative flex flex-col items-center gap-1 rounded-2xl border px-1 py-3 text-xs font-medium transition-all ${isActive ? "border-primary bg-primary/10 text-primary shadow-[var(--shadow-sm)]" : "border-border bg-card text-muted-foreground hover:border-primary/40"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm", children: DIA_SHORT[d] }),
        isDone && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }) })
      ] }, d);
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-sm)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: "Check-in da academia" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Registre sua presença na academia mais próxima usando o GPS." }),
          lastCheckinQ.data && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-muted-foreground", children: [
            "Último: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: lastCheckinQ.data.gym_name }),
            " ·",
            " ",
            new Date(lastCheckinQ.data.created_at).toLocaleString("pt-BR")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleCheckinClick, className: "mt-4 w-full", disabled: !!todayCheckinQ.data, children: todayCheckinQ.data ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mr-2 h-4 w-4" }),
        " Check-in já feito hoje"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mr-2 h-4 w-4" }),
        " Fazer check-in"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-lg font-semibold", children: [
          "Treino de ",
          DIA_LABEL[selected],
          dia?.focus ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 font-sans text-sm font-normal text-muted-foreground", children: [
            "— ",
            dia.focus
          ] }) : null
        ] }),
        pct === 100 && totalEx > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "gap-1 bg-emerald-500 text-white hover:bg-emerald-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5" }),
          " Concluído"
        ] })
      ] }),
      treinoQ.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 animate-pulse rounded-2xl bg-muted" }, i)) }) : !dia || dia.exercises.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-medium", children: "Sem treino para este dia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Fale com seu personal para configurar a rotina." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: dia.exercises.map((ex, idx) => {
        const done = checkedIdx.includes(idx);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.li, { layout: true, initial: {
          opacity: 0,
          y: 6
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.18
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toggleExercise(idx), className: `flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all ${done ? "border-emerald-500/40 bg-emerald-500/5" : "border-border bg-card hover:border-primary/40"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-full", children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-7 w-7 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-7 w-7 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `block truncate font-medium ${done ? "text-muted-foreground line-through" : ""}`, children: ex.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              ex.series,
              " séries · ",
              ex.reps,
              " reps"
            ] })
          ] }),
          ex.video && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: ex.video, target: "_blank", rel: "noreferrer", onClick: (e) => e.stopPropagation(), className: "grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground hover:text-primary", "aria-label": "Ver vídeo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" }) })
        ] }) }, `${selected}-${idx}-${ex.name}`);
      }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: checkinOpen, onOpenChange: setCheckinOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "bottom", className: "rounded-t-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display", children: "Selecione a academia" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
        checkinLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-10 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Buscando academias próximas…" })
        ] }),
        !checkinLoading && gyms && gyms.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-10 text-center text-sm text-muted-foreground", children: "Nenhuma academia encontrada num raio de 1,5 km." }),
        !checkinLoading && gyms && gyms.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "max-h-[55vh] space-y-2 overflow-y-auto pr-1", children: gyms.slice(0, 12).map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setConfirming(g), className: `flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition-colors ${confirming?.lat === g.lat && confirming?.lng === g.lng ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate font-medium", children: g.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-xs text-muted-foreground", children: g.address })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-xs text-muted-foreground", children: formatDistance(g.distance) })
        ] }) }, `${g.lat}-${g.lng}-${i}`)) }),
        confirming && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-4 w-full", onClick: () => confirming && confirmCheckin(confirming), children: [
          "Confirmar check-in em ",
          confirming.name
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AlunoHomePage as component
};
