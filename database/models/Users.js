let mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	endpoint: { type: String, unique: true},
	expirationTime: { type: String },
	p256dh: { type: String },
	auth: { type: String },
	lang: { type: String },
	ip: { type: String },
	country: { type: String },
	click_id: { type: String },
	countryCode: { type: String },
	createdAt: { type: Date }
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;