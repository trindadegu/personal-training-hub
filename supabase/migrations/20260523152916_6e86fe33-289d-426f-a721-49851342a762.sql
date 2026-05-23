-- alunos: deny direct access, expose only id+nome via a public view
DROP POLICY IF EXISTS "public access" ON public.alunos;
CREATE POLICY "deny all" ON public.alunos
  FOR ALL TO anon, authenticated
  USING (false) WITH CHECK (false);

CREATE OR REPLACE VIEW public.alunos_public AS
  SELECT id, nome FROM public.alunos;
GRANT SELECT ON public.alunos_public TO anon, authenticated;

-- aluno_notas: deny all direct access (admin-only via server)
DROP POLICY IF EXISTS "public access" ON public.aluno_notas;
CREATE POLICY "deny all" ON public.aluno_notas
  FOR ALL TO anon, authenticated
  USING (false) WITH CHECK (false);

-- checkins: allow anonymous INSERT only, no SELECT/UPDATE/DELETE
DROP POLICY IF EXISTS "public access" ON public.checkins;
CREATE POLICY "anon insert checkins" ON public.checkins
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);
