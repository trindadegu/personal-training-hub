import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { getAdminSession, requireAdminSession } from "@/lib/admin-auth.server";

export const loginAdminFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({
      username: z.string().min(1).max(120),
      password: z.string().min(1).max(200),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    const { data: ok, error } = await supabaseAdmin.rpc("verify_admin_login", {
      _username: data.username,
      _password: data.password,
    });
    if (error) throw new Error(error.message);
    if (!ok) return { ok: false as const };
    const session = await getAdminSession();
    await session.update({ username: data.username, loggedInAt: Date.now() });
    return { ok: true as const };
  });

export const logoutAdminFn = createServerFn({ method: "POST" }).handler(async () => {
  const session = await getAdminSession();
  await session.clear();
  return { ok: true };
});

export const getAdminMeFn = createServerFn({ method: "GET" }).handler(async () => {
  const session = await getAdminSession();
  return { username: session.data?.username ?? null };
});

export const getAdminConfigFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  const { data, error } = await supabaseAdmin
    .from("admin_credentials")
    .select("username, whatsapp")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
});

export const updateAdminConfigFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({
      username: z.string().min(1).max(120),
      password: z.string().max(200).optional(),
      whatsapp: z.string().max(40),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { error } = await supabaseAdmin
      .from("admin_credentials")
      .update({
        username: data.username,
        whatsapp: data.whatsapp,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);
    if (error) throw new Error(error.message);
    if (data.password && data.password.length > 0) {
      const { error: pwErr } = await supabaseAdmin.rpc("set_admin_password", {
        _password: data.password,
      });
      if (pwErr) throw new Error(pwErr.message);
    }
    return { ok: true };
  });

export const getAdminWhatsappPublicFn = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin.rpc("get_admin_whatsapp");
  if (error) throw new Error(error.message);
  return (data as string | null) ?? null;
});