var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var CategorySchema = new Schema({
  name: String,
  created_at: Date,
  updated_at: Date
});

var entrySchema = new Schema({
  name: String,
  content:String,
  categories:  [CategorySchema],
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var  WikiEntry = mongoose.model('WikiEntry', entrySchema);

// make this available to our users in our Node applications
module.exports =  WikiEntry;
