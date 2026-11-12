import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { withBase } from './lib/baseUrl';
import { installArchiveOpener } from './lib/legacyDocument';

installArchiveOpener();

// GitHub Pages labels every .htm as UTF-8; this worker re-labels the GB2312/Big5 archive pages with their declared charset
// so pop-ups / named windows / direct URLs are readable. (Dev and `vite preview` already send the right charset.)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(withBase('/pbcum-charset-sw.js'), { scope: withBase('/') }).catch(() => undefined);
  });
}

createRoot(document.getElementById('root')!).render(<App />);
