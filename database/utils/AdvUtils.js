let mongoose = require('mongoose'),
	Advs 	 = require('./../models/Adv.js');

const Adv = mongoose.model('Adv');



//----------------------------------------------------------------------------------------
// Create new adv

module.exports.create = (data) => {
	let adv = new Adv({
		name: data.name,
		title: data.title,
		body: data.body,
		icon: data.icon,
		image: data.image,
		offer: data.offer,
		country: data.country,
		lang: data.lang,
		views: 0,
		clicks: 0,
		createdAt: new Date()
	});
	let promise = adv.save();
    return promise;
}


//----------------------------------------------------------------------------------------
// Get adv information

module.exports.get = (settings) => {
	switch(settings.action){
		case 'empty': {
			return Advs.find({}, {}, { sort: { 'createdAt' : -1 } });	// newest
			break;
		};
		case 'params': {
			let data = settings.data;
			return Advs.findOne(data);
			break;
		};
		default: {
			return Advs.find({});
			break;
		}
	}
}

//----------------------------------------------------------------------------------------
// Remove adv

module.exports.remove = (settings) => {
	return Advs.findOneAndRemove(settings);
}

//----------------------------------------------------------------------------------------
// Add view or click

module.exports.add = (settings) => {
	switch(settings.action){
		case 'view': {
			Advs.findOneAndUpdate({ _id: settings.data.id }, { $inc: { views: +1 } }, { new: true },function(err, response) {
				if (err) {
					//console.log(err);
				} 
				else {
			 		//console.log(response);
				}
			})
			break;
		};
		case 'click': {
			Advs.findOneAndUpdate({ _id: settings.data.id }, { $inc: { clicks: +1 } }, { new: true },function(err, response) {
				if (err) {
					//console.log(err);
				} 
				else {
			 		//console.log(response);
				}
			})
			break;
		};
		default: return true;
	}
}