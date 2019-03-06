// version 
var appVersion = '1.2';
// files to cache
var files = [
    './',
    './index.html',
    './login.html',
    './sale.html',
    './signUp.html',
    './scripts/app.js',
    './images/23_OLX-512 (1).png',
    './images/favicon.ico',
    './images/Untitled.png'
]
//install

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(appVersion)
            .then(cache => {
                return cache.addAll(files)
                    .catch(err => {
                        console.err(err)
                    })
            })
    )
    console.log('service worker installed');
    self.skipWaiting()
})
//activate
self.addEventListener('activate',event=>{
    event.waitUntil(
        caches.keys()
        .then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cache=>{
                    if(cache != appVersion){
                        console.info('deleting old caches',cache);
                        return cache.delete(cache)
                    }
                })
            )
        })
    )
    return self.clients.claim();
})

// fetch 

self.addEventListener('fetch',event=>{
    console.info('sw fetch', event.request.url );
    event.respondWith(
        caches.match(event.request)
        .then(res=>{
            return res|| fetch(event.request)
        })
    )
})

