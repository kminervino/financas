/* sw.js — "service worker": guarda o casco do app (index.html, ícones, manifest) para ele abrir
   sem internet. NÃO guarda dados financeiros: eles ficam no banco do navegador (IndexedDB).
   Versão 1.1.0 · conteúdo d06ea3204f. Quando o app muda, este arquivo muda junto e o navegador
   instala a versão nova; o app mostra o aviso "Há uma versão nova" e só troca quando você tocar. */
'use strict';
const CACHE = 'financas-1.1.0-d06ea3204f';
const ARQUIVOS = ['./', './index.html', './manifest.webmanifest', './icone-192.png', './icone-512.png', './icone-maskable-512.png', './icone-180.png'];

self.addEventListener('install', (ev) => {
  ev.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARQUIVOS)));
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil(caches.keys()
    .then((chaves) => Promise.all(chaves.filter((k) => k.startsWith('financas-') && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('message', (ev) => {
  if (ev.data && ev.data.tipo === 'pular-espera') self.skipWaiting();
});

self.addEventListener('fetch', (ev) => {
  const req = ev.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // pedidos para fora (ex.: Google Drive) não passam pelo cache
  if (req.mode === 'navigate') {
    // abrir o app: sempre a cópia guardada (rápido e sem internet); a versão nova chega pelo aviso de atualização
    ev.respondWith(caches.match('./index.html').then((r) => r || fetch(req)));
    return;
  }
  ev.respondWith(caches.match(req, { ignoreSearch: true }).then((r) => r || fetch(req)));
});
