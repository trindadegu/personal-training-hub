import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const require = createRequire(import.meta.url);

async function copyTslib() {
  const sourceDir = path.dirname(require.resolve('tslib/package.json'));
  
  // Múltiplos destinos: onde o Nitro pode procurar
  const targets = [
    path.join(rootDir, 'dist', 'server', 'tslib'),
    path.join(rootDir, '.vercel', 'output', 'functions', '__nitro', 'tslib'),
    path.join(rootDir, '.vercel', 'output', 'functions', '__server.func', 'tslib'),
    path.join(rootDir, 'node_modules', 'tslib') // redundante
  ];
  
  for (const targetDir of targets) {
    try {
      await fs.mkdir(targetDir, { recursive: true });
      await fs.copyFile(path.join(sourceDir, 'tslib.es6.js'), path.join(targetDir, 'tslib.es6.js'));
      await fs.copyFile(path.join(sourceDir, 'package.json'), path.join(targetDir, 'package.json'));
      console.log(`[postbuild-tslib] tslib copied to ${targetDir}`);
    } catch (err) {
      console.warn(`[postbuild-tslib] Could not copy to ${targetDir}:`, err.message);
    }
  }
}

copyTslib().catch(console.error);