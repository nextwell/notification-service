console.log("Service Worker Loaded...");


self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
    data: data.link
  });

});

self.addEventListener('notificationclick', function(event) {
  console.log(event);
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data)
  );
});

