let mongoose = require('mongoose'),
	users 	 = require('./UsersUtils.js'),
	adv      = require('./AdvUtils.js');
	carousel = require('./CarouselUtils.js');

mongoose.Promise = global.Promise;

module.exports.setUpConnection = () => {
	let url = `mongodb://localhost:27017/notifications`;
	if ( process.env.dev == 'true' ){
		url = `mongodb://localhost:27017/notificationsdev`;
	}
	mongoose.connect(url, { useNewUrlParser: true });
}

module.exports.Users = users;

module.exports.Adv = adv;

module.exports.Carousel = carousel;