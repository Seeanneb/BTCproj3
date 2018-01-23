var mongoose = require('mongoose');
var express = require('express')
var app = express();
var UserSchema = new mongoose.Schema({
	email: {
		type: String, 
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String, 
		unique: true,
		required: true,
		trim: true
	},
	passwordConf: {
		type: String, 
		required: true
	}
});

var User = mongoose.model('User', UserSchema);
module.exports = User

if (req.body.email && 
	req.body.password &&
	req.body.passwordConf){

	var UserData = {
		email: req.body.email,
		password: req.body.password,
		passwordConf: req.body.passwordConf
	}

	User.create(UserData, function(err, user){
		if (err) throw err;
		return res.redirect("./main");
	})
}