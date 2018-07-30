//----------------------------------------------------------------------------------------
// Subscribe action

let request = require('request'),
	fs      = require('fs');

//----------------------------------------------------------------------------------------
// Option config

let fileContents = fs.readFileSync('settings.json','utf8');
let config = JSON.parse(fileContents);


module.exports = (app, db) => {
	app.post("/subscribe", (req, res) => {

	    const subscription = req.body;
	    console.log(subscription);
	    let userData = subscription.user;
	    const clientIP = req.headers['x-real-ip'] || req.clientIp;
	  
	  	let userLocation = {};


	    request(`http://ip-api.com/json/${clientIP}`, (error, response, body) => {
		    let data = JSON.parse(body);
		    console.log(data);
		    if ( data.status == 'fail' ){
		    	userLocation.country = 'none';
		    	userLocation.countryCode = 'none';
		    }
		    else {
		    	userLocation.country = data.country;
		    	userLocation.countryCode = data.countryCode;
		    }
		    db.Users.create({ 
		    	endpoint: userData.endpoint, 
		    	p256dh: userData.keys.p256dh, 
		    	auth: userData.keys.auth, 
		    	lang: subscription.lang, 
		    	ip: clientIP,
		    	country: userLocation.country,
		    	countryCode: userLocation.countryCode,
		    	click_id: subscription.click_id
		    })
	  	    .then( data => {
	  		    console.log(data);

	  		    // Постбэк реквест в трекер
	  		    let reqURL = config.POSTBACK;
	  		    reqURL = reqURL.replace(new RegExp("{{click_id}}",'g'), data.click_id);
	  		    request(reqURL, (error, response, body) => {
	  		    	if ( error ){
	  		    		console.log(error);
	  		    	}
	  		    })

	  	    })
	  	    .catch( err => {
	  		    console.log('ERROR || User already created');
	  	    })
	    });

	    


	    res.status(201).json({});

	  /*const payload = JSON.stringify({ title: "Push Test", link: sites[getRandom(0, 4)] });

	  webpush
	    .sendNotification(subscription, payload)
	    .catch(err => console.error(err));*/
	});
}