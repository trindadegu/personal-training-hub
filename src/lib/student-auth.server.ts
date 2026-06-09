// Server-only helpers for the student session cookie.
// Do NOT import this file from client code; the `.server.ts` extension is
// blocked from the client bundle.
import { useSession } from "@tanstack/react-start/server";
import { getAdminSession } from "@/lib/admin-auth.server";

interface StudentSessionData {
  alunoId?: string;
  nome?: string;
  loggedInAt?: number;
}

function sessionPassword(): string {
  const base = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  return `atlantida-student:${base}`.padEnd(48, "0");
}

const isProd = process.env.NODE_ENV === "production";

const SESSION_CONFIG = {
  get password() {
    return sessionPassword();
  },
  name: "atlantida_student",
  maxAge: 60 * 60 * 24 * 30, // 30 days
  cookie: {
    httpOnly: true,
    secure: isProd,
    sameSite: (isProd ? "none" : "lax") as "none" | "lax",
    path: "/",
  },
};

export async function getStudentSession() {
  return useSession<StudentSessionData>(SESSION_CONFIG);
}

export async function requireStudentSession() {
  const session = await getStudentSession();
  if (!session.data?.alunoId) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return session;
}

/**
 * Ensures a student session exists and that it matches the given alunoId.
 * Prevents cross-student data tampering on student-facing write endpoints.
 */
export async function requireStudentSessionFor(alunoId: string) {
  const session = await requireStudentSession();
  if (session.data?.alunoId !== alunoId) {
    throw new Response("Forbidden", { status: 403 });
  }
  return session;
}

/**
 * Allows access if the caller is the matching student OR an authenticated admin.
 * Use for endpoints that both the student themselves and the admin UI need.
 */
export async function requireAdminOrStudentSessionFor(alunoId: string) {
  const admin = await getAdminSession();
  if (admin.data?.username) return { kind: "admin" as const };
  const student = await getStudentSession();
  if (student.data?.alunoId === alunoId) return { kind: "student" as const };
  throw new Response("Unauthorized", { status: 401 });
}