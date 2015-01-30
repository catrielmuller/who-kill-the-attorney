/**
 * Created by Empanada8 on 27/12/2014.
 */

function Player(camera){
    var self = this;
    var mass = 5, radius =  1.3;
    var contactNormal = new CANNON.Vec3();
    var shape = new CANNON.Sphere(radius);
    self.enablemove = false;
    self.enableaim = false;

    this.aim = new THREE.Object3D();
    this.objs = [];
    this.flashlight  = new THREE.SpotLight( 0xfffde8,2);
    this.flashlight.castShadow = true;
    this.flashlight.shadowCameraNear = 0.1;
    this.flashlight.shadowCameraFar = 100;//camera.far;
    this.flashlight.shadowCameraFov = 105;
    this.flashlight.shadowMapBias = 0.1;
    this.flashlight.shadowDarkness = 0.8;
    this.flashlight.shadowMapWidth = config.shadowMapRes * 512;
    this.flashlight.shadowMapHeight = config.shadowMapRes * 512;
    this.flashlight.exponent = 80;
   // this.flashlight.shadowCameraVisible = true;
    this.flashlight.visible = true;
    this.flashlight.target = this.aim;

    this.body = new CANNON.Body({ mass: mass});
    this.body.addShape(shape);
    this.body.position.set(0,1.2,0);
    this.body.linearDamping = 0.9;

    this.quat = new THREE.Quaternion();

    this.rotObj = new THREE.Object3D();
    this.rotObj.position.set(0,3,0);

    this.posObj = new THREE.Object3D();
    this.posObj.add( this.rotObj );

    this.rotObj.add(camera);

    this.velocity = new THREE.Vector3();
    this.velocityInput = new THREE.Vector3();

    this.movDirection = {lateral : 0 , forward : 0};

    this.attachTo = function(scene, world){
        scene.add(this.posObj);
        scene.add(this.aim);
        scene.add(this.flashlight);
        world.add(this.body);
    };



    this.body.addEventListener("collide",function(e){
        var contact = e.contact;
        if(contact.bi.id == self.body.id)
            contact.ni.negate(contactNormal);
        else
            contactNormal.copy(contact.ni);
    });



}

Player.prototype.attachObj = function(obj) {

}

Player.prototype.update = function(delta){
  var euler = new THREE.Euler();
  var velocityFactor = 3.5;

  this.velocityInput.set(0,0,0);

  var vel = (this.movDirection.forward !=0 && this.movDirection.lateral !=0) ? velocityFactor * 0.75 : velocityFactor;
  if ( this.movDirection.forward == 1 ){
    this.velocityInput.z = -vel * delta ;
  }
  if ( this.movDirection.forward == -1 ){

    this.velocityInput.z = vel * delta ;
  }

  if ( this.movDirection.lateral == 1 ){
    this.velocityInput.x = -vel * delta;
  }
  if ( this.movDirection.lateral == -1 ){
    this.velocityInput.x = vel * delta;
  }

  // Convert velocity to world coordinates
  euler.x = this.rotObj.rotation.x;
  euler.y = this.posObj.rotation.y;
  euler.order = "XYZ";
  this.quat.setFromEuler(euler);
  this.velocityInput.applyQuaternion(this.quat);

  // Add to the object
  this.body.velocity.x = this.velocityInput.x;
  this.body.velocity.z = this.velocityInput.z;

  this.posObj.position.copy(this.body.position);
  this.position = this.body.position;


  // update aim in front off
  this.aim.position.x = this.posObj.position.x - Math.sin(this.posObj.rotation.y)* Math.cos(this.rotObj.rotation.x) * 5;
  this.aim.position.y = this.posObj.position.y + 1 + Math.sin(this.rotObj.rotation.x) * 5;
  this.aim.position.z = this.posObj.position.z - Math.cos(this.posObj.rotation.y)*  Math.cos(this.rotObj.rotation.x) * 5;

  this.flashlight.position.x = this.posObj.position.x - Math.sin(this.posObj.rotation.y)* Math.cos(this.rotObj.rotation.x) * - 1;
  this.flashlight.position.y = this.posObj.position.y + 4 + Math.sin(this.rotObj.rotation.x) ;
  this.flashlight.position.z = this.posObj.position.z - Math.cos(this.posObj.rotation.y)*  Math.cos(this.rotObj.rotation.x)   * -1;
};
