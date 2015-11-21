var dbUrl = 'mongodb://localhost/inclean';
//var sessdb = 'mongodb://localhost/sess';
//var session_secret = 'hack@jss';

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
require('./config/passport')(passport);
var morgan = require('morgan');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // starting ejs

//Passport Setup

app.use(session({secret: 'inclean@Hack\'15',
		store:new MongoStore({
			url: configDB.sessdb
		}),
		resave: true,
    	saveUninitialized: true
	})); // session init
app.use(passport.initialize());
app.use(passport.session());


require('./app/routes.js')(app, passport); // loading routes

app.listen(port);
console.log("Switch to port " + port +" for some magic.");