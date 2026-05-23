import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdminSession } from "@/lib/admin-auth.server";

const escopoSchema = z.enum(["negocio", "pessoal"]);
const tipoSchema = z.enum(["receita", "despesa"]);

export const listLancamentosFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({
      escopo: escopoSchema.optional(),
      from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    }).parse(input ?? {}),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    let q = supabaseAdmin
      .from("financeiro_lancamentos")
      .select("*")
      .order("data", { ascending: false });
    if (data.escopo) q = q.eq("escopo", data.escopo);
    if (data.from) q = q.gte("data", data.from);
    if (data.to) q = q.lte("data", data.to);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const addLancamentoFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({
      escopo: escopoSchema,
      tipo: tipoSchema,
      categoria: z.string().max(80).nullable().optional(),
      descricao: z.string().min(1).max(200),
      valor: z.number().min(0).max(10_000_000),
      data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      recorrente: z.boolean().optional(),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await supabaseAdmin.from("financeiro_lancamentos").insert({
      escopo: data.escopo,
      tipo: data.tipo,
      categoria: data.categoria ?? null,
      descricao: data.descricao,
      valor: data.valor,
      data: data.data,
      recorrente: data.recorrente ?? false,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteLancamentoFn = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await supabaseAdmin
      .from("financeiro_lancamentos")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listRecorrentesFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({ escopo: escopoSchema.optional() }).parse(input ?? {}),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    let q = supabaseAdmin.from("despesas_recorrentes").select("*").order("dia");
    if (data.escopo) q = q.eq("escopo", data.escopo);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const addRecorrenteFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({
      escopo: escopoSchema,
      descricao: z.string().min(1).max(200),
      categoria: z.string().max(80).nullable().optional(),
      valor: z.number().min(0).max(10_000_000),
      dia: z.number().int().min(1).max(28),
      ativo: z.boolean().optional(),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await supabaseAdmin.from("despesas_recorrentes").insert({
      escopo: data.escopo,
      descricao: data.descricao,
      categoria: data.categoria ?? null,
      valor: data.valor,
      dia: data.dia,
      ativo: data.ativo ?? true,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteRecorrenteFn = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await supabaseAdmin
      .from("despesas_recorrentes")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const gerarRecorrentesDoMesFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({ mes: z.string().regex(/^\d{4}-\d{2}$/) }).parse(input),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { data: recs, error: e1 } = await supabaseAdmin
      .from("despesas_recorrentes")
      .select("*")
      .order("dia");
    if (e1) throw new Error(e1.message);
    const [y, m] = data.mes.split("-").map(Number);
    let criados = 0;
    for (const r of recs ?? []) {
      if (!r.ativo) continue;
      if (r.ultimo_gerado_mes === data.mes) continue;
      const dia = Math.min(Math.max(r.dia, 1), 28);
      const dataStr = `${y}-${String(m).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
      const { error } = await supabaseAdmin.from("financeiro_lancamentos").insert({
        escopo: r.escopo,
        tipo: "despesa",
        categoria: r.categoria,
        descricao: r.descricao,
        valor: r.valor,
        data: dataStr,
        recorrente: true,
        recorrente_id: r.id,
      });
      if (!error) {
        await supabaseAdmin
          .from("despesas_recorrentes")
          .update({ ultimo_gerado_mes: data.mes })
          .eq("id", r.id);
        criados++;
      }
    }
    return { criados };
  });