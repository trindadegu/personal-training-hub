import { getAdminWhatsappFn } from "./admin-contact.functions";

export async function getAdminWhatsapp(): Promise<string> {
  return (await getAdminWhatsappFn()) ?? "";
}