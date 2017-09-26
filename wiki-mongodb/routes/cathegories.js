var express = require('express');
var md = require("marked");
var Cathegory = require('../models/cathegory');
var router = express.Router();
var PageEntry   =require('../models/page_entry');
var perPage = 10;

router.get('/cathegory/cat=:cathegory_id&page=:page', function(req, res) {
  if (req.params.page>=1){
    Cathegory.findOne({'_id':req.params.cathegory_id}, function(err, cathegory){
      if (err) throw err;
      if (!cathegory){
        return res.redirect('/category_editor/'+ req.params.cathegory_id);
      } else {
        numberOfPages(cathegory.name, function(pages){
          findEntriesWithCathegory(cathegory.name,req.params.page, function(entries){
            console.log('entries');
            console.log(entries);
            var descriptionHtml ='';
            if (typeof cathegory.description!== 'undefined') descriptionHtml = md(cathegory.description);
            return res.render('cathegory', {cathegory :  cathegory,entries:entries, page:req.params.page,pages:pages, descriptionHtml : descriptionHtml, user : req.user});
          });
        });
        }
    });
  }   else {
    return res.render('cathegory', {page:req.params.page,pages:pages, user : req.user});
  }

});

router.get('/cathegory_editor/:cathegory_id', function(req, res) {
    Cathegory.findOne({'_id':req.params.cathegory_id}, function(err, cathegory){
      if (err) throw err;
      console.log(cathegory);

      if (!cathegory){
        return res.render('cathegory_editor', {cathegory_id :  req.params.cathegory_id, user : req.user});
      } else {
        return res.render('cathegory_editor', {cathegory :  cathegory, user : req.user});
      }
    });
});

router.post('/cathegory_editor', function(req, res) {
  var cathegory = new Cathegory({'_id': req.body._id,
                            'name':req.body.cathegory_name,
                            'description':req.body.description,
                            'modified_at': new Date()});
  if (req.body.new =='true'){
    entry.created_at = new Date();
    Cathegory.create(cathegory, function(err,raw){
      if (err) throw err;
    return res.redirect('/cathegory/'+req.body._id);
    });
  } else  {
    Cathegory.findByIdAndUpdate(req.body._id, cathegory, function(err,raw){
      if (err) throw err;
      return res.redirect('/cathegory/'+req.body._id);
    });
  }
});

router.post('/obtain_cathegory_id', function(req, res) {
  Cathegory.findOne({'name':req.body.cathegory_name}, function(err, cathegory){
    if (err) throw err;
    res.type('json');
    res.send({cathegory_id:cathegory._id});
  });
});


function findEntriesWithCathegory (cathegory_name,page, callback){
  page=page-1
  PageEntry.find({'cathegories':cathegory_name})
  .limit(perPage)
  .skip(perPage * page)
  .exec(function(err, entries){
    if (err) throw err;
    return callback(entries);
  });
}

 function numberOfPages (cathegory_name,callback){
   PageEntry.count({'cathegories':cathegory_name}, function( err, count){
     console.log( "Number of entries", count/perPage );
     return callback(Math.floor(count/perPage));
   });
 }

module.exports = router;
