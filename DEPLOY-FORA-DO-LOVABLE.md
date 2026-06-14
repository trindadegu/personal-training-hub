# Rodar local + Deploy fora do Lovable

Guia pra rodar 100% no SEU Supabase, com Stripe teste funcionando.

## 1. Rodar local (VSCode)

```bash
cp .env.local.example .env.local
# preenche .env.local com os valores do SEU Supabase + Stripe
bun install
bun dev
```

Abre em `http://localhost:5173`. O `dotenv` carrega o `.env.local` automaticamente (já configurado em `vite.config.ts`).

### Valores que você precisa

| Variável | Onde pegar |
|---|---|
| `VITE_SUPABASE_URL` / `SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` / `SUPABASE_PUBLISHABLE_KEY` | Supabase → Settings → API → `anon` `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → `service_role` key (⚠️ secreta) |
| `VITE_PAYMENTS_CLIENT_TOKEN` | Stripe → Developers → API keys → `pk_test_...` |
| `STRIPE_SANDBOX_API_KEY` | Stripe → Developers → API keys → `sk_test_...` |
| `PAYMENTS_SANDBOX_WEBHOOK_SECRET` | Stripe → Developers → Webhooks → seu endpoint → Signing secret (`whsec_...`) |
| `SESSION_SECRET` | gerar com `openssl rand -hex 32` |
| `LOVABLE_API_KEY` | **DEIXE VAZIO** — só usado dentro do Lovable |

### Testar Stripe localmente

Pra receber webhooks do Stripe rodando local, use o Stripe CLI:

```bash
stripe listen --forward-to localhost:5173/api/public/payments/webhook?env=sandbox
```

O CLI te dá um `whsec_...` temporário — cola no `PAYMENTS_SANDBOX_WEBHOOK_SECRET` enquanto testa local.

Cartão de teste: `4242 4242 4242 4242`, validade `12/30`, CVC `123`.

## 2. Deploy em Cloudflare Workers (recomendado)

O projeto já tem `wrangler.jsonc` configurado pra Workers.

```bash
# instalar wrangler
bun add -D wrangler

# login
bunx wrangler login

# build
bun run build

# configurar as secrets em produção
bunx wrangler secret put SUPABASE_URL
bunx wrangler secret put SUPABASE_PUBLISHABLE_KEY
bunx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
bunx wrangler secret put STRIPE_SANDBOX_API_KEY
bunx wrangler secret put PAYMENTS_SANDBOX_WEBHOOK_SECRET
bunx wrangler secret put SESSION_SECRET

# variáveis VITE_* viram bundle no build, então precisam estar no .env.local
# antes de rodar `bun run build`

# deploy
bunx wrangler deploy
```

Você vai ganhar uma URL `https://tanstack-start-app.SEU-USUARIO.workers.dev`.

### Webhook em produção

Depois do deploy, no Stripe Dashboard → Developers → Webhooks → Add endpoint:
- URL: `https://SEU-DOMINIO.workers.dev/api/public/payments/webhook?env=sandbox`
- Evento: `checkout.session.completed`
- Copia o novo `whsec_...` e atualiza com `bunx wrangler secret put PAYMENTS_SANDBOX_WEBHOOK_SECRET`

### Domínio próprio

Cloudflare → Workers & Pages → seu worker → Settings → Triggers → Add Custom Domain.

## 3. Alternativa: Vercel / Netlify

TanStack Start v1 roda em qualquer runtime que suporte SSR Node-compatível. Pra Vercel, instala `@vercel/node` e troca o target do TanStack pra `vercel`. Cloudflare é o caminho mais direto porque já está configurado.

## Checklist antes de publicar

- [ ] Schema rodado no Supabase novo
- [ ] Bucket `treino-pdfs` criado (privado)
- [ ] Senha do admin trocada (login default: `admin` / `admin`, troca em `/admin/configuracoes`)
- [ ] Stripe webhook apontando pra URL final do deploy
- [ ] Testar fluxo: criar aluno → gerar mensalidade → pagar com `4242...`

## Troubleshooting

**"permission denied for table X"** → faltando `SUPABASE_SERVICE_ROLE_KEY` no `.env.local`

**Stripe checkout não abre** → ver console. Geralmente é `VITE_PAYMENTS_CLIENT_TOKEN` faltando (precisa ser a `pk_test_...`, não a secret)

**Webhook não marca como pago** → conferir signing secret. Localmente o `whsec_` do `stripe listen` é diferente do dashboard.

**Login admin não funciona** → o schema cria admin default. Se você importou dados antigos, use as credenciais antigas. Se começou do zero, default é `admin` / `admin`.