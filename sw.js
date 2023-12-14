// service-worker.js

const cacheName = 'cache-v1';
const filesToCache = [
    '/',
    '/index.html',
    'css/styles.css',
    'js/app.js',
    'js/fetchApi.js',
    'images/icons'
];

self.addEventListener('install', event => {
    console.log('[Service Worker] Installing service worker...', event);
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log('[Service Worker] Caching app shell...');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('[Service Worker] Activating service worker...', event);
    return self.clients.claim();
});

self.addEventListener('fetch', event => {
    console.log('[Service Worker] Fetching', event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('fetch', event => {
    console.log('[Service Worker] Fetching', event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(fetchResponse => {
                return caches.open(cacheName).then(cache => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        })
    );
});