//----------------------------------------------------------------------------------------
// Adm Panel



let webpush = require("web-push");
	fs      = require('fs');

module.exports = (app, db) => {
	app.get('/adm/panel', (req, res) => {
		if ( req.session.userData ){
			db.Users.get({action: 'empty'})
				.then(data => {
					let fileContents = fs.readFileSync('settings.json','utf8');
					let config = JSON.parse(fileContents);
					res.render('adm', { nUsers: data.length, postback: config.POSTBACK });
				})
		}
		else {
			res.redirect('/adm/login')
		}
		

	})
	app.post('/adm/panel', async (req, res) => {
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
			let adv_id = 'none';
  		    await db.Adv.create({
  		    	name: formData.name, 
		    	title: formData.title, 
		    	body: formData.body,
		    	icon: formData.iconsrc,
		    	image: formData.imgsrc,
		    	offer: formData.offer,
		    	country: formData.countries,
		    	lang: formData.langs
		    })
		   	.then(data => {
		   		adv_id = data._id
		   		console.log(data);
		   	})

			db.Users.get({action: 'params', data: query})
				.then(data => {
					data.forEach(function(item, i, arr) {
					  	let subscription = { 
					  		endpoint: item.endpoint,
	  						expirationTime: null,
						    keys: { 
						    	p256dh: item.p256dh,
						     	auth: item.auth
						 	} 
						}
						// Постбэк реквест в трекер
			  		    let reqURL = formData.offer;
			  		    reqURL = reqURL.replace(new RegExp("{{click_id}}",'g'), item.click_id);

						const payload = JSON.stringify({ 
							title: formData.title, 
							body: formData.body, 
							icon: formData.iconsrc,
							image: formData.imgsrc,  
							link: reqURL,
							adv_id: adv_id
						});
						webpush
						    .sendNotification(subscription, payload)
						    .catch(err => {
						    	db.Users.remove({endpoint: subscription.endpoint})
						    		.then(data => {
						    			console.log(data);
						    		})
						    		.catch(err => {
						    			console.log(err);
						    		})
						    });
					});
					db.Users.get({action: 'empty'})
						.then(users => {
							let fileContents = fs.readFileSync('settings.json','utf8');
							let config = JSON.parse(fileContents);
							res.render('adm', { nUsers: users.length, status: 'success', postback: config.POSTBACK });
						})
					
					
				})
		}
		else{
			res.redirect('/adm/login');
		}
		
	})
}