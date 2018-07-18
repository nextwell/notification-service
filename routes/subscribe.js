//----------------------------------------------------------------------------------------
// Subscribe action


module.exports = (app, db) => {
	app.post("/subscribe", (req, res) => {

	  const subscription = req.body;
	  console.log(subscription);
	  db.Users.create({ endpoint: subscription.endpoint, p256dh: subscription.keys.p256dh, auth: subscription.keys.auth })
	  	.then( data => {
	  		console.log(data);
	  	})
	  	.catch( err => {
	  		console.log('ERROR || User already created');
	  	})
	  res.status(201).json({});

	  /*const payload = JSON.stringify({ title: "Push Test", link: sites[getRandom(0, 4)] });

	  webpush
	    .sendNotification(subscription, payload)
	    .catch(err => console.error(err));*/
	});
}