
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

UPDATE public.admin_credentials
SET password = extensions.crypt(password, extensions.gen_salt('bf'))
WHERE id = 1
  AND password IS NOT NULL
  AND password !~ '^\$2[aby]\$';

CREATE OR REPLACE FUNCTION public.verify_admin_login(_username text, _password text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, extensions
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_credentials
    WHERE id = 1
      AND username = _username
      AND password = extensions.crypt(_password, password)
  );
$$;

REVOKE ALL ON FUNCTION public.verify_admin_login(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_admin_login(text, text) TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.get_admin_whatsapp()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT whatsapp FROM public.admin_credentials WHERE id = 1;
$$;

REVOKE ALL ON FUNCTION public.get_admin_whatsapp() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_admin_whatsapp() TO anon, authenticated, service_role;

DROP POLICY IF EXISTS "public access" ON public.admin_credentials;
DROP POLICY IF EXISTS "public access" ON public.pagamentos;
DROP POLICY IF EXISTS "public access" ON public.financeiro_lancamentos;
DROP POLICY IF EXISTS "public access" ON public.despesas_recorrentes;

ALTER TABLE public.admin_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pagamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financeiro_lancamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.despesas_recorrentes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "deny all" ON public.admin_credentials FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "deny all" ON public.pagamentos FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "deny all" ON public.financeiro_lancamentos FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "deny all" ON public.despesas_recorrentes FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
