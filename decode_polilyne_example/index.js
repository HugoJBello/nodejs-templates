  //const decodePolyline = require('decode-google-map-polyline');
  //const polyline = 'neuaEejkbUEGc@j@PXl@p@P\\a@f@GHyDtEgC`DoCfDzHbQp@rAbH`JdBtBrCjDn@p@dDbDfIvHfD~CrK~Jo@z@uCrDmJnL}^ld@mVjZmQrTgArAFJ';
  const polylineStr = 'aunvF|rqWiyb@sia@pyLsvdA|bf@hcm@ecP||x@'
  //console.log(decodePolyline(polylineStr));
    
  console.log("------------")
  var polyline = require('@mapbox/polyline');

  // returns an array of lat, lon pairs
  //polyline.decode('_p~iF~ps|U_ulLnnqC_mqNvxq`@');

  //console.log(polyline.decode(polylineStr));
  
  const coordsArray = [[38.5, -120.2], [40.7, -120.95], [43.252, -126.453]];
  // returns a string-encoded polyline
  const encoded = polyline.encode(coordsArray);

  const encodedAndUrl = encodeURI(encoded);

  console.log(encodedAndUrl);  
  
  