'use strict';

var express = require('express');
var router = express.Router();

var passport = require('passport');
require('./../config/passport.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.userId) {
		res.render('index.html', {displayName: req.session.displayName});
	}
	else {
		res.render('login.html', { title: 'mu' });
	}
});

// router.get('/home', isAuthenticated, function(req, res, next) {
	// res.render('index', {displayName: req.session.displayName});
// });

// router.get('/profile', function(req, res, next) {
	// res.redirect("http://www.youtube.com/channel/"+req.session.userId);
// });

router.get('/app/profile', function(req, res, next) {
	res.send(req.session.passport.user);
});

router.get('/logout', function(req, res, next) {
	req.session.destroy();
	req.logout();
	res.redirect('/');
});

function isAuthenticated(req, res, next) {
	if(req.isAuthenticated()) {
		req.session.userId = req.user.userId;
		req.session.displayName = req.user.displayName;
		req.session.picture = req.user.picture;
		return next();
	}
	else {
		res.redirect('/');
	}
}

router.get('/auth/youtube', passport.authenticate('youtube', {scope: ['https://www.googleapis.com/auth/youtube'] }));

router.get('/auth/youtube/callback', passport.authenticate('youtube', {failureRedirect: '/'}),
	function(req, res) {
		res.redirect('/');
	}
);

// router.get('/search', function(req, res, next) {

// });

module.exports = router;
