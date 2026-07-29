// Minimal Service Worker to fulfill PWA installability requirements.
//
// NOTE: Intentionally NO `fetch` handler. A pass-through
// `event.respondWith(fetch(event.request))` handler adds latency to every
// request and breaks HTTP range requests (206) used for streaming the hero
// video. A no-op SW still satisfies installability without that cost.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
