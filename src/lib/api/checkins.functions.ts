import { dbError } from "@/lib/api/_errors";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdminSession } from "@/lib/admin-auth.server";
import { requireStudentSessionFor } from "@/lib/student-auth.server";
import { haversineMeters } from "@/lib/api/academias.functions";

const CheckinSchema = z.object({
  aluno_id: z.string().min(1).max(120),
  aluno_nome: z.string().min(1).max(200),
  gym_name: z.string().min(1).max(300),
  gym_address: z.string().max(500).optional().nullable(),
  distance_m: z.number().int().min(0).max(1_000_000),
  lat_aluno: z.number().min(-90).max(90),
  lng_aluno: z.number().min(-180).max(180),
  lat_gym: z.number().min(-90).max(90),
  lng_gym: z.number().min(-180).max(180),
});

/** Public: students register their own check-in. Aluno existence is validated server-side. */
export const createCheckinFn = createServerFn({ method: "POST" })
  .inputValidator((input) => CheckinSchema.parse(input))
  .handler(async ({ data }) => {
    await requireStudentSessionFor(data.aluno_id);
    const { data: aluno } = await supabaseAdmin
      .from("alunos")
      .select("id, nome")
      .eq("id", data.aluno_id)
      .maybeSingle();
    if (!aluno) throw new Error("Aluno não encontrado");
    if (aluno.nome !== data.aluno_nome) {
      // Trust DB name, prevent spoofing
      data = { ...data, aluno_nome: aluno.nome };
    }

    // Anti-fraude: validar que o aluno está MESMO dentro do raio de uma
    // academia parceira cadastrada. Se nenhuma academia tiver sido cadastrada
    // ainda, permite (modo "abertura"). Quando houver academias, exige que o
    // GPS esteja dentro do raio configurado.
    const { data: academias, error: eAc } = await supabaseAdmin
      .from("academias")
      .select("id, nome, lat, lng, raio_metros, ativo")
      .eq("ativo", true);
    if (eAc) throw dbError(eAc);
    if (academias && academias.length > 0) {
      let dentro = false;
      for (const ac of academias) {
        const dist = haversineMeters(data.lat_aluno, data.lng_aluno, ac.lat, ac.lng);
        if (dist <= ac.raio_metros) {
          dentro = true;
          break;
        }
      }
      if (!dentro) {
        throw new Error(
          "Você precisa estar dentro do raio de uma academia parceira para fazer check-in.",
        );
      }
    }

    // 1 check-in por dia
    const startDay = new Date();
    startDay.setHours(0, 0, 0, 0);
    const { data: jaHoje } = await supabaseAdmin
      .from("checkins")
      .select("id")
      .eq("aluno_id", data.aluno_id)
      .gte("created_at", startDay.toISOString())
      .limit(1);
    if (jaHoje && jaHoje.length > 0) {
      throw new Error("Você já fez check-in hoje.");
    }

    const { data: row, error } = await supabaseAdmin
      .from("checkins")
      .insert(data)
      .select()
      .single();
    if (error) throw dbError(error);
    return row;
  });

/** Admin: list every check-in (full data, including GPS). */
export const listCheckinsAdminFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({ alunoId: z.string().min(1).max(120).optional() }).parse(input),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    let q = supabaseAdmin
      .from("checkins")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (data.alunoId) q = q.eq("aluno_id", data.alunoId);
    const { data: rows, error } = await q;
    if (error) throw dbError(error);
    return rows ?? [];
  });

/** Public-ish: a student fetches their own latest check-in (no GPS returned). */
export const lastCheckinForStudentFn = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ alunoId: z.string().min(1).max(120) }).parse(input))
  .handler(async ({ data }) => {
    const { data: row, error } = await supabaseAdmin
      .from("checkins")
      .select("id, aluno_id, aluno_nome, gym_name, gym_address, distance_m, created_at")
      .eq("aluno_id", data.alunoId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw dbError(error);
    return row;
  });

export const checkinTodayFn = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ alunoId: z.string().min(1).max(120) }).parse(input))
  .handler(async ({ data }) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const { data: row, error } = await supabaseAdmin
      .from("checkins")
      .select("id, aluno_id, aluno_nome, gym_name, gym_address, distance_m, created_at")
      .eq("aluno_id", data.alunoId)
      .gte("created_at", start.toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw dbError(error);
    return row;
  });