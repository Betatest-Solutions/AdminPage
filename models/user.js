const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User schema
const Userschema = mongoose.Schema(
	{
		name:{
			type: String
		},
		email:{
			type: String,
			required: true
		},
		username:{
			type: String,
			required: true
		},
		password:{
			type: String,
			required: true
		}
	}
);

const User = module.exports = mongoose.model('User',Userschema);

module.exports.getUserById = function (id,callback) {
	User.findById(id,callback);
}

module.exports.getUserByUserName = function (username,callback) {
	const query = {username : username}
	User.findOne(query,callback);
}

module.exports.addUser = function(newUser, callback){
	bcrypt.genSalt(10, (err,salt) =>{
		bcrypt.hash(newUser.password,salt,(err,_hash) => {
			newUser.password = _hash;
			newUser.save(callback);
		})
	})
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, (err, isMatch) =>	{
		if(err) throw err;
		if(callback){callback(null, isMatch)};
	})

}
