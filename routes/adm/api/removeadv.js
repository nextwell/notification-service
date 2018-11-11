//----------------------------------------------------------------------------------------
// Removing/adding adv from carousel

module.exports = (app, db, Carousels) => {


	app.get(`/adm/api/aa/remove/:id`, (req, res) => {

		if ( req.session.userData ){
			let data = {
				advId: req.params.id,
			}
			console.log(data);

			db.Adv.remove({_id: data.advId})
				.then(data => {
					res.json({status: "OK"})
				})
			
		}
		else {
			res.send("Page not found!");
		}
	  

	});

}