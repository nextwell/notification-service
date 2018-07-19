//----------------------------------------------------------------------------------------
// Subscribe action

let request = require('request');


module.exports = (app, db) => {
	app.get("/test/users", (req, res) => {

	  
	    


	    db.Users.get({ action: 'empty' })
	    	.then(data => {
	    		res.json(data);
	    	})
	    	.catch(err => {
	    		res.json(err);
	    	})

	  /*const payload = JSON.stringify({ title: "Push Test", link: sites[getRandom(0, 4)] });

	  webpush
	    .sendNotification(subscription, payload)
	    .catch(err => console.error(err));*/
	});
}