//----------------------------------------------------------------------------------------
// Removing/adding adv from carousel

module.exports = (app, db, Carousels) => {


	app.get(`/adm/api/carousel/remove/:carousel_id/:adv_id`, (req, res) => {

		if ( req.session.userData ){
			let data = {
				carousel_id: req.params.carousel_id,
				adv_id: req.params.adv_id
			}
			console.log(data);

			Carousels.forEach((item, i, array) => {
				if ( item.object._id == data.carousel_id ){
					//
					Carousels[i].removeAdv(data.adv_id);
					console.log(Carousels[i].object.advs)

					Carousels[i].mathStats(); 	// пересчет статистики
				}
				
			})

			res.json({status: "OK"})
			
		}
		else {
			res.send("Page not found!");
		}
	  

	});

	app.post(`/adm/api/carousel/add-adv`, (req, res) => {

		if ( req.session.userData ){
			let data = {
				carousel_id: req.body.carousel_id,
				adv_id: req.body.adv_id
			};

			Carousels.forEach((item, i, array) => {
				if ( item.object._id == data.carousel_id ){
					//
					Carousels[i].addAdv(data.adv_id);

					Carousels[i].mathStats(); 	// пересчет статистики
				}
				
			})

			res.redirect('/adm/carousel/list');
			
		}
		else {
			res.send("Page not found!");
		}
	  

	});


}