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
        entry.content = md(entry.content);
        return res.render('entry_viewer', {entry :  entry, user : req.user});
      }
    });
});


module.exports = router;
