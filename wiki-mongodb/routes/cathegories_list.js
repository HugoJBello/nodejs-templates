var express = require('express');
var md = require("marked");
var Cathegory = require('../models/cathegory');
var router = express.Router();
var PageEntry   =require('../models/page_entry');
var SN = require('sync-node');
var pn = SN.createQueue();

var perPage = 10;

router.get('/cathegories/page=:page', function(req, res) {
  if (req.params.page>=1){
    numberOfPagesCathegoriesList(function(pages){
      findCathegories(req.params.page, function(cathegories, entriesForEachCathegory){
        console.log(entriesForEachCathegory);
        console.log(cathegories);
        return res.render('cathegories', {page:req.params.page,pages:pages,
                                          cathegories: cathegories,
                                          entriesForEachCathegory: entriesForEachCathegory,
                                          user : req.user});
      });
    });
  }  else {
    return res.render('cathegories', {page:req.params.page,pages:pages, user : req.user});
  }
});

function findCathegories (page, callback){
  page=page-1
  Cathegory.find({})
  .limit(perPage)
  .skip(perPage * page)
  .exec(function(err, cathegories){
    if (err) throw err;
    var entriesForEachCathegory = [];
    for (var i=0; i<cathegories.length; i++){
        if (cathegories[i]){
          countEntriesWithCathegory(cathegories[i].name,function(count){
            entriesForEachCathegory.push(count);
            console.log(entriesForEachCathegory);
          });
        } else {
          entriesForEachCathegory.push(0);
        }
    }
    return callback(cathegories,entriesForEachCathegory);
  });
}

function countEntriesWithCathegory (cathegory_name, callback){
  PageEntry.count({'cathegories':cathegory_name})
  .exec(function(err, count){
    if (err) throw err;
    return callback(count);
  });
}


 function numberOfPagesCathegoriesList (callback){
   Cathegory.count({}, function( err, count){
      return callback(Math.floor(count/perPage));
   });
 }

module.exports = router;
