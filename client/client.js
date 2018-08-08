


fetch('/api/publickey')
  .then(response => {
    response.json()
      .then(data => {

        function getURLParameter(name) {
            return decodeURI(
                (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1] || ''
            );
        }
        const publicVapidKey = data.publicKey;


        // Check for service worker
        if ("serviceWorker" in navigator) {
          send().catch(err => { 
            console.error(err);
            //location.reload();
          });
        }

        // Register SW, Register Push, Send Push
        async function send() {
          // Register Service Worker
          console.log("Registering service worker...");
          const register = await navigator.serviceWorker.register("/worker.js", {
            scope: "/"
          });
          console.log("Service Worker Registered...");

          // Register Push
          console.log("Registering Push...");
          const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
          });
          console.log(subscription);
          console.log("Push Registered...");

          var dataSub = {
              user: subscription, lang: navigator.language, click_id: getURLParameter('click_id') || 'ERROR'
          };

          // Send Push Notification
          console.log("Sending Push...");
          await fetch("/subscribe", {
            method: "POST",
            body: JSON.stringify(dataSub),
            headers: {
              "content-type": "application/json"
            }
          });
          console.log("Push Sent...");
          // Подписка прошла, do stuff ->
        }

        function urlBase64ToUint8Array(base64String) {
          const padding = "=".repeat((4 - base64String.length % 4) % 4);
          const base64 = (base64String + padding)
            .replace(/\-/g, "+")
            .replace(/_/g, "/");

          const rawData = window.atob(base64);
          const outputArray = new Uint8Array(rawData.length);

          for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
          }
          return outputArray;
        }




      })
  })




