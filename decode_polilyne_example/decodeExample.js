const urlStr="%28%28%7B%60svF%7C%60xWsfXikSjoz%40gjp%40fmJhkSugBrtWimi%40rtW%29%29"

const urlStr2 = "((emfvFx}bVqdHquEysAmdE`Lk}Aty%40wXr_%40w_Cbf%40ucAfmAnr%40hmAvXz`B}i%40ds%40k}AjmAsGlgBvX|`Bnr%40oElkH_yIpcL))";
const urlDecoded = decodeURIComponent(urlStr);
const urlDecoded2 = decodeURIComponent(urlStr2);

console.log(urlDecoded);
console.log(urlDecoded2);

var polyline = require('@mapbox/polyline');

var decodedPoly = polyline.decode(urlDecoded)
var decodedPoly2 = polyline.decode(urlDecoded2)

console.log(decodedPoly);
console.log(decodedPoly2);
