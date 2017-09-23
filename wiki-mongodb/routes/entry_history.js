var express = require('express');
var md = require("marked");
var Cathegory = require('../models/cathegory');
var router = express.Router();
var PageEntryHistory   =require('../models/page_entry_history');
var perPage = 15;

router.get('/entry_history/:entry_name&page=:page', function(req, res) {
  numberOfPages(function(pages){
    findEntries(req.params.page, function(entries){
      console.log('entries');
      console.log(entries);
      return res.render('entry_history', {entries:entries, page:req.params.page,pages:pages, user : req.user});
    });
  });
});


function findEntries (page, callback){
  PageEntryHistory.find({})
  .limit(perPage)
  .skip(perPage * page)
  .sort({'updated_at': 'desc'})
  .exec(function(err, entries){
    if (err) throw err;
    return callback(entries);
    console.log(entries);
  });
}


 function numberOfPages (callback){
   PageEntryHistory.count({}, function( err, count){
     console.log( "Number of entries", count/perPage );
     return callback(Math.floor(count/perPage));
   });
 }


module.exports = router;