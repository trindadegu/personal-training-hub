import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { dbError } from "@/lib/api/_errors";

/** Public: WhatsApp do professor para o fluxo de contato da landing. */
export const getAdminWhatsappFn = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin.rpc("get_admin_whatsapp");
  if (error) throw dbError(error);
  return (data ?? "") as string;
});