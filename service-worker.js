const CACHE_NAME = "hbn-smartgrid-v1";

// Tous les fichiers à mettre en cache
const urlsToCache = [
  "index.html",       // page 1
  "HBNK.html",        // page 2
  "index3.html",      // page 3
  "style2.css",       // CSS de la page 2
  "style3.css",       // CSS de la page 1
  "style4.css",       // CSS de la page 3

  "images/logo17.jpg",// logo utilisé
  "icon-192.png",
  "icon-512.png"
];

// Installation du service worker et mise en cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activation du service worker et suppression des anciens caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

// Interception des requêtes pour servir depuis le cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});