module.exports = (app, db) => {
	let admin = {
		login: 'adm' || process.env.login,
		password: 'admpanel' || process.env.password
	}
	app.get('/adm/login', (req, res) => {
		if ( req.session.userData ){
			res.redirect('/adm/panel');
		} else{
			if ( req.query.err ){
				let error;
				switch (req.query.err){
					case 'unknown': error = 'Ошибка!'; break;
				}
				if ( error ){
					res.render('login', { title: 'login page', error: error});
				} else res.redirect('/login');
			} else res.render('login', { title: 'login page'});
		}
		
	})
	app.post('/adm/login', (req, res) => {
		let data = {
			login: req.body.login,
			password: req.body.password
		};
		
		if ( data.login == admin.login && data.password == admin.password ){
			req.session.userData = data;
			res.redirect('/adm/panel');
		}
		else{
			res.redirect("/adm/login/?err=unknown");
		}

	})
}