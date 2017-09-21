var express = require('express');
var multer = require('multer');
var fs = require('fs');
var File = require('../models/file');
var PageEntry = require('../models/page_entry');
var router = express.Router();

var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./public/uploads");
     },
     filename: function(req, file, callback) {
         //callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
         callback(null,file.originalname);
     }
 });

 var upload = multer({
     storage: Storage
 }).array("imgUploader", 3); //Field name and max count


 router.get("/upload/:entry_name", function(req, res) {
   PageEntry.findOne({'name':req.params.entry_name}, function(err, entry){
     if (err) throw err;
     return res.render('upload', {entry:entry, user : req.user});
  });
 });

 router.post("/upload/:entry_name", function(req, res) {
   PageEntry.findOne({'name':req.params.entry_name}, function(err, entry){
     if (err) throw err;
     upload(req, res, function(err) {
       if (err) {
         return res.render('upload', {entry:entry, user : req.user, result:"Something went wrong!"});
       }
       for (var i=0; i< req.files.length; i++){
         var file = new File({'filename':req.files[i].filename,
                            'base64':base64_encode("./public/uploads/" + req.files[i].filename),
                            'modified_at': new Date()});
        File.create(file, function(err,raw){
            if (err) throw err;
          //delete the file...
        });
      }
      return res.render('upload', {entry:entry, user : req.user, result: "File uploaded sucessfully!"});
     });
   });
 });

 router.get("/images/:image_name", function(req, res) {
     File.findOne({filename:req.params.image_name}, function(err, file){
       if (err) throw err;
       var decodedBuffer = new Buffer(file.base64,"base64");
       var img = new Buffer(file.base64,"base64");
       res.writeHead(200, {
      'Content-Length': img.length
      });
      res.end(img);
    });

 });

 function base64_encode(file) {
     // read binary data
     var bitmap = fs.readFileSync(file);
     // convert binary data to base64 encoded string
     return new Buffer(bitmap).toString('base64');
 }
module.exports = router;
