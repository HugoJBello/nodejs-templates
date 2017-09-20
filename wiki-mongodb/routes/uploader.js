var express = require('express');
var multer = require('multer');
var router = express.Router();

var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./public/uploads");
     },
     filename: function(req, file, callback) {
         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
     }
 });

 var upload = multer({
     storage: Storage
 }).array("imgUploader", 3); //Field name and max count


 router.get("/upload/:entry_name", function(req, res) {
   return res.render('upload', {entry_name:req.params.entry_name, user : req.user});
 });

 router.post("/upload/:entry_name", function(req, res) {
   console.log(req.entry);
     upload(req, res, function(err) {
         if (err) {
             return res.render('upload', {entry_name:req.params.entry_name, user : req.user, result:"Something went wrong!"});
         }
         return res.render('upload', {entry_name:req.params.entry_name, user : req.user, result: "File uploaded sucessfully!"});
     });
 });

module.exports = router;
