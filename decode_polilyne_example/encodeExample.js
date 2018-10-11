const pointsArray = [ [ -0.00005, -0.00005 ],
[ 40.57113, -4.06052 ],
[ 40.70035, -3.95615 ],
[ 40.39565, -3.70347 ],
[ 40.33705, -3.80784 ],
[ 40.3538, -3.93418 ],
[ 40.57113, -4.06052 ],
[ 40.57118, -4.06047 ] ];

var polyline = require('@mapbox/polyline');


const polylineEncoded = polyline.encode(pointsArray);

console.log(polylineEncoded);

const urlEncoded = encodeURIComponent(polylineEncoded).replace("HH","%28%28").replace("II","%29%29")

//%28%28%7B%60svF%7C%60xWsfXikSjoz%40gjp%40fmJhkSugBrtWimi%40rtW%29%29

console.log(urlEncoded);

//https://www.idealista.com/en/areas/venta-viviendas/?shape=%28%28%7B%60svF%7C%60xWsfXikSjoz%40gjp%40fmJhkSugBrtWimi%40rtW%29%29
//https://www.idealista.com/en/areas/venta-viviendas/?shape=%28%28%7B%60svF%7C%60xWsfXikSjoz%40gjp%40fmJhkSugBrtWimi%40rtW%29%29