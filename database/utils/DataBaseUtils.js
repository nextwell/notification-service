let mongoose = require('mongoose'),
	users 	 = require('./UsersUtils.js'),
	adv      = require('./AdvUtils.js');

mongoose.Promise = global.Promise;

module.exports.setUpConnection = () => {
	mongoose.connect(`mongodb://localhost:27017/notifications`, { useNewUrlParser: true });
}

module.exports.Users = users;

module.exports.Adv = adv;