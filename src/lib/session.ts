import {
  ADMIN_SESSION_KEY,
  STUDENT_SESSION_KEY,
  type AdminSession,
  type StudentSession,
} from "./types";

const ONE_DAY = 1000 * 60 * 60 * 24;

export function setAdminSession(username: string) {
  const session: AdminSession = { username, expiresAt: Date.now() + ONE_DAY * 7 };
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
}

export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as AdminSession;
    if (s.expiresAt < Date.now()) {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      return null;
    }
    return s;
  } catch {
    return null;
  }
}

export function clearAdminSession() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
}

export function setStudentSession(id: string, name: string) {
  const session: StudentSession = { id, name, expiresAt: Date.now() + ONE_DAY * 30 };
  localStorage.setItem(STUDENT_SESSION_KEY, JSON.stringify(session));
}

export function getStudentSession(): StudentSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STUDENT_SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as StudentSession;
    if (s.expiresAt < Date.now()) {
      localStorage.removeItem(STUDENT_SESSION_KEY);
      return null;
    }
    return s;
  } catch {
    return null;
  }
}

export function clearStudentSession() {
  localStorage.removeItem(STUDENT_SESSION_KEY);
}