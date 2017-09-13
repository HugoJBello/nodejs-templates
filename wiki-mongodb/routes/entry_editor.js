var express = require('express');
var PageEntry   =require('../models/page_entry');
var md = require("marked");
var router = express.Router();
var md = require("marked");

router.get('/entry_editor/:entry_name', function(req, res) {
  PageEntry.findOne({'name':req.params.entry_name}, function(err, entry){
    if (err) throw err;
    if(entry){
      return res.render('entry_editor', {entry :  entry, user : req.user});
    } else {
      return res.render('entry_editor', {user : req.user});
    }
  });
});

router.get('/entry_editor', function(req, res) {
  return res.render('entry_editor', {user : req.user});
});


router.post('/entry_editor', function(req, res) {
  var entry = new PageEntry({'_id': req.body._id,
                        'name':req.body.entry_name,
                        'title':req.body.title,
                        'content':req.body.content,
                        'modified_at': new Date(),
                        'user':req.user});
  console.log(entry);
  if (req.body.new =='true'){
    entry.created_at = new Date();
    PageEntry.create(entry, function(err,raw){
      if (err) throw err;
      contentHtml = md(entry.content);
      return res.render('entry_viewer', {entry :  entry,contentHtml : contentHtml, user : req.user});
    });
  } else  {
    PageEntry.findByIdAndUpdate(req.body._id, entry, function(err,raw){
      if (err) throw err;
      contentHtml = md(entry.content);
      return res.render('entry_viewer', {entry :  entry,contentHtml : contentHtml, user : req.user});
    });
  }
});



module.exports = router;
