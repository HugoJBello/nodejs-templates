var express = require('express');
var md = require("marked");
var router = express.Router();
var PageEntry   =require('../models/page_entry');
var perPage = 10;

router.get('/entry_list/page=:page', function(req, res) {
  if(req.params.page>=1){
    numberOfPages(function(pages){
      findEntries(req.params.page, function(entries){
        console.log('entries');    
        console.log(entries);
        return res.render('entry_list', {entries:entries, page:req.params.page,pages:pages, user : req.user});
      });
    });
  } else {
    return res.render('entry_list', {page:req.params.page,pages:1, user : req.user});

  }
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
  page = page-1;
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
  page = page-1;
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
     return callback(Math.floor(count/perPage)+1);
   });
 }

 function numberOfPages (callback){
   PageEntry.count({}, function( err, count){
     console.log( "Number of entries", count/perPage );
     return callback(Math.floor(count/perPage)+1);
   });
 }


module.exports = router;
