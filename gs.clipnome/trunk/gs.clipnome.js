/*
-*- coding: utf-8 -*-
gs.clipnome v2.021
Copyright (c) 2010, TJ Usiyan a.k.a. griotspeak
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the Clipnome nor the
      names of its contributors may be used to endorse or promote products
     derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY TJ USIYAN ``AS IS'' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL TJ USIYAN BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

var autowatch = 1;

var inlets = 1;
var outlets = 2;
var post;
var outlet;
var mWatchersConstructed = false;

var debugLevel = new Array();

function setDebugLevel(level) {
    if (level > 0) { post("                           --setDebugLevel--\n"); }
    
    //debugLevel[1] = true;
    //debugLevel[2] = true;
    //debugLevel[3] = true;
    //debugLevel[4] = true;
    //debugLevel[5] = true;
    //debugLevel[6] = true;

    // 0 - silence
    // 1 - function name at start
    // 2 - function end
    // 3 - variables at end of function
    // 4 - variables at start of function
    // 5 - lists. so many lists.
    // 6 - setters and getters
    
    debugLevel = new Array();
     for (var c = 0; c < 6; c++) {
        if (c <= level) {
            debugLevel[c] = true;
        }
        else {
            debugLevel[c] = false;
        }
    }
}

function initialize() {

    setDebugLevel(0);
    if (debugLevel[1]) {
        post("                     ---initialize-\n");
    }    
    inSuite = 0;

    trackStopDisabled = 0;

    xOffset = this.patcher.getnamed("xOffsetGsClipnomePattr").getvalueof();
    yOffset = this.patcher.getnamed("yOffsetGsClipnomePattr").getvalueof();
    //monome variables
    monomeWidth = this.patcher.getnamed("monomeWidthGsClipnomePattr").getvalueof();
    monomeHeight = this.patcher.getnamed("monomeHeightGsClipnomePattr").getvalueof();

    glob = new Global("clipStepGlobalController");

    colOrder = (jsarguments[1] != null) ? jsarguments[1] : 0;

    if (colOrder === "switch") {
        sceneLaunchCol = function() {
            return monomeWidth - 1;
        };
        functionCol = function() {
            return monomeWidth - 2;
        };
    }
    else {
        colOrder = 0;
        sceneLaunchCol = function() {
            return monomeWidth - 2;
        };
        functionCol = function() {
            return monomeWidth - 1;
        };
    }

    // Prepare flashing arrays
    playingClipsArray = new Array(monomeWidth);
    triggeredClipsArray = new Array(monomeWidth);

    // Start the show
    clipPlayingStatus = new Array();
    Monome = new Array();
    clipslot = new Array();
    buildMonome();

    // Setup basic LiveAPI objects
    watchSet = new LiveAPI(this.patcher, updateClipWindow, "live_set");
    watchSet.property = "tracks";

    watchOVR = new LiveAPI(this.patcher, api_callback, "live_set");
    watchOVR.property = "overdub";
    watchPlay = new LiveAPI(this.patcher, api_callback, "live_set");
    watchPlay.property = "is_playing";
    watchMetro = new LiveAPI(this.patcher, api_callback, "live_set");
    watchMetro.property = "metronome";
    
    mWatchersConstructed = true;
    updateClipWindow();
}

function setXOffset(_newXOffset) {
    if (debugLevel[1]) {
        post("                     ---setXOffset-\n");
    }

    if (_newXOffset < 0) {
        xOffset = 0;
    }
    else if (_newXOffset > 32) {
        xOffset = 32;
    }
    else {
        xOffset = _newXOffset;
    }
    this.patcher.getnamed("xOffsetGsClipnomeObject").message("set", xOffset);

    if ((!shiftIsHeld()) && (!mixerIsHeld)) {
        updateClipWindow();
    }
}

function setYOffset(_newYOffset) {
    if (debugLevel[1]) { post("                     ---setYOffset-\n"); }
    
    if (_newYOffset < 0) {
        yOffset = 0;
    } 
    else if(_newYOffset > 32) {
        yOffset = 32;
    }
    else {
        yOffset = _newYOffset;
    }
    this.patcher.getnamed("yOffsetGsClipnomeObject").message("set", yOffset);
    
    if ((!shiftIsHeld()) && (!mixerIsHeld)) {
        updateClipWindow();
    }
}

function trackOffset() {
    return xOffset * displayWidth();
}
function sceneOffset() {
    return yOffset * displayHeight();
}

function hardLastRow() { return monomeHeight - 1; }

function muteRow() { return monomeHeight - 3; }
function soloRow() { return monomeHeight - 2; }
function armRow() { return monomeHeight - 1; }



// Clip window dimensions.
function displayWidth() {
    return monomeWidth - 2;
}
function displayHeight() {
    if (trackStopDisabled == 0) {
        return monomeHeight - 1;
    }
    else if (trackStopDisabled == 1) {
        return monomeHeight;
    }
}

// Main View
function updateClipWindow() {

    if (!mWatchersConstructed) {
        return;
    }
    
    if (debugLevel[1]) { post("                     ---updateClipWindow-\n"); }
    
    clearFlashingClips();
    clearClipWindow();
    
    //where in the set?
    outlet(1, "track", "set", trackOffset() );
    outlet(1, "scene", "set", sceneOffset() );

    var trackCount = watchSet.getcount("tracks");
    var sceneCount= watchSet.getcount("scenes");
    var trackDisplayLimit = trackOffset() + displayWidth();
    var sceneDisplayLimit = sceneOffset() + displayHeight();
    var c = Math.min(trackDisplayLimit, trackCount);
    var d = Math.min(sceneDisplayLimit, sceneCount);
    
    clipslot = [];
    clipPlayingStatus = [];
    playingClipsArray = [];
    triggeredClipsArray = [];

    var checkplay = watchPlay.get("is_playing");

    if (checkplay == 1) {
        visibleClipPlay(functionCol(), 0, 1);
    }

    for (var a = trackOffset(); a < c; a++) {

    //              clip slots
    /***************************************************/         
        clipslot[a] = new Array(watchSet.getcount("scenes") );
        clipPlayingStatus[a]= new Array();
        
        for (var b = sceneOffset(); b < d; b++) {
            clipslot[a][b] = new LiveAPI(this.patcher, api_callback,  "live_set tracks " + a + " clip_slots " + b);
            clipslot[a][b].mode = 0;
            clipslot[a][b].track = a;
            clipslot[a][b].scene = b;
            clipslot[a][b].property = "has_clip";
            if (clipslot[a][b].get("has_clip") == 1) {
                var is_playing = clipPlayingStatus[a][b].get("is_playing");
                var is_triggered = clipPlayingStatus[a][b].get("is_triggered");
                var ucwDisplayTrack = a - trackOffset();
                var ucwDisplayScene = b - sceneOffset();
                visibleClipPlay(ucwDisplayTrack, ucwDisplayScene, is_playing);
                visibleClipTrigger(ucwDisplayTrack, ucwDisplayScene, is_triggered);
            }
        }        
    }
}

function clearClipWindow() {
    
    var d_width = monomeWidth - 1;
    
    for (var col = 0; col < d_width; col ++) {
        for (var row = 0; row < monomeHeight; row++) {
            Monome[col][row].ledOff();
        }
    }
}

// Direction functions
function left() {
    if (xOffset > 0) {
        xOffset--;
        updateClipWindow();
    }
    else { updateClipWindow(); }
}

function right() {
    if (xOffset < 32) {
        xOffset++;
        updateClipWindow();
    }
    else { updateClipWindow(); }
}

function down() {
    if (yOffset < 32) {
        yOffset++;
        updateClipWindow();
    }
    else { updateClipWindow(); }
}

function up() {
    if (yOffset > 0) {
        yOffset--;
        updateClipWindow();
    }
    else { updateClipWindow(); }
}

// Heavy LiveAPI Lifting
function api_callback(args) {
    var track = this.track;
    var scene = this.scene;
    var displayTrack = track - trackOffset();
    var displayScene = scene - sceneOffset();

    //here are the callbacks
    switch (args[0]) {
        
        //              id
        /***************************************************/       
        case "id":
            //
            break;
    
    
    
        //              has clip 
        /***************************************************/        
        case "has_clip": 
            if (args[1] == 1) {
                clipPlayingStatus[track][scene] = new LiveAPI(this.patcher, api_callback, "live_set tracks " + track + " clip_slots " + scene + " clip");
                clipPlayingStatus[track][scene].mode        = 0;
                clipPlayingStatus[track][scene].property        = "playing_status";
                clipPlayingStatus[track][scene].track = track;
                clipPlayingStatus[track][scene].scene               = scene;
                Monome[displayTrack][displayScene].ledOn();

                break;

            }
            
            if (args[1] == 0) {
                visibleClipPlay(displayTrack, displayScene, 0);
                visibleClipTrigger(displayTrack, displayScene, 0);
                Monome[displayTrack][displayScene].ledOff();
                break;
            }
            
            
        //              playing status
        /***************************************************/       
        case "playing_status":
            var is_playing = clipPlayingStatus[track][scene].get("is_playing");
            var is_triggered = clipPlayingStatus[track][scene].get("is_triggered");
            visibleClipPlay(displayTrack, displayScene, is_playing);
            visibleClipTrigger(displayTrack, displayScene, is_triggered);
            break; 
                
        case "is_playing":
            if (args[1] == 1) {
                visibleClipPlay(functionCol(), 0, 1);
                break;
            }
            else {
                visibleClipPlay(functionCol(), 0, 0);
                refreshMonome(); 
                break;
            }
            
        case "metronome":
            if (args[1] == 1) {
                Monome[functionCol()][2].ledOn();
                break;
            }
            else {
                Monome[functionCol()][2].ledOff(); 
                break;
            }
            
        case "overdub":
            if (args[1] == 1) {
                Monome[functionCol()][1].ledOn();
                break;
            }
            else {
                Monome[functionCol()][1].ledOff() ;
                break;
            }
            
        // Mixer cases
        case "mute":
            if (args[1] == 1) {
                Monome[displayTrack][muteRow()].tempOff();
                break;
            }
            else {
                Monome[displayTrack][muteRow()].tempOn();
                break;
            }
            
        case "solo":
            if (args[1] == 1) {
                Monome[displayTrack][soloRow()].tempOn();
                break;
            }
            else {
                Monome[displayTrack][soloRow()].tempOff();
                break;
            }
            
        case "arm":
            if (args[1] == 1) {
                Monome[displayTrack][armRow()].tempOn();
                break;
            }
            else {
                Monome[displayTrack][armRow()].tempOff();
                break;
            }
        default : {
            post("error in api_callback args[0]:", args[0], "\n");
            break;
        }
    }
}

//                MONOME            Physical device

function singleCell(col, row) {
    this.monomeOutlet = 0;

    this.col = col;
    this.row = row;
    
    // local variables
    this.actualState = 0;
    this.tempState =  0;
    this.isHeld = 0;
    
    this.push = push;
    this.release = release;
    
    this.ledOn = ledOn;
    this.ledOff = ledOff;
    this.checkActual = checkActual;
    
    this.blink = blink;
    this.tempOn = tempOn;
    this.tempOff = tempOff;
    this.checkHeld = checkHeld;
}
    
function checkHeld() {
    return this.isHeld;
}

function push() {
    this.isHeld = 1;
    return this.isHeld;
}

function release() {
    this.isHeld = 0;
    return this.isHeld;
}
        
function ledOn() {
    this.actualState = 1;
    outlet(this.monomeOutlet, this.col, this.row, this.actualState);
}

function ledOff() {
    this.actualState = 0;
    outlet(this.monomeOutlet,       this.col, this.row, this.actualState);
}

function checkActual() {
    outlet(this.monomeOutlet, this.col, this.row, this.actualState);
    this.tempState = 0;
}

function refreshMonome() {
    var m;
    var n;
    for (m = 0; m < monomeWidth; m++) {
        for (n = 0; n < monomeHeight; n++) {
            Monome[m][n].checkActual();
            Monome[m][n].tempState = 0;
        }
    }
}
            
function blink() {
    this.tempState = (this.tempState == 1) ? 0:1;
    outlet(this.monomeOutlet, this.col, this.row, this.tempState);
}

function tempOn() {
    this.tempState = 1;
    outlet(this.monomeOutlet, this.col, this.row, this.tempState);
}

function tempOff() {
    this.tempState = 0;
    outlet(this.monomeOutlet, this.col, this.row, this.actualState);
}           

function buildMonome() {       
    for (var w = 0; w < (monomeWidth); w++) {
        Monome[w] = new Array();
        for (var h = 0; h < (monomeHeight); h++) {
            Monome[w][h] = new singleCell(w , h);
        }
    }
}          

//                handle press            
function press(_column, _row, _updown) {


    var what_track = _column + trackOffset();
    var _track = new LiveAPI(this.patcher, "live_set tracks " + what_track);



    //              what to do!
    /***************************************************/           
    switch (true) {
        
        // Core Functions
        case isLaunchWindow(_column, _row):           
            if (_updown == 1) {
                var track_fire = _column + trackOffset();
                var scene_fire = _row + sceneOffset();
                clipslot[track_fire][scene_fire].call("fire");
                if (debugLevel[3]) { post("launch clip", track_fire, scene_fire, "\n");}
                Monome[_column][_row].push();
                break;
            }
            else { 
                Monome[_column][_row].release();
                break;
            }

        case isClipstepWindow(_column, _row):           
            if (_updown == 1) {
                var track_send = _column + trackOffset();
                var scene_send = _row + sceneOffset();
                glob.setClip(track_send, scene_send);
                if (debugLevel[3]) { post("send clip", track_send, scene_send,"\n");}
                Monome[_column][_row].push();
                break;
            }
            else { 
                Monome[_column][_row].release();
                break;
            }

        case isTrackStopButton(_column, _row):
            if (trackStopDisabled == 0) {
                if (_updown == 1) {
                    _track.call("stop_all_clips");
                    if (debugLevel[3]) { post("stop track", what_track, "\n");}
                    Monome[_column][_row].push();
                    break;
                }
                else { 
                    Monome[_column][_row].release();
                    break;
                }
            }
            else {
                break;
            }

        case isSceneLaunch(_column, _row):
            if (_updown == 1) {
                var what_scene = _row + sceneOffset();
                var _scene = new LiveAPI(this.patcher, "live_set scenes " + what_scene);
                _scene.call("fire");
                if (debugLevel[3]) { post("launch scene", what_scene, "\n"); }
                Monome[_column][_row].push();
                break;
            }
            else { 
                Monome[_column][_row].release();
                break;
            }
        
        // Mixer Buttons
        case isMixerButton(_column, _row):
            if (_updown == 1) {
                Monome[_column][_row].push();
                mixer();
                break;
                }
            else {
                Monome[_column][_row].release();
                updateClipWindow();
                break;
                }

        case isMuteButton(_column, _row):
            if (_updown == 1) {
            
                Monome[_column][_row].push();
                
                var current_mute_state = _track.get("mute");
                var new_mute_state = (current_mute_state == 0) ? 1 : 0;
                _track.set("mute", new_mute_state);
                break;
            }
            else {
                Monome[_column][_row].release();
                break;
            }

        case isSoloButton(_column, _row):
            if (_updown == 1) {

                Monome[_column][_row].push();

                var current_solo_state = _track.get("solo");
                var new_solo_state = (current_solo_state == 0) ? 1 : 0;
                _track.set("solo", new_solo_state);
                break;
            }
            
            else {
                Monome[_column][_row].release();
                break;
            }

        case isArmButton(_column, _row):
            if (_updown == 1) {
                Monome[_column][_row].push();
                var current_arm_state = _track.get("arm");
                var new_arm_state = (current_arm_state == 0) ? 1 : 0;
                _track.set("arm", new_arm_state);
                break;
            }

            else {
                Monome[_column][_row].release();
                break;
            }

        // Shift Buttons
        case isShift(_column, _row):
            if (_updown == 1) {
                Monome[_column][_row].push();
                Monome[_column][_row].ledOn();
                Monome[displayWidth()][yOffset].tempOn();
                Monome[xOffset][hardLastRow()].tempOn();
                break;
            }
            else { 
                Monome[_column][_row].release();
                Monome[_column][_row].ledOff();
                updateClipWindow();
                refreshMonome();
                break;
            }

            case isClipstepButton(_column, _row):
                if (_updown == 1) {
                    Monome[_column][_row].push();
                    Monome[_column][_row].ledOn();
                    break;
                }
                else { 
                    Monome[_column][_row].release();
                    Monome[_column][_row].ledOff();
                    break;
                }

        case isOffsetWindow(_column, _row):
            if (_updown == 1) {

                Monome[_column][_row].push();
                
                Monome[displayWidth()][yOffset].tempOff();
                Monome[xOffset][hardLastRow()].tempOff();
                
                xOffset = _column;
                yOffset = _row;
                
                Monome[displayWidth()][yOffset].tempOn();
                Monome[xOffset][hardLastRow()].tempOn();
                if (debugLevel[3]) { post("xOffset:", xOffset, "\n"); }
                if (debugLevel[3]) { post("yOffset:", yOffset, "\n"); }
                break;
            }
            else {
                Monome[_column][_row].release();
                break;
            }
        
        // Function Buttons
        case isStopAllClips(_column, _row):
            if (_updown == 1) {
                watchSet.call("stop_all_clips");
                Monome[_column][_row].push();
                break;
            }
            else { 
                Monome[_column][_row].release();
                break;
            }

        case isPlayButton(_column, _row):
            if (_updown == 1) {
                // regardless
                Monome[_column][_row].push();
                
                if (watchSet.get("is_playing") == 1) {
                    watchSet.call("stop_playing");
                    break;
                }
                else {
                    // with shift
                    if ( shiftIsHeld() ) {
                        watchSet.call("continue_playing");
                        break;
                    }
                    // without shift
                    else { 
                        watchSet.call("start_playing");
                        break;
                    }
                }
            }

            else {
                Monome[_column][_row].push();
                break;
            }

        case isOVRButton(_column, _row):
        
            if (_updown == 1) {
                
                Monome[_column][_row].push();
                
                if (watchSet.get("overdub") == 1) {
                    watchSet.set("overdub", 0);
                    break;
                }
                else {
                    watchSet.set("overdub", 1);
                    break;
                }
            }

            else {
                Monome[_column][_row].push();
                break;
            }

        case isMetronomeButton(_column, _row):
            if (_updown == 1) {
            
                Monome[_column][_row].push();
                
                if (watchSet.get("metronome") == 1) {
                    watchSet.set("metronome", 0);
                    break;
                }
                else {
                    watchSet.set("metronome", 1);
                    break;
                }
            }
            else {
                Monome[_column][_row].release();
                break;
            }

        case isTapTempoButton(_column, _row):
            if (_updown == 1) {
                watchSet.call("tap_tempo");
                Monome[_column][_row].push();
                Monome[_column][_row].ledOn();
                break;
            }

            else {
                Monome[_column][_row].release();
                Monome[_column][_row].ledOff();
                break;
            }
        case isDisableTrackstopsButton(_column, _row):
            if (_updown == 1) {
            
                Monome[_column][_row].push();

                if (trackStopDisabled == 0) {
                    Monome[_column][_row].ledOn();
                    trackStopDisabled = 1;
                    break;
                }
                
                else {
                    Monome[_column][_row].ledOff();
                    trackStopDisabled = 0;
                    break;
                }
                
                updateClipWindow();
                
                break;
            }
            else {
                Monome[_column][_row].release();
                break;
            }
        case isRelease(_column, _row):
            if (_updown == 1) {    
                Monome[_column][_row].push();    
            }
            
            else { 
                Monome[_column][_row].release();
                if(inSuite == 1){ outlet(0, "release", "release", "clipstep"); }
            }
            break;

        default : {
            post("error in press\n");
            break;
        }
    }

    //              checks
    /***************************************************/

    // Core Functions       
    function isPlayButton(_c, _r) { //Any mod state
        if ((_c == functionCol()) && (_r == 0) ) { return true; }
        else { return false; }
    }

    function isOVRButton(_c, _r) { //Any mod state
        if ((_c == functionCol()) && (_r == 1) ) { return true; }
        else {return false; }
    }

    function isStopAllClips (_c, _r) { //Any mod state
        if ((_c == sceneLaunchCol()) && (_r == hardLastRow()) ) {return true; }
        else { return false; }
    }

    function isClipstepButton (_c, _r) { //Any mod state
        if ((_c == functionCol()) && (_r == hardLastRow() - 3) ) {return true; }
        else { return false; }
    }
    
    function isMixerButton (_c, _r) { //Any mod state
        if ((_c == functionCol()) && (_r == hardLastRow() - 2) ) {return true; }
        else { return false; }
    }
    
    function isShift (_c, _r) { //Any mod state
        if ((_c == functionCol()) && (_r == hardLastRow() - 1) ) {return true; }
        else { return false; }
    }

    function isRelease(_c, _r) { //Any mod state
        if ((_c == functionCol()) && (_r == hardLastRow()) ) {return true; }
        else { return false; }
    }


    // Main View Buttons
    function isSceneLaunch (_c, _r) { // No Mod
        if ((_c == sceneLaunchCol()) && (_r < displayHeight() ) && no_mod_held() ) { return true; }
        else { return false; }
    }

    function isLaunchWindow (_c, _r) { // No Mod
        if ((_c < displayWidth() ) && (_r < displayHeight() ) && no_mod_held() ) { return true; }
        else { return false; }
    }

    function isTrackStopButton(_c, _r) { // Only Shift
        if ((_c < displayWidth() ) && (_r == displayHeight() ) && no_mod_held() ) { return true; }
        else { return false; }
    }

    // Mixer Buttons
    function isMuteButton (_c, _r) { // Only Mixer
        if ((_c < displayWidth() ) && (_r == muteRow()) && just_mixer_held() ) {return true; }
        else { return false; }
    }

    function isSoloButton (_c, _r) { // Only Mixer
        if ((_c < displayWidth() ) && (_r == soloRow()) && just_mixer_held() ) {return true; }
        else { return false; }
    }

    function isArmButton (_c, _r) { // Only Mixer
        if ((_c < displayWidth() ) && (_r == armRow()) && just_mixer_held() ) {return true; }
        else { return false; }
    }

    function isDisableTrackstopsButton(_c, _r) { // Only Mixer
        if ((_c == functionCol()) && (_r == hardLastRow() - 4) && just_mixer_held() ) {return true; }
        else { return false; }
    }

    function isTapTempoButton(_c, _r) { // Only Mixer
        if ((_c == 0) && (_r == 0) && just_mixer_held() ) { return true; }
        else { return false; }
    }

    function isMetronomeButton(_c, _r) { // Only Mixer
        if ((_c == functionCol()) && (_r == 2) && just_mixer_held() ) { return true; }
        else {return false; }
    }

    // Shift Buttons
    function isOffsetWindow (_c, _r) { // Only Shift
        if ((_c < displayWidth() ) && (_r < hardLastRow() ) && just_shift_held() ) { return true; }
        else { return false; }
    }

    // Clipstep Buttons
    function isClipstepWindow (_c, _r) { // No Mod
        if ((_c < displayWidth() ) && (_r < displayHeight() ) && just_clipstep_held() ) { return true; }
        else { return false; }
    }
}
function clipstepIsHeld() {
    var _r = hardLastRow() - 3;
    if (Monome[functionCol()][_r].isHeld == 1) {
        return true;
    }
    else { return false; }
}

function mixerIsHeld() {
    var _r = hardLastRow() - 2;
    if (Monome[functionCol()][_r].isHeld == 1) {
        return true;
    }
    else { return false; }
}

function shiftIsHeld() {
    var _r = hardLastRow() - 1;
    if (Monome[functionCol()][_r].isHeld == 1) {
        return true;
    }
    else { return false; }
}

// Check Modifiers Held
function no_mod_held() {
    if (!shiftIsHeld() && !mixerIsHeld() && !clipstepIsHeld() ) { return true; }
    else { return false; }
}

function just_clipstep_held() {
    if (!shiftIsHeld() && !mixerIsHeld() & clipstepIsHeld()) { return true; }
    else { return false; }
}

function just_mixer_held() {
    if (!shiftIsHeld() && mixerIsHeld() & !clipstepIsHeld()) { return true; }
    else { return false; }
}

function just_shift_held() {
    if (shiftIsHeld() && !mixerIsHeld() & !clipstepIsHeld()) { return true; }
    else { return false; }
}

function all_mods_held() {
    if (shiftIsHeld() && mixerIsHeld() && clipstepIsHeld()) { return true; }
    else { return false; }
}

//                *********blink*********                
function flashPlaying() {
    var e;
    var f = monomeWidth;
    for (e = 0; e < f; e++) {
        if (playingClipsArray[e] != undefined) {
            var g = playingClipsArray[e];
            Monome[e][g].blink();
        }
    }
}

function flashTriggered() {
    var h;
    var i = monomeWidth;
    for (h = 0; h < i; h++) {
        if (triggeredClipsArray[h] != undefined) {
            var j = triggeredClipsArray[h];
            Monome[h][j].blink();
        }
    }
}

//              Add buttons to arrays for flashing
function visibleClipPlay(p_col, p_row, playing) {
    if (playing == 1) {
        playingClipsArray[p_col] = p_row;              
    }
    else if ((playing == 0) &&          (p_row == playingClipsArray[p_col]) ) {
        Monome[p_col][p_row].checkActual();
        playingClipsArray[p_col] = undefined;
    }
}
function visibleClipTrigger(p_col, p_row, triggered) {
    if (triggered == 1) {
        triggeredClipsArray[p_col] = p_row;                
    }
    else if (triggered == 0) {
        Monome[p_col][p_row].checkActual();
        triggeredClipsArray[p_col] = undefined;
    }
    else {
        post("this should never happen. triggered ==", triggered, "\n");
    }
}
//              Remove buttons from arrays for flashing
function clearFlashingClips() {
    playingClipsArray = [];
    triggeredClipsArray =[];
}

function mixer() {
    if (debugLevel[1]) { post("                     --mixer--\n"); }

    clearFlashingClips();
    clearClipWindow();

    var trackCount = watchSet.getcount("tracks");
    var sceneCount = watchSet.getcount("scenes");
    var trackDisplayLimit = trackOffset() + displayWidth();
    var sceneDisplayLimit = sceneOffset() + displayHeight();
    var c = Math.min(trackDisplayLimit, trackCount);
    var d = Math.min(sceneDisplayLimit, sceneCount);

    var checkplay = watchPlay.get("is_playing");

    if (checkplay == 1) {
        visibleClipPlay(functionCol(), 0, 1);
    }

    // Prepare arrays
    watchArmed = new Array(displayWidth() );
    watchSolo = new Array(displayWidth() );
    watchMute = new Array(displayWidth() );

    for (var a = trackOffset(); a < c; a++) {
        watchMute[a] = new LiveAPI(this.patcher, api_callback,        "live_set tracks " + a);
        watchMute[a].mode = 0;
        watchMute[a].track = a;
        watchMute[a].scene = 0;
        watchMute[a].property = "mute";                 

        watchSolo[a] = new LiveAPI(this.patcher, api_callback,        "live_set tracks " + a);
        watchSolo[a].mode = 0;
        watchSolo[a].track = a;
        watchSolo[a].scene = 0;
        watchSolo[a].property = "solo";

        watchArmed[a] = new LiveAPI(this.patcher, api_callback,           "live_set tracks " + a);
        watchArmed[a].mode = 0;
        watchArmed[a].track = a;
        watchArmed[a].scene = 0;
        watchArmed[a].property = "arm";
    }
}

function setMonomeWidth( mWidth) {
    post("mWidth:", mWidth, "\n");
    monomeWidth = mWidth;
    this.patcher.getnamed("monomeWidthGsClipnomeObject").message("set", monomeWidth);
    outlet(1, "monomeWidth", "set", monomeWidth );
    if (debugLevel[3]) { post("monomeWidth:", monomeWidth, "\n"); }
}

function setMonomeHeight( mHeight) {
    post("mHeight:", mHeight, "\n");
    monomeHeight = mHeight;
    this.patcher.getnamed("monomeHeightGsClipnomeObject").message("set", monomeHeight);
    outlet(1, "monomeHeight", "set", monomeHeight );
    if (debugLevel[3]) { post("monomeHeight:", monomeHeight, "\n"); }
}
