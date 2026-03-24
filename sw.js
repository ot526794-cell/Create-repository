// ============================================================
// Pensionados MX — Service Worker v15
// Al cambiar CACHE_NAME, todos los dispositivos descargan
// automáticamente la versión nueva al abrir la app.
// ============================================================

const CACHE_NAME = 'pensionados-v15';
const CACHE_OLD  = ['pensionados-v14','pensionados-v13','pensionados-v12','pensionados-v11'];

// Archivos que se guardan en caché para modo offline
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fira+Code:wght@400;500;600&display=swap'
];

// ── INSTALL: guarda todos los assets en caché ──
self.addEventListener('install', event => {
  console.log('[SW v15] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW v15] Guardando archivos en caché');
        return cache.addAll(ASSETS);
      })
      .then(() => {
        console.log('[SW v15] Instalado. Activando...');
        return self.skipWaiting();
      })
  );
});

// ── ACTIVATE: elimina cachés viejos ──
self.addEventListener('activate', event => {
  console.log('[SW v15] Activado. Limpiando cachés viejos...');
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW v15] Eliminando caché viejo:', key);
            return caches.delete(key);
          })
      ))
      .then(() => {
        console.log('[SW v15] Listo. Tomando control de todos los clientes.');
        return self.clients.claim();
      })
  );
});

// ── FETCH: Network-First para index.html, Cache-First para el resto ──
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('chrome-extension')) return;

  const url = new URL(event.request.url);
  const isNavigation = event.request.mode === 'navigate';
  const isLocal = url.origin === self.location.origin;

  // index.html: siempre intenta la red primero (versión más nueva)
  if (isNavigation || (isLocal && url.pathname.endsWith('index.html'))) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return res;
        })
        .catch(() => {
          console.log('[SW v15] Sin red → caché:', event.request.url);
          return caches.match('./index.html');
        })
    );
    return;
  }

  // Resto: caché primero, si no hay → red
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request)
        .then(res => {
          if (!res || res.status !== 200 || res.type === 'opaque') return res;
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return res;
        })
        .catch(() => {
          if (event.request.destination === 'document')
            return caches.match('./index.html');
        });
    })
  );
});

// ── MESSAGE: forzar actualización desde la app ──
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});
