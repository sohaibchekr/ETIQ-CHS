const CACHE_NAME = 'gest-labo-v1.2';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './logo.PNG',
    './sohaib.jpeg'
];

// Installation
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
    );
});

// Activation
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        })
    );
    return self.clients.claim();
});

// Fetch (Network First strategy to ensure index.html is always fresh)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});

