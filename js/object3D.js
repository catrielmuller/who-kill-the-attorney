/**
 * Created by i7 on 04/01/15.
 */
function Object3D( obj, collision, mass, shadow) {
    obj.geometry.computeFaceNormals();
    obj.geometry.computeVertexNormals();
    //obj.materials[0].side = THREE.doubleSided;
    this.visible = true;
    this.mesh = new THREE.MorphAnimMesh(obj.geometry, obj.materials[0])
    if(!shadow) {
      this.mesh.receiveShadow = true;
    }
    this.mesh.castShadow = true ;

  //this.mesh.doubleSided = true;

    this.body = new CANNON.Body({ mass: mass ? mass: 0 });
    this.body.position.set(0,0,0);
    this.mesh.position.copy(this.body.position);
    //this.mesh.doubleSided = true;

    if(collision) {
      this.collision(collision);
    }

    if(debug.bound){
      this.bound = new THREE.BoundingBoxHelper( this.mesh, 0xff0000 );
      this.bound.update();
    }
}

Object3D.prototype.collision = function(collision){
  var boxShape = new CANNON.ConvexPolyhedron(collision.vertices, collision.faces);
  this.body.addShape(boxShape);
}

Object3D.prototype.move = function(x,y,z){
  this.body.position.set(x,y,z);
  this.mesh.position.copy(this.body.position);
  if(debug.bound)this.bound.update();

};


Object3D.prototype.attachTo = function(scene, world){
    if(scene)scene.add(this.mesh);
    if(debug.bound)scene.add(this.bound);
    if(world)world.add(this.body);

};

Object3D.prototype.update = function() {
    this.mesh.position.copy(this.body.position);
    this.mesh.quaternion.copy(this.body.quaternion);
};

