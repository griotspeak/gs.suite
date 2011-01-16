/*
-*- coding: utf-8 -*-
gs.clipStepSequencer 0.095
Copyright (c) 2010, TJ Usiyan a.k.a. griotspeak
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the ClipStepSequencer nor the
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
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 

Many thanks to pukunui and Andrew Pask examples and everyone else who i 
have taken inspiration/insight from.

*/

//                                  ---===Patcher/MaxMSP Stuff===---
var autowatch = 1;

var inlets = 1;
var outlets = 2;
var post;
var outlet;


var newNoteVelocity;
var newNoteLength;
var rootNote;
var currentScale;
var currentScaleName;
var rowOffset;
var watchSet;
var countAllTracks;
var trackArray;
var watchSetPlaying;
var glob;
var s;
var indexTrack;
var mWatchersCreated = false;

var watchSetTracks; //not an attribute
var thereIsAClipInSlot; // not an attribute


var parameter = {
    clipScene : {
        name : "clipScene",
        type : "number",
        value : 0,
        minValue : 0,
        maxValue : 2048,
        saveInPattr : true
    },
    currentScaleName : {
        name : "currentScaleName",
        type : "string",
        value : "Drums",
        minValue : null,
        maxValue : null,
        saveInPattr : true
    },
    cycles : {
        name : "cycles",
        type : "number",
        value : 3,
        minValue : 1,
        maxValue : 127,
        saveInPattr : true
    },
    displayWidth : {
        name : "displayWidth",
        type : "number",
        value : 1,
        minValue : 0.00625,
        maxValue : 127,
        saveInPattr : true
    },
    folding : {
        name : "folding",
        type : "toggle",
        value : 0,
        minValue : 0,
        maxValue : 1,
        saveInPattr : true
    },
    foldingRowOffset : {
        name : "foldingRowOffset",
        type : "number",
        value : 0,
        minValue : 0,
        maxValue : 2048,
        saveInPattr : true
    },
    functionMode : {
        name : "functionMode",
        type : "number",
        value : 0,
        minValue : 0,
        maxValue : 4,
        saveInPattr : true
    },
    inSuite : {
        name : "inSuite",
        type : "toggle",
        value : 0,
        minValue : 0,
        maxValue : 1,
        saveInPattr : true
    },
    monomeHeight : {
        name : "monomeHeight",
        type : "number",
        value : 8,
        minValue : 2,
        maxValue : 2048,
        saveInPattr : true
    },
    monomeWidth : {
        name : "monomeWidth",
        type : "number",
        value : 8,
        minValue : 2,
        maxValue : 2048,
        saveInPattr : true
    },
    newNoteLength : {
        name : "newNoteLength",
        type : "number",
        value : 0.125,
        minValue : 0.00625,
        maxValue : 0.000390625,
        saveInPattr : true
    },
    newNoteVelocity : {
        name : "newNoteVelocity",
        type : "number",
        value : 100,
        minValue : 0,
        maxValue : 127,
        saveInPattr : true
    },
    trackIndex : {
        name : "trackIndex",
        type : "number",
        value : 0,
        minValue : 0,
        maxValue : 2048,
        saveInPattr : true
    },
    rootNote : {
        name : "rootNote",
        type : "number",
        value : 60,
        minValue : 0,
        maxValue : 127,
        saveInPattr : true
    },
    rowOffset : {
        name : "rowOffset",
        type : "number",
        value : 0,
        minValue : 0,
        maxValue : 2048,
        saveInPattr : true
    },
    timeOffset : {
        name : "timeOffset",
        type : "number",
        value : 0,
        minValue : 0,
        maxValue : 2048,
        saveInPattr : true
    }
};

// 
var debugLevel;
setDebugLevel(0);

//debugLevel[1] = true;
//debugLevel[2] = true;
//debugLevel[3] = true;
//debugLevel[4] = true;
//debugLevel[5] = true;
//debugLevel[6] = true;
//debugLevel[7] = true;
//debugLevel[8] = true;
//

// 0 - silence
// 1 - function name at beginning
// 2 - function end
// 3 - variables at end of function
// 4 - variables at beginning of function
// 5 - lists. so many lists.
// 6 - setters and getters - name at beginning
// 7 - setters and getters - value at end
// 8 - setters and getters - value at beginning

function bang() {
    if (debugLevel[1]) { post("                     ---bang-\n"); }
    
    post(currentScale, "\n");
    post("name:", currentScaleName, "\n");
    post("monomeHeight:", parameter.monomeHeight.value, "\n");
    post("monomeWidth:", parameter.monomeWidth.value, "\n");
    post("root:", rootNote, "\n");
    post("cycles:", parameter.cycles.value, "\n");
}

function initialize() {
    if (debugLevel[1]) { post("                     ---initialize-\n"); }
    if (debugLevel[5]) { postPattrs("start"); }
    grabAllPattrValues();
    buildMonome();
    
    watchSet = new LiveAPI(this.patcher, null, "live_set");
    countAllTracks = new LiveAPI(this.patcher, null, "live_set");
    
    updateFunctionModeLeds();
    updateMultiPurposeLeds();

    countMidiTracks();
        
    if (debugLevel[4]) {
        post("trackNumber:", trackArray[parameter.trackIndex.value], "\n");
        post("clipScene:", parameter.clipScene.value, "\n"); 
    }
    
    // those with callbacks 
    watchSetTracks = new LiveAPI(this.patcher, countMidiTracks, "live_set");
    watchSetTracks.property = "tracks";
    watchSetPlaying = new LiveAPI(this.patcher, setPlayheadVisible, "live_set");
    watchSetPlaying.property = "is_playing";
    
    glob = new Global("clipStepGlobalController");
    glob.setClip = setClipFromGlobal;
    
    setTrackIndexAndScene(parameter.trackIndex.value, parameter.clipScene.value);
    
    mWatchersCreated = true;
    updateNoteDisplay();
    
    post("gs.ClipStepSequencer finished loading\n");
}

function grabAllPattrValues() {
    if (debugLevel[1]) { post("                     ---grabAllPattrValues-\n"); }

    var clipScenePVal = Number(this.patcher.getnamed("clipSceneGsCssPattr").getvalueof());
    var currentScaleNamePVal = this.patcher.getnamed("currentScaleNameGsCssPattr").getvalueof();
    var cyclesPVal = Number(this.patcher.getnamed("cyclesGsCssPattr").getvalueof());
    var displayWidthPVal = Number(this.patcher.getnamed("displayWidthGsCssPattr").getvalueof());
    var foldingPVal = Number(this.patcher.getnamed("foldingGsCssPattr").getvalueof());
    var foldingRowOffsetPVal = Number(this.patcher.getnamed("foldingRowOffsetGsCssPattr").getvalueof());    
    var functionModePVal = Number(this.patcher.getnamed("functionModeGsCssPattr").getvalueof());
    var inSuitePVal = Number(this.patcher.getnamed("inSuiteGsCssPattr").getvalueof());
    var monomeHeightPVal = Number(this.patcher.getnamed("monomeHeightGsCssPattr").getvalueof());
    var monomeWidthPVal = Number(this.patcher.getnamed("monomeWidthGsCssPattr").getvalueof());
    var newNoteLengthPVal = Number(this.patcher.getnamed("newNoteLengthGsCssPattr").getvalueof());
    var newNoteVelocityPVal = Number(this.patcher.getnamed("newNoteVelocityGsCssPattr").getvalueof());
    var rootNotePVal = Number(this.patcher.getnamed("rootNoteGsCssPattr").getvalueof());
    var rowOffsetPVal = Number(this.patcher.getnamed("rowOffsetGsCssPattr").getvalueof());
    var timeOffsetPVal = Number(this.patcher.getnamed("timeOffsetGsCssPattr").getvalueof());
    var trackIndexPVal = Number(this.patcher.getnamed("trackIndexGsCssPattr").getvalueof());
    
    if (debugLevel[3]) { post("clipScenePVal:", clipScenePVal, "\n"); }
    if (debugLevel[3]) { post("currentScaleNamePVal:", currentScaleNamePVal, "\n"); }
    if (debugLevel[3]) { post("cyclesPVal:", cyclesPVal, "\n"); }
    if (debugLevel[3]) { post("displayWidthPVal:", displayWidthPVal, "\n"); }
    if (debugLevel[3]) { post("foldingPVal:", foldingPVal, "\n"); }
    if (debugLevel[3]) { post("foldingRowOffsetPVal:", foldingRowOffsetPVal, "\n"); }
    if (debugLevel[3]) { post("functionModePVal:", functionModePVal, "\n"); }
    if (debugLevel[3]) { post("inSuitePVal:", inSuitePVal, "\n"); }
    if (debugLevel[3]) { post("monomeHeightPVal:", monomeHeightPVal, "\n"); }
    if (debugLevel[3]) { post("monomeWidthPVal:", monomeWidthPVal, "\n"); }
    if (debugLevel[3]) { post("newNoteLengthPVal:", newNoteLengthPVal, "\n"); }
    if (debugLevel[3]) { post("newNoteVelocityPVal:", newNoteVelocityPVal, "\n"); }
    if (debugLevel[3]) { post("rootNotePVal:", rootNotePVal, "\n"); }
    if (debugLevel[3]) { post("rowOffsetPVal:", rowOffsetPVal, "\n"); }
    if (debugLevel[3]) { post("timeOffsetPVal:", timeOffsetPVal, "\n"); }
    if (debugLevel[3]) { post("trackIndexPVal:", trackIndexPVal, "\n"); }
    
    parameter.clipScene.value = ((clipScenePVal != NaN) && (clipScenePVal  >= 0)) ? clipScenePVal : 0;
    currentScaleName = (currentScaleNamePVal != undefined) ? currentScaleNamePVal : "Drums";
    parameter.cycles.value = ((cyclesPVal != NaN) && (cyclesPVal > 0)) ? cyclesPVal : 0;
    parameter.displayWidth.value = ((parameter.displayWidth.value != NaN) && (parameter.displayWidth.value > 0)) ? parameter.displayWidth.value : 0; 
    parameter.folding.value = ((parameter.folding.value != NaN) && (parameter.folding.value > 0)) ? parameter.folding.value : 0;
    parameter.foldingRowOffset.value = ((parameter.foldingRowOffset.value != NaN) && (parameter.foldingRowOffset.value > 0)) ? parameter.foldingRowOffset.value : 0;
    parameter.functionMode.value = ((functionModePVal != NaN) && (functionModePVal >= 0) && (functionModePVal <= 4)) ? functionModePVal : 0;
    parameter.inSuite.value = (inSuitePVal != null) ? inSuitePVal : 0;
    parameter.monomeHeight.value = ((monomeHeightPVal != NaN) && (monomeHeightPVal > 2)) ? monomeHeightPVal : 8;
    parameter.monomeWidth.value = ((monomeWidthPVal != NaN) && (monomeWidthPVal > 2)) ? monomeWidthPVal : 8;
    newNoteLength = ((newNoteLengthPVal != NaN) && (newNoteLengthPVal > 0)) ? newNoteLengthPVal : 0.25;
    newNoteVelocity = ((newNoteVelocityPVal != NaN) && (newNoteVelocityPVal >= 0) && (newNoteVelocityPVal <= 127)) ? newNoteVelocityPVal : 100;
    rootNote = ((rootNotePVal != NaN) && (rootNotePVal >= 0) && (rootNotePVal <= 127)) ? rootNotePVal : 60;
    rowOffset = ((rowOffsetPVal != NaN) && (rowOffsetPVal >= 0)) ? rowOffsetPVal : 0;
    timeOffset = ((timeOffset != NaN) && (timeOffset > 0)) ? timeOffset : 0;
    parameter.trackIndex.value = ((trackIndexPVal != NaN) && (trackIndexPVal >= 0)) ? trackIndexPVal : 0;
        
    updatePattrs();
}

function postPattrs(_text) {
    if (debugLevel[1]) { post("                     ---postPattrs-\n"); }
    post("<" + _text +">\n");
    
    var clipScenePVal = Number(this.patcher.getnamed("clipSceneGsCssPattr").getvalueof());
    var currentScaleNamePVal = this.patcher.getnamed("currentScaleNameGsCssPattr").getvalueof();
    var cyclesPVal = Number(this.patcher.getnamed("cyclesGsCssPattr").getvalueof());
    var displayWidthPVal = Number(this.patcher.getnamed("displayWidthGsCssPattr").getvalueof());
    var foldingPVal = Number(this.patcher.getnamed("foldingGsCssPattr").getvalueof());
    var foldingRowOffsetPVal = Number(this.patcher.getnamed("foldingRowOffsetGsCssPattr").getvalueof());    
    var functionModePVal = Number(this.patcher.getnamed("functionModeGsCssPattr").getvalueof());
    var inSuitePVal = Number(this.patcher.getnamed("inSuiteGsCssPattr").getvalueof());
    var monomeHeightPVal = Number(this.patcher.getnamed("monomeHeightGsCssPattr").getvalueof());
    var monomeWidthPVal = Number(this.patcher.getnamed("monomeWidthGsCssPattr").getvalueof());
    var newNoteLengthPVal = Number(this.patcher.getnamed("newNoteLengthGsCssPattr").getvalueof());
    var newNoteVelocityPVal = Number(this.patcher.getnamed("newNoteVelocityGsCssPattr").getvalueof());
    var rootNotePVal = Number(this.patcher.getnamed("rootNoteGsCssPattr").getvalueof());
    var rowOffsetPVal = Number(this.patcher.getnamed("rowOffsetGsCssPattr").getvalueof());
    var timeOffsetPVal = Number(this.patcher.getnamed("timeOffsetGsCssPattr").getvalueof());
    var trackIndexPVal = Number(this.patcher.getnamed("trackIndexGsCssPattr").getvalueof());
    
    post("clipScenePVal:", clipScenePVal, "\n");
    post("currentScaleNamePVal:", currentScaleNamePVal, "\n");
    post("cyclesPVal:", cyclesPVal, "\n");
    post("displayWidthPVal:", displayWidthPVal, "\n");
    post("foldingPVal:", foldingPVal, "\n");
    post("foldingRowOffsetPVal:", foldingRowOffsetPVal, "\n");
    post("functionModePVal:", functionModePVal, "\n");
    post("inSuitePVal:", inSuitePVal, "\n");
    post("monomeHeightPVal:", monomeHeightPVal, "\n");
    post("monomeWidthPVal:", monomeWidthPVal, "\n");
    post("newNoteLengthPVal:", newNoteLengthPVal, "\n");
    post("newNoteVelocityPVal:", newNoteVelocityPVal, "\n");
    post("rootNotePVal:", rootNotePVal, "\n");
    post("rowOffsetPVal:", rowOffsetPVal, "\n");
    post("timeOffsetPVal:", timeOffsetPVal, "\n");
    post("trackIndexPVal:", trackIndexPVal, "\n");
    
    post("</" + _text +">\n");
}


function updatePattrs() {
    if (debugLevel[1]) { post("                     ---updatePattrs-\n"); }
    
    this.patcher.getnamed("clipSceneGsCssPattr").message(parameter.clipScene.value);
    this.patcher.getnamed("currentScaleNameGsCssPattr").message(currentScaleName);
    this.patcher.getnamed("cyclesGsCssPattr").message(parameter.cycles.value);
    this.patcher.getnamed("displayWidthGsCssPattr").message(parameter.displayWidth.value);
    this.patcher.getnamed("foldingGsCssPattr").message(parameter.folding.value);
    this.patcher.getnamed("foldingRowOffsetGsCssPattr").message(parameter.foldingRowOffset.value);
    this.patcher.getnamed("functionModeGsCssPattr").message(parameter.functionMode.value);
    this.patcher.getnamed("inSuiteGsCssPattr").message(parameter.inSuite.value);
    this.patcher.getnamed("monomeHeightGsCssPattr").message(parameter.monomeHeight.value);
    this.patcher.getnamed("monomeWidthGsCssPattr").message(parameter.monomeWidth.value);
    this.patcher.getnamed("newNoteLengthGsCssPattr").message(newNoteLength);
    this.patcher.getnamed("newNoteVelocityGsCssPattr").message(newNoteVelocity);
    this.patcher.getnamed("rootNoteGsCssPattr").message(rootNote);
    this.patcher.getnamed("rowOffsetGsCssPattr").message(rowOffset);
    this.patcher.getnamed("timeOffsetGsCssPattr").message(timeOffset);
    this.patcher.getnamed("trackIndexGsCssPattr").message(parameter.trackIndex.value);
}

function setClipFromGlobal(aTrack, aScene) {
    if (debugLevel[6]) { post("                     ---setClipFromGlobal-\n"); }
    
    var index = getIndexOfTrack(aTrack);
    if (index > -1) {
        setTrackIndexAndScene(index, aScene);
    }
}

function setDebugLevel(level) {
    if (level > 0) { post("                           --setDebugLevel = ", level, "--\n"); }
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

//                                  ---===Prototype work===---

Array.prototype.inArray = function (numInQuestion) {
    if (debugLevel[6]) { post("                               --inArray-\n"); }
    
    // need this later for Folding Logic
    var g;
    if (this.indexOf( numInQuestion ) > -1) { g = true; }
    else if (this.indexOf( numInQuestion ) == -1) { g = false; }
    else { g = NaN; }
    return g;
};

Array.prototype.noteToLiveAPI = function () {
    if (debugLevel[6]) { post("                               --noteToLiveAPI-\n"); }
    
    // Typecasting? In javascript? Yessert!
    var timeNumber = Number(this[2]);
    this[2] = timeNumber.toFixed(3);
    var durationNumber = Number(this[3]);
    this[3] = durationNumber.toFixed(3);
    return this;
};

Number.prototype.toLength = function (len) {
       if (debugLevel[6]) { post("                              --toLength--\n"); }

    s = this.toString();
    if (s.length < len) {
        s = ('0000' + this.toString()).slice(-len);
    }

    return s;
   
};

var VelocityOption = {
    _0 : 0,
    _1 : 24,
    _2 : 48,
    _3 : 64,
    _4 : 80,
    _5 : 96,
    _6 : 112,
    _7 : 127
};

var LengthOption = {
    _0 : 0.0625,
    _1 : 0.125,
    _2 : 0.25,
    _3 : 0.5,
    _4 : 1,
    _5 : 2,
    _6 : 4,
    _7 : 8
};

var DisplayWidthOption = {
    _0 : 1,
    _1 : 2,
    _2 : 4,
    _3 : 8,
    _4 : 16,
    _5 : 32,
    _6 : 64,
    _7 : 128
};


//                                  ---===Monome Setup===---

var Monome = [];

var FunctionButton = {
    dynamic_0: 0,
    dynamic_1: 1,
    dynamic_2: 2,
    dynamic_3: 3,
    shift: 4,
    bit0: 5,
    bit1: 6,
    fold: 7
};

var FunctionMode = {
    moveMode: 0,
    lengthMode: 1,
    velocityMode: 2,
    widthMode: 3
};

//                                  ---===Scale Maps===---
                                //    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2]
var majorScale =                     [0, 2, 2, 1, 2, 2, 2, 1]; //last note provided for distance
majorScale.name = "Major";

var naturalMinorScale            =    [0, 2, 1, 2, 2, 1, 2, 2];
naturalMinorScale.name = "NaturalMinor";

var harmonicMinorScale            =    [0, 2, 1, 2, 2, 1, 3, 1];
harmonicMinorScale.name = "HarmonicMinor";

var chromaticScale                =    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
chromaticScale.name = "Chromatic";

var minorPentatonicScale        =    [0, 3, 2, 2, 3, 2];
minorPentatonicScale.name = "MinorPentatonic";

var majorPentatonicScale        =    [0, 2, 2, 3, 2, 3];
majorPentatonicScale.name = "MajorPentatonic";

var bluesPentatonicScale        =    [0, 3, 2, 1, 1, 3, 2];
bluesPentatonicScale.name = "BluesPentatonic";

                                //    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2]
var ionianMode                     =    [0, 2, 2, 1, 2, 2, 2, 1];
ionianMode.name = "Ionian";

var dorianMode                    =    [0, 2, 1, 2, 2, 2, 1, 2];
dorianMode.name = "Dorian";

var phrygianMode                =    [0, 1, 2, 2, 2, 1, 2, 2];
phrygianMode.name = "Phrygian";

var lydianMode                    =    [0, 2, 2, 2, 1, 2, 2, 1];
lydianMode.name = "Lydian";

var mixolydianMode                =    [0, 2, 2, 1, 2, 2, 1, 2];
mixolydianMode.name = "Mixolydian";

var aeolianMode                    =    [0, 2, 1, 2, 2, 1, 2, 2];
aeolianMode.name = "Aeolian";

var locrianMode                    =    [0, 1, 2, 2, 1, 2, 2, 2];
locrianMode.name = "Locrian";

var wholeToneScale                =    [0, 2, 2, 2, 2, 2];
wholeToneScale.name = "WholeTone";

var wholeHalfdiminishedScale    =    [0, 2, 1, 2, 1, 2, 1, 2];
wholeHalfdiminishedScale.name = "WholeHalfDiminished";

var halfWholeDiminishedScale    =    [0, 1, 2, 1, 2, 1, 2, 1];
halfWholeDiminishedScale.name = "HalfWholeDiminished";

var symmetricalAugmentedScale    =    [0, 3, 1, 3, 1, 3, 1];
symmetricalAugmentedScale.name = "SymmetricalAugmented";

var tritoneScale                =    [0, 3, 2, 3, 1, 3, 2];
tritoneScale.name = "Tritone";

var majorQuartalScale            =    [0, 5, 6, 5, 5, 5, 5, 5];
majorQuartalScale.name = "MajorQuartal";

var minorQuartalScale            =    [0, 5, 5, 5, 5, 6, 5, 5];
minorQuartalScale.name = "MinorQuartal";

//                                  ---===Drum Mapping===---
var defaultDrumScale            =    [36, 37, 38, 41, 42, 44, 45, 46, 48, 50, 53, 55, 56, 57, 59];
defaultDrumScale.name = "Drums";

currentScale =    defaultDrumScale;
currentScaleName = "Drums";

//                                  ---===Create Empty Arrays===---
var noteArray = [];
var displayNoteList = [];
var clipNotes = new Array();


//                                  ---===conditions===---
var playheadVisible = false;
var followingPlayingClip = false;
var extendedWidthOptions = false;
var extendedLengthOptions = false;
var extendedVelocityOptions = false;
        
//                                  ---===Variables===---
var timeOffset = 0;

//                                  ---===LiveAPI placeholders===---
var checkForClip = false;
var editClip = false;
var watchTrack = false;
var watchTrackForPlayingClip = false;
var watchClipNotes = false;
var watchClipPlayingStatus = false;
var watchClipIsPlaying = false;
var watchClipPlayhead = false;
var indexSet = false;
var functionToggle = [ false, false];

//                                  ---===LiveAPI Calls===---
// those without callbacks

//                                  ---===track accessors===---

function setTrack(aNewTrackNumber) {
    if (debugLevel[6]) { post("                               --setTrack--\n"); }

    setTrackIndex(getIndexOfTrack(aNewTrackNumber -1));    
}

//                                  ---===trackIndex accessors===---
function setTrackIndex(aNewIndexNumber) {
    if (debugLevel[6]) { post("                               --setTrackIndex--\n"); }
    parameter.trackIndex.value = aNewIndexNumber;
    focusOnClip();

    this.patcher.getnamed("trackIndexGsCssPattr").message(parameter.trackIndex.value);
    
    if (debugLevel[3]) { post("trackIndex after setTrackIndex:", parameter.trackIndex.value, "\n"); }
}
function getTrackIndex() {
    if (debugLevel[6]) { post("                               --getTrackIndex--\n"); }
    return parameter.trackIndex.value;
}
function changeTrackIndex(amountOfChange) {
    if (debugLevel[6]) { post("                               --changeTrackIndex--\n"); }
    if (debugLevel[4]) { post("trackIndex before:", parameter.trackIndex.value, "amountOfChange", amountOfChange, "\n"); }
    parameter.trackIndex.value += amountOfChange;
    
    if (parameter.trackIndex.value < 0) { parameter.trackIndex.value = 0; }
    else if (parameter.trackIndex.value >= trackArray.length) { 
        parameter.trackIndex.value = trackArray.length - 1;
    }
    if (debugLevel[3]) { post("trackIndex after:", parameter.trackIndex.value, "\n"); }
    this.patcher.getnamed("trackIndexGsCssPattr").message(parameter.trackIndex.value);
    return parameter.trackIndex.value;
}
function getIndexOfTrack(trackToFind) {
    if (debugLevel[6]) { post("                               --getTrackIndex--\n"); }

    if (debugLevel[4]) { post("looking for:", trackToFind, "\n");}
    var index = trackArray.indexOf(trackToFind);

    if (index != -1) {
        if (debugLevel[4]) { post(trackToFind, "is a valid midi track\n");}
        if (debugLevel[4]) { post(index, "is it's index\n");}
        return index;
    }
    
    else {
        if (debugLevel[4]) { post(trackToFind, "is not a valid midi track\n");}
        return -1;
    }
}

function setTrackIndexAndScene(aNewIndexNumber, aNewSceneNumber) {
    if (debugLevel[6]) { post("                               --setTrackIndex--\n"); }
    parameter.trackIndex.value = aNewIndexNumber;
    
    var lCounter;
    
    var lLimit = watchSet.getcount("scenes");

    if (lLimit != 0) { 
        for (lCounter = aNewSceneNumber; lCounter < lLimit; lCounter++) {
            parameter.clipScene.value = lCounter;
            if (debugLevel[6]) { post("clipScene:", parameter.clipScene.value, "\n"); }
            if (focusOnClip()) { return true; }
        }
    
        for (lCounter = aNewSceneNumber; lCounter >=0; lCounter--) {
            parameter.clipScene.value = lCounter;
            if (debugLevel[6]) { post("clipScene:", parameter.clipScene.value, "\n"); }
            if (focusOnClip()) { return true; }
        }
    
        parameter.clipScene.value = 0;
    }
    
    if (debugLevel[4]) { 
        post("trackIndex after setTrackIndexAndScene:", parameter.trackIndex.value, "\n");
        post("clipScene after setTrackIndexAndScene:", parameter.clipScene.value, "\n");
    }
    
    this.patcher.getnamed("trackIndexGsCssPattr").message(parameter.trackIndex.value);
    this.patcher.getnamed("clipSceneGsCssPattr").message(parameter.clipScene.value);
        
    return false;
}

//                                  ---===rowOffset accessors===---
function setRowOffset(aNewOffsetNumber) {
    if (debugLevel[6]) { post("                               --setRowOffset--\n"); }
    rowOffset =        aNewOffsetNumber;
    updateNoteDisplay();

    this.patcher.getnamed("rowOffsetGsCssPattr").message(rowOffset);

}
function setFoldingRowOffset(aNewOffsetNumber) {
    if (debugLevel[6]) { post("                               --setRowOffset--\n"); }
    parameter.foldingRowOffset.value =      aNewOffsetNumber;
    updateNoteDisplay();
    
    this.patcher.getnamed("foldingRowOffsetGsCssPattr").message(parameter.foldingRowOffset.value);
}
function getRowOffset() {
    return (parameter.folding.value) ? parameter.foldingRowOffset.value : rowOffset;
}
function changeRowOffset(amountOfChange) {
    if (debugLevel[6]) { post("                               --changeRowOffset--\n"); }
    
    if(!amountOfChange) { amountOfChange = 1; }
    var offsetHolder = (parameter.folding.value) ? parameter.foldingRowOffset.value : rowOffset;
    
    if (debugLevel[8]) { post("offsetHolder before changeRowOffset:", offsetHolder, "\n"); }
    
    offsetHolder += amountOfChange;
    
    if (offsetHolder + monomeLastRow() >= displayNoteList.length) {
        offsetHolder = displayNoteList.length - monomeLastRow();
    }
    if (offsetHolder < 0) {
        offsetHolder = 0;
    }
    
    if (parameter.folding.value) { parameter.foldingRowOffset.value = offsetHolder; }
    else { rowOffset = offsetHolder; }
    
    if (debugLevel[7]) { post("offsetHolder after downInClip:", offsetHolder, "\n"); }
    updateNoteDisplay();
}

//                                  ---===clipScene accessors===---
function setClipScene(aNewSceneNumber) {
    if (debugLevel[6]) { post("                               --setClipScene--\n"); }
    parameter.clipScene.value = aNewSceneNumber;
    focusOnClip();
    
    this.patcher.getnamed("clipSceneGsCssPattr").message(parameter.clipScene.value);
}

function setClipSceneFromPatcher(aNewSceneNumber) {
    if (debugLevel[6]) { post("                               --setClipSceneFromPatcher--\n"); }
    setClipScene(aNewSceneNumber - 1);
}
function getClipScene() {
    if (debugLevel[6]) { post("                               --getClipScene--\n"); }
    return parameter.clipScene.value;
}
function changeClipScene(amountOfChange) {
    if (debugLevel[6]) { post("                               --changeClipScene--\n"); }
    //var oldClipSceneNumber = parameter.clipScene.value;
    parameter.clipScene.value += amountOfChange;
    
//    if (amountOfChange == 0) { return parameter.clipScene.value; }
//    else {
//        while (!focusOnClip()) {
//            setClipScene(parameter.clipScene.value + (amountOfChange / Math.abs(amountOfChange)));
//            if (debugLevel[5]) { post("clipScene:", parameter.clipScene.value, "\n"); }
//        }
//    }    
//    if (!isValidClipSceneNumber(parameter.clipScene.value)) { setClipScene(oldClipSceneNumber); }
    
    if (parameter.clipScene.value < 0) {
        parameter.clipScene.value = 0;
    }
    else if (parameter.clipScene.value >= watchSet.getcount("scenes")) {
        parameter.clipScene.value = watchSet.getcount("scenes") - 1; 
    }
    
    focusOnClip();
    this.patcher.getnamed("clipSceneGsCssPattr").message(parameter.clipScene.value);
    return parameter.clipScene.value;
}

function isValidClipSceneNumber() {
    if ((parameter.clipScene.value >= 0) || (parameter.clipScene.value < watchSet.getcount("scenes"))) { 
        return true;
    }
    else {
        return false;
    }
}

//                                  ---===timeOfffset accessors===---
function setTimeOffset(aNewOffset){
    if (debugLevel[6]) { post("                               --setTimeOffset--\n"); }
    
    timeOfffset = aNewOffset;
    updateNoteDisplay();

    this.patcher.getnamed("timeOffsetGsCssPattr").message(timeOffset);
}
function getTimeOffset() {
    if (debugLevel[6]) { post("                               --getTimeOffset-\n"); }
    
    return timeOfffset();
}
function changeTimeOffset(amountOfChange) {
    if (debugLevel[6]) { post("                               --changeTimeOffset-\n"); }
    
    if(!amountOfChange) { amountOfChange = parameter.displayWidth.value; }
    else { amountOfChange *= parameter.displayWidth.value; }
    
    timeOffset += amountOfChange;
    
    if (timeOffset < 0) {
        timeOffset = 0;
    }
    else if (timeOffset >= editClip.get("length")) {
        timeOffset = editClip.get("length") - parameter.displayWidth.value;
    }

    this.patcher.getnamed("timeOffsetGsCssPattr").message(timeOffset);
}

//                                  ---===newNoteLength accessors===---

function setNewNoteLength(length) {
    if (length < 0) {
        post("invalid length argument was less than 0");
    }
    else {
        newNoteLength = length;
    }
    sendToHud("noteLength", newNoteLength, 0);
    updateMultiPurposeLeds();

    this.patcher.getnamed("newNoteLengthGsCssPattr").message(newNoteLength);
}

//                                  ---===newNoteVelocity===---

function setNewNoteVelocity(aVelocity) {
    if (debugLevel[6]) { post("                     ---setNewNoteVelocity-\n"); }
    
    if ((0 <= aVelocity) && (aVelocity <= 127)) {
        newNoteVelocity = aVelocity;
        sendToHud("velocity", newNoteVelocity, 0);
    }
    else {
        post("invalid velocity");
    }

    this.patcher.getnamed("newNoteVelocityGsCssPattr").message(newNoteVelocity);
}

//                                  ---===functionMode accessors===---
function setFunctionMode(aMode) {
    if (debugLevel[6]) { post("                               --setFunctionMode--\n"); }
    parameter.functionMode.value = aMode;

    updateControlLeds();

    this.patcher.getnamed("functionModeGsCssPattr").message(parameter.functionMode.value);
}

function getFunctionMode() {
    return parameter.functionMode.value;
}

function decrementFunctionMode() {
    if (debugLevel[6]) { post("                               --decrementFunctionMode--\n"); }
    
    var fN = getFunctionMode();
    
    if (fN > 0) { setFunctionMode(fN - 1); }
}

function incrementFunctionMode() {
    if (debugLevel[6]) { post("                               --incrementFunctionMode--\n"); }
    
    var fN = getFunctionMode();
    
    if (fN < 2) { setFunctionMode(fN + 1); }
}

function toggleFunctionBitButton(whichButton) {
    if (debugLevel[1]) { post("                               --toggleFunctionBitButton--\n"); }

    functionToggle[whichButton] = (functionToggle[whichButton]) ? false : true;
    
    // Little endian
    if ((!functionToggle[0]) && (!functionToggle[1]) ) {
        //00
        setFunctionMode(FunctionMode.moveMode);
    }
    if ((functionToggle[0]) && (!functionToggle[1]) ) {
        //10
        setFunctionMode(FunctionMode.lengthMode);
    }
    if ((!functionToggle[0]) && (functionToggle[1]) ) {
        //01
        setFunctionMode(FunctionMode.velocityMode);
    }
    if ((functionToggle[0]) && (functionToggle[1]) ) {
        //11
        setFunctionMode(FunctionMode.widthMode);
    }
}

//                                  ---===folding accessors===---
function toggleFolding() {
    if (debugLevel[1]) { post("                               --toggleFolding--\n"); }
    
    (getFolding()) ? setFolding(false) : setFolding(true);
}
function setFolding(newFolding) {
    if (debugLevel[6]) { post("                               --setFolding--\n"); }
    
    parameter.folding.value = newFolding;
    updateFunctionModeLeds();
    updateNoteDisplay();
    sendToHud("folding", parameter.folding.value, 0);

    this.patcher.getnamed("foldingGsCssPattr").message(parameter.folding.value);
}
function getFolding() {
    if (debugLevel[6]) { post("                               --getFolding--\n"); }
    return parameter.folding.value;
}
                    
//                                  ---===Callbacks===---
function onNewSlotPlaying(apiArray) {
    if (debugLevel[1]) { post("                               --onNewSlotPlaying--\n"); }
    var playingClipSlot = parseInt(apiArray[1], 10);
    if ((followingPlayingClip) && (playingClipSlot >= 0)) {
        setClipScene(playingClipSlot);
        post("onNewSlotPlaying", playingClipSlot, "\n");
    }
}

function setPlayheadVisible() {
    if (debugLevel[6]) { post("                               --setPlayheadVisible--\n"); }
    if (!thereIsAClipInSlot) { return; }
    
       clipPlaying = watchClipIsPlaying.get("is_playing");
    setPlaying = watchSet.get("is_playing");
   
    if ((setPlaying == 1) && (clipPlaying == 1)) { playheadVisible = true; }
    else { 
        playheadVisible = false;
        refreshMonome();
    }

    if(debugLevel[3]) { 
        post("playheadVisible:", playheadVisible, "\n");
    }

}

function setDisplayWidth(aWidth) {
    if (debugLevel[6]) { post("                               --setDisplayWidth--\n"); }
    parameter.displayWidth.value = aWidth;
    roundDisplayOffset();
    updateNoteDisplay();
    if (parameter.functionMode.value == 2) {
        updateMultiPurposeLeds();
    }

    this.patcher.getnamed("displayWidthGsCssPattr").message(parameter.displayWidth.value);
}

function updatePlayhead(aTimeNumber) {
    if (debugLevel[9]) { post("                               --updatePlayhead--\n"); }
    // View
    if (playheadVisible) {
        var playheadTimeInt = Math.floor((aTimeNumber[1] - timeOffset) * displayRatioToMonome());

        if((playheadTimeInt == -1) || (playheadTimeInt == parameter.monomeWidth.value)) {
            Monome[monomeLastCol()][0].tempOff();            
        }
        else if(playheadTimeInt == 0) {                      
            Monome[playheadTimeInt][0].blink();
        }
        else if((0 < playheadTimeInt) && (playheadTimeInt < parameter.monomeWidth.value)) {
            Monome[playheadTimeInt][0].blink();
            Monome[playheadTimeInt -1][0].tempOff();
        }

        if (playheadTimeInt % 4 == 0) {
            Monome.row(0, "tempOff");
        }
    }
}
updatePlayhead.immediate = 1;


function countMidiTracks() {
    if (debugLevel[1]) { post("                               --countMidiTracks--\n"); }
    trackArray = [];
    trackCount = countAllTracks.getcount("tracks");
    for (var j = 0; j < trackCount; j++) {
        if (indexSet) { indexSet.goto("live_set tracks " + j); }
        else { indexSet = new LiveAPI(this.patcher, null, "live_set tracks " + j ); }
        if (indexSet.get("has_midi_input") == 1 ) {
            trackArray.push(j);                      
        }
    }
    
    var c = trackArray.length;
    if (debugLevel[4]) {
        post("there are ", c, " midi tracks\n");
        post("they are:", trackArray, "\n");
    }
    if (!thereIsAClipInSlot) { focusOnClip(); }
}

function countScenesWithClip() {
    
    // TODO - i can't implement this unless i figure out a way to observe a TRACK for an added clip.
    // or i can observe every slot in the current track, but that won't scale. at all.
    
    if (debugLevel[1]) { post("                               --countScenesWithClip--\n"); }
    sceneArray = [];
    sceneCount = countAllTracks.getcount("scenes");
    for (var k = 0; k < sceneCount; k++) {
        if (indexTrack) { indexTrack.goto("live_set tracks " + trackArray[parameter.trackIndex.value] + "clip_slots" + k); }
        else { indexTrack = new LiveAPI(this.patcher, null, "live_set tracks " + trackArray[parameter.trackIndex.value] + "clip_slots" + k); }
        
        if (indexTrack.get("has_midi_input") == 1 ) {
            sceneCount.push(k);                      
        }
    }
    
    var c = sceneArray.length;
    if (debugLevel[4]) {
        post("there are ", c, " scenes with clips in current track\n");
        post("they are:", sceneArray, "\n");
    }
}

function compareNumbers(a, b) {
    // need this later for Array.sort(compareNumbers)        
    return b - a;
}

function roundDisplayOffset() {
    if (debugLevel[1]) { post("                               --roundDisplayOffset--\n"); }
    if(debugLevel[4]) { post("before round", timeOffset,  "\n"); }
    var a = Math.round(timeOffset / parameter.displayWidth.value);
    timeOffset = a * parameter.displayWidth.value;
    if(debugLevel[3]) {post("after round", timeOffset,                   "\n"); }
}

//                                  ---===Dynamic Time/Column Variables===---
function displayTimeMax() { return parameter.displayWidth.value + timeOffset; }
function colOffset() { return timeOffset * displayRatioToMonome(); }
function displayRatioFromMonome() { return parameter.displayWidth.value / parameter.monomeWidth.value; }
function displayRatioToMonome() { return parameter.monomeWidth.value / parameter.displayWidth.value; }
function monomeLastRow() { return parameter.monomeHeight.value - 1; }
function monomeLastCol() { return parameter.monomeWidth.value - 1; }

function displayRowMax() {
    var currentOffset = (parameter.folding.value) ? parameter.foldingRowOffset.value : rowOffset;
    return monomeLastRow() + currentOffset;
}

//                                  ---===LiveApi Calls===---
function focusOnClip() {
    if (debugLevel[1]) { post("                               --focusOnClip--\n"); }          
    
    if (debugLevel[4]) { post("trackArray[" + parameter.trackIndex.value + "]:", trackArray[parameter.trackIndex.value], "\n"); }

    if (checkForClip) { checkForClip.goto("live_set tracks " + trackArray[parameter.trackIndex.value] + " clip_slots " + parameter.clipScene.value); }
    else { checkForClip = new LiveAPI(this.patcher, null, "live_set tracks " + trackArray[parameter.trackIndex.value] + " clip_slots " + parameter.clipScene.value); }
    
    thereIsAClipInSlot = (checkForClip.get("has_clip") == 1) ? true: false;
    
    if (debugLevel[5]) { post("thereIsAClipInSlot:", thereIsAClipInSlot, "\n"); }

    if (!thereIsAClipInSlot) { return false; }

    if (editClip) { editClip.goto("live_set tracks " + trackArray[parameter.trackIndex.value] + " clip_slots " + parameter.clipScene.value + " clip"); }
    else { editClip = new LiveAPI(this.patcher, null, "live_set tracks " + trackArray[parameter.trackIndex.value] + " clip_slots " + parameter.clipScene.value + " clip"); }
    
    if (watchTrack) { watchTrack.goto("live_set tracks " + trackArray[parameter.trackIndex.value]); }
    else { watchTrack = new LiveAPI(this.patcher, null, "live_set tracks " + trackArray[parameter.trackIndex.value]); }

    if (watchTrackForPlayingClip) { watchTrackForPlayingClip.goto("live_set tracks " + trackArray[parameter.trackIndex.value]); }
    else { watchTrackForPlayingClip = new LiveAPI(this.patcher, onNewSlotPlaying, "live_set tracks " + trackArray[parameter.trackIndex.value]); }
    watchTrackForPlayingClip.mode = 0; // in case the track is moved
//              watchTrackForPlayingClip.property = "playing_slot_index";

    if (watchClipNotes) { watchClipNotes.goto("live_set tracks " + trackArray[parameter.trackIndex.value] + " clip_slots " + parameter.clipScene.value + " clip"); } 
    else { watchClipNotes = new LiveAPI(this.patcher, updateNoteDisplay,  "live_set tracks " + trackArray[parameter.trackIndex.value] + " clip_slots " + parameter.clipScene.value + " clip"); }
    watchClipNotes.mode = 0; // in case the track is moved
    watchClipNotes.property = "notes";

    if (watchClipPlayingStatus) { watchClipPlayingStatus.goto("live_set tracks " + trackArray[parameter.trackIndex.value] + " clip_slots " + parameter.clipScene.value + " clip"); }
    else { watchClipPlayingStatus = new LiveAPI(this.patcher, setPlayheadVisible, "live_set tracks " + trackArray[parameter.trackIndex.value] + " clip_slots " + parameter.clipScene.value + " clip"); }
    watchClipPlayingStatus.mode = 0; // in case the track is moved
    watchClipPlayingStatus.property = "playing_status";

    if (watchClipIsPlaying) { watchClipIsPlaying.goto("live_set tracks " + trackArray[parameter.trackIndex.value] + " clip_slots " + parameter.clipScene.value + " clip"); }
    else { watchClipIsPlaying = new LiveAPI(this.patcher, null,  "live_set tracks " + trackArray[parameter.trackIndex.value] + " clip_slots " + parameter.clipScene.value + " clip"); }
    watchClipIsPlaying.mode = 0; // in case the track is moved

    if (watchClipPlayhead) { watchClipPlayhead.goto("live_set tracks " + trackArray[parameter.trackIndex.value] + " clip_slots " + parameter.clipScene.value + " clip"); }
    else { watchClipPlayhead = new LiveAPI(this.patcher, updatePlayhead,  "live_set tracks " + trackArray[parameter.trackIndex.value] + " clip_slots " + parameter.clipScene.value + " clip"); }
    watchClipPlayhead.mode = 0; // in case the track is moved
    watchClipPlayhead.property = "playing_position";

    setPlayheadVisible();

    if (debugLevel[2]) { post("focused on clip:", watchClipNotes.path, "\n"); }
    return true;
}

function getCurrentPosition() {
    if (debugLevel[1]) { post("                               --getCurrentPosition--\n"); }
    post("watchClipNotes.path = ", watchClipNotes.path, "\n");
    post("clipScene = ", getClipScene(), "\n");
    var currentPathArray = watchClipNotes.path.split(" ");
    // Get current track number
    var currentTrackNumber = parseInt(currentPathArray[2], 10);
    parameter.trackIndex.value = trackArray.indexOf(currentTrackNumber);
    
    // Debugging is Fun!
    if (debugLevel[2]) { post("current track number is:", currentTrackNumber, "\n"); }
    if (debugLevel[4]) { post("trackIndex is:", parameter.trackIndex.value, "\n"); }
    
    // Get current scene number
    var currentSceneNumber = parseInt(currentPathArray[4], 10);
    post("currentSceneNumber = ", currentSceneNumber, "\n");
    if (parameter.clipScene.value != currentSceneNumber) {
        if (debugLevel[3]) { post("clipScene changed from:", parameter.clipScene.value, "to:", currentSceneNumber, "\n"); }
        parameter.clipScene.value = currentSceneNumber;
    }
    sendToHud("track", trackArray[parameter.trackIndex.value] + 1, 0);
    sendToHud("scene", Number(parameter.clipScene.value) + 1, 0);
}

function playCurrentClip() {
    editClip.call("fire");
}


//                                  ---===Check Notes===---
function timeIsDisplayed(timeInQuestion) {
    if (debugLevel[5]) { post("                               --timeIsDisplayed--\n"); }
    if ((timeOffset <= timeInQuestion) && (timeInQuestion < displayTimeMax())) {
        return true;
    }
    else {
        return false;
    }
}

function rowIsDisplayed(rowInQuestion) {
    if (debugLevel[5]) { post("                               --rowIsDisplayed--\n"); }
    var currentOffset = (parameter.folding.value) ? parameter.foldingRowOffset.value : rowOffset;
    if (currentOffset <= rowInQuestion && (rowInQuestion < displayRowMax())) {
        return true;
    }
    else {
        return false;
    }
}

function doesCoincide(nArray, nTone, nTime) {
    if (debugLevel[1]) { post("                               --doesCoincide--\n"); }
    var x, l;
    var a = [];
    for ( x = 0, l = nArray.length; x < l; x++) {
        
        // Debug
        if (debugLevel[4]) {
            post("checked note:", x, "in noteArray\n");
            post("for nTone:", nTone, " and nTime:", nTime, "\n");
        }
        
        if ((nArray[x][1] == nTone) && (nArray[x][2] == nTime)) {
            if (debugLevel[2]) { post("found! note:", x, "in noteArray\n"); }
            a = [true, x];
            return a;
        }
        
        if (debugLevel[4]) {
            post("nope\n");
        }
        
    }
    a = [false];
    return a;
}


//                                  ---===LiveAPI Note Manipulation===---
function getClipNotes() {
    if (debugLevel[1]) { post("                               --getClipNotes--\n"); }
    
    if(!thereIsAClipInSlot) { return; }
    
    if (editClip.get("is_midi_clip") != 1) {
        post("not a midi clip\n");
        post("editClip.get(is_midi_clip):", editClip.get("is_midi_clip"), "\n" );
        return;
    }
    // insert if statement to check if there is a clip
    
    editClip.call("select_all_notes");
    
    clipNotes.length = 0;
    clipNotes = editClip.call("get_selected_notes");
    clipNotes.shift();
    
    numberOfNotesInClip = NaN;
    numberOfNotesInClip = clipNotes.shift();
    
    displayNoteList.length = 0;
    noteArray.length = 0;

    // Debugging!
    if (debugLevel[3] == true) { post("there are:", numberOfNotesInClip, " notes\n"); }
    
    var a, b;
    
    for (a = 0, elementsInNoteList = 0; a < numberOfNotesInClip; a++) {
        var sliceIndexLeft = a * 6;
        var sliceIndexRight = a * 6 + 6;
        noteArray[a] = clipNotes.slice(sliceIndexLeft, sliceIndexRight);
        
        // Folding Logic
        if (!displayNoteList.inArray(noteArray[a][1])) {
            displayNoteList.push(noteArray[a][1]);
            
            // Debug
            if (debugLevel[5]) { post(noteArray[a][1] + " added to displayNoteList \n"); }
        }
        
        if (debugLevel[5]) {
            post( "displayNoteList.inArray(noteArray[" + a + "][1]) = " + displayNoteList.inArray(noteArray[a][1]) + "\n" );
        }
        
        // Debug statements
        if (debugLevel[5]) {
            post(a);
            //if (debugLevel[5]) {
                post("timeNumber is:" + noteArray[a][2], "\n");
                post("durationNumber is:" + noteArray[a][3], "\n");
                post("sliceIndex is:", sliceIndexLeft, "\n");
            //}
            post(noteArray[a], "\n");
        }
    }

    if (debugLevel[4]) { post("displayNoteList before padding =", displayNoteList, '\n'); }
    if (!parameter.folding.value) { fillInNoteRows(); }
    displayNoteList.sort(compareNumbers);
    if (debugLevel[3]) { post("displayNoteList after padding =", displayNoteList, '\n'); }
    clipNotes = editClip.call("deselect_all_notes");
    noteArrayChecked = true;
    
    if (debugLevel[2]) { post("           /getClipNotes\n"); }
}

function publishNoteArray() {
    if (debugLevel[1]) { post("                               --publishNoteArray--\n"); }
    // Model Controller
    var newLength = noteArray.length;
    
    editClip.call("select_all_notes");//CALL
    editClip.call("replace_selected_notes");//CALL
    editClip.call("notes", newLength); //CALL
    
    if (debugLevel[4]) { post("newLength:", newLength, "\n"); }
    if (debugLevel[4]) { post("replace_selected_notes\n"); }
    
    var l, j;
    for (l = noteArray.length , j = 0; j < l; j++) {
        if (debugLevel[4]) { post(j.toLength(2), noteArray[j], "\n"); }
        editClip.call( noteArray[j].noteToLiveAPI() ); //CALL
    }
    
    editClip.call("done");
}

function addNote(addNum, addTime, addVelocity) {
    if (debugLevel[1]) { post("                               --addNote--\n"); }
    // Model Controller
    // simply adds one note no need to get and replace every note.
    
    var tempNoteArray = ["note", addNum, addTime, newNoteLength, addVelocity, 0];
    var newLength = noteArray.length + 1;

    editClip.call("deselect_all_notes"); // CALL
    editClip.call("replace_selected_notes"); // CALL
    if (debugLevel[2]) { post("replace_selected_notes\n"); }
    if (debugLevel[4]) {
        post("tempNoteArray:", tempNoteArray, "\n");
        post("newLength:", newLength, "\n");
        post("notes", 1, "\n");
    }
    editClip.call("notes", 1); // CALL

    editClip.call(tempNoteArray.noteToLiveAPI()); // CALL

    
    if (debugLevel[4]) {
        post(tempNoteArray, "\n");
        post("done\n");
    }
    editClip.call("done"); // CALL
}

function removeNote(indexOfNote) {
    if (debugLevel[1]) { post("                               --removeNote--\n"); }
    var noteRemoved = noteArray.splice(indexOfNote, 1);
    var noteRemovedIndex = indexOfNote;
    if (debugLevel[2]) { post("noteRemoved:" + noteRemoved + "\n"); }
    publishNoteArray();
}

//                                  ---===View Controller Methods===---
function updateMonome() {
    if (debugLevel[1]) { post("                               --updateMonome--\n"); }
    updateNoteDisplay();
    updateFunctionModeLeds();
    updateMultiPurposeLeds();
}

function updateNoteDisplay() {
    if (debugLevel[1]) { post("                               --updateNoteDisplay--\n"); }

    if (mWatchersCreated) {     clearNoteDisplay();
        getClipNotes();
        noteArray.forEach(displayNote);
        updateHud();
    }
}

/* TODO 
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return !(a.indexOf(i) > -1);});
};

*/

function updateHud() {
    sendToHud("track", (trackArray[parameter.trackIndex.value] + 1), 0);
    sendToHud("scene", (Number(parameter.clipScene.value) + 1), 0);
    sendToHud("time", timeOffset / 4, 0);
    sendToHud("width", parameter.displayWidth.value / 4, 0);
    sendToHud("top", (displayNoteList[rowOffset]) ? displayNoteList[rowOffset] : 0, 0 );
    if (thereIsAClipInSlot) { sendToHud("clipLength", (editClip.get("length") /4), 3); }
    sendToHud("scale", currentScaleName, 2);
    sendToHud("noteLength", newNoteLength, 0);
    sendToHud("monomeHeight", parameter.monomeHeight.value, 0);
    sendToHud("monomeWidth", parameter.monomeWidth.value, 0);
    sendToHud("cycles", parameter.cycles.value, 0);
    sendToHud("root", rootNote, 0);
    sendToHud("folding", parameter.folding.value, 0);
    sendToHud("velocity", newNoteVelocity, 0);   
}


function updateFunctionModeLeds() {
    if (debugLevel[1]) { post("                               --updateFunctionModeLeds--\n"); }
    clearFunctionModeLeds();
    
    switch(parameter.functionMode.value) {
        case FunctionMode.moveMode:
            //      00
            break;
            
        case FunctionMode.lengthMode:
            //      10
            Monome[FunctionButton.bit0][monomeLastRow()].ledOn();
            break;
            
        case FunctionMode.velocityMode:
            //      01
            Monome[FunctionButton.bit1][monomeLastRow()].ledOn();
            break;
            
        case FunctionMode.widthMode:
            //      11
            Monome[FunctionButton.bit0][monomeLastRow()].ledOn();
            Monome[FunctionButton.bit1][monomeLastRow()].ledOn();
            break;
        default : {
            post("error in updateFunctionModeLeds functionMode:", parameter.functionMode.value, "\n");
            break;
        }
    }

    if (shiftIsHeld()) {
        Monome[FunctionButton.shift][monomeLastRow()].ledOn();
    }
    if (parameter.folding.value){ Monome[FunctionButton.fold][monomeLastRow()].ledOn(); }
}

function updateMultiPurposeLeds() {
    if (debugLevel[1]) { post("                               --updateMultiPurposeLeds--\n"); }
    
    clearMultiPurposeLeds();
    switch(parameter.functionMode.value) {
        case FunctionMode.moveMode:
            // Arrows
            if (shiftIsHeld()) {
                Monome[FunctionButton.dynamic_0][monomeLastRow()].ledOn();
                Monome[FunctionButton.dynamic_1][monomeLastRow()].ledOn();
                Monome[FunctionButton.dynamic_2][monomeLastRow()].ledOn();
                Monome[FunctionButton.dynamic_3][monomeLastRow()].ledOn();
            }
            break;
        case FunctionMode.widthMode:
        // Display width
            displayDisplayWidthLeds();
            break;
        case FunctionMode.velocityMode:
        // Velocity
            displayVelocityLeds();
            break;
        case FunctionMode.lengthMode:
        // Note Length
            displayLengthLeds();
            break;
        default : {
            post("error in updateMultiPurposeLeds, functionMode:", parameter.functionMode.value, "\n");
            break;
        }
    }
    
}

function updateControlLeds() {
    if (debugLevel[1]) { post("                     ---updateControlLeds-\n"); }
    
    updateFunctionModeLeds();
    updateMultiPurposeLeds();
}



//                                  ---===Display Methods===---
function displayDisplayWidthLeds() {
    if (debugLevel[1]) { post("                               --displayDisplayWidthLeds--\n"); }
    if ((parameter.functionMode.value == FunctionMode.widthMode) && (!extendedWidthOptions)) {
        switch(parameter.displayWidth.value) {
            case DisplayWidthOption._0:
                Monome[FunctionButton.dynamic_0][monomeLastRow()].ledOn();
                break;
            case DisplayWidthOption._1:
                Monome[FunctionButton.dynamic_1][monomeLastRow()].ledOn();
                break;
            case DisplayWidthOption._2:
                Monome[FunctionButton.dynamic_2][monomeLastRow()].ledOn();
                break;
            case DisplayWidthOption._3:
                Monome[FunctionButton.dynamic_3][monomeLastRow()].ledOn();
                break;
            default:
                break;
        }
    }
    else if ((parameter.functionMode.value == FunctionMode.widthMode) && (extendedWidthOptions)) {
        Monome[FunctionButton.shift][monomeLastRow()].ledOn();
        switch(parameter.displayWidth.value) {
            case DisplayWidthOption._4:
                Monome[FunctionButton.dynamic_0][monomeLastRow()].ledOn();
                break;
            case DisplayWidthOption._5:
                Monome[FunctionButton.dynamic_1][monomeLastRow()].ledOn();
                break;
            case DisplayWidthOption._6:
                Monome[FunctionButton.dynamic_2][monomeLastRow()].ledOn();
                break;
            case DisplayWidthOption._7:
                Monome[FunctionButton.dynamic_3][monomeLastRow()].ledOn();
                break;
            default:
                break;
        }
    }
}

function displayLengthLeds() {
    if (debugLevel[1]) { post("                               --displayLengthLeds--\n"); }
        
    if ((parameter.functionMode.value == FunctionMode.lengthMode) && (!extendedLengthOptions)) {
        switch(newNoteLength) {
            case LengthOption._0:
                Monome[FunctionButton.dynamic_0][monomeLastRow()].ledOn();
                break;
            case LengthOption._1:
                Monome[FunctionButton.dynamic_1][monomeLastRow()].ledOn();
                break;
            case LengthOption._2:
                Monome[FunctionButton.dynamic_2][monomeLastRow()].ledOn();
                break;
            case LengthOption._3:
                Monome[FunctionButton.dynamic_3][monomeLastRow()].ledOn();
                break;
            default:
                break;
        }
    }
    else if ((parameter.functionMode.value == FunctionMode.lengthMode) && (extendedLengthOptions)) {
        Monome[FunctionButton.shift][monomeLastRow()].ledOn();
        switch(newNoteLength) {
            case LengthOption._4:
                Monome[FunctionButton.dynamic_0][monomeLastRow()].ledOn();
                break;
            case LengthOption._5:
                Monome[FunctionButton.dynamic_1][monomeLastRow()].ledOn();
                break;
            case LengthOption._6:
                Monome[FunctionButton.dynamic_2][monomeLastRow()].ledOn();
                break;
            case LengthOption._7:
                Monome[FunctionButton.dynamic_3][monomeLastRow()].ledOn();
                break;
            default:
                break;
        }
    }
}

function displayVelocityLeds() {
    if (debugLevel[1]) { post("                               --displayVelocityLeds--\n"); }
        
    if ((parameter.functionMode.value == FunctionMode.velocityMode) && (!extendedVelocityOptions)) {
        switch(newNoteVelocity) {
            case VelocityOption._0:
                Monome[FunctionButton.dynamic_0][monomeLastRow()].ledOn();
                break;
            case VelocityOption._1:
                Monome[FunctionButton.dynamic_1][monomeLastRow()].ledOn();
                break;
            case VelocityOption._2:
                Monome[FunctionButton.dynamic_2][monomeLastRow()].ledOn();
                break;
            case VelocityOption._3:
                Monome[FunctionButton.dynamic_3][monomeLastRow()].ledOn();
                break;
            default:
                break;
        }
    }
    else if ((parameter.functionMode.value == FunctionMode.velocityMode) && (extendedVelocityOptions)) {
        Monome[FunctionButton.shift][monomeLastRow()].ledOn();
        switch(newNoteVelocity) {
            case VelocityOption._4:
                Monome[FunctionButton.dynamic_0][monomeLastRow()].ledOn();
                break;
            case VelocityOption._5:
                Monome[FunctionButton.dynamic_1][monomeLastRow()].ledOn();
                break;
            case VelocityOption._6:
                Monome[FunctionButton.dynamic_2][monomeLastRow()].ledOn();
                break;
            case VelocityOption._7:
                Monome[FunctionButton.dynamic_3][monomeLastRow()].ledOn();
                break;
            default:
                break;
        }
    }
}

function displayNote(aNoteToDisplay) {
    if (debugLevel[5]) { post("                               --displayNote--\n"); }
    // View
    // 1 = a quarter note. 4 equals a measure.
    
    // find ratio to monome and such
    var absoluteTime = aNoteToDisplay[2];
    var colOnMonome = absoluteTime * displayRatioToMonome() - colOffset();
    
    // Formatted Notes for Monome
    var rowIndex = displayNoteList.indexOf(aNoteToDisplay[1]);
    var rowOnMonome = rowIndex - ((parameter.folding.value) ? parameter.foldingRowOffset.value : rowOffset);
    if(debugLevel[4]) {
        post("rowIndex:", rowIndex, "\n");
        post("rowOnMonome:", rowOnMonome, "rowOffset:", rowOffset, "foldingRowOffset", parameter.foldingRowOffset.value, "\n");
        post("colOnMonome:", colOnMonome, "colOffset:", colOffset(), "\n");
    }
    
    if (( timeIsDisplayed(absoluteTime)) && (rowIsDisplayed(rowIndex)) && (colOnMonome % 1 == 0 )) {
        Monome[colOnMonome][rowOnMonome].ledOn();
        
        // Debug Statements
        if (debugLevel[4]) {
            post("col:", colOnMonome, "row:", rowOnMonome, "\n");
            post("absoluteTime is:", absoluteTime, "\n");
            post("colOnMonome is:", colOnMonome, "\n");
        }
    }
    
}


//                                  ---===Clear Methods===---
function clearFunctionModeLeds() {
    if (debugLevel[1]) { post("                               --clearFunctionModeLeds--\n"); }
    
    //TODO Use Min and Max
    for (var o = 4; o <= 7; o++) {
        Monome[o][monomeLastRow()].ledOff();
    }
}

function clearMultiPurposeLeds() {
    if (debugLevel[1]) { post("                               --clearMultiPurposeLeds--\n"); }
    for (var p = 0; p < 4; p++) {
        Monome[p][monomeLastRow()].ledOff();
    }
}

function clearNoteDisplay() {
    if (debugLevel[1]) { post("                               --clearNoteDisplay--\n"); }
    for (var cCol = 0; cCol < parameter.monomeWidth.value; cCol ++) {
        for (var cRow = 0; cRow < monomeLastRow(); cRow++) {
            Monome[cCol][cRow].ledOff();
        }
    }
    if (debugLevel[2]) { post("           /clearNoteDisplay\n"); }
}

//                                  ---===NoteList===---
function fillInNoteRows() {
    if (debugLevel[1]) { post("                               --fillInNoteRows--\n"); }

    var numberNeeded = (parameter.monomeHeight.value - displayNoteList.length);
    for (var m = 0; m < currentScale.length; m++) {
        if (!displayNoteList.inArray(currentScale[m]) ) {
            displayNoteList.push(currentScale[m]);
            if (debugLevel[4]) {
                post("added row for note:", currentScale[m], "\n");
            }
        }
    }
    
    if (debugLevel[2]) {
        post("displayNoteList after fillInNoteRows:", displayNoteList, "\n");
    }
}

//                                  ---===Controller Methods===---
function press(mCol, mRow, upDown) {
    if (debugLevel[1]) { post("                               --press--\n"); }
    
    if (debugLevel[2]) {
        post("press called.\n mCol:", mCol, "mRow", mRow, "upDown", upDown, "\n");
    }
    
    if (upDown == 1) { Monome[mCol][mRow].push(); }
    else if (upDown == 0) { Monome[mCol][mRow].release(); }
    
    
    if (mRow < monomeLastRow()) {
        var newNoteTime = ( mCol + colOffset() ) * displayRatioFromMonome();
        var newNoteNote = displayNoteList[mRow + ((parameter.folding.value) ? parameter.foldingRowOffset.value:rowOffset)];

        // Debugging is fun!
        if (debugLevel[2]) {
            post("newNoteTime:", newNoteTime, " newNoteNote:", newNoteNote, "\n");
        }
    
        if (upDown == 1) {
            // check for note in array
            var isAlreadyInNoteArray = doesCoincide(noteArray, newNoteNote, newNoteTime);
    
            if (isAlreadyInNoteArray[0]) {
                    removeNote(isAlreadyInNoteArray[1]);
            }
        
            else if (!isAlreadyInNoteArray[0]) {
                    addNote(newNoteNote, newNoteTime, newNoteVelocity);
            }
        }
        sendToHud("latest", newNoteNote, 0);
    }
    // Arrow keys
    else if ((mRow == monomeLastRow()) && (upDown == 1) && (mCol >= 0) && (mCol <= 3)) {

        switch (parameter.functionMode.value) {
            case FunctionMode.moveMode:
                if (shiftIsHeld()) { liveSetArrows(mCol); }
                else { clipArrows(mCol); }
                break;
            case FunctionMode.lengthMode:
                lengthButtons(mCol);
                break;
            case FunctionMode.velocityMode:
                velocityButtons(mCol);
                break;
            case FunctionMode.widthMode:
                widthButtons(mCol);
                break;
            default : {
                post("error in press, functionMode:", parameter.functionMode.value, "\n");
                break;
            }
        }
    }

    else if ((mRow == monomeLastRow()) && (mCol >= 4) && (mCol <= 7)) {
        // Change arrow mode
        switch (mCol) {
            case FunctionButton.shift: {
    
                switch(parameter.functionMode.value) {    
                    case FunctionMode.moveMode: {
                        updateControlLeds();
                        break;
                    }
                    case FunctionMode.lengthMode: {
                        showLengthOptions(upDown);
                        break;
                    }
                    case FunctionMode.velocityMode: {
                        showVelocityOptions(upDown);
                        break;
                    }                        
                    case FunctionMode.widthMode: {
                        showWidthOptions(upDown);
                        break;
                    }

                    default: {
                        post("error in FunctionButton.shift. functionMode:", parameter.functionMode.value, "\n");
                        post("mCol:", mCol, "\n");
                        break;
                    }
                }
            break;
            }
            

            case FunctionButton.bit0: {
                // 0X
                if (upDown == 1) { toggleFunctionBitButton(0); }
                break;
            }

            case FunctionButton.bit1: {
               // X0
                if (upDown == 1) { toggleFunctionBitButton(1); }
                break;
            }

            case FunctionButton.fold: {
                if (upDown == 1) { toggleFolding(); }
                break;
            }
            default: {
                post("error in press. functionMode:", parameter.functionMode.value, "\n");
                post("mCol:", mCol, "\n");
                break;
            }
        }
    }
}

function shiftIsHeld() {
    if (debugLevel[1]) { post("                     --shiftIsHeld--\n"); }

    if (Monome[FunctionButton.shift][monomeLastRow()].isHeld == 1) {
        return true;
    }
    else { return false; }
}

function widthButtons(aButtonPressed) {
    if (debugLevel[1]) { post("                               --widthButtons--\n"); }
    
    if (!extendedWidthOptions) {
        switch (aButtonPressed) {
        
            case FunctionButton.dynamic_0:
                setDisplayWidth(1);
                break;
            case FunctionButton.dynamic_1:
                setDisplayWidth(2);
                break;
            case FunctionButton.dynamic_2:
                setDisplayWidth(4);
                break;
            case FunctionButton.dynamic_3:
                setDisplayWidth(8);
                break;
            default: {
                post("error in widthButtons(no extendedWidthOptions). buttonPressed:", aButtonPressed, "\n");
                break;
            }
        }
    }
    else if (extendedWidthOptions) {
        switch (aButtonPressed) {
        
            case FunctionButton.dynamic_0:
                setDisplayWidth(16);
                break;
            case FunctionButton.dynamic_1:
                setDisplayWidth(32);
                break;
            case FunctionButton.dynamic_2:
                setDisplayWidth(64);
                break;
            case FunctionButton.dynamic_3:
                setDisplayWidth(128);
                break;
            default: {
                post("error in widthButtons(with extendedWidthOptions). buttonPressed:", aButtonPressed, "\n");
                break;
            }
        }
    }
    if (debugLevel[4]) { post("dWidth = ", parameter.displayWidth.value, "\n"); }
}
function lengthButtons(aButtonPressed) {
    if (debugLevel[1]) { post("                               --lengthButtons--\n"); }
    
    if (!extendedLengthOptions) {
        switch (aButtonPressed) {
        
            case FunctionButton.dynamic_0:
                setNewNoteLength(LengthOption._0);
                break;
            case FunctionButton.dynamic_1:
                setNewNoteLength(LengthOption._1);
                break;
            case FunctionButton.dynamic_2:
                setNewNoteLength(LengthOption._2);
                break;
            case FunctionButton.dynamic_3:
                setNewNoteLength(LengthOption._3);
                break;
            default: {
                post("error in lengthButtons(no extendedLengthOptions). buttonPressed:", aButtonPressed, "\n");
                break;
            }
        }
    }
    else if (extendedLengthOptions) {
        switch (aButtonPressed) {
        
            case FunctionButton.dynamic_0:
                setNewNoteLength(LengthOption._4);
                break;
            case FunctionButton.dynamic_1:
                setNewNoteLength(LengthOption._5);
                break;
            case FunctionButton.dynamic_2:
                setNewNoteLength(LengthOption._6);
                break;
            case FunctionButton.dynamic_3:
                setNewNoteLength(LengthOption._7);
                break;
            default: {
                post("error in lengthButtons(with extendedLengthOptions). buttonPressed:", aButtonPressed, "\n");
                break;
            }
        }
    }
    if (debugLevel[4]) { post("new notes will be created with length:", newNoteLength, "\n"); }
}

function velocityButtons(aButtonPressed) {
    if (debugLevel[1]) { post("                               --velocityButtons--\n"); }
    
    if (!extendedVelocityOptions) {
        switch (aButtonPressed) {
        
            case FunctionButton.dynamic_0:
                setNewNoteVelocity(VelocityOption._0);
                break;
            case FunctionButton.dynamic_1:
                setNewNoteVelocity(VelocityOption._1);
                break;
            case FunctionButton.dynamic_2:
                setNewNoteVelocity(VelocityOption._2);
                break;
            case 3:
                setNewNoteVelocity(VelocityOption._3);
                break;
            default: {
                post("error in velocityButtons(no extendedVelocityOptions). buttonPressed:", aButtonPressed, "\n");
                break;
            }
        }
    }
    else if (extendedVelocityOptions) {
        switch (aButtonPressed) {
        
            case FunctionButton.dynamic_0:
                setNewNoteVelocity(VelocityOption._4);
                break;
            case FunctionButton.dynamic_1:
                setNewNoteVelocity(VelocityOption._5);
                break;
            case FunctionButton.dynamic_2:
                setNewNoteVelocity(VelocityOption._6);
                break;
            case FunctionButton.dynamic_3:
                setNewNoteVelocity(VelocityOption._7);
                break;
            default: {
                post("error in velocityButtons(with extendedVelocityOptions). buttonPressed:", aButtonPressed, "\n");
                break;
            }
        }
    }
    
    updateMultiPurposeLeds();

    if (debugLevel[4]) { post("new notes will be created with velocity:", newNoteVelocity, "\n"); }
}

function toggleWidthDisplayOptions() {
    if (debugLevel[1]) { post("                               --toggleWidthDisplayOptions--\n"); }
    
    extendedWidthOptions = (extendedWidthOptions) ? false : true;
    updateControlLeds();
    
    if(debugLevel[2]) { post("extendedWidthOptions:", extendedWidthOptions, "\n"); }
}
function toggleLengthOptions() {
    if (debugLevel[1]) { post("                               --toggleLengthOptions--\n"); }
    
    extendedLengthOptions = (extendedLengthOptions) ? false : true;
    updateControlLeds();
    
    if(debugLevel[3]) { post("extendedWidthOptions:", extendedWidthOptions, "\n"); }
}

function toggleVelocityOptions() {
    if (debugLevel[1]) { post("                               --toggleVelocityOptions--\n"); }
    
    extendedVelocityOptions = (extendedVelocityOptions) ? false : true;
    updateControlLeds();
    
    if(debugLevel[3]) { post("extendedVelocityOptions:", extendedVelocityOptions, "\n"); }
}

function showVelocityOptions(aWhichOptions) {
    if (debugLevel[1]) { post("                               --showVelocityOptions--\n"); }
    
    extendedVelocityOptions = (!!aWhichOptions) ? true : false;
    updateControlLeds();
    
    if(debugLevel[3]) { post("extendedVelocityOptions:", extendedVelocityOptions, "\n"); }
}

function showWidthOptions(aWhichOptions) {
    if (debugLevel[1]) { post("                               --showWidthOptions--\n"); }
    
    extendedWidthOptions = (!!aWhichOptions) ? true : false;
    updateControlLeds();
    
    if(debugLevel[3]) { post("extendedWidthOptions:", extendedWidthOptions, "\n"); }
}

function showLengthOptions(aWhichOptions) {
    if (debugLevel[1]) { post("                               --showLengthOptions--\n"); }
    
    extendedLengthOptions = (!!aWhichOptions) ? true : false;
    updateControlLeds();
    
    if(debugLevel[3]) { post("extendedLengthOptions:", extendedLengthOptions, "\n"); }
}

function toggleFollowingPlayingClip() {
    if (debugLevel[1]) { post("                               --toggleFollowingPlayingClip--\n"); }
    followingPlayingClip = (followingPlayingClip == true) ? false : true;
    updateFunctionModeLeds();
    getPlayingSlotNumber();
    sendToHud("following", followingPlayingClip, 0);
}
function getPlayingSlotNumber() {
    if (debugLevel[1]) { post("--getPlayingSlotNumber--\n"); }
    var pc = parseInt(watchTrack.get("playing_slot_index"), 10);
    if (pc >= 0) {
        setClipScene(pc);
    }
    else {
        //playCurrentClip();
    }
}

//                                  ---===Clip Navigation===---
function clipArrows(aWhichArrow) {
    if (debugLevel[1]) { post("                               --clipArrows--\n"); }
    switch (aWhichArrow) {
        
        case FunctionButton.dynamic_0:
            upInClip();
            break;
            
        case FunctionButton.dynamic_1:
            downInClip();
            break;
        
        case FunctionButton.dynamic_2:
            leftInClip();
            break;
        
        case FunctionButton.dynamic_3:
            rightInClip();
            break;
        default: {
            post("error in clipArrows. whichArrow:", aWhichArrow, "\n");
            break;
        }
    }
    // Future Delete this
    updateNoteDisplay();
}

function leftInClip(aHowMuch) {
    if (debugLevel[1]) { post("                               --leftInClip--\n"); }
    
    if(!aHowMuch) { aHowMuch = 1; }
    
    if (debugLevel[4]) { post("timeOffset before leftInClip:", timeOffset, "\n"); }
    changeTimeOffset(-aHowMuch);
    if (debugLevel[3]) { post("timeOffset after leftInClip:", timeOffset, "\n"); }
    
}


function rightInClip(aHowMuch) {
    if (debugLevel[1]) { post("                               --rightInClip--\n"); }
    
    if(!aHowMuch) { aHowMuch = 1; }
    
    if (debugLevel[4]) { post("timeOffset before rightInClip:", timeOffset, "\n"); }
    changeTimeOffset(aHowMuch);
    if (debugLevel[2]) { post("timeOffset after rightInClip:", timeOffset, "\n"); }
}
function upInClip(aHowMuch) {
    if (debugLevel[1]) { post("                               --upInClip--\n"); }
    
    if(!aHowMuch) { aHowMuch = 1; }
    if (debugLevel[4]) { post("offsetHolder before upInClip:", getRowOffset(), "\n"); }
    changeRowOffset(-aHowMuch);
    if (debugLevel[3]) { post("offsetHolder after upInClip:", getRowOffset(), "\n"); }

}
function downInClip(aHowMuch) {
    if (debugLevel[1]) { post("                               --downInClip--\n"); }
    
    if(!aHowMuch) { aHowMuch = 1; }
    if (debugLevel[4]) { post("offsetHolder before downInClip:", getRowOffset(), "\n"); }
    changeRowOffset(aHowMuch);
    if (debugLevel[3]) { post("offsetHolder after downInClip:", getRowOffset(), "\n"); }

}

//                                  ---===Set Navigation===---
function liveSetArrows(aWhichArrow) {
    if (debugLevel[1]) { post("                               --liveSetArrows--\n"); }
    switch (aWhichArrow) {
        
        case FunctionButton.dynamic_0: {
            if (debugLevel[2]) { post("upInSet\n"); }
            upInSet();
            break;
        }
            
        case FunctionButton.dynamic_1: {
            if (debugLevel[2]) { post("downInSet\n"); }
            downInSet();
            break;
        }
        case FunctionButton.dynamic_2: {
            if (debugLevel[2]) { post("leftInSet\n"); }
            leftInSet();
            break;
        }
        case FunctionButton.dynamic_3: {
            if (debugLevel[2]) { post("rightInSet\n"); }
            rightInSet();
            break;
        }
        default: {
            post("error in liveSetArrows. whichArrow:", aWhichArrow, "\n");
            break;
        }
    }
    updateNoteDisplay();
}

function upInSet(aHowMuch) {
    if (debugLevel[1]) { post("                               --upInSet--\n"); }
    if(!aHowMuch) { aHowMuch = 1; }

    if (debugLevel[3]) { post("clipScene before upInSet:", getClipScene(), "\n"); }
    
    changeClipScene(-aHowMuch);
    if (debugLevel[2]) { post("clipScene after upInSet:", parameter.clipScene.value, "\n"); }
}

function downInSet(aHowMuch) {
    if (debugLevel[1]) { post("                               --downInSet--\n"); }
    
    if(!aHowMuch) { aHowMuch = 1; }
    if (debugLevel[2]) { post("clipScene before downInSet:", getClipScene(), "\n"); }

    changeClipScene(aHowMuch);

    if (debugLevel[2]) { post("clipScene after downInSet:", parameter.clipScene.value, "\n"); }
}

function rightInSet(aHowMuch) {
    if (debugLevel[1]) { post("                               --rightInSet--\n"); }
    
    if(!aHowMuch) { aHowMuch = 1; }
    if (debugLevel[4]) {
        post("trackIndex before rightInSet:", getTrackIndex(), "\n");
    }
    if (debugLevel[4]) {    post("track before rightInSet:", trackArray[parameter.trackIndex.value], "\n"); }
    
    changeTrackIndex(aHowMuch);
    focusOnClip();
    
    if (debugLevel[3]) { post("trackIndex after rightInSet:", parameter.trackIndex.value, "\n"); }
    if (debugLevel[4]) {    post("track after rightInSet:", trackArray[parameter.trackIndex.value], "\n"); }
}
function leftInSet(aHowMuch) {
    if (debugLevel[1]) { post("                               --leftInSet--\n"); }
    if(!aHowMuch) { aHowMuch = 1; }
    if (debugLevel[4]) {
        post("trackIndex before leftInSet:", getTrackIndex(), "\n");
    }
    if (debugLevel[4]) {    post("track before leftInSet:", trackArray[parameter.trackIndex.value], "\n"); }

    changeTrackIndex(-aHowMuch);
    focusOnClip();

    if (debugLevel[3]) { post("trackIndex after leftInSet:", parameter.trackIndex.value, "\n"); }
    if (debugLevel[4]) {    post("track after leftInSet:", trackArray[parameter.trackIndex.value], "\n"); }
}

//                                  ---===Communicate with Patcher===---
function sendToHud(key, value, format) {
    if (debugLevel[1]) { post("                               --sendToHud - " + key + " : " + value + " --\n"); }
    if (debugLevel[5]) { post("key:", key, "value:", value, "\n"); }
    
    switch (format) {
        case 0:
            outlet(1, key, "set", value);
            break;
        case 1:
            outlet(1, key, value);
            break;
        case 2:
            outlet(1, key, "setsymbol", value);
            break;
        case 3:
            outlet(1, key, "set", value, (value == 1) ? "measure" : "measures");
            break;
        default: {
            post("error in sendToHud. format:", format, "\n");
            break;
        }
    }
}

//                                  ---===Monome Device Methods===---
function setMonomeWidth(aWidth) {
    if (debugLevel[6]) { post("                               --setMonomeWidth--\n"); }
    parameter.monomeWidth.value = aWidth;
    sendToHud("monomeWidth", parameter.monomeWidth.value, 0);

    if(debugLevel[2]) { post("monomeWidth:", parameter.monomeWidth.value, "\n"); }

    this.patcher.getnamed("monomeWidthGsCssPattr").message(parameter.monomeWidth.value);
}
function setMonomeHeight(aHeight) {
    if (debugLevel[6]) { post("                               --setMonomeHeight--\n"); }
    parameter.monomeHeight.value = aHeight;
    sendToHud("monomeHeight", parameter.monomeHeight.value, 0);
    
    if(debugLevel[2]) { post("monomeHeight:", parameter.monomeHeight.value, "\n"); }

    this.patcher.getnamed("monomeHeightGsCssPattr").message(parameter.monomeHeight.value);
}
function SingleCell(aCol, aRow, aOutlet) {
    this.outlet = aOutlet;

    this.col = aCol;
    this.row = aRow;
    
    // local variables
    this.actualState = 0;
    this.tempState =  0;
    this.isHeld = 0;

    this.checkHeld = function() {
        return this.isHeld;
    };

    this.push = function() {
        this.isHeld = 1;
        return this.isHeld;
    };

    this.release = function() {
        this.isHeld = 0;
        return this.isHeld;
    };

    this.ledOn = function() {
        this.actualState = 1;
        outlet(this.outlet, this.col, this.row, this.actualState);
    };

    this.ledOff = function() {
        this.actualState = 0;
        outlet(this.outlet, this.col, this.row, this.actualState);
    };

    this.checkActual = function() {
        outlet(this.outlet, this.col, this.row, this.actualState);
        this.tempState = 0;
    };

    this.blink = function() {
        this.tempState = (this.tempState == 1) ? 0:1;
        outlet(this.outlet, this.col, this.row, this.tempState);
    };

    this.blinkIfOff = function() {
        if (this.actualState == 0) {
            this.tempState = (this.tempState == 1) ? 0:1;
            outlet(this.outlet, this.col, this.row, this.tempState);
        }
    };

    this.tempOn = function() {
        this.tempState = 1;
        outlet(this.outlet, this.col, this.row, this.tempState);
    };

    this.tempOff = function() {
        this.tempState = 0;
        outlet(this.outlet, this.col, this.row, this.actualState);
    };
}

function buildMonome() {    
    if (debugLevel[1]) { post("                               --buildMonome--\n"); }
    if (debugLevel[2]) { post("buildMonome called\n"); }
    if (debugLevel[4]) {
        post("monomeWidth:", parameter.monomeWidth.value, "\n");
        post("monomeHeight:", parameter.monomeHeight.value, "\n");
    }
    
    for (var iCol = 0; iCol < parameter.monomeWidth.value; iCol++) {
        Monome[iCol] = new Array();
        for (var iRow = 0; iRow < parameter.monomeHeight.value; iRow++) {
            Monome[iCol][iRow] = new SingleCell(iCol , iRow, 0);
        }
        if (debugLevel[4]) { post("Monome[", iCol, "].length:", Monome[iCol].length, "\n"); }
    }
    if (debugLevel[4]) { post("Monome.length (width):", Monome.length, "\n"); }
}

Monome.row = function(aRow, aMethodToInvoke) {
        switch (aMethodToInvoke) {
            case "ledOn":
                var iColumn;
                for (iColumn = 0; iColumn < parameter.monomeWidth.value; iColumn++) {
                    Monome[iColumn][aRow].ledOn();
                }
                break;
            case "ledOff":
                for (iColumn = 0; iColumn < parameter.monomeWidth.value; iColumn++) {
                    Monome[iColumn][aRow].ledOff();
                }
                break;
            case "tempOn":
                for (iColumn = 0; iColumn < parameter.monomeWidth.value; iColumn++) {
                    Monome[iColumn][aRow].tempOn();
                }
                break;
            case "tempOff":
                for (iColumn = 0; iColumn < parameter.monomeWidth.value; iColumn++) {
                    Monome[iColumn][aRow].tempOff();
                }
                break;
            case "blink":
                for (iColumn = 0; iColumn < parameter.monomeWidth.value; iColumn++) {
                    Monome[iColumn][aRow].blink();
                }
                break;
            case "blinkIfOff":
                for (iColumn = 0; iColumn < parameter.monomeWidth.value; iColumn++) {
                    Monome[iColumn][aRow].blinkIfOff();
                }
                break;
            default : {
                break;
            }
        }
};

Monome.column = function(aColumn, aMethodToInvoke) {
        switch (aMethodToInvoke) {
            case "ledOn":
                var iRow;
                for (iRow = 0; iRow < parameter.monomeHeight.value; iRow++) {
                    Monome[aColumn][iRow].ledOn();
                }
                break;
            case "ledOff":
                for (iRow = 0; iRow < parameter.monomeHeight.value; iRow++) {
                    Monome[aColumn][iRow].ledOff();
                }
                break;
            case "tempOn":
                for (iRow = 0; iRow < parameter.monomeHeight.value; iRow++) {
                    Monome[aColumn][iRow].tempOn();
                }
                break;
            case "tempOff":
                for (iRow = 0; iRow < parameter.monomeHeight.value; iRow++) {
                    Monome[aColumn][iRow].tempOff();
                }
                break;
            case "blink":
                for (iRow = 0; iRow < parameter.monomeHeight.value; iRow++) {
                    Monome[aColumn][iRow].blink();
                }
                break;
            case "blinkIfOff":
                for (iRow = 0; iRow < parameter.monomeHeight.value; iRow++) {
                    Monome[aColumn][iRow].blinkIfOff();
                }
                break;
            default : {
                break;
            }
        }
};

function refreshMonome() {
    if (debugLevel[1]) { post("                               --refreshMonome--\n"); }
    var iCol;
    var iRow;
    for (iCol = 0; iCol < parameter.monomeWidth.value; iCol++) {
        for (iRow = 0; iRow < parameter.monomeHeight.value; iRow++) {
            Monome[iCol][iRow].checkActual();
        }
    }
}

//                                  ---===cycles accessors===---
function setCycles(aNewCycleCount) {
    if (debugLevel[6]) { post("                               --setCycles--\n"); }
    
    if (0 < aNewCycleCount) {
        parameter.cycles.value = aNewCycleCount;
        sendToHud("cycles", parameter.cycles.value, 0);
        onScaleVariableChange();
    }
    else { post("invalid cycle count"); }

    this.patcher.getnamed("cyclesGsCssPattr").message(parameter.cycles.value);
}

//                                  ---===rootNote accessors===---
function setRootNote(aNewRoot) {
    if (debugLevel[6]) { post("                               --setRootNote--\n"); }

    if (isValidCCNumber(aNewRoot)) {
        rootNote = aNewRoot;
        sendToHud("root", rootNote, 0);
        onScaleVariableChange();
    }
    else { post("invalid root note"); }
    this.patcher.getnamed("rootNoteGsCssPattr").message(rootNote);
}

//                                  ---===onScaleVariableChange===---
function onScaleVariableChange () {
    if (debugLevel[6]) { post("                               --onScaleVariableChange--\n"); }

    if (debugLevel[5]) { post("my name is:", currentScaleName, "\n"); }

    if(currentScaleName != "Drums") {
        setCurrentScaleWithSymbol(currentScaleName);
    }
}
//                                  ---===Scale Methods===---

function generateFullScaleList(scaleArray, localRootNote, localCycles) {
    if (debugLevel[1]) { post("                               --generateFullScaleList--\n"); }
    
    if (debugLevel[5]) { post("scaleArray:", scaleArray, "\n"); }     

    var scaleMap = scaleArray.slice(0); //because i will manipulate this array
    var distanceToSecondRoot = scaleMap.pop(); // the last note is only needed for distance calculation
    if (debugLevel[5]) { post("distanceToSecondRoot:", distanceToSecondRoot, "\n");       }
    
    
    var scaleLength = scaleMap.length;
    if (debugLevel[3]) { post("scaleLength:", scaleLength, "\n"); }
    
    var numberOfNotesInScale = scaleLength * localCycles + 1; //root on top
    if(debugLevel[4]) { post("numberOfNotesInScale:", numberOfNotesInScale, "\n"); }
    //i assume the scale starts at 0.
    // the distance to the root is needed more than 0
    scaleMap[0] = distanceToSecondRoot; 

    if (debugLevel[5]) { post("scaleMap:", scaleMap, "\n"); }
    
    var scaleNoteList = new Array();
    
    scaleNoteList.push(parseInt(localRootNote, 10));
    if (debugLevel[5]) { post("root", localRootNote, "\n"); }
    
    for (var n = 1; n < numberOfNotesInScale; n++) {
        var noteNumberInQuestion = scaleNoteList[(n - 1)] + scaleMap[(n % scaleLength)];
        
        if (debugLevel[5]) { post("noteNumberInQuestion:", noteNumberInQuestion, "\n"); }
        
        if (isValidCCNumber(noteNumberInQuestion)) { 
            scaleNoteList.push(noteNumberInQuestion);
            
            if (debugLevel[5]) { 
                post("n", n);
                if (n % scaleLength == 0) {
                    post("root", noteNumberInQuestion, "\n");
                }
                else {
                    post(noteNumberInQuestion, "\n");
                }
            }
            
        }
    }
    if(debugLevel[4]) { post("scaleNoteList:" + scaleNoteList, "\n"); }
    return scaleNoteList;
}

function setCurrentScale(scaleToUse, scaleName) {
    if (debugLevel[6]) { post("                     --setCurrentScale--\n"); }
    
    if (currentScale != scaleToUse) {
        currentScale = scaleToUse;
        setCurrentScaleName(scaleName);
        updateNoteDisplay();
    }
}

function setCurrentScaleName(aNewName) {
    if (debugLevel[6]) { post("                     ---setCurrentScaleName-\n"); }
    currentScaleName = aNewName;
    this.patcher.getnamed("currentScaleNameGsCssPattr").message(currentScaleName);
}

function setCurrentScaleFromMap(mapToUse) {
    setCurrentScale(generateFullScaleList(mapToUse, 48, 4) );
}

function isValidCCNumber (numberInQuestion) {
    if ((0 <= numberInQuestion) && (numberInQuestion <= 127) && (numberInQuestion % 1 == 0)) {
        return true;
    }
    else { return false;}
}

function setCurrentScaleWithSymbol(symbolFromPatcher) {
    if (debugLevel[1]) { post("                               --setCurrentScaleWithSymbol--\n"); }
    if (debugLevel[4]) { post("           symbolFromPatcher:", symbolFromPatcher, "\n"); }
    if (!thereIsAClipInSlot) { return; }
    
    switch (symbolFromPatcher) {
    
        case majorScale.name:
            setCurrentScale(generateFullScaleList(majorScale, rootNote, parameter.cycles.value), majorScale.name);
            break;
            
        case "NaturalMinor":
            setCurrentScale(generateFullScaleList(naturalMinorScale, rootNote, parameter.cycles.value), symbolFromPatcher);
            break;
            
        case "HarmonicMinor":
            setCurrentScale(generateFullScaleList(harmonicMinorScale, rootNote, parameter.cycles.value), symbolFromPatcher);
            break;
            
        case "Drums":
            setCurrentScale(defaultDrumScale, symbolFromPatcher);
            break;
            
        case "Chromatic":
            setCurrentScale(generateFullScaleList(chromaticScale, rootNote, parameter.cycles.value), symbolFromPatcher);
            break;
            
        case "MinorPentatonic":
            setCurrentScale(generateFullScaleList(minorPentatonicScale, rootNote, parameter.cycles.value), symbolFromPatcher);
            break;
            
        case "MajorPentatonic":
            setCurrentScale(generateFullScaleList(majorPentatonicScale, rootNote, parameter.cycles.value), symbolFromPatcher);
            break;
            
        case "BluesPentatonic":
            setCurrentScale(generateFullScaleList(bluesPentatonicScale, rootNote, parameter.cycles.value), symbolFromPatcher);
            break;
            
        case "Ionian":
            setCurrentScale(generateFullScaleList(ionianMode, rootNote, parameter.cycles.value), symbolFromPatcher);
            break;
            
        case "Dorian":
            setCurrentScale(generateFullScaleList(dorianMode, rootNote, parameter.cycles.value), symbolFromPatcher);
            break;
            
        case "Phrygian":
            setCurrentScale(generateFullScaleList(phrygianMode, rootNote, parameter.cycles.value), symbolFromPatcher);
            break;
            
        case "Lydian":
            setCurrentScale(generateFullScaleList(lydianMode, rootNote, parameter.cycles.value), symbolFromPatcher);
            break;
            
        case "Mixolydian":
            setCurrentScale(generateFullScaleList(mixolydianMode, rootNote, parameter.cycles.value), symbolFromPatcher);
            break;
            
        case "Aeolian":
            setCurrentScale(generateFullScaleList(aeolianMode, rootNote, parameter.cycles.value), symbolFromPatcher);
            break;
            
        case "Locrian":
            setCurrentScale(generateFullScaleList(locrianMode, rootNote, parameter.cycles.value), symbolFromPatcher);
            break;
            
        case "WholeTone":
            setCurrentScale(generateFullScaleList(wholeToneScale, rootNote, parameter.cycles.value), symbolFromPatcher);
            break;
            
        case "WholeHalfDiminished":
            setCurrentScale(generateFullScaleList(wholeHalfdiminishedScale, rootNote, parameter.cycles.value), symbolFromPatcher);
            break;
            
        case "HalfWholeDiminished":
            setCurrentScale(generateFullScaleList(halfWholeDiminishedScale, rootNote, parameter.cycles.value), symbolFromPatcher);
            break;
            
        case "SymmetricalAugmented":
            setCurrentScale(generateFullScaleList(symmetricalAugmentedScale, rootNote, parameter.cycles.value), symbolFromPatcher);
            break;
            
        case "Tritone":
            setCurrentScale(generateFullScaleList(tritoneScale, rootNote, parameter.cycles.value), symbolFromPatcher);
            break;

        case "MajorQuartal":
            setCurrentScale(generateFullScaleList(majorQuartalScale, rootNote, parameter.cycles.value), symbolFromPatcher);
            break;
            
        case "MinorQuartal":
            setCurrentScale(generateFullScaleList(minorQuartalScale, rootNote, parameter.cycles.value), symbolFromPatcher);
            break;
            
        default:
            updateNoteDisplay();
            break;
    }
    if (debugLevel[4]) { post("symbolFromPatcher at end:", symbolFromPatcher, "\n"); }
}

function setInSuite(aNewValue) {
    if (aNewValue == 0) { parameter.inSuite.value = false; }
    else { parameter.inSuite.value = true; }
}

function setParameterProperty(aPropertyString, aValue) {

    var lValue;

    post("aValue:", aValue, "\n");
    if ((aValue >= parameter[aPropertyString].minValue) && (aValue <= parameter[aPropertyString].maxValue)) { lValue = aValue; }
    else if (aValue < parameter[aPropertyString].minValue) { lValue = parameter[aPropertyString].minValue; }
    else if (aValue > parameter[aPropertyString].maxValue) { lValue = parameter[aPropertyString].maxValue; }
    else { post("something has gane awry in setParameterProperty!\n"); }

    parameter[aPropertyString].value = lValue;

    sendToHud(parameter[aPropertyString].name, parameter[aPropertyString].value, 0);
    
	if (parameter[aPropertyString].saveInPattr) {
	    var patcherObjectNameString = parameter[aPropertyString].name + parameter.patchString + "Pattr";
    	this.patcher.getnamed(patcherObjectNameString).message("set", parameter[aPropertyString].value);
	}
}

function changeParameterProperty(aPropertyString, aAmount) {
    var lValue = parameter[aPropertyString].value + aAmount;
    setParameterProperty(aPropertyString, lValue);    
}

function toggleParameterProperty(aPropertyString) {
    var lValue = Number(!Boolean(parameter[aPropertyString].value));
    setParameterProperty(aPropertyString, lValue);
}

function grabPattrValue(aProperty) {
    if (debugItem.functionName) {
        post("                     --grabPattrValue--\n");
    }
    if (debugItem.startValue) { post(aProperty.name + ".value:", aProperty.value, "\n"); }
    
    var lPatcherObjectNameString = aProperty.name + parameter.patchString + "Pattr";
    
    if (debugItem.localValue) { post("lPatcherObjectNameString:", lPatcherObjectNameString, "\n"); }
    
    var lValue;
    
    switch (aProperty.type) {
        case "number" : 
            /*jsl:fallthru*/
        case "toggle" :
            lValue = Number(this.patcher.getnamed(lPatcherObjectNameString).getvalueof());
            break;
        case "string" :
            lValue = String(this.patcher.getnamed(lPatcherObjectNameString).getvalueof());
            break;
    }
    
    if (debugItem.localValue) { post("lValue from " + lPatcherObjectNameString + ":", lValue, "\n"); }
    
    aProperty.value = lValue;
    sendToHud(aProperty.name, aProperty.value, 0);
    
    if (debugItem.endValue) { post(aProperty.name + ".value:", aProperty.value, "\n"); }
}

function store(aNumber) {
    this.patcher.getnamed("gsClipStep-presetStore").message("store", aNumber);
}

function recall(aNumber) {
    this.patcher.getnamed("gsClipStep-presetStore").message(aNumber);
    grabAllPattrValues();
    focusOnClip();
    updateMonome();
    updateHud();
}



function freebang() {
    if (debugLevel[1]) { post("                               --freebang--\n"); }
    updatePattrs();
    if (debugLevel[5]) { postPattrs("end"); }
    if (watchSet) { watchSet = null; }
    if (countAllTracks) { countAllTracks = null; }
    if (watchSetTracks) { watchSetTracks = null; }
    if (watchSetPlaying) { watchSetPlaying = null; }
    if (checkForClip) { checkForClip = null; }
    if (editClip) { editClip = null; }
    if (watchTrack) { watchTrack = null; }
    if (watchTrackForPlayingClip) { watchTrackForPlayingClip = null; }
    if (watchClipNotes) { watchClipNotes = null; }
    if (watchClipPlayingStatus) { watchClipPlayingStatus = null; }
    if (watchClipIsPlaying) { watchClipIsPlaying = null; }
    if (watchClipPlayhead) { watchClipPlayhead = null; }
}