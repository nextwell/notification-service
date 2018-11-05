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
		this.db = data.db;
		this.object = null;
		if ( data.object ) {
			this.object = data.object;
		}
	}

	add(data){
		 this.db.Carousel.create({ 
		 		name: data.name, 
		    	title: data.title, 
		    	advs: data.advs,
		    	timer: data.timer
		    })
	  	    .then( data => {
	  		    this.object = data;
	  	    })
	  	    .catch( err => {
	  		    console.log('ERROR creating Carousel');
	  	    })
	}


}

module.exports.CarouselControl = CarouselControl;


module.exports.loadCarousels = loadCarousels;