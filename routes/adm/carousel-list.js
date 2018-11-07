//----------------------------------------------------------------------------------------
// Adv Page


module.exports = (app, db) => {
	app.get('/adm/carousel/list', (req, res) => {
		if ( req.session.userData ){
			db.Carousel.get()
				.then(data => {
					res.render('carousel-list', {cors: data})
				})
		}
		else {
			res.redirect('/adm/login')
		}
		

	})
	
}