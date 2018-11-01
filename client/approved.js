var endPoint = '';

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1] || ''
    );
}

fetch('/api/tback')
  .then(response => {
    response.json()
      .then(data => {
        endPoint = data.url;
        endPoint = endPoint.replace(new RegExp("{{click_id}}",'g'), getURLParameter('click_id'));
      })

  })


//var endPoint = 'http://go2get.co/click.php?key=az7ehml44kqwc2zcsutr';

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

if ( getCookie('sub') ) { 
  console.log("Sub: " + getCookie('sub'))
	if ( parseInt(getCookie('sub')) >= 9 ){
		window.location = endPoint;
	}
  var NewSub = parseInt(getCookie('sub'))+1;
  document.cookie = "sub=" + NewSub + ";domain=.scalpellum.com"; 			// !! DOMAIN !!
}
else {
    document.cookie = "sub=1;domain=.scalpellum.com";
} 

/*var subdomain =  window.location.host.split('.')[1] ? window.location.host.split('.')[0] : false;
if ( subdomain == false ){

}

console.log(window.location.hostname)*/