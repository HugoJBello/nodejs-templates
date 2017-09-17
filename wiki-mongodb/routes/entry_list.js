var express = require('express');
var md = require("marked");
var Cathegory = require('../models/cathegory');
var router = express.Router();
var PageEntry   =require('../models/page_entry');
var perPage = 5;

router.get('/entry_list/page=:page', function(req, res) {
  numberOfPages(function(pages){
    findEntries(req.params.page, function(entries){
      console.log('entries');
      console.log(entries);
      return res.render('entry_list', {entries:entries, page:req.params.page,pages:pages, user : req.user});
    });
  });
});

router.post('/entry_list/page=:page', function(req, res) {
  numberOfPages(req.body.text, function(pages){
    findEntriesWithName(req.body.text,req.params.page, function(entries){
      console.log('entries');
      console.log(entries);
      return res.render('entry_list', {entries:entries, page:req.params.page,pages:pages, user : req.user});
    });
  });
});


function findEntriesWithName (name,page, callback){
  console.log(name);
  PageEntry.find({'name':name})
  .limit(perPage)
  .skip(perPage * page)
  .sort({'updated_at': 'desc'})
  .exec(function(err, entries){
    if (err) throw err;
    return callback(entries);
    console.log(entries);
  });
}

function findEntries (page, callback){
  PageEntry.find({})
  .limit(perPage)
  .skip(perPage * page)
  .sort({'updated_at': 'desc'})
  .exec(function(err, entries){
    if (err) throw err;
    return callback(entries);
    console.log(entries);
  });
}


 function numberOfPagesSearch (name,callback){
   PageEntry.count({'title':name}, function( err, count){
     console.log( "Number of entries", count/perPage );
     return callback(Math.floor(count/perPage));
   });
 }

 function numberOfPages (callback){
   PageEntry.count({}, function( err, count){
     console.log( "Number of entries", count/perPage );
     return callback(Math.floor(count/perPage));
   });
 }


module.exports = router;
