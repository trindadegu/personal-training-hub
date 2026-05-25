import { dbError } from "@/lib/api/_errors";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdminSession } from "@/lib/admin-auth.server";

const KeySchema = z.string().min(1).max(120).regex(/^[a-zA-Z0-9_\-.]+$/);

export const getConfigFn = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ chave: KeySchema }).parse(input))
  .handler(async ({ data }) => {
    const { data: row, error } = await supabaseAdmin
      .from("configuracoes")
      .select("valor")
      .eq("chave", data.chave)
      .maybeSingle();
    if (error) throw dbError(error);
    return row?.valor ?? null;
  });

export const setConfigFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({ chave: KeySchema, valor: z.string().max(10000) }).parse(input),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await supabaseAdmin
      .from("configuracoes")
      .upsert(
        { chave: data.chave, valor: data.valor, updated_at: new Date().toISOString() },
        { onConflict: "chave" },
      );
    if (error) throw dbError(error);
    return { ok: true };
  });