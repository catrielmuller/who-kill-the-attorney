/**
 * Created by Empanada8 on 28/12/2014.
 */
function common() {
    var self = this;
    this.lockPointer = function() {

        var canvas = app.render.domElement;

        canvas.requestPointerLock = canvas.requestPointerLock ||
        canvas.mozRequestPointerLock ||
        canvas.webkitRequestPointerLock;

        document.exitPointerLock = document.exitPointerLock ||
        document.mozExitPointerLock ||
        document.webkitExitPointerLock;

        canvas.onclick = function() {
            canvas.requestPointerLock();
        }
    };

    /*
    window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth * config.res,
            HEIGHT = window.innerHeight * config.res;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    });
    */

    document.addEventListener('pointerlockchange', lockChangeAlert, false);
    document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
    document.addEventListener('webkitpointerlockchange', lockChangeAlert, false);

    function lockChangeAlert() {
        var canvas = document.querySelector('canvas');
        
        if(document.pointerLockElement === canvas ||
            document.mozPointerLockElement === canvas ||
            document.webkitPointerLockElement === canvas) {
            //console.log('The pointer lock status is now locked');
        }
    }
    this.key = [];

    var onKeyDown = function(e){
        if(self.key) {
            for(var i=0; i < self.key.length; i++){
              if(e.keyCode == self.key[i].keyCode){
                  self.key[i].firstAction();
              }
            }
        }
    };
    var onKeyUp = function(e){
        if(self.key) {
            for(var i=0; i < self.key.length; i++){
                if(e.keyCode == self.key[i].keyCode){
                    self.key[i].secondAction();
                }
            }
        }
    }
    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );
}

common.prototype.pressKey = function(keyCode,firstAction, secondAction ) {

    this.key.push({'keyCode': keyCode,'firstAction': firstAction,'secondAction': secondAction});
}

