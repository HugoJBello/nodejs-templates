const urlStr="%28%28%7B%60svF%7C%60xWsfXikSjoz%40gjp%40fmJhkSugBrtWimi%40rtW%29%29"

const urlDecoded = decodeURIComponent(urlStr);

console.log(urlDecoded);

var polyline = require('@mapbox/polyline');

var decodedPoly = polyline.decode(urlDecoded)
console.log(decodedPoly);
