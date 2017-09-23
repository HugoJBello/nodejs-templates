var express = require('express');
var PageEntry   =require('../models/page_entry');
var PageEntryHistory   =require('../models/page_entry_history');

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
      var imagesUrl= req.protocol + '://' + req.get('host') + '/images/your-image-name-here';
      return res.render('entry_editor', {entry :  entry, user : req.user,cathegoriesSemicolom : cathegoriesSemicolom, imagesUrl:imagesUrl});
    } else {
      return res.render('entry_editor', {user : req.user});
    }
  });
});

router.get('/entry_editor', function(req, res) {
  var imagesUrl= req.protocol + '://' + req.get('host') + '/images/your-image-name-here';
  return res.render('entry_editor', {user : req.user,imagesUrl:imagesUrl});
});


router.post('/entry_editor', function(req, res) {
  var cathegories = req.body.cathegoriesSemicolom.split(';');
  for (var i=0; i<cathegories.length;i++){
    if (cathegories[i]!='') updateCathegory(cathegories[i]);
  }

  var entry = new PageEntry({'_id': req.body._id,
                            'name':req.body.entry_name,
                            'title':req.body.title,
                            'content':req.body.content,
                            'updated_at': new Date(),
                            'cathegories':cathegories});
  var entryHistory = new PageEntryHistory({'name':req.body.entry_name,
                                          'title':req.body.title,
                                          'content':req.body.content,
                                          'updated_at': new Date(),
                                          'cathegories':cathegories});
  if (req.body.new =='true'){
    entry.created_at = new Date();
    entryHistory.created_at = new Date();
    addUserInfo(entry, entryHistory, req)
    PageEntry.create(entry, function(err,raw){
      if (err) throw err;
      return res.redirect('/entry_viewer/'+req.body.entry_name);
    });
    PageEntryHistory.create(entryHistory, function(err,raw){
      if (err) throw err;
    });
  } else  {
    addUserInfo(entry, entryHistory, req)
    PageEntry.findByIdAndUpdate(req.body._id, entry, function(err,raw){
      if (err) throw err;
      return res.redirect('/entry_viewer/'+req.body.entry_name);
    });
    PageEntryHistory.create(entryHistory, function(err,raw){
      if (err) throw err;
    });
  }
});

function addUserInfo(entry, entryHistory, req){
  if(req.user) {
    entry.edited_by = req.user.username;
    entryHistory.edited_by = req.user.username;
  } else {
    entry.edited_by ='[Unregistered User]';
    entryHistory.edited_by ='[Unregistered User]';
  }
}
function updateCathegory (cathegory_name){
  Cathegory.findOne({'name':cathegory_name}, function(err, cathegory){
    if (err) throw err;
    if(!cathegory){
      var cathegory_new = new Cathegory({'name':cathegory_name,
                                          'created_at': new Date()});
      Cathegory.create(cathegory_new, function(err,raw){
        if (err) throw err;
        });
    } else {
    }
  });
}


module.exports = router;
