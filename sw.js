// v3: service worker "faxina".
// Limpa caches antigos e garante atualização imediata nos celulares dos alunos.
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