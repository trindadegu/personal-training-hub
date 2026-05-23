import {
  loginAdminFn,
  logoutAdminFn,
  getAdminConfigFn,
  updateAdminConfigFn,
  getAdminWhatsappPublicFn,
} from "./auth.functions";
import { lookupStudentLoginFn } from "./students.functions";

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
  if (id.slice(-6) !== password) return null;
  const row = await lookupStudentLoginFn({ data: { id } });
  return row;
}