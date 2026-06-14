## Próximos passos

Você já fez:
- Rodou `schema-completo.sql` no seu Supabase
- Criou o bucket `treino-pdfs`
- Me passou as 3 chaves (`MY_SUPABASE_URL`, `MY_SUPABASE_ANON_KEY`, `MY_SUPABASE_SERVICE_ROLE_KEY`) e o `MY_STRIPE_WEBHOOK_SECRET`

### O que eu faço quando você aprovar (modo build)

1. **Trocar as secrets do Cloud** pra apontar pro SEU Supabase:
   - `SUPABASE_URL` ← valor de `MY_SUPABASE_URL`
   - `SUPABASE_PUBLISHABLE_KEY` ← valor de `MY_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` ← valor de `MY_SUPABASE_SERVICE_ROLE_KEY`
   - `PAYMENTS_SANDBOX_WEBHOOK_SECRET` ← valor de `MY_STRIPE_WEBHOOK_SECRET`
   - Também atualizar `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` (build-time) via formulário de secrets

2. **Gerar `.env.local.example`** na raiz do projeto com todas as variáveis necessárias pra rodar local (você copia pra `.env.local` e preenche)

3. **Confirmar `src/integrations/supabase/client.ts`** — não precisa mudar código, ele já lê de env. Só garantir que está consistente.

4. **Te entregar instruções finais** de como rodar local: `bun install` + `bun dev`, e como configurar o webhook do Stripe no Dashboard apontando pra `https://acessoriaatlantida.lovable.app/api/public/payments/webhook?env=sandbox`

### Importante saber antes
- Depois que eu trocar as secrets, o app preview/published vai começar a usar SEU Supabase imediatamente. Sem rollback automático.
- Como você não importou os CSVs do banco antigo (passo 3/4 que você pulou), **todos os dados do Cloud antigo ficam pra trás** — alunos, pagamentos, histórico, tudo. Você começa do zero no seu Supabase, só com o que o schema cria (admin default, etc).
- Se você quiser manter os dados antigos, precisa exportar do Cloud e importar antes de eu trocar as envs. Me avise se for o caso.

**Confirma se pode trocar mesmo começando do zero?** Se sim, aprova o plano que eu executo.
