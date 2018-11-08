let mongoose = require('mongoose'),
	Carousels 	 = require('./../models/Carousel.js');

const Carousel = mongoose.model('Carousel');



//----------------------------------------------------------------------------------------
// Create new adv

module.exports.create = (data) => {
	let carousel = new Carousel({
		name: data.name,
		createdAt: new Date(),
		status: "active",
		iterator: 0,
		advs: data.advs,
		timer: parseInt(data.timer)
	});
	let promise = carousel.save();
    return promise;
}


//----------------------------------------------------------------------------------------
// Get Carousel information

module.exports.get = (settings = {}) => {
	console.log(`FIND Carousel: ${JSON.stringify(settings)}`)
	//console.log(Carousel.find(settings))
	return Carousel.find(settings);
}

//----------------------------------------------------------------------------------------
// Remove Carousel

module.exports.remove = (settings) => {
	return Carousel.findOneAndRemove(settings);
}

//----------------------------------------------------------------------------------------
// Update carousel status

module.exports.update = (settings) => {

	/*
		"active",
		"stopped"
	*/

	if ( settings.status ){
		console.log( "Change status MONGO: " + settings.object._id + " : " + settings.status)
		Carousel.update( settings.object,  { $set: { status: settings.status } }, (err, result) => {
			if ( err ) console.log(err);
			else {
				return true;
			}
		});
	}

	if ( settings.updateAdvs ){

		Carousel.update( settings.object,  { $set: { advs: settings.advs } }, (err, result) => {
			if ( err ) console.log(err);
			else {
				return true;
			}
		});
		return true;
	}

	if ( settings.iterator ){
		Carousel.update( settings.object, { $inc: { iterator: +1 } }, { new: true },function(err, response) {
				if (err) {
					//console.log(err);
				} 
				else {
			 		//console.log(response);
				}
			})
	}
	else if ( settings.iterator == false ){
		Carousel.update( settings.object,  { $set: { iterator: 0 } }, (err, result) => {
			if ( err ) console.log(err);
			else {
				return true;
			}
		});
	}

}