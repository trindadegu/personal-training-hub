import dotenv from "dotenv";
dotenv.config();
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { resolve } from "path";
import fs from 'fs';

// Plugin para copiar tslib para a saída do SSR (solução paliativa)
function copyTslibPlugin() {
  return {
    name: 'copy-tslib',
    writeBundle() {
      const src = resolve(__dirname, 'node_modules/tslib');
      const dest = resolve(__dirname, 'dist/server/tslib');
      if (fs.existsSync(src)) {
        fs.cpSync(src, dest, { recursive: true, force: true });
        console.log('[copy-tslib] tslib copied to dist/server/tslib');
      }
    }
  };
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
    copyTslibPlugin(), // Adicionado
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  ssr: {
    noExternal: ['tslib'],
  },
  optimizeDeps: {
    include: ['tslib'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/tslib')) {
            return 'tslib';
          }
        },
      },
    },
  },
});