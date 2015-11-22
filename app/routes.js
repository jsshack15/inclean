var pic       = require('./models/pic');
var User       = require('./models/user');
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
		console.log(req.body.loc);
		var newpic = new pic();
		newpic.desc = req.body.desc;
		newpic.loc = req.body.loc;
		var data = new Buffer('');
		console.log(req.files);
			var buffer = req.files[0].buffer;
			newpic.photo = 'data:' + req.files[0].mimetype +';base64,'+ buffer.toString('base64');
			//TODO add desc and loc from req
			console.log(newpic);
			newpic.save(function(err){
				if(err)
					console.log(err);
			});
	});
	app.get('/searchu',function(req,res){
		res.sendFile(__dirname + '/searchusers.html');
	})
	app.get('/searchl',function(req,res){
		res.sendFile(__dirname + '/searchloc.html')
	})
	app.get('/add/user:name', function(req,res){
		var newUser = new User();
		newUser.name = req.params.name;
		newUser.loc = 'vasantvihar';
		newUser.save(function(err){
			if(err)
				console.log(err);
		});
	});
	app.put('/search/pics/:loc',function(req,res){
		var loc = req.params.loc;
		pic.find({'loc' : loc},function(err,docs){
			if(err)
				console.log(err);

			res.json(docs);
		});
	});
	app.put('/search/users/:loc',function(req,res){
		var loc = req.params.loc;
		User.find({'loc': loc},function(err,docs){
		if(err)
				console.log(err);

				res.json(docs);	
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