var pic       = require('./models/pic.js');

module.exports = function(app,express,upload) {
	//app.use(express.static(__dirname + '/js'))

	app.use('/css/',express.static(__dirname + "/../client/css"))
	app.use('/js/',express.static(__dirname + "/../client/js"))
	app.use('/images/',express.static(__dirname + "/../client/images"))
	app.use('/fonts/',express.static(__dirname + "/../client/fonts"))

	//Send HomePage
	app.get('/',function(req,res){
		res.sendFile(__dirname + '/index.html');
	});
	app.get('/picform.html',function(req,res){
		res.sendFile(__dirname + '/picform.html');
	});
	app.get('/index.html',function(req,res){
		res.sendFile(__dirname + '/index.html');
	});
	app.get('/generic.html',function(req,res){
		res.sendFile(__dirname + '/generic.html');
	});
	app.get('/about.html',function(req,res){
		res.sendFile(__dirname + '/about.html');
	});
	app.post('/upload/',upload.any(),function(req,res){
		console.log(req.headers);
		console.log(req.body);
		var data = new Buffer('');
		req.on('data',function(chunk){
			data = Buffer.concat([data, chunk]);
			console.log(req.headers);
		});
		req.on('end',function(){
			console.log(data);
			console.log(req.params);
			console.log(req.headers);
			var newpic = new pic();
			newpic.photo = data;
			//TODO add desc and loc from req
			newpic.save(function(err){
				if(err)
					throw err;
			});
		});
	});
/*
	General Authed pages should be like this

	//Profile
	app.get('/profile',isLoggedIn, function(req, res){
		res.render('profile.ejs',{
			user: req.user
		});
	});
	app.get('/upload',function(req,res){
		res.sendFile( __dirname + '/picform.html');
	});
Gen Auth'd pages end*/
/*	app.get('/logout', function(req, res){
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
*/


};

/*function isLoggedIn(req,res,next) {
	if(req.isAuthenticated())
		return next();
	res.redirect('/');
}*/