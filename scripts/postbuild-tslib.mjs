import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const require = createRequire(import.meta.url);

async function copyTslib() {
  const sourceDir = path.dirname(require.resolve('tslib/package.json'));
  const targetDir = path.join(rootDir, 'dist', 'server', 'tslib');

  await fs.mkdir(targetDir, { recursive: true });
  await fs.copyFile(path.join(sourceDir, 'tslib.es6.js'), path.join(targetDir, 'tslib.es6.js'));
  await fs.copyFile(path.join(sourceDir, 'package.json'), path.join(targetDir, 'package.json'));

  console.log('[postbuild-tslib] tslib copied to', targetDir);
}

copyTslib().catch(console.error);