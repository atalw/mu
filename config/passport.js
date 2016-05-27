'use strict'

var passport = require('passport');
var YoutubeV3Strategy = require('passport-youtube-v3').Strategy;

var User = require('./user');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new YoutubeV3Strategy ({
	clientID: "85957565874-ol40114mec08bm3lf3q9q3s9prv3pn0p.apps.googleusercontent.com",
	clientSecret: "OSWbRQNeBGsyPShpsFSWaYln",
	callbackURL: "http://localhost:3000/auth/youtube/callback"
	},
		function(accessToken, refreshToken, profile, done) {
			console.log(profile.username);
			User.findOne({userId: profile.id}, function(err, user) {
				if (user)
					done(null, user);
				else {
					var user = new User({
						userId: profile.id,
						name: profile.name.givenName,
					});
					user.save(function(err) {
						if(err) console.log(err);
						else return done(err, user);
					});
				}
			})
		}
));
