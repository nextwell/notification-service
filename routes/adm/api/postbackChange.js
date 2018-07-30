//----------------------------------------------------------------------------------------
// Post back change API

let	fs = require('fs');


module.exports = (app, db) => {
	app.post("/adm/api/postback", (req, res) => {
		if ( req.session.userData ){
			data = req.body;
			let newJSON = {
				"POSTBACK": data.postback
			}
			fs.writeFileSync('settings.json', JSON.stringify(newJSON));
			res.redirect('/adm/panel');
		}
		else {
			res.send("Page not found!");
		}
	});
}