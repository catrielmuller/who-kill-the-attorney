var utils = new common();
var dt = 1/60;

var app = {
  assets: {
    sounds: {},
    jsons: {}
  },
  levels: {},
  window: {},
  timer: new Date()
};


//init();
//animate();

app.load = function(){
  app.loader = new PxLoader();
  app.jsonloader = new THREE.JSONLoader();

  app.soundManager = soundManager.setup({
    url: '/swf/',
    flashVersion: 9,
    debugMode: false,
    onready: function() {
      app.loadSounds();
    }
  });

  app.loader.addProgressListener(function(e) {
    var text = e.completedCount + ' / ' + e.totalCount;
    document.getElementById("loader").innerHTML = text;
  });

  app.loader.addCompletionListener(function(e){
    app.init();
  });

}

app.loadSounds = function(){
  app.assets.sounds.thunder = app.loader.addSound('thunder','/sounds/thunder.mp3');
  app.assets.sounds.rain = app.loader.addSound('rain','/sounds/rain.mp3');
  app.assets.sounds.music = app.loader.addSound('music','/sounds/music.mp3');

  app.loadImages();
}

app.loadImages = function(){

  app.loadJsons();
}

app.loadJsons = function(){
  app.assets.jsons.scene = app.loader.addJson('assets/scene1.json');
  app.assets.jsons.floor = app.loader.addJson('assets/scene1-p1.json');

  app.loader.start();
}

app.init = function(){

  app.window.width = window.innerWidth * config.res;
  app.window.height = window.innerHeight * config.res;

  app.render = new THREE.WebGLRenderer({antialias: config.antialias});
  app.render.setSize(app.window.width, app.window.height);
  app.render.shadowMapEnabled = true;
  app.render.shadowMapType  = THREE.BasicShadowMap;
  app.render.setClearColor(0x000000, 1);
  document.body.appendChild(app.render.domElement);

  utils.lockPointer();

  app.levels.main = {
    cameras: {},
    lights: {},
    objs: {}
  }
  
  app.levels.main.scene = new THREE.Scene();
  app.levels.main.physics = new Physics();

  app.levels.main.lights.main = new THREE.SpotLight( 0xffffff , 0 );
  app.levels.main.lights.main.position.set(0,6,-20);
  app.levels.main.lights.main.castShadow = true;
  app.levels.main.lights.main.shadowMapWidth = 512;
  app.levels.main.lights.main.shadowMapHeight = 512;
  app.levels.main.lights.main.shadowCameraNear = 5;
  app.levels.main.lights.main.shadowCameraFov = 55;
  app.levels.main.lights.main.shadowDarkness = 0.0;
  app.levels.main.scene.add(app.levels.main.lights.main);

  app.levels.main.lights.l2 = new THREE.PointLight( 0x00ffff , 2, 5);
  app.levels.main.lights.l2.position.set(-4,3,-2);
  app.levels.main.scene.add(app.levels.main.lights.l2);

  app.levels.main.lights.hemiLight2 = new THREE.HemisphereLight( 0x0d154f, 0x51a7b1, 0.1 );
  app.levels.main.scene.add(app.levels.main.lights.hemiLight2);

  app.levels.main.cameras.main = new THREE.PerspectiveCamera(45, app.window.width / app.window.height, 0.1, 1000);
  app.levels.main.scene.add(app.levels.main.cameras.main);

  app.levels.main.player = new Player(app.levels.main.cameras.main);
  app.levels.main.player.attachTo(app.levels.main.scene, app.levels.main.physics.world);

  app.levels.main.controls = new Controls(app.levels.main.player, utils);
  app.levels.main.controls.zoom(app.levels.main.cameras.main);

  var parse = app.jsonloader.parse(app.assets.jsons.scene.data, '/assets/');
  var obj ={geometry: parse.geometry, materials: parse.materials};
  var collisionBound = BoundingBoxCollision(parse.geometry);

  app.levels.main.objs.cama = new Object3D(obj,collisionBound);
  app.levels.main.objs.cama.move(0,0,0);
  app.levels.main.objs.cama.attachTo(app.levels.main.scene, app.levels.main.physics.world);

  app.levels.main.objs.cama2 = new Object3D(obj,collisionBound);
  app.levels.main.objs.cama2.move(0,0,8);
  app.levels.main.objs.cama2.attachTo(app.levels.main.scene, app.levels.main.physics.world);
  
  var parse = app.jsonloader.parse(app.assets.jsons.floor.data, '/assets/');
  var obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.floor = new Object3D(obj);
  app.levels.main.objs.floor.attachTo(app.levels.main.scene);
  
  app.animate();
}

app.animate = function(){
    requestAnimationFrame(app.animate);
    app.levels.main.physics.world.step(dt);
    var timeFrame =  (Date.now() - app.timer )* 0.1;
    app.levels.main.player.update(timeFrame);
    app.render.render(app.levels.main.scene, app.levels.main.cameras.main);
    app.timer = Date.now();
}

app.load();



