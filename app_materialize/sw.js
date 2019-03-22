//nome do cache
var cacheName = 'akiexpress';

//arquivos a serem cacheados
var filesToCache = [
  "index.html",
  "categorias.html",
  "carrinho.html",
  "produto.html",
  "buscar.html",
  "imgs/logo.png",
  "imgs/load.gif",
  "imgs/icon-256.png",
  "imgs/icon-196.png",
  "imgs/icon-144.png",
  "css/materialize.min.css",
  "css/style.css",
  "js/jquery-3.2.1.min.js",
  "js/materialize.min.js",
  "js/funcoes.js",
  "js/home.js",
  "js/produto.js",
  "js/carrinho.js",
  "js/buscar.js",
  "js/categoria.js"
];

//instalando o service worker
self.addEventListener('install', function(e) {
  console.log('Service Worker Instalado');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Adicionando dados no cache');
      return cache.addAll(filesToCache);
    })
  );
});

//atualizar o cache
self.addEventListener('activate', function(e) {
  console.log('Service Worker Ativo');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('Service Worker Cache Antigo Removido', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});


//verificar se informação está disponivel no cache
self.addEventListener('fetch', function(e) {
  console.log('Service Worker Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

//retirado de https://developers.google.com/web/fundamentals/getting-started/codelabs/your-first-pwapp/?hl=pt-br
