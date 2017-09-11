var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var PageEntry   =require('../models/page_entry');
var md = require("marked");
var path = require("path");
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
    PageEntry.findOne({'name':req.params.entry_name}, function(err, entry){
      if (err) throw err;
      entry.content = md(entry.content);
      return res.render('entry_viewer', {entry :  entry, user : req.user});
  });
});

router.get('/entry_editor/:entry_name', function(req, res) {
  PageEntry.findOne({'name':req.params.entry_name}, function(err, entry){
    if (err) throw err;
    return res.render('entry_editor', {entry :  entry, user : req.user});
  });
});

router.post('/entry_editor', function(req, res) {
  var entry = new PageEntry({'_id': req.body._id,
                        'name':req.body.entry_name,
                        'content':req.body.content,
                        'user':req.user});
  console.log(entry);
  if (req.body.new =='true'){
    PageEntry.create(entry, function(err,raw){
      if (err) throw err;
      return res.redirect('entry_viewer/'+ req.body.entry_name);
    });
  } else  {
    PageEntry.findByIdAndUpdate(req.body._id, entry, function(err,raw){
      if (err) throw err;
      return res.redirect('entry_viewer/'+ req.body.entry_name);
    });
  }
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
