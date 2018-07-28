//----------------------------------------------------------------------------------------
// Adm Panel


let webpush = require("web-push");

module.exports = (app, db) => {
	app.get('/adm/panel', (req, res) => {
		if ( req.session.userData ){
			db.Users.get({action: 'empty'})
				.then(data => {
					let nView = 0;	// Колво отправленных пушей без ошибок
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
						/*webpush
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
						nView++;*/
					});
					res.render('adm', { nUsers: data.length });
					
				})
		}
		else {
			res.redirect('/adm/login')
		}
		

	})
	app.post('/adm/panel', (req, res) => {
		if ( req.session.userData ){
			let formData = req.body;
			console.log(formData);
			let query = {};
			if ( formData.countries != 'all'){
				query.countryCode = formData.countries;
			}
			if ( formData.langs != 'all'){
				query.lang = formData.langs; 
			}
			db.Users.get({action: 'params', data: query})
				.then(data => {
					let nView = 0;	// Кол-во отправленных пушей без ошибок
					data.forEach(function(item, i, arr) {
					  	let subscription = { 
					  		endpoint: item.endpoint,
	  						expirationTime: null,
						    keys: { 
						    	p256dh: item.p256dh,
						     	auth: item.auth
						 	} 
						}
						const payload = JSON.stringify({ 
							title: formData.title, 
							body: formData.body, 
							icon: formData.iconsrc,
							image: formData.imgsrc,  
							link: formData.offer 
						});
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
					console.log(nView);
					db.Users.get({action: 'empty'})
						.then(users => {
							res.render('adm', { nUsers: users.length, sendedN: nView });
						})
					
					
				})
		}
		else{
			res.redirect('/adm/login');
		}
		
	})
}