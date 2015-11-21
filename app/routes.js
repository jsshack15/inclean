module.exports = function(app, passport) {
	//Send HomePage
	app.get('/',function(req,res){
		res.render('home.ejs');
	});

/*
	General Authed pages should be like this
*/
	//Profile
	app.get('/profile',isLoggedIn, function(req, res){
		res.render('profile.ejs',{
			user: req.user;
		});
	});
/*Gen Auth'd pages end*/


	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	app.get('/auth/google', passport.authenticate('google', { scope: ['profile','email']}));

	app.get('/auth/google/callback',
			passport.authenticate('google', {
				successRedirect : '/profile',
				failureRedirect : '/'
			})

		);
};

function isLoggedIn(req,res,next) {
	if(req.isAuthenticated())
		return next();
	res.redirect('/');
}