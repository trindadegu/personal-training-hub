// Server-only helpers for the student session cookie.
// Do NOT import this file from client code; the `.server.ts` extension is
// blocked from the client bundle.
import { useSession } from "@tanstack/react-start/server";

interface StudentSessionData {
  alunoId?: string;
  nome?: string;
  loggedInAt?: number;
}

function sessionPassword(): string {
  const base = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9obmx3aHByeHpham1zcndpc3ZnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTQ1NTk4NiwiZXhwIjoyMDk1MDMxOTg2fQ.jIR8EbXlHv9SWxtBmLgICXjcqFimWmQhCmlyLjF53M4";
  return `atlantida-student:${base}`.padEnd(48, "0");
}

const SESSION_CONFIG = {
  get password() {
    return sessionPassword();
  },
  name: "atlantida_student",
  maxAge: 60 * 60 * 24 * 30, // 30 days
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
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