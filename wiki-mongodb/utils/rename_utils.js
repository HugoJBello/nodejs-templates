exports.titleToFilename =function (title){
  var name = '';
  name=title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  return name; 
}
