const CACHE = 'gitarrverktyg-v8';
const FILES = ['./index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

// Notis triggas av sidan via postMessage
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'GUITAR_REMINDER') {
    self.registration.showNotification('Dags att öva gitarr! 🎸', {
      body: 'Öppna appen och kör igenom ett par grepp.',
      icon: './icon.svg',
      badge: './icon.svg',
      tag: 'guitar-reminder',
      renotify: true,
      vibrate: [200, 100, 200]
    });
  }
});
