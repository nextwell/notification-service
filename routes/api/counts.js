//----------------------------------------------------------------------------------------
// Counts views or clicks

module.exports = (app, db) => {
	app.get("/api/views/add/:id", (req, res) => {
		let id = req.params.id
		console.log(id);
		let settings = {
			action: 'view',
			data: {
				id: id
			}
		}
		db.Adv.add(settings)
		

	});

	app.get("/api/clicks/add/:id", (req, res) => {
		let id = req.params.id
		console.log(id);
		let settings = {
			action: 'click',
			data: {
				id: id
			}
		}
		db.Adv.add(settings)
	  
	});
}