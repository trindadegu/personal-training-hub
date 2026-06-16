export default {
  externals: {
    inline: ['tslib']
  },
  preset: 'vercel'
};
// nitro.config.mjs
import { defineNitroConfig } from 'nitropack/config';

export default defineNitroConfig({
  preset: 'vercel',
  // Opção 1: Inlinar todas as dependências (Recomendado para Vercel Functions sem node_modules)
  inlineDynamicImports: true,
  
  // Opção 2 (Alternativa): Forçar o tslib a não ser externalizado
  noExternals: ['tslib']
});