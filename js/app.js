var scene, camera, renderer;
var physics ;
var player ;
var utils = new common();
var dt = 1/60;
var controls;
var cama, cama2;
var mesa = [];
var light;
var boxes = [];
var boxMeshes = [];


init();
animate();



function init() {
    scene = new THREE.Scene();
    physics = new Physics();
    var trueno = new Audio('sounds/thunder.mp3');


  light = new THREE.SpotLight( 0xffffff , 0 );
  light.position.set(0,6,-20);
    if(true){
      light.castShadow = true;
      light.shadowMapWidth = 512;
      light.shadowMapHeight = 512;
      light.shadowCameraNear = 5;
      light.shadowCameraFov = 55;
      light.shadowDarkness = 0.0;
      //light.shadowCameraVisible = true;
    }
    setInterval(function(){
        var time = 100;

        if (debug.sound) trueno.play();

        setTimeout(function(){

            light.intensity = 2;
            light.shadowDarkness = 0.9;
            renderer.setClearColor(0xFFFFFF, 1);

        },time);
        setTimeout(function(){
            light.intensity = 0.5;
            light.shadowDarkness = 0.99;
            renderer.setClearColor(0x000000, 1);

        },time * 2);
        setTimeout(function(){
            light.intensity = 2;
            light.shadowDarkness = 0.9;
            renderer.setClearColor(0xFFFFFF, 1);


        },time *3);
        setTimeout(function(){
            light.intensity = 00;
            light.shadowDarkness = 0.0;
            renderer.setClearColor(0x000000, 1);

        },time * 5.5);
    },15000);



    var l2 = new THREE.PointLight( 0x00ffff , 2, 5);
    l2.position.set(-4,3,-2);

    scene.add(l2);
    scene.add(light);

    var WIDTH = window.innerWidth * config.res,
        HEIGHT = window.innerHeight * config.res;
    renderer = new THREE.WebGLRenderer({antialias: config.antialias});
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType  = THREE.BasicShadowMap;
    document.body.appendChild(renderer.domElement);
    utils.lockPointer();


    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 1000);
    scene.add(camera);
    player = new Player(camera);
    player.attachTo(scene, physics.world);
    controls = new Controls(player, utils);
    controls.zoom(camera);

    renderer.setClearColor(0x000000, 1);



    var loader = new THREE.JSONLoader();
    //loader.parseJSON()

    loader.load('assets/scene1.json', function(geometry, materials) {
        var obj ={geometry: geometry, materials: materials};
        var collisionBound = BoundingBoxCollision(geometry);

        cama = new Object3D(obj,collisionBound);
        cama.move(0,0,0);
        cama.attachTo(scene, physics.world);

        cama2 = new Object3D(obj,collisionBound);
        cama2.move(0,0,8);
        cama2.attachTo(scene,physics.world);
    });

    loader.load('assets/scene1-m1.json', function(geometry, materials) {

      var obj ={geometry: geometry, materials: materials};
      var collisionBound = GeometryCollision(geometry);

      mesa[0] = new Object3D(obj, 5);
      mesa[0].move(0,0,0);
      mesa[0].attachTo(scene,physics.world);

      mesa[1] = new Object3D(obj);
      mesa[1].move(0,0,4);
      mesa[1].attachTo(scene, physics.world);

    });

    loader.load('assets/scene1-p1.json', function(geometry, materials){
      var obj ={geometry: geometry, materials: materials};
      var piso = new Object3D(obj);
      piso.attachTo(scene);

    });

  loader.load('assets/cortina.json', function(geometry, materials){

    var obj ={geometry: geometry, materials: materials};
    var collisionBound = BoundingBoxCollision(geometry);
    var cortina = new Object3D(obj );
    cortina.attachTo(scene, physics.world);
  });

    loader.load('assets/scene1-wr1.json', function(geometry, materials){
      var obj ={geometry: geometry, materials: materials};
      var rejas = new Object3D(obj);
      rejas.attachTo(scene);
    });
    loader.load('assets/scene1-w1.json', function(geometry, materials){
      var obj ={geometry: geometry, materials: materials};
      var collisionBound = GeometryCollision(geometry);
      var wallCeramicas = new Object3D(obj,collisionBound);
      wallCeramicas.attachTo(scene, physics.world);
    });

    loader.load('assets/scene1-wa1.json', function(geometry, materials){
      var obj ={geometry: geometry, materials: materials};
      var collisionBound = GeometryCollision(geometry);
      var wallConcreto = new Object3D(obj,collisionBound);
      wallConcreto.attachTo(scene, physics.world);
    });


    var hemiLight2 = new THREE.HemisphereLight( 0x0d154f, 0x51a7b1, 0.1 );
    scene.add(hemiLight2);


}

var timer = new Date();
function animate() {
    requestAnimationFrame(animate);
    physics.world.step(dt);
    var timeFrame =  (Date.now() - timer )* 0.1;
    player.update(timeFrame);
    renderer.render(scene, camera);
    timer = Date.now();
}
