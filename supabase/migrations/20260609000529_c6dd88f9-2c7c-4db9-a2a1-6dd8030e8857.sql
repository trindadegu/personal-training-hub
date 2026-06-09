-- Deny all direct access to the private treino-pdfs bucket for anon/authenticated.
-- The app uses the service role (which bypasses RLS) for uploads and signed URLs.
DROP POLICY IF EXISTS "treino_pdfs_deny_anon_authenticated_select" ON storage.objects;
DROP POLICY IF EXISTS "treino_pdfs_deny_anon_authenticated_insert" ON storage.objects;
DROP POLICY IF EXISTS "treino_pdfs_deny_anon_authenticated_update" ON storage.objects;
DROP POLICY IF EXISTS "treino_pdfs_deny_anon_authenticated_delete" ON storage.objects;

CREATE POLICY "treino_pdfs_deny_anon_authenticated_select"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id <> 'treino-pdfs');

CREATE POLICY "treino_pdfs_deny_anon_authenticated_insert"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id <> 'treino-pdfs');

CREATE POLICY "treino_pdfs_deny_anon_authenticated_update"
ON storage.objects FOR UPDATE TO anon, authenticated
USING (bucket_id <> 'treino-pdfs')
WITH CHECK (bucket_id <> 'treino-pdfs');

CREATE POLICY "treino_pdfs_deny_anon_authenticated_delete"
ON storage.objects FOR DELETE TO anon, authenticated
USING (bucket_id <> 'treino-pdfs');