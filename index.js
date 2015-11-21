var dbUrl = 'mongodb://localhost/inclean';
//var sessdb = 'mongodb://localhost/sess';
//var session_secret = 'hack@jss';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var connection = mongoose.connect(dbUrl);

var Schema = moongoose.Schema;

var UserSchema = new Schema({
	_id: 
});

var PicSchema = new Schema({
		userid:{before: String}
});