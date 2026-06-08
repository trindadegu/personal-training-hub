## Objetivo desta rodada

Polir a Fase 1 antes de ligar pagamento real e preparar o Stripe em modo teste para a apresentação do SENAI.

---

## 1. Check-in em qualquer academia próxima (remover academias padrão)

Hoje o `createCheckinFn` rejeita o check-in se o GPS do aluno não estiver dentro do raio de uma "academia parceira" cadastrada (`src/lib/api/checkins.functions.ts`, linhas 41-60). Você quer que funcione com qualquer academia próxima retornada pelo Overpass (já é o que `fetchNearbyGyms` faz).

Mudanças:
- Remover o bloco de validação contra `public.academias` em `createCheckinFn`. Manter apenas: aluno existe, 1 check-in por dia, distância do aluno ao ginásio escolhido ≤ ~500 m (anti-fraude leve, usando `haversineMeters(lat_aluno, lng_aluno, lat_gym, lng_gym)`).
- Esconder o menu "Academias padrão" do admin (`src/routes/admin.academias.tsx` + link na sidebar de `admin.tsx`) — vira opcional, sem aparecer no menu. Não apago a tabela `academias` para não quebrar nada; só deixo de exigir.
- Atualizar o texto do card de check-in do aluno para refletir "academia mais próxima" em vez de "academia parceira".

---

## 2. Página inicial `/` não abre

A causa provável é o `useEffect` em `src/routes/index.tsx` (linhas 41-44): se houver `adminSession` ou `studentSession` no `localStorage`, ele redireciona automaticamente para `/admin` ou `/aluno` antes de a landing renderizar. Para você (logado no admin para testar) parece que a `/` simplesmente "não funciona".

Mudanças:
- Remover o redirect automático. Em vez disso, no header, se já houver sessão, mostrar botão "Ir para meu painel" (substitui "Entrar"). Assim a landing sempre aparece e o usuário escolhe.
- Verificar console/network depois do deploy para garantir que não há outro erro (se houver, corrijo em seguida).

---

## 3. Botão "voltar" no /login

Adicionar no topo de `src/routes/login.tsx` um link discreto com ícone `ArrowLeft` "Voltar ao início" apontando para `/`. Funciona em qualquer aba (admin/aluno).

---

## 4. Balão flutuante do WhatsApp do professor

Componente novo `src/components/app/whatsapp-fab.tsx`:
- Botão circular fixo no canto inferior direito, ícone WhatsApp, cor verde (#25D366), animação leve.
- Lê o número via `getAdminWhatsapp()` (já existe). Se vazio, esconde.
- Abre `https://wa.me/<numero>?text=Olá, gostaria de mais informações sobre os planos`.
- Aparece em: landing `/` e tela de `/login`. NÃO aparece dentro de `/admin` e `/aluno` (lá já tem fluxos próprios).

---

## 5. "Esqueci minha senha" → WhatsApp do professor

Já existe na aba aluno do login (`src/routes/login.tsx`, linhas 159-163, 212-218). Vou:
- Trocar por um botão verde mais visível (variant outline com ícone WhatsApp), com texto "Esqueci minha senha — falar com o professor".
- Adicionar o mesmo botão também na aba **admin** ("Problema para entrar? Falar com suporte"), abrindo o mesmo WhatsApp.

---

## 6. Pagamentos Stripe — modo teste para SENAI

Você quer cobrança obrigatória via Stripe, mas **só em modo teste** para a apresentação. Faço em duas partes:

### 6.1 Ativar Stripe (Seamless, modo teste)
Recomendo a integração **Seamless Payments via Stripe** da Lovable (não precisa de conta Stripe nem chave): ela já cria um ambiente de teste pronto, você usa cartões `4242 4242 4242 4242` para a demo, e quando quiser produção é só verificar o cadastro. No Brasil o Stripe só oferece "tax calculation only" (+0,5%), e isso vem configurado por padrão.

Ao confirmar este plano, eu chamo `enable_stripe_payments` e depois sigo com os passos abaixo.

### 6.2 Cadastrar os planos como produtos Stripe
Para cada plano em `public.planos` (ativos), criar um Product + Price recorrente mensal no Stripe (usando o tool `batch_create_product` após o enable). Guardar `stripe_price_id` em `public.planos` (nova coluna) via migration.

### 6.3 Fluxo de pagamento do aluno
- Tela `/aluno/pagamentos`: cada fatura "pendente" ganha botão **"Pagar agora"** que cria uma Checkout Session (server fn `createCheckoutSessionFn` usando `requireStudentSessionFor`) com o `price_id` do plano e `client_reference_id = pagamento.id`. Abre o Stripe Checkout em nova aba.
- Webhook `/api/public/webhooks/stripe` (server route): verifica assinatura, em `checkout.session.completed` marca o pagamento como pago, preenche `pago_em`, registra `forma_pagamento = 'stripe'` e gera lançamento financeiro (reaproveita lógica já em `marcarPagoFn`).

### 6.4 Cobrança obrigatória
- No `/aluno` (layout `aluno.tsx`), se existir fatura "atrasada" do aluno (vencimento < hoje), mostrar banner vermelho fixo no topo: "Você tem uma mensalidade em atraso — Pagar agora" que leva direto ao Checkout. Bloquear o check-in enquanto houver atraso (toast explicando).

### 6.5 Secrets
A integração Lovable injeta `STRIPE_SECRET_KEY` e `STRIPE_WEBHOOK_SECRET` automaticamente — não precisa pedir nada.

---

## Fora do escopo desta rodada

- Verificação Stripe para live (faremos depois da apresentação).
- Notas fiscais / split. 
- Pix / boleto (Stripe BR cobra extra para Pix — fica para Fase 3).

---

## Ordem de execução

1. Itens 1, 2, 3, 4, 5 (UI + ajuste de check-in) — rápido, sem dependência externa.
2. Confirmação para `enable_stripe_payments`.
3. Migration `planos.stripe_price_id`, `batch_create_product`, server fn de checkout, webhook, banner de atraso.

Se aprovar, começo pela parte 1-5 e te aviso antes de chamar o `enable_stripe_payments`.