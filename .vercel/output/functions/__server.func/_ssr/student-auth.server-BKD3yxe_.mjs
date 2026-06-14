import { g as getAdminSession } from "./admin-auth.server-DLi38Do9.mjs";
import { u as useSession } from "./server-DVxLX_uO.mjs";
function sessionPassword() {
  const base = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  return `atlantida-student:${base}`.padEnd(48, "0");
}
const isProd = true;
const SESSION_CONFIG = {
  get password() {
    return sessionPassword();
  },
  name: "atlantida_student",
  maxAge: 60 * 60 * 24 * 30,
  // 30 days
  cookie: {
    httpOnly: true,
    secure: isProd,
    sameSite: "none",
    path: "/"
  }
};
async function getStudentSession() {
  return useSession(SESSION_CONFIG);
}
async function requireStudentSession() {
  const session = await getStudentSession();
  if (!session.data?.alunoId) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return session;
}
async function requireStudentSessionFor(alunoId) {
  const session = await requireStudentSession();
  if (session.data?.alunoId !== alunoId) {
    throw new Response("Forbidden", { status: 403 });
  }
  return session;
}
async function requireAdminOrStudentSessionFor(alunoId) {
  const admin = await getAdminSession();
  if (admin.data?.username) return { kind: "admin" };
  const student = await getStudentSession();
  if (student.data?.alunoId === alunoId) return { kind: "student" };
  throw new Response("Unauthorized", { status: 401 });
}
export {
  requireStudentSessionFor as a,
  requireStudentSession as b,
  getStudentSession as g,
  requireAdminOrStudentSessionFor as r
};
