## Visão geral

Vou transformar o sistema Atlântida em um projeto que atende todos os requisitos do trabalho (banco relacional, backend, CRUD, login com tipos de usuário, organização) e adicionar tudo que você pediu: **3 planos**, **pagamento online via Stripe**, **frequência com validação real de GPS + metas**, e **API de mapa (OpenStreetMap)** no check-in. Também atualizo a página inicial para mostrar os planos.

---

## 1. Planos (Treino / Acompanhamento / Nutri)

**Novas tabelas no banco:**
- `planos` — nome, descrição, preço mensal, lista de benefícios, ordem de exibição, ativo
- `aluno_plano` — qual plano cada aluno tem, data de início, status

**Seeds iniciais (você ajusta os preços depois):**
| Plano | O que inclui |
|---|---|
| Treino | Ficha semanal personalizada + check-in + histórico |
| Treino + Acompanhamento | Tudo do anterior + revisão quinzenal + suporte WhatsApp |
| Treino + Acompanhamento + Nutri | Tudo + plano alimentar mensal + acompanhamento nutricional |

**Onde aparecem:**
- **Página inicial** (`/`): nova seção "Escolha seu plano" abaixo do hero (substitui/complementa o bloco atual de 3 cards), com os 3 planos e botão "Quero esse plano".
- **Painel admin** (`/admin/planos`): CRUD de planos (criar, editar preço, benefícios, ativar/desativar).
- **Cadastro de aluno**: dropdown para escolher plano (preenche `valor_mensalidade` automaticamente).
- **Área do aluno**: mostra qual plano tem e botão "Mudar plano".

---

## 2. Pagamento online com Stripe

Você vai usar o **Stripe nativo do Lovable** (cartão e Pix, sem precisar criar conta Stripe sozinho — eu te guio quando chegar a hora). Como o vendedor é no Brasil, vou configurar com **cálculo de imposto automático** (+0,5% por transação), sem o módulo de compliance completo (não disponível para BR).

**Fluxo:**
1. Aluno entra na área dele → vê mensalidade em aberto → clica "Pagar agora"
2. Abre checkout do Stripe (cartão ou Pix)
3. Webhook recebe confirmação → marca `pagamentos.status = 'pago'` automaticamente e cria lançamento financeiro
4. Admin vê tudo no painel financeiro (já existe), agora com pagamentos automáticos marcados

**Mudanças técnicas:**
- Adicionar `stripe_customer_id` em `alunos` e `stripe_session_id` + `stripe_payment_intent_id` em `pagamentos`
- Server function `criarCheckoutPagamento` (gera URL de checkout)
- Server route pública `/api/public/stripe-webhook` (verifica assinatura, marca como pago)
- Botão "Pagar" na área do aluno e na lista de pagamentos
- Produtos no Stripe são criados a partir dos planos (assinatura recorrente mensal)

---

## 3. Frequência: validação real de GPS + metas

**Novas tabelas:**
- `academias` — academias parceiras cadastradas pelo admin (nome, endereço, lat, lng, raio_metros padrão 150m)
- Adicionar em `alunos`: `meta_frequencia_semanal` (ex: 4) e `meta_frequencia_mensal`

**Validação no check-in (server-side, à prova de fraude):**
- Hoje qualquer GPS é aceito. Vou bloquear no servidor: se distância até a academia mais próxima cadastrada > raio configurado, retorna erro "Você precisa estar na academia para fazer check-in"
- Cálculo de distância (Haversine) feito no servidor, não confia no cliente
- Limite anti-spam: 1 check-in por dia por aluno (já existe parcialmente)

**Metas e alertas:**
- Área do aluno: barra de progresso "X/4 treinos esta semana" + sequência (streak)
- Painel admin: lista de alunos com **alerta vermelho** se ficaram X dias sem check-in (configurável, padrão 7 dias)
- Novo card no dashboard admin: "Alunos em risco de evasão"

**Admin: CRUD de academias** em `/admin/academias` (lista + adicionar + mapa para escolher coordenadas).

---

## 4. API de mapa (OpenStreetMap + Nominatim)

Já usamos Leaflet. Vou expandir o uso:
- **Cadastro de academia (admin):** mapa interativo — admin clica na localização ou busca o endereço (Nominatim faz geocoding grátis) → preenche lat/lng automaticamente
- **Tela de check-in (aluno):** mapa mostra a posição do aluno, círculo do raio da academia, e marcador da academia mais próxima. Se estiver dentro do raio, o botão "Confirmar check-in" libera; fora, fica bloqueado com mensagem
- **Histórico (admin):** ver no mapa onde cada check-in foi feito

Sem chave de API, sem cadastro, sem cartão. Funciona em produção e em apresentação ao vivo.

---

## 5. Requisitos do trabalho — o que já está coberto e o que vou reforçar

| Requisito | Status atual | Ação |
|---|---|---|
| Banco relacional + FKs + constraints | ✅ Já tem | Adicionar tabelas novas com FKs e constraints |
| Backend completo (API/rotas/middleware/erros) | ✅ Server functions + middleware de auth | Sem mudança estrutural |
| CRUD completo | Parcial | Adicionar CRUD de planos e academias |
| Login com tipos de usuário | ✅ Admin + Aluno | Sem mudança |
| Diagrama do banco | ❌ Falta | Vou gerar um arquivo `DIAGRAMA.md` (Mermaid) com todo o ER, que renderiza direto no GitHub |
| Documentação técnica | ❌ Falta | Vou gerar `README.md` profissional com: visão geral, stack, estrutura de pastas, modelo do banco, lista de APIs/rotas, como rodar, e variáveis de ambiente |

---

## 6. Ordem de implementação

1. **Migração do banco**: tabelas `planos`, `aluno_plano`, `academias` + colunas novas em `alunos` e `pagamentos`
2. **CRUD de planos** (admin) + seeds dos 3 planos
3. **Página inicial**: nova seção de planos
4. **CRUD de academias** (admin) com mapa interativo
5. **Validação GPS no check-in** (server-side) + UI nova com mapa
6. **Metas e alertas de frequência** (aluno + dashboard admin)
7. **Integração Stripe**: habilitar pagamentos, criar produtos a partir dos planos, checkout, webhook, botão "Pagar"
8. **Documentação**: `README.md` + `DIAGRAMA.md` na raiz do projeto

---

## 7. O que vou precisar de você durante a execução

- **Quando chegar no Stripe**: vou abrir um formulário pra você preencher (email, nome, dados do negócio). Você não precisa de conta Stripe prévia.
- **Preços e benefícios finais dos 3 planos**: posso começar com valores placeholder (R$ 80 / R$ 150 / R$ 220) e você ajusta no painel admin.
- **Raio padrão de check-in**: vou usar 150m. Você muda por academia se quiser.

Posso seguir? Se quiser ajustar algo no escopo (ex: tirar Stripe agora, mudar preços, adicionar mais alguma coisa), me diga antes de aprovar.
