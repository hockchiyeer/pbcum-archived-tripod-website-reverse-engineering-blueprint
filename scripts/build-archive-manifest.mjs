#!/usr/bin/env node
/**
 * Generates src/data/archiveManifest.generated.json from the archived site in ./site
 * (the original PBCUM archive, served at "/" by Vite via `publicDir: 'site'`).
 *
 * The file tree, file counts and page list shown in the app are derived from this manifest,
 * so they can never drift from the real folder structure again.
 *
 *   node scripts/build-archive-manifest.mjs          # (re)generate
 *   node scripts/build-archive-manifest.mjs --check  # exit 1 if the committed manifest is stale
 */
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'site');
const OUT = join(ROOT, 'src', 'data', 'archiveManifest.generated.json');

const KIND = {
  '.htm': 'page', '.html': 'page',
  '.gif': 'image', '.jpg': 'image', '.jpeg': 'image', '.png': 'image',
  '.js': 'script', '.css': 'style', '.doc': 'document',
};

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name, 'en'))
    .flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
}

function decode(buf) {
  try { return new TextDecoder('utf-8', { fatal: true }).decode(buf); }
  catch { return new TextDecoder('gb18030').decode(buf); }   // untouched original archive pages
}

/** Pages whose first heading is not a usable title (design drafts, popups, saved third-party page). */
const TITLE_OVERRIDES = {
  '/index.htm': '主页',
  '/index_test.htm': '主页设计稿 (test)', '/index1.htm': '主页设计稿 1', '/index2.htm': '主页设计稿 2',
  '/index3.htm': '主页设计稿 3', '/index4.htm': '主页设计稿 4', '/indexcss.htm': '主页 (CSS 版本)',
  '/marquee_function.htm': '滚动字幕函数说明', '/Tripod.htm': 'Tripod 占位页 (第三方存档)',
  '/exco.htm': '执委会名单', '/structureexco.htm': '执委会组织架构', '/structure.htm': '学会组织架构',
  '/unit.htm': '学会各小组 (一)', '/unit2.htm': '学会各小组 (二)',
  '/bulletin.htm': '学会会讯', '/wenxian.htm': '学会文献', '/song.htm': '学会会歌', '/photo.htm': '学会掠影',
};

const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

/** Best-effort human title: first <strong>/<b>/<big> heading that is not the society name. */
function pageTitle(html, fallback) {
  // drop the shared blue sidebar (society name + nav links) so it cannot be mistaken for the page heading
  html = html.replace(/<td\b[^>]*bgcolor=["']?#6699ff["']?[^>]*>[\s\S]*?<\/td>/i, '');
  for (const m of html.matchAll(/<(strong|b|big)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const t = strip(m[2]);
    if (t && t.length < 40 && t !== '马大华文学会') return t;
  }
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return (m && strip(m[1])) || fallback;
}

const files = walk(SITE).map((abs) => {
  const rel = relative(SITE, abs).split('\\').join('/');
  const ext = extname(rel).toLowerCase();
  const kind = KIND[ext] ?? 'other';
  const entry = { path: '/' + rel, size: statSync(abs).size, kind };
  if (kind === 'page') {
    const html = decode(readFileSync(abs));
    entry.title = TITLE_OVERRIDES[entry.path] ?? pageTitle(html, basename(rel, ext));
  }
  return entry;
});

const folders = {};
for (const f of files) {
  const parts = f.path.split('/').filter(Boolean);
  for (let i = 1; i < parts.length; i++) {
    const p = '/' + parts.slice(0, i).join('/');
    folders[p] = (folders[p] ?? 0) + 1;       // recursive file count per folder
  }
}

const manifest = {
  generatedBy: 'scripts/build-archive-manifest.mjs',
  root: { path: '/', fileCount: files.length },
  folders,
  files,
};

const json = JSON.stringify(manifest, null, 1) + '\n';
if (process.argv.includes('--check')) {
  const cur = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
  if (cur !== json) { console.error('archiveManifest.generated.json is stale: run `npm run manifest`'); process.exit(1); }
  console.log(`manifest OK (${files.length} files)`);
} else {
  writeFileSync(OUT, json);
  console.log(`wrote ${relative(ROOT, OUT)}: ${files.length} files, ${files.filter((f) => f.kind === 'page').length} pages`);
}
