var express = require('express');
var PageEntry   =require('../models/page_entry');
var md = require("marked");
var router = express.Router();
var Cathegory = require('../models/cathegory');

router.get('/entry_editor/:entry_name', function(req, res) {
  PageEntry.findOne({'name':req.params.entry_name}, function(err, entry){
    if (err) throw err;
    if(entry){
      var cathegoriesSemicolom='';
      for (var i = 0; i < entry.cathegories.length; i++){
        if (entry.cathegories[i]!='') cathegoriesSemicolom= cathegoriesSemicolom+entry.cathegories[i].trim()+';';
      }

      return res.render('entry_editor', {entry :  entry, user : req.user,cathegoriesSemicolom : cathegoriesSemicolom});
    } else {
      return res.render('entry_editor', {user : req.user});
    }
  });
});

router.get('/entry_editor', function(req, res) {
  return res.render('entry_editor', {user : req.user});
});


router.post('/entry_editor', function(req, res) {
  var cathegories = req.body.cathegoriesSemicolom.split(';');
  for (var i=0; i<cathegories.length;i++){
    console.log(cathegories[i])
    if (cathegories[i]!='') updateCathegory(cathegories[i]);
  }

  var entry = new PageEntry({'_id': req.body._id,
                            'name':req.body.entry_name,
                            'title':req.body.title,
                            'content':req.body.content,
                            'modified_at': new Date(),
                            'cathegories': cathegories,
                            'user':req.user});
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

function updateCathegory (cathegory_name){
  Cathegory.findOne({'name':cathegory_name}, function(err, cathegory){
    if (err) throw err;
    if(!cathegory){
      var cathegory_new = new Cathegory({'name':cathegory_name,
                                          'created_at': new Date()});
      Cathegory.create(cathegory_new, function(err,raw){
        console.log(cathegory_new);
        if (err) throw err;
        });
    }
  });
}

module.exports = router;
