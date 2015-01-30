var resin = window.location.hash.substring(1);
if(resin == 'hd'){
  var lowres = false;
  document.getElementById("enablehd").className = 'active';
}
else {
  var lowres = true; 
  document.getElementById("enablesd").className = 'active';
}




var debug = {
  sound: false,
  shadowLight: false,
  lowRes : lowres,
  bound: false
};

var config = {
  res: 1,
  antialias : true,
  shadowMapRes: 4
};

if(debug.lowRes) {
  var config = {
    res: 0.40,
    antialias : false,
    shadowMapRes: 2
  };
}
