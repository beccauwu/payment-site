const staticCacheName = "django-pwa-v" + new Date().getTime();
origin = window.location.origin;
const filesToCache = [
  origin + "/static/img/icons/icon-160x160.png",
  origin + "/static/img/icons/icon-256x256.png",
  origin + "/static/img/icons/icon-384x384.png",
  origin + "/static/img/icons/icon-512x512.png",
  origin + "/static/img/splashscreens/iphone5_splash.png",
  origin + "/static/img/splashscreens/iphone6_splash.png",
  origin + "/static/img/splashscreens/iphoneplus_splash.png",
  origin + "/static/img/splashscreens/iphonex_splash.png",
  origin + "/static/img/splashscreens/iphonexr_splash.png",
  origin + "/static/img/splashscreens/iphonexsmax_splash.png",
  origin + "/static/img/splashscreens/ipad_splash.png",
  origin + "/static/img/splashscreens/ipadpro1_splash.png",
  origin + "/static/img/splashscreens/ipadpro3_splash.png",
  origin + "/static/img/splashscreens/ipadpro2_splash.png",
];

self.addEventListener("install", (event) => {
  this.skipWaiting();
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith("django-pwa-"))
          .filter((cacheName) => cacheName !== staticCacheName)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
      .catch(() => {
        return caches.match("offline");
      })
  );
});
