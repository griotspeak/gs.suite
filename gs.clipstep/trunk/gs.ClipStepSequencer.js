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


/*jslint white:false */
/*globals Global, LiveAPI, buildMonome, changeParameterProperty, clearFunctionModeLeds, clearMultiPurposeLeds, clearNoteDisplay, clipArrows, clipPlaying, countMidiTracks, defaultDrumScale, displayDisplayWidthLeds, displayLengthLeds, displayNote, displayRatioToMonome, displayVelocityLeds, downInClip, downInSet, elementsInNoteList, fillInNoteRows, focusOnClip, getClipScene, getIndexOfTrack, getPlayingSlotNumber, getTrackIndex, grabAllPattrValues, grabPattrValue, iProperty, isValidCCNumber, leftInClip, leftInSet, lengthButtons, liveSetArrows, monomeLastCol, monomeLastRow, noteArrayChecked, numberOfNotesInClip, onScaleVariableChange, postPattrs, refreshMonome, rightInClip, rightInSet, roundDisplayOffset, sceneArray, sceneCount, sendToHud, setClipFromGlobal, setCurrentScaleName, setCurrentScaleWithSymbol, setParameterProperty, setPlayheadVisible, setPlaying, setTrackIndex, setTrackIndexAndScene, shiftIsHeld, showLengthOptions, showVelocityOptions, showWidthOptions, toggleParameterProperty, trackCount, upInClip, upInSet, updateControlLeds, updateFunctionModeLeds, updateHud, updateMultiPurposeLeds, updateNoteDisplay, velocityButtons, widthButtons */

post("begin loading gs.clipStepSequencer\n");

//                                  ---===Patcher/MaxMSP Stuff===---
var autowatch = 1;

var inlets = 1;
var outlets = 3;
var post;
var outlet;

var mWatchSet;
var mCountAllTracks;
var trackArray;
var mWatchSetPlaying;
var glob;
var indexTrack;
var mWatchersCreated = false;

var mWatchSetTracks; //not an attribute
var thereIsAClipInSlot; // not an attribute

var debugItem = {
    arguments : false,
    endValue : false,
    frequentItem : false,
    frequentList: false,
    functionName : false,
    list : false,
    localValue : false,
    startValue : false,
    frequentName : false,
    loading : false
};

var maps = {
    Major : {
        value: [0, 2, 2, 1, 2, 2, 2, 1],
        name: "Major"
    },
    NaturalMinor: {
        value: [0, 2, 1, 2, 2, 1, 2, 2],
        name: "NaturalMinor"
    },
    HarmonicMinor: {
        value: [0, 2, 1, 2, 2, 1, 3, 1],
        name: "HarmonicMinor"
    },
    Chromatic: {
        value: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        name: "Chromatic"
    },
    MinorPentatonic: {
        value: [0, 3, 2, 2, 3, 2],
        name: "MinorPentatonic"
    },
    MajorPentatonic: {
        value: [0, 2, 2, 3, 2, 3],
        name: "MajorPentatonic"
    },
    BluesPentatonic: {
        value: [0, 3, 2, 1, 1, 3, 2],
        name: "BluesPentatonic"
    },
    Ionian: {
        value: [0, 2, 2, 1, 2, 2, 2, 1],
        name: "Ionian"
    },
    Dorian: {
        value: [0, 2, 1, 2, 2, 2, 1, 2],
        name: "Dorian"
    },
    Phrygian: {
        value: [0, 1, 2, 2, 2, 1, 2, 2],
        name: "Phrygian"
    },
    Lydian: {
        value: [0, 2, 2, 2, 1, 2, 2, 1],
        name: "Lydian"
    },
    Mixolydian: {
        value: [0, 2, 2, 1, 2, 2, 1, 2],
        name: "Mixolydian"
    },
    Aeolian: {
        value: [0, 2, 1, 2, 2, 1, 2, 2],
        name: "Aeolian"
    },
    Locrian: {
        value: [0, 1, 2, 2, 1, 2, 2, 2],
        name: "Locrian"
    },
    WholeTone: {
        value: [0, 2, 2, 2, 2, 2],
        name: "WholeTone"
    },
    WholeHalfDiminished: {
        value: [0, 2, 1, 2, 1, 2, 1, 2],
        name: "WholeHalfDiminished"
    },
    HalfWholeDiminished: {
        value: [0, 1, 2, 1, 2, 1, 2, 1],
        name: "HalfWholeDiminished"
    },
    SymmetricalAugmented: {
        value: [0, 3, 1, 3, 1, 3, 1],
        name: "SymmetricalAugmented"
    },
    Tritone: {
        value: [0, 3, 2, 3, 1, 3, 2],
        name: "Tritone"
    },
    MajorQuartal: {
        value: [0, 5, 6, 5, 5, 5, 5, 5],
        name: "MajorQuartal"
    },
    MinorQuartal: {
        value: [0, 5, 5, 5, 5, 6, 5, 5],
        name: "MinorQuartal"
    },
    //                                  ---===Drum Mapping===---
    Drums: {
        value: [36, 37, 38, 41, 42, 44, 45, 46, 48, 50, 53, 55, 56, 57, 59],
        name: "Drums"
    }
};

var HudFormat = {
    set : 0,
    trigger : 1,
    symbol : 2,
    measures : 3,
    slotSet : 4,
    slotTrigger : 5,
    slotSymbol : 6
};

var parameter = {
    clipScene : {
        name : "clipScene",
        type : "number",
        value : 0,
        minValue : 0,
        maxValue : function() {
            return (mWatchersCreated) ? (mWatchSet.getcount("scenes") - 1) : 2048;
        },
        saveInPattr : true
    },
    currentScale : {
        name : "currentScale",
        type : "array",
        value : [36, 37, 38, 41, 42, 44, 45, 46, 48, 50, 53, 55, 56, 57, 59],
        minValue : null,
        maxValue : null,
        saveInPattr : false
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
        maxValue : function() {
            return (mWatchersCreated) ? (displayNoteList.length - monomeLastRow()) : 2048;
        },
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
        minValue : 0.000390625,
        maxValue : 127,
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
        maxValue : function() {
            return (mWatchersCreated) ? (trackArray.length - 1) : 2048;
        },
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
        maxValue : function() {
            return (mWatchersCreated) ? (displayNoteList.length - monomeLastRow()) : 2048;
        },
        saveInPattr : true
    },
    timeOffset : {
        name : "timeOffset",
        type : "number",
        value : 0,
        minValue : 0,
        maxValue : function() { 
            return (mWatchersCreated) ? (editClip.get("length") - parameter.displayWidth.value) : 2048;
        },
        saveInPattr : true
    },
    patchString : "GsCss"
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
    _0 : 0.03125,
    _1 : 0.0625,
    _2 : 0.125,
    _3 : 0.25,
    _4 : 0.5,
    _5 : 1,
    _6 : 2,
    _7 : 4
};

var DisplayWidthOption = {
    _0 : 0.5,
    _1 : 1,
    _2 : 2,
    _3 : 4,
    _4 : 8,
    _5 : 16,
    _6 : 32,
    _7 : 64
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
    fold: 7,
    store_0 : 8,
    store_1 : 9,
    store_2 : 10,
    store_3 : 11,
    store_4 : 12,
    store_5 : 13,
    store_6 : 14,
    store_7 : 15
};

var FunctionMode = {
    moveMode: 0,
    lengthMode: 1,
    velocityMode: 2,
    widthMode: 3
};

//                                  ---===Create Empty Arrays===---
var noteArray = [];
var displayNoteList = [];
var clipNotes = [];


//                                  ---===conditions===---
var playheadVisible = false;
var followingPlayingClip = false;
var extendedWidthOptions = false;
var extendedLengthOptions = false;
var extendedVelocityOptions = false;
        
//                                  ---===Variables===---

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

function bang() {
    if (debugItem.functionName) { post("                     ---bang-\n"); }
    
    post(parameter.currentScale.value, "\n");
    post("name:", parameter.currentScaleName.value, "\n");
    post("monomeHeight:", parameter.monomeHeight.value, "\n");
    post("monomeWidth:", parameter.monomeWidth.value, "\n");
    post("root:", parameter.rootNote.value, "\n");
    post("cycles:", parameter.cycles.value, "\n");
}

function initialize() {
    if (debugItem.functionName) { post("                     ---initialize-\n"); }
    if (debugItem.list) { postPattrs("start"); }
    grabAllPattrValues();
    buildMonome();
    
    mWatchSet = new LiveAPI(this.patcher, null, "live_set");
    mCountAllTracks = new LiveAPI(this.patcher, null, "live_set");
    
    updateFunctionModeLeds();
    updateMultiPurposeLeds();

    countMidiTracks();
        
    if (debugItem.startValue) {
        post("trackNumber:", trackArray[parameter.trackIndex.value], "\n");
        post("clipScene:", parameter.clipScene.value, "\n"); 
    }
    
    // those with callbacks 
    mWatchSetTracks = new LiveAPI(this.patcher, countMidiTracks, "live_set");
    mWatchSetTracks.property = "tracks";
    mWatchSetPlaying = new LiveAPI(this.patcher, setPlayheadVisible, "live_set");
    mWatchSetPlaying.property = "is_playing";
    
    glob = new Global("clipStepGlobalController");
    glob.setClip = setClipFromGlobal;
    
    setTrackIndexAndScene(parameter.trackIndex.value, parameter.clipScene.value);
    
    mWatchersCreated = true;

    updateNoteDisplay();
    
    post("gs.ClipStepSequencer finished loading\n");
}

function grabAllPattrValues() {
    var iProperty;
    
    for (iProperty in parameter) {
        if (parameter[iProperty].saveInPattr) {
            grabPattrValue(parameter[iProperty]);
        }
    }
}

function setClipFromGlobal(aTrack, aScene) {
    if (debugItem.getSetName) { post("                     ---setClipFromGlobal-\n"); }
    
    var index = getIndexOfTrack(aTrack);
    if (index > -1) {
        setTrackIndexAndScene(index, aScene);
    }
}

//                                  ---===Prototype work===---

Array.prototype.inArray = function (aNumber) {
    if (debugItem.getSetName) { post("                               --inArray-\n"); }
    
    // need this later for Folding Logic
    var g;
    if (this.indexOf( aNumber ) > -1) { g = true; }
    else if (this.indexOf( aNumber ) == -1) { g = false; }
    else { g = NaN; }
    return g;
};

Array.prototype.noteToLiveAPI = function () {
    if (debugItem.getSetName) { post("                               --noteToLiveAPI-\n"); }
    
    // Typecasting? In javascript? Yessert!
    var timeNumber = Number(this[2]);
    this[2] = timeNumber.toFixed(12);
    var durationNumber = Number(this[3]);
    this[3] = durationNumber.toFixed(12);
    return this;
};

Number.prototype.toLength = function (aLength) {
       if (debugItem.getSetName) { post("                              --toLength--\n"); }

    var lString = this.toString();
    if (lString.length < aLength) {
        lString = ('0000' + this.toString()).slice(-aLength);
    }

    return lString;
   
};

//                                  ---===LiveAPI Calls===---
// those without callbacks

//                                  ---===track accessors===---

function setTrack(aNewTrackNumber) {
    if (debugItem.getSetName) { post("                               --setTrack--\n"); }

    setTrackIndex(getIndexOfTrack(aNewTrackNumber -1));    
}

//                                  ---===trackIndex accessors===---
function setTrackIndex(aNewIndexNumber) {
    if (debugItem.getSetName) { post("                               --setTrackIndex--\n"); }
    
    setParameterProperty({
        key : "trackIndex",
        value : aNewIndexNumber
    });    
    focusOnClip();
}

function changeTrackIndex(aAmount) {
    if (debugItem.getSetName) { post("                               --changeTrackIndex--\n"); }
        
    setParameterProperty({
        key : "trackIndex",
        value : parameter.trackIndex.value + aAmount
    });
    
    focusOnClip();
}

function getIndexOfTrack(aTrackToFind) {
    if (debugItem.getSetName) { post("                               --getTrackIndex--\n"); }

    if (debugItem.startValue) { post("looking for:", aTrackToFind, "\n");}
    var lIndex = trackArray.indexOf(aTrackToFind);

    if (lIndex != -1) {
        if (debugItem.startValue) { post(aTrackToFind, "is a valid midi track\n");}
        if (debugItem.startValue) { post(lIndex, "is it's index\n");}
        return lIndex;
    }
    
    else {
        if (debugItem.startValue) { post(aTrackToFind, "is not a valid midi track\n");}
        return -1;
    }
}

function setTrackIndexAndScene(aNewIndexNumber, aNewSceneNumber) {
    if (debugItem.getSetName) { post("                               --setTrackIndex--\n"); }
    
    setParameterProperty({
        key : "trackIndex",
        value : aNewIndexNumber
    });
        
    var iCounter;
    
    var lLimit = mWatchSet.getcount("scenes");

    if (lLimit != 0) { 
        for (iCounter = aNewSceneNumber; iCounter < lLimit; iCounter++) {
            setParameterProperty({
                key : "clipScene",
                value : iCounter
            });
            if (focusOnClip()) { return true; }
        }
    
        for (iCounter = aNewSceneNumber; iCounter >=0; iCounter--) {
            setParameterProperty({
                key : "clipScene",
                value : iCounter
            });
            if (focusOnClip()) { return true; }
        }
    
        setParameterProperty({
            key : "clipScene",
            value : 0
        });
    }
        
    return false;
}

//                                  ---===rowOffset accessors===---
function setRowOffset(aNewOffsetNumber) {
    if (debugItem.getSetName) { post("                               --setRowOffset--\n"); }

    setParameterProperty({
        key : "rowOffset",
        value : aNewOffsetNumber
    });
    updateNoteDisplay();
}
function setFoldingRowOffset(aNewOffsetNumber) {
    if (debugItem.getSetName) { post("                               --setRowOffset--\n"); }

    setParameterProperty({
        key : "foldingRowOffset",
        value : aNewOffsetNumber
    });
    updateNoteDisplay();

}
function getRowOffset() {
    return (parameter.folding.value) ? parameter.foldingRowOffset.value : parameter.rowOffset.value;
}
function changeRowOffset(aAmount) {
    if (debugItem.functionName) { post("                               --changeRowOffset--\n"); }
    
    if(!aAmount) { aAmount = 1; }
            
    if (parameter.folding.value) {
        setParameterProperty({
            key : "foldingRowOffset",
            value : (parameter.foldingRowOffset.value + aAmount)
        }); }
    else {
        setParameterProperty({
            key : "rowOffset",
            value : (parameter.rowOffset.value + aAmount)
        }); }
    
    updateNoteDisplay();
}

//                                  ---===clipScene accessors===---
function setClipScene(aNewSceneNumber) {
    if (debugItem.getSetName) { post("                               --setClipScene--\n"); }

    setParameterProperty({
        key : "clipScene",
        value : aNewSceneNumber
    });
    focusOnClip();
    
}

function setClipSceneFromPatcher(aNewSceneNumber) {
    if (debugItem.getSetName) { post("                               --setClipSceneFromPatcher--\n"); }
    setClipScene(aNewSceneNumber - 1);
}

function changeClipScene(aAmount) {
    if (debugItem.getSetName) { post("                               --changeClipScene--\n"); }
    
    setParameterProperty({
        key : "clipScene",
        value : parameter.clipScene.value + aAmount
    });
    
    focusOnClip();
}

function isValidClipSceneNumber() {
    if ((parameter.clipScene.value >= 0) || (parameter.clipScene.value < mWatchSet.getcount("scenes"))) { 
        return true;
    }
    else {
        return false;
    }
}

//                                  ---===timeOffset accessors===---
function setTimeOffset(aNewOffset){
    if (debugItem.getSetName) { post("                               --setTimeOffset--\n"); }

    setParameterProperty({
        key : "timeOffset",
        value : aNewOffset
    });
    updateNoteDisplay();

}

function changeTimeOffset(aAmount) {
    if (debugItem.getSetName) { post("                               --changeTimeOffset-\n"); }
        
    if(!aAmount) { aAmount = parameter.displayWidth.value; }
    else { aAmount *= parameter.displayWidth.value; }

    setParameterProperty({
        key : "timeOffset",
        value : (parameter.timeOffset.value + aAmount)
    });
}

//                                  ---===newNoteLength accessors===---

function setNewNoteLength(aLength) {
    if (debugItem.getSetName) { post("                     --setNewNoteLength--\n"); }
    
    setParameterProperty({
        key : "newNoteLength",
        value : aLength
    });
    updateMultiPurposeLeds();
}

//                                  ---===newNoteVelocity===---

function setNewNoteVelocity(aVelocity) {
    if (debugItem.getSetName) { post("                     ---setNewNoteVelocity-\n"); }
    
    if ((0 <= aVelocity) && (aVelocity <= 127)) {
        parameter.newNoteVelocity.value = aVelocity;
        sendToHud({
            key : "velocity",
            value : parameter.newNoteVelocity.value,
            format : HudFormat.set
        });
    }
    else {
        post("invalid velocity");
    }

    this.patcher.getnamed("newNoteVelocityGsCssPattr").message(parameter.newNoteVelocity.value);
}

//                                  ---===functionMode accessors===---
function setFunctionMode(aMode) {
    if (debugItem.getSetName) { post("                               --setFunctionMode--\n"); }

    setParameterProperty({
        key : "functionMode",
        value : aMode
    });
    updateControlLeds();
}

function decrementFunctionMode() {
    if (debugItem.getSetName) { post("                               --decrementFunctionMode--\n"); }
    
    changeParameterProperty("functionMode", -1);
}

function incrementFunctionMode() {
    if (debugItem.getSetName) { post("                               --incrementFunctionMode--\n"); }
    
    changeParameterProperty("functionMode", 1);
}

function toggleFunctionBitButton(aButton) {
    if (debugItem.functionName) { post("                               --toggleFunctionBitButton--\n"); }

    functionToggle[aButton] = (functionToggle[aButton]) ? false : true;
    
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
    if (debugItem.functionName) { post("                               --toggleFolding--\n"); }
    
    toggleParameterProperty("folding");
}
function setFolding(aValue) {
    if (debugItem.getSetName) { post("                               --setFolding--\n"); }
    
    setPlayheadVisible("folding", aValue);

    updateFunctionModeLeds();
    updateNoteDisplay();
}
                    
//                                  ---===Callbacks===---
function onNewSlotPlaying(aApiArray) {
    if (debugItem.functionName) { post("                               --onNewSlotPlaying--\n"); }
    var playingClipSlot = parseInt(aApiArray[1], 10);
    if ((followingPlayingClip) && (playingClipSlot >= 0)) {
        setClipScene(playingClipSlot);
        post("onNewSlotPlaying", playingClipSlot, "\n");
    }
}

function setPlayheadVisible() {
    if (debugItem.getSetName) { post("                               --setPlayheadVisible--\n"); }
    if (!thereIsAClipInSlot) { return; }
    
       clipPlaying = watchClipIsPlaying.get("is_playing");
    setPlaying = mWatchSet.get("is_playing");
   
    if ((setPlaying == 1) && (clipPlaying == 1)) { playheadVisible = true; }
    else { 
        playheadVisible = false;
        refreshMonome();
    }

    if(debugItem.endValue) { 
        post("playheadVisible:", playheadVisible, "\n");
    }

}

function setDisplayWidth(aWidth) {
    if (debugItem.getSetName) { post("                               --setDisplayWidth--\n"); }

    setParameterProperty({
        key : "displayWidth",
        value : aWidth
    });
    
    roundDisplayOffset();
    updateNoteDisplay();
    if (parameter.functionMode.value == FunctionMode.widthMode) {
        updateMultiPurposeLeds();
    }

}

function updatePlayhead(aTimeNumber) {
    if (debugItem.frequentName) { post("                               --updatePlayhead--\n"); }
    // View
    if (playheadVisible) {
        var playheadTimeInt = Math.floor((aTimeNumber[1] - parameter.timeOffset.value) * displayRatioToMonome());

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
    if (debugItem.functionName) { post("                               --countMidiTracks--\n"); }
    trackArray = [];
    trackCount = mCountAllTracks.getcount("tracks");
    for (var j = 0; j < trackCount; j++) {
        if (indexSet) { indexSet.goto("live_set tracks " + j); }
        else { indexSet = new LiveAPI(this.patcher, null, "live_set tracks " + j ); }
        if (indexSet.get("has_midi_input") == 1 ) {
            trackArray.push(j);                      
        }
    }
    
    var c = trackArray.length;
    if (debugItem.startValue) {
        post("there are ", c, " midi tracks\n");
        post("they are:", trackArray, "\n");
    }
    if (!thereIsAClipInSlot) { focusOnClip(); }
}

function countScenesWithClip() {
    
    // TODO - i can't implement this unless i figure out a way to observe a TRACK for an added clip.
    // or i can observe every slot in the current track, but that won't scale. at all.
    
    if (debugItem.functionName) { post("                               --countScenesWithClip--\n"); }
    sceneArray = [];
    sceneCount = mCountAllTracks.getcount("scenes");
    for (var k = 0; k < sceneCount; k++) {
        if (indexTrack) { indexTrack.goto("live_set tracks " + trackArray[parameter.trackIndex.value] + "clip_slots" + k); }
        else { indexTrack = new LiveAPI(this.patcher, null, "live_set tracks " + trackArray[parameter.trackIndex.value] + "clip_slots" + k); }
        
        if (indexTrack.get("has_midi_input") == 1 ) {
            sceneCount.push(k);                      
        }
    }
    
    var c = sceneArray.length;
    if (debugItem.startValue) {
        post("there are ", c, " scenes with clips in current track\n");
        post("they are:", sceneArray, "\n");
    }
}

function compareNumbers(a, b) {
    // need this later for Array.sort(compareNumbers)        
    return b - a;
}

function roundDisplayOffset() {
    if (debugItem.functionName) { post("                               --roundDisplayOffset--\n"); }
    if(debugItem.startValue) { post("before round", parameter.timeOffset.value,  "\n"); }
    var a = Math.round(parameter.timeOffset.value / parameter.displayWidth.value);
    parameter.timeOffset.value = a * parameter.displayWidth.value;
    if(debugItem.endValue) {post("after round", parameter.timeOffset.value,                   "\n"); }
}

//                                  ---===Dynamic Time/Column Variables===---
function displayTimeMax() { return parameter.displayWidth.value + parameter.timeOffset.value; }
function colOffset() { return parameter.timeOffset.value * displayRatioToMonome(); }
function displayRatioFromMonome() { return parameter.displayWidth.value / parameter.monomeWidth.value; }
function displayRatioToMonome() { return parameter.monomeWidth.value / parameter.displayWidth.value; }
function monomeLastRow() { return parameter.monomeHeight.value - 1; }
function monomeLastCol() { return parameter.monomeWidth.value - 1; }

function displayRowMax() {
    var currentOffset = (parameter.folding.value) ? parameter.foldingRowOffset.value : parameter.rowOffset.value;
    return monomeLastRow() + currentOffset;
}

//                                  ---===LiveApi Calls===---
function focusOnClip() {
    if (debugItem.functionName) { post("                               --focusOnClip--\n"); }          
    
    if (debugItem.startValue) { post("trackArray[" + parameter.trackIndex.value + "]:", trackArray[parameter.trackIndex.value], "\n"); }

    if (checkForClip) { checkForClip.goto("live_set tracks " + trackArray[parameter.trackIndex.value] + " clip_slots " + parameter.clipScene.value); }
    else { checkForClip = new LiveAPI(this.patcher, null, "live_set tracks " + trackArray[parameter.trackIndex.value] + " clip_slots " + parameter.clipScene.value); }
    
    thereIsAClipInSlot = (checkForClip.get("has_clip") == 1) ? true: false;
    
    if (debugItem.list) { post("thereIsAClipInSlot:", thereIsAClipInSlot, "\n"); }

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

    if (debugItem.functionEnd) { post("focused on clip:", watchClipNotes.path, "\n"); }
    return true;
}

function getCurrentPosition() {
    if (debugItem.functionName) { post("                               --getCurrentPosition--\n"); }
    post("watchClipNotes.path = ", watchClipNotes.path, "\n");
    post("clipScene = ", getClipScene(), "\n");
    var currentPathArray = watchClipNotes.path.split(" ");
    // Get current track number
    var currentTrackNumber = parseInt(currentPathArray[2], 10);
    parameter.trackIndex.value = trackArray.indexOf(currentTrackNumber);
    
    // Debugging is Fun!
    if (debugItem.functionEnd) { post("current track number is:", currentTrackNumber, "\n"); }
    if (debugItem.startValue) { post("trackIndex is:", parameter.trackIndex.value, "\n"); }
    
    // Get current scene number
    var currentSceneNumber = parseInt(currentPathArray[4], 10);
    post("currentSceneNumber = ", currentSceneNumber, "\n");
    if (parameter.clipScene.value != currentSceneNumber) {
        if (debugItem.endValue) { post("clipScene changed from:", parameter.clipScene.value, "to:", currentSceneNumber, "\n"); }
        parameter.clipScene.value = currentSceneNumber;
    }
    sendToHud({
        key : "track",
        value : trackArray[parameter.trackIndex.value] + 1,
        format : HudFormat.set
    });
    sendToHud({
        key : "scene", 
        value : Number(parameter.clipScene.value) + 1, 
        format : HudFormat.set
    });
}

function playCurrentClip() {
    editClip.call("fire");
}


//                                  ---===Check Notes===---
function timeIsDisplayed(aTimeInQuestion) {
    if (debugItem.list) { post("                               --timeIsDisplayed--\n"); }
    if ((parameter.timeOffset.value <= aTimeInQuestion) && (aTimeInQuestion < displayTimeMax())) {
        return true;
    }
    else {
        return false;
    }
}

function rowIsDisplayed(aRowInQuestion) {
    if (debugItem.list) { post("                               --rowIsDisplayed--\n"); }
    var currentOffset = (parameter.folding.value) ? parameter.foldingRowOffset.value : parameter.rowOffset.value;
    if (currentOffset <= aRowInQuestion && (aRowInQuestion < displayRowMax())) {
        return true;
    }
    else {
        return false;
    }
}

function doesCoincide(aArray, aTone, aTime) {
    if (debugItem.functionName) { post("                               --doesCoincide--\n"); }
    var x, l;
    var a = [];
    for ( x = 0, l = aArray.length; x < l; x++) {
        
        // Debug
        if (debugItem.startValue) {
            post("checked note:", x, "in noteArray\n");
            post("for aTone:", aTone, " and aTime:", aTime, "\n");
        }
        
        if ((aArray[x][1] == aTone) && (aArray[x][2] == aTime)) {
            if (debugItem.functionEnd) { post("found! note:", x, "in noteArray\n"); }
            a = [true, x];
            return a;
        }
        
        if (debugItem.startValue) {
            post("nope\n");
        }
        
    }
    a = [false];
    return a;
}


//                                  ---===LiveAPI Note Manipulation===---
function getClipNotes() {
    if (debugItem.functionName) { post("                               --getClipNotes--\n"); }
    
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
    if (debugItem.endValue == true) { post("there are:", numberOfNotesInClip, " notes\n"); }
    
    var a, b;
    
    for (a = 0, elementsInNoteList = 0; a < numberOfNotesInClip; a++) {
        var sliceIndexLeft = a * 6;
        var sliceIndexRight = a * 6 + 6;
        noteArray[a] = clipNotes.slice(sliceIndexLeft, sliceIndexRight);
        
        // Folding Logic
        if (!displayNoteList.inArray(noteArray[a][1])) {
            displayNoteList.push(noteArray[a][1]);
            
            // Debug
            if (debugItem.list) { post(noteArray[a][1] + " added to displayNoteList \n"); }
        }
        
        if (debugItem.list) {
            post( "displayNoteList.inArray(noteArray[" + a + "][1]) = " + displayNoteList.inArray(noteArray[a][1]) + "\n" );
        }
        
        // Debug statements
        if (debugItem.list) {
            post(a);
            //if (debugItem.list) {
                post("timeNumber is:" + noteArray[a][2], "\n");
                post("durationNumber is:" + noteArray[a][3], "\n");
                post("sliceIndex is:", sliceIndexLeft, "\n");
            //}
            post(noteArray[a], "\n");
        }
    }

    if (debugItem.startValue) { post("displayNoteList before padding =", displayNoteList, '\n'); }
    if (!parameter.folding.value) { fillInNoteRows(); }
    displayNoteList.sort(compareNumbers);
    if (debugItem.endValue) { post("displayNoteList after padding =", displayNoteList, '\n'); }
    clipNotes = editClip.call("deselect_all_notes");
    noteArrayChecked = true;
    
    if (debugItem.functionEnd) { post("           /getClipNotes\n"); }
}

function publishNoteArray() {
    if (debugItem.functionName) { post("                               --publishNoteArray--\n"); }
    // Model Controller
    var newLength = noteArray.length;
    
    editClip.call("select_all_notes");//CALL
    editClip.call("replace_selected_notes");//CALL
    editClip.call("notes", newLength); //CALL
    
    if (debugItem.startValue) { post("newLength:", newLength, "\n"); }
    if (debugItem.startValue) { post("replace_selected_notes\n"); }
    
    var l, j;
    for (l = noteArray.length , j = 0; j < l; j++) {
        if (debugItem.startValue) { post(j.toLength(10), noteArray[j], "\n"); }
        editClip.call( noteArray[j].noteToLiveAPI() ); //CALL
    }
    
    editClip.call("done");
}

function addNote(aPitch, aTime, aVelocity) {
    if (debugItem.functionName) { post("                               --addNote--\n"); }
    // Model Controller
    // simply adds one note no need to get and replace every note.
    
    var tempNoteArray = ["note", aPitch, aTime, parameter.newNoteLength.value, aVelocity, 0];
    var newLength = noteArray.length + 1;

    editClip.call("deselect_all_notes"); // CALL
    editClip.call("replace_selected_notes"); // CALL
    if (debugItem.functionEnd) { post("replace_selected_notes\n"); }
    if (debugItem.startValue) {
        post("tempNoteArray:", tempNoteArray, "\n");
        post("newLength:", newLength, "\n");
        post("notes", 1, "\n");
    }
    editClip.call("notes", 1); // CALL

    editClip.call(tempNoteArray.noteToLiveAPI()); // CALL
    
    if (debugItem.startValue) {
        post(tempNoteArray, "\n");
        post("done\n");
    }
    editClip.call("done"); // CALL
}

function removeNote(aIndex) {
    if (debugItem.functionName) { post("                               --removeNote--\n"); }
    var noteRemoved = noteArray.splice(aIndex, 1);
    var noteRemovedIndex = aIndex;
    if (debugItem.functionEnd) { post("noteRemoved:" + noteRemoved + "\n"); }
    publishNoteArray();
}

//                                  ---===View Controller Methods===---
function updateMonome() {
    if (debugItem.functionName) { post("                               --updateMonome--\n"); }
    updateNoteDisplay();
    updateFunctionModeLeds();
    updateMultiPurposeLeds();
}

function updateNoteDisplay() {
    if (debugItem.functionName) { post("                               --updateNoteDisplay--\n"); }

    if (mWatchersCreated) {
        clearNoteDisplay();
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
    sendToHud({
        key : "track", 
        value : (trackArray[parameter.trackIndex.value] + 1), 
        format : HudFormat.set
    });
    sendToHud({
        key : "scene",
        value : (Number(parameter.clipScene.value) + 1),
        format : HudFormat.set
    });
    sendToHud({
        key : "time",
        value : parameter.timeOffset.value / 4,
        format : HudFormat.set
    });
    sendToHud({
        key : "width",
        value : parameter.displayWidth.value / 4,
        format : HudFormat.set
    });
    sendToHud({
        key : "top",
        value : (displayNoteList[parameter.rowOffset.value]) ? displayNoteList[parameter.rowOffset.value] : 0,
        format : HudFormat.set
    });
    if (thereIsAClipInSlot) {
        sendToHud({
            key : "clipLength",
            value : (editClip.get("length") /4),
            format : HudFormat.measures
        }); 
    }
    sendToHud({
        key : "scale",
        value : parameter.currentScaleName.value,
        format : HudFormat.symbol
    });
    sendToHud({
        key : "noteLength",
        value :parameter.newNoteLength.value,
        format : HudFormat.set
    });
    sendToHud({
        key : "monomeHeight",
        value : parameter.monomeHeight.value,
        format : HudFormat.set
    });
    sendToHud({
        key : "monomeWidth",
        value : parameter.monomeWidth.value,
        format : HudFormat.set
    });
    sendToHud({
        key : "cycles",
        value : parameter.cycles.value,
        format : HudFormat.set
    });
    sendToHud({
        key : "root",
        value : parameter.rootNote.value,
        format : HudFormat.set
    });
    sendToHud({
        key : "folding",
        value : parameter.folding.value,
        format : HudFormat.set
    });
    sendToHud({
        key : "velocity",
        value : parameter.newNoteVelocity.value,
        format : HudFormat.set
    });   
}


function updateFunctionModeLeds() {
    if (debugItem.functionName) { post("                               --updateFunctionModeLeds--\n"); }
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
        default :
            post("error in updateFunctionModeLeds functionMode:", parameter.functionMode.value, "\n");
            break;
    }

    if (shiftIsHeld()) {
        Monome[FunctionButton.shift][monomeLastRow()].ledOn();
    }
    if (parameter.folding.value){ Monome[FunctionButton.fold][monomeLastRow()].ledOn(); }
}

function updateMultiPurposeLeds() {
    if (debugItem.functionName) { post("                               --updateMultiPurposeLeds--\n"); }
    
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
        default :
            post("error in updateMultiPurposeLeds, functionMode:", parameter.functionMode.value, "\n");
            break;
    }
    
}

function updateControlLeds() {
    if (debugItem.functionName) { post("                     ---updateControlLeds-\n"); }
    
    updateFunctionModeLeds();
    updateMultiPurposeLeds();
}



//                                  ---===Display Methods===---
function displayDisplayWidthLeds() {
    if (debugItem.functionName) { post("                               --displayDisplayWidthLeds--\n"); }
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
    if (debugItem.functionName) { post("                               --displayLengthLeds--\n"); }
        
    if ((parameter.functionMode.value == FunctionMode.lengthMode) && (!extendedLengthOptions)) {
        switch(parameter.newNoteLength.value) {
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
        switch(parameter.newNoteLength.value) {
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
    if (debugItem.functionName) { post("                               --displayVelocityLeds--\n"); }
        
    if ((parameter.functionMode.value == FunctionMode.velocityMode) && (!extendedVelocityOptions)) {
        switch(parameter.newNoteVelocity.value) {
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
        switch(parameter.newNoteVelocity.value) {
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

function displayNote(aNoteToDisplay, aIndex, aArray) {
    if (debugItem.list) { post("                               --displayNote--\n"); }
    // View
    // 1 = a quarter note. 4 equals a measure.
    
    // find ratio to monome and such
    var absoluteTime = aNoteToDisplay[2].toFixed(12);
    var colOnMonome = absoluteTime * displayRatioToMonome() - colOffset();
    
    // Formatted Notes for Monome
    var rowIndex = displayNoteList.indexOf(aNoteToDisplay[1]);
    var rowOnMonome = rowIndex - ((parameter.folding.value) ? parameter.foldingRowOffset.value : parameter.rowOffset.value);
    if(debugItem.startValue) {
        post("rowIndex:", rowIndex, "\n");
        post("rowOnMonome:", rowOnMonome, "rowOffset:", parameter.rowOffset.value, "foldingRowOffset", parameter.foldingRowOffset.value, "\n");
        post("colOnMonome:", colOnMonome, "colOffset:", colOffset(), "\n");
    }
    
    if (( timeIsDisplayed(absoluteTime)) && (rowIsDisplayed(rowIndex)) && (colOnMonome % 1 == 0 )) {
        Monome[colOnMonome][rowOnMonome].ledOn();
        
        // Debug Statements
        if (debugItem.endValue) {
            post("aNoteToDisplay:", aNoteToDisplay, "\n"); 
            post("col:", colOnMonome, "row:", rowOnMonome, "\n");
            post("absoluteTime is:", absoluteTime, "\n");
            post("colOnMonome is:", colOnMonome, "\n");
        }
    }    
}


//                                  ---===Clear Methods===---
function clearFunctionModeLeds() {
    if (debugItem.functionName) { post("                               --clearFunctionModeLeds--\n"); }
    
    //TODO Use Min and Max
    for (var o = 4; o <= 7; o++) {
        Monome[o][monomeLastRow()].ledOff();
    }
}

function clearMultiPurposeLeds() {
    if (debugItem.functionName) { post("                               --clearMultiPurposeLeds--\n"); }
    for (var p = 0; p < 4; p++) {
        Monome[p][monomeLastRow()].ledOff();
    }
}

function clearNoteDisplay() {
    if (debugItem.functionName) { post("                               --clearNoteDisplay--\n"); }
    for (var cCol = 0; cCol < parameter.monomeWidth.value; cCol ++) {
        for (var cRow = 0; cRow < monomeLastRow(); cRow++) {
            Monome[cCol][cRow].ledOff();
        }
    }
    if (debugItem.functionEnd) { post("           /clearNoteDisplay\n"); }
}

//                                  ---===NoteList===---
function fillInNoteRows() {
    if (debugItem.functionName) { post("                               --fillInNoteRows--\n"); }

    var numberNeeded = (parameter.monomeHeight.value - displayNoteList.length);
    for (var m = 0; m < parameter.currentScale.value.length; m++) {
        if (!displayNoteList.inArray(parameter.currentScale.value[m]) ) {
            displayNoteList.push(parameter.currentScale.value[m]);
            if (debugItem.startValue) {
                post("added row for note:", parameter.currentScale.value[m], "\n");
            }
        }
    }
    
    if (debugItem.functionEnd) {
        post("displayNoteList after fillInNoteRows:", displayNoteList, "\n");
    }
}

//                                  ---===Controller Methods===---
function press(aCol, aRow, aPress) {
    if (debugItem.functionName) { post("                               --press--\n"); }
    var lOutlet = 1;
    
    if (debugItem.functionEnd) {
        post("press called.\n aCol:", aCol, "aRow", aRow, "aPress", aPress, "\n");
    }
    
    if (aPress == 1) { Monome[aCol][aRow].push(); }
    else if (aPress == 0) { Monome[aCol][aRow].release(); }
    
    
    if (aRow < monomeLastRow()) {
        var newNoteTime = ( aCol + colOffset() ) * displayRatioFromMonome();
        var newNoteNote = displayNoteList[aRow + ((parameter.folding.value) ? parameter.foldingRowOffset.value:parameter.rowOffset.value)];

        // Debugging is fun!
        if (debugItem.functionEnd) {
            post("newNoteTime:", newNoteTime, " newNoteNote:", newNoteNote, "\n");
        }
    
        if (aPress == 1) {
            // check for note in array
            var isAlreadyInNoteArray = doesCoincide(noteArray, newNoteNote, newNoteTime);
    
            if (isAlreadyInNoteArray[0]) {
                    removeNote(isAlreadyInNoteArray[1]);
            }
        
            else if (!isAlreadyInNoteArray[0]) {
                    addNote(newNoteNote, newNoteTime, parameter.newNoteVelocity.value);
            }
        }
        sendToHud({
            key : "latest",
            value : newNoteNote,
            format : HudFormat.set
        });
    }
    // Arrow keys
    else if ((aRow == monomeLastRow()) && (aPress == 1) && (aCol >= 0) && (aCol <= 3)) {

        switch (parameter.functionMode.value) {
            case FunctionMode.moveMode:
                if (shiftIsHeld()) { liveSetArrows(aCol); }
                else { clipArrows(aCol); }
                break;
            case FunctionMode.lengthMode:
                lengthButtons(aCol);
                break;
            case FunctionMode.velocityMode:
                velocityButtons(aCol);
                break;
            case FunctionMode.widthMode:
                widthButtons(aCol);
                break;
            default :
                post("error in press, functionMode:", parameter.functionMode.value, "\n");
                break;
        }
    }

    else if ((aRow == monomeLastRow()) && (aCol >= 4) && (aCol <= 7)) {
        // Change arrow mode
        switch (aCol) {
            case FunctionButton.shift:
                switch(parameter.functionMode.value) {    
                    case FunctionMode.moveMode:
                        updateControlLeds();
                        break;
                    case FunctionMode.lengthMode:
                        showLengthOptions(aPress);
                        break;
                    case FunctionMode.velocityMode:
                        showVelocityOptions(aPress);
                        break;               
                    case FunctionMode.widthMode:
                        showWidthOptions(aPress);
                        break;
                    default:
                        post("error in FunctionButton.shift. functionMode:", parameter.functionMode.value, "\n");
                        post("aCol:", aCol, "\n");
                        break;
                }
            break;
        
            case FunctionButton.bit0:
                // 0X
                if (aPress == 1) { toggleFunctionBitButton(0); }
                break;

            case FunctionButton.bit1:
               // X0
                if (aPress == 1) { toggleFunctionBitButton(1); }
                break;

            case FunctionButton.fold:
                if (aPress == 1) { toggleFolding(); }
                break;
            default:
                post("error in press. functionMode:", parameter.functionMode.value, "\n");
                post("aCol:", aCol, "\n");
                break;
        }
    }
    else if ((aRow == monomeLastRow()) && (aCol >= 8) && (aCol <= 15) && (aPress == 1)) {
        switch (aCol) {
            case FunctionButton.store_0:
                outlet(lOutlet, 1);
                break;
            case FunctionButton.store_1:
                outlet(lOutlet, 2);
                break;
            case FunctionButton.store_2:
                outlet(lOutlet, 3);
                break;
            case FunctionButton.store_3:
                outlet(lOutlet, 4);
                break;
            case FunctionButton.store_4:
                outlet(lOutlet, 5);
                break;
            case FunctionButton.store_5:
                outlet(lOutlet, 6);
                break;
            case FunctionButton.store_6:
                outlet(lOutlet, 7);
                break;
            case FunctionButton.store_7:
                outlet(lOutlet, 8);
                break;
            default : 
                break;
        }
    }
    
}

function shiftIsHeld() {
    if (debugItem.functionName) { post("                     --shiftIsHeld--\n"); }

    if (Monome[FunctionButton.shift][monomeLastRow()].isHeld == 1) {
        return true;
    }
    else { return false; }
}

function widthButtons(aButtonPressed) {
    if (debugItem.functionName) { post("                               --widthButtons--\n"); }
    
    if (!extendedWidthOptions) {
        switch (aButtonPressed) {
        
            case FunctionButton.dynamic_0 :
                setDisplayWidth(DisplayWidthOption._0);
                break;
            case FunctionButton.dynamic_1 :
                setDisplayWidth(DisplayWidthOption._1);
                break;
            case FunctionButton.dynamic_2 :
                setDisplayWidth(DisplayWidthOption._2);
                break;
            case FunctionButton.dynamic_3 :
                setDisplayWidth(DisplayWidthOption._3);
                break;
            default :
                post("error in widthButtons(no extendedWidthOptions). buttonPressed:", aButtonPressed, "\n");
                break;
        }
    }
    else if (extendedWidthOptions) {
        switch (aButtonPressed) {
        
            case FunctionButton.dynamic_0 :
                setDisplayWidth(DisplayWidthOption._4);
                break;
            case FunctionButton.dynamic_1 :
                setDisplayWidth(DisplayWidthOption._5);
                break;
            case FunctionButton.dynamic_2 :
                setDisplayWidth(DisplayWidthOption._6);
                break;
            case FunctionButton.dynamic_3 :
                setDisplayWidth(DisplayWidthOption._7);
                break;
            default :
                post("error in widthButtons(with extendedWidthOptions). buttonPressed:", aButtonPressed, "\n");
                break;
        }
    }
    if (debugItem.startValue) { post("dWidth = ", parameter.displayWidth.value, "\n"); }
}
function lengthButtons(aButtonPressed) {
    if (debugItem.functionName) { post("                               --lengthButtons--\n"); }
    
    if (!extendedLengthOptions) {
        switch (aButtonPressed) {
        
            case FunctionButton.dynamic_0 :
                setNewNoteLength(LengthOption._0);
                break;
            case FunctionButton.dynamic_1 :
                setNewNoteLength(LengthOption._1);
                break;
            case FunctionButton.dynamic_2 :
                setNewNoteLength(LengthOption._2);
                break;
            case FunctionButton.dynamic_3 :
                setNewNoteLength(LengthOption._3);
                break;
            default :
                post("error in lengthButtons(no extendedLengthOptions). buttonPressed:", aButtonPressed, "\n");
                break;
        }
    }
    else if (extendedLengthOptions) {
        switch (aButtonPressed) {
        
            case FunctionButton.dynamic_0 :
                setNewNoteLength(LengthOption._4);
                break;
            case FunctionButton.dynamic_1 :
                setNewNoteLength(LengthOption._5);
                break;
            case FunctionButton.dynamic_2 :
                setNewNoteLength(LengthOption._6);
                break;
            case FunctionButton.dynamic_3 :
                setNewNoteLength(LengthOption._7);
                break;
            default :
                post("error in lengthButtons(with extendedLengthOptions). buttonPressed:", aButtonPressed, "\n");
                break;
        }
    }
    if (debugItem.startValue) { post("new notes will be created with length:", parameter.newNoteLength.value, "\n"); }
}

function velocityButtons(aButtonPressed) {
    if (debugItem.functionName) { post("                               --velocityButtons--\n"); }
    
    if (!extendedVelocityOptions) {
        switch (aButtonPressed) {
        
            case FunctionButton.dynamic_0 :
                setNewNoteVelocity(VelocityOption._0);
                break;
            case FunctionButton.dynamic_1 :
                setNewNoteVelocity(VelocityOption._1);
                break;
            case FunctionButton.dynamic_2 :
                setNewNoteVelocity(VelocityOption._2);
                break;
            case FunctionButton.dynamic_3 :
                setNewNoteVelocity(VelocityOption._3);
                break;
            default :
                post("error in velocityButtons(no extendedVelocityOptions). buttonPressed:", aButtonPressed, "\n");
                break;
        }
    }
    else if (extendedVelocityOptions) {
        switch (aButtonPressed) {
        
            case FunctionButton.dynamic_0 :
                setNewNoteVelocity(VelocityOption._4);
                break;
            case FunctionButton.dynamic_1 :
                setNewNoteVelocity(VelocityOption._5);
                break;
            case FunctionButton.dynamic_2 :
                setNewNoteVelocity(VelocityOption._6);
                break;
            case FunctionButton.dynamic_3 :
                setNewNoteVelocity(VelocityOption._7);
                break;
            default :
                post("error in velocityButtons(with extendedVelocityOptions). buttonPressed:", aButtonPressed, "\n");
                break;
        }
    }
    
    updateMultiPurposeLeds();

    if (debugItem.startValue) { post("new notes will be created with velocity:", parameter.newNoteVelocity.value, "\n"); }
}

function toggleWidthDisplayOptions() {
    if (debugItem.functionName) { post("                               --toggleWidthDisplayOptions--\n"); }
    
    extendedWidthOptions = (extendedWidthOptions) ? false : true;
    updateControlLeds();
    
    if(debugItem.functionEnd) { post("extendedWidthOptions:", extendedWidthOptions, "\n"); }
}
function toggleLengthOptions() {
    if (debugItem.functionName) { post("                               --toggleLengthOptions--\n"); }
    
    extendedLengthOptions = (extendedLengthOptions) ? false : true;
    updateControlLeds();
    
    if(debugItem.endValue) { post("extendedWidthOptions:", extendedWidthOptions, "\n"); }
}

function toggleVelocityOptions() {
    if (debugItem.functionName) { post("                               --toggleVelocityOptions--\n"); }
    
    extendedVelocityOptions = (extendedVelocityOptions) ? false : true;
    updateControlLeds();
    
    if(debugItem.endValue) { post("extendedVelocityOptions:", extendedVelocityOptions, "\n"); }
}

function showVelocityOptions(aWhichOptions) {
    if (debugItem.functionName) { post("                               --showVelocityOptions--\n"); }
    
    extendedVelocityOptions = (!!aWhichOptions) ? true : false;
    updateControlLeds();
    
    if(debugItem.endValue) { post("extendedVelocityOptions:", extendedVelocityOptions, "\n"); }
}

function showWidthOptions(aWhichOptions) {
    if (debugItem.functionName) { post("                               --showWidthOptions--\n"); }
    
    extendedWidthOptions = (!!aWhichOptions) ? true : false;
    updateControlLeds();
    
    if(debugItem.endValue) { post("extendedWidthOptions:", extendedWidthOptions, "\n"); }
}

function showLengthOptions(aWhichOptions) {
    if (debugItem.functionName) { post("                               --showLengthOptions--\n"); }
    
    extendedLengthOptions = (!!aWhichOptions) ? true : false;
    updateControlLeds();
    
    if(debugItem.endValue) { post("extendedLengthOptions:", extendedLengthOptions, "\n"); }
}

function toggleFollowingPlayingClip() {
    if (debugItem.functionName) { post("                               --toggleFollowingPlayingClip--\n"); }
    followingPlayingClip = (followingPlayingClip == true) ? false : true;
    updateFunctionModeLeds();
    getPlayingSlotNumber();
    sendToHud({
        key : "following",
        value : followingPlayingClip,
        format : HudFormat.set
    });
}
function getPlayingSlotNumber() {
    if (debugItem.functionName) { post("--getPlayingSlotNumber--\n"); }
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
    if (debugItem.functionName) { post("                               --clipArrows--\n"); }
    switch (aWhichArrow) {
        
        case FunctionButton.dynamic_0:
            leftInClip();
            break;
            
        case FunctionButton.dynamic_1:
            rightInClip();
            break;
        
        case FunctionButton.dynamic_2:
            upInClip();
            break;
        
        case FunctionButton.dynamic_3:
            downInClip();
            break;
        default:
            post("error in clipArrows. whichArrow:", aWhichArrow, "\n");
            break;
    }
    // Future Delete this
    updateNoteDisplay();
}

function leftInClip(aHowMuch) {
    if (debugItem.functionName) { post("                               --leftInClip--\n"); }
    
    if(!aHowMuch) { aHowMuch = 1; }
    
    changeTimeOffset(-aHowMuch);    
}


function rightInClip(aHowMuch) {
    if (debugItem.functionName) { post("                               --rightInClip--\n"); }
    
    if(!aHowMuch) { aHowMuch = 1; }
    
    changeTimeOffset(aHowMuch);
}
function upInClip(aHowMuch) {
    if (debugItem.functionName) { post("                               --upInClip--\n"); }
    
    if(!aHowMuch) { aHowMuch = 1; }
    changeRowOffset(-aHowMuch);

}
function downInClip(aHowMuch) {
    if (debugItem.functionName) { post("                               --downInClip--\n"); }
    
    if(!aHowMuch) { aHowMuch = 1; }
    changeRowOffset(aHowMuch);

}

//                                  ---===Set Navigation===---
function liveSetArrows(aWhichArrow) {
    if (debugItem.functionName) { post("                               --liveSetArrows--\n"); }
    switch (aWhichArrow) {
        
        case FunctionButton.dynamic_0:
            leftInSet();
            break;
            
        case FunctionButton.dynamic_1:
            rightInSet();
            break;
        case FunctionButton.dynamic_2:
            upInSet();
            break;
        case FunctionButton.dynamic_3:
            downInSet();
            break;
        default:
            post("error in liveSetArrows. whichArrow:", aWhichArrow, "\n");
            break;
    }
    updateNoteDisplay();
}

function upInSet(aHowMuch) {
    if (debugItem.functionName) { post("                               --upInSet--\n"); }
    if(!aHowMuch) { aHowMuch = 1; }

    if (debugItem.endValue) { post("clipScene before upInSet:", getClipScene(), "\n"); }
    
    changeClipScene(-aHowMuch);
    if (debugItem.functionEnd) { post("clipScene after upInSet:", parameter.clipScene.value, "\n"); }
}

function downInSet(aHowMuch) {
    if (debugItem.functionName) { post("                               --downInSet--\n"); }
    
    if(!aHowMuch) { aHowMuch = 1; }
    if (debugItem.functionEnd) { post("clipScene before downInSet:", getClipScene(), "\n"); }

    changeClipScene(aHowMuch);

    if (debugItem.functionEnd) { post("clipScene after downInSet:", parameter.clipScene.value, "\n"); }
}

function rightInSet(aHowMuch) {
    if (debugItem.functionName) { post("                               --rightInSet--\n"); }
    
    if(!aHowMuch) { aHowMuch = 1; }
    if (debugItem.startValue) {
        post("trackIndex before rightInSet:", getTrackIndex(), "\n");
    }
    if (debugItem.startValue) {    post("track before rightInSet:", trackArray[parameter.trackIndex.value], "\n"); }
    
    changeTrackIndex(aHowMuch);
    focusOnClip();
    
    if (debugItem.endValue) { post("trackIndex after rightInSet:", parameter.trackIndex.value, "\n"); }
    if (debugItem.startValue) {    post("track after rightInSet:", trackArray[parameter.trackIndex.value], "\n"); }
}
function leftInSet(aHowMuch) {
    if (debugItem.functionName) { post("                               --leftInSet--\n"); }
    if(!aHowMuch) { aHowMuch = 1; }
    if (debugItem.startValue) {
        post("trackIndex before leftInSet:", getTrackIndex(), "\n");
    }
    if (debugItem.startValue) {    post("track before leftInSet:", trackArray[parameter.trackIndex.value], "\n"); }

    changeTrackIndex(-aHowMuch);
    focusOnClip();

    if (debugItem.endValue) { post("trackIndex after leftInSet:", parameter.trackIndex.value, "\n"); }
    if (debugItem.startValue) {    post("track after leftInSet:", trackArray[parameter.trackIndex.value], "\n"); }
}

//                                  ---===Communicate with Patcher===---
function sendToHud(aObject) {
    
    var lOutlet = 2,
        aKey = aObject.key,
        aValue = aObject.value,
        aFormat = (aObject.format === undefined) ? 0 : aObject.format,
        aSlot = (aObject.slot === undefined) ? null : aObject.slot;
        
    
    if (debugItem.functionName) { post("                               --sendToHud - " + aKey + " --\n"); }
    if (debugItem.arguments) { post("aKey:", aKey, "aValue:", aValue, "aFormat:", aFormat, "\n"); }
    
    switch (aFormat) {
        case HudFormat.set:
            outlet(lOutlet, aKey, "set", aValue);
            break;
        case HudFormat.trigger:
            outlet(lOutlet, aKey, aValue);
            break;
        case HudFormat.symbol:
            outlet(lOutlet, aKey, "setsymbol", aValue);
            break;
        case HudFormat.measures:
            outlet(lOutlet, aKey, "set", aValue, (aValue == 1) ? "measure" : "measures");
            break;
        default: 
            post("error in sendToHud. aFormat:", aFormat, "\n");
            break;
    }
}

//                                  ---===Monome Device Methods===---
function setMonomeWidth(aWidth) {
    if (debugItem.getSetName) { post("                               --setMonomeWidth--\n"); }

    setParameterProperty({
        key: "monomeWidth",
        value: aWidth
    });
    buildMonome();
    updateMonome();
}
function setMonomeHeight(aHeight) {
    if (debugItem.getSetName) { post("                               --setMonomeHeight--\n"); }
    setParameterProperty({
        key : "monomeHeight",
        value : aHeight
    });
    buildMonome();
    updateMonome();
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
    if (debugItem.functionName) { post("                               --buildMonome--\n"); }
    if (debugItem.functionEnd) { post("buildMonome called\n"); }
    if (debugItem.startValue) {
        post("monomeWidth:", parameter.monomeWidth.value, "\n");
        post("monomeHeight:", parameter.monomeHeight.value, "\n");
    }
    
    for (var iCol = 0; iCol < parameter.monomeWidth.value; iCol++) {
        Monome[iCol] = [];
        for (var iRow = 0; iRow < parameter.monomeHeight.value; iRow++) {
            Monome[iCol][iRow] = new SingleCell(iCol , iRow, 0);
        }
        if (debugItem.startValue) { post("Monome[", iCol, "].length:", Monome[iCol].length, "\n"); }
    }
    if (debugItem.startValue) { post("Monome.length (width):", Monome.length, "\n"); }
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
            default :
                break;
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
            default :
                break;
        }
};

function refreshMonome() {
    if (debugItem.functionName) { post("                               --refreshMonome--\n"); }
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
    if (debugItem.getSetName) { post("                               --setCycles--\n"); }
    
    setParameterProperty({
        key : "cycles",
        value : aNewCycleCount
    });

    onScaleVariableChange();
}

//                                  ---===rootNote accessors===---
function setRootNote(aNewRoot) {
    if (debugItem.getSetName) { post("                               --setRootNote--\n"); }

    setParameterProperty({
        key : "rootNote",
        value : aNewRoot
    });

    onScaleVariableChange();
}

//                                  ---===onScaleVariableChange===---
function onScaleVariableChange () {
    if (debugItem.getSetName) { post("                               --onScaleVariableChange--\n"); }

    if (debugItem.list) { post("my name is:", parameter.currentScaleName.value, "\n"); }

    if(parameter.currentScaleName.value != "Drums") {
        setCurrentScaleWithSymbol(parameter.currentScaleName.value);
    }
}
//                                  ---===Scale Methods===---

function generateFullScaleList(aMapString) {
    if (debugItem.functionName) { post("                               --generateFullScaleList--\n"); }
    
    if (debugItem.list) { post("maps[" + aMapString + "].value:", maps[aMapString].value, "\n"); }     

    var scaleMap = maps[aMapString].value.slice(0); //because i will manipulate this array
    var distanceToSecondRoot = scaleMap.pop(); // the last note is only needed for distance calculation
    if (debugItem.list) { post("distanceToSecondRoot:", distanceToSecondRoot, "\n");       }
    
    
    var scaleLength = scaleMap.length;
    if (debugItem.endValue) { post("scaleLength:", scaleLength, "\n"); }
    
    var numberOfNotes = scaleLength * parameter.cycles.value + 1; //root on top
    if(debugItem.startValue) { post("numberOfNotes:", numberOfNotes, "\n"); }
    //i assume the scale starts at 0.
    // the distance to the root is needed more than 0
    scaleMap[0] = distanceToSecondRoot; 

    if (debugItem.list) { post("scaleMap:", scaleMap, "\n"); }
    
    var scaleNoteList = [];
    
    scaleNoteList.push(parseInt(parameter.rootNote.value, 10));
    if (debugItem.list) { post("root", parameter.rootNote.value, "\n"); }
    
    for (var n = 1; n < numberOfNotes; n++) {
        var noteNumberInQuestion = scaleNoteList[(n - 1)] + scaleMap[(n % scaleLength)];
        
        if (debugItem.list) { post("noteNumberInQuestion:", noteNumberInQuestion, "\n"); }
        
        if (isValidCCNumber(noteNumberInQuestion)) { 
            scaleNoteList.push(noteNumberInQuestion);
            
            if (debugItem.list) { 
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
    if(debugItem.startValue) { post("scaleNoteList:" + scaleNoteList, "\n"); }
    return scaleNoteList;
}

function setCurrentScale(aScaleToUse, aScaleName) {
    if (debugItem.getSetName) { post("                     --setCurrentScale--\n"); }
    
    if (parameter.currentScale.value != aScaleToUse) {
        parameter.currentScale.value = aScaleToUse;
        setCurrentScaleName(aScaleName);
        updateNoteDisplay();
    }
}

function setCurrentScaleName(aNewName) {
    if (debugItem.getSetName) { post("                     ---setCurrentScaleName-\n"); }
    parameter.currentScaleName.value = aNewName;
    this.patcher.getnamed("currentScaleNameGsCssPattr").message(parameter.currentScaleName.value);
}

function setCurrentScaleFromMap(aMapToUse) {
    setCurrentScale(generateFullScaleList(aMapToUse, 48, 4) );
}

function isValidCCNumber (aNumberInQuestion) {
    if ((0 <= aNumberInQuestion) && (aNumberInQuestion <= 127) && (aNumberInQuestion % 1 == 0)) {
        return true;
    }
    else { return false;}
}

function setCurrentScaleWithSymbol(aSymbolFromPatcher) {
    if (debugItem.functionName) { post("                               --setCurrentScaleWithSymbol--\n"); }
    if (debugItem.startValue) { post("           aSymbolFromPatcher:", aSymbolFromPatcher, "\n"); }
    if (!thereIsAClipInSlot) { return; }

    if (aSymbolFromPatcher == "Drums") {
        setCurrentScale(defaultDrumScale, aSymbolFromPatcher);
    }
    
    setCurrentScale(generateFullScaleList(aSymbolFromPatcher), aSymbolFromPatcher);

    if (debugItem.startValue) { post("aSymbolFromPatcher at end:", aSymbolFromPatcher, "\n"); }
}

function setInSuite(aNewValue) {
    setParameterProperty({
        key : "inSuite",
        value : aNewValue
    });
}

function setParameterProperty(aObject) {
post("aObject.key:", aObject.key, "\n");
    var aProperty = parameter[aObject.key],
        aValue = aObject.value,
        aSlot = (aObject.slot === undefined) ? null : aObject.slot,
        lPatcherObjectNameString,
        lValue,
        lMinimum = (aProperty.minValue instanceof Function) ? aProperty.minValue() : aProperty.minValue,
        lMaximum = (aProperty.maxValue instanceof Function) ? aProperty.maxValue() : aProperty.maxValue;
    
    //check validity of aValue
    if ((aProperty.type === "number") || (aProperty.type === "toggle") || (aProperty.type === "slotArray")) {
        if ((aValue >= lMinimum) && (aValue <= lMaximum)) { lValue = aValue; }
        else if (aValue < lMinimum) { lValue = lMinimum; }
        else if (aValue > lMaximum) { lValue = lMaximum; }
        else { post("something has gane awry in setParameterProperty!\n"); }
    }
    else { lValue = aValue; }

    //update HUD
    if (aProperty.type == "slotArray") {
        aProperty.value[aSlot] = lValue;
        sendToHud({
            key : aProperty.name,
            value : aProperty.value[aSlot],
            format : HudFormat.slotSet,
            slot : aSlot
        });
    }
     else {
        aProperty.value = lValue;
        sendToHud({
            key : aProperty.name,
            value : aProperty.value,
            format : HudFormat.set
        });
    }
    
    // Save it.
    if (aProperty.saveInPattr) {
        patcherObjectNameString = aProperty.name + parameter.patchString + "Pattr";
        this.patcher.getnamed(patcherObjectNameString).setvalueof(aProperty.value);
    }
}

function changeParameterProperty(aPropertyString, aAmount) {

    setParameterProperty({
        key : aPropertyString,
        value : parameter[aPropertyString].value + aAmount
    });
}

function toggleParameterProperty(aPropertyString) {
    if (parameter[aPropertyString].type == "toggle") {
        setParameterProperty({
            key : aPropertyString,
            value : Number(!Boolean(parameter[aPropertyString].value))
        });
    }
    else { post(aPropertyString, "is not a toggle parameter\n");}
}

function grabPattrValue(aProperty) {
    if (debugItem.functionName) { post("                     --grabPattrValue--\n"); }
    
    var lPatcherObjectNameString = aProperty.name + parameter.patchString + "Pattr",
        lValue;
        
    if (debugItem.startValue) { post(aProperty.name + ".value:", aProperty.value, "\n"); }
    if (debugItem.localValue) { post("lPatcherObjectNameString:", lPatcherObjectNameString, "\n"); }
    
    switch (aProperty.type) {
        case "number" : 
            /*jsl:fallthru*/
        case "toggle" :
            lValue = Number(this.patcher.getnamed(lPatcherObjectNameString).getvalueof());
            break;
        case "string" :
            lValue = String(this.patcher.getnamed(lPatcherObjectNameString).getvalueof());
            break;
        case "slotArray" :
            lValue = Array(this.patcher.getnamed(lPatcherObjectNameString).getvalueof());
            break;
        default :
            post(aProperty.name + ".type:", aProperty.type , "\n");
            break;
    }
    
    if (debugItem.localValue) { post("lValue from " + lPatcherObjectNameString + ":", lValue, "\n"); }
    
    aProperty.value = lValue;
    sendToHud({
        key : aProperty.name,
        value : aProperty.value,
        format : HudFormat.set
    });
        
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
    if (debugItem.functionName) { post("                               --freebang--\n"); }
    if (debugItem.list) { postPattrs("end"); }
    if (mWatchSet) { mWatchSet = null; }
    if (mCountAllTracks) { mCountAllTracks = null; }
    if (mWatchSetTracks) { mWatchSetTracks = null; }
    if (mWatchSetPlaying) { mWatchSetPlaying = null; }
    if (checkForClip) { checkForClip = null; }
    if (editClip) { editClip = null; }
    if (watchTrack) { watchTrack = null; }
    if (watchTrackForPlayingClip) { watchTrackForPlayingClip = null; }
    if (watchClipNotes) { watchClipNotes = null; }
    if (watchClipPlayingStatus) { watchClipPlayingStatus = null; }
    if (watchClipIsPlaying) { watchClipIsPlaying = null; }
    if (watchClipPlayhead) { watchClipPlayhead = null; }
}