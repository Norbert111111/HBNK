const CACHE_NAME = "hbnk-pwa-v1";
const urlsToCache = [
  "index.html",
  "HBNK.html",
  "index3.html",
  "style.css",
  "style2.css",
  "style3.css",
  "manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});