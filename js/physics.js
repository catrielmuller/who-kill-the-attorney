/**
 * Created by Empanada8 on 27/12/2014.
 */
var Physics = function() {
    var world, physicsMaterial;
    world = new CANNON.World();

    world.quatNormalizeSkip = 0;
    world.quatNormalizeFast = true;

    var solver = new CANNON.GSSolver();

    solver.iterations = 20;
    solver.tolerance = 0.001;

    var split = true;

    if(split)
        world.solver = new CANNON.SplitSolver(solver);
    else
        world.solver = solver;

    world.gravity.set(0,-20,0);
    world.broadphase = new CANNON.NaiveBroadphase();

    this.physicsMaterial = new CANNON.Material();

    var physicsContactMaterial = new CANNON.ContactMaterial(
        this.physicsMaterial,
        this.physicsMaterial,
        {
            friction: 0.1,
            restitution: 0.5,
            contactEquationStiffness: 1e8,
            contactEquationRegularizationTime: 1,
            frictionEquationStiffness: 1e8,
            frictionEquationRegularizationTime: 1
        }
    );
    world.addContactMaterial(physicsContactMaterial);

    var groundShape = new CANNON.Plane();
    var groundBody = new CANNON.Body({ mass: 0 , material: this.physicsMaterial});

    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    world.add(groundBody);

    this.world = world;

};
