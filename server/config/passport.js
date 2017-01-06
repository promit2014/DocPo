var jwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../datasets/user');
var config = require("./configurations");

module.exports = function(passport){
	var opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
	opts.secretOrKey = config.secret;
	passport.use(new jwtStrategy(opts,function(jwt_payload, done){
		User.findOne({id:jwt_payload.id} , function(err,user){
			if(err){
				return done(err,false);
			}

			if(user){
				return done(null , user);
			}else{
				return done(null , false);
			}
		});
	}));
};