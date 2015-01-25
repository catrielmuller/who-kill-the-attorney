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
    url: 'swf/',
    flashVersion: 9,
    debugMode: false,
    onready: function() {
      app.loadSounds();
    }
  });

  app.loader.addProgressListener(function(e) {
    var cant = 100 / (e.completedCount / e.totalCount)
    document.getElementById("loadercount").style.width = cant + '%';
  });

  app.loader.addCompletionListener(function(e){
    app.init();
  });

}

app.loadSounds = function(){
  app.assets.sounds.thunder = app.loader.addSound('thunder','sounds/thunder.mp3');
  app.assets.sounds.rain = app.loader.addSound('rain','sounds/rain.mp3');
  app.assets.sounds.music = app.loader.addSound('music','sounds/music.mp3');

  app.loadImages();
}

app.loadImages = function(){

  app.loadJsons();
}

app.loadJsons = function(){
  app.assets.jsons.scene = app.loader.addJson('assets/scene1.json');
  app.assets.jsons.floor = app.loader.addJson('assets/scene1-p1.json');

  app.assets.jsons.cocina = app.loader.addJson('assets/mapa1/cocina.json');
  app.assets.jsons.alacena = app.loader.addJson('assets/mapa1/alacena.json');

  app.assets.jsons.heladera = app.loader.addJson('assets/mapa1/heladera.json');
  app.assets.jsons.mesada = app.loader.addJson('assets/mapa1/mesada.json');

  app.assets.jsons.lampara_cocina = app.loader.addJson('assets/mapa1/lampara_cocina.json');
  app.assets.jsons.cocina_pared = app.loader.addJson('assets/mapa1/cocina_pared.json');
  app.assets.jsons.cocina_piso = app.loader.addJson('assets/mapa1/piso_cocina.json');
  app.assets.jsons.cocina_techo = app.loader.addJson('assets/mapa1/techo_cocina.json');
  app.assets.jsons.ciudad = app.loader.addJson('assets/mapa1/ciudad.json');

  app.assets.jsons.reloj = app.loader.addJson('assets/mapa1/reloj.json');
  app.assets.jsons.mano = app.loader.addJson('assets/mapa1/mano.json');


  app.assets.jsons.mesa_luz = app.loader.addJson('assets/mapa1/mesa_luz.json');
  app.assets.jsons.mesa = app.loader.addJson('assets/mapa1/mesa.json');

  app.assets.jsons.collision = app.loader.addJson('assets/mapa1/collision.json');

  app.loader.start();
}
var pos = {
  x : 10.3,
  y: 0.6,
  z: 12.7
};
app.init = function(){

  app.window.width = window.innerWidth * config.res;
  app.window.height = window.innerHeight * config.res;

  app.render = new THREE.WebGLRenderer({antialias: config.antialias});

  app.render.setSize(app.window.width, app.window.height);
  app.render.shadowMapEnabled = true;
  app.render.shadowMapType  = THREE.BasicShadowMap;
  app.render.setClearColor(0x00000, 1);
  document.body.appendChild(app.render.domElement);

  utils.lockPointer();

  app.levels.main = {
    cameras: {},
    lights: {},
    objs: {},
    events: {},
    cast: []
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

  app.levels.main.lights.l2 = new THREE.PointLight( 0x00ffff , 2, 10);
  app.levels.main.lights.l2.position.set(-10,3,-2);
  app.levels.main.scene.add(app.levels.main.lights.l2);

  app.levels.main.lights.hemiLight3 = new THREE.HemisphereLight( 0xbe8d6e, 0x394153, 0.1 );
  //app.levels.main.lights.hemiLight2 = new THREE.HemisphereLight( 0x425552, 0xfef3e6, 0.00 );


 // app.levels.main.lights.hemiLight3 = new THREE.PointLight( 0xbe8d6e, 2, 10 );
  app.levels.main.lights.hemiLight2 = new THREE.PointLight( 0x425552, 2, 10 );

  app.levels.main.scene.add(app.levels.main.lights.hemiLight2);
  app.levels.main.scene.add(app.levels.main.lights.hemiLight3);

  app.levels.main.cameras.main = new THREE.PerspectiveCamera(60, app.window.width / app.window.height, 1, 1000);
  app.levels.main.scene.add(app.levels.main.cameras.main);

  app.levels.main.player = new Player(app.levels.main.cameras.main);
  app.levels.main.player.attachTo(app.levels.main.scene, app.levels.main.physics.world);

  app.levels.main.controls = new Controls(app.levels.main.player, utils);
  app.levels.main.controls.zoom(app.levels.main.cameras.main);
/*
  var parse = app.jsonloader.parse(app.assets.jsons.scene.data, 'assets/');
  var obj ={geometry: parse.geometry, materials: parse.materials};
  var collisionBound = BoundingBoxCollision(parse.geometry);

  app.levels.main.objs.cama = new Object3D(obj,collisionBound);
  app.levels.main.objs.cama.move(0,0,0);
  app.levels.main.objs.cama.attachTo(app.levels.main.scene, app.levels.main.physics.world);

  var parse = app.jsonloader.parse(app.assets.jsons.scene.data, 'assets/');
  var obj ={geometry: parse.geometry, materials: parse.materials};
  var collisionBound = BoundingBoxCollision(parse.geometry);

  app.levels.main.objs.cama2 = new Object3D(obj,collisionBound);
  app.levels.main.objs.cama2.move(0,0,8);
  app.levels.main.objs.cama2.attachTo(app.levels.main.scene, app.levels.main.physics.world);

*/


  document.getElementById("loaderwrapper").style.display = 'none';
  parse = app.jsonloader.parse(app.assets.jsons.cocina.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.cocina = new Object3D(obj);
  app.levels.main.objs.cocina.attachTo(app.levels.main.scene);


  parse = app.jsonloader.parse(app.assets.jsons.alacena.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.alacena = new Object3D(obj);
  app.levels.main.objs.alacena.attachTo(app.levels.main.scene);

  parse = app.jsonloader.parse(app.assets.jsons.heladera.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.heladera = new Object3D(obj);
  app.levels.main.objs.heladera.attachTo(app.levels.main.scene);

  parse = app.jsonloader.parse(app.assets.jsons.mesada.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.mesada = new Object3D(obj);
  app.levels.main.objs.mesada.attachTo(app.levels.main.scene);

  parse = app.jsonloader.parse(app.assets.jsons.lampara_cocina.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.lampara_cocina = new Object3D(obj);
  app.levels.main.objs.lampara_cocina.attachTo(app.levels.main.scene);


  parse = app.jsonloader.parse(app.assets.jsons.cocina_pared.data, './assets/mapa1/');
  parse.materials[0].envMap =  parse.materials[0].diffMap;
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.cocina_pared = new Object3D(obj);
  app.levels.main.objs.cocina_pared.attachTo(app.levels.main.scene);

  parse = app.jsonloader.parse(app.assets.jsons.cocina_techo.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.cocina_techo = new Object3D(obj);
  app.levels.main.objs.cocina_techo.attachTo(app.levels.main.scene);


  parse = app.jsonloader.parse(app.assets.jsons.cocina_piso.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.cocina_piso = new Object3D(obj);
  app.levels.main.objs.cocina_piso.attachTo(app.levels.main.scene);

  parse = app.jsonloader.parse(app.assets.jsons.mesa.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.mesa = new Object3D(obj);
  app.levels.main.objs.mesa.attachTo(app.levels.main.scene);

  app.levels.main.objs.mesa_cocina = new Object3D(obj);
  app.levels.main.objs.mesa_cocina.attachTo(app.levels.main.scene);
  app.levels.main.objs.mesa_cocina.mesh.scale.set(0.65,0.65,0.65);

  app.levels.main.objs.mesa_cocina.move(10.3, 0.6,12.7);


  parse = app.jsonloader.parse(app.assets.jsons.mesa_luz.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.mesa_luz = new Object3D(obj);
  app.levels.main.objs.mesa_luz.attachTo(app.levels.main.scene);

  parse = app.jsonloader.parse(app.assets.jsons.ciudad.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.ciudad = new Object3D(obj);
  app.levels.main.objs.ciudad.attachTo(app.levels.main.scene);
  app.levels.main.objs.ciudad.mesh.receiveShadow = false;


  parse = app.jsonloader.parse(app.assets.jsons.reloj.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.reloj = new Object3D(obj,null,5);


  app.levels.main.objs.reloj.attachTo(app.levels.main.scene);
  app.levels.main.cameras.main.add(app.levels.main.objs.reloj.mesh);
  app.levels.main.objs.reloj.mesh.position.set(-2.2,-2.4,-1);
  app.levels.main.objs.reloj.mesh.rotation.set(Math.PI *0.2,Math.PI *0.9 ,Math.PI *0.1);

  parse = app.jsonloader.parse(app.assets.jsons.mano.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.mano = new Object3D(obj,null,5, true);
  app.levels.main.objs.mano.attachTo(app.levels.main.scene);





  app.levels.main.cameras.main.add(app.levels.main.objs.mano.mesh);
  app.levels.main.objs.mano.mesh.position.set(-2.2,-2.4,-1);
  app.levels.main.objs.mano.mesh.rotation.set(Math.PI *0.2,Math.PI *0.9 ,Math.PI *0.1);


  var parse = app.jsonloader.parse(app.assets.jsons.collision.data, '/assets/mapa1/');
  var obj ={geometry: parse.geometry, materials: parse.materials};
  var collisionBound = GeometryCollision(parse.geometry);

  app.levels.main.objs.collision = new Object3D(obj,collisionBound);
  app.levels.main.objs.collision.move(0,0,0);
  app.levels.main.objs.collision.attachTo(false, app.levels.main.physics.world);

  app.animate();
}





app.animate = function(){
    requestAnimationFrame(app.animate);
    app.levels.main.physics.world.step(dt);
    var timeFrame =  (Date.now() - app.timer )* 0.1;
    app.levels.main.player.update(timeFrame);
  update_hand();

  update_light();
    app.render.render(app.levels.main.scene, app.levels.main.cameras.main);
    app.timer = Date.now();
}

app.load();

function update_light() {
  //app.levels.main.lights.hemiLight3.position.copy(app.levels.main.player.position);
  app.levels.main.lights.hemiLight2.position.copy(app.levels.main.player.position);

}

function update_hand() {
  //var player =  app.levels.main.player;
  //console.log(player.posObj);

  //app.levels.main.objs.mano.move(player.aim.position.x *0.9 ,player.aim.position.y + 1,player.aim.position.z *0.9);
  //app.levels.main.objs.reloj.move(player.aim.position.x *0.9 ,player.aim.position.y + 1,player.aim.position.z *0.9);

  //app.levels.main.objs.reloj.mesh.quaternion.copy(player.quat);
//  app.levels.main.objs.mano.mesh.quaternion.copy(player.quat);
//  app.levels.main.objs.mano.mesh.rotation.set(player.rotObj.rotation.x,player.posObj.rotation.y,player.rotObj.rotation.z);

}


