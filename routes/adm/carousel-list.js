//----------------------------------------------------------------------------------------
// Adv Page


module.exports = (app, db, Carousels) => {
	app.get('/adm/carousel/list', (req, res) => {
		if ( req.session.userData ){
			db.Adv.get({action: 'empty'})
				.then(data => {
					res.render('carousel-list', {cors: Carousels, advs: data})
				})
		}
		else {
			res.redirect('/adm/login')
		}
		

	})
	
}