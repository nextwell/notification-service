let setInterval = require('safe-timers').setInterval,
	webpush     = require("web-push");


async function loadCarousels(db){
	let arr = null;
	await db.Carousel.get()
		.then(data => {
			arr = data;
			
		})
		.catch(err => {
			console.log(err);
		})
	return arr;
}






class CarouselControl{
	constructor(data){
		this.interval = null;
		this.db = data.db;
		this.object = null;
		this.timeValue = null;
		if ( data.object ) {
			this.object = data.object;
			this.timeValue = data.object.timer * 60 * 1000;
			if ( data.object.status == 'active' ) this.startTimer();
			
		}

	}

	add(data){
		 this.db.Carousel.create({ 
		 		name: data.name,  
		    	advs: data.advs,
		    	timer: data.timer
		    })
	  	    .then( data => {
	  		    this.object = data;
	  		    console.log(data);
	  		    this.timeValue = data.timer * 60 * 1000;
	  		    if ( data.status == 'active' ) this.startTimer();
				
	  	    })
	  	    .catch( err => {
	  		    console.log('ERROR creating Carousel');
	  	    })
	}

	async sendPush(){
		//console.log(this.object);

			await this.db.Adv.get({action: 'params', data: {_id: this.object.advs[this.object.iterator]}})
				.then(formData => {
					//console.log(formData);
					let query = {};
					if ( formData.country != 'all'){
						query.countryCode = formData.country;
					}
					if ( formData.lang != 'all'){
						query.lang = formData.lang; 
					}
					this.db.Users.get({action: 'params', data: query})
						.then(data => {
							data.forEach((item, i, arr) => {
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
									icon: formData.icon,
									image: formData.image,  
									link: reqURL,
									adv_id: formData._id
								});
								webpush
								    .sendNotification(subscription, payload)
								    .catch(err => {
								    	this.db.Users.remove({endpoint: subscription.endpoint})
								    		.then(data => {
								    			// Nothing
								    		})
								    		.catch(err => {
								    			console.log(err);
								    		})
								    });
								   
								    
							});
							
						})
				})
				console.log(this.object.advs);
				console.log(this.object.advs[this.object.iterator+1])
			if ( this.object.advs[this.object.iterator+1] ){
			    this.db.Carousel.update({object: this.object, iterator: true})
			    this.object.iterator = this.object.iterator + 1;
			}
			else {
			    this.db.Carousel.update({object: this.object, iterator: false})
			    this.object.iterator = 0;
			}

			/*let query = {};
			if ( formData.countries != 'all'){
				query.countryCode = formData.countries;
			}
			if ( formData.langs != 'all'){
				query.lang = formData.langs; 
			}
			obj.db.Users.get({action: 'params', data: query})
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
					
					
				})*/
	
	}

	startTimer(){
		console.log("Start timer: " + this.object._id);
		this.interval = setInterval(() => {
		    this.sendPush();
		}, this.timeValue);
		this.db.Carousel.update({object: {_id: this.object._id}, status: "active"})
	}

	stopTimer(status){
		console.log("Stop timer: " + this.object._id);
		this.interval.clear();
		this.db.Carousel.update({object: {_id: this.object._id}, status: "stopped"})
	}

	


}

module.exports.CarouselControl = CarouselControl;


module.exports.loadCarousels = loadCarousels;