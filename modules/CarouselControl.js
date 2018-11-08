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
		this.stats = {
			totalViews: 0,
			totalClicks: 0,
			advs: []
		}
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
	  		    this.timeValue = data.timer * 60 * 1000;
	  		    if ( data.status == 'active' ) this.startTimer();
				
	  	    })
	  	    .catch( err => {
	  		    console.log('ERROR creating Carousel');
	  	    })
	}

	async sendPush(){
		//console.log(this.object);
			if ( !this.object.advs[this.object.iterator] ) {
				this.db.Carousel.update({object: this.object, iterator: false})
			    this.object.iterator = 0;
			}
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
			if ( this.object.advs[this.object.iterator+1] ){
			    this.db.Carousel.update({object: this.object, iterator: true})
			    this.object.iterator = this.object.iterator + 1;
			}
			else {
			    this.db.Carousel.update({object: this.object, iterator: false})
			    this.object.iterator = 0;
			}
			this.mathStats();
	
	}

	startTimer(){
		console.log("Start timer: " + this.object._id);
		this.interval = setInterval(() => {
		    this.sendPush();
		}, this.timeValue);
		this.db.Carousel.update({object: {_id: this.object._id}, status: "active"})

		this.mathStats();

	}

	stopTimer(status){
		console.log("Stop timer: " + this.object._id);
		this.interval.clear();
		this.db.Carousel.update({object: {_id: this.object._id}, status: "stopped"})
		this.mathStats();
	}

	async mathStats(){
		this.stats.totalViews = 0;
		this.stats.totalClicks = 0;
		this.stats.advs = [];
		await this.object.advs.forEach(async (item, i, array) => {
			await this.db.Adv.get({action: 'params', data: {_id: item} })
				.then(adv => {
					this.stats.totalViews = this.stats.totalViews + adv.views;
					this.stats.totalClicks = this.stats.totalClicks + adv.clicks;
					this.stats.advs.push(adv);
				})
		})
	}

	removeAdv(id){
		// remove from object

		this.object.advs = this.object.advs.filter(item => item !== id)

		// remove from db

		this.db.Carousel.update({object: { _id: this.object._id }, updateAdvs: true, advs: this.object.advs})


	}

	addAdv(id){

		// add to object

		this.object.advs.push(id);

		// add to db
		this.db.Carousel.update({object: { _id: this.object._id }, updateAdvs: true, advs: this.object.advs})
	}

	


}

module.exports.CarouselControl = CarouselControl;


module.exports.loadCarousels = loadCarousels;