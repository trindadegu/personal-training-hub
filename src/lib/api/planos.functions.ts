import { dbError } from "@/lib/api/_errors";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdminSession } from "@/lib/admin-auth.server";

const PlanoSchema = z.object({
  nome: z.string().min(1).max(120),
  descricao: z.string().max(500).nullable().optional(),
  preco_mensal: z.number().min(0).max(100000),
  beneficios: z.array(z.string().min(1).max(200)).min(1).max(20),
  ordem: z.number().int().min(0).max(99).optional(),
  ativo: z.boolean().optional(),
});

/** Public: lista de planos ativos para exibir na landing. */
export const listPlanosPublicFn = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("planos")
    .select("id, nome, descricao, preco_mensal, beneficios, ordem")
    .eq("ativo", true)
    .order("ordem", { ascending: true });
  if (error) throw dbError(error);
  return data ?? [];
});

/** Admin: lista completa (inclusive inativos). */
export const listPlanosAdminFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  const { data, error } = await supabaseAdmin
    .from("planos")
    .select("*")
    .order("ordem", { ascending: true });
  if (error) throw dbError(error);
  return data ?? [];
});

export const createPlanoFn = createServerFn({ method: "POST" })
  .inputValidator((input) => PlanoSchema.parse(input))
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await supabaseAdmin.from("planos").insert({
      nome: data.nome,
      descricao: data.descricao ?? null,
      preco_mensal: data.preco_mensal,
      beneficios: data.beneficios,
      ordem: data.ordem ?? 0,
      ativo: data.ativo ?? true,
    });
    if (error) throw dbError(error);
    return { ok: true };
  });

export const updatePlanoFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({ id: z.string().uuid(), patch: PlanoSchema.partial() }).parse(input),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await supabaseAdmin
      .from("planos")
      .update(data.patch as any)
      .eq("id", data.id);
    if (error) throw dbError(error);
    return { ok: true };
  });

export const deletePlanoFn = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await supabaseAdmin.from("planos").delete().eq("id", data.id);
    if (error) throw dbError(error);
    return { ok: true };
  });