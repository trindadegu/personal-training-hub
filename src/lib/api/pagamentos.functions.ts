import { dbError } from "@/lib/api/_errors";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdminSession } from "@/lib/admin-auth.server";

export const listPagamentosFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({
      alunoId: z.string().max(120).optional(),
      mes: z.string().regex(/^\d{4}-\d{2}$/).optional(),
    }).parse(input ?? {}),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    let q = supabaseAdmin.from("pagamentos").select("*").order("vencimento", { ascending: false });
    if (data.alunoId) q = q.eq("aluno_id", data.alunoId);
    if (data.mes) q = q.eq("mes_referencia", data.mes);
    const { data: rows, error } = await q;
    if (error) throw dbError(error);
    return rows ?? [];
  });

export const upsertPagamentoFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({
      aluno_id: z.string().min(1).max(120),
      mes_referencia: z.string().regex(/^\d{4}-\d{2}$/),
      valor: z.number().min(0).max(1_000_000),
      vencimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      status: z.string().max(20).optional(),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await supabaseAdmin
      .from("pagamentos")
      .upsert(data, { onConflict: "aluno_id,mes_referencia" });
    if (error) throw dbError(error);
    return { ok: true };
  });

export const marcarPagoFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({
      id: z.string().uuid(),
      alunoId: z.string().min(1).max(120),
      valor: z.number().min(0).max(1_000_000),
      mes: z.string().regex(/^\d{4}-\d{2}$/),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const today = new Date().toISOString().slice(0, 10);
    const { error } = await supabaseAdmin
      .from("pagamentos")
      .update({ status: "pago", pago_em: today, pago_via: "manual" })
      .eq("id", data.id);
    if (error) throw dbError(error);
    // Idempotente: não cria lançamento se já existir um vinculado a esta fatura
    // (evita duplicidade quando o webhook do Stripe também marca pago).
    const { data: existing } = await supabaseAdmin
      .from("financeiro_lancamentos")
      .select("id")
      .eq("pagamento_id", data.id)
      .limit(1);
    if (existing && existing.length > 0) return { ok: true };
    const { error: e2 } = await supabaseAdmin.from("financeiro_lancamentos").insert({
      escopo: "negocio",
      tipo: "receita",
      categoria: "Mensalidade",
      descricao: `Mensalidade ${data.mes}`,
      valor: data.valor,
      data: today,
      aluno_id: data.alunoId,
      pagamento_id: data.id,
    });
    if (e2) throw new Error(e2.message);
    return { ok: true };
  });

export const marcarPendenteFn = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await supabaseAdmin
      .from("pagamentos")
      .update({ status: "pendente", pago_em: null })
      .eq("id", data.id);
    if (error) throw dbError(error);
    await supabaseAdmin.from("financeiro_lancamentos").delete().eq("pagamento_id", data.id);
    return { ok: true };
  });

export const gerarMensalidadesDoMesFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({ mes: z.string().regex(/^\d{4}-\d{2}$/) }).parse(input),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { data: alunos, error: e1 } = await supabaseAdmin
      .from("alunos")
      .select("id, valor_mensalidade, dia_vencimento, status");
    if (e1) throw new Error(e1.message);

    const [y, m] = data.mes.split("-").map(Number);
    let criados = 0;
    for (const a of alunos ?? []) {
      if (a.status && a.status !== "ativo") continue;
      const valor = Number(a.valor_mensalidade ?? 0);
      if (!valor) continue;
      const dia = Math.min(Math.max(Number(a.dia_vencimento ?? 5), 1), 28);
      const venc = `${y}-${String(m).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
      const { data: existing } = await supabaseAdmin
        .from("pagamentos")
        .select("id")
        .eq("aluno_id", a.id)
        .eq("mes_referencia", data.mes)
        .maybeSingle();
      if (existing) continue;
      const { error } = await supabaseAdmin.from("pagamentos").insert({
        aluno_id: a.id,
        mes_referencia: data.mes,
        valor,
        vencimento: venc,
        status: "pendente",
      });
      if (!error) criados++;
    }
    return { criados };
  });