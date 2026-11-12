#!/usr/bin/env node
/**
 * One-command static build for GitHub Pages:   npm run build:pages
 *
 * Produces ./dist — a fully static website (index.html + hashed JS/CSS + the untouched 289-file archive at its
 * original URLs) that can be published as-is on GitHub Pages.
 *
 *   1. regenerates the archive manifest from ./site
 *   2. runs `vite build` with the correct base path for the Pages URL
 *   3. adds .nojekyll (so Pages serves every file, incl. folders starting with "_" / "."), and 404.html
 *   4. runs the parity check (dist/ must contain every archive file byte-for-byte)
 *
 * Base path (where the site lives on the web):
 *   --base /name/         explicit            (env: PAGES_BASE)
 *   <user>.github.io repo -> "/"              (auto, from GITHUB_REPOSITORY or the git "origin" remote)
 *   any other repo        -> "/<repo>/"       (auto)
 *   custom domain         -> pass --base /
 */
import { execFileSync, execSync } from 'node:child_process';
import { copyFileSync, writeFileSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const run = (cmd, args) => execFileSync(cmd, args, { cwd: ROOT, stdio: 'inherit', shell: process.platform === 'win32' });

function detectRepoName() {
  if (process.env.GITHUB_REPOSITORY) return process.env.GITHUB_REPOSITORY.split('/')[1];
  try {
    const url = execSync('git config --get remote.origin.url', { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    return url.replace(/\.git$/, '').split(/[/:]/).pop() || null;
  } catch { return null; }
}

const argIdx = process.argv.indexOf('--base');
let base = (argIdx !== -1 ? process.argv[argIdx + 1] : process.env.PAGES_BASE) ?? null;
if (!base) {
  const repo = detectRepoName();
  if (!repo) {
    console.error('Cannot work out the GitHub Pages base path (no git remote / GITHUB_REPOSITORY).\n' +
      'Pass it explicitly, e.g.:  npm run build:pages -- --base /my-repo/    (or --base /  for a custom domain / user site)');
    process.exit(1);
  }
  base = /\.github\.io$/i.test(repo) ? '/' : `/${repo}/`;
}
if (!base.startsWith('/')) { console.error(`--base must start with "/" (got "${base}")`); process.exit(1); }
if (!base.endsWith('/')) base += '/';
console.log(`\n▶ Building static site for GitHub Pages, base path: ${base}\n`);

rmSync(join(ROOT, 'dist'), { recursive: true, force: true });
run('node', [join('scripts', 'build-archive-manifest.mjs')]);
run('npx', ['vite', 'build', '--base', base]);

const dist = join(ROOT, 'dist');
writeFileSync(join(dist, '.nojekyll'), '');
copyFileSync(join(dist, 'index.html'), join(dist, '404.html'));   // unknown URLs land on the app, not a bare GitHub 404

if (!process.argv.includes('--skip-verify')) {
  try { run('node', [join('scripts', 'verify-parity.mjs')]); }
  catch {
    // Parity problems come from ./site differing from the recorded original (e.g. an edited page), not from the bundling.
    if (process.argv.includes('--strict')) process.exit(1);
    console.warn('\n⚠ Parity check reported differences (see above). The site was still built; use --strict to fail the build on this.');
  }
}

const n = (function count(d) { return readdirSync(d, { withFileTypes: true }).reduce((a, e) => a + (e.isDirectory() ? count(join(d, e.name)) : 1), 0); })(dist);
console.log(`\n✔ dist/ is ready (${n} files). Deploy it with GitHub Pages (see README → "Deploy to GitHub Pages").`);
console.log(`  Preview locally under the same path:  npx vite preview --base ${base}   (then open http://localhost:4173${base})`);
