function Controls(player, utils){
  var PI_2 = Math.PI / 2;

  utils.pressKey(82, function(){
  }, function(){
    if(player.enablemove){
      if(app.levels.main.player.showedhand){
        app.levels.main.player.hidehand();
      }
      else {
        app.levels.main.player.showhand();
      }
    }
  });

  utils.pressKey(69, function(){
  }, function(){
    app.levels.main.debug();
  });

  utils.pressKey(87, function(){
    if(player.enablemove){
      player.movDirection.forward = 1;
    }
  }, function(){
    player.movDirection.forward = 0;
  });

  utils.pressKey(83, function(){
    if(player.enablemove){
      player.movDirection.forward = -1;
    }
  }, function(){
    player.movDirection.forward = 0;
  });

  utils.pressKey(65, function(){
    if(player.enablemove){
      player.movDirection.lateral = 1;
    }  
  }, function(){
    player.movDirection.lateral = 0;
  });

  utils.pressKey(68, function(){
    if(player.enablemove){
      player.movDirection.lateral = -1;
    }  
  }, function(){
    player.movDirection.lateral = 0;
  });

  document.addEventListener( 'mousemove', function(event){
    var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    if(player.enableaim){
      player.posObj.rotation.y -= movementX * 0.002;
      player.rotObj.rotation.x -= movementY * 0.002;
      player.rotObj.rotation.x = Math.max( - PI_2, Math.min( PI_2, player.rotObj.rotation.x ) );
    }
  }, false );

}

Controls.prototype.zoom = function(camera){
  var animZoom = [];
  document.addEventListener('mousedown', function(event){
    if(app.isinit){
      if(app.levels.main.currentActtion != null){
        app.levels.main.currentActtion();
      }
    }
    
    if(animZoom[1]) clearInterval(animZoom[1]);

    animZoom[0] = setInterval(function(){
      camera.fov = camera.fov - 1;
      camera.updateProjectionMatrix();

      if(camera.fov < 45 ) {
        clearInterval(animZoom[0]);
      };
    },10);

  }, false );

  document.addEventListener('mouseup', function(event){
    if(animZoom[0]) clearInterval(animZoom[0]);

    animZoom[1] = setInterval(function(){
      camera.fov = camera.fov + 1;
      camera.updateProjectionMatrix();

      if(camera.fov > 55 ) {
        clearInterval(animZoom[1]);
      };

    },10);

  }, false );
};
