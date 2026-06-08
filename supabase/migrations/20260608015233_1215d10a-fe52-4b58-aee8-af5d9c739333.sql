ALTER TABLE public.pagamentos
  ADD COLUMN IF NOT EXISTS stripe_session_id text,
  ADD COLUMN IF NOT EXISTS pago_via text;

CREATE UNIQUE INDEX IF NOT EXISTS pagamentos_stripe_session_id_key
  ON public.pagamentos (stripe_session_id)
  WHERE stripe_session_id IS NOT NULL;