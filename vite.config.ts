import dotenv from "dotenv";
dotenv.config();
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";       // <-- importe o plugin nitro

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Adicione a seção `vite` com o plugin nitro
  vite: {
    plugins: [
      nitro({
        preset: "vercel",
        output: {
          dir: ".vercel/output",
          serverDir: ".vercel/output/functions/__server.func",
          publicDir: ".vercel/output/static",
        },
      }),
    ],
  },
});