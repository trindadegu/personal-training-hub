## Esclarecimentos importantes

- **GitHub**: você decidiu pular. Quando quiser, basta abrir Plus (+) → GitHub → Connect; eu não controlo push nem crio branches no seu repositório, isso é feito pela integração nativa.
- **Stripe**: fica para a Fase 2. Por enquanto mantemos o pagamento manual (com comprovante) que já existe, mas já preparo o perfil do aluno para receber os dados de assinatura depois.
- **"Banco interno do Lovable"**: não existe. Todo dado de negócio já está no Supabase. O que usa localStorage é apenas a sessão do aluno/admin (que você confirmou estar ok).

---

## Plano único — todas as correções e melhorias

### 1. Banco de dados (migração única)

Nova migration com:

- `aluno_anotacoes` (id, aluno_id, titulo, conteudo, autor, created_at, updated_at)
- `treino_pdfs` (id, aluno_id OR treino_id, nome, descricao, storage_path, tamanho_bytes, created_at)
- Novas colunas em `checkins`: `inicio_at`, `fim_at`, `duracao_segundos` (para hora de entrada/saída)
- Novas colunas em `alunos`: `foto_url`, `data_cadastro` (default now)
- Novas colunas em `treinos`: campos `sabado` e `domingo` (JSON com `focus` + `exercises`, igual aos outros dias)
- Bucket Storage `treino-pdfs` (privado) + policies

GRANTs e RLS conforme padrão do projeto. Tudo Supabase, nada local.

### 2. Calendário: incluir Sábado e Domingo

- `src/lib/types.ts`: adicionar `"sabado"` e `"domingo"` ao tipo `DiaSemana`, labels e shorts.
- `src/routes/aluno.index.tsx`: grid passa de `grid-cols-5` para `grid-cols-7` (responsivo).
- `src/components/app/training-editor.tsx`: editor do professor mostra os 7 dias.
- Migrar treinos existentes garantindo defaults para sábado/domingo (vazios).

### 3. Área do aluno reestruturada

Nova estrutura de rotas:

```text
/aluno              -> Dashboard (resumo)
/aluno/treinos      -> Treinos da semana (o que é a tela atual)
/aluno/historico    -> já existe
/aluno/perfil       -> Perfil completo
/aluno/pagamentos   -> Histórico + status assinatura
/aluno/anotacoes    -> Anotações do professor (read-only)
```

Bottom-nav do aluno (`src/routes/aluno.tsx`) ganha esses links.

**Dashboard `/aluno`** (novo):
- Card "Próximo treino" (próximo dia da semana com treino)
- Card "Último treino realizado" (do histórico)
- Card "Status da assinatura" (plano + próximo vencimento — placeholder Stripe na Fase 2)
- Card "Frequência" (mantém o que já existe)
- Atalho "Fazer check-in"

**Perfil `/aluno/perfil`**:
- Dados pessoais (nome, e-mail, telefone, data de cadastro)
- Upload de foto de perfil (Supabase Storage, bucket `avatars`)
- Bloco "Plano contratado" (nome, valor, data de contratação, vencimento)
- Botão "Trocar plano" (abre seleção; na Fase 2 dispara Stripe; por ora gera solicitação manual)

**Pagamentos `/aluno/pagamentos`**:
- Lista os `pagamentos` do aluno (aprovado / pendente)
- Mostra "Próxima cobrança" calculada do plano + último pagamento

**Anotações `/aluno/anotacoes`**:
- Lista somente leitura das anotações criadas pelo professor.

### 4. Painel do professor — anotações e PDFs

**Anotações por aluno** em `/admin/aluno/$id`:
- CRUD completo (criar/editar/excluir) sobre `aluno_anotacoes`
- ServerFns com `requireAdminSession`

**PDFs de treino**:
- No editor de treino (admin), botão "Anexar PDF" por aluno
- Upload para bucket `treino-pdfs` via `supabase--storage_upload`
- Lista de PDFs com nome + tamanho + excluir
- Aluno vê na página do treino: visualizador embutido (`<iframe src=signed_url>`) + botão de download

### 5. Financeiro — bloquear meses futuros

- `src/components/app/financeiro-panel.tsx` e `src/routes/admin.financeiro.tsx`: o seletor de mês só permite mês atual e anteriores.
- Aplicar em relatórios, filtros e dashboard.
- Validação também no server (`financeiro.functions.ts`) — rejeita `mes > mês atual`.

### 6. Check-in com entrada/saída

- `createCheckinFn`: passa a registrar `inicio_at = now()`.
- Nova `finishCheckinFn`: marca `fim_at` e calcula `duracao_segundos`.
- Tela do aluno: botão "Iniciar treino" (check-in) e, ao concluir todos os exercícios do dia, "Finalizar treino" grava `fim_at` automaticamente.
- Admin `/admin/checkins` mostra entrada, saída e duração.

### 7. Stripe — placeholder agora (Fase 2 depois)

- Perfil já mostra plano + valor + vencimento usando dados do `aluno_plano` e último `pagamento`.
- Botões "Trocar plano" e "Cancelar" registram solicitação manual numa tabela `assinatura_solicitacoes` (admin trata).
- Quando você liberar a Fase 2, eu ativo `enable_stripe_payments`, crio produtos a partir dos planos e ligo webhook em `/api/public/stripe-webhook` — os botões existentes passam a chamar Stripe Checkout.

### 8. Qualidade / segurança

- Todas as escritas via `createServerFn` + `supabaseAdmin` (já é o padrão)
- RLS habilitado em todas as novas tabelas
- Storage com signed URLs (PDFs privados)
- Responsividade: testar grid de 7 dias e dashboard em mobile

---

## Ordem de execução

```text
1. Migration (tabelas + colunas + bucket)
2. Tipos + dias sábado/domingo no editor e na tela do aluno
3. Bottom-nav do aluno + novas rotas (perfil, pagamentos, anotações, dashboard)
4. Dashboard do aluno
5. Perfil + upload de foto
6. Anotações (admin CRUD + aluno read-only)
7. PDFs de treino (upload admin + viewer aluno)
8. Check-in com entrada/saída
9. Filtro financeiro restrito ao mês atual
10. Polimento responsivo + QA
```

## O que NÃO está neste plano

- Stripe real (Fase 2, sob seu comando)
- GitHub / criação da branch `gustavo` (você cuida na UI do Lovable)
- Migrar sessão de localStorage para cookie httpOnly puro (você aprovou manter)

Se aprovar, sigo nessa ordem. Se quiser inverter algo (ex: começar pelos PDFs), me diga antes.