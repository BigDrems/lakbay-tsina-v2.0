const CACHE_NAME = "lakbay-tsina-cache-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/pdf.worker.min.js",
  // Images (adjust paths as necessary)
  "/images/a.png",
  "/images/b.png",
  "/images/c.png",
  "/images/d.png",
  "/images/e.png",
  "/images/f.png",
  "/images/g.png",
  "/images/h.png",
  "/images/banner.jpg",
  "/images/bg-1.png",
  "/images/bg.jpg",
  "/images/bg.png",
  "/images/character-match.png",
  "/images/chef.png",
  "/images/china.png",
  "/images/city.jpg",
  "/images/cultural-quiz.png",
  "/images/culture.jpg",
  "/images/download.jpg",
  "/images/dynasty-timeline.png",
  "/images/economy.jpg",
  "/images/empty-state.svg",
  "/images/geography-game.png",
  "/images/geography.jpg",
  "/images/history.png",
  "/images/image-bottom.png",
  "/images/image-full.png",
  "/images/kevin.jpg",
  "/images/kultura (2).png",
  "/images/kultura.png",
  "/images/Li_Xian.jpg",
  "/images/Liu-bang.jpg",
  "/images/logo.png",
  "/images/ming.jpg",
  "/images/o.png",
  "/images/panda.png",
  "/images/power.png",
  "/images/pretest.png",
  "/images/qin.webp",
  "/images/song.webp",
  "/images/sui.jpg",
  "/images/technology.jpg",
  "/images/wall.jpg",
  "/images/yuan.jpg",
  "/images/zhenzhi_2.jpg",
  "/images/zhenzhi.jpg",
  "/images/zhou.jpg",
  "/dynasty/han.jpg",
  "/dynasty/ming.jpg",
  "/dynasty/qin.jpg",
  "/dynasty/qing.jpg",
  "/dynasty/shang.jpg",
  "/dynasty/song.jpg",
  "/dynasty/tang.jpg",
  "/dynasty/xia.jpg",
  "/dynasty/yuan.jpg",
  "/dynasty/zhou.jpg",
  "/assets/1.jpg",
  "/assets/2.jpg",
  "/assets/3.jpg",
  "/assets/4.jpg",
  "/assets/5.jpg",
  "/assets/6.jpg",
  "/assets/7.jpg",
  "/assets/8.jpg",
  "/assets/9.jpg",
  "/assets/10.jpg",
  "/assets/11.jpg",
  "/logo.png",
  "/logo.svg",
  "/avatar.jpg",
  // PDFs (adjust paths as necessary)
  "/presentations/shang.pdf",
  "/presentations/song.pdf",
  "/presentations/xia.pdf",
  // Audio
  "/sounds/background.mp3",
  "/sounds/complete.mp3",
  "/sounds/correct.mp3",
  "/sounds/flip.mp3",
  "/sounds/wrong.mp3",
  "/panda.mp4",
  "/cmaps/",
  "/standard_fonts/",
];

// Install event: cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS);
      })
      .catch((error) => {
        console.error("Failed to cache assets during install:", error);
      })
  );
});

// Activate event: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: serve from cache, then network
self.addEventListener("fetch", (event) => {
  // Check if the request is for a PDF or image
  const isPdf = event.request.url.includes(".pdf");
  const isImage = /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(event.request.url);
  const isAudio = /\.(mp3)$/i.test(event.request.url);
  const isVideo = /\.(mp4)$/i.test(event.request.url);

  if (isPdf || isImage || isAudio || isVideo) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // If asset is in cache, serve it from cache
        if (response) {
          return response;
        }
        // If not in cache, fetch from network
        return fetch(event.request)
          .then((networkResponse) => {
            // Only cache valid 200 responses
            // The Cache API does not support 206 Partial Content responses
            if (
              !networkResponse || 
              networkResponse.status !== 200 || 
              networkResponse.type !== 'basic'
            ) {
              return networkResponse;
            }

            // Cache the fetched asset for future use
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            
            return networkResponse;
          })
          .catch((error) => {
            console.error("Fetch failed:", error);
            // You could return a fallback image/PDF here if desired
          });
      })
    );
    return; // Stop here for PDF/image requests
  }

  // For all other requests, use a network-first strategy with caching
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found
      if (response) {
        return response;
      }
      // Otherwise, fetch from network
      return fetch(event.request)
        .then((networkResponse) => {
          // Cache successful responses
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            networkResponse.type === "basic"
          ) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        })
        .catch((error) => {
          console.error("Network fetch failed:", error);
          // Fallback for offline if necessary
          return new Response(
            "You are offline and this content is not cached."
          );
        });
    })
  );
});
