const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

//Register routes
router.post('/register', (req, res, next) => {
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	})

	User.addUser(newUser,(err,user) => {
		if (err) {
			res.json({success: false, msg: 'Failed to register User'});
		} else
		{
			res.json({success: true, msg: 'User registered'});
		}
	})
});

//authenticate
router.post('/authenticate', (req, res, next) => {
	console.log('inside authenticate');
	const username = req.body.username;
	const password = req.body.password;

	console.log('username '+ username);
	console.log('password ' + password);

	User.getUserByUserName(username, (err,user) => {
		if(err)
			throw err;
		if(!user){
			return res.json({success:false, msg:'User not found'})
		}
		console.log(user.password);
		User.comparePassword(password, user.password, (err, isMatch)=>{
			if(err) throw err;
			if(isMatch){
				const token = jwt.sign(user.toJSON(), config.secret, {
					expiresIn: 604800
				});

				res.json({
					success: true,
					token: 'JWT ' + token,
					user: {
						id: user.id,
						name: user.name,
						username: user.username,
						email: user.email
					}
				})
			}else{
				return res.json({success:false, msg:'Wrong Password'})
			}
			console.log('user ' + user);
		})
	})
});

//profile
router.get('/profile', passport.authenticate('jwt',{session:false}), (req, res, next) => {
	// console.dir(req, res);
	res.json({user: req.user});
});

//dashboard
router.get('/dashboard', passport.authenticate('jwt',{session:false}), (req, res, next) => {
	console.log('inside dashboard');
	res.json({user: req.user});
});

module.exports = router;


