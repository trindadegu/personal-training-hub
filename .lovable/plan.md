## Plano: migrar pra seu Supabase + Stripe teste + rodar local

### Ordem de execução (importante seguir nessa ordem)

### 1. Backup do banco atual (Cloud)
Antes de qualquer coisa, garantir backup:
- **View Backend → Database → Tables**
- Pra cada tabela: `academias`, `admin_credentials`, `aluno_notas`, `alunos`, `checkins`, `configuracoes`, `despesas_recorrentes`, `financeiro_lancamentos`, `pagamentos`, `planos`, `progresso`, `treino_historico`, `treino_pdfs`, `treinos`, `treinos_padroes` → botão **Export → CSV**
- Guardar a pasta com todos os CSVs

### 2. Aplicar schema no seu Supabase próprio
- Você me confirma quando criou o projeto novo em supabase.com
- Eu peço via formulário seguro 3 secrets temporárias (só pra eu rodar a migration de schema no seu projeto novo):
  - `MY_SUPABASE_URL` (https://xxx.supabase.co)
  - `MY_SUPABASE_ANON_KEY`
  - `MY_SUPABASE_SERVICE_ROLE_KEY`
- Eu gero um SQL único consolidando todas as migrations atuais (tabelas + RLS + GRANTs + funções: `set_admin_password`, `verify_admin_login`, `get_admin_whatsapp`, `set_updated_at` + bucket `treino-pdfs`)
- Você roda esse SQL no **SQL Editor** do seu Supabase (eu te entrego o arquivo .sql pronto pra copiar/colar)
- Você cria o bucket de storage `treino-pdfs` (privado) em Storage → New bucket

### 3. Importar os CSVs no seu Supabase
- No Supabase Dashboard: Table Editor → cada tabela → **Insert → Import data from CSV**
- Ordem importa por causa das FKs: `academias` → `planos` → `alunos` → resto
- O `admin_credentials` provavelmente vai precisar do seu admin atual; te oriento

### 4. Trocar as envs do projeto pra apontar pro seu Supabase
- Atualizar no Lovable Cloud as secrets:
  - `SUPABASE_URL` → seu URL
  - `SUPABASE_PUBLISHABLE_KEY` → sua anon key
  - `SUPABASE_SERVICE_ROLE_KEY` → seu service role
  - `VITE_SUPABASE_URL` → seu URL
  - `VITE_SUPABASE_PUBLISHABLE_KEY` → sua anon key
- Atenção: o `src/integrations/supabase/client.ts` e `types.ts` são gerados pelo Cloud. Vou ter que ajustar `client.ts` manualmente pra não quebrar (deixar idêntico mas apontando pras envs novas — sem regeneração automática).

### 5. Reativar Stripe em modo teste
Você já tem `STRIPE_SANDBOX_API_KEY` e `PAYMENTS_SANDBOX_WEBHOOK_SECRET` salvos no Cloud. Se forem chaves novas, eu peço pra atualizar via formulário seguro.
- Webhook URL pro Stripe Dashboard (Test mode → Developers → Webhooks → Add endpoint):
  - `https://acessoriaatlantida.lovable.app/api/public/payments/webhook?env=sandbox`
  - Evento: `checkout.session.completed`
  - Copia o signing secret (`whsec_...`) e me passa
- Confirmar que `.env.development` tem `VITE_PAYMENTS_CLIENT_TOKEN=pk_test_...` (chave pública de teste)

### 6. Rodar local (VSCode) sem erro de "permission denied"
Te entrego um `.env.local` modelo com todas as variáveis. Você só preenche os valores. Vai conter:
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_PAYMENTS_CLIENT_TOKEN=pk_test_...
SUPABASE_URL=...
SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...   # ← essa é a chave que resolve "permission denied"
LOVABLE_API_KEY=...             # pega no painel Lovable
STRIPE_SANDBOX_API_KEY=sk_test_...
PAYMENTS_SANDBOX_WEBHOOK_SECRET=whsec_...
SESSION_SECRET=<gerar string aleatória>
```
**Por que o erro acontecia:** o app usa o cliente admin (service role) pra contornar RLS. Sem `SUPABASE_SERVICE_ROLE_KEY` no .env, as queries caem no cliente público que não tem GRANTs → "permission denied for table alunos". Com o service role no .env (que só existe na sua conta Supabase), o erro some.

Comandos pra rodar local:
```
bun install
bun dev
```

### 7. Publicar e testar
- Botão **Publish** no canto superior direito
- Testar com cartão `4242 4242 4242 4242`, validade `12/30`, CVC `123`
- Fatura deve marcar como paga em ~2s via webhook

### O que eu vou fazer no modo build
1. Pedir as 3 secrets temporárias do seu Supabase via formulário
2. Gerar arquivo .sql consolidado com todo o schema atual pra você rodar no SQL Editor
3. Gerar arquivo `.env.local.example` na raiz do projeto
4. Substituir as envs do Cloud apontando pro seu Supabase novo (após confirmação que os dados foram importados)
5. Ajustar `src/integrations/supabase/client.ts` se necessário
6. Atualizar webhook secret do Stripe quando você me passar o novo `whsec_`

### Riscos a saber
- **Não tem rollback automático** — depois que trocar as envs pro seu Supabase, o app só funciona se os dados estiverem importados
- **Cloud continua "conectado"** ao projeto Lovable mesmo apontando pra outro Supabase; é só um app usando outras credenciais
- **Auth Users**: usuários do `auth.users` do Cloud antigo não migram (admin_credentials é tabela própria então OK, mas se houver qualquer login Supabase Auth, perde)
- **Storage**: arquivos do bucket `treino-pdfs` precisam ser baixados/reuploaded manualmente se houver PDFs salvos
