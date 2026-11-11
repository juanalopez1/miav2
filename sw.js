// Para publicar una actualización: cambiá VERSION (y la de index.html) y volvé a desplegar.
const VERSION='6.0.0',C='mia-'+VERSION,F='fonts-v1',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png','favicon-32.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A))));
self.addEventListener('message',e=>{if(e.data==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!==F).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin!==location.origin){if(/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname))e.respondWith(caches.open(F).then(c=>c.match(r).then(h=>h||fetch(r).then(n=>{c.put(r,n.clone());return n}))));return}
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(h=>h||fetch(r).catch(()=>caches.match('index.html'))))});
