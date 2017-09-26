var express = require('express');
var md = require("marked");
var router = express.Router();
var PageEntryHistory   =require('../models/page_entry_history');
var perPage = 15;

router.get('/entry_history/:entry_name&page=:page', function(req, res) {
  if(req.params.page>=1){
    numberOfPages(req.params.entry_name,function(pages){
      findEntries(req.params.entry_name,req.params.page, function(entries){
        console.log('entries');
        console.log(entries[0]);
        return res.render('entry_history', {entry:entries[0],entries:entries, page:req.params.page,pages:pages, user : req.user});
      });
    });
  } else {
    return res.render('entry_history', {page:req.params.page,pages:1, user : req.user});
  }
});


function findEntries (name,page, callback){
  page = page -1;
  PageEntryHistory.find({'name':name})
  .limit(perPage)
  .skip(perPage * page)
  .sort({'updated_at': 'desc'})
  .exec(function(err, entries){
    if (err) throw err;
    return callback(entries);
    console.log(entries);
  });
}


 function numberOfPages (name,callback){
   PageEntryHistory.count({'name':name}, function( err, count){
     console.log( "Number of entries", count/perPage );
     return callback(Math.floor(count/perPage)+1);
   });
 }


module.exports = router;
