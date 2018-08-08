//----------------------------------------------------------------------------------------
// Adm Panel



let webpush    = require("web-push");
	fs         = require('fs'),
	mkdirp     = require('mkdirp');

async function upload(files){
	let time     = new Date(),
	    dirTime  = time.getTime(),
	    dirStr   =  Math.random()
	    				.toString(36)
	    				.slice(2, 2 + Math.max(1, Math.min(15, 25)) ),
	    finalDir = `${dirTime}${dirStr}`;

    let datesDir = `timages/${time.getFullYear()}-${parseInt(time.getMonth()+1)}-${time.getDate()}`;



    await mkdirp(`${__dirname}/../../client/${datesDir}`, (err) => { console.log(err) });
    await mkdirp(`${__dirname}/../../client/${datesDir}/${finalDir}`, (err) => { 
		if ( err ) console.log(`Trying to create dir after save, but dir already exist!`)
	});
	let newPath = `${datesDir}/${finalDir}`;
	let iconFile = files.icon;
	let imageFile = files.image;
	// Помещаем в папку
	await iconFile.mv(`${__dirname}/../../client/${newPath}/${iconFile.name}`, function(err) {
	    /*if (err)
	        console.log(err)*/
	});
	await imageFile.mv(`${__dirname}/../../client/${newPath}/${imageFile.name}`, function(err) {
	    /*if (err)
	        console.log(err)*/
	});
	return {
		icon: `/${newPath}/${iconFile.name}`,
		image: `/${newPath}/${imageFile.name}`
	}
}

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
			let query = {};
			if ( formData.countries != 'all'){
				query.countryCode = formData.countries;
			}
			if ( formData.langs != 'all'){
				query.lang = formData.langs; 
			}
			let adv_id = 'none';
			let uploadedFiles = await upload(req.files);
  		    await db.Adv.create({
  		    	name: formData.name, 
		    	title: formData.title, 
		    	body: formData.body,
		    	icon: uploadedFiles.icon,
				image: uploadedFiles.image,
		    	offer: formData.offer,
		    	country: formData.countries,
		    	lang: formData.langs
		    })
		   	.then(data => {
		   		adv_id = data._id
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
							icon: uploadedFiles.icon,
							image: uploadedFiles.image,  
							link: reqURL,
							adv_id: adv_id
						});
						webpush
						    .sendNotification(subscription, payload)
						    .catch(err => {
						    	db.Users.remove({endpoint: subscription.endpoint})
						    		.then(data => {
						    			// Nothing
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
							res.render('adm', { nUsers: users.length, status: 'success', advId: adv_id, postback: config.POSTBACK });
						})
					
					
				})
		}
		else{
			res.redirect('/adm/login');
		}
		
	})
}