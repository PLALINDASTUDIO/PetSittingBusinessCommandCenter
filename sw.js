/* Pet Sitting Business Command Center — Plalinda Studio (isolated cache) */
const CACHE_NAME='plalinda-pet-sitting-cc-integrated-v3-20261021';
const SHELL=['./index.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('plalinda-pet-sitting-cc-')&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==self.location.origin)return; if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE_NAME).then(c=>c.put('./index.html',copy))}return r}).catch(()=>caches.match('./index.html')));return;}e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res.ok)caches.open(CACHE_NAME).then(c=>c.put(e.request,res.clone()));return res}))) });
