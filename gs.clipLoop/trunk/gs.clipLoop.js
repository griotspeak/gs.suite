

//<License

/*
-*- coding: utf-8 -*-

gs.clipLoop
Copyright (c) 2010, 2011, Thompson Usiyan a.k.a. griotspeak
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    *   Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
    *   Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
    *   Neither the name of the gs.clipLoop nor the
        names of its contributors may be used to endorse or promote products
        derived from this software without specific prior written permission.
    *   Redistributions with Non-trivial alterations must state that alterations
        have been made.
    *   This work may not be used for commercial purposes without the express written
        consent of Thompson Usiyan
    *   This work may be freely used for non-commercial purposes without any
        further consent from Thompson Usiyan. 


THIS SOFTWARE IS PROVIDED BY THOMPSON USIYAN ``AS IS'' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THOMPSON USIYAN BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */
//License>

autowatch = 1;

inlets = 1;
outlets = 1;

trackDisarmer = new LiveAPI(this.patcher, disarmCallback, "live_set");

function down() {
    
    var _p = this.patcher;
        
    var _trackPatcherObject = _p.getnamed("gsClipLoop-track");
    var _scenePatcherObject = _p.getnamed("gsClipLoop-scene");    
    var _floorPatcherObject = _p.getnamed("gsClipLoop-floor");
    var _talkPatcherObject = _p.getnamed("gsClipLoop-talk");
    
    var _trackNumber = Number(_trackPatcherObject.getvalueof());
    var _nextTrackNumber = Number(_trackNumber + 1);
    var _sceneNumber = Number(_scenePatcherObject.getvalueof());
    var _floorNumber = Number(_floorPatcherObject.getvalueof());
    var _talkNumber = Number(_talkPatcherObject.getvalueof());
    
    var _trackApiObject = new LiveAPI(this.patcher, null, "live_set tracks " + _trackNumber);
    var _nextTrackApiObject = new LiveAPI(this.patcher, null, "live_set tracks " + _nextTrackNumber);
    
    if (_trackApiObject.get("arm") == 0) {
        _trackApiObject.set("arm", 1);
    }
    if(_talkNumber == 1) {
        _nextTrackApiObject.set("arm", 0);
    }
    
    var _clipslotApiObject = new LiveAPI(this.patcher, null, "live_set tracks " + _trackNumber + " clip_slots " + _sceneNumber);
    _clipslotApiObject.call("fire");

    _scenePatcherObject.message("set", _sceneNumber + 1);
    _p.getnamed("gsClipLoop-downButton").message("set", 0);

    _talkPatcherObject.message("int", 0);
}

function right() {
    
    var _p = this.patcher;
    
    var _trackPatcherObject = _p.getnamed("gsClipLoop-track");
    var _scenePatcherObject = _p.getnamed("gsClipLoop-scene");
    var _floorPatcherObject = _p.getnamed("gsClipLoop-floor");
    var _talkPatcherObject = _p.getnamed("gsClipLoop-talk");
    
    var _trackNumber = Number(_trackPatcherObject.getvalueof());
    var _nextTrackNumber = Number(_trackNumber + 1);
    var _sceneNumber = Number(_scenePatcherObject.getvalueof());
    var _currentSceneNumber = _sceneNumber - 1;
    var _floorNumber = Number(_floorPatcherObject.getvalueof());
    var _talkNumber = Number(_talkPatcherObject.getvalueof());

    var _trackApiObject = new LiveAPI(this.patcher, null, "live_set tracks " + _trackNumber);
    var _nextTrackApiObject = new LiveAPI(this.patcher, null, "live_set tracks " + _nextTrackNumber);
    
    if (_nextTrackApiObject.get("arm") == 0) {
        _nextTrackApiObject.set("arm", 1);
    }
    
    if(_talkNumber == 0) {
        var _clipslotApiObject = new LiveAPI(this.patcher, null, "live_set tracks " + _trackNumber + " clip_slots " + _currentSceneNumber);
        _clipslotApiObject.call("fire");
    }
    var _nextClipslotApiObject = new LiveAPI(this.patcher, null, "live_set tracks " + _nextTrackNumber + " clip_slots " + _floorNumber);
    _nextClipslotApiObject.call("fire");
    

    trackDisarmer.path = "live_set tracks " + _nextTrackNumber + " clip_slots " + _floorNumber;
    trackDisarmer.property = "has_clip";
    trackDisarmer.trackToDisarm = _trackNumber;

    _trackPatcherObject.message("set", _nextTrackNumber);
    _scenePatcherObject.message("set", _floorNumber + 1);
    _p.getnamed("gsClipLoop-rightButton").message("set", 0);
    _talkPatcherObject.message("int", 0);
    
}

function talk() {
    var _p = this.patcher;
    
    var _trackPatcherObject = _p.getnamed("gsClipLoop-track");
    var _scenePatcherObject = _p.getnamed("gsClipLoop-scene");    
    var _floorPatcherObject = _p.getnamed("gsClipLoop-floor");
    var _talkPatcherObject = _p.getnamed("gsClipLoop-talk");
    
    var _trackNumber = Number(_trackPatcherObject.getvalueof());
    var _nextTrackNumber = Number(_trackNumber + 1);
    var _currentSceneNumber = Number(_scenePatcherObject.getvalueof()) - 1;
    var _floorNumber = Number(_floorPatcherObject.getvalueof());
    var _talkNumber = Number(_talkPatcherObject.getvalueof());
    
    var _liveSetApiObject = new LiveAPI(this.patcher, null, "live_set");
    var _trackApiObject = new LiveAPI(this.patcher, null, "live_set tracks " + _trackNumber);
    var _clipslotApiObject = new LiveAPI(this.patcher, null, "live_set tracks " + _trackNumber + " clip_slots " + _currentSceneNumber);
    var _clipApiObject = new LiveAPI(this.patcher, null, "live_set tracks " + _trackNumber + " clip_slots " + _currentSceneNumber + " clip");
    var _nextTrackApiObject = new LiveAPI(this.patcher, null, "live_set tracks " + _nextTrackNumber);
    
    if (_talkNumber == 0) {
        _clipslotApiObject.call("fire");
        trackDisarmer.path = "live_set tracks " + _trackNumber + " clip_slots " + _currentSceneNumber + " clip";
        trackDisarmer.property = "is_recording";
        trackDisarmer.trackToDisarm = _trackNumber;
    
        _nextTrackApiObject.set("arm", 1);
        _talkPatcherObject.message("set", 1);
    }
    else if (_talkNumber == 1) {
        if (_liveSetApiObject.get("is_playing") == 1) {
            _liveSetApiObject.call("stop_playing");
            _nextTrackApiObject.set("arm", 0);    
        }
        else {
            _liveSetApiObject.call("continue_playing");
        }        
    }
    else {
        post("ERROR!\n_talkNumber:", _talkNumber, "\n /ERROR\n");
    }
}

function overdub() {
    
    var _p = this.patcher;
        
    var _trackPatcherObject = _p.getnamed("gsClipLoop-track");
    var _scenePatcherObject = _p.getnamed("gsClipLoop-scene");    
    
    var _trackNumber = Number(_trackPatcherObject.getvalueof());
    var _sceneNumber = Number(_scenePatcherObject.getvalueof()) - 1;
    
    var _trackApiObject = new LiveAPI(this.patcher, null, "live_set tracks " + _trackNumber);
    
    var _clipslotApiObject = new LiveAPI(this.patcher, null, "live_set tracks " + _trackNumber + " clip_slots " + _sceneNumber);
    _clipslotApiObject.call("fire");

    _p.getnamed("gsClipLoop-dubButton").message("set", 0);

}

function disarmCallback(args) {
    var _p = this.patcher;

    if((args[0] == "has_clip") && (args[1] == 1)) {
        this.property = 0;
        this.id = 0;
        
        _p.getnamed("gsClipLoop-disarmMessage").message("int", parseInt(this.trackToDisarm, 10));
    }
    
    if((args[0] == "is_recording") && (args[1] == 0)) {
        this.property = 0;
        this.id = 0;
        _p.getnamed("gsClipLoop-disarmMessage").message("int", parseInt(this.trackToDisarm, 10));
    }
}

function disarmTrack(_value) {
    var _trackApiObject = new LiveAPI(this.patcher, null, "live_set tracks " + parseInt(_value, 10));
    _trackApiObject.set("arm", 0);
}