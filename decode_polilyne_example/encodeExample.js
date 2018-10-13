const pointsArray = [ [ -0.00005, -0.00005 ],
[ 40.57113, -4.06052 ],
[ 40.70035, -3.95615 ],
[ 40.39565, -3.70347 ],
[ 40.33705, -3.80784 ],
[ 40.3538, -3.93418 ],
[ 40.57113, -4.06052 ],
[ 40.57118, -4.06047 ] ];

const pointsArray2 = [ [ -0.00005, -0.00005 ],
[ 40.50654, -3.78866 ],
[ 40.55351, -3.75433 ],
[ 40.56708, -3.72274 ],
[ 40.56499, -3.70764 ],
[ 40.5556, -3.70352 ],
[ 40.55038, -3.68292 ],
[ 40.54412, -3.67193 ],
[ 40.5316, -3.68017 ],
[ 40.51907, -3.68429 ],
[ 40.50341, -3.67742 ],
[ 40.49506, -3.66232 ],
[ 40.48252, -3.66094 ],
[ 40.46581, -3.66506 ],
[ 40.45014, -3.6733 ],
[ 40.45118, -3.72137 ],
[ 40.50654, -3.78866 ],
[ 40.50659, -3.78861 ] ]

var polyline = require('@mapbox/polyline');


const polylineEncoded = polyline.encode(pointsArray2);
console.log(polylineEncoded);
//HH{`svF|`xWsfXikSjoz@gjp@fmJhkSugBrtWimi@rtWII

const urlEncoded = encodeURIComponent(polylineEncoded).replace("HH","%28%28").replace("II","%29%29")

//%28%28%7B%60svF%7C%60xWsfXikSjoz%40gjp%40fmJhkSugBrtWimi%40rtW%29%29

console.log(urlEncoded);

//https://www.idealista.com/en/areas/venta-viviendas/?shape=%28%28%7B%60svF%7C%60xWsfXikSjoz%40gjp%40fmJhkSugBrtWimi%40rtW%29%29
//https://www.idealista.com/en/areas/venta-viviendas/?shape=%28%28%7B%60svF%7C%60xWsfXikSjoz%40gjp%40fmJhkSugBrtWimi%40rtW%29%29

//https://www.idealista.com/en/areas/venta-viviendas/?shape=%28%28emfvFx%7DbVqdHquEysAmdE%60Lk%7DAty%40wXr_%40w_Cbf%40ucAfmAnr%40hmAvXz%60B%7Di%40ds%40k%7DAjmAsGlgBvX%7C%60Bnr%40oElkH_yIpcL%29%29