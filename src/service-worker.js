workbox.setConfig({debug: false});

self.__precacheManifest = [].concat(self.__precacheManifest || []);

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener('install', (event) => {
  console.log('Установлен',event);
});

self.addEventListener('activate', (event) => {
  console.log('Активирован',event);
});

/**
 * Запрос к серверу
 */
self.addEventListener('fetch', (event) => {
  console.log('Происходит запрос на сервер',event);
});

/**
 * Запрос от сервера к нам
 */
self.addEventListener('push', (event) => {
  console.log('Push',event);
});

/**
 * Сообщения к воркеру
 */
self.addEventListener('message', msg => {
     if(msg.data.action == 'skipWaiting'){
       self.skipWaiting()
     }
});