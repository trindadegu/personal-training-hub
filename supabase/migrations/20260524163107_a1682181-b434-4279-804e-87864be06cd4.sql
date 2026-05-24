
CREATE POLICY "deny all" ON public.checkins
  AS PERMISSIVE FOR ALL TO anon, authenticated
  USING (false) WITH CHECK (false);
