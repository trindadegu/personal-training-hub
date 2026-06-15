import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function walkDir(dir, callback) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      await walkDir(fullPath, callback);
    } else if (file.isFile() && (file.name.endsWith('.js') || file.name.endsWith('.mjs'))) {
      await callback(fullPath);
    }
  }
}

async function fixTslibImports() {
  const targets = [
    path.join(rootDir, '.vercel', 'output', 'functions', '__server.func'),
    path.join(rootDir, '.vercel', 'output', 'functions', '__nitro'),
    path.join(rootDir, 'dist', 'server')
  ];

  let totalModified = 0;

  for (const targetDir of targets) {
    if (!(await fs.stat(targetDir).catch(() => false))) continue;

    await walkDir(targetDir, async (filePath) => {
      let content = await fs.readFile(filePath, 'utf8');
      let modified = false;

      // Substitui require("tslib")
      const newContent = content.replace(/require\(["']tslib["']\)/g, 'require("./tslib/tslib.es6.js")');
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
      // Substitui from "tslib"
      const newContent2 = content.replace(/from ["']tslib["']/g, 'from "./tslib/tslib.es6.js"');
      if (newContent2 !== content) {
        content = newContent2;
        modified = true;
      }
      // Substitui import * as X from "tslib"
      const newContent3 = content.replace(/import\s+\*\s+as\s+(\w+)\s+from\s+["']tslib["']/g, 'import * as $1 from "./tslib/tslib.es6.js"');
      if (newContent3 !== content) {
        content = newContent3;
        modified = true;
      }

      if (modified) {
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`[fix-tslib] ✅ Modificado: ${path.relative(rootDir, filePath)}`);
        totalModified++;
      }
    });
  }

  if (totalModified === 0) {
    console.log('[fix-tslib] ⚠️ Nenhum arquivo modificado. Pode ser que o tslib já esteja inline ou não haja referências.');
  } else {
    console.log(`[fix-tslib] ✅ Total de arquivos modificados: ${totalModified}`);
  }
}

fixTslibImports().catch(console.error);