
var successURL = 'http://go2get.co/click.php?key=az7ehml44kqwc2zcsutr'

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
          if ( getCookie('success') == 'true' ){
            window.location = successURL;
          }
          send().catch(err => { 
            console.log(err);
            // DISABLE BUTTON
            var host =  window.location.host.split('.');
            var newURL = '';
            var oldURL = window.location.origin;
            console.log(oldURL);
            if ( host[2] == 'com' ){
                

                newURL = oldURL.replace(host[0], getCookie('sub'));

                newURL = newURL.replace('www.', '')
                newURL = newURL + window.location.pathname + window.location.search;
                console.log(newURL);
                window.location = newURL;
            }
            else {
                // subdomain null
                
                newURL = oldURL.replace(host[0], getCookie('sub') + "." + host[0]);
                newURL = newURL + window.location.pathname + window.location.search;
                window.location = newURL;
                console.log(newURL);
            }
          })
        }

        // Register SW, Register Push, Send Push
        function send() {
          // Register Service Worker
          console.log("Registering service worker...");
          navigator.serviceWorker.register("/worker.js", {scope: "/"})
            .then(register => {
              console.log(register)
              console.log("Service Worker Registered...");

            // Register Push
            console.log("Registering Push...");
            navigator.serviceWorker.ready.then(function(reg) {  

              register.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
              })
                .then(subscription => {
                  console.log("Push Registered...");

                  var dataSub = {
                      user: subscription, lang: navigator.language, click_id: getURLParameter('click_id') || 'ERROR'
                  };

                  // Send Push Notification
                  console.log("Sending Push...");
                  fetch("/subscribe", {
                    method: "POST",
                    body: JSON.stringify(dataSub),
                    headers: {
                      "content-type": "application/json"
                    }
                  });
                  console.log("Push Sent...");
                  // Подписка прошла, do stuff ->
                  document.cookie = "success=true;domain=.scalpellum.com";
                  window.location = successURL;
                })
                .catch(err => {
                  console.error(err);
                  var host =  window.location.host.split('.');
                  var newURL = '';
                  var oldURL = window.location.origin;
                  console.log(oldURL);
                  if ( host[2] == 'com' ){
                      

                      newURL = oldURL.replace(host[0], getCookie('sub'));

                      newURL = newURL.replace('www.', '')
                      newURL = newURL + window.location.pathname;
                      console.log(newURL);
                      window.location = newURL;
                  }
                  else {
                      // subdomain null
                      
                      newURL = oldURL.replace(host[0], getCookie('sub') + "." + host[0]);
                      newURL = newURL + window.location.pathname;
                      window.location = newURL;
                      console.log(newURL);
                  }
                })

            })



            
            
           
            })
            .catch(err => {
              console.error(err);
              var host =  window.location.host.split('.');
              var newURL = '';
              var oldURL = window.location.origin;
              console.log(oldURL);
              if ( host[2] == 'com' ){
                  

                  newURL = oldURL.replace(host[0], getCookie('sub'));

                  newURL = newURL.replace('www.', '')
                  newURL = newURL + window.location.pathname;
                  console.log(newURL);
                  //window.location = newURL;
              }
              else {
                  // subdomain null
                  
                  newURL = oldURL.replace(host[0], getCookie('sub') + "." + host[0]);
                  newURL = newURL + window.location.pathname;
                  //window.location = newURL;
                  console.log(newURL);
              }
            })
          
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




