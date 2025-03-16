self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches.open("medit-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/src/main.tsx",
        "/icons/icon-192x192.png",
        "/icons/icon-512x512.png",
      ]);
    })
  );
});

self.addEventListener("fetch", (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
