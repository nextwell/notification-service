let mongoose = require('mongoose'),
	Users 	 = require('./../models/Users.js');

const User = mongoose.model('Users');



//----------------------------------------------------------------------------------------
// Sign up new user

module.exports.create = (data) => {
	let user = new User({
		endpoint: data.endpoint,
		expirationTime: data.expirationTime,
		p256dh: data.p256dh,
		auth: data.auth,
		createdAt: new Date()
	});
	let promise = user.save();
    return promise;
}


//----------------------------------------------------------------------------------------
// Get all users

module.exports.get = (settings) => {
	// settings can be empty - get all users
	return Users.find(settings);
}