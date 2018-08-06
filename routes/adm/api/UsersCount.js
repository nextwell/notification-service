//----------------------------------------------------------------------------------------
// USERS COUNT API

module.exports = (app, db) => {

	// Country
	app.get("/adm/api/users/country/:code", (req, res) => {

		if ( req.session.userData ){
			let query = {
				countryCode: req.params.code
			}
			if ( query.countryCode == 'all' ){
				db.Users.get({action: 'empty'})
					.then(data => {
						res.json({length: data.length});
					})
			}
			else {
				db.Users.get({action: 'params', data: query})
					.then(data => {
						res.json({length: data.length});
					})
			}
			
		}
		else {
			res.send("Page not found!");
		}
	  

	});

	// Language
	app.get("/adm/api/users/lang/:lang", (req, res) => {

		if ( req.session.userData ){
			let query = {
				lang: req.params.lang
			}
			if ( query.lang == 'all' ){
				db.Users.get({action: 'empty'})
					.then(data => {
						res.json({length: data.length});
					})
			}
			else {
				db.Users.get({action: 'params', data: query})
					.then(data => {
						res.json({length: data.length});
					})
			}
		}
		else {
			res.send("Page not found!");
		}
	  

	});

}