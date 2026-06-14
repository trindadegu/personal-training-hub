import { r as registerCompletedSessionFn, l as listHistoricoFn, a as listHistoricoAllFn } from "./historico.functions-DYd4kS2c.mjs";
function todayDateOnly() {
  const d = /* @__PURE__ */ new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}
async function registerCompletedSession(params) {
  const { alunoId, diaSemana, dia, exerciciosFeitosIdx, checkinId } = params;
  const exFeitos = exerciciosFeitosIdx.map((i) => dia.exercises[i]).filter(Boolean).map((e) => ({ name: e.name, series: e.series, reps: e.reps }));
  await registerCompletedSessionFn({
    data: {
      alunoId,
      data: todayDateOnly(),
      diaSemana,
      foco: dia.focus || null,
      exerciciosFeitos: exFeitos,
      totalExercicios: dia.exercises.length,
      checkinId: checkinId ?? null
    }
  });
}
async function listHistorico(alunoId, fromISO, toISO) {
  return await listHistoricoFn({ data: { alunoId, fromISO, toISO } }) ?? [];
}
async function listHistoricoAll(alunoId) {
  return await listHistoricoAllFn({ data: { alunoId } }) ?? [];
}
export {
  listHistoricoAll as a,
  listHistorico as l,
  registerCompletedSession as r
};
