
-- ============ PLANOS ============
CREATE TABLE public.planos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  descricao text,
  preco_mensal numeric(10,2) NOT NULL DEFAULT 0 CHECK (preco_mensal >= 0),
  beneficios jsonb NOT NULL DEFAULT '[]'::jsonb,
  ordem integer NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  stripe_price_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.planos TO authenticated;
GRANT ALL ON public.planos TO service_role;
ALTER TABLE public.planos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "deny all" ON public.planos TO anon, authenticated USING (false) WITH CHECK (false);

-- ============ ACADEMIAS ============
CREATE TABLE public.academias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  endereco text,
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  raio_metros integer NOT NULL DEFAULT 150 CHECK (raio_metros > 0 AND raio_metros <= 5000),
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.academias TO authenticated;
GRANT ALL ON public.academias TO service_role;
ALTER TABLE public.academias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "deny all" ON public.academias TO anon, authenticated USING (false) WITH CHECK (false);

-- ============ ALUNOS — colunas novas ============
ALTER TABLE public.alunos
  ADD COLUMN IF NOT EXISTS plano_id uuid REFERENCES public.planos(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS meta_frequencia_semanal integer NOT NULL DEFAULT 4 CHECK (meta_frequencia_semanal >= 0 AND meta_frequencia_semanal <= 7),
  ADD COLUMN IF NOT EXISTS meta_frequencia_mensal integer NOT NULL DEFAULT 16 CHECK (meta_frequencia_mensal >= 0 AND meta_frequencia_mensal <= 31),
  ADD COLUMN IF NOT EXISTS stripe_customer_id text;

-- ============ PAGAMENTOS — colunas novas ============
ALTER TABLE public.pagamentos
  ADD COLUMN IF NOT EXISTS stripe_session_id text,
  ADD COLUMN IF NOT EXISTS stripe_payment_intent_id text;

-- ============ TRIGGER updated_at ============
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

CREATE TRIGGER planos_updated_at BEFORE UPDATE ON public.planos
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER academias_updated_at BEFORE UPDATE ON public.academias
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ SEEDS DE PLANOS ============
INSERT INTO public.planos (nome, descricao, preco_mensal, beneficios, ordem) VALUES
('Treino', 'Ficha semanal personalizada e acompanhamento básico.', 80.00,
  '["Ficha de treino semanal personalizada", "Check-in com GPS na academia", "Histórico mensal de treinos", "Vídeos de execução dos exercícios"]'::jsonb, 1),
('Treino + Acompanhamento', 'Tudo do plano Treino com revisões frequentes e suporte direto.', 150.00,
  '["Tudo do plano Treino", "Revisão da ficha a cada 15 dias", "Ajustes conforme evolução", "Suporte por WhatsApp em horário comercial", "Relatório de progresso mensal"]'::jsonb, 2),
('Treino + Acompanhamento + Nutri', 'Plano completo: treino, acompanhamento próximo e plano alimentar.', 220.00,
  '["Tudo do plano Acompanhamento", "Plano alimentar mensal personalizado", "Avaliação nutricional inicial", "Reavaliação a cada 30 dias", "Lista de substituições alimentares", "Suporte nutricional por WhatsApp"]'::jsonb, 3);
