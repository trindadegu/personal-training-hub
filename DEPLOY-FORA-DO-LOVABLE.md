# Deploy fora do Lovable — Vercel

Guia rápido para rodar localmente e publicar na Vercel sem erros 404/500.

## 1. Rodar localmente

```bash
# 1. Instala dependências (use --legacy-peer-deps se der conflito)
bun install   # ou: npm install --legacy-peer-deps

# 2. Copia o exemplo de env e preenche
cp .env.local.example .env.local
# Edite .env.local com seus valores reais (Supabase + Stripe)

# 3. Dev server
bun dev       # ou: npm run dev
# Acesse http://localhost:5173
```

### Variáveis em `.env.local`

| Variável | De onde vem |
|---|---|
| `VITE_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase → API → `anon` `public` |
| `SUPABASE_URL` | igual à `VITE_SUPABASE_URL` |
| `SUPABASE_PUBLISHABLE_KEY` | igual à `VITE_SUPABASE_PUBLISHABLE_KEY` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → API → `service_role` (NUNCA exponha) |
| `STRIPE_SANDBOX_API_KEY` | Stripe → Developers → API keys → `sk_test_...` |
| `PAYMENTS_SANDBOX_WEBHOOK_SECRET` | Stripe CLI `stripe listen` retorna `whsec_...` |
| `SESSION_SECRET` | qualquer string longa aleatória (`openssl rand -hex 32`) |
| `LOVABLE_API_KEY` | **deixe VAZIO** fora do Lovable |

## 2. Publicar na Vercel

### Pela UI da Vercel

1. Sobe o repo no GitHub.
2. Vercel → New Project → import do repo.
3. **Framework Preset:** `Other` (deixa em branco — Build Output API v3 detecta sozinho).
4. **Build Command:** `npm run build`
5. **Install Command:** `npm install --legacy-peer-deps`
6. **Output Directory:** deixa em branco (Vercel lê `.vercel/output/` automaticamente).
7. **Environment Variables:** cola TODAS as do `.env.local` (exceto `LOVABLE_API_KEY`).
8. Deploy.

### Pela CLI

```bash
npm i -g vercel
vercel login
vercel link
# adicione cada env var:
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_PUBLISHABLE_KEY production
vercel env add SUPABASE_URL production
vercel env add SUPABASE_PUBLISHABLE_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add STRIPE_SANDBOX_API_KEY production
vercel env add PAYMENTS_SANDBOX_WEBHOOK_SECRET production
vercel env add SESSION_SECRET production
vercel deploy --prod
```

## 3. Stripe webhook em produção

Stripe Dashboard → Developers → Webhooks → Add endpoint:
- URL: `https://SEU-PROJETO.vercel.app/api/public/payments/webhook?env=sandbox`
- Eventos: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
- Copie o `whsec_...` que o Stripe gera e atualize `PAYMENTS_SANDBOX_WEBHOOK_SECRET` na Vercel.

## 4. Por que não dá 404/500

- **404 em rotas:** o TanStack Start emite o output Vercel completo (com routing manifest). Não precisa `vercel.json` rewrites — o `.vercel/output/config.json` já mapeia tudo.
- **500 em SSR:** `src/server.ts` envolve o handler em try/catch + normalizador de respostas catastróficas + `errorComponent`/`notFoundComponent` no `__root.tsx`. Erro de SSR vira página HTML amigável, nunca `{"unhandled":true}`.

## 5. Atualizar `og:url` e canonical

No arquivo `src/routes/index.tsx`, troque `personal-training-hub-six.vercel.app` pelo seu domínio Vercel real (ou domínio próprio quando conectar).

## 6. Troubleshooting

- **`permission denied for table X`:** rode no SQL Editor do seu Supabase os GRANTs do `schema-completo.sql`. Se persistir só em algumas tabelas, rode `GRANT SELECT, INSERT, UPDATE, DELETE ON public.<tabela> TO authenticated; GRANT ALL ON public.<tabela> TO service_role;`.
- **Login admin falha:** rode `INSERT INTO public.admin_credentials (id, username, password, whatsapp) VALUES (1, 'admin', extensions.crypt('italoruan123', extensions.gen_salt('bf')), '5585981521490') ON CONFLICT (id) DO UPDATE SET username = 'admin', password = extensions.crypt('italoruan123', extensions.gen_salt('bf'));`
- **Imagens da home não aparecem:** confira que `public/personal.jpg`, `public/antes1.jpg`…`depois3.jpg` existem (já vêm no repo).
- **Webhook Stripe não marca pago:** confira o `PAYMENTS_SANDBOX_WEBHOOK_SECRET` no Vercel — tem que ser o exato `whsec_...` do endpoint criado na Stripe.