import dotenv from "dotenv";
dotenv.config();

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackStart({
      server: {
        entry: "server",
      },
      nitro: {
        preset: "vercel",
        noExternals: ["tslib"],
        inlineDynamicImports: true,
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