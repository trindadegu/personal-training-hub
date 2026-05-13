
# Reconstrução do Sistema Acessoria Atlântida

## Visão geral

Vou recriar todo o site (login admin/aluno, painel admin, área do aluno) como um app React moderno usando a stack do Lovable, com **Lovable Cloud** como backend (que por baixo é Supabase — então você tem o mesmo banco Postgres, mesmas queries SQL, mesmo painel para gerenciar dados, sem precisar criar conta em outro lugar). Visual mais profissional, check-in funcionando no iPhone, e histórico mensal passando a registrar de verdade cada treino feito.

## Por que o histórico não funciona hoje

No código atual, a tabela `progresso` guarda só um JSON do estado da semana atual — e quando todos os dias são marcados, esse JSON é **zerado** (`studentProgress[day] = []`). Não existe nenhuma tabela de histórico, então não há como olhar “o que foi treinado no mês”. Vou criar uma tabela `treino_historico` que registra cada sessão concluída.

## Por que o check-in falha no iPhone

1. O `getCurrentPosition` é chamado depois de várias linhas async (mudança de DOM, await, etc.), e o iOS Safari só dispara o popup nativo de permissão se a chamada estiver **dentro do mesmo ciclo do clique**.
2. Falta consultar a Permissions API antes para tratar `prompt` vs `denied`.
3. O Safari exige HTTPS — o Lovable já serve em HTTPS, então isso resolve sozinho.

Vou reescrever para chamar `geolocation.getCurrentPosition` **imediatamente no handler do clique**, sem `await` antes, garantindo o popup nativo. Se já estiver negado, mostro um modal explicativo.

## Funcionalidades

### Login (`/`, `/login`)
- Abas Admin / Aluno (UX igual à atual).
- Admin: usuário+senha lidos da tabela `admin_credentials`.
- Aluno: lista de alunos cadastrados, senha = últimos 6 dígitos do ID, botão de pedir senha pelo WhatsApp.
- Sessão por `localStorage` com expiração.

### Área do Aluno (`/aluno`)
- Header com nome, troca de tema, menu de dias (Seg–Sex).
- **Treino do dia**: foco, exercícios com séries/reps/vídeo, checkbox por exercício, barra de progresso.
- **Check-in (corrigido)**: botão único, popup nativo do iOS dispara, busca academias num raio de 3 km via Overpass API, salva em `checkins` e mostra mini-mapa Leaflet.
- **Histórico mensal (novo)** em `/aluno/historico`:
  - Calendário do mês com dias treinados destacados.
  - Lista de sessões: data, dia da semana, foco, exercícios concluídos, check-in associado.
  - Estatísticas: total de treinos no mês, % de adesão, sequência atual.
  - Gráfico de barras de treinos por semana (recharts).

### Painel Admin (`/admin`)
- Dashboard: total de alunos, treinos da semana, check-ins recentes, alunos mais ativos.
- Alunos: cadastrar, listar, excluir.
- Editar treino do aluno (por dia).
- Treinos padrão (template aplicável a todos).
- **Progresso dos alunos**: agora puxa do `treino_historico` real, com filtro por mês.
- Check-ins: tabela + mapa Leaflet com todos, filtro por aluno, export CSV.
- Configurações: credenciais admin, WhatsApp.

## Melhorias de design

- Tipografia: par display + body (Bricolage Grotesque + Inter).
- Paleta única em modo claro/escuro, tokens semânticos em `src/styles.css` (oklch).
- Cards com gradientes sutis, sombras em camadas, microanimações com framer-motion.
- Sidebar admin moderna com ícones Lucide.
- Estados vazios ilustrados, skeletons em vez de spinners, toasts via Sonner.
- Mobile-first: bottom-tab no aluno em mobile, drawer no admin.

## Schema (Lovable Cloud / Supabase)

```text
alunos             (id, nome, telefone, created_at)
treinos            (aluno_id PK, treino jsonb, updated_at)
treinos_padroes    (id PK, treino jsonb, updated_at)
progresso          (aluno_id PK, progresso jsonb)        -- estado da semana atual
treino_historico   (id, aluno_id, data, dia_semana,      -- NOVO
                    foco, exercicios_feitos jsonb,
                    total_exercicios, checkin_id, created_at)
checkins           (id, aluno_id, aluno_nome, gym_name,
                    gym_address, distance_m,
                    lat_aluno, lng_aluno, lat_gym, lng_gym, created_at)
admin_credentials  (id PK, user, password_hash, whatsapp)
```

Toda vez que o aluno concluir um dia (todos os exercícios marcados), grava automaticamente uma linha em `treino_historico`. Isso alimenta calendário, lista, estatísticas e gráfico.

## Stack técnica

TanStack Start + TanStack Router + React Query + Tailwind v4 + shadcn/ui + framer-motion + recharts + Leaflet + Lovable Cloud (Supabase).

Modelo de acesso compatível com o atual (chave anon + sessão local). Se quiser depois evoluir para Supabase Auth com RLS por usuário, faço em uma segunda etapa.

## Sobre os dados antigos

Como será um banco novo (Lovable Cloud), os alunos/treinos cadastrados hoje no seu Supabase antigo não vêm automaticamente. Se quiser, depois eu te ajudo a migrar exportando CSV do projeto antigo e importando no novo (são poucos cliques no painel). Mas você pode também simplesmente recadastrar.

## Etapas de implementação

1. Habilitar Lovable Cloud e criar o schema (incluindo `treino_historico`).
2. Sistema de design (tokens, fontes, componentes base).
3. Login com abas Admin/Aluno.
4. Área do aluno: treino diário + progresso.
5. Check-in com correção iOS + Leaflet.
6. Registro automático em `treino_historico` ao concluir o dia.
7. Tela `/aluno/historico` (calendário, lista, stats, gráfico).
8. Painel admin completo (dashboard, alunos, treinos, padrões, progresso real, check-ins, config).
9. Polimento visual, animações, responsividade.

## O que muda

- Visual repaginado, mais profissional.
- Histórico mensal de verdade (calendário + lista + stats + gráfico).
- Check-in funcionando no iPhone com popup nativo.
- Banco Supabase gerenciado pelo Lovable Cloud (sem login externo, sem manter chaves).
