var endPoint = 'http://go2get.co/click.php?lp=1';

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