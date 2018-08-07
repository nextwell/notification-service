//----------------------------------------------------------------------------------------
// Adv Page


module.exports = (app, db) => {
	app.get('/adm/adv/:id', (req, res) => {
		if ( req.session.userData ){
			let query = {
				_id: req.params.id
			}
			db.Adv.get({action: 'params', data: query})
				.then(data => {
					console.log(data);
					if ( data.country == 'all' ) data.country = "Все";
					if ( data.lang == 'all' ) data.lang = "Все";
					res.render('adv-page', {adv: data})
				})
		}
		else {
			res.redirect('/adm/login')
		}
		

	})
	
}