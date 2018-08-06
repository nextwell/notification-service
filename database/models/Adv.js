let mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdvSchema = new Schema({
	title: { type: String },
	body: { type: String },
	icon: { type: String },
	image: { type: String },
	offer: { type: String },
	country: { type: String },
	lang: { type: String },
	views: { type: Number },
	clicks: { type: Number },
	createdAt: { type: Date }
});

const Adv = mongoose.model("Adv", AdvSchema);

module.exports = Adv;