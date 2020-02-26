self.addEventListener('install', (event) => {
  console.log('Установлен',event);
});

self.addEventListener('activate', (event) => {
  console.log('Активирован',event);
});

self.addEventListener('fetch', (event) => {
  console.log('Происходит запрос на сервер',event);
});

self.addEventListener('push', (event) => {
  console.log('Push',event);
});