import { dbError } from "@/lib/api/_errors";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdminSession } from "@/lib/admin-auth.server";

const AcademiaSchema = z.object({
  nome: z.string().min(1).max(200),
  endereco: z.string().max(500).nullable().optional(),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  raio_metros: z.number().int().min(20).max(5000).optional(),
  ativo: z.boolean().optional(),
});

/** Public: lista academias ativas (usado pelo check-in do aluno). */
export const listAcademiasPublicFn = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("academias")
    .select("id, nome, endereco, lat, lng, raio_metros")
    .eq("ativo", true)
    .order("nome");
  if (error) throw dbError(error);
  return data ?? [];
});

export const listAcademiasAdminFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  const { data, error } = await supabaseAdmin.from("academias").select("*").order("nome");
  if (error) throw dbError(error);
  return data ?? [];
});

export const createAcademiaFn = createServerFn({ method: "POST" })
  .inputValidator((input) => AcademiaSchema.parse(input))
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await supabaseAdmin.from("academias").insert({
      nome: data.nome,
      endereco: data.endereco ?? null,
      lat: data.lat,
      lng: data.lng,
      raio_metros: data.raio_metros ?? 150,
      ativo: data.ativo ?? true,
    });
    if (error) throw dbError(error);
    return { ok: true };
  });

export const updateAcademiaFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({ id: z.string().uuid(), patch: AcademiaSchema.partial() }).parse(input),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await supabaseAdmin
      .from("academias")
      .update(data.patch as any)
      .eq("id", data.id);
    if (error) throw dbError(error);
    return { ok: true };
  });

export const deleteAcademiaFn = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await supabaseAdmin.from("academias").delete().eq("id", data.id);
    if (error) throw dbError(error);
    return { ok: true };
  });

/** Helper compartilhado: distância em metros entre dois pontos (Haversine). */
export function haversineMeters(
  lat1: number, lng1: number, lat2: number, lng2: number,
): number {
  const R = 6371000;
  const toRad = (v: number) => (v * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}