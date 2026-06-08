# Melhorias — Cadastro, Contratação e Pagamentos

Foco desta rodada: itens 1, 2 e 3 da sua solicitação (cadastro com plano + fluxo "Quero esse plano" via WhatsApp). Os itens 4 e 5 (Pagamentos/Perfil) já existem hoje (`/aluno/pagamentos` e `/aluno/perfil`); só faço pequenos ajustes para refletir as mudanças (forma de pagamento + data do último pagamento na tela do aluno). Confirme se quer que eu expanda mais nesta rodada.

## 1. Admin — Cadastrar aluno com plano obrigatório

Arquivo: `src/routes/admin.alunos.tsx` (diálogo "Novo aluno").

- Carregar planos ativos com `useQuery(["planos-admin"], listPlanosAdmin)` filtrando `ativo === true`.
- Adicionar `<Select>` **obrigatório** "Plano" no formulário, acima de Mensalidade.
- Ao selecionar um plano:
  - Preencher automaticamente `valor` com `preco_mensal` (editável caso o professor queira ajustar).
  - Mostrar painel resumido abaixo do select com: descrição, lista de benefícios (chips) e o preço — para o professor visualizar limitações/recursos.
- Botão "Criar" desabilitado enquanto `plano_id` estiver vazio.
- Enviar `plano_id` em `createStudent(...)` (a função já aceita esse parâmetro — sem alteração de backend).

Sem mudança de schema. Campo `alunos.plano_id` já existe.

## 2. Landing — Fluxo "Quero esse plano" via WhatsApp

Arquivo: `src/routes/index.tsx`.

- Substituir `<Link to="/login">Quero esse plano</Link>` por um botão que abre um `<Dialog>` com mini-formulário:
  - Nome completo (obrigatório)
  - Telefone (obrigatório, com máscara simples)
  - E-mail (obrigatório, validação básica)
- Validar com `zod` no submit; exibir erros inline.
- Ao clicar **Continuar**:
  1. Buscar o WhatsApp do professor via novo server fn público `getAdminWhatsappFn` (lê `public.get_admin_whatsapp()` que já existe no banco).
  2. Montar a mensagem exatamente no formato pedido, com o nome do plano clicado.
  3. Abrir `https://wa.me/<numero>?text=<encoded>` em nova aba (`window.open`).
  4. Fechar o diálogo e mostrar toast "Solicitação enviada — em breve o professor entrará em contato".
- Nenhum registro de aluno é criado (atende item 3).

Novo arquivo: `src/lib/api/admin-contact.functions.ts` + wrapper em `src/lib/api/admin-contact.ts` expondo `getAdminWhatsapp()`. Sem autenticação (rota pública).

## 3. Aprovação manual

Nada a fazer no fluxo automático — basta garantir que o lead só vai pelo WhatsApp (item 2) e o professor cria o aluno depois pelo painel (item 1). Vou adicionar uma frase discreta no diálogo: "Após confirmação, o professor criará seu acesso e enviará a senha."

## 4. Ajustes na tela do aluno (pequenos)

Arquivo: `src/routes/aluno.pagamentos.tsx`.
- Mostrar **forma de pagamento** e **data do último pagamento** (já existem na tabela `pagamentos`; basta exibir).
- Sem novos campos no banco.

## 5. Perfil

Já cobre tudo o que foi pedido (`aluno.perfil.tsx` mostra dados pessoais, plano, vencimento, PDFs). Anotações ficam em `/aluno/anotacoes`, histórico em `/aluno/historico`, pagamentos em `/aluno/pagamentos`. Sem mudanças nesta rodada.

## Detalhes técnicos

- Telefone do WhatsApp do admin: já está em `admin_credentials.whatsapp` (formato `55DDDNNNNNNNNN`). A função `get_admin_whatsapp()` retorna esse valor — basta um server fn público que a invoque via `supabaseAdmin.rpc`.
- Mensagem WhatsApp (template):
  ```text
  Olá! Tenho interesse em contratar um plano.

  Nome: {nome}
  Telefone: {telefone}
  E-mail: {email}
  Plano escolhido: {plano.nome}

  Gostaria de mais informações e dar continuidade à contratação.

  Obrigado!
  ```
- Sem migrations. Sem mudanças em RLS. Sem dependências novas.

## Fora do escopo desta rodada

- Stripe (Fase 2, conforme combinado).
- Persistência de "leads" no banco — fluxo é só lead → WhatsApp, sem registro.
