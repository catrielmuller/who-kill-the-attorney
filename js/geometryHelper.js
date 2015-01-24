/**
 * Created by empanadamovil on 04/01/15.
 */
function GeometryCollision(geometry) {
  var vertices = [];
  for (vertex of geometry.vertices) {
    vertices.push(new CANNON.Vec3(vertex.x, vertex.y, vertex.z));
  }
  var faces = [];
  for (face of geometry.faces) {
    faces.push([face.a, face.b, face.c]);
  }
  return {
    vertices: vertices,
    faces: faces
  };

}

function BoundingBoxCollision(geometry) {
  var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
  var bound = new THREE.BoundingBoxHelper( mesh, 0xff0000 );
  bound.update();
  var vertices = [];
  for (vertex of bound.geometry.vertices) {
    vertices.push(new CANNON.Vec3(vertex.x + bound.position.x , vertex.y + bound.position.y, vertex.z + bound.position.z));
  }
  var faces = [];
  for (face of bound.geometry.faces) {
    faces.push([face.a, face.b, face.c]);
  }
  return {
    vertices: vertices,
    faces: faces,
  };

}
