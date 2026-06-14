import { u as useSession } from "./server-DVxLX_uO.mjs";
function sessionPassword() {
  const base = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  return `atlantida-admin:${base}`.padEnd(48, "0");
}
const isProd = true;
const SESSION_CONFIG = {
  get password() {
    return sessionPassword();
  },
  name: "atlantida_admin",
  maxAge: 60 * 60 * 24 * 7,
  // 7 days
  cookie: {
    httpOnly: true,
    secure: isProd,
    sameSite: "none",
    path: "/"
  }
};
async function getAdminSession() {
  return useSession(SESSION_CONFIG);
}
async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session.data?.username) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return session;
}
export {
  getAdminSession as g,
  requireAdminSession as r
};
