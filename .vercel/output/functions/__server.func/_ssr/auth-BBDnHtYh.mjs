import { l as logoutAdminFn, u as updateAdminConfigFn, b as loginAdminFn, g as getAdminWhatsappPublicFn, a as getAdminConfigFn } from "./router-DNEfQkU_.mjs";
import { g as getStudentMeFn, b as logoutStudentFn, e as lookupStudentLoginFn } from "./students.functions-SKg7Ok10.mjs";
async function loginAdmin(username, password) {
  const res = await loginAdminFn({ data: { username, password } });
  return res.ok;
}
async function logoutAdmin() {
  await logoutAdminFn();
}
async function getAdminConfig() {
  return await getAdminConfigFn();
}
async function updateAdminConfig(params) {
  await updateAdminConfigFn({ data: params });
}
async function getAdminWhatsapp() {
  return await getAdminWhatsappPublicFn();
}
async function loginStudent(id, password) {
  const row = await lookupStudentLoginFn({ data: { id, password } });
  return row;
}
async function getStudentMe() {
  return await getStudentMeFn();
}
async function logoutStudent() {
  await logoutStudentFn();
}
export {
  loginStudent as a,
  getStudentMe as b,
  logoutStudent as c,
  logoutAdmin as d,
  getAdminConfig as e,
  getAdminWhatsapp as g,
  loginAdmin as l,
  updateAdminConfig as u
};
