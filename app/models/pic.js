var mongoose = require('mongoose');
// define the schema for our user model
var picSchema = mongoose.Schema({
    desc: String,
    loc: String,
    photo: String
},{ collection : 'pics' });

// create the model for users and expose it to our app
module.exports = mongoose.model('pic', picSchema);