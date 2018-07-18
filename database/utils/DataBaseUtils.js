let mongoose = require('mongoose'),
	users 	 = require('./UsersUtils.js');

mongoose.Promise = global.Promise;

module.exports.setUpConnection = () => {
	mongoose.connect(`mongodb://localhost/notifications`);
}

module.exports.Users = users;