//----------------------------------------------------------------------------------------
// Adv Page


module.exports = (app, db) => {
	app.get('/adm/adv/list', (req, res) => {
		if ( req.session.userData ){
			let query = {
				_id: req.params.id
			}
			db.Adv.get({action: 'empty'})
				.then(async data => {
					res.render('adv-list', {advs: data})
				})
		}
		else {
			res.redirect('/adm/login')
		}
		

	})
	
}