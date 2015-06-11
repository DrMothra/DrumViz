/**
 * Created by DrTone on 03/06/2015.
 */

//Manage all web audio

var drumManager = function() {
    this.context = null;
    this.url = "sounds/";
    this.extension = ".wav";
    this.numSoundsLoaded = 0;
    this.allSoundsLoaded = false;
    this.bpm = 100;
    this.beatDuration = 60/this.bpm;
};

function onError() {
    alert("Error loading sound file");
}

drumManager.prototype = {

    constructor: drumManager,

    init: function(sounds) {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.context = new AudioContext();
        }
        catch (error) {
            alert("Web Audio API not supported");
        }
        //Load drum sounds
        var numSounds = sounds.length;
        this.soundBuffers = new Array(numSounds);
        for(var i=0; i<numSounds; ++i) {
            this.loadSound(sounds[i], i);
        }
    },

    loadSound: function(sound, id) {
        //Load all sounds asynchronously
        var _this = this;
        var request;

        request = new XMLHttpRequest();
        request.open("GET", this.url + sound + this.extension, true);
        request.responseType = "arraybuffer";

        request.onload = function() {
            _this.context.decodeAudioData(request.response, function(buffer) {
                _this.soundBuffers[id] = buffer;
                if(++_this.numSoundsLoaded >= _this.soundBuffers.length) _this.allSoundsLoaded = true;
            }, onError);
        };

        request.send();
    },

    soundsLoaded: function() {
        return this.allSoundsLoaded;
    },

    getDuration: function() {
        return this.beatDuration;
    },

    playSound: function(sound, time) {
        var source = this.context.createBufferSource();
        source.buffer = this.soundBuffers[sound];
        source.connect(this.context.destination);
        source.start(time);
    }
};
