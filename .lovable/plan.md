## Plano

### 1. Indicador de carregamento global (barra no topo)

Implementar uma barra de progresso fina e fixa no topo (estilo YouTube/NProgress) que aparece sempre que houver:
- Navegação entre rotas do TanStack Router (`router.state.isLoading` / `isTransitioning`)
- Loaders ou serverFns pendentes
- Mutations do TanStack Query em andamento

**Implementação:**
- Criar `src/components/app/route-loading-bar.tsx`: barra fina (2px) fixa no topo, cor `--primary`, com animação de progresso indeterminada (translateX + scaleX) usando CSS. Mostra após ~80ms de delay (evita flash em navegações instantâneas) e some suavemente ao terminar.
- Usar `useRouterState({ select: (s) => s.isLoading || s.isTransitioning })` do `@tanstack/react-router` para detectar navegação pendente.
- Usar `useIsFetching()` / `useIsMutating()` do `@tanstack/react-query` para cobrir refetches e mutations.
- Combinar os sinais: bar visível se qualquer um estiver ativo.
- Montar globalmente em `src/routes/__root.tsx` dentro do `RootComponent` (fica acima de qualquer Outlet).
- Token de cor via design system existente (`--primary`, glow). Sem libs externas.

### 2. SQL para o projeto Supabase `ohnlwhprxzajmsrwisvg`

Não consigo trocar a conexão de banco do app (o Lovable Cloud está fixado em `nhtnfsldvfxktkqtnsjr`). O que vou entregar: um arquivo SQL único com **todo o schema atual** pronto para colar no SQL Editor do projeto novo.

Conteúdo do arquivo `/mnt/documents/schema-atlantida.sql`:
- `CREATE TABLE` de todas as 12 tabelas com os tipos e defaults atuais
- Chaves primárias (`id`) e restrições de unicidade implícitas
- `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` em cada tabela
- Políticas RLS atuais (`public access` permissiva — mesmo modelo do projeto atual). Inclui um comentário avisando que essas políticas são abertas e ideais apenas para o modelo single-tenant atual; se quiser endurecer depois, sinaliza.
- Entrega como `<presentation-artifact>` para download direto.

### Detalhes técnicos

- A barra usa apenas CSS (`@keyframes`) — sem dependência nova.
- A barra fica em `position: fixed; top: 0; left: 0; right: 0; z-index: 9999` para sobrepor headers.
- Acessibilidade: `role="progressbar"` + `aria-label="Carregando"`.
- Não altera nenhuma rota nem lógica de negócio; só adiciona o componente e o monta no root.
- O SQL é puramente um artefato exportado — não modifica o banco atual.

### Arquivos afetados

- **Novo**: `src/components/app/route-loading-bar.tsx`
- **Editado**: `src/routes/__root.tsx` (apenas import + uma linha de JSX)
- **Artefato**: `/mnt/documents/schema-atlantida.sql`