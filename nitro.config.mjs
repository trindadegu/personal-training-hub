import { defineNitroConfig } from 'nitropack/config';

export default defineNitroConfig({
  preset: 'vercel',
  inlineDynamicImports: true,
  noExternals: ['tslib']
});
