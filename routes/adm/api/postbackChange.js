//----------------------------------------------------------------------------------------
// Post back change API

let	fs = require('fs');


module.exports = (app, db) => {
	app.post("/adm/api/postback", (req, res) => {
		if ( req.session.userData ){
			data = req.body;
			let fileContents = fs.readFileSync('settings.json','utf8');
			let config = JSON.parse(fileContents);


			config.POSTBACK = data.postback;
			fs.writeFileSync('settings.json', JSON.stringify(config));
			
			res.redirect('/adm/settings');
		}
		else {
			res.send("Page not found!");
		}
	});
}