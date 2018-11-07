//----------------------------------------------------------------------------------------
// Carousel adding


let CarouselControl = require('./../../modules/CarouselControl.js').CarouselControl;


module.exports = (app, db, Carousels) => {
	app.get('/adm/add-carosel', (req, res) => {
		if ( req.session.userData ){
			db.Adv.get({action: 'empty'})
				.then(async data => {
					res.render('carousel', {advs: data})
				})
		}
		else {
			res.redirect('/adm/login')
		}
		

	})
	app.post('/adm/add-carosel', async (req, res) => {
		if ( req.session.userData ){
			let formData = req.body;
			console.log(formData);
			let Carousel = new CarouselControl({db: db});
			Carousel.add({name: formData.name, advs: formData.advs, timer: formData.interval})
			Carousels.push(Carousel);
			db.Adv.get({action: 'empty'})
				.then(async data => {
					res.render('carousel', { advs: data, status: 'success' });
				})
			
		}
		else{
			res.redirect('/adm/login');
		}
		
	})
}