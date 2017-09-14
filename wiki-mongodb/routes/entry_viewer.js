var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var PageEntry   =require('../models/page_entry');
var md = require("marked");
var path = require("path");
var router = express.Router();


router.get('/entry_viewer/:entry_name', function(req, res) {
    PageEntry.findOne({'name':req.params.entry_name}, function(err, entry){
      if (err) throw err;
      if (!entry){
        return res.redirect('/entry_editor/'+ req.params.entry_name);
      } else {
        contentHtml = md(entry.content);
        return res.render('entry_viewer', {entry :  entry,contentHtml : contentHtml, user : req.user});
      }
    });
});

router.get('/refresh/:entry_name', function(req, res) {
    PageEntry.findOne({'name':req.params.entry_name}, function(err, entry){
      if (err) throw err;
      if (entry) {
        contentHtml = md(entry.content);
        return res.send('entry_viewer', {content :  entry.content, contentHtml : contentHtml, user : req.user});
      }
    });
});


module.exports = router;
