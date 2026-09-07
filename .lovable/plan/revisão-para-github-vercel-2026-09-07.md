# Revisão para GitHub + Vercel

Revisei o código pensando em: nada sensível vai para o GitHub, e o site sobe no Vercel sem 404/500.

## Problemas encontrados (e o que vou corrigir)

1. **Chave secreta do banco escrita dentro do código** — `src/lib/api/auth.functions.ts` tem a URL e a chave de administrador do Supabase digitadas direto no arquivo. Se isso for para o GitHub, qualquer pessoa que ver o repositório tem acesso total ao banco. Vou trocar por leitura das variáveis de ambiente, como o resto do sistema já faz.
2. **Arquivo essencial marcado para ser ignorado** — o `.gitignore` manda ignorar `src/integrations/supabase/client.server.ts`, que é justamente o arquivo que faz a conexão com o banco no servidor. Hoje ele ainda está versionado, mas no primeiro clone/limpeza ele desaparece e o site quebra com erro 500 no Vercel. Vou remover essa linha e limpar as regras duplicadas de `.env`.
3. **Correção do erro 500 "tslib" desapareceu** — o script que resolvia aquele erro de deploy no Vercel (`Cannot find package 'tslib'`) não está mais no projeto. Vou recriá-lo e religá-lo ao build.
4. **Configuração de build do Vercel** — vou revisar `vercel.json` e remover arquivos de configuração de outra hospedagem (`wrangler.jsonc`, `nitro.config.ts` duplicando o que o Vite já faz) que só geram confusão.
5. **Guia de deploy** — vou refazer o `.env.example` e um README curto listando exatamente quais variáveis colar no Vercel.

## Estado das conexões

- **Banco de dados (Supabase):** o app está apontado para o banco do Lovable por variáveis de ambiente, mas há aquela chave fixa no código apontando para **outro** projeto (o seu). Depois da correção, basta trocar as variáveis no Vercel para usar o seu banco — sem editar código.
- **Stripe:** já funciona em modo teste tanto dentro do Lovable quanto fora (fala direto com a Stripe quando não existe chave do Lovable). Você só precisa colocar no Vercel a chave de teste da Stripe e o segredo do webhook, e apontar o webhook para `https://SEU-SITE/api/public/payments/webhook?env=sandbox`.
- **GitHub:** eu não consigo ver o status da conexão daqui. Confira no menu **+** do chat → GitHub. Se não estiver conectado, é "Connect project" e depois "Create Repository".

## Verificação final

Depois das correções eu rodo o build de produção completo e confiro que a saída do Vercel é gerada sem erros, além de conferir se todas as páginas existem (nenhum link apontando para rota inexistente = sem 404).

## Detalhes técnicos

- `auth.functions.ts`: remover `createClient` hardcoded e importar `supabaseAdmin` de `@/integrations/supabase/client.server` (padrão dos outros arquivos `.functions.ts`).
- `.gitignore`: remover `src/integrations/supabase/client.server.ts` e consolidar bloco de `.env`, mantendo `!.env.example`.
- Recriar `scripts/postbuild-tslib.mjs` + `"postbuild"` em `package.json`.
- `vercel.json`: `buildCommand: npm run build`, `installCommand: npm install --legacy-peer-deps`, remover `outputDirectory` (o Vercel detecta `.vercel/output` automaticamente).
- Remover `wrangler.jsonc` e `nitro.config.ts` (preset vercel já está em `vite.config.ts`).
- Rodar `npm run build` e o typecheck para validar.

## Importante

A chave que estava no código deve ser considerada vazada — recomendo gerar novas chaves de API no seu Supabase depois do deploy.
