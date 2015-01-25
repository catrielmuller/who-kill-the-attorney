var utils = new common();
var dt = 1/60;

var app = {
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

  app.assets.sounds.menu.options.loops = 100
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

  app.composer.addPass( renderPass );
  app.composer.addPass( copyPass );

  //hblur = new THREE.ShaderPass( THREE.HorizontalBlurShader );
  //app.composer.addPass( hblur );

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

  app.levels.main.textures.clockcanvas = document.getElementById("clocktexture");
  app.levels.main.textures.clockcanvasctx = app.levels.main.textures.clockcanvas.getContext("2d");
  app.levels.main.textures.clockcanvasctx.drawImage(app.assets.images.clocktexture, 0, 0);

  app.levels.main.textures.clocktexture = new THREE.Texture(app.levels.main.textures.clockcanvas);
  app.levels.main.textures.clocktexture.needsUpdate = true;
  
  app.levels.main.textures.clockcanvasctx.fillStyle = "black";
  app.levels.main.textures.clockcanvasctx.font = '60px "LCD"';
  app.levels.main.textures.clockcanvasctx.fillText("03:00:00", 220, 800);

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
  app.levels.main.showaction = function(name, opt1, opt2, act1, act2){
    if(!app.levels.main.showedaction){
      app.levels.main.showedaction = true;
      document.getElementById("iteractor-title").innerHTML = name;
      document.getElementById("iteractor-option1").innerHTML = opt1;
      document.getElementById("iteractor-option2").innerHTML = opt2;

      document.getElementById("interactor").style.display = "block";
    }


  }

  app.levels.main.hideaction = function(){
    if(app.levels.main.showedaction){
      app.levels.main.showedaction = false;
      document.getElementById("interactor").style.display = "none";
    }
  }

  app.levels.main.collisions = function(){
      var pos = app.levels.main.player.body.position;
      var look = app.levels.main.player.lookat();

      if(pos.x > 11.6 && pos.x < 16 && pos.z < -4.3 && pos.z > -4.4 ){
        if(look == 'n'){
          app.levels.main.showaction('Horno', 'Prender', 'Otro', null, null);
          return;
        }
      }

      app.levels.main.hideaction();
      //console.log(pos.x + ' ' + pos.z);
  }

  app.levels.main.restart = function(){
    app.assets.sounds.music.stop();
    document.getElementById("black").style.display = "block";

    var canvas = document.querySelector('canvas');
    canvas.requestPointerLock();


    app.levels.main.player.body.position.set(5.7, 1.2, 2.3);
    app.levels.main.cameras.main.position.set(0,0,0);
    app.levels.main.cameras.main.rotation.set(0,0,0);
    
    app.assets.sounds.menu.stop();
    document.getElementById("start").style.display = "none";

    setTimeout(function(){
      app.assets.sounds.disparo2.play();

      setTimeout(function(){
        app.assets.sounds.caidamuerte.play();

        app.animate();

        app.shaders.hblur = new THREE.ShaderPass( THREE.HorizontalBlurShader );
        app.shaders.vblur = new THREE.ShaderPass( THREE.VerticalBlurShader );


        app.composer.addPass( app.shaders.hblur );
        app.composer.addPass( app.shaders.vblur );

        document.getElementById("black").style.display = "none";
        var down = new TWEEN.Tween( app.levels.main.cameras.main.position )
            .to( { y: -2 }, 500 ).easing( TWEEN.Easing.Cubic.In ).start();
        var downl = new TWEEN.Tween( app.levels.main.cameras.main.rotation )
            .to( { x: -0.5, y: -1.5, z: -1 }, 500 ).easing( TWEEN.Easing.Cubic.In ).start();


        app.assets.sounds.music.play();

      }, 500);
    }, 500);


  }


}





app.animate = function(time){
    requestAnimationFrame(app.animate);

    app.levels.main.collisions();
    app.levels.main.physics.world.step(dt);
    var timeFrame =  (Date.now() - app.timer )* 0.1;
    app.levels.main.player.update(timeFrame);
    update_light();
    app.render.render(app.levels.main.scene, app.levels.main.cameras.main);
    app.timer = Date.now();
    TWEEN.update(time);

    app.composer.render(0.05);
}

app.load();

function update_light() {
  app.levels.main.lights.hemiLight2.position.copy(app.levels.main.player.position);
}


