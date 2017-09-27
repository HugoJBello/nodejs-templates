var express = require('express');
var md = require("marked");
var router = express.Router();
var PageEntryHistory =require('../models/page_entry_history');
var Account   =require('../models/account');

var perPage = 10;

/* GET users listing. */
router.get('/user/:username&page=:page', function(req, res, next) {
  if (req.params.page>=1){
    numberOfPages(req.params.username,function(pages){
      findEntries(req.params.username,req.params.page, function(entries){
         console.log(entries[0]);
        return res.render('user_history', {username:req.params.username,entries:entries, page:req.params.page,pages:pages, user : req.user});
      });
    });
  } else {
    return res.render('user_history', {username:req.params.username,page:req.params.page,user : req.user});
  } 
});


function findEntries (username,page, callback){
  page = page -1;
  PageEntryHistory.find({'edited_by':username})
  .limit(perPage)
  .skip(perPage * page)
  .sort({'updated_at': 'desc'})
  .exec(function(err, entries){
    if (err) throw err;
    return callback(entries);
    console.log(entries);
  });
}


 function numberOfPages (username,callback){
   PageEntryHistory.count({'edited_by':username}, function( err, count){
     return callback(Math.floor(count/perPage)+1);
   });
 }
module.exports = router;
