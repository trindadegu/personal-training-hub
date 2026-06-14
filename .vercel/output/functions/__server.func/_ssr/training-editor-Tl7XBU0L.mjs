import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Button } from "./button-DWfIo_Ug.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { C as Card, a as CardContent } from "./card-DIV666p3.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-fMRf3trd.mjs";
import { D as DIAS, b as DIA_SHORT, a as DIA_LABEL, e as emptyTraining } from "./types-DN-33vrr.mjs";
import { Q as GripVertical, R as Trash2, V as Plus } from "../_libs/lucide-react.mjs";
function normalize(v) {
  const base = emptyTraining();
  if (!v || typeof v !== "object") return base;
  for (const d of DIAS) {
    const day = v[d];
    if (day && typeof day === "object") {
      base[d] = {
        focus: typeof day.focus === "string" ? day.focus : "",
        exercises: Array.isArray(day.exercises) ? day.exercises : []
      };
    }
  }
  return base;
}
function TrainingEditor({ value, onChange }) {
  const [day, setDay] = reactExports.useState("segunda");
  const safe = normalize(value);
  function updateDay(d, partial) {
    onChange({ ...safe, [d]: { ...safe[d], ...partial } });
  }
  function addExercise() {
    const cur = safe[day];
    updateDay(day, {
      exercises: [...cur.exercises, { name: "", series: "3", reps: "12", video: "" }]
    });
  }
  function removeExercise(i) {
    const cur = safe[day];
    updateDay(day, { exercises: cur.exercises.filter((_, idx) => idx !== i) });
  }
  function updateExercise(i, patch) {
    const cur = safe[day];
    const next = cur.exercises.map((ex, idx) => idx === i ? { ...ex, ...patch } : ex);
    updateDay(day, { exercises: next });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: day, onValueChange: (v) => setDay(v), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "grid w-full grid-cols-7", children: DIAS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: d, className: "text-xs px-1", children: DIA_SHORT[d] }, d)) }),
    DIAS.map((d) => {
      const dt = safe[d];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: d, className: "space-y-4 pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Foco do dia" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: dt.focus,
              onChange: (e) => updateDay(d, { focus: e.target.value }),
              placeholder: "Ex.: Peito e tríceps"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          dt.exercises.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground", children: [
            "Nenhum exercício para ",
            DIA_LABEL[d],
            "."
          ] }),
          dt.exercises.map((ex, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-2 p-3 md:grid-cols-[16px_1fr_80px_80px_1fr_36px] md:items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "hidden h-4 w-4 text-muted-foreground md:block" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: ex.name,
                onChange: (e) => updateExercise(i, { name: e.target.value }),
                placeholder: "Exercício"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: ex.series,
                onChange: (e) => updateExercise(i, { series: e.target.value }),
                placeholder: "Séries"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: ex.reps,
                onChange: (e) => updateExercise(i, { reps: e.target.value }),
                placeholder: "Reps"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: ex.video ?? "",
                onChange: (e) => updateExercise(i, { video: e.target.value }),
                placeholder: "Link do vídeo (opcional)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => removeExercise(i), "aria-label": "Remover", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
          ] }) }, i))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: addExercise, className: "w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Adicionar exercício"
        ] })
      ] }, d);
    })
  ] });
}
export {
  TrainingEditor as T
};
