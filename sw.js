// ==========================================
// SERVICE WORKER — funciona offline
// Troque VERSAO sempre que atualizar os arquivos do jogo.
// ==========================================

const VERSAO = "v1";
const CACHE = `dado-${VERSAO}`;

const ARQUIVOS = [
  "./",
  "./index.html",
  "./style.css",
  "./dates.css",
  "./timer.css",
  "./script.js",
  "./dates.js",
  "./timer.js",
  "./manifest.webmanifest",
  "./logo.png",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", evento => {
  evento.waitUntil(
    caches.open(CACHE)
      // Se um arquivo faltar (ex.: logo.png), os outros continuam sendo salvos.
      .then(cache => Promise.all(ARQUIVOS.map(a => cache.add(a).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", evento => {
  evento.waitUntil(
    caches.keys()
      .then(chaves => Promise.all(
        chaves
          .filter(k => k.startsWith("dado-") && k !== CACHE)
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", evento => {
  const req = evento.request;

  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Anúncios e outros domínios passam direto, sem cache.
  if (url.origin !== self.location.origin) return;

  evento.respondWith(
    caches.match(req, { ignoreSearch: true }).then(guardado => {
      const rede = fetch(req)
        .then(resposta => {
          if (resposta && resposta.ok) {
            const copia = resposta.clone();
            caches.open(CACHE).then(cache => cache.put(req, copia));
          }
          return resposta;
        })
        .catch(() => guardado || (req.mode === "navigate" ? caches.match("./index.html") : undefined));

      // Mostra o salvo na hora e atualiza em segundo plano.
      return guardado || rede;
    })
  );
});