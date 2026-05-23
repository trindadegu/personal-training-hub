
CREATE OR REPLACE FUNCTION public.set_admin_password(_password text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
  UPDATE public.admin_credentials
  SET password = extensions.crypt(_password, extensions.gen_salt('bf')),
      updated_at = now()
  WHERE id = 1;
$$;

REVOKE ALL ON FUNCTION public.set_admin_password(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.set_admin_password(text) TO service_role;
