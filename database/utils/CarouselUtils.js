let mongoose = require('mongoose'),
	Carousels 	 = require('./../models/Carousel.js');

const Carousel = mongoose.model('Carousel');



//----------------------------------------------------------------------------------------
// Create new adv

module.exports.create = (data) => {
	let carousel = new Carousel({
		name: data.name,
		title: data.title,
		createdAt: new Date(),
		status: "stopped",
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
		Carousel.update( settings.object,  { $set: { status: settings.status } }, (err, result) => {
			if ( err ) console.log(err);
			else {
				return true;
			}
		});
	}

}