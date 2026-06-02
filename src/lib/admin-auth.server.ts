// Server-only helpers for the admin session cookie.
// Do NOT import this file from client code; the `.server.ts` extension is
// blocked from the client bundle.
import { useSession } from "@tanstack/react-start/server";

interface AdminSessionData {
  username?: string;
  loggedInAt?: number;
}

function sessionPassword(): string {
  // Derived from the service role key so we don't need an extra secret.
  // 32+ bytes are required by useSession's underlying iron-session.
  const base = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9obmx3aHByeHpham1zcndpc3ZnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTQ1NTk4NiwiZXhwIjoyMDk1MDMxOTg2fQ.jIR8EbXlHv9SWxtBmLgICXjcqFimWmQhCmlyLjF53M4";
  return `atlantida-admin:${base}`.padEnd(48, "0");
}

const SESSION_CONFIG = {
  get password() {
    return sessionPassword();
  },
  name: "atlantida_admin",
  maxAge: 60 * 60 * 24 * 7, // 7 days
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
  },
};

export async function getAdminSession() {
  return useSession<AdminSessionData>(SESSION_CONFIG);
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session.data?.username) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return session;
}