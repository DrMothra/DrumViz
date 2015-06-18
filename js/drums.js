/**
 * Created by DrTone on 01/06/2015.
 */

//Init this app from base
var HIHAT=0, SNARE=1, UPPERTOM=2, MIDTOM=3;
var FLOORTOM=4, KICK=5, CRASH=6, RIDE=7;

var soundManager = null;

//DEBUG
/*
var score = [
    [
        { drum: HIHAT, notes: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 0.5, 0.75, 1.5, 2] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 0.5, 0.75, 1.5, 2] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 0.5, 0.75, 1.5, 2] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 0.5, 0.75, 1.5, 2] }
    ]
];
*/
/*
var score = [
    [
        { drum: HIHAT, notes: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 0.25, 1.75, 2, 2.25] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 0.25, 1.75, 2, 2.25] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] },
        { drum: SNARE, notes: [1, 3, 3.75] },
        { drum: KICK, notes: [0, 0.25, 1.75, 2, 2.25] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 0.25, 1.75, 2, 2.25] }
    ]
];
*/
var score = [
    [
        { drum: HIHAT, notes: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 2] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 2] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 2] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 2] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 1.5, 2] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75] },
        { drum: SNARE, notes: [1, 3] },
        { drum: KICK, notes: [0, 1.5, 2] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] },
        { drum: SNARE, notes: [1, 1.75, 2.25, 3] },
        { drum: KICK, notes: [0, 2] }
    ],

    [
        { drum: HIHAT, notes: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5] },
        { drum: SNARE, notes: [1, 1.75, 2.25, 3] },
        { drum: KICK, notes: [0, 2] }
    ]

    ];


function DrumApp() {
    BaseApp.call(this);
}

DrumApp.prototype = new BaseApp();

DrumApp.prototype.init = function(container) {
    BaseApp.prototype.init.call(this, container);
    this.scoreLoaded = false;
    this.drumIndex = new Array(8);
    for(var i=0; i<this.drumIndex.length; ++i) {
        this.drumIndex[i] = 0;
    }
    this.currentBar = 0;
    this.notesThisBar = 0;
    this.barTime = 0;
    this.currentNote = 0;
    this.duration = 0;
    this.hitDelay = 0.1;
    this.currentScore = [];
    this.timeNow = 0;
    this.playNow = false;
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
        -23, 14, 20,   //Kick
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
        this.hitMeshes.timerStart = 0;
    }

    this.hitMeshes[KICK].rotation.x = Math.PI/2;
    //DEBUG
    //Positioning helper
    var boxGeom = new THREE.BoxGeometry(10, 10, 10);
    var boxMat = new THREE.MeshBasicMaterial( {color: 0xffffff});
    var box = new THREE.Mesh(boxGeom, boxMat);
    this.scene.add(box);
    box.name = "Box";
    box.visible = false;
};

DrumApp.prototype.loadScore = function() {
    //Convert json object to drum sounds and timing
    var currentBar, currentBeat, drum, nextTime=0;
    this.duration = soundManager.getDuration();
    this.barTime = this.duration * 4;
    var bar = score[0], numBars;
    this.totalBars = score.length;
    for(var i=0; i<bar.length; ++i) {
        this.notesThisBar += bar[i].notes.length;
    }
    for(bar= 0, numBars=score.length; bar<numBars; ++bar) {
        currentBar = score[bar];
        for(currentBeat=0; currentBeat<currentBar.length; ++currentBeat) {
            drum = currentBar[currentBeat].drum;
            for(var note= 0, barLength=currentBar[currentBeat].notes.length; note<barLength; ++note) {
                nextTime = currentBar[currentBeat].notes[note] * this.duration;
                this.currentScore.push(drum);
                this.currentScore.push(nextTime + (this.barTime * bar));
            }
            nextTime=0;
        }
    }
};

DrumApp.prototype.playScore = function() {
    //Play current score
    this.playNow = true;
    this.elapsedTime = 0;
    for(var i= 0, len=this.currentScore.length; i<len; i+=2) {
        soundManager.playSound(this.currentScore[i], this.currentScore[i+1]);
    }
};

DrumApp.prototype.resetScore = function() {
    //Reset everything
    var bar, i, len;
    this.currentBar = 0;
    this.timeNow = 0;
    this.playNow = false;
    bar = score[this.currentBar];
    for(i=0; i<bar.length; ++i) {
        this.notesThisBar += bar[i].notes.length;
    }
    for(i=0; i<this.drumIndex.length; ++i) {
        this.drumIndex[i] = 0;
    }
    for(i= 0, len=this.hitMeshes.length; i<len; ++i) {
        this.hitMeshes[i].visible = false;
    }
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
    var i, len;
    if(soundManager.soundsLoaded() && !this.scoreLoaded) {
        this.scoreLoaded = true;
        this.loadScore();
    }


    if(this.playNow) {
        var bar = score[this.currentBar], index, drum;
        for(i= 0, len=bar.length; i<len; ++i) {
            drum = bar[i].drum;
            index = this.drumIndex[drum];
            if(index < 0) continue;
            if(this.elapsedTime >= ((bar[i].notes[index] * this.duration) + (this.barTime * this.currentBar))) {
                this.hitMeshes[drum].visible = true;
                this.hitMeshes[drum].timerStart = this.elapsedTime;
                if(++this.drumIndex[drum] >= bar[i].notes.length) this.drumIndex[drum] = -1;
                if(++this.currentNote >= this.notesThisBar) {
                    for(i=0; i<this.drumIndex.length; ++i) {
                        this.drumIndex[i] = 0;
                    }
                    this.currentNote = this.notesThisBar = 0;
                    if(++this.currentBar >= this.totalBars) {
                        this.resetScore();
                        return;
                    }
                    bar = score[this.currentBar];
                    for(i=0; i<bar.length; ++i) {
                        this.notesThisBar += bar[i].notes.length;
                    }
                }
            }
        }
    }

    for(i= 0, len=this.hitMeshes.length; i<len; ++i) {
        if((this.elapsedTime - this.hitMeshes[i].timerStart) >= this.hitDelay) {
            this.hitMeshes[i].visible = false;
        }
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
    soundManager = new drumManager();
    soundManager.init(drumNames);

    var app = new DrumApp();
    app.init(container);
    //app.createGUI();
    app.createScene();

    $(document).keydown(function(event) {
        app.keydown(event);
    });

    $('#play').on('click', function() {
        app.playScore();
    });

    app.run();
});
