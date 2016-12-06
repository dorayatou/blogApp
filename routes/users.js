var express = require('express');
var user_router = express.Router();
// var User = require('./../model/user');

/* GET users listing. */
user_router.get('/', function (req, res, next) {
	res.render('users/index');
});

user_router.get('/login', function (req, res, next) {
	res.render('users/login');
});

user_router.get('/new_account', function (req, res, next) {
	res.render('users/new');
});

user_router.post('/create', function (req, res, next) {
	res.redirect("http://web.blog.com/users");
});


module.exports = user_router;