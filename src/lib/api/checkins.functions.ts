import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdminSession } from "@/lib/admin-auth.server";

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
    const { data: row, error } = await supabaseAdmin
      .from("checkins")
      .insert(data)
      .select()
      .single();
    if (error) throw new Error(error.message);
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
    if (error) throw new Error(error.message);
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
    if (error) throw new Error(error.message);
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
    if (error) throw new Error(error.message);
    return row;
  });