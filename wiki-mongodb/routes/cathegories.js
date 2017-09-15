var express = require('express');
var md = require("marked");
var Cathegory = require('../models/cathegory');
var router = express.Router();

router.get('/cathegory/:cathegory_id', function(req, res) {
    console.log(req.params.cathegory_id);
    Cathegory.findOne({'_id':req.params.cathegory_id}, function(err, cathegory){
      if (err) throw err;
      console.log(cathegory);
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
      return res.redirect('/cathegory/'+req.body._id);    });
module.exports = router;
