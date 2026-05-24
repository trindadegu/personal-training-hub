
-- 1. Replace public-access policies with deny-all on sensitive tables
DROP POLICY IF EXISTS "public access" ON public.progresso;
DROP POLICY IF EXISTS "public access" ON public.treino_historico;
DROP POLICY IF EXISTS "public access" ON public.treinos;
DROP POLICY IF EXISTS "public access" ON public.treinos_padroes;
DROP POLICY IF EXISTS "public access" ON public.configuracoes;

ALTER TABLE public.progresso ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treino_historico ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treinos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treinos_padroes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configuracoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "deny all" ON public.progresso
  AS PERMISSIVE FOR ALL TO anon, authenticated
  USING (false) WITH CHECK (false);

CREATE POLICY "deny all" ON public.treino_historico
  AS PERMISSIVE FOR ALL TO anon, authenticated
  USING (false) WITH CHECK (false);

CREATE POLICY "deny all" ON public.treinos
  AS PERMISSIVE FOR ALL TO anon, authenticated
  USING (false) WITH CHECK (false);

CREATE POLICY "deny all" ON public.treinos_padroes
  AS PERMISSIVE FOR ALL TO anon, authenticated
  USING (false) WITH CHECK (false);

CREATE POLICY "deny all" ON public.configuracoes
  AS PERMISSIVE FOR ALL TO anon, authenticated
  USING (false) WITH CHECK (false);

-- 2. Remove anon insert on checkins; goes through validated server fn now
DROP POLICY IF EXISTS "anon insert checkins" ON public.checkins;

-- 3. Drop the SECURITY DEFINER view flagged by the linter
DROP VIEW IF EXISTS public.alunos_public;

-- 4. Restrict execution of admin SECURITY DEFINER functions to service role only
REVOKE EXECUTE ON FUNCTION public.verify_admin_login(text, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_admin_whatsapp() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_admin_password(text) FROM PUBLIC, anon, authenticated;
