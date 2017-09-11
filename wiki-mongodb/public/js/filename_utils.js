function titleToFilename(title){
  var name = '';
  name=title.replace(' ','_').replace('á','a').replace('é','e').replace('í','i').replace('ó','o').replace('ú','u').replace('ñ','n');
  return name;
}
