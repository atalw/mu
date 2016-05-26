var express = require('express');
var router = express.Router();

var passport = require('passport');
require('./../config/passport.js');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Playlister' });
});

router.get('/home', function(req, res, next) {
	res.render('index', {title: 'Playlister'});
});

router.get('/auth/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login'] }));
		
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/'}),
	function(req, res) {
		res.redirect('/home');
	}
);

module.exports = router;
