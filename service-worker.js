const CACHE_NAME = "hbnk-pwa-v5";
const urlsToCache = [
  "/HBNK/",
  "/HBNK/index.html",
  "/HBNK/HBNK.html",
  "/HBNK/index3.html",
  "/HBNK/style.css",
  "/HBNK/style2.css",
  "/HBNK/style3.css",
  "/HBNK/icon-192.png",
  "/HBNK/icon-512.png",
  "/HBNK/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

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

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});