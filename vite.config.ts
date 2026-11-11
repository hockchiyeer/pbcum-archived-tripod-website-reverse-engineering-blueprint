import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

/**
 * The archive in ./site is kept byte-identical to the original (GB2312 / Big5 pages). Vite would label every .htm as
 * UTF-8, which garbles them, so archive pages are served with the charset they declare in their own <meta>.
 * (For production hosting, serve the .htm files with the same charset, or send none and let the <meta> decide.)
 */
function archiveCharset(rootDir: (server: { config: { root: string; build: { outDir: string } } }, preview: boolean) => string): Plugin {
  const handler = (root: string): import('connect').NextHandleFunction => (req, res, next) => {
    const url = decodeURIComponent((req.url ?? '').split('?')[0]);
    if (!/\.(htm|html|js|css)$/i.test(url)) return next();
    const file = path.join(root, url);
    if (!file.startsWith(root) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return next();
    const buf = fs.readFileSync(file);
    const isPage = /\.html?$/i.test(url);
    const declared = buf.subarray(0, 4096).toString('latin1').match(/charset=([\w-]+)/i)?.[1]?.toLowerCase();
    const type = isPage ? 'text/html' : /\.css$/i.test(url) ? 'text/css' : 'text/javascript';
    // pages: their declared charset; scripts/styles: no charset, so they inherit the page's
    res.setHeader('Content-Type', isPage && declared ? `${type}; charset=${declared}` : type);
    res.setHeader('Content-Length', buf.length);
    res.end(buf);
  };
  return {
    name: 'pbcum-archive-charset',
    configureServer(server) { server.middlewares.use(handler(rootDir(server as never, false))); },
    configurePreviewServer(server) { server.middlewares.use(handler(rootDir(server as never, true))); },
  };
}

export default defineConfig(() => {
  return {
    // The archived site in ./site is served verbatim at the web root (/index.htm, /activity/13thquanwen.htm,
    // /image/..., ...), so every original URL resolves. There is no separate public/ copy any more.
    publicDir: 'site',
    plugins: [
      react(),
      tailwindcss(),
      archiveCharset((server, preview) => preview
        ? path.resolve(server.config.root, server.config.build.outDir)
        : path.resolve(server.config.root, 'site')),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
