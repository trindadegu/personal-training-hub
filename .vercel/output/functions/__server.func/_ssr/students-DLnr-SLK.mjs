import { e as emptyTraining } from "./types-DN-33vrr.mjs";
import { c as createStudentFn, d as deleteStudentFn, u as updateStudentFn, l as listStudentsPublicFn, a as listStudentsAdminFn, f as findStudentAdminFn } from "./students.functions-SKg7Ok10.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BaOR-_gw.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import { o as objectType, s as stringType, a as anyType } from "../_libs/zod.mjs";
const AlunoIdSchema = objectType({
  alunoId: stringType().min(1).max(120)
});
const getTrainingFn = createServerFn({
  method: "POST"
}).inputValidator((input) => AlunoIdSchema.parse(input)).handler(createSsrRpc("9dc645836fb32a8be66710c0d13cc06e03188c78f93c8d5a263e166f9b17b790"));
const saveTrainingFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120),
  treino: anyType()
}).parse(input)).handler(createSsrRpc("b12d8e494f085bb0096cc0cb1e429e1b5038f53468f49962da115fd409c8f223"));
const getProgressFn = createServerFn({
  method: "POST"
}).inputValidator((input) => AlunoIdSchema.parse(input)).handler(createSsrRpc("49e6e4e9af217ef7f3d9b72c3689aaefd7fa0485deb84555cd716716d26fc53f"));
const MAX_JSON_BYTES = 5e4;
const boundedJson = anyType().superRefine((val, ctx) => {
  try {
    if (JSON.stringify(val ?? {}).length > MAX_JSON_BYTES) {
      ctx.addIssue({
        code: "custom",
        message: "Payload too large"
      });
    }
  } catch {
    ctx.addIssue({
      code: "custom",
      message: "Invalid payload"
    });
  }
});
const saveProgressFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  alunoId: stringType().min(1).max(120),
  progresso: boundedJson
}).parse(input)).handler(createSsrRpc("583bb479c7bd5f8da025c7f2e7b67a845381364ee39d9127adfb5336979a3614"));
const getDefaultTrainingFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("074694c6e2228a7b2088a3688e429ef9371aa0c203bdf2abbbf4d62cc0d39f0e"));
const saveDefaultTrainingFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  treino: anyType()
}).parse(input)).handler(createSsrRpc("b7273f019d681f6e9b07320248e4f42c9192eaa12b916f4814af8012d11c1914"));
async function listStudents() {
  return await listStudentsAdminFn() ?? [];
}
async function listStudentsPublic() {
  return await listStudentsPublicFn() ?? [];
}
async function updateStudent(id, patch) {
  await updateStudentFn({ data: { id, patch } });
}
async function findStudent(id) {
  return await findStudentAdminFn({ data: { id } }) ?? null;
}
async function createStudent(nome, opts = {}) {
  const row = await createStudentFn({
    data: {
      nome,
      telefone: opts.telefone ?? null,
      valor_mensalidade: opts.valor_mensalidade,
      dia_vencimento: opts.dia_vencimento,
      plano_id: opts.plano_id ?? null
    }
  });
  return row;
}
async function deleteStudent(id) {
  await deleteStudentFn({ data: { id } });
}
async function getTraining(alunoId) {
  const treino = await getTrainingFn({ data: { alunoId } });
  return treino ?? emptyTraining();
}
async function saveTraining(alunoId, treino) {
  await saveTrainingFn({ data: { alunoId, treino } });
}
async function getProgress(alunoId) {
  const p = await getProgressFn({ data: { alunoId } });
  return p ?? {};
}
async function saveProgress(alunoId, progresso) {
  await saveProgressFn({ data: { alunoId, progresso } });
}
async function getDefaultTraining() {
  const treino = await getDefaultTrainingFn();
  return treino ? treino : null;
}
async function saveDefaultTraining(treino) {
  await saveDefaultTrainingFn({ data: { treino } });
}
export {
  getProgress as a,
  listStudents as b,
  getDefaultTraining as c,
  saveTraining as d,
  saveDefaultTraining as e,
  createStudent as f,
  getTraining as g,
  deleteStudent as h,
  findStudent as i,
  listStudentsPublic as l,
  saveProgress as s,
  updateStudent as u
};
