var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var PageEntry   =require('../models/page_entry');
var md = require("marked");

var router = express.Router();

// var mongoose = require('mongoose');
// var schema = new mongoose.Schema({ name: 'string', author: 'string', content:'string' },{ collection : 'PageEntries' });
// var PageEntry = mongoose.model('PageEntry', schema);

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
    PageEntry.findOne({'name':req.params.entry_name}, function(err, entry){
      if (err) throw err;
      console.log(md("bla \n bla"))
      return res.render('entry_viewer', {entry :  entry, user : req.user, md: md});
  });
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
