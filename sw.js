// v3: service worker "faxina".
// O sw antigo usava cache-first e nunca atualizava: o celular ficava preso numa versão velha do app.
// Este arquivo apaga todos os caches, se desregistra e recarrega as abas abertas.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clientes = await self.clients.matchAll({ type: 'window' });
    clientes.forEach((c) => c.navigate(c.url));
  })());
});

// Sem handler de fetch: tudo vai direto para a rede.