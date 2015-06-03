/**
 * Created by DrTone on 03/06/2015.
 */

//Manage all web audio

var audioManager = function() {
    this.context = null;
    this.url = "sounds/";
    this.soundBuffers = [];
    this.extension = ".wav";
};

function onError() {
    alert("Error loading sound file");
}

audioManager.prototype = {

    constructor: audioManager,

    init: function() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.context = new AudioContext();
        }
        catch (error) {
            alert("Web Audio API not supported");
        }
    },

    loadSound: function(sound) {
        //Load all sounds asynchronously
        var _this = this;
        var request, soundObj;

        request = new XMLHttpRequest();
        request.open("GET", this.url + sound + this.extension, true);
        request.responseType = "arraybuffer";

        request.onload = function() {
            _this.context.decodeAudioData(request.response, function(buffer) {
                soundObj = {};
                soundObj.id = sound;
                soundObj.buffer = buffer;
                _this.soundBuffers.push(soundObj);
            }, onError);
        };

        request.send();
    },

    playSound: function(sound) {
        console.log(this.soundBuffers[sound]);
    }
};
