console.log("Service Worker Loaded...");


self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
    data: { 
      link: data.link,
      adv_id: data.adv_id },
    image: data.image
  });

  fetch(`/api/views/add/${data.adv_id}`)

});

self.addEventListener('notificationclick', function(event) {
  console.log(event);
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  fetch(`/api/clicks/add/${event.notification.data.adv_id}`)
  event.waitUntil(
    clients.openWindow(event.notification.data.link)
  );
});

