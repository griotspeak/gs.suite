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
var gWatchersConstructed = false;
var gMonome;
var gParameters = {};
var gDebugItem = {
    endValue : false,
    frequentItem : false,
    frequentList: false,
    frequentName : false,
    functionArguments : false,
    functionName : false, // !!!!!!!!!!!!!!
    list : false,
    loading : false,
    localValue : false,
    startValue : false
};

gParameters.monomeWidth = {};
gParameters.monomeHeight = {};
var gClipstepGlobal = new Global("GsCssGlobalControl");

var gPlayingClipsArray;
var gDebugLevel = [];

function setDebugLevel(level) {
    if (level > 0) { post("    --setDebugLevel--\n"); }
    
    //gDebugLevel[1] = true;
    //gDebugLevel[2] = true;
    //gDebugLevel[3] = true;
    //gDebugLevel[4] = true;
    //gDebugLevel[5] = true;
    //gDebugLevel[6] = true;

    // 0 - silence
    // 1 - function name at start
    // 2 - function end
    // 3 - variables at end of function
    // 4 - variables at start of function
    // 5 - lists. so many lists.
    // 6 - setters and getters
    
    gDebugLevel = [];
     for (var c = 0; c < 6; c++) {
        if (c <= level) {
            gDebugLevel[c] = true;
        }
        else {
            gDebugLevel[c] = false;
        }
    }
}

function initialize() {

    setDebugLevel(0);
    if (gDebugLevel[1]) {
        post("    ---initialize-\n");
    }    
    inSuite = 0;

    trackStopDisabled = 0;

    xOffset = this.patcher.getnamed("xOffsetGsClipnomePattr").getvalueof();
    yOffset = this.patcher.getnamed("yOffsetGsClipnomePattr").getvalueof();
    //monome variables
    gParameters.monomeWidth.value = this.patcher.getnamed("monomeWidthGsClipnomePattr").getvalueof();
    gParameters.monomeHeight.value = this.patcher.getnamed("monomeHeightGsClipnomePattr").getvalueof();

    var colOrder = (jsarguments[1] != null) ? jsarguments[1] : 0;

    if (colOrder === "switch") {
        sceneLaunchCol = function() {
            return gParameters.monomeWidth.value - 1;
        };
        functionCol = function() {
            return gParameters.monomeWidth.value - 2;
        };
    }
    else {
        colOrder = 0;
        sceneLaunchCol = function() {
            return gParameters.monomeWidth.value - 2;
        };
        functionCol = function() {
            return gParameters.monomeWidth.value - 1;
        };
    }

    // Prepare flashing arrays
    gPlayingClipsArray = [];
    gTriggeredClipsArray = [];

    // Start the show
    clipPlayingStatus = [];
    gMonome = new Monome(gParameters.monomeWidth.value, gParameters.monomeHeight.value, 0);
    clipslot = [];

    // Setup basic LiveAPI objects
    watchSet = new LiveAPI(this.patcher, updateClipWindow, "live_set");
    watchSet.property = "tracks";

    watchOVR = new LiveAPI(this.patcher, api_callback, "live_set");
    watchOVR.property = "overdub";
    watchPlay = new LiveAPI(this.patcher, api_callback, "live_set");
    watchPlay.property = "is_playing";
    watchMetro = new LiveAPI(this.patcher, api_callback, "live_set");
    watchMetro.property = "metronome";
    
    gWatchersConstructed = true;
    updateClipWindow();
}

function setXOffset(_newXOffset) {
    if (gDebugLevel[1]) {
        post("    ---setXOffset-\n");
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
    this.patcher.getnamed("xOffsetGsClipnomePattr").message("set", xOffset);

    if ((!shiftIsHeld()) && (!mixerIsHeld)) {
        updateClipWindow();
    }
}

function setYOffset(_newYOffset) {
    if (gDebugLevel[1]) { post("    ---setYOffset-\n"); }
    
    if (_newYOffset < 0) {
        yOffset = 0;
    } 
    else if(_newYOffset > 32) {
        yOffset = 32;
    }
    else {
        yOffset = _newYOffset;
    }
    this.patcher.getnamed("yOffsetGsClipnomePattr").message("set", yOffset);
    
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

function hardLastRow() { return gParameters.monomeHeight.value - 1; }

function muteRow() { return gParameters.monomeHeight.value - 3; }
function soloRow() { return gParameters.monomeHeight.value - 2; }
function armRow() { return gParameters.monomeHeight.value - 1; }



// Clip window dimensions.
function displayWidth() {
    return gParameters.monomeWidth.value - 2;
}
function displayHeight() {
    if (trackStopDisabled == 0) {
        return gParameters.monomeHeight.value - 1;
    }
    else if (trackStopDisabled == 1) {
        return gParameters.monomeHeight.value;
    }
}

// Main View
function updateClipWindow() {

    if (!gWatchersConstructed) {
        return;
    }
    
    if (gDebugLevel[1]) { post("    ---updateClipWindow-\n"); }
    
    clearFlashingClips();
    clearClipWindow();
    
    //where in the set?
    outlet(1, "track", "set", trackOffset() );
    outlet(1, "scene", "set", sceneOffset() );

    var lTrackCount = watchSet.getcount("tracks");
    var lSceneCount= watchSet.getcount("scenes");
    var lTrackDisplayLimit = trackOffset() + displayWidth();
    var lSceneDisplayLimit = sceneOffset() + displayHeight();
    var c = Math.min(lTrackDisplayLimit, lTrackCount);
    var d = Math.min(lSceneDisplayLimit, lSceneCount);
    
    clipslot = [];
    clipPlayingStatus = [];
    gPlayingClipsArray = [];
    gTriggeredClipsArray = [];

    var checkplay = watchPlay.get("is_playing");

    if (checkplay == 1) {
        visibleClipPlay(functionCol(), 0, 1);
    }

    for (var a = trackOffset(); a < c; a++) {

    //              clip slots
    /***************************************************/         
        clipslot[a] = [];
        clipPlayingStatus[a]= [];
        
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
    
    var d_width = gParameters.monomeWidth.value - 1;
    
    for (var col = 0; col < d_width; col ++) {
        for (var row = 0; row < gParameters.monomeHeight.value; row++) {
            gMonome[col][row].ledOff();
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
                gMonome[displayTrack][displayScene].ledOn();

                break;

            }
            
            if (args[1] == 0) {
                visibleClipPlay(displayTrack, displayScene, 0);
                visibleClipTrigger(displayTrack, displayScene, 0);
                gMonome[displayTrack][displayScene].ledOff();
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
                gMonome.refresh(); 
                break;
            }
            
        case "metronome":
            if (args[1] == 1) {
                gMonome[functionCol()][2].ledOn();
                break;
            }
            else {
                gMonome[functionCol()][2].ledOff(); 
                break;
            }
            
        case "overdub":
            if (args[1] == 1) {
                gMonome[functionCol()][1].ledOn();
                break;
            }
            else {
                gMonome[functionCol()][1].ledOff() ;
                break;
            }
            
        // Mixer cases
        case "mute":
            if (args[1] == 1) {
                gMonome[displayTrack][muteRow()].tempOff();
                break;
            }
            else {
                gMonome[displayTrack][muteRow()].tempOn();
                break;
            }
            
        case "solo":
            if (args[1] == 1) {
                gMonome[displayTrack][soloRow()].tempOn();
                break;
            }
            else {
                gMonome[displayTrack][soloRow()].tempOff();
                break;
            }
            
        case "arm":
            if (args[1] == 1) {
                gMonome[displayTrack][armRow()].tempOn();
                break;
            }
            else {
                gMonome[displayTrack][armRow()].tempOff();
                break;
            }
        default : {
            post("error in api_callback args[0]:", args[0], "\n");
            break;
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
                
                if ((track_fire < watchSet.getcount("tracks"))&&(scene_fire < watchSet.getcount("scenes"))) {
                    clipslot[track_fire][scene_fire].call("fire");
                }
                if (gDebugLevel[3]) { post("launch clip", track_fire, scene_fire, "\n");}
                gMonome[_column][_row].push();
                break;
            }
            else { 
                gMonome[_column][_row].release();
                break;
            }

        case isClipstepWindow(_column, _row):           
            if (_updown == 1) {
                var track_send = _column + trackOffset();
                var scene_send = _row + sceneOffset();
                if (gClipstepGlobal.setClip) {
                    post("looks good so far\n");
                    gClipstepGlobal.setClip(track_send, scene_send);
                }
                else {
                    post("no dice captain!\n");
                }
                if (gDebugLevel[3]) { post("send clip", track_send, scene_send,"\n");}
                gMonome[_column][_row].push();
                break;
            }
            else { 
                gMonome[_column][_row].release();
                break;
            }

        case isTrackStopButton(_column, _row):
            if (trackStopDisabled == 0) {
                if (_updown == 1) {
                    _track.call("stop_all_clips");
                    if (gDebugLevel[3]) { post("stop track", what_track, "\n");}
                    gMonome[_column][_row].push();
                    break;
                }
                else { 
                    gMonome[_column][_row].release();
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
                if (gDebugLevel[3]) { post("launch scene", what_scene, "\n"); }
                gMonome[_column][_row].push();
                break;
            }
            else { 
                gMonome[_column][_row].release();
                break;
            }
        
        // Mixer Buttons
        case isMixerButton(_column, _row):
            if (_updown == 1) {
                gMonome[_column][_row].ledOn();                
                gMonome[_column][_row].push();
                mixer();
                break;
                }
            else {
                gMonome[_column][_row].ledOff();                
                gMonome[_column][_row].release();
                updateClipWindow();
                break;
                }

        case isMuteButton(_column, _row):
            if (_updown == 1) {
            
                gMonome[_column][_row].push();
                
                var current_mute_state = _track.get("mute");
                var new_mute_state = (current_mute_state == 0) ? 1 : 0;
                _track.set("mute", new_mute_state);
                break;
            }
            else {
                gMonome[_column][_row].release();
                break;
            }

        case isSoloButton(_column, _row):
            if (_updown == 1) {

                gMonome[_column][_row].push();

                var current_solo_state = _track.get("solo");
                var new_solo_state = (current_solo_state == 0) ? 1 : 0;
                _track.set("solo", new_solo_state);
                break;
            }
            
            else {
                gMonome[_column][_row].release();
                break;
            }

        case isArmButton(_column, _row):
            if (_updown == 1) {
                gMonome[_column][_row].push();
                var current_arm_state = _track.get("arm");
                var new_arm_state = (current_arm_state == 0) ? 1 : 0;
                _track.set("arm", new_arm_state);
                break;
            }

            else {
                gMonome[_column][_row].release();
                break;
            }

        // Shift Buttons
        case isShift(_column, _row):
            if (_updown == 1) {
                gMonome[_column][_row].push();
                gMonome[_column][_row].ledOn();
                gMonome[displayWidth()][yOffset].tempOn();
                gMonome[xOffset][hardLastRow()].tempOn();
                break;
            }
            else { 
                gMonome[_column][_row].release();
                gMonome[_column][_row].ledOff();
                updateClipWindow();
                gMonome.refresh();
                break;
            }

        case isClipstepButton(_column, _row):
            if (_updown == 1) {
                gMonome[_column][_row].push();
                gMonome[_column][_row].ledOn();
                break;
            }
            else { 
                gMonome[_column][_row].release();
                gMonome[_column][_row].ledOff();
                break;
            }

        case isOffsetWindow(_column, _row):
            if (_updown == 1) {

                gMonome[_column][_row].push();
                
                gMonome[displayWidth()][yOffset].tempOff();
                gMonome[xOffset][hardLastRow()].tempOff();
                
                xOffset = _column;
                yOffset = _row;
                
                gMonome[displayWidth()][yOffset].tempOn();
                gMonome[xOffset][hardLastRow()].tempOn();
                if (gDebugLevel[3]) { post("xOffset:", xOffset, "\n"); }
                if (gDebugLevel[3]) { post("yOffset:", yOffset, "\n"); }
                break;
            }
            else {
                gMonome[_column][_row].release();
                break;
            }
        
        // Function Buttons
        case isStopAllClips(_column, _row):
            if (_updown == 1) {
                watchSet.call("stop_all_clips");
                gMonome[_column][_row].push();
                break;
            }
            else { 
                gMonome[_column][_row].release();
                break;
            }

        case isPlayButton(_column, _row):
            if (_updown == 1) {
                // regardless
                gMonome[_column][_row].push();
                
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
                gMonome[_column][_row].push();
                break;
            }

        case isOVRButton(_column, _row):
        
            if (_updown == 1) {
                
                gMonome[_column][_row].push();
                
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
                gMonome[_column][_row].push();
                break;
            }

        case isMetronomeButton(_column, _row):
            if (_updown == 1) {
            
                gMonome[_column][_row].push();
                
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
                gMonome[_column][_row].release();
                break;
            }

        case isTapTempoButton(_column, _row):
            if (_updown == 1) {
                watchSet.call("tap_tempo");
                gMonome[_column][_row].push();
                gMonome[_column][_row].ledOn();
                break;
            }

            else {
                gMonome[_column][_row].release();
                gMonome[_column][_row].ledOff();
                break;
            }
        case isDisableTrackstopsButton(_column, _row):
            if (_updown == 1) {
            
                gMonome[_column][_row].push();

                if (trackStopDisabled == 0) {
                    gMonome[_column][_row].ledOn();
                    trackStopDisabled = 1;
                    break;
                }
                
                else {
                    gMonome[_column][_row].ledOff();
                    trackStopDisabled = 0;
                    break;
                }
                
                updateClipWindow();
                
                break;
            }
            else {
                gMonome[_column][_row].release();
                break;
            }
        case isRelease(_column, _row):
            if (_updown == 1) {    
                gMonome[_column][_row].push();    
            }
            
            else { 
                gMonome[_column][_row].release();
                //if(inSuite == 1){ outlet(0, "release", "release", "clipstep"); }
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
    if (gMonome[functionCol()][_r].isHeld() == 1) {
        return true;
    }
    else { return false; }
}

function mixerIsHeld() {
    var _r = hardLastRow() - 2;
    if (gMonome[functionCol()][_r].isHeld() == 1) {
        return true;
    }
    else { return false; }
}

function shiftIsHeld() {
    var _r = hardLastRow() - 1;
    if (gMonome[functionCol()][_r].isHeld() == 1) {
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
    var f = gParameters.monomeWidth.value;
    for (e = 0; e < f; e++) {
        if (gPlayingClipsArray[e] != undefined) {
            var g = gPlayingClipsArray[e];
            gMonome[e][g].blink();
        }
    }
}

function flashTriggered() {
    var h;
    var i = gParameters.monomeWidth.value;
    for (h = 0; h < i; h++) {
        if (gTriggeredClipsArray[h] != undefined) {
            var j = gTriggeredClipsArray[h];
            gMonome[h][j].blink();
        }
    }
}

//              Add buttons to arrays for flashing
function visibleClipPlay(p_col, p_row, playing) {
    if (playing == 1) {
        gPlayingClipsArray[p_col] = p_row;              
    }
    else if ((playing == 0) &&          (p_row == gPlayingClipsArray[p_col]) ) {
        gMonome[p_col][p_row].checkActual();
        gPlayingClipsArray[p_col] = undefined;
    }
}
function visibleClipTrigger(p_col, p_row, triggered) {
    if (triggered == 1) {
        gTriggeredClipsArray[p_col] = p_row;                
    }
    else if (triggered == 0) {
        gMonome[p_col][p_row].checkActual();
        gTriggeredClipsArray[p_col] = undefined;
    }
    else {
        post("this should never happen. triggered ==", triggered, "\n");
    }
}
//              Remove buttons from arrays for flashing
function clearFlashingClips() {
    gPlayingClipsArray = [];
    gTriggeredClipsArray =[];
}

function mixer() {
    if (gDebugLevel[1]) { post("    --mixer--\n"); }

    clearFlashingClips();
    clearClipWindow();

    var lTrackCount = watchSet.getcount("tracks");
    var lSceneCount = watchSet.getcount("scenes");
    var lTrackDisplayLimit = trackOffset() + displayWidth();
    var lSceneDisplayLimit = sceneOffset() + displayHeight();
    var c = Math.min(lTrackDisplayLimit, lTrackCount);
    var d = Math.min(lSceneDisplayLimit, lSceneCount);

    var checkplay = watchPlay.get("is_playing");

    if (checkplay == 1) {
        visibleClipPlay(functionCol(), 0, 1);
    }

    // Prepare arrays
    gWatchArmed = [];
    gWatchSolo = [];
    gWatchMute = [];

    for (var a = trackOffset(); a < c; a++) {
        gWatchMute[a] = new LiveAPI(this.patcher, api_callback,        "live_set tracks " + a);
        gWatchMute[a].mode = 0;
        gWatchMute[a].track = a;
        gWatchMute[a].scene = 0;
        gWatchMute[a].property = "mute";                 

        gWatchSolo[a] = new LiveAPI(this.patcher, api_callback,        "live_set tracks " + a);
        gWatchSolo[a].mode = 0;
        gWatchSolo[a].track = a;
        gWatchSolo[a].scene = 0;
        gWatchSolo[a].property = "solo";

        gWatchArmed[a] = new LiveAPI(this.patcher, api_callback,           "live_set tracks " + a);
        gWatchArmed[a].mode = 0;
        gWatchArmed[a].track = a;
        gWatchArmed[a].scene = 0;
        gWatchArmed[a].property = "arm";
    }
}

function setMonomeWidth( mWidth) {
    post("mWidth:", mWidth, "\n");
    gParameters.monomeWidth.value = mWidth;
    gMonome.rebuild(gParameters.monomeWidth.value, gParameters.monomeHeight.value);
    this.patcher.getnamed("monomeWidthGsClipnomePattr").message(gParameters.monomeWidth.value);
    outlet(1, "gParameters.monomeWidth.value", "set", gParameters.monomeWidth.value );
    if (gDebugLevel[3]) { post("gParameters.monomeWidth.value:", gParameters.monomeWidth.value, "\n"); }
}

function setMonomeHeight( mHeight) {
    post("mHeight:", mHeight, "\n");
    gParameters.monomeHeight.value = mHeight;
    this.patcher.getnamed("monomeHeightGsClipnomePattr").message(gParameters.monomeHeight.value);
    outlet(1, "gParameters.monomeHeight.value", "set", gParameters.monomeHeight.value );
    if (gDebugLevel[3]) { post("gParameters.monomeHeight.value:", gParameters.monomeHeight.value, "\n"); }
}

//<Monome
//      \/\/\<Monome(?m).+\/\/Monome\>

   // Method: Monome
   // 
   // Monome abstraction
   // 
   // Parameters:
   // 
   //    aColumns - The number of columns to initialize with.
   //    aRows - The number of rows to initialize with.


function Monome(aColumns, aRows, aOutlet) {
    var iCol,
        iRow,
        that = this,
        mColumns = aColumns,
        mRows = aRows,
        mUpdating = false;
        
        if (! (this instanceof arguments.callee)) {
            post("use new! - Monome\n");
            return new Monome(aColumns, aRows, aOutlet);
        }
    
    if (gDebugItem.functionArguments) { post("mColumns", mColumns, "mRows", mRows, "\n"); }
    
    if (gDebugItem.functionName) { post("    --Monome--\n"); }
    if (gDebugItem.startValue) {
        post("monomeWidth:", aColumns, "\n");
        post("monomeHeight:", aRows, "\n");
    }

    function SingleCell(aCol, aRow, aOutlet) {
        var outletNumber = aOutlet;

        var mCol = aCol;
        var mRow = aRow;

        // local variables
        var actualState = 0;
        var tempState = 0;
        var held = 0;

        // Method: Monome[column][row].isHeld
        // 
        // Returns wether or not a button is currently held (1) or not (0)
        
        this.isHeld = function() {
            return held;
        };
        
        // Method: Monome[column][row].push
        //
        // (This Method should not be called directly except by <press>)
        //
        // Change the state of the button to held 

        this.push = function() {
            held = 1;
            return held;
        };

        // Method: Monome[column][row].release
        //
        // (This Method should not be called directly except by <press>)
        //
        // Change the state of the button to NOT held    
        
        this.release = function() {
            held = 0;
            return held;
        };
        
        // Method: Monome[column][row].ledOn
        //
        // Change the state of the button to lit (sends message out of designated outlet)

        this.ledOn = function() {
            actualState = 1;
            if(!mUpdating) {
                outlet(outletNumber, mCol, mRow, actualState);
            }
        };

        this.ledOff = function() {
            actualState = 0;
            if (!mUpdating) {
                outlet(outletNumber, mCol, mRow, actualState);
            }
        };

        this.checkActual = function() {
            //post("mUpdating:", (mUpdating) ? "true" : "false", "actualState:", actualState, "\n");
            outlet(outletNumber, mCol, mRow, actualState);
            tempState = 0;
        };

        this.blink = function() {
            tempState = (tempState == 1) ? 0: 1;
            outlet(outletNumber, mCol, mRow, tempState);
        };

        this.blinkIfOff = function() {
            if (actualState == 0) {
                tempState = (tempState == 1) ? 0: 1;
                outlet(outletNumber, mCol, mRow, tempState);
            }
        };

        this.tempOn = function() {
            tempState = 1;
            outlet(outletNumber, mCol, mRow, tempState);
        };

        this.tempOff = function() {
            tempState = 0;
            outlet(outletNumber, mCol, mRow, actualState);
        };
    }

    this.column = function(aColumn, aMethodToInvoke) {
        var iRow, 
            lHeight = mRows;
        
        for (iRow = 0; iRow < lHeight; iRow++) {
            that[aColumn][iRow][aMethodToInvoke]();
        }
    };

    this.row = function(aRow, aMethodToInvoke) {
        var iColumn,
            lWidth = mColumns;
            
        for (iColumn = 0; iColumn < lWidth; iColumn++) {
            that[iColumn][aRow][aMethodToInvoke]();
        }
    };
    this.isValidColumn = function(aNumber) {
        return (mColumns > aNumber) ? true : false;
    };
    
    this.isValidRow = function(aNumber) {
        return (aRows > aNumber) ? true : false;
    };
    
    this.rebuild = function(aColumns, aRows) {
        var iCol,
            iRow,
            lMaxColumns = Math.max(aColumns, mColumns),
            lMaxRows = Math.max(aRows, mRows);
            
        if (gDebugItem.functionName) { post("    --rebuild--\n"); }
        
        mColumns = aColumns;
        mRows = aRows;
        
        for (iCol = 0; iCol < lMaxColumns; iCol++) {
            if ((that[iCol] != null) && (iCol < aColumns)) {
                if (gDebugItem.list) { post("column:", iCol, "is fine!\n"); }
            }
            else if ((that[iCol] != null) && (iCol >= aColumns)) {
                if (gDebugItem.list) { post("column:", iCol, "will be deleted!\n"); }
                that[iCol] = null;
            }
            
            else if((!that[iCol]) && (iCol < aColumns)) {
                that[iCol] = [];
                if (gDebugItem.list) { post("column:", iCol, "added!\n"); }
            }
            
            
        if (that[iCol] != null) {
            for (iRow = 0; iRow < lMaxRows; iRow++) {
                if ((that[iCol][iRow] != null) && (iRow < aRows)) {
                    if (gDebugItem.list) { post("column:", iCol, "row:", iRow, "is fine!\n"); }
                }
                else if ((that[iCol][iRow] != null) && (iRow >= aRows)) {
                    that[iCol][iRow] = null;
                    if (gDebugItem.list) { post("column:", iCol, "row:", iRow, "deleted!\n"); }
                }

                else if ((!that[iCol][iRow]) && (iRow < aRows)) {
                    if (gDebugItem.list) { post("column:", iCol, "row:", iRow, "added!\n"); }
                    that[iCol][iRow] = new SingleCell(iCol, iRow, aOutlet);
                }
            }
            if (gDebugItem.endValue) { post("Monome[", iCol, "].length:", that[iCol].length, "\n"); } }
        }

    };
    
    this.refresh = function() {
        if (gDebugItem.functionName) { post("    --refresh--\n"); }
        
        var iCol,
            iRow,
            lHeight = mRows,
            lWidth = mColumns;

        for (iCol = 0; iCol < lWidth; iCol++) {
            for (iRow = 0, lHeight; iRow < lHeight; iRow++) {
                that[iCol][iRow].checkActual();
            }
        }
    };

    this.beginUpdates = function() {
        if (gDebugItem.functionName) { post("    --beginUpdates--\n"); }
        
        mUpdating = true;
    };
    this.endUpdates = function() {
        if (gDebugItem.functionName) { post("    --endUpdates--\n"); }
        
        var iCol;
        var iRow;
        
        mUpdating = false;
        that.refresh();
    };
    
    for (iCol = 0; iCol < aColumns; iCol++) {
        
        that[iCol] = [];
        for (iRow = 0; iRow < aRows; iRow++) {
            that[iCol][iRow] = new SingleCell(iCol, iRow, aOutlet);
        }
        if (gDebugItem.startValue) {
            post("Monome[", iCol, "].length:", that[iCol].length, "\n");
        }
    }
    if (gDebugItem.startValue) {
        post("Monome.length (width):", that.length, "\n");
    }
    return this;
}

//Monome>