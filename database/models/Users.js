let mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	endpoint: { type: String},
	expirationTime: { type: String },
	p256dh: { type: String },
	auth: { type: String },
	createdAt: { type: Date }
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;