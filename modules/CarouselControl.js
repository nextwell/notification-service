let setInterval = require('safe-timers').setInterval,
	webpush     = require("web-push"),
	moment 		= require('moment-timezone');


var timezone = 'Europe/Moscow';



function compareTime(str1, str2){
    if(str1 === str2){
        return 0;
    }
    var time1 = str1.split(':');
    var time2 = str2.split(':');
    if(eval(time1[0]) > eval(time2[0])){
        return 1;
    } else if(eval(time1[0]) == eval(time2[0]) && eval(time1[1]) > eval(time2[1])) {
        return 1;
    } else {
        return -1;
    }
}




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
		this.prev = null;	// после 10:00
		this.next = null;	// перед 24:00
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
			this.prev = data.object.prev;
			this.next = data.object.next;
		}

	}

	add(data){
		 this.db.Carousel.create({ 
		 		name: data.name,  
		    	advs: data.advs,
		    	timer: data.timer,
		    	prev: data.prev,
		    	next: data.next
		    })
	  	    .then( data => {
	  		    this.object = data;
	  		    this.prev = data.prev;
	  		    this.next = data.next;
	  		    this.timeValue = data.timer * 60 * 1000;
	  		    if ( data.status == 'active' ) this.startTimer();
				
	  	    })
	  	    .catch( err => {
	  		    console.log('ERROR creating Carousel');
	  	    })
	}

	async sendPush(){
		var now = moment().utc();
		if ( 
			( compareTime(this.prev, now.tz(timezone).format('HH:mm').toString()) == -1 ) 
										&&
			( compareTime(this.next, now.tz(timezone).format('HH:mm').toString()) == 1 )
		){


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
			
		}
		else console.log("SKIP Carousel_ID: " + this.object._id);

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
		// this.mathStats();
	}

	async mathStats(){

		

		this.stats.totalViews = 0;
		this.stats.totalClicks = 0;
		this.stats.advs = [];
		await this.object.advs.forEach(async (item, i, array) => {
			await this.db.Adv.get({action: 'params', data: {_id: item} })
				.then(adv => {
					this.stats.totalViews = this.stats.totalViews + adv.views;				// errors, fix later
					this.stats.totalClicks = this.stats.totalClicks + adv.clicks;			// errors, fix later
					this.stats.advs.push(adv);												// errors, fix later
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