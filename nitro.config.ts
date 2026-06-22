import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  preset: "vercel",
  srcDir: "src",
  scanDirs: ["src/server"],
  routeRules: {
    "/**": { ssr: true },
  },
});
