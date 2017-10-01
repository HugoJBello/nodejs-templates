var express = require('express');
var md = require("marked");
var Cathegory = require('../models/cathegory');
var router = express.Router();
var PageEntry   =require('../models/page_entry');
var perPage = 10;

router.get('/cathegories/sort=:sort&order=:order&page=:page', function(req, res) {
  if (req.params.page>=1){
        numberOfPagesCathegoriesList(function(pages){
          findCathegories(req.params.page, req.params.sort,req.params.order, function(cathegories){
            return res.render('cathegories', {cathegories:cathegories,
                                                page:req.params.page,
                                                pages:pages,
                                                order:req.params.order,
                                                sort:req.params.sort,
                                                user : req.user});
          });
        });
        }  else {
    return res.render('cathegories', {page:req.params.page,
                                      pages:pages,
                                      user : req.user});
  }

});

function findCathegories (page, sort, order, callback){
  page=page-1

  var sortby = {};
  sortby[sort]=order;

  Cathegory.find({})
  .limit(perPage) 
  .skip(perPage * page)
  .sort(sortby)
  .exec(function(err, cathegories){
    if (err) {
        return undefined;
    }
    return callback(cathegories);
  });
}


router.post('/obtain_cathegory_id', function(req, res) {
  Cathegory.findOne({'name':req.body.cathegory_name}, function(err, cathegory){
    if (err) {
      res.send({cathegory_id:''});
    }
      res.type('json');
      if (cathegory){
        res.send({cathegory_id:cathegory._id});
      } else {
        res.send({cathegory_id:''});
      }
  });
});


 function numberOfPagesCathegoriesList (callback){
   Cathegory.count({}, function( err, count){
      return callback(Math.floor(count/perPage)+1);
   });
 }

module.exports = router;
