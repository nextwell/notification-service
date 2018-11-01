//----------------------------------------------------------------------------------------
// Get traffic back link

module.exports = (app, db) => {
	app.get("/api/tback", (req, res) => {
		let fileContents = fs.readFileSync('settings.json','utf8');
		let config = JSON.parse(fileContents);
	    let reqURL = config.TRAFFBACK;
		let data = {
			url: reqURL
		}
		res.json(data);
	  

	});
}