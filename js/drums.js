/**
 * Created by DrTone on 01/06/2015.
 */

//Init this app from base
function DrumApp() {
    BaseApp.call(this);
}

DrumApp.prototype = new BaseApp();

DrumApp.prototype.init = function(container) {
    BaseApp.prototype.init.call(this, container);
};

DrumApp.prototype.createScene = function() {
    //Create scene
    BaseApp.prototype.createScene.call(this);

    //Create floor
    var floorGeom = new THREE.CylinderGeometry(400, 400, 10, 24, 1);
    var floorMat = new THREE.MeshLambertMaterial( {color: 0x0000ff} );
    var floor = new THREE.Mesh(floorGeom, floorMat);
    floor.position.y = -90;

    this.scene.add(floor);

    //Load in model
    this.modelLoader = new THREE.OBJMTLLoader();
    var _this = this;

    this.modelLoader.load( 'models/drumset.obj', 'models/drumset.mtl', function ( object ) {

        _this.scene.add( object );
        _this.loadedModel = object;

    } );

    //Hit visualisation
    var hitGeom = new THREE.CylinderGeometry(1, 1, 50, 24, 1);
    var hitMat = new THREE.MeshLambertMaterial( {color: 0xff0000} );
    var hit = new THREE.Mesh(hitGeom, hitMat);
    hit.position.set(-100, 200, 100);
    this.scene.add(hit);
};

DrumApp.prototype.update = function() {
    BaseApp.prototype.update.call(this);
};

DrumApp.prototype.keydown = function(event) {
    //Do any key processing
    switch(event.keyCode) {
        case 80: //P
            console.log("Cam =", this.camera.position);
            console.log("Look =", this.controls.getLookAt());
            break;

        default :
            break;
    }
};

$(document).ready(function() {
    //Initialise app
    skel.init();

    var container = document.getElementById("WebGL-output");
    var app = new DrumApp();
    app.init(container);
    //app.createGUI();
    app.createScene();

    $(document).keydown(function(event) {
        app.keydown(event);
    });

    app.run();
});
