let mongoose = require('mongoose'),
	Users 	 = require('./../models/Users.js');

const User = mongoose.model('Users');



//----------------------------------------------------------------------------------------
// Sign up new user

module.exports.create = (data) => {
	let user = new User({
		endpoint: data.endpoint,
		p256dh: data.p256dh,
		auth: data.auth,
		lang: data.lang,
		ip: data.ip,
		country: data.country,
		countryCode: data.countryCode,
		createdAt: new Date()
	});
	let promise = user.save();
    return promise;
}


//----------------------------------------------------------------------------------------
// Get all users

module.exports.get = (settings) => {
	switch(settings.action){
		case 'empty': {
			return Users.find({});
			break;
		};
		case 'full': {
			let data = settings.data;
			return Users.findOne({ endpoint: data.endpoint, p256dh: data.p256dh, auth: data.auth });
			break;
		};
		default: {
			return Users.find({});
			break;
		}
	}
}

module.exports.remove = (settings) => {
	return Users.findOneAndRemove(settings);
}