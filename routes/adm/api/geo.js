//----------------------------------------------------------------------------------------
// GEO API

module.exports = (app, db) => {
	app.get("/adm/api/geo", (req, res) => {

		if ( req.session.userData ){
			db.Users.GetCountryCode()
		    	.then(codes => {
		    		db.Users.GetCountry()
		    			.then(countries => {
		    				let pack = [];
		    				countries.forEach(function(item, i, arr) {
		    					if ( item != 'none'){
		    						let obj = {country: item, countryCode: codes[i]};
							  		pack.push(obj);
		    					}
							});
							res.json(pack);
		    			})
		    	})
		}
		else {
			res.send("Page not found!");
		}
	  

	});

	app.get("/adm/api/lang", (req, res) => {

		if ( req.session.userData ){
			db.Users.GetLang()
		    	.then(data => {
		    		res.json(data);
		    	})
		}
		else {
			res.send("Page not found!");
		}
	  
	});
}