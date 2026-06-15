import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const require = createRequire(import.meta.url);

async function copyTslibAsModule() {
  const sourceDir = path.dirname(require.resolve('tslib/package.json'));
  const sourceFile = path.join(sourceDir, 'tslib.es6.js');
  const targetDirs = [
    path.join(rootDir, '.vercel', 'output', 'functions', '__server.func'),
    path.join(rootDir, '.vercel', 'output', 'functions', '__nitro'),
    path.join(rootDir, 'dist', 'server')
  ];

  for (const targetDir of targetDirs) {
    const targetFile = path.join(targetDir, 'tslib.js');
    await fs.mkdir(targetDir, { recursive: true });
    await fs.copyFile(sourceFile, targetFile);
    console.log(`[copy-tslib-module] Copiado para ${targetFile}`);
  }
}

copyTslibAsModule().catch(console.error);