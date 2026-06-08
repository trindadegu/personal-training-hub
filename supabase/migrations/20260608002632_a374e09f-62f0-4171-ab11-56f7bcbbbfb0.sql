
ALTER TABLE public.alunos ADD COLUMN IF NOT EXISTS foto_url text;

ALTER TABLE public.checkins ADD COLUMN IF NOT EXISTS inicio_at timestamptz;
ALTER TABLE public.checkins ADD COLUMN IF NOT EXISTS fim_at timestamptz;
ALTER TABLE public.checkins ADD COLUMN IF NOT EXISTS duracao_segundos integer;

CREATE TABLE IF NOT EXISTS public.treino_pdfs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id text NOT NULL,
  nome text NOT NULL,
  descricao text,
  storage_path text NOT NULL,
  tamanho_bytes bigint NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.treino_pdfs TO authenticated;
GRANT SELECT ON public.treino_pdfs TO anon;
GRANT ALL ON public.treino_pdfs TO service_role;

ALTER TABLE public.treino_pdfs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "treino_pdfs_service_role_all" ON public.treino_pdfs
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS treino_pdfs_aluno_idx ON public.treino_pdfs(aluno_id);
