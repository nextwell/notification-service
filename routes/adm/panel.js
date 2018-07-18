//----------------------------------------------------------------------------------------
// Adm Panel


let webpush = require("web-push");

module.exports = (app, db) => {
	app.get('/adm/panel', (req, res) => {
		db.Users.get({action: 'empty'})
			.then(data => {
				let nView = 0;
				data.forEach(function(item, i, arr) {
				  	let subscription = { 
				  		endpoint: item.endpoint,
  						expirationTime: null,
					    keys: { 
					    	p256dh: item.p256dh,
					     	auth: item.auth
					 	} 
					}
					const payload = JSON.stringify({ title: 'Web Push Title', body: 'Web push body', icon: 'http://image.ibb.co/frYOFd/tmlogo.png', link: 'https://google.com/' });
					webpush
					    .sendNotification(subscription, payload)
					    .catch(err => {
					    	nView--;
					    	db.Users.remove({endpoint: subscription.endpoint})
					    		.then(data => {
					    			console.log(data);
					    		})
					    		.catch(err => {
					    			console.log(err);
					    		})
					    });
					nView++;
				});
				res.render('main', { nUsers: data.length, nView: nView });
				
			})

	})
}