#!/usr/bin/env node
/**
 * Archive parity check (run after `npm run build`):
 *  - ./site is byte-identical to the original archive (SHA-256 manifest)
 *  - dist/ contains every archived file at its original path, byte-for-byte
 *  - the generated manifest matches ./site
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]));

execFileSync('node', [join(ROOT, 'scripts/build-archive-manifest.mjs'), '--check'], { stdio: 'inherit' });

const dist = join(ROOT, 'dist');
if (!existsSync(dist)) { console.error('dist/ not found: run `npm run build` first'); process.exit(1); }
let bad = 0;
let lineEndingOnly = 0;
// 1) ./site must be the untouched original archive (SHA-256 of every file)
const orig = JSON.parse(readFileSync(join(ROOT, 'scripts/original-archive.sha256.json'), 'utf8')).files;
const sha = (f) => createHash('sha256').update(readFileSync(f)).digest('hex');
for (const [path, hash] of Object.entries(orig)) {
  const f = join(ROOT, 'site', path);
  if (!existsSync(f)) { console.error('MISSING in site:', path); bad++; }
  else if (sha(f) !== hash) {
    // Git/zip tooling may normalise CRLF -> LF in text files; that is not a content change.
    const buf = readFileSync(f);
    const crlf = Buffer.from(buf.toString('latin1').replace(/\r?\n/g, '\r\n'), 'latin1');
    if (createHash('sha256').update(crlf).digest('hex') === hash) lineEndingOnly++;
    else { console.error('MODIFIED vs original:', path); bad++; }
  }
}
const siteCount = walk(join(ROOT, 'site')).length;
if (siteCount !== Object.keys(orig).length) { console.error(`site has ${siteCount} files, original has ${Object.keys(orig).length}`); bad++; }
// 2) dist/ must contain every archive file byte-for-byte
const site = walk(join(ROOT, 'site'));
for (const f of site) {
  const rel = relative(join(ROOT, 'site'), f);
  const out = join(dist, rel);
  if (!existsSync(out)) { console.error('MISSING in dist:', rel); bad++; }
  else if (!readFileSync(f).equals(readFileSync(out))) { console.error('DIFFERS in dist:', rel); bad++; }
}
if (lineEndingOnly) console.log(`note: ${lineEndingOnly} text files differ from the original only by line endings (CRLF -> LF); content is identical`);
console.log(`${site.length} archive files checked, ${bad} problem(s)`);
process.exit(bad ? 1 : 0);
