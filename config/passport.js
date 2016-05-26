'use strict'

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy ({
	clientID: "85957565874-ol40114mec08bm3lf3q9q3s9prv3pn0p.apps.googleusercontent.com",
	clientSecret: "OSWbRQNeBGsyPShpsFSWaYln",
	callbackURL: "http://localhost:3000/auth/google/callback"
	},
		function(token, tokenSecret, profile, done) {
			User.findOrCreate({ googleId: profile.id}, function(err, user) {
				return done(err, user);
			});
		}
));
