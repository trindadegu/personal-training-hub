## Objetivo
Substituir `src/routes/index.tsx` pela nova home (foto do personal, resultados, depoimentos, planos) e garantir que o deploy no Vercel rode sem 404/500, sem dependências exclusivas do Lovable.

## O que vou fazer

### 1. Reescrever `src/routes/index.tsx`
O código que você colou perdeu o JSX no caminho (vieram só os atributos, sem tags). Vou reconstruir fielmente a estrutura que você descreveu:

- **Header fixo:** logo "Atlântida" + ThemeToggle + botão "Entrar" (ou "Ir para meu painel" se já logado).
- **Hero:** título "Treinos que você acompanha do bolso", subtítulo, CTA.
- **Seção Personal Trainer:** foto (Italo Ruan), nome, CREF, anos de experiência, alunos atendidos, bio.
- **Resultados (antes/depois):** 3 cards com estrelas, par de imagens antes/depois, depoimento, nome, resultado.
- **Diferenciais:** 3 cards (Treino do dia, Check-in GPS, Histórico mensal).
- **Planos:** vindos de `listPlanosPublic`, com card destacado no meio, CTA "Quero esse plano" que abre modal de lead.
- **Modal de lead:** nome, telefone, email validados com Zod → abre WhatsApp do admin com mensagem pronta.
- **WhatsappFab** flutuante.

Vou conferir/ajustar antes de escrever:
- import de `getAdminWhatsapp` (você usou `@/lib/api/admin-contact` — confirmo que esse arquivo expõe a função; se não, importo de `@/lib/api/auth` que já tem).
- `formatBRL` em `@/lib/api/config`.
- `getAdminSession`/`getStudentSession` em `@/lib/session` (helpers de localStorage).
- og:url e canonical já apontando para `personal-training-hub-six.vercel.app`.

### 2. Imagens dos antes/depois e do personal
Vou criar `public/` com placeholders nomeados (`personal.jpg`, `antes1.jpg`, `depois1.jpg`, …, `antes3.jpg`, `depois3.jpg`) usando `placehold.co` redirecionado, OU deixo as URLs apontando direto para `https://placehold.co/...` enquanto você não substitui pelas reais. Mais simples e evita 404 no Vercel.

**Recomendo:** URLs do `placehold.co` por enquanto. Quando você tiver as fotos reais, é só colocar em `public/` e trocar o caminho.

### 3. Garantir build limpo para Vercel (sem dependências Lovable)

Vou auditar e remover/isolar o que depende do runtime Lovable:

- **`vite.config.ts`:** hoje usa `@lovable.dev/vite-tanstack-config`. Vou criar um modo "vercel" que substitui pelo `@tanstack/react-start/plugin` puro + `@vitejs/plugin-react`, ativado por env var (`DEPLOY_TARGET=vercel`). No Lovable continua igual.
- **TanStack target = vercel:** no plugin do TanStack Start, configurar `target: 'vercel'` quando `DEPLOY_TARGET=vercel`.
- **`src/server.ts` (SSR wrapper):** já tem captura de erro robusta — mantém. Isso resolve 500 com `{"unhandled":true}` no Vercel.
- **`__root.tsx` errorComponent + 404:** confirmo que estão definidos. Garante zero 500 silencioso.
- **`src/integrations/supabase/client.ts`:** confirma que lê `import.meta.env.VITE_SUPABASE_*` (funciona no Vercel via env vars do projeto).
- **`src/lib/stripe.server.ts`:** já está sem `LOVABLE_API_KEY` obrigatório (mudança anterior).
- **Server functions:** rodam em runtime Node do Vercel — verifico que nada usa APIs Cloudflare-only.

### 4. Criar `vercel.json` mínimo
- `framework: null` (TanStack Start gera os próprios outputs).
- Build command: `bun run build` (ou `npm run build`).
- Output directory: `.output/public` + functions em `.output/server`.
- Rewrites para SSR (`/* → /server`).

### 5. Atualizar `DEPLOY-FORA-DO-LOVABLE.md`
Adicionar passo a passo Vercel atualizado:
1. `bun install`
2. Copiar `.env.local.example` → `.env.local`, preencher Supabase + Stripe.
3. `bun dev` → testar em `localhost:5173`.
4. No Vercel: importar repo, framework "Other", build `bun run build`, env vars (Supabase, Stripe, SESSION_SECRET, deixar `LOVABLE_API_KEY` vazio).
5. Webhook Stripe → `https://seu-app.vercel.app/api/public/payments/webhook?env=sandbox`.

### 6. Teste local
Após escrever tudo, rodo `bun run build` no modo Vercel pra garantir que compila sem erro.

---

## O que NÃO vou fazer (pra não estourar escopo)
- Não vou criar painel `/admin/home` editável (você não pediu, conteúdo dos depoimentos fica fixo no código).
- Não vou tocar no banco — sem novas migrações.
- Não vou mexer em outras rotas (admin, aluno) — só a home.

---

## Confirmações antes de eu implementar
1. **Imagens:** OK usar `placehold.co` por enquanto e você troca depois quando tiver fotos reais? (Sim/Não)
2. **Conteúdo do personal hardcoded:** "Italo Ruan", CREF 123456-F, +5 anos, +150 alunos. Mantenho assim? Algum ajuste?
3. **Domínio Vercel:** `personal-training-hub-six.vercel.app` é o final mesmo? (uso ele em canonical/og:url)

Responde 1, 2, 3 que eu sigo direto pra implementação.
