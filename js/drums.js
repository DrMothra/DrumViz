/**
 * Created by DrTone on 01/06/2015.
 */

//Init this app from base
var HIHAT=0, SNARE=1, UPPERTOM=2, MIDTOM=3;
var FLOORTOM=4, KICK=5, CRASH=6, RIDE=7;

var soundManager = null;

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

    //Drums
    var drumNames = ["hihat", "snare", "uppertom", "midtom",
            "floortom", "kick", "crash", "ride"];
    var pos = [
        -207, 237, 64, //Hihat
        -100, 190, 96, //Snare
        -88, 259, -20, //Upper tom
        50, 259, -23,  //Mid tom
        153, 161, 66,  //Floor tom
        -23, 31, -1,   //Kick
        -197, 291, -56,//Crash
        161, 313, -77
    ];
    var drumPos = [];
    var visPos;
    for(var i= 0, len = pos.length; i<len; i+=3) {
        visPos = new THREE.Vector3(pos[i], pos[i+1], pos[i+2]);
        drumPos.push(visPos);
    }

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

    //Hit visualisations
    var hitGeom, hitMesh, hitHeight = 50;
    var hitMat = new THREE.MeshLambertMaterial( {color: 0xff0000} );
    this.hitMeshes = [];
    for(i=0, len=drumPos.length; i<len; ++i) {
        hitGeom = new THREE.CylinderGeometry(1, 1, hitHeight, 8, 1);
        hitMesh = new THREE.Mesh(hitGeom, hitMat);
        hitMesh.position.set(drumPos[i].x, drumPos[i].y+(hitHeight/2), drumPos[i].z);
        hitMesh.name = drumNames[i];
        hitMesh.visible = false;
        this.scene.add(hitMesh);
        this.hitMeshes.push(hitMesh);
    }

    //DEBUG
    //Positioning helper
    var boxGeom = new THREE.BoxGeometry(10, 10, 10);
    var boxMat = new THREE.MeshBasicMaterial( {color: 0xffffff});
    var box = new THREE.Mesh(boxGeom, boxMat);
    this.scene.add(box);
    box.name = "Box";
    box.visible = false;
};

DrumApp.prototype.createGUI = function() {
    //Create GUI - use dat.GUI for now
    var _this = this;
    this.guiControls = new function() {
        this.X = 0;
        this.Y = 0;
        this.Z = 0;
    };

    var gui = new dat.GUI();
    gui.add(this.guiControls, "X", -500, 500).onChange(function(value) {
        _this.changeBoxPos(value, -1);
    });
    gui.add(this.guiControls, "Y", -500, 500).onChange(function(value) {
        _this.changeBoxPos(value, 0);
    });
    gui.add(this.guiControls, "Z", -500, 500).onChange(function(value) {
        _this.changeBoxPos(value, 1);
    });
};

DrumApp.prototype.changeBoxPos = function(pos, axis) {
    //Move box around scene
    var box = this.scene.getObjectByName("Box", true);
    if(!box) {
        console.log("No box in scene");
    }

    switch(axis) {
        case -1:
            //X-axis
            box.position.x = pos;
            break;

        case 0:
            //Y-axis
            box.position.y = pos;
            break;

        case 1:
            //Z-axis
            box.position.z = pos;
            break;

        default:
            break;
    }
};

DrumApp.prototype.update = function() {
    BaseApp.prototype.update.call(this);

    this.elapsedTime += this.clock.getDelta();

    if(this.elapsedTime >= 0.5) {
        this.hitMeshes[HIHAT].visible = !this.hitMeshes[HIHAT].visible;
        this.elapsedTime = 0;
        soundManager.playSound(KICK, 0);
        soundManager.playSound(HIHAT, 0);
        soundManager.playSound(CRASH, 0);
    }
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

    //Drums
    var drumNames = ["hihat", "snare", "uppertom", "midtom",
        "floortom", "kick", "crash", "ride"];
    var container = document.getElementById("WebGL-output");
    soundManager = new audioManager();
    soundManager.init(drumNames);

    var app = new DrumApp();
    app.init(container);
    app.createGUI();
    app.createScene();

    $(document).keydown(function(event) {
        app.keydown(event);
    });

    app.run();
});
