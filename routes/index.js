//----------------------------------------------------------------------------------------
// page


module.exports = (app, db) => {
	app.get("/", (req, res) => {
		 res.sendFile('./client/lands/wlossa/index.html');
	    
	});
}