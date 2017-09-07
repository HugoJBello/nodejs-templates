var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var WikiEntry   =require('../models/wiki_entry');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/app', function (req, res) {
    if (req.user == null){
     // if user is not logged-in redirect back to login page //
    res.redirect('/');
  }
    res.render('app', { user : req.user });
});

router.get('/entry_viewer/:entry_name', function(req, res) {
   console.log('------------------------------------------------------');
   console.log(req.params.entry_name);
    WikiEntry.findOne({'name':req.params.entry_name}, function(error, entry){
     if (error) next();
     return res.render('entry_viewer', {WikiEntry :  WikiEntry });
   });
  next();

});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
