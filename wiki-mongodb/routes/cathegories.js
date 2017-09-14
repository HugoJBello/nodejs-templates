var express = require('express');
var md = require("marked");
var Cathegory = require('../models/cathegory');
var router = express.Router();

router.get('/cathegory/:cathegory_id', function(req, res) {
    console.log(req.params.cathegory_id);
    Cathegory.findOne({'_id':req.params.cathegory_id}, function(err, cathegory){
      if (err) throw err;
      if (!cathegory){
        return res.redirect('/category_editor/'+ req.params.cathegory_id);
      } else {
        var descriptionHtml ='';
        if (typeof cathegory.description!== 'undefined') descriptionHtml = md(cathegory.description);
        return res.render('cathegory', {cathegory :  cathegory,descriptionHtml : descriptionHtml, user : req.user});
      }
    });
});

router.get('/cathegory_editor/:cathegory_id', function(req, res) {
    Cathegory.findOne({'_id':req.params.cathegory_id}, function(err, cathegory){
      if (err) throw err;
      if (!cathegory){
        return res.render('cathegory_editor', {cathegory_id :  req.params.cathegory_id, user : req.user});
      } else {
        return res.render('cathegory_editor', {cathegory :  cathegory, user : req.user});
      }
    });
});

module.exports = router;
