import dotenv from "dotenv";
dotenv.config();

import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    // Gera a saída serverless do Vercel em .vercel/output
    nitro({ preset: "vercel" }),
    tanstackStart({
      server: {
        entry: "server",
      },
    }),
    react(),
  ],

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },

  ssr: {
    noExternal: ["tslib"],
  },

  optimizeDeps: {
    include: ["tslib"],
  },

  build: {
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
