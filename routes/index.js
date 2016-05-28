var express = require('express');
var router = express.Router();

var passport = require('passport');
require('./../config/passport.js');


/* GET home page. */
router.get('/', function(req, res, next) {
	// req.session.id = res;
	res.render('login', { title: 'Playlister' });
});

router.get('/home', isAuthenticated, function(req, res, next) {
	console.log(req.session.userId);
	res.render('index', {title: req.session.userId});
});

function isAuthenticated(req, res, next) {
	if(req.isAuthenticated()) {
		req.session.userId = req.user.userId;
		return next();
	}
	else {
		res.redirect('/');
	}
}

router.get('/auth/youtube', passport.authenticate('youtube', {scope: ['https://www.googleapis.com/auth/youtube'] }));

router.get('/auth/youtube/callback', passport.authenticate('youtube', {failureRedirect: '/'}),
	function(req, res) {
		res.redirect('/home');
	}
);

module.exports = router;
