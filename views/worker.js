self.addEventListener("push", e => {
    const data = e.data.json();
    self.registration.showNotification(
        data.title, // title of the notification
        {
            body: "GAB - Ecco la nuova battuta del giorno", //the body of the push notification
            image: "/images/logo.png",
            icon: "/images/icons/icon_128x128.ico" // icon 
        }
    );
});

self.addEventListener('notificationclick', function (event)
{
    //For root applications: just change "'./'" to "'/'"
    //Very important having the last forward slash on "new URL('./', location)..."
    const rootUrl = new URL('/', location).href; 
    event.notification.close();
    event.waitUntil(
        clients.matchAll().then(matchedClients =>
        {
            for (let client of matchedClients)
            {
                if (client.url.indexOf(rootUrl) >= 0)
                {
                    return client.focus();
                }
            }

            return clients.openWindow(rootUrl).then(function (client) { client.focus(); });
        })
    );
});


// Cached core static resources 
self.addEventListener("install",e=>{
    e.waitUntil(
        caches.open("static").then(cache=>{
        return cache.addAll(["./",'./images/logo.png']);
        })
    );
});

// Fatch resources
// self.addEventListener("fetch",e=>{
//     e.respondWith(
//         caches.match(e.request).then(response=>{
//         return response||fetch(e.request);
//         })
//     );
// });