// Vercel's serverless bundle does not include `tslib` because it is only
// referenced through transpiled helpers. Copy it into the function bundle so
// the SSR entry does not fail with ERR_MODULE_NOT_FOUND at runtime.
import { cp, mkdir, access } from "node:fs/promises";
import { resolve } from "node:path";

const source = resolve("node_modules/tslib");
const targets = [
  resolve(".vercel/output/functions/__server.func/node_modules/tslib"),
  resolve(".vercel/output/functions/_ssr.func/node_modules/tslib"),
];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

if (!(await exists(source))) {
  console.warn("[postbuild] tslib not found in node_modules, skipping");
  process.exit(0);
}

let copied = 0;
for (const target of targets) {
  const funcDir = resolve(target, "../..");
  if (!(await exists(funcDir))) continue;
  await mkdir(target, { recursive: true });
  await cp(source, target, { recursive: true });
  console.log(`[postbuild] tslib copied to ${target}`);
  copied++;
}

if (copied === 0) {
  console.warn("[postbuild] no Vercel function output found, skipping tslib copy");
}
