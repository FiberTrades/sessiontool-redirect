// sessiontool.app moved to sessionterminal.com on 5 Oct 2026.
// Browsers that installed the old app's service worker fetch this file on their next visit (or
// push) and swap it in: it clears the old caches and unregisters itself, so the old address stops
// serving a cached copy of the app and its push subscription goes away. Members switch
// notifications on again at sessionterminal.com - without this, they would get every alert twice.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try { const keys = await caches.keys(); await Promise.all(keys.map((k) => caches.delete(k))); } catch (e) {}
    try { await self.registration.unregister(); } catch (e) {}
  })());
});
// Until it is gone, never answer from a cache: every request goes to the network (the redirect pages).
self.addEventListener('fetch', () => {});
