//----------------------------------------------------------------------------------------
// page

let path = require('path');

module.exports = (app, db) => {
	app.get("/", (req, res) => {
		 res.sendFile(path.join(__dirname + '/../client/lands/wlossb/index.html'));
	    
	});
}