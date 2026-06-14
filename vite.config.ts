import dotenv from "dotenv";
dotenv.config();
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    tailwindcss(),          // <-- ADICIONE ESTA LINHA
    tanstackStart({
      server: { entry: "server" },
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
});