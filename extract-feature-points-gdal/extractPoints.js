var gdal = require("gdal");
var dataset = gdal.open("./data/Alcorcón_SECC_CPV_E_20111101_01_R_INE_MADRID.shp");
var layer = dataset.layers.get(0);
 
console.log("number of features: " + layer.features.count());
console.log("fields: " + layer.fields.getNames());
console.log("extent: " + JSON.stringify(layer.extent));
console.log("srs: " + (layer.srs ? layer.srs.toWKT() : 'null'));