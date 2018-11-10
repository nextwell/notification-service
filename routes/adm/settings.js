//----------------------------------------------------------------------------------------
// AAdm panel settings





module.exports = (app, db) => {
	app.get('/adm/settings', (req, res) => {
		if ( req.session.userData ){
			db.Users.get({action: 'empty'})
				.then(data => {
					let fileContents = fs.readFileSync('settings.json','utf8');
					let config = JSON.parse(fileContents);
					res.render('settings', { nUsers: data.length, postback: config.POSTBACK, traffback: config.TRAFFBACK });
				})
		}
		else {
			res.redirect('/adm/login')
		}
		

	})
}