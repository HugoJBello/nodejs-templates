const encode = require('geojson-polyline').encode
const polygon = require("./poly2.json");
const encoded = encode(polygon);
const urlEncoded = encodeURIComponent(encoded).replace("HH","%28%28").replace("II","%29%29")

console.log(encoded);
const result = encoded["coordinates"];
console.log(result)
encodedResult = "((" + encodeURIComponent(result) + "))"
console.log(encodedResult)
// => { type: 'Polygon', coordinates: ['yvd|Fh~gqNfEqKzBEkEvKwB?'] }

//((k~%7BvF%60ntUA%40LLPLHFtArAvApAfB%7CANKNGPA%40%3FJTDX%3FNALABFFVRt%40l%40pAl%40%7CAx%40ZL%3F%3FRMVGLB%40%3FJHFL%40TARd%40TfBx%40n%40XLBP%40fAN%60ADN%3Fz%40HN%40TDTDdAPLB%7C%40FJBq%40pAi%40dBSdAE~AD%7CAu%40Hs%40RiBz%40mAx%40aAt%40w%40t%40oA~AuA%7CAsAhBi%40%7BDs%40sEnAsDDkDBeBiCyAe%40nBSt%40UOkB%7DBkAwBs%40_BaD_IeAkCn%40%7DDF%3F))