
-- Aluno: campos para prontuário e cobrança
ALTER TABLE public.alunos
  ADD COLUMN IF NOT EXISTS valor_mensalidade numeric(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS dia_vencimento integer DEFAULT 5,
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'ativo',
  ADD COLUMN IF NOT EXISTS objetivo text,
  ADD COLUMN IF NOT EXISTS observacoes text,
  ADD COLUMN IF NOT EXISTS data_inicio date DEFAULT CURRENT_DATE;

-- Notas / caderno de anotações
CREATE TABLE IF NOT EXISTS public.aluno_notas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id text NOT NULL,
  data date NOT NULL DEFAULT CURRENT_DATE,
  titulo text NOT NULL,
  conteudo text NOT NULL,
  tipo text NOT NULL DEFAULT 'evolucao',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.aluno_notas ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public access" ON public.aluno_notas;
CREATE POLICY "public access" ON public.aluno_notas FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_aluno_notas_aluno ON public.aluno_notas(aluno_id, data DESC);

-- Pagamentos / mensalidades
CREATE TABLE IF NOT EXISTS public.pagamentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id text NOT NULL,
  mes_referencia text NOT NULL,
  valor numeric(10,2) NOT NULL DEFAULT 0,
  vencimento date NOT NULL,
  status text NOT NULL DEFAULT 'pendente',
  pago_em date,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (aluno_id, mes_referencia)
);
ALTER TABLE public.pagamentos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public access" ON public.pagamentos;
CREATE POLICY "public access" ON public.pagamentos FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_pagamentos_status ON public.pagamentos(status, vencimento);

-- Financeiro (receitas e despesas)
CREATE TABLE IF NOT EXISTS public.financeiro_lancamentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  escopo text NOT NULL DEFAULT 'negocio',
  tipo text NOT NULL,
  categoria text,
  descricao text NOT NULL,
  valor numeric(10,2) NOT NULL,
  data date NOT NULL DEFAULT CURRENT_DATE,
  recorrente boolean NOT NULL DEFAULT false,
  recorrente_id uuid,
  aluno_id text,
  pagamento_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.financeiro_lancamentos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public access" ON public.financeiro_lancamentos;
CREATE POLICY "public access" ON public.financeiro_lancamentos FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_fin_data ON public.financeiro_lancamentos(escopo, data DESC);

-- Despesas recorrentes
CREATE TABLE IF NOT EXISTS public.despesas_recorrentes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  escopo text NOT NULL DEFAULT 'negocio',
  descricao text NOT NULL,
  categoria text,
  valor numeric(10,2) NOT NULL,
  dia integer NOT NULL DEFAULT 1,
  ativo boolean NOT NULL DEFAULT true,
  ultimo_gerado_mes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.despesas_recorrentes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public access" ON public.despesas_recorrentes;
CREATE POLICY "public access" ON public.despesas_recorrentes FOR ALL USING (true) WITH CHECK (true);

-- Configurações (chave/valor)
CREATE TABLE IF NOT EXISTS public.configuracoes (
  chave text PRIMARY KEY,
  valor text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.configuracoes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public access" ON public.configuracoes;
CREATE POLICY "public access" ON public.configuracoes FOR ALL USING (true) WITH CHECK (true);

INSERT INTO public.configuracoes (chave, valor) VALUES
  ('mensagem_cobranca', 'Olá {nome}! Passando para lembrar da mensalidade de {mes} no valor de R$ {valor}, vencimento {vencimento}. Qualquer dúvida estou à disposição!')
ON CONFLICT (chave) DO NOTHING;
