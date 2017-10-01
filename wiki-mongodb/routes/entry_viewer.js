var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var PageEntry   =require('../models/page_entry');
var md = require("marked");
var path = require("path");
var router = express.Router();
var renameUtils = require('../utils/rename_utils')

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

router.get('/entry_viewer/:entry_name',
 //isAuthenticated,
 function(req, res) {
    PageEntry.findOne({'name':req.params.entry_name}, function(err, entry){
      if (err) throw err;
      if (!entry){
        return res.redirect('/entry_editor/'+ req.params.entry_name);
      } else {
        var referencedContents =  manageInternarReferences(entry.content);
         var contentHtml = md(referencedContents);
        return res.render('entry_viewer', {entry :  entry,contentHtml : contentHtml, user : req.user});
      }
    });
});

router.get('/refresh/:entry_name', function(req, res) {
    PageEntry.findOne({'name':req.params.entry_name}, function(err, entry){
      if (err) throw err;
      if (entry) {
        contentHtml = md(entry.content);
        return res.send('entry_viewer', {content :  entry.content, contentHtml : contentHtml, user : req.user});
      }
    });
});

function manageInternarReferences(mdEntry){
  regex= '/\[(.+?)\]/g';
  var links = mdEntry.match(/\[(.*?)\]\((.*?)\)/g);
  if (links){
    for (var i=0; i< links.length; i++){
      if (!((links[i].includes('http://'))&& (links[i].includes('https://')))){
        var insideParenthesis = extractFronParenthesis(links[i]);
        console.log('---' + insideParenthesis);
        var cleanLink = links[i].replace('('+insideParenthesis+')','('+ titleToFilename(insideParenthesis)+')');
        console.log('---' + cleanLink);

      //  var replacedText = new RegExp(links[i], 'g');
        mdEntry=mdEntry.replace(links[i], cleanLink);
      }
    }
  }
  return mdEntry;
}

function titleToFilename(title){
var name = '';
name=title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
return name;
}


function extractFronParenthesis(str){
  var regex= '/\((.+?)\)/g';
  var extracted='';
  if(str.match(/\((.+?)\)/g)) {
    extracted = str.match(/\((.+?)\)/g).pop().replace('(','').replace(')','');
  }
  return extracted;
}

module.exports = router;
