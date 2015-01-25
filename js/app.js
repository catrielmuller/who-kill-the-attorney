var utils = new common();
var dt = 1/60;

var app = {
  isinit: false,
  assets: {
    sounds: {},
    jsons: {},
    images: {}
  },
  levels: {},
  window: {},
  timer: new Date(),
  shaders: {}
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
  app.assets.sounds.menu = app.loader.addSound('menu', 'sounds/menu.mp3');
  app.assets.sounds.caidamuerte = app.loader.addSound('caidamuerte', 'sounds/caidamuerte.mp3');
  app.assets.sounds.abriendocajon = app.loader.addSound('abriendocajon', 'sounds/abriendocajon.mp3');
  app.assets.sounds.abriendoventana = app.loader.addSound('abriendoventana', 'sounds/abriendoventana.mp3');
  app.assets.sounds.ambientevecindario = app.loader.addSound('ambientevecindario', 'sounds/ambientevecindario.mp3');
  app.assets.sounds.carajo1 = app.loader.addSound('carajo1', 'sounds/carajo1.mp3');
  app.assets.sounds.carajo2 = app.loader.addSound('carajo2', 'sounds/carajo2.mp3');
  app.assets.sounds.cellularring = app.loader.addSound('cellularring', 'sounds/cellularring.mp3');
  app.assets.sounds.contestacion911 = app.loader.addSound('contestacion911', 'sounds/contestacion911.mp3');
  app.assets.sounds.contestacion9112 = app.loader.addSound('contestacion9112', 'sounds/contestacion9112.mp3');
  app.assets.sounds.contestadortelefono = app.loader.addSound('contestadortelefono', 'sounds/contestadortelefono.mp3');
  app.assets.sounds.disparo1 = app.loader.addSound('disparo1', 'sounds/disparo1.mp3');
  app.assets.sounds.disparo2 = app.loader.addSound('disparo2', 'sounds/disparo2.mp3');
  app.assets.sounds.disparo3 = app.loader.addSound('disparo3', 'sounds/disparo3.mp3');
  app.assets.sounds.flashbackfx = app.loader.addSound('flashbackfx', 'sounds/flashbackfx.mp3');
  app.assets.sounds.lavandoselasmanos = app.loader.addSound('lavandoselasmanos', 'sounds/lavandoselasmanos.mp3');
  app.assets.sounds.letengoquecontarestoaalguien = app.loader.addSound('letengoquecontarestoaalguien', 'sounds/letengoquecontarestoaalguien.mp3');
  app.assets.sounds.music = app.loader.addSound('music', 'sounds/music.mp3');
  app.assets.sounds.papelarrugado1 = app.loader.addSound('papelarrugado1', 'sounds/papelarrugado1.mp3');
  app.assets.sounds.pasandohojas = app.loader.addSound('pasandohojas', 'sounds/pasandohojas.mp3');
  app.assets.sounds.pasos = app.loader.addSound('pasos', 'sounds/pasos.mp3');
  app.assets.sounds.pasos2 = app.loader.addSound('pasos2', 'sounds/pasos2.mp3');
  app.assets.sounds.puerta1 = app.loader.addSound('puerta1', 'sounds/puerta1.mp3');
  app.assets.sounds.puerta2 = app.loader.addSound('puerta2', 'sounds/puerta2.mp3');
  app.assets.sounds.quedaslimpio1 = app.loader.addSound('quedaslimpio1', 'sounds/quedaslimpio1.mp3');
  app.assets.sounds.quehagoahora1 = app.loader.addSound('quehagoahora1', 'sounds/quehagoahora1.mp3');
  app.assets.sounds.quehagoahora2 = app.loader.addSound('quehagoahora2', 'sounds/quehagoahora2.mp3');
  app.assets.sounds.radionoticia = app.loader.addSound('radionoticia', 'sounds/radionoticia.mp3');
  app.assets.sounds.radiostatic = app.loader.addSound('radiostatic', 'sounds/radiostatic.mp3');
  app.assets.sounds.respiracionpasos1 = app.loader.addSound('respiracionpasos1', 'sounds/respiracionpasos1.mp3');
  app.assets.sounds.respiracionpasos2 = app.loader.addSound('respiracionpasos2', 'sounds/respiracionpasos2.mp3');
  app.assets.sounds.respiracionpasos3 = app.loader.addSound('respiracionpasos3', 'sounds/respiracionpasos3.mp3');
  app.assets.sounds.romperpapel1 = app.loader.addSound('romperpapel1', 'sounds/romperpapel1.mp3');
  app.assets.sounds.saldo = app.loader.addSound('saldo', 'sounds/saldo.mp3');
  app.assets.sounds.tuneradio = app.loader.addSound('tuneradio', 'sounds/tuneradio.mp3');
  app.assets.sounds.tvnoticias = app.loader.addSound('tvnoticias', 'sounds/tvnoticias.mp3');

  app.loadImages();
}

app.loadImages = function(){

  app.assets.images.clocktexture = app.loader.addImage('assets/mapa1/reloj_diff.jpg');


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
  app.assets.jsons.cocina_piso = app.loader.addJson('assets/mapa1/piso_all.json');
  app.assets.jsons.pared_1 = app.loader.addJson('assets/mapa1/pared_1.json');

  app.assets.jsons.pared_2 = app.loader.addJson('assets/mapa1/pared_2.json');
  app.assets.jsons.cama = app.loader.addJson('assets/mapa1/cama.json');
  app.assets.jsons.lavarropas = app.loader.addJson('assets/mapa1/lavarropas.json');
  app.assets.jsons.lavadero = app.loader.addJson('assets/mapa1/lavadero.json');
  app.assets.jsons.sillon = app.loader.addJson('assets/mapa1/sillon.json');
  app.assets.jsons.sillon_2 = app.loader.addJson('assets/mapa1/sillon_2.json');
  app.assets.jsons.foto = app.loader.addJson('assets/mapa1/foto.json');

  app.assets.jsons.vidrio = app.loader.addJson('assets/mapa1/vidrio.json');

  app.assets.jsons.cocina_techo = app.loader.addJson('assets/mapa1/techo_all.json');
  app.assets.jsons.ciudad = app.loader.addJson('assets/mapa1/ciudad.json');
  app.assets.jsons.ciudad_2 = app.loader.addJson('assets/mapa1/ciudad_2.json');
  app.assets.jsons.veladores = app.loader.addJson('assets/mapa1/veladores.json');
  app.assets.jsons.caja = app.loader.addJson('assets/mapa1/cajafuerte.json');

  app.assets.jsons.reloj = app.loader.addJson('assets/mapa1/reloj.json');
  app.assets.jsons.mano = app.loader.addJson('assets/mapa1/mano.json');


  app.assets.jsons.mesa_luz = app.loader.addJson('assets/mapa1/mesa_luz.json');
  app.assets.jsons.mesa = app.loader.addJson('assets/mapa1/mesa.json');

  app.assets.jsons.mesa_2 = app.loader.addJson('assets/mapa1/mesa_2.json');


  app.assets.jsons.collision = app.loader.addJson('assets/mapa1/collision.json');

  app.loader.start();
}

app.soundlevels = function(){
  app.assets.sounds.music.volume = 50
}

app.init = function(){

  app.soundlevels();
  app.assets.sounds.menu.options.loops = 1000
  app.assets.sounds.ambientevecindario.options.loops = 100
  app.assets.sounds.menu.play();

  app.window.width = window.innerWidth * config.res;
  app.window.height = window.innerHeight * config.res;

  app.render = new THREE.WebGLRenderer({antialias: config.antialias});
  app.render.setPixelRatio( window.devicePixelRatio );

  app.render.setSize(app.window.width, app.window.height);
  app.render.shadowMapEnabled = true;
  app.render.shadowMapType  = THREE.BasicShadowMap;
  app.render.setClearColor(0x00000, 1);
  document.body.appendChild(app.render.domElement);

  app.composer = new THREE.EffectComposer( app.render  );


  utils.lockPointer();

  app.levels.main = {
    cameras: {},
    lights: {},
    objs: {},
    events: {},
    cast: [],
    textures: {}
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


  app.levels.main.lights.l3 = new THREE.PointLight( 0xff0000 ,2.2, 10);
  app.levels.main.lights.l3.position.set(7,2,6);
  app.levels.main.scene.add(app.levels.main.lights.l3);

  app.levels.main.lights.l4 = new THREE.PointLight( 0x00ff00 ,1.5, 10);
  app.levels.main.lights.l4.position.set(13,2,14);
  app.levels.main.scene.add(app.levels.main.lights.l4);

  app.levels.main.lights.l4 = new THREE.PointLight( 0x00ffff ,1.5, 10);
  app.levels.main.lights.l4.position.set(12,2,-21);
  app.levels.main.scene.add(app.levels.main.lights.l4);




  app.levels.main.lights.hemiLight3 = new THREE.HemisphereLight( 0xbe8d6e, 0x394153, 0.1 );
  //app.levels.main.lights.hemiLight2 = new THREE.HemisphereLight( 0x425552, 0xfef3e6, 0.00 );


 // app.levels.main.lights.hemiLight3 = new THREE.PointLight( 0xbe8d6e, 2, 10 );
  app.levels.main.lights.hemiLight2 = new THREE.PointLight( 0x425552, 2, 10 );

  app.levels.main.scene.add(app.levels.main.lights.hemiLight2);
  app.levels.main.scene.add(app.levels.main.lights.hemiLight3);

  app.levels.main.cameras.main = new THREE.PerspectiveCamera(60, app.window.width / app.window.height, 1, 1000);
  app.levels.main.scene.add(app.levels.main.cameras.main);

  var renderPass = new THREE.RenderPass( app.levels.main.scene, app.levels.main.cameras.main );
  var copyPass = new THREE.ShaderPass( THREE.CopyShader );
  copyPass.renderToScreen = true;

  var effectSepia = new THREE.ShaderPass( THREE.SepiaShader  );
  var effectVignette = new THREE.ShaderPass( THREE.VignetteShader  );
  effectSepia.uniforms[ "amount" ].value = 0.5;
  effectVignette.uniforms[ "offset" ].value = 0.95;
  effectVignette.uniforms[ "darkness" ].value = 1;
  var effectFilm = new THREE.FilmPass( 0.35, 0.025, 648, false );

  app.composer.addPass( renderPass );
  app.composer.addPass( effectSepia );
  app.composer.addPass( effectFilm );
  app.composer.addPass( effectVignette );
  app.composer.addPass( copyPass );

  app.levels.main.player = new Player(app.levels.main.cameras.main);
  app.levels.main.player.attachTo(app.levels.main.scene, app.levels.main.physics.world);

  app.levels.main.controls = new Controls(app.levels.main.player, utils);
  app.levels.main.controls.zoom(app.levels.main.cameras.main);

  document.getElementById("loaderwrapper").style.display = 'none';
  parse = app.jsonloader.parse(app.assets.jsons.cocina.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.cocina = new Object3D(obj);
  app.levels.main.objs.cocina.attachTo(app.levels.main.scene);

  parse = app.jsonloader.parse(app.assets.jsons.veladores.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.veladores = new Object3D(obj);
  app.levels.main.objs.veladores.attachTo(app.levels.main.scene);

  parse = app.jsonloader.parse(app.assets.jsons.caja.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.caja = new Object3D(obj);
  app.levels.main.objs.caja.attachTo(app.levels.main.scene);

  parse = app.jsonloader.parse(app.assets.jsons.pared_1.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.pared_1 = new Object3D(obj);
  app.levels.main.objs.pared_1.attachTo(app.levels.main.scene);

  parse = app.jsonloader.parse(app.assets.jsons.vidrio.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.vidrio = new Object3D(obj);
  app.levels.main.objs.vidrio.attachTo(app.levels.main.scene);

  parse = app.jsonloader.parse(app.assets.jsons.sillon.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.sillon = new Object3D(obj);
  app.levels.main.objs.sillon.attachTo(app.levels.main.scene);

  parse = app.jsonloader.parse(app.assets.jsons.sillon_2.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.sillon_2 = new Object3D(obj);
  app.levels.main.objs.sillon_2.attachTo(app.levels.main.scene);

  parse = app.jsonloader.parse(app.assets.jsons.lavarropas.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.lavarropas = new Object3D(obj);
  app.levels.main.objs.lavarropas.attachTo(app.levels.main.scene);

  parse = app.jsonloader.parse(app.assets.jsons.lavadero.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.lavadero = new Object3D(obj);
  app.levels.main.objs.lavadero.attachTo(app.levels.main.scene);

  parse = app.jsonloader.parse(app.assets.jsons.cama.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.cama = new Object3D(obj);
  app.levels.main.objs.cama.attachTo(app.levels.main.scene);

  parse = app.jsonloader.parse(app.assets.jsons.foto.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.foto = new Object3D(obj);
  app.levels.main.objs.foto.attachTo(app.levels.main.scene);


  parse = app.jsonloader.parse(app.assets.jsons.pared_2.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.pared_2 = new Object3D(obj);
  app.levels.main.objs.pared_2.attachTo(app.levels.main.scene);

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

  parse = app.jsonloader.parse(app.assets.jsons.mesa_2.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.mesa_2 = new Object3D(obj);
  app.levels.main.objs.mesa_2.attachTo(app.levels.main.scene);

  parse = app.jsonloader.parse(app.assets.jsons.mesa.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.mesa = new Object3D(obj);
  app.levels.main.objs.mesa.attachTo(app.levels.main.scene);



  parse = app.jsonloader.parse(app.assets.jsons.mesa_luz.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.mesa_luz = new Object3D(obj);
  app.levels.main.objs.mesa_luz.attachTo(app.levels.main.scene);




  parse = app.jsonloader.parse(app.assets.jsons.ciudad.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.ciudad = new Object3D(obj);
  app.levels.main.objs.ciudad.attachTo(app.levels.main.scene);
  app.levels.main.objs.ciudad.mesh.receiveShadow = false;

  parse = app.jsonloader.parse(app.assets.jsons.ciudad_2.data, './assets/mapa1/');
  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.ciudad_2 = new Object3D(obj);
  app.levels.main.objs.ciudad_2.attachTo(app.levels.main.scene);
  app.levels.main.objs.ciudad_2.mesh.receiveShadow = false;

  parse = app.jsonloader.parse(app.assets.jsons.reloj.data, './assets/mapa1/');

  app.levels.main.textures.clockcanvas = document.getElementById("clocktexture");
  app.levels.main.textures.clockcanvasctx = app.levels.main.textures.clockcanvas.getContext("2d");

  app.levels.main.textures.clocktexture = new THREE.Texture(app.levels.main.textures.clockcanvas);
  app.levels.main.textures.clocktexture.needsUpdate = true;

  app.levels.main.textures.clockcanvasctx.drawImage(app.assets.images.clocktexture, 0, 0);
  app.levels.main.textures.clockcanvasctx.fillStyle = "black";
  app.levels.main.textures.clockcanvasctx.font = '50px "LCD"';
  app.levels.main.textures.clockcanvasctx.fillText("00:00:00", 210, 825);

  obj ={geometry: parse.geometry, materials: parse.materials};
  app.levels.main.objs.reloj = new Object3D(obj,null,5, true);

  app.levels.main.objs.reloj.mesh.material.map = app.levels.main.textures.clocktexture;
  app.levels.main.objs.reloj.mesh.material.needsUpdate = true;
  app.levels.main.objs.reloj.mesh.material.map.needsUpdate = true;

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

  app.levels.main.clockdead = false;
  app.levels.main.clockinit = function(hh, mm, ss){
    app.levels.main.clockdate = new Date();
    app.levels.main.clockdate.setHours(hh);
    app.levels.main.clockdate.setMinutes(mm);
    app.levels.main.clockdate.setSeconds(ss);
  }

  app.levels.main.clockloop = function(){
    function n(n){
        return n > 9 ? "" + n: "0" + n;
    }

    app.levels.main.clockdate.setSeconds(app.levels.main.clockdate.getSeconds() + 1);

    if(app.levels.main.clockdead){
      var min = app.levels.main.clockdate.getMinutes();
      var seg = app.levels.main.clockdate.getSeconds();
      if(min >= 29){
        if(seg >= 55){
            app.levels.main.clockdead = false;
            document.getElementById("black").style.background = "black";
            document.getElementById("black").style.display = "block";
            setTimeout(function(){
              app.levels.main.restart();
            }, 2000);
        }
      }
    }


    var str= n(app.levels.main.clockdate.getHours())+":"+n(app.levels.main.clockdate.getMinutes())+":"+n(app.levels.main.clockdate.getSeconds());
    app.levels.main.textures.clockcanvasctx.drawImage(app.assets.images.clocktexture, 0, 0);
    app.levels.main.textures.clockcanvasctx.fillStyle = "black";
    app.levels.main.textures.clockcanvasctx.font = '60px "LCD"';
    app.levels.main.textures.clockcanvasctx.fillText(str, 190, 825);
    app.levels.main.objs.reloj.mesh.material.map = app.levels.main.textures.clocktexture;
    app.levels.main.objs.reloj.mesh.material.needsUpdate = true;
    app.levels.main.objs.reloj.mesh.material.map.needsUpdate = true;
    window.setTimeout("app.levels.main.clockloop()",1000);
  }

  app.levels.main.clockinit(0,0,0);
  app.levels.main.clockloop();

  app.levels.main.player.lookat = function(){
    var posbody = app.levels.main.player.body.position;
    var posaim = app.levels.main.player.aim.position;
    var diffz = posbody.z - posaim.z;
    if(diffz > 2){
      return 'n';
    }
    if(diffz < -2){
      return 's';
    }
    var diffx = posbody.x - posaim.x;
    if(diffx > 2){
      return 'o';
    }
    if(diffx < -2){
      return 'e';
    }
  }

  app.levels.main.showedaction = false;
  app.levels.main.currentActtion = null;
  app.levels.main.showaction = function(name, opt1, act1){
    if(!app.levels.main.showedaction){
      app.levels.main.showedaction = true;
      document.getElementById("iteractor-title").innerHTML = name;
      document.getElementById("iteractor-option1").innerHTML = opt1;
      document.getElementById("interactor").style.display = "block";

      if(act1 != null){
        app.levels.main.currentActtion = act1;
      }
    }
  }

  app.levels.main.showsubtitle = function(text){
    document.getElementById("subtitle").innerHTML = text;
    setTimeout(function(){
      document.getElementById("subtitle").innerHTML = '';   
    }, 2500);
  }

  app.levels.main.hideaction = function(){
    if(app.levels.main.showedaction){
      app.levels.main.showedaction = false;
      app.levels.main.currentActtion = null;
      document.getElementById("interactor").style.display = "none";
    }
  }

  app.levels.main.ambientplay = false;
  app.levels.main.clearambientsounds = function(){
    app.assets.sounds.ambientevecindario.stop();
    app.levels.main.ambientplay = false;
  }

  app.levels.main.collisions = function(){
      var pos = app.levels.main.player.body.position;
      var look = app.levels.main.player.lookat();

      //console.log(pos.x + ' ' + pos.z);

      if(pos.x > 12.4 && pos.x < 16.23 && pos.z > -4.41 && pos.z < -4.10 ){
        if(look == 'n'){
          app.levels.main.showaction('Cocina', 'Encender', function(){
            app.levels.main.showsubtitle('No creo tener hambre en esta situación');
          });
          return;
        }
      }
      else if( pos.x > 12.94 && pos.x < 15.37 && pos.z > -4.41 && pos.z < 1.64  ) {
        if(look == 'e'){
          if(app.levels.main.ambientplay == false){
            app.levels.main.ambientplay = true;
            app.assets.sounds.ambientevecindario.play();
          }
          
          app.levels.main.showsubtitle('No tengo tiempo para mirar el paisaje');
          return;
        }
      }
      else if( pos.x > -10.90 && pos.x < 14.29 && pos.z > -28.62 && pos.z < -24.31  ) {
        if(look == 'n'){
          if(app.levels.main.ambientplay == false){
            app.levels.main.ambientplay = true;
            app.assets.sounds.ambientevecindario.play();
          }
          app.levels.main.showsubtitle('No tengo tiempo para mirar el paisaje');
          return;
        }
      }
      else if( pos.x > 4.25 && pos.x < 6.5 && pos.z > 7.1 && pos.z < 7.82  ) {
        if(look == 's'){
          app.levels.main.showaction('Cajón', 'Abrir', function(){
            app.assets.sounds.abriendocajon.play();
            app.levels.main.showsubtitle('8760, ¿Para qué sirve éste número?');
            setTimeout(function(){
              app.assets.sounds.quehagoahora1.play();
            }, 1000);
          });
          return;
        }
      }

      
      app.levels.main.clearambientsounds();
      app.levels.main.hideaction();
  }

  app.levels.main.standup = function(){

    app.levels.main.player.body.position.set(7.13, 1.29, 2.5);
    app.levels.main.cameras.main.position.set(0,0,0);
    app.levels.main.cameras.main.rotation.set(0,0,0);

    app.levels.main.clockinit(3,25,0);

    app.levels.main.player.enablemove = true;
    app.levels.main.player.enableaim = true;

    document.getElementById("black").style.display = "none";

    app.assets.sounds.music.play();
    app.levels.main.clockdead = true;

    setTimeout(function(){
      app.levels.main.player.hidehand();
    }, 4000);

  }

  app.levels.main.player.showedhand = true;
  app.levels.main.player.hidehand = function(){
    app.levels.main.player.showedhand = false;

    var down = new TWEEN.Tween( app.levels.main.objs.reloj.mesh.rotation )
            .to( { y: 0 }, 500 ).easing( TWEEN.Easing.Cubic.In ).start();
    var downl = new TWEEN.Tween( app.levels.main.objs.mano.mesh.rotation )
        .to( { y: 0 }, 500 ).easing( TWEEN.Easing.Cubic.In ).start();
    var down = new TWEEN.Tween( app.levels.main.objs.reloj.mesh.position )
            .to( { y: -4 }, 500 ).easing( TWEEN.Easing.Cubic.In ).start();
    var downl = new TWEEN.Tween( app.levels.main.objs.mano.mesh.position )
        .to( { y: -4 }, 500 ).easing( TWEEN.Easing.Cubic.In ).start();

  }

   app.levels.main.player.showhand = function(){
    app.levels.main.player.showedhand = true;

    var up = new TWEEN.Tween( app.levels.main.objs.reloj.mesh.rotation )
            .to( { y: Math.PI *0.9 }, 500 ).easing( TWEEN.Easing.Cubic.Out ).start();
    var up = new TWEEN.Tween( app.levels.main.objs.mano.mesh.rotation )
        .to( { y: Math.PI *0.9}, 500 ).easing( TWEEN.Easing.Cubic.Out ).start();
    var up = new TWEEN.Tween( app.levels.main.objs.reloj.mesh.position )
            .to( { y: -2.4 }, 500 ).easing( TWEEN.Easing.Cubic.Out ).start();
    var up = new TWEEN.Tween( app.levels.main.objs.mano.mesh.position )
        .to( { y: -2.4 }, 500 ).easing( TWEEN.Easing.Cubic.Out ).start();
   }

   app.levels.main.newgame = true;

  app.levels.main.restart = function(){
    
    app.levels.main.clockdead = false;
    document.getElementById("black").style.background = "black";
    document.getElementById("black").style.display = "block";

    app.render.domElement.requestPointerLock();

    app.levels.main.player.body.position.set(5.7, 1.2, 2.3);
    app.levels.main.cameras.main.position.set(0,0,0);
    app.levels.main.cameras.main.rotation.set(0,0,0);

    app.assets.sounds.menu.stop();
    document.getElementById("start").style.display = "none";

    if(app.levels.main.newgame){
      app.levels.main.newgame = false;
      var timeout = 500;
    }
    else {
      var timeout = 50;
    }

    setTimeout(function(){
      app.assets.sounds.disparo2.play();

      setTimeout(function(){
        app.assets.sounds.music.stop();
        app.assets.sounds.caidamuerte.play();
        app.levels.main.clockinit(3,30,0);

        app.animate();

        document.getElementById("black").style.display = "none";
        var down = new TWEEN.Tween( app.levels.main.cameras.main.position )
            .to( { y: -3.3 }, 500 ).easing( TWEEN.Easing.Cubic.In ).start();
        var downl = new TWEEN.Tween( app.levels.main.cameras.main.rotation )
            .to( { x: -0.5, y: -1.5, z: -1 }, 500 ).easing( TWEEN.Easing.Cubic.In ).start();

        setTimeout(function(){
          document.getElementById("black").style.background = "white";
          document.getElementById("black").style.display = "block";

          app.assets.sounds.flashbackfx.play();

          setTimeout(function(){
            app.levels.main.standup();
          }, 1000);
        }, 5000);

      }, 500);
    }, timeout);


  }

  app.isinit = true;
}





app.animate = function(time){
    requestAnimationFrame(app.animate);

    app.levels.main.collisions();
    app.levels.main.physics.world.step(dt);
    var timeFrame =  (Date.now() - app.timer )* 0.1;
    app.levels.main.player.update(timeFrame);
    update_light();
    //app.render.render(app.levels.main.scene, app.levels.main.cameras.main);
    app.timer = Date.now();
    TWEEN.update(time);

    app.composer.render();
}

app.load();

function update_light() {
  app.levels.main.lights.hemiLight2.position.copy(app.levels.main.player.position);
}


