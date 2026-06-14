import { S as STUDENT_SESSION_KEY, A as ADMIN_SESSION_KEY } from "./types-DN-33vrr.mjs";
const ONE_DAY = 1e3 * 60 * 60 * 24;
function setAdminSession(username) {
  const session = { username, expiresAt: Date.now() + ONE_DAY * 7 };
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
}
function getAdminSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (s.expiresAt < Date.now()) {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      return null;
    }
    return s;
  } catch {
    return null;
  }
}
function clearAdminSession() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
}
function setStudentSession(id, name) {
  const session = { id, name, expiresAt: Date.now() + ONE_DAY * 30 };
  localStorage.setItem(STUDENT_SESSION_KEY, JSON.stringify(session));
}
function getStudentSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STUDENT_SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (s.expiresAt < Date.now()) {
      localStorage.removeItem(STUDENT_SESSION_KEY);
      return null;
    }
    return s;
  } catch {
    return null;
  }
}
function clearStudentSession() {
  localStorage.removeItem(STUDENT_SESSION_KEY);
}
export {
  setStudentSession as a,
  clearAdminSession as b,
  clearStudentSession as c,
  getStudentSession as d,
  getAdminSession as g,
  setAdminSession as s
};
