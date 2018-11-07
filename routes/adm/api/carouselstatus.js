//----------------------------------------------------------------------------------------
// Carousel status

module.exports = (app, db, Carousels) => {

	// Country
	app.get(`/adm/api/carousel/status/:id/:status`, (req, res) => {

		if ( req.session.userData ){
			let data = {
				_id: req.params.id,
				status: req.params.status
			}
			console.log(data);

			Carousels.forEach((item, i, array) => {
				console.log(item.object._id );
				if ( item.object._id == data._id ){
					Carousels[i].object.status = data.status;
					if( data.status == 'stopped' ){
						Carousels[i].stopTimer();
					}
					else if ( data.status == 'active' ){
						Carousels[i].startTimer();
					}
				}
				
			})

			res.json({status: "OK"})
			
		}
		else {
			res.send("Page not found!");
		}
	  

	});


}