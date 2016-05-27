var express = require('express');
var router = express.Router();

var passport = require('passport');
require('./../config/passport.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Playlister' });
});

router.get('/home', function(req, res, next) {
	res.render('index', {title: 'Playlister'});
});

router.get('/auth/youtube', passport.authenticate('youtube', {scope: ['https://www.googleapis.com/auth/youtube'] }));
		
router.get('/auth/youtube/callback', passport.authenticate('youtube', {failureRedirect: '/'}),
	function(req, res) {
		res.redirect('/home');
	}
);

module.exports = router;
