var express = require('express');
var md = require("marked");
var router = express.Router();
var PageEntry   =require('../models/page_entry');
var perPage = 20;

router.get('/entry_list/sort=:sort&order=:order&page=:page', function(req, res) {
  if(req.params.page>=1){
    numberOfPages(function(pages){
      findEntries(req.params.page,req.params.sort,req.params.order, function(entries){
        return res.render('entry_list', {entries:entries, page:req.params.page,
                                          pages:pages,
                                          order:req.params.order,
                                          sort:req.params.sort,
                                          user : req.user});

        });
    });
  } else {
    return res.render('entry_list', {page:req.params.page,pages:1, user : req.user});

  }
});



router.get('/search_result/text=:text&sort=:sort&order=:order&page=:page', function(req, res) {
  if(req.params.page>=1){
    numberOfPages(function(pages){
      findEntriesWithText(req.params.text,req.params.page,req.params.sort,req.params.order, function(entries){
        return res.render('search_result', {entries:entries, page:req.params.page,
                                          pages:pages,
                                          order:req.params.order,
                                          sort:req.params.sort,
                                          user : req.user});

        });
    });
  } else {
    return res.render('search_result', {page:req.params.page,pages:1, user : req.user});

  }
});

router.post('/search', function(req, res) {
  var text = req.body.text;
  return res.redirect('/search_result/text=' +text + '&sort=updated_at&order=-1&page=1')
});


function findEntriesWithText (text,page, sort, order, callback){
  page = page-1;
  PageEntry.find({$or:[
    {'title':{"$regex": text, "$options": "i" }},
    {'content':{"$regex": text, "$options": "i" }}
    ]},
    function(err,docs){
        if(!err) return(docs);
    })
  .limit(perPage)
  .skip(perPage * page)
  .sort({sort: order})
  .exec(function(err, entries){
    if (err) throw err;
    return callback(entries);
    console.log(entries);
  });
}

function findEntries (page, sort, order, callback){
  page = page-1;

  var sortby = {};
  sortby[sort]=order;

  PageEntry.find({})
  .limit(perPage)
  .skip(perPage * page)
  .sort(sortby)
  .exec(function(err, entries){
    if (err) throw err;
    return callback(entries);
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
     return callback(Math.floor(count/perPage)+1);
   });
 }


module.exports = router;
