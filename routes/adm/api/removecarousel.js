//----------------------------------------------------------------------------------------
// Removing/adding adv from carousel

module.exports = (app, db, Carousels) => {


	app.get(`/adm/api/carousel/remove/:id`, (req, res) => {

		if ( req.session.userData ){
			let data = {
				carousel_id: req.params.id,
			}

			// remove from array CAROUSELS
			Carousels.forEach((item, i, array) => {
				if ( item.object._id == data.carousel_id ){
					if ( Carousels[i].object.status == 'active' ){
						Carousels[i].stopTimer();
					}
					Carousels.splice(i, 1);
				}
			})

			// remove from db
			db.Carousel.remove({_id: data.carousel_id})
				.then(data => {
					res.json({status: "OK"})
				})
			
		}
		else {
			res.send("Page not found!");
		}
	  

	});

}