import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function walkDir(dir, callback) {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        await walkDir(fullPath, callback);
      } else if (file.isFile() && (file.name.endsWith('.js') || file.name.endsWith('.mjs'))) {
        await callback(fullPath);
      }
    }
  } catch (err) {
    // Diretório não existe, ignora
  }
}

async function fixTslibImports() {
  const targetDirs = [
    path.join(rootDir, '.vercel', 'output', 'functions', '__server.func'),
    path.join(rootDir, '.vercel', 'output', 'functions', '__nitro')
  ];

  let totalModified = 0;

  for (const targetDir of targetDirs) {
    if (!(await fs.stat(targetDir).catch(() => false))) continue;

    await walkDir(targetDir, async (filePath) => {
      let content = await fs.readFile(filePath, 'utf8');
      let original = content;

      // Substitui import "tslib"; ou import 'tslib';
      content = content.replace(/import\s+["']tslib["']\s*;?/g, 'import "./tslib.js";');
      // Substitui import * as tslib from "tslib"
      content = content.replace(/import\s+\*\s+as\s+(\w+)\s+from\s+["']tslib["']/g, 'import * as $1 from "./tslib.js"');
      // Substitui import { algo } from "tslib"
      content = content.replace(/import\s*\{([^}]*)\}\s*from\s+["']tslib["']/g, 'import {$1} from "./tslib.js"');
      // Substitui require("tslib")
      content = content.replace(/require\(["']tslib["']\)/g, 'require("./tslib.js")');

      if (content !== original) {
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`[fix-tslib] ✅ Modificado: ${path.relative(rootDir, filePath)}`);
        totalModified++;
      }
    });
  }

  console.log(`[fix-tslib] Total de arquivos modificados: ${totalModified}`);
}

fixTslibImports().catch(console.error);