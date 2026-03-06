const CACHE_NAME = "hbnk-pwa-v5";

const urlsToCache = [
  "./",
  "./index.html",
  "./HBNK.html",
  "./index3.html",
  "./style3.css",
  "./style2.css",
  "./style4.css",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
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