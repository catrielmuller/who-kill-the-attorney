var debug = {
  sound: false,
  shadowLight: false,
  lowRes : true,
  bound: false
};


var config = {
  res: 1,
  antialias : true,
  shadowMapRes: 4
};

if(debug.lowRes) {
  var config = {
    res: 0.5,
    antialias : true,
    shadowMapRes: 1
  };
}
