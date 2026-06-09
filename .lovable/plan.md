
## Plano: publicar o site com pagamento em modo teste

### 1. GitHub (nenhuma ação necessária)
Você já conectou. O sync é bidirecional e automático — toda mudança feita aqui já está no seu repositório em tempo real. Pode verificar abrindo o repo no GitHub.

### 2. Backup do banco (CSVs)
Antes de mexer em qualquer coisa, exportar dados atuais:
1. Abrir **Cloud → Database → Tables** (botão View Backend)
2. Pra cada tabela importante (`alunos`, `pagamentos`, `planos`, `academias`, `financeiro_lancamentos`, `checkins`, etc.) clicar na tabela → botão **Export → CSV**
3. Guardar os arquivos localmente

Sobre "mover pra Supabase próprio": não é suportado pelo Lovable após Cloud ter sido adicionado. O backend continua sendo o Cloud. O que você tem garantido:
- O código (incluindo `supabase/migrations/`) vai pro seu GitHub automaticamente
- CSVs como backup de dados
- Se um dia sair do Lovable, é possível recriar manualmente noutra conta Supabase aplicando as migrations + importando os CSVs

### 3. Reconectar Stripe em modo teste
O código atual (`src/lib/stripe.server.ts`, webhook em `src/routes/api/public/payments/webhook.ts`) espera estas 3 secrets de servidor:

- `STRIPE_SANDBOX_API_KEY` — chave secreta de teste do Stripe (`sk_test_...`)
- `PAYMENTS_SANDBOX_WEBHOOK_SECRET` — secret do endpoint webhook em modo teste (`whsec_...`)
- `LOVABLE_API_KEY` — já existe, não mexer

A chave **pública** de teste (`pk_test_...`) já está em `.env.development` como `VITE_PAYMENTS_CLIENT_TOKEN` — o banner laranja "Modo de teste" e o checkout embed dependem dela. Vou confirmar que continua válida; se não estiver, atualizo.

**Passos:**
1. Você obtém no painel do Stripe (modo Test, canto superior direito ligado):
   - Developers → API keys → **Secret key** de teste (`sk_test_...`)
   - Developers → Webhooks → Add endpoint:
     - URL: `https://acessoriaatlantida.lovable.app/api/public/payments/webhook?env=sandbox`
     - Eventos: `checkout.session.completed`
     - Copiar o **Signing secret** (`whsec_...`)
2. Eu peço as duas secrets via formulário seguro (`STRIPE_SANDBOX_API_KEY` e `PAYMENTS_SANDBOX_WEBHOOK_SECRET`)
3. Você cola os valores no formulário
4. Eu valido que o checkout funciona

### 4. Publicar
Depois das secrets configuradas:
1. Clicar em **Publish** (canto superior direito)
2. O site vai pra `https://acessoriaatlantida.lovable.app` em modo teste
3. Banner laranja "Modo de teste" continua visível pros alunos saberem
4. Nenhum dinheiro real é cobrado

### 5. Como testar o fluxo de pagamento
Cartões de teste do Stripe (qualquer validade futura, qualquer CVC, qualquer CEP):

| Cenário | Cartão |
|---|---|
| **Sucesso** | `4242 4242 4242 4242` |
| Recusado | `4000 0000 0000 0002` |
| Requer autenticação 3DS | `4000 0025 0000 3155` |

**Fluxo de teste end-to-end:**
1. Logar como aluno (criar um aluno admin → vincular plano → gerar fatura pendente)
2. Aluno entra em **Pagamentos** → clica **Pagar agora** numa fatura pendente
3. Modal abre o checkout Stripe embedado
4. Usar `4242 4242 4242 4242`, validade `12/30`, CVC `123`
5. Confirmar pagamento → redirect pra `/aluno/pagamentos?paid=1` → toast "Pagamento processado"
6. Em ~2s a fatura deve mudar pra "Pago" (webhook marca + cria lançamento financeiro)
7. Verificar no admin: **Financeiro** mostra a receita "Mensalidade ... (Stripe)"

**Se a fatura não marcar como paga em 10s:** o webhook não chegou. Conferir em Stripe Dashboard → Developers → Webhooks → seu endpoint → aba "Events" pra ver se o evento foi entregue com 200. Se 4xx, a `PAYMENTS_SANDBOX_WEBHOOK_SECRET` está errada.

### Resumo do que eu vou fazer (modo build)
- Solicitar as 2 secrets de servidor via formulário
- Confirmar que `.env.development` está com `pk_test_...` válido
- (Sem mudanças de código — a integração já está montada, só precisa das secrets)
