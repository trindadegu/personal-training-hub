import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Vercel Build Output API: the SSR bundle contains bare `import "tslib"`
// statements but tslib is NOT installed in the deployed function. Copy the
// real tslib package into the function's node_modules so Node can resolve it.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const fnDir = path.join(root, ".vercel/output/functions/__server.func");

if (!fs.existsSync(fnDir)) {
  console.log("[postbuild-tslib] No Vercel function output, skipping.");
  process.exit(0);
}

const src = path.join(root, "node_modules/tslib");
const dest = path.join(fnDir, "node_modules/tslib");

if (!fs.existsSync(src)) {
  console.error("[postbuild-tslib] tslib not found in node_modules.");
  process.exit(1);
}

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.cpSync(src, dest, { recursive: true, force: true });

// Also overwrite the empty _libs/tslib.mjs stub with the real ESM content,
// in case anything imports it relatively.
const stub = path.join(fnDir, "_libs/tslib.mjs");
const realEsm = path.join(src, "tslib.es6.mjs");
if (fs.existsSync(stub) && fs.existsSync(realEsm)) {
  fs.copyFileSync(realEsm, stub);
}

console.log("[postbuild-tslib] tslib installed into Vercel function bundle.");