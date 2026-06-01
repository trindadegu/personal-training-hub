import {
  loginAdminFn,
  logoutAdminFn,
  getAdminConfigFn,
  updateAdminConfigFn,
  getAdminWhatsappPublicFn,
} from "./auth.functions";
import {
  lookupStudentLoginFn,
  getStudentMeFn,
  logoutStudentFn,
} from "./students.functions";

export async function loginAdmin(username: string, password: string): Promise<boolean> {
  const res = await loginAdminFn({ data: { username, password } });
  return res.ok;
}

export async function logoutAdmin(): Promise<void> {
  await logoutAdminFn();
}

/** Returns the editable admin fields (no password). Admin-only. */
export async function getAdminConfig(): Promise<{ username: string; whatsapp: string | null } | null> {
  return (await getAdminConfigFn()) as { username: string; whatsapp: string | null } | null;
}

export async function updateAdminConfig(params: {
  username: string;
  password?: string;
  whatsapp: string;
}): Promise<void> {
  await updateAdminConfigFn({ data: params });
}

/** Public helper for the student "forgot password" link. */
export async function getAdminWhatsapp(): Promise<string | null> {
  return await getAdminWhatsappPublicFn();
}

export async function loginStudent(id: string, password: string) {
  // Password verification is enforced server-side inside lookupStudentLoginFn.
  const row = await lookupStudentLoginFn({ data: { id, password } });
  return row;
}

/** Server-verified currently signed-in student (from httpOnly cookie). */
export async function getStudentMe(): Promise<{ id: string; nome: string } | null> {
  return (await getStudentMeFn()) as { id: string; nome: string } | null;
}

export async function logoutStudent(): Promise<void> {
  await logoutStudentFn();
}