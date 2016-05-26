'use strict'

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('./user');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy ({
	clientID: "85957565874-ol40114mec08bm3lf3q9q3s9prv3pn0p.apps.googleusercontent.com",
	clientSecret: "OSWbRQNeBGsyPShpsFSWaYln",
	callbackURL: "http://localhost:3000/auth/google/callback"
	},
		function(token, tokenSecret, profile, done) {
			User.findOne({googleID: profile.id}, function(err, user) {
				console.log(profile.name);
				if (user)
					done(null, user);
				else {
					var user = new User({
						googleID: profile.id,
						name: profile.name,
					});
					console.log(profile.name);
					user.save(function(err) {
						if(err) console.log(err);
						else return done(err, user);
					});
				}
			})
		}
));
