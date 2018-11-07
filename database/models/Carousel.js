let mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CarouselSchema = new Schema({
	name: 	   { type: String },
	advs: 	   { type: Array },
	status:    { type: String },
	timer:     { type: Number },
	iterator:  { type: Number },
	createdAt: { type: Date }
});

const Carousel = mongoose.model("Carousel", CarouselSchema);

module.exports = Carousel;