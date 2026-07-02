export default {
  preset: "vercel",
  srcDir: "src",
  scanDirs: ["src/server"],
  routeRules: {
    "/**": { ssr: true },
  },
};
