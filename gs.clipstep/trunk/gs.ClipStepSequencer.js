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


/*jslint white:false, undef:false */
/*globals post : false, inlets : true, outlets : true, outlet : false, inlet : false, autowatch : true */


//                                  ---===Patcher/MaxMSP Stuff===---
autowatch = 1;

inlets = 1;
outlets = 3;

var gThis = this,
    gWatchSet,
    gCountAllTracks,
    gTrackArray,
    gWatchSetPlaying,
    glob,
    gIndexTrack,
    gWatchersCreated = false,

    gWatchSetTracks, //not an attribute
    gThereIsAClipInSlot, // not an attribute

    gDebugItem = {
        endValue : false,
        frequentItem : false,
        frequentList: false,
        frequentName : false,
        functionArguments : false,
        functionName : false,
        list : false,
        loading : false,
        localValue : false,
        startValue : false

    },

        gMaps = {
        Major : {
            value : [0, 2, 2, 1, 2, 2, 2, 1],
            name: "Major"
        },
        NaturalMinor: {
            value : [0, 2, 1, 2, 2, 1, 2, 2],
            name: "NaturalMinor"
        },
        HarmonicMinor: {
            value : [0, 2, 1, 2, 2, 1, 3, 1],
            name: "HarmonicMinor"
        },
        Chromatic: {
            value : [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            name: "Chromatic"
        },
        MinorPentatonic: {
            value : [0, 3, 2, 2, 3, 2],
            name: "MinorPentatonic"
        },
        MajorPentatonic: {
            value : [0, 2, 2, 3, 2, 3],
            name: "MajorPentatonic"
        },
        BluesPentatonic: {
            value : [0, 3, 2, 1, 1, 3, 2],
            name: "BluesPentatonic"
        },
        Ionian: {
            value : [0, 2, 2, 1, 2, 2, 2, 1],
            name: "Ionian"
        },
        Dorian: {
            value : [0, 2, 1, 2, 2, 2, 1, 2],
            name: "Dorian"
        },
        Phrygian: {
            value : [0, 1, 2, 2, 2, 1, 2, 2],
            name: "Phrygian"
        },
        Lydian: {
            value : [0, 2, 2, 2, 1, 2, 2, 1],
            name: "Lydian"
        },
        Mixolydian: {
            value : [0, 2, 2, 1, 2, 2, 1, 2],
            name: "Mixolydian"
        },
        Aeolian: {
            value : [0, 2, 1, 2, 2, 1, 2, 2],
            name: "Aeolian"
        },
        Locrian: {
            value : [0, 1, 2, 2, 1, 2, 2, 2],
            name: "Locrian"
        },
        WholeTone: {
            value : [0, 2, 2, 2, 2, 2],
            name: "WholeTone"
        },
        WholeHalfDiminished: {
            value : [0, 2, 1, 2, 1, 2, 1, 2],
            name: "WholeHalfDiminished"
        },
        HalfWholeDiminished: {
            value : [0, 1, 2, 1, 2, 1, 2, 1],
            name: "HalfWholeDiminished"
        },
        SymmetricalAugmented: {
            value : [0, 3, 1, 3, 1, 3, 1],
            name: "SymmetricalAugmented"
        },
        Tritone: {
            value : [0, 3, 2, 3, 1, 3, 2],
            name: "Tritone"
        },
        MajorQuartal: {
            value : [0, 5, 6, 5, 5, 5, 5, 5],
            name: "MajorQuartal"
        },
        MinorQuartal: {
            value : [0, 5, 5, 5, 5, 6, 5, 5],
            name: "MinorQuartal"
        },
        //                                  ---===Drum Mapping===---
        Drums: {
            value : [36, 37, 38, 41, 42, 44, 45, 46, 48, 50, 53, 55, 56, 57, 59],
            name: "Drums"
        }
    },

    cHudFormat = {
        set : 0,
        trigger : 1,
        symbol : 2,
        measures : 3,
        slotSet : 4,
        slotTrigger : 5,
        slotSymbol : 6
    },
    
    cVelocityOption = {
        _0 : 0,
        _1 : 24,
        _2 : 48,
        _3 : 64,
        _4 : 80,
        _5 : 96,
        _6 : 112,
        _7 : 127
    },

    cLengthOption = {
        _0 : 0.03125,
        _1 : 0.0625,
        _2 : 0.125,
        _3 : 0.25,
        _4 : 0.5,
        _5 : 1,
        _6 : 2,
        _7 : 4
    },

    cDisplayWidthOption = {
        _0 : 0.5,
        _1 : 1,
        _2 : 2,
        _3 : 4,
        _4 : 8,
        _5 : 16,
        _6 : 32,
        _7 : 64
    },

//                                  ---===Monome Setup===---

    gMonome = [],

    cFunctionButton = {
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
    },

    cFunctionMode = {
        moveMode: 0,
        lengthMode: 1,
        velocityMode: 2,
        widthMode: 3
    },

//                                  ---===Create Empty Arrays===---
    gNoteArray = [],
    gDisplayNoteList = [],
    gClipNotes = [],


//                                  ---===conditions===---
    gPlayheadVisible = false,
    gFollowingPlayingClip = false,
    gExtendedWidthOptions = false,
    gExtendedLengthOptions = false,
    gExtendedVelocityOptions = false,
        
//                                  ---===Variables===---

//                                  ---===LiveAPI placeholders===---
    gCheckForClip = false,
    gEditClip = false,
    gWatchTrack = false,
    gWatchTrackForPlayingClip = false,
    gWatchClipNotes = false,
    gWatchClipPlayingStatus = false,
    gWatchClipIsPlaying = false,
    gWatchClipPlayhead = false,
    gIndexSet = false,
    gFunctionToggle = [ false, false],
    
    gParameter = {
        clipScene : {
            name : "clipScene",
            type : "number",
            format : null,
            value : 0,
            minValue : 0,
            maxValue : function() {
                return (gWatchersCreated) ? (gWatchSet.getcount("scenes") - 1) : 2048;
            },
            saveInPattr : true,
            listeners : []
        },
        currentScale : {
            name : "currentScale",
            type : "array",
            format : null,
            value : [36, 37, 38, 41, 42, 44, 45, 46, 48, 50, 53, 55, 56, 57, 59],
            minValue : null,
            maxValue : null,
            saveInPattr : false,
            listeners : []
        },
        currentScaleName : {
            name : "currentScaleName",
            type : "string",
            format : cHudFormat.symbol,
            value : "Drums",
            minValue : null,
            maxValue : null,
            saveInPattr : true,
            listeners : []
        },
        cycles : {
            name : "cycles",
            type : "number",
            format : cHudFormat.set,
            value : 3,
            minValue : 1,
            maxValue : 127,
            saveInPattr : true,
            listeners : []
        },
        displayWidth : {
            name : "displayWidth",
            type : "number",
            format : null,
            value : 1,
            minValue : 0.00625,
            maxValue : 127,
            saveInPattr : true,
            listeners : []
        },
        width : {
            name : "width",
            type : "number",
            format : cHudFormat.set,
            value : null,
            minValue : -Infinity,
            maxValue : Infinity,
            saveInPattr : false,
            listeners : []
        },
        latest : {
            name : "latest",
            type : "number",
            format : cHudFormat.set,
            value : null,
            minValue : -Infinity,
            maxValue : Infinity,
            saveInPattr : false,
            listeners : []
        },
        clipLength : {
            name : "clipLength",
            type : "string",
            format : cHudFormat.measures,
            value : null,
            minValue : -Infinity,
            maxValue : Infinity,
            saveInPattr : false,
            listeners : []
        },
        top : {
            name : "top",
            type : "number",
            format : cHudFormat.set,
            value : null,
            minValue : -Infinity,
            maxValue : Infinity,
            saveInPattr : false,
            listeners : []
        },
        folding : {
            name : "folding",
            type : "toggle",
            format : cHudFormat.set,
            value : 0,
            minValue : 0,
            maxValue : 1,
            saveInPattr : true,
            listeners : []
        },
        foldingRowOffset : {
            name : "foldingRowOffset",
            type : "number",
            format : null,
            value : 0,
            minValue : 0,
            maxValue : function() {
                return (gWatchersCreated) ? (gDisplayNoteList.length - monomeLastRow()) : 2048;
            },
            saveInPattr : true,
            listeners : []
        },
        functionMode : {
            name : "functionMode",
            type : "number",
            format : null,
            value : 0,
            minValue : 0,
            maxValue : 4,
            saveInPattr : true,
            listeners : []
        },
        inSuite : {
            name : "inSuite",
            type : "toggle",
            format : null,
            value : 0,
            minValue : 0,
            maxValue : 1,
            saveInPattr : true,
            listeners : []
        },
        monomeHeight : {
            name : "monomeHeight",
            type : "number",
            format : cHudFormat.set,
            value : 8,
            minValue : 2,
            maxValue : 2048,
            saveInPattr : true,
            listeners : []
        },
        monomeWidth : {
            name : "monomeWidth",
            type : "number",
            format : cHudFormat.set,
            value : 8,
            minValue : 2,
            maxValue : 2048,
            saveInPattr : true,
            listeners : []
        },
        newNoteLength : {
            name : "newNoteLength",
            type : "number",
            format : cHudFormat.set,
            value : 0.125,
            minValue : 0.000390625,
            maxValue : 127,
            saveInPattr : true,
            listeners : []
        },
        newNoteVelocity : {
            name : "newNoteVelocity",
            type : "number",
            format : cHudFormat.set,
            value : 96,
            minValue : 0,
            maxValue : 127,
            saveInPattr : true,
            listeners : []
        },
        scene : {
            name : "scene",
            type : "number",
            format : cHudFormat.set,
            value : null,
            minValue : -Infinity,
            maxValue : Infinity,
            saveInPattr : false,
            listeners : []
        },
        time : {
            name : "time",
            type : "number",
            format : cHudFormat.set,
            value : null,
            minValue : -Infinity,
            maxValue : Infinity,
            saveInPattr : false,
            listeners : []
        },
        track : {
            name : "track",
            type : "number",
            format : cHudFormat.set,
            value : null,
            minValue : -Infinity,
            maxValue : Infinity,
            saveInPattr : false,
            listeners : []
        },
        trackIndex : {
            name : "trackIndex",
            type : "number",
            format : null,
            value : 0,
            minValue : 0,
            maxValue : function() {
                return (gWatchersCreated) ? (gTrackArray.length - 1) : 2048;
            },
            saveInPattr : true,
            listeners : []
        },
        rootNote : {
            name : "rootNote",
            type : "number",
            format : null,
            value : 60,
            minValue : 0,
            maxValue : 127,
            saveInPattr : true,
            listeners : []
        },
        following : {
            name : "following",
            type : "number",
            format : null,
            value : null,
            minValue : -Infinity,
            maxValue : Infinity,
            saveInPattr : false,
            listeners : []
        },
        rowOffset : {
            name : "rowOffset",
            type : "number",
            format : null,
            value : 0,
            minValue : 0,
            maxValue : function() {
                return (gWatchersCreated) ? (gDisplayNoteList.length - monomeLastRow()) : 2048;
            },
            saveInPattr : true,
            listeners : []
        },
        timeOffset : {
            name : "timeOffset",
            type : "number",
            format : null,
            value : 0,
            minValue : 0,
            maxValue : function() { 
                return (gWatchersCreated) ? (gEditClip.get("length") - gParameter.displayWidth.value) : 2048;
            },
            saveInPattr : true,
            listeners : []
        },
        patchString : "GsCss"
    };

function bang() {
    if (true) { post("    ---bang-\n"); }
    
    gMonome.row(0, "blink");
}

// Method: initialize
//      Initializes patch with current values from pattr
//
//  Note:
//      Should not be called directly.

function initialize() {
    
    if (gDebugItem.functionName) { post("    ---initialize-\n"); }
    if (gDebugItem.list) { postPattrs("start"); }
    grabAllPattrValues();
    gMonome = new Monome(gParameter.monomeWidth.value, gParameter.monomeHeight.value);
    
    gWatchSet = new LiveAPI(this.patcher, null, "live_set");
    gCountAllTracks = new LiveAPI(this.patcher, null, "live_set");
    
    updateFunctionModeLeds();
    updateMultiPurposeLeds();

    countMidiTracks();
        
    if (gDebugItem.startValue) {
        post("trackNumber:", gTrackArray[gParameter.trackIndex.value], "\n");
        post("clipScene:", gParameter.clipScene.value, "\n"); 
    }
    
    // those with callbacks 
    gWatchSetTracks = new LiveAPI(this.patcher, countMidiTracks, "live_set");
    gWatchSetTracks.property = "tracks";
    gWatchSetPlaying = new LiveAPI(this.patcher, setPlayheadVisible, "live_set");
    gWatchSetPlaying.property = "is_playing";
    
    glob = new Global("clipStepGlobalController");
    glob.setClip = setClipFromGlobal;
    
    setTrackIndexAndScene(gParameter.trackIndex.value, gParameter.clipScene.value);
    
    gWatchersCreated = true;

    updateNoteDisplay();
    
    post("gs.ClipStepSequencer finished loading\n");
}

function setClipFromGlobal(aTrack, aScene) {
    if (gDebugItem.getSetName) { post("    ---setClipFromGlobal-\n"); }
    
    var index = getIndexOfTrack(aTrack);
    if (index > -1) {
        setTrackIndexAndScene(index, aScene);
    }
}

//                                  ---===Prototype work===---

Array.prototype.inArray = function (aNumber) {
    if (gDebugItem.getSetName) { post("    --inArray-\n"); }
    
    // need this later for Folding Logic
    var g;
    if (this.indexOf( aNumber ) > -1) { g = true; }
    else if (this.indexOf( aNumber ) == -1) { g = false; }
    else { g = NaN; }
    return g;
};

Array.prototype.noteToLiveAPI = function () {
    if (gDebugItem.getSetName) { post("    --noteToLiveAPI-\n"); }
    
    // Typecasting? In javascript? Yessert!
    var timeNumber = Number(this[2]);
    this[2] = timeNumber.toFixed(12);
    var durationNumber = Number(this[3]);
    this[3] = durationNumber.toFixed(12);
    return this;
};

Number.prototype.toLength = function (aLength) {
       if (gDebugItem.getSetName) { post("    --toLength--\n"); }

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
    if (gDebugItem.getSetName) { post("    --setTrack--\n"); }

    setTrackIndex(getIndexOfTrack(aNewTrackNumber -1));    
}

//                                  ---===trackIndex accessors===---
function setTrackIndex(aNewIndexNumber) {
    if (gDebugItem.getSetName) { post("    --setTrackIndex--\n"); }
    
    setParameter({
        key : gParameter.trackIndex.name,
        value : aNewIndexNumber
    });    
    focusOnClip();
}

function changeTrackIndex(aAmount) {
    if (gDebugItem.getSetName) { post("    --changeTrackIndex--\n"); }
        
    setParameter({
        key : gParameter.trackIndex.name,
        value : gParameter.trackIndex.value + aAmount
    });
    
    focusOnClip();
}

function getIndexOfTrack(aTrackToFind) {
    if (gDebugItem.getSetName) { post("    --getTrackIndex--\n"); }

    if (gDebugItem.startValue) { post("looking for:", aTrackToFind, "\n");}
    var lIndex = gTrackArray.indexOf(aTrackToFind);

    if (lIndex != -1) {
        if (gDebugItem.startValue) { post(aTrackToFind, "is a valid midi track\n");}
        if (gDebugItem.startValue) { post(lIndex, "is it's index\n");}
        return lIndex;
    }
    
    else {
        if (gDebugItem.startValue) { post(aTrackToFind, "is not a valid midi track\n");}
        return -1;
    }
}

function setTrackIndexAndScene(aNewIndexNumber, aNewSceneNumber) {
    if (gDebugItem.getSetName) { post("    --setTrackIndex--\n"); }
    
    setParameter({
        key : gParameter.trackIndex.name,
        value : aNewIndexNumber
    });
        
    var iCounter;
    
    var lLimit = gWatchSet.getcount("scenes");

    if (lLimit != 0) { 
        for (iCounter = aNewSceneNumber; iCounter < lLimit; iCounter++) {
            setParameter({
                key : gParameter.clipScene.name,
                value : iCounter
            });
            if (focusOnClip()) { return true; }
        }
    
        for (iCounter = aNewSceneNumber; iCounter >=0; iCounter--) {
            setParameter({
                key : gParameter.clipScene.name,
                value : iCounter
            });
            if (focusOnClip()) { return true; }
        }
    
        setParameter({
            key : gParameter.clipScene.name,
            value : 0
        });
    }
        
    return false;
}

//                                  ---===rowOffset accessors===---
function setRowOffset(aNewOffsetNumber) {
    if (gDebugItem.getSetName) { post("    --setRowOffset--\n"); }

    setParameter({
        key : gParameter.rowOffset.name,
        value : aNewOffsetNumber
    });
    updateNoteDisplay();
}

function setFoldingRowOffset(aNewOffsetNumber) {
    if (gDebugItem.getSetName) { post("    --setRowOffset--\n"); }

    setParameter({
        key : gParameter.foldingRowOffset.name,
        value : aNewOffsetNumber
    });
    updateNoteDisplay();

}

function getRowOffset() {
    return (gParameter.folding.value) ? gParameter.foldingRowOffset.value : gParameter.rowOffset.value;
}

function changeRowOffset(aAmount) {
    if (gDebugItem.functionName) { post("    --changeRowOffset--\n"); }
    
    if(!aAmount) { aAmount = 1; }
            
    if (gParameter.folding.value) {
        setParameter({
            key : gParameter.foldingRowOffset.name,
            value : (gParameter.foldingRowOffset.value + aAmount)
        }); }
    else {
        setParameter({
            key : gParameter.rowOffset.name,
            value : (gParameter.rowOffset.value + aAmount)
        }); }
    
    updateNoteDisplay();
}

//                                  ---===clipScene accessors===---
function setClipScene(aNewSceneNumber) {
    if (gDebugItem.getSetName) { post("    --setClipScene--\n"); }

    setParameter({
        key : gParameter.clipScene.name,
        value : aNewSceneNumber
    });
    focusOnClip();
    
}

function setClipSceneFromPatcher(aNewSceneNumber) {
    if (gDebugItem.getSetName) { post("    --setClipSceneFromPatcher--\n"); }
    setClipScene(aNewSceneNumber - 1);
}

function changeClipScene(aAmount) {
    if (gDebugItem.getSetName) { post("    --changeClipScene--\n"); }
    
    setParameter({
        key : gParameter.clipScene.name,
        value : gParameter.clipScene.value + aAmount
    });
    
    focusOnClip();
}

function isValidClipSceneNumber() {
    if ((gParameter.clipScene.value >= 0) || (gParameter.clipScene.value < gWatchSet.getcount("scenes"))) { 
        return true;
    }
    else {
        return false;
    }
}

//                                  ---===timeOffset accessors===---
function setTimeOffset(aNewOffset){
    if (gDebugItem.getSetName) { post("    --setTimeOffset--\n"); }

    setParameter({
        key : gParameter.timeOffset.name,
        value : aNewOffset
    });
    updateNoteDisplay();

}

function changeTimeOffset(aAmount) {
    if (gDebugItem.getSetName) { post("    --changeTimeOffset-\n"); }
        
    if(!aAmount) { aAmount = gParameter.displayWidth.value; }
    else { aAmount *= gParameter.displayWidth.value; }

    setParameter({
        key : gParameter.timeOffset.name,
        value : (gParameter.timeOffset.value + aAmount)
    });
}

//                                  ---===newNoteLength accessors===---

function setNewNoteLength(aLength) {
    if (gDebugItem.getSetName) { post("    --setNewNoteLength--\n"); }
    
    setParameter({
        key : gParameter.newNoteLength.name,
        value : aLength
    });
    updateMultiPurposeLeds();
}

//                                  ---===newNoteVelocity===---

function setNewNoteVelocity(aVelocity) {
    if (gDebugItem.getSetName) { post("    ---setNewNoteVelocity-\n"); }
    
    setParameter({
        key : gParameter.newNoteVelocity.name,
        value : aVelocity
    });
}

//                                  ---===functionMode accessors===---
function setFunctionMode(aMode) {
    if (gDebugItem.functionName) { post("    --setFunctionMode--\n"); }

    setParameter({
        key : gParameter.functionMode.name,
        value : aMode
    });
    updateControlLeds();
}

function decrementFunctionMode() {
    if (gDebugItem.getSetName) { post("    --decrementFunctionMode--\n"); }
    
    changeParameterProperty("functionMode", -1);
}

function incrementFunctionMode() {
    if (gDebugItem.getSetName) { post("    --incrementFunctionMode--\n"); }
    
    changeParameterProperty("functionMode", 1);
}

function toggleFunctionBitButton(aButton) {
    if (gDebugItem.functionName) { post("    --toggleFunctionBitButton--\n"); }

    gFunctionToggle[aButton] = (gFunctionToggle[aButton]) ? false : true;
    
    // Little endian
    if ((!gFunctionToggle[0]) && (!gFunctionToggle[1]) ) {
        //00
        setFunctionMode(cFunctionMode.moveMode);
    }
    if ((gFunctionToggle[0]) && (!gFunctionToggle[1]) ) {
        //10
        setFunctionMode(cFunctionMode.lengthMode);
    }
    if ((!gFunctionToggle[0]) && (gFunctionToggle[1]) ) {
        //01
        setFunctionMode(cFunctionMode.velocityMode);
    }
    if ((gFunctionToggle[0]) && (gFunctionToggle[1]) ) {
        //11
        setFunctionMode(cFunctionMode.widthMode);
    }
}

//                                  ---===folding accessors===---
function toggleFolding() {
    if (gDebugItem.functionName) { post("    --toggleFolding--\n"); }
    
    toggleParameterProperty("folding");
}
function setFolding(aValue) {
    if (gDebugItem.getSetName) { post("    --setFolding--\n"); }
    
    setPlayheadVisible("folding", aValue);

    updateFunctionModeLeds();
    updateNoteDisplay();
}
                    
//                                  ---===Callbacks===---
function onNewSlotPlaying(aApiArray) {
    if (gDebugItem.functionName) { post("    --onNewSlotPlaying--\n"); }
    var playingClipSlot = parseInt(aApiArray[1], 10);
    if ((gFollowingPlayingClip) && (playingClipSlot >= 0)) {
        setClipScene(playingClipSlot);
        post("onNewSlotPlaying", playingClipSlot, "\n");
    }
}

function setPlayheadVisible() {
    if (gDebugItem.getSetName) { postst("                               --setPlayheadVisible--\n"); }
    if (!gThereIsAClipInSlot) { return; }
    
       clipPlaying = gWatchClipIsPlaying.get("is_playing");
    setPlaying = gWatchSet.get("is_playing");
   
    if ((setPlaying == 1) && (clipPlaying == 1)) { gPlayheadVisible = true; }
    else { 
        gPlayheadVisible = false;
        gMonome.refresh();
    }

    if(gDebugItem.endValue) { 
        post("gPlayheadVisible:", gPlayheadVisible, "\n");
    }

}

function setDisplayWidth(aWidth) {
    if (gDebugItem.getSetName) { post("    --setDisplayWidth--\n"); }

    setParameter({
        key : gParameter.displayWidth.name,
        value : aWidth
    });
    
    roundDisplayOffset();
    updateNoteDisplay();
    if (gParameter.functionMode.value == cFunctionMode.widthMode) {
        updateMultiPurposeLeds();
    }

}

function updatePlayhead(aTimeNumber) {
    var playheadTimeInt = Math.floor((aTimeNumber[1] - gParameter.timeOffset.value) * displayRatioToMonome()),
        mMonome = gMonome;
    
    if (gDebugItem.frequentName) { post("    --updatePlayhead--\n"); }
    // View
    if (gPlayheadVisible) {

        if((playheadTimeInt == -1) || (playheadTimeInt == gParameter.monomeWidth.value)) {
            mMonome[monomeLastCol()][0].tempOff();            
        }
        else if(playheadTimeInt == 0) {                      
            mMonome[playheadTimeInt][0].blink();
        }
        else if((0 < playheadTimeInt) && (playheadTimeInt < gParameter.monomeWidth.value)) {
            mMonome[playheadTimeInt][0].blink();
            mMonome[playheadTimeInt -1][0].tempOff();
        }

        if (playheadTimeInt % 4 == 0) {
            mMonome.row(0, "tempOff");
        }
    }
}
updatePlayhead.immediate = 1;


function countMidiTracks() {
    
    var j, lTrackCount;
    
    if (gDebugItem.functionName) { post("    --countMidiTracks--\n"); }
    
    gTrackArray = [];
    lTrackCount = gCountAllTracks.getcount("tracks");
    
    if (gDebugItem.localValue) { post("lTrackCount:", lTrackCount, "\n"); }

    for (j = 0; j < lTrackCount; j++) {
        if (gIndexSet) { gIndexSet.goto("live_set tracks " + j); }
        else { gIndexSet = new LiveAPI(this.patcher, null, "live_set tracks " + j ); }
        if (gIndexSet.get("has_midi_input") == 1) {
            gTrackArray.push(j);                      
        }
    }
    
    if (gDebugItem.endValue) {
        post("there are ", gTrackArray.length, " midi tracks\n");
        post("they are:", gTrackArray, "\n");
    }
    if (!gThereIsAClipInSlot) { focusOnClip(); }
}

function countScenesWithClip() {
    
    // TODO - i can't implement this unless i figure out a way to observe a TRACK for an added clip.
    // or i can observe every slot in the current track, but that won't scale. at all.
    
    if (gDebugItem.functionName) { post("    --countScenesWithClip--\n"); }
    sceneArray = [];
    sceneCount = gCountAllTracks.getcount("scenes");
    for (var k = 0; k < sceneCount; k++) {
        if (gIndexTrack) { gIndexTrack.goto("live_set tracks " + gTrackArray[gParameter.trackIndex.value] + "clip_slots" + k); }
        else { gIndexTrack = new LiveAPI(this.patcher, null, "live_set tracks " + gTrackArray[gParameter.trackIndex.value] + "clip_slots" + k); }
        
        if (gIndexTrack.get("has_midi_input") == 1 ) {
            sceneCount.push(k);                      
        }
    }
    
    var c = sceneArray.length;
    if (gDebugItem.startValue) {
        post("there are ", c, " scenes with clips in current track\n");
        post("they are:", sceneArray, "\n");
    }
}

function compareNumbers(a, b) {
    // need this later for Array.sort(compareNumbers)        
    return b - a;
}

function roundDisplayOffset() {
    if (gDebugItem.functionName) { post("    --roundDisplayOffset--\n"); }
    if(gDebugItem.startValue) { post("before round", gParameter.timeOffset.value,  "\n"); }
    var a = Math.round(gParameter.timeOffset.value / gParameter.displayWidth.value);
    gParameter.timeOffset.value = a * gParameter.displayWidth.value;
    if(gDebugItem.endValue) {post("after round", gParameter.timeOffset.value,                   "\n"); }
}

//                                  ---===Dynamic Time/Column Variables===---
function displayTimeMax() { return gParameter.displayWidth.value + gParameter.timeOffset.value; }
function colOffset() { return gParameter.timeOffset.value * displayRatioToMonome(); }
function displayRatioFromMonome() { return gParameter.displayWidth.value / gParameter.monomeWidth.value; }
function displayRatioToMonome() { return gParameter.monomeWidth.value / gParameter.displayWidth.value; }
function monomeLastRow() { return gParameter.monomeHeight.value - 1; }
function monomeLastCol() { return gParameter.monomeWidth.value - 1; }

function displayRowMax() {
    var currentOffset = (gParameter.folding.value) ? gParameter.foldingRowOffset.value : gParameter.rowOffset.value;
    return monomeLastRow() + currentOffset;
}

//                                  ---===LiveApi Calls===---
function focusOnClip() {
    if (gDebugItem.functionName) { post("    --focusOnClip--\n"); }          
    
    if (gDebugItem.functionArguments) { post("gTrackArray[" + gParameter.trackIndex.value + "]:", gTrackArray[gParameter.trackIndex.value], "\n"); }

    if (gCheckForClip) { gCheckForClip.goto("live_set tracks " + gTrackArray[gParameter.trackIndex.value] + " clip_slots " + gParameter.clipScene.value); }
    else { gCheckForClip = new LiveAPI(this.patcher, null, "live_set tracks " + gTrackArray[gParameter.trackIndex.value] + " clip_slots " + gParameter.clipScene.value); }
    
    gThereIsAClipInSlot = (gCheckForClip.get("has_clip") == 1) ? true: false;
    
    if (gDebugItem.list) { post("gThereIsAClipInSlot: ", gTrackArray[gParameter.trackIndex.value], gParameter.clipScene.value, gThereIsAClipInSlot, "\n"); }

    if (!gThereIsAClipInSlot) { return false; }

    if (gEditClip) { gEditClip.goto("live_set tracks " + gTrackArray[gParameter.trackIndex.value] + " clip_slots " + gParameter.clipScene.value + " clip"); }
    else { gEditClip = new LiveAPI(this.patcher, null, "live_set tracks " + gTrackArray[gParameter.trackIndex.value] + " clip_slots " + gParameter.clipScene.value + " clip"); }
    
    if (gWatchTrack) { gWatchTrack.goto("live_set tracks " + gTrackArray[gParameter.trackIndex.value]); }
    else { gWatchTrack = new LiveAPI(this.patcher, null, "live_set tracks " + gTrackArray[gParameter.trackIndex.value]); }

    if (gWatchTrackForPlayingClip) { gWatchTrackForPlayingClip.goto("live_set tracks " + gTrackArray[gParameter.trackIndex.value]); }
    else { gWatchTrackForPlayingClip = new LiveAPI(this.patcher, onNewSlotPlaying, "live_set tracks " + gTrackArray[gParameter.trackIndex.value]); }
    gWatchTrackForPlayingClip.mode = 0; // in case the track is moved
//              gWatchTrackForPlayingClip.property = "playing_slot_index";

    if (gWatchClipNotes) { gWatchClipNotes.goto("live_set tracks " + gTrackArray[gParameter.trackIndex.value] + " clip_slots " + gParameter.clipScene.value + " clip"); } 
    else { gWatchClipNotes = new LiveAPI(this.patcher, updateNoteDisplay,  "live_set tracks " + gTrackArray[gParameter.trackIndex.value] + " clip_slots " + gParameter.clipScene.value + " clip"); }
    gWatchClipNotes.mode = 0; // in case the track is moved
    gWatchClipNotes.property = "notes";

    if (gWatchClipPlayingStatus) { gWatchClipPlayingStatus.goto("live_set tracks " + gTrackArray[gParameter.trackIndex.value] + " clip_slots " + gParameter.clipScene.value + " clip"); }
    else { gWatchClipPlayingStatus = new LiveAPI(this.patcher, setPlayheadVisible, "live_set tracks " + gTrackArray[gParameter.trackIndex.value] + " clip_slots " + gParameter.clipScene.value + " clip"); }
    gWatchClipPlayingStatus.mode = 0; // in case the track is moved
    gWatchClipPlayingStatus.property = "playing_status";

    if (gWatchClipIsPlaying) { gWatchClipIsPlaying.goto("live_set tracks " + gTrackArray[gParameter.trackIndex.value] + " clip_slots " + gParameter.clipScene.value + " clip"); }
    else { gWatchClipIsPlaying = new LiveAPI(this.patcher, null,  "live_set tracks " + gTrackArray[gParameter.trackIndex.value] + " clip_slots " + gParameter.clipScene.value + " clip"); }
    gWatchClipIsPlaying.mode = 0; // in case the track is moved

    if (gWatchClipPlayhead) { gWatchClipPlayhead.goto("live_set tracks " + gTrackArray[gParameter.trackIndex.value] + " clip_slots " + gParameter.clipScene.value + " clip"); }
    else { gWatchClipPlayhead = new LiveAPI(this.patcher, updatePlayhead,  "live_set tracks " + gTrackArray[gParameter.trackIndex.value] + " clip_slots " + gParameter.clipScene.value + " clip"); }
    gWatchClipPlayhead.mode = 0; // in case the track is moved
    gWatchClipPlayhead.property = "playing_position";

    setPlayheadVisible();

    if (gDebugItem.functionEnd) { post("focused on clip:", gWatchClipNotes.path, "\n"); }
    return true;
}

function getCurrentPosition() {
    if (gDebugItem.functionName) { post("    --getCurrentPosition--\n"); }
    post("gWatchClipNotes.path = ", gWatchClipNotes.path, "\n");
    post("clipScene = ", getClipScene(), "\n");
    var currentPathArray = gWatchClipNotes.path.split(" ");
    // Get current track number
    var currentTrackNumber = parseInt(currentPathArray[2], 10);
    gParameter.trackIndex.value = gTrackArray.indexOf(currentTrackNumber);
    
    // Debugging is Fun!
    if (gDebugItem.functionEnd) { post("current track number is:", currentTrackNumber, "\n"); }
    if (gDebugItem.startValue) { post("trackIndex is:", gParameter.trackIndex.value, "\n"); }
    
    // Get current scene number
    var currentSceneNumber = parseInt(currentPathArray[4], 10);
    post("currentSceneNumber = ", currentSceneNumber, "\n");
    if (gParameter.clipScene.value != currentSceneNumber) {
        if (gDebugItem.endValue) { post("clipScene changed from:", gParameter.clipScene.value, "to:", currentSceneNumber, "\n"); }
        gParameter.clipScene.value = currentSceneNumber;
    }
    setParameter({
        key : gParameter.track.name,
        value : gTrackArray[gParameter.trackIndex.value] + 1
    });
    setParameter({
        key : gParameter.scene.name, 
        value : Number(gParameter.clipScene.value) + 1
    });
}

function playCurrentClip() {
    gEditClip.call("fire");
}


//                                  ---===Check Notes===---
function timeIsDisplayed(aTimeInQuestion) {
    if (gDebugItem.list) { post("    --timeIsDisplayed--\n"); }
    if ((gParameter.timeOffset.value <= aTimeInQuestion) && (aTimeInQuestion < displayTimeMax())) {
        return true;
    }
    else {
        return false;
    }
}

function rowIsDisplayed(aRowInQuestion) {
    if (gDebugItem.list) { post("    --rowIsDisplayed--\n"); }
    var currentOffset = (gParameter.folding.value) ? gParameter.foldingRowOffset.value : gParameter.rowOffset.value;
    if (currentOffset <= aRowInQuestion && (aRowInQuestion < displayRowMax())) {
        return true;
    }
    else {
        return false;
    }
}

function doesCoincide(aArray, aTone, aTime) {
    if (gDebugItem.functionName) { post("    --doesCoincide--\n"); }
    var x, l;
    var a = [];
    for ( x = 0, l = aArray.length; x < l; x++) {
        
        // Debug
        if (gDebugItem.startValue) {
            post("checked note:", x, "in gNoteArray\n");
            post("for aTone:", aTone, " and aTime:", aTime, "\n");
        }
        
        if ((aArray[x][1] == aTone) && (aArray[x][2] == aTime)) {
            if (gDebugItem.functionEnd) { post("found! note:", x, "in gNoteArray\n"); }
            a = [true, x];
            return a;
        }
        
        if (gDebugItem.startValue) {
            post("nope\n");
        }
        
    }
    a = [false];
    return a;
}


//                                  ---===LiveAPI Note Manipulation===---
function getClipNotes() {
    var a,
        b,
        mNoteArray = gNoteArray,
        sliceIndexLeft,
        sliceIndexRight;
    
    if (gDebugItem.functionName) { post("    --getClipNotes--\n"); }
    
    if(!gThereIsAClipInSlot) { return; }
    
    if (gEditClip.get("is_midi_clip") != 1) {
        post("not a midi clip\n");
        post("gEditClip.get(is_midi_clip):", gEditClip.get("is_midi_clip"), "\n" );
        return;
    }
    // insert if statement to check if there is a clip
    
    gEditClip.call("select_all_notes");
    
    gClipNotes.length = 0;
    gClipNotes = gEditClip.call("get_selected_notes");
    gClipNotes.shift();
    
    numberOfNotesInClip = NaN;
    numberOfNotesInClip = gClipNotes.shift();
    
    gDisplayNoteList.length = 0;
    mNoteArray.length = 0;

    // Debugging!
    if (gDebugItem.endValue == true) { post("there are:", numberOfNotesInClip, " notes\n"); }
        
    for (a = 0, elementsInNoteList = 0; a < numberOfNotesInClip; a++) {
        sliceIndexLeft = a * 6;
        sliceIndexRight = a * 6 + 6;
        mNoteArray[a] = gClipNotes.slice(sliceIndexLeft, sliceIndexRight);
        
        // Folding Logic
        if (!gDisplayNoteList.inArray(mNoteArray[a][1])) {
            gDisplayNoteList.push(mNoteArray[a][1]);
            
            // Debug
            if (gDebugItem.list) { post(mNoteArray[a][1] + " added to gDisplayNoteList \n"); }
        }
        
        if (gDebugItem.list) {
            post( "gDisplayNoteList.inArray(mNoteArray[" + a + "][1]) = " + gDisplayNoteList.inArray(mNoteArray[a][1]) + "\n" );
        }
        
        // Debug statements
        if (gDebugItem.list) {
            post(a);
            //if (gDebugItem.list) {
                post("timeNumber is:" + mNoteArray[a][2], "\n");
                post("durationNumber is:" + mNoteArray[a][3], "\n");
                post("sliceIndex is:", sliceIndexLeft, "\n");
            //}
            post(mNoteArray[a], "\n");
        }
    }

    if (gDebugItem.startValue) { post("gDisplayNoteList before padding =", gDisplayNoteList, '\n'); }
    if (!gParameter.folding.value) { fillInNoteRows(); }
    gDisplayNoteList.sort(compareNumbers);
    if (gDebugItem.endValue) { post("gDisplayNoteList after padding =", gDisplayNoteList, '\n'); }
    gClipNotes = gEditClip.call("deselect_all_notes");
    mNoteArrayChecked = true;
    
    if (gDebugItem.functionEnd) { post("           /getClipNotes\n"); }
}

function publishNoteArray() {
    if (gDebugItem.functionName) { post("    --publishNoteArray--\n"); }
    // Model Controller
    var mNoteArray = gNoteArray,
        newLength = mNoteArray.length;
    
    gEditClip.call("select_all_notes");//CALL
    gEditClip.call("replace_selected_notes");//CALL
    gEditClip.call("notes", newLength); //CALL
    
    if (gDebugItem.startValue) { post("newLength:", newLength, "\n"); }
    if (gDebugItem.startValue) { post("replace_selected_notes\n"); }
    
    var l, j;
    for (l = mNoteArray.length , j = 0; j < l; j++) {
        if (gDebugItem.startValue) { post(j.toLength(10), mNoteArray[j], "\n"); }
        gEditClip.call( mNoteArray[j].noteToLiveAPI() ); //CALL
    }
    
    gEditClip.call("done");
}

function addNote(aPitch, aTime, aVelocity) {
    if (gDebugItem.functionName) { post("    --addNote--\n"); }
    // Model Controller
    // simply adds one note no need to get and replace every note.
    
    var tempNoteArray = ["note", aPitch, aTime, gParameter.newNoteLength.value, aVelocity, 0];
    var newLength = gNoteArray.length + 1;

    gEditClip.call("deselect_all_notes"); // CALL
    gEditClip.call("replace_selected_notes"); // CALL
    if (gDebugItem.functionEnd) { post("replace_selected_notes\n"); }
    if (gDebugItem.startValue) {
        post("tempNoteArray:", tempNoteArray, "\n");
        post("newLength:", newLength, "\n");
        post("notes", 1, "\n");
    }
    gEditClip.call("notes", 1); // CALL

    gEditClip.call(tempNoteArray.noteToLiveAPI()); // CALL
    
    if (gDebugItem.startValue) {
        post(tempNoteArray, "\n");
        post("done\n");
    }
    gEditClip.call("done"); // CALL
}

function removeNote(aIndex) {
    if (gDebugItem.functionName) { post("    --removeNote--\n"); }
    var noteRemoved = gNoteArray.splice(aIndex, 1);
    var noteRemovedIndex = aIndex;
    if (gDebugItem.functionEnd) { post("noteRemoved:" + noteRemoved + "\n"); }
    publishNoteArray();
}

//                                  ---===View Controller Methods===---
function updateMonome() {
    if (gDebugItem.functionName) { post("    --updateMonome--\n"); }
    updateNoteDisplay();
    updateFunctionModeLeds();
    updateMultiPurposeLeds();
}

function updateNoteDisplay() {
    if (gDebugItem.functionName) { post("    --updateNoteDisplay--\n"); }

    if (gWatchersCreated) {
        gMonome.beginUpdates();
        clearNoteDisplay();
        getClipNotes();
        gNoteArray.forEach(displayNote);
        gMonome.endUpdates();
        updateHud();
    }
}

/* TODO 
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return !(a.indexOf(i) > -1);});
};

*/

function updateHud() {
    setParameter({
        key : gParameter.track.name, 
        value : (gTrackArray[gParameter.trackIndex.value] + 1)
    });
    setParameter({
        key : gParameter.scene.name,
        value : (Number(gParameter.clipScene.value) + 1)
    });
    setParameter({
        key : gParameter.time.name,
        value : gParameter.timeOffset.value / 4
    });
    setParameter({
        key : gParameter.width.name,
        value : gParameter.displayWidth.value / 4
    });
    setParameter({
        key : gParameter.top.name,
        value : (gDisplayNoteList[gParameter.rowOffset.value]) ? gDisplayNoteList[gParameter.rowOffset.value] : 0
    });
    if (gThereIsAClipInSlot) {
        setParameter({
            key : gParameter.clipLength.name,
            value : (gEditClip.get("length") /4)
        });
    }
    setParameter({
        key : gParameter.currentScaleName.name,
        value : gParameter.currentScaleName.value
    });
    setParameter({
        key : gParameter.newNoteLength.name,
        value :gParameter.newNoteLength.value
    });
    setParameter({
        key : gParameter.monomeHeight.name,
        value : gParameter.monomeHeight.value
    });
    setParameter({
        key : gParameter.monomeWidth.name,
        value : gParameter.monomeWidth.value
    });
    setParameter({
        key : gParameter.cycles.name,
        value : gParameter.cycles.value
    });
    setParameter({
        key : gParameter.rootNote.name,
        value : gParameter.rootNote.value
    });
    setParameter({
        key : gParameter.folding.name,
        value : gParameter.folding.value
    });
    setParameter({
        key : gParameter.newNoteVelocity.name,
        value : gParameter.newNoteVelocity.value
    });   
}


function updateFunctionModeLeds() {
    if (gDebugItem.functionName) { post("    --updateFunctionModeLeds--\n"); }
    clearFunctionModeLeds();
    
    switch(gParameter.functionMode.value) {
        case cFunctionMode.moveMode:
            //      00
            break;
            
        case cFunctionMode.lengthMode:
            //      10
            gMonome[cFunctionButton.bit0][monomeLastRow()].ledOn();
            break;
            
        case cFunctionMode.velocityMode:
            //      01
            gMonome[cFunctionButton.bit1][monomeLastRow()].ledOn();
            break;
            
        case cFunctionMode.widthMode:
            //      11
            gMonome[cFunctionButton.bit0][monomeLastRow()].ledOn();
            gMonome[cFunctionButton.bit1][monomeLastRow()].ledOn();
            break;
        default :
            post("error in updateFunctionModeLeds functionMode:", gParameter.functionMode.value, "\n");
            break;
    }

    if (shiftIsHeld()) {
        gMonome[cFunctionButton.shift][monomeLastRow()].ledOn();
    }
    if (gParameter.folding.value){ gMonome[cFunctionButton.fold][monomeLastRow()].ledOn(); }
}

function updateMultiPurposeLeds() {
    if (gDebugItem.functionName) { post("    --updateMultiPurposeLeds--\n"); }
    
    clearMultiPurposeLeds();
    switch(gParameter.functionMode.value) {
        case cFunctionMode.moveMode:
            // Arrows
            if (shiftIsHeld()) {
                gMonome[cFunctionButton.dynamic_0][monomeLastRow()].ledOn();
                gMonome[cFunctionButton.dynamic_1][monomeLastRow()].ledOn();
                gMonome[cFunctionButton.dynamic_2][monomeLastRow()].ledOn();
                gMonome[cFunctionButton.dynamic_3][monomeLastRow()].ledOn();
            }
            break;
        case cFunctionMode.widthMode:
        // Display width
            displayDisplayWidthLeds();
            break;
        case cFunctionMode.velocityMode:
        // Velocity
            displayVelocityLeds();
            break;
        case cFunctionMode.lengthMode:
        // Note Length
            displayLengthLeds();
            break;
        default :
            post("error in updateMultiPurposeLeds, functionMode:", gParameter.functionMode.value, "\n");
            break;
    }
    
}

function updateControlLeds() {
    if (gDebugItem.functionName) { post("    ---updateControlLeds-\n"); }
    
    updateFunctionModeLeds();
    updateMultiPurposeLeds();
}



//                                  ---===Display Methods===---
function displayDisplayWidthLeds() {
    if (gDebugItem.functionName) { post("    --displayDisplayWidthLeds--\n"); }
    if ((gParameter.functionMode.value == cFunctionMode.widthMode) && (!gExtendedWidthOptions)) {
        switch(gParameter.displayWidth.value) {
            case cDisplayWidthOption._0:
                gMonome[cFunctionButton.dynamic_0][monomeLastRow()].ledOn();
                break;
            case cDisplayWidthOption._1:
                gMonome[cFunctionButton.dynamic_1][monomeLastRow()].ledOn();
                break;
            case cDisplayWidthOption._2:
                gMonome[cFunctionButton.dynamic_2][monomeLastRow()].ledOn();
                break;
            case cDisplayWidthOption._3:
                gMonome[cFunctionButton.dynamic_3][monomeLastRow()].ledOn();
                break;
            default:
                break;
        }
    }
    else if ((gParameter.functionMode.value == cFunctionMode.widthMode) && (gExtendedWidthOptions)) {
        gMonome[cFunctionButton.shift][monomeLastRow()].ledOn();
        switch(gParameter.displayWidth.value) {
            case cDisplayWidthOption._4:
                gMonome[cFunctionButton.dynamic_0][monomeLastRow()].ledOn();
                break;
            case cDisplayWidthOption._5:
                gMonome[cFunctionButton.dynamic_1][monomeLastRow()].ledOn();
                break;
            case cDisplayWidthOption._6:
                gMonome[cFunctionButton.dynamic_2][monomeLastRow()].ledOn();
                break;
            case cDisplayWidthOption._7:
                gMonome[cFunctionButton.dynamic_3][monomeLastRow()].ledOn();
                break;
            default:
                break;
        }
    }
}

function displayLengthLeds() {
    if (gDebugItem.functionName) { post("    --displayLengthLeds--\n"); }
        
    if ((gParameter.functionMode.value == cFunctionMode.lengthMode) && (!gExtendedLengthOptions)) {
        switch(gParameter.newNoteLength.value) {
            case cLengthOption._0:
                gMonome[cFunctionButton.dynamic_0][monomeLastRow()].ledOn();
                break;
            case cLengthOption._1:
                gMonome[cFunctionButton.dynamic_1][monomeLastRow()].ledOn();
                break;
            case cLengthOption._2:
                gMonome[cFunctionButton.dynamic_2][monomeLastRow()].ledOn();
                break;
            case cLengthOption._3:
                gMonome[cFunctionButton.dynamic_3][monomeLastRow()].ledOn();
                break;
            default:
                break;
        }
    }
    else if ((gParameter.functionMode.value == cFunctionMode.lengthMode) && (gExtendedLengthOptions)) {
        gMonome[cFunctionButton.shift][monomeLastRow()].ledOn();
        switch(gParameter.newNoteLength.value) {
            case cLengthOption._4:
                gMonome[cFunctionButton.dynamic_0][monomeLastRow()].ledOn();
                break;
            case cLengthOption._5:
                gMonome[cFunctionButton.dynamic_1][monomeLastRow()].ledOn();
                break;
            case cLengthOption._6:
                gMonome[cFunctionButton.dynamic_2][monomeLastRow()].ledOn();
                break;
            case cLengthOption._7:
                gMonome[cFunctionButton.dynamic_3][monomeLastRow()].ledOn();
                break;
            default:
                break;
        }
    }
}

function displayVelocityLeds() {
    if (gDebugItem.functionName) { post("    --displayVelocityLeds--\n"); }
        
    if ((gParameter.functionMode.value == cFunctionMode.velocityMode) && (!gExtendedVelocityOptions)) {
        switch(gParameter.newNoteVelocity.value) {
            case cVelocityOption._0:
                gMonome[cFunctionButton.dynamic_0][monomeLastRow()].ledOn();
                break;
            case cVelocityOption._1:
                gMonome[cFunctionButton.dynamic_1][monomeLastRow()].ledOn();
                break;
            case cVelocityOption._2:
                gMonome[cFunctionButton.dynamic_2][monomeLastRow()].ledOn();
                break;
            case cVelocityOption._3:
                gMonome[cFunctionButton.dynamic_3][monomeLastRow()].ledOn();
                break;
            default:
                break;
        }
    }
    else if ((gParameter.functionMode.value == cFunctionMode.velocityMode) && (gExtendedVelocityOptions)) {
        gMonome[cFunctionButton.shift][monomeLastRow()].ledOn();
        switch(gParameter.newNoteVelocity.value) {
            case cVelocityOption._4:
                gMonome[cFunctionButton.dynamic_0][monomeLastRow()].ledOn();
                break;
            case cVelocityOption._5:
                gMonome[cFunctionButton.dynamic_1][monomeLastRow()].ledOn();
                break;
            case cVelocityOption._6:
                gMonome[cFunctionButton.dynamic_2][monomeLastRow()].ledOn();
                break;
            case cVelocityOption._7:
                gMonome[cFunctionButton.dynamic_3][monomeLastRow()].ledOn();
                break;
            default:
                break;
        }
    }
}

function displayNote(aNoteToDisplay, aIndex, aArray) {
    if (gDebugItem.list) { post("    --displayNote--\n"); }
    // View
    // 1 = a quarter note. 4 equals a measure.
    
    // find ratio to monome and such
    var absoluteTime = aNoteToDisplay[2].toFixed(12),
        colOnMonome = absoluteTime * displayRatioToMonome() - colOffset(),
    
    // Formatted Notes for Monome
        rowIndex = gDisplayNoteList.indexOf(aNoteToDisplay[1]),
        rowOnMonome = rowIndex - ((gParameter.folding.value) ? gParameter.foldingRowOffset.value : gParameter.rowOffset.value);
    
    if(gDebugItem.startValue) {
        post("rowIndex:", rowIndex, "\n");
        post("rowOnMonome:", rowOnMonome, "rowOffset:", gParameter.rowOffset.value, "foldingRowOffset", gParameter.foldingRowOffset.value, "\n");
        post("colOnMonome:", colOnMonome, "colOffset:", colOffset(), "\n");
    }
    
    if (( timeIsDisplayed(absoluteTime)) && (rowIsDisplayed(rowIndex)) && (colOnMonome % 1 == 0 )) {
        gMonome[colOnMonome][rowOnMonome].ledOn();
        
        // Debug Statements
        if (gDebugItem.endValue) {
            post("aNoteToDisplay:", aNoteToDisplay, "\n"); 
            post("col:", colOnMonome, "row:", rowOnMonome, "\n");
            post("absoluteTime is:", absoluteTime, "\n");
            post("colOnMonome is:", colOnMonome, "\n");
        }
    }    
}

//                                  ---===Clear Methods===---
function clearFunctionModeLeds() {
    if (gDebugItem.functionName) { post("    --clearFunctionModeLeds--\n"); }
    
    //TODO Use Min and Max
    for (var o = 4; o <= 7; o++) {
        gMonome[o][monomeLastRow()].ledOff();
    }
}

function clearMultiPurposeLeds() {
    if (gDebugItem.functionName) { post("    --clearMultiPurposeLeds--\n"); }
    for (var p = 0; p < 4; p++) {
        gMonome[p][monomeLastRow()].ledOff();
    }
}

function clearNoteDisplay() {
    if (gDebugItem.functionName) { post("    --clearNoteDisplay--\n"); }
    for (var iCol = 0; iCol < gParameter.monomeWidth.value; iCol ++) {
        for (var iRow = 0; iRow < monomeLastRow(); iRow++) {
            gMonome[iCol][iRow].ledOff();
        }
    }
    if (gDebugItem.functionEnd) { post("           /clearNoteDisplay\n"); }
}

//                                  ---===NoteList===---
function fillInNoteRows() {
    if (gDebugItem.functionName) { post("    --fillInNoteRows--\n"); }

    var numberNeeded = (gParameter.monomeHeight.value - gDisplayNoteList.length), 
        lScaleLength = gParameter.currentScale.value.length;
    for (var m = 0; m < lScaleLength; m++) {
        if (!gDisplayNoteList.inArray(gParameter.currentScale.value[m]) ) {
            gDisplayNoteList.push(gParameter.currentScale.value[m]);
            if (gDebugItem.startValue) {
                post("added row for note:", gParameter.currentScale.value[m], "\n");
            }
        }
    }
    
    if (gDebugItem.functionEnd) {
        post("gDisplayNoteList after fillInNoteRows:", gDisplayNoteList, "\n");
    }
}

//                                  ---===Controller Methods===---

// Method: press
// 
//      general method for interacting with Monome object
// 
// Parameters:
// 
//      aColumn - which column was pressed
//      aRow - which row was pressed
//      aPress - whether or not the buttons state changed to pressed (1) or released (0)
function press(aCol, aRow, aPress) {
    if (gDebugItem.functionName) { post("    --press--\n"); }
    var lOutlet = 1,
        lNewNoteTime,
        lNewNotePitch;
    
    if (gDebugItem.functionEnd) {
        post("press called.\n aCol:", aCol, "aRow", aRow, "aPress", aPress, "\n");
    }
    
    if (aPress == 1) { gMonome[aCol][aRow].push(); }
    else if (aPress == 0) { gMonome[aCol][aRow].release(); }
    
    
    if ((aRow < monomeLastRow()) && gThereIsAClipInSlot) {
        var lNewNoteTime = ( aCol + colOffset() ) * displayRatioFromMonome();
        var lNewNotePitch = gDisplayNoteList[aRow + ((gParameter.folding.value) ? gParameter.foldingRowOffset.value :gParameter.rowOffset.value)];

        // Debugging is fun!
        if (gDebugItem.functionEnd) {
            post("lNewNoteTime:", lNewNoteTime, " lNewNotePitch:", lNewNotePitch, "\n");
        }
    
        if (aPress == 1) {
            // check for note in array
            var isAlreadyInNoteArray = doesCoincide(gNoteArray, lNewNotePitch, lNewNoteTime);
    
            if (isAlreadyInNoteArray[0]) {
                    removeNote(isAlreadyInNoteArray[1]);
            }
        
            else if (!isAlreadyInNoteArray[0]) {
                    addNote(lNewNotePitch, lNewNoteTime, gParameter.newNoteVelocity.value);
            }
        }
        setParameter({
            key : "latest",
            value : lNewNotePitch
        });
    }
    // Arrow keys
    else if ((aRow == monomeLastRow()) && (aPress == 1) && (aCol >= 0) && (aCol <= 3)) {

        switch (gParameter.functionMode.value) {
            case cFunctionMode.moveMode:
                if (shiftIsHeld()) { liveSetArrows(aCol); }
                else { clipArrows(aCol); }
                break;
            case cFunctionMode.lengthMode:
                lengthButtons(aCol);
                break;
            case cFunctionMode.velocityMode:
                velocityButtons(aCol);
                break;
            case cFunctionMode.widthMode:
                widthButtons(aCol);
                break;
            default :
                post("error in press, functionMode:", gParameter.functionMode.value, "\n");
                break;
        }
    }

    else if ((aRow == monomeLastRow()) && (aCol >= 4) && (aCol <= 7)) {
        // Change arrow mode
        switch (aCol) {
            case cFunctionButton.shift:
                switch(gParameter.functionMode.value) {    
                    case cFunctionMode.moveMode:
                        updateControlLeds();
                        break;
                    case cFunctionMode.lengthMode:
                        gExtendedLengthOptions(aPress);
                        break;
                    case cFunctionMode.velocityMode:
                        showVelocityOptions(aPress);
                        break;               
                    case cFunctionMode.widthMode:
                        showWidthOptions(aPress);
                        break;
                    default:
                        post("error in cFunctionButton.shift. functionMode:", gParameter.functionMode.value, "\n");
                        post("aCol:", aCol, "\n");
                        break;
                }
            break;
        
            case cFunctionButton.bit0:
                // 0X
                if (aPress == 1) { toggleFunctionBitButton(0); }
                break;

            case cFunctionButton.bit1:
               // X0
                if (aPress == 1) { toggleFunctionBitButton(1); }
                break;

            case cFunctionButton.fold:
                if (aPress == 1) { toggleFolding(); }
                break;
            default:
                post("error in press. functionMode:", gParameter.functionMode.value, "\n");
                post("aCol:", aCol, "\n");
                break;
        }
    }
    else if ((aRow == monomeLastRow()) && (aCol >= 8) && (aCol <= 15) && (aPress == 1)) {
        switch (aCol) {
            case cFunctionButton.store_0:
                outlet(lOutlet, 1);
                break;
            case cFunctionButton.store_1:
                outlet(lOutlet, 2);
                break;
            case cFunctionButton.store_2:
                outlet(lOutlet, 3);
                break;
            case cFunctionButton.store_3:
                outlet(lOutlet, 4);
                break;
            case cFunctionButton.store_4:
                outlet(lOutlet, 5);
                break;
            case cFunctionButton.store_5:
                outlet(lOutlet, 6);
                break;
            case cFunctionButton.store_6:
                outlet(lOutlet, 7);
                break;
            case cFunctionButton.store_7:
                outlet(lOutlet, 8);
                break;
            default : 
                break;
        }
    }
    
}

function shiftIsHeld() {
    if (gDebugItem.functionName) { post("    --shiftIsHeld--\n"); }

    if (gMonome[cFunctionButton.shift][monomeLastRow()].isHeld() == 1) {
        return true;
    }
    else { return false; }
}

function widthButtons(aButtonPressed) {
    if (gDebugItem.functionName) { post("    --widthButtons--\n"); }
    
    if (!gExtendedWidthOptions) {
        switch (aButtonPressed) {
        
            case cFunctionButton.dynamic_0 :
                setDisplayWidth(cDisplayWidthOption._0);
                break;
            case cFunctionButton.dynamic_1 :
                setDisplayWidth(cDisplayWidthOption._1);
                break;
            case cFunctionButton.dynamic_2 :
                setDisplayWidth(cDisplayWidthOption._2);
                break;
            case cFunctionButton.dynamic_3 :
                setDisplayWidth(cDisplayWidthOption._3);
                break;
            default :
                post("error in widthButtons(no gExtendedWidthOptions). buttonPressed:", aButtonPressed, "\n");
                break;
        }
    }
    else if (gExtendedWidthOptions) {
        switch (aButtonPressed) {
        
            case cFunctionButton.dynamic_0 :
                setDisplayWidth(cDisplayWidthOption._4);
                break;
            case cFunctionButton.dynamic_1 :
                setDisplayWidth(cDisplayWidthOption._5);
                break;
            case cFunctionButton.dynamic_2 :
                setDisplayWidth(cDisplayWidthOption._6);
                break;
            case cFunctionButton.dynamic_3 :
                setDisplayWidth(cDisplayWidthOption._7);
                break;
            default :
                post("error in widthButtons(with gExtendedWidthOptions). buttonPressed:", aButtonPressed, "\n");
                break;
        }
    }
    if (gDebugItem.endValue) { post("displayWidth = ", gParameter.displayWidth.value, "\n"); }
}
function lengthButtons(aButtonPressed) {
    if (gDebugItem.functionName) { post("    --lengthButtons--\n"); }
    
    if (!gExtendedLengthOptions) {
        switch (aButtonPressed) {
        
            case cFunctionButton.dynamic_0 :
                setNewNoteLength(cLengthOption._0);
                break;
            case cFunctionButton.dynamic_1 :
                setNewNoteLength(cLengthOption._1);
                break;
            case cFunctionButton.dynamic_2 :
                setNewNoteLength(cLengthOption._2);
                break;
            case cFunctionButton.dynamic_3 :
                setNewNoteLength(cLengthOption._3);
                break;
            default :
                post("error in lengthButtons(no gExtendedLengthOptions). buttonPressed:", aButtonPressed, "\n");
                break;
        }
    }
    else if (gExtendedLengthOptions) {
        switch (aButtonPressed) {
        
            case cFunctionButton.dynamic_0 :
                setNewNoteLength(cLengthOption._4);
                break;
            case cFunctionButton.dynamic_1 :
                setNewNoteLength(cLengthOption._5);
                break;
            case cFunctionButton.dynamic_2 :
                setNewNoteLength(cLengthOption._6);
                break;
            case cFunctionButton.dynamic_3 :
                setNewNoteLength(cLengthOption._7);
                break;
            default :
                post("error in lengthButtons(with gExtendedLengthOptions). buttonPressed:", aButtonPressed, "\n");
                break;
        }
    }
    if (gDebugItem.endValue) { post("new notes will be created with length:", gParameter.newNoteLength.value, "\n"); }
}

function velocityButtons(aButtonPressed) {
    if (gDebugItem.functionName) { post("    --velocityButtons--\n"); }
    
    if (!gExtendedVelocityOptions) {
        switch (aButtonPressed) {
        
            case cFunctionButton.dynamic_0 :
                setNewNoteVelocity(cVelocityOption._0);
                break;
            case cFunctionButton.dynamic_1 :
                setNewNoteVelocity(cVelocityOption._1);
                break;
            case cFunctionButton.dynamic_2 :
                setNewNoteVelocity(cVelocityOption._2);
                break;
            case cFunctionButton.dynamic_3 :
                setNewNoteVelocity(cVelocityOption._3);
                break;
            default :
                post("error in velocityButtons(no gExtendedVelocityOptions). buttonPressed:", aButtonPressed, "\n");
                break;
        }
    }
    else if (gExtendedVelocityOptions) {
        switch (aButtonPressed) {
        
            case cFunctionButton.dynamic_0 :
                setNewNoteVelocity(cVelocityOption._4);
                break;
            case cFunctionButton.dynamic_1 :
                setNewNoteVelocity(cVelocityOption._5);
                break;
            case cFunctionButton.dynamic_2 :
                setNewNoteVelocity(cVelocityOption._6);
                break;
            case cFunctionButton.dynamic_3 :
                setNewNoteVelocity(cVelocityOption._7);
                break;
            default :
                post("error in velocityButtons(with gExtendedVelocityOptions). buttonPressed:", aButtonPressed, "\n");
                break;
        }
    }
    
    updateMultiPurposeLeds();

    if (gDebugItem.endValue) { post("new notes will be created with velocity:", gParameter.newNoteVelocity.value, "\n"); }
}

function toggleWidthDisplayOptions() {
    if (gDebugItem.functionName) { post("    --toggleWidthDisplayOptions--\n"); }
    
    gExtendedWidthOptions = (gExtendedWidthOptions) ? false : true;
    updateControlLeds();
    
    if(gDebugItem.functionEnd) { post("gExtendedWidthOptions:", gExtendedWidthOptions, "\n"); }
}
function toggleLengthOptions() {
    if (gDebugItem.functionName) { post("    --toggleLengthOptions--\n"); }
    
    gExtendedLengthOptions = (gExtendedLengthOptions) ? false : true;
    updateControlLeds();
    
    if(gDebugItem.endValue) { post("gExtendedWidthOptions:", gExtendedWidthOptions, "\n"); }
}

function toggleVelocityOptions() {
    if (gDebugItem.functionName) { post("    --toggleVelocityOptions--\n"); }
    
    gExtendedVelocityOptions = (gExtendedVelocityOptions) ? false : true;
    updateControlLeds();
    
    if(gDebugItem.endValue) { post("gExtendedVelocityOptions:", gExtendedVelocityOptions, "\n"); }
}

function showVelocityOptions(aWhichOptions) {
    if (gDebugItem.functionName) { post("    --showVelocityOptions--\n"); }
    
    gExtendedVelocityOptions = (!!aWhichOptions) ? true : false;
    updateControlLeds();
    
    if(gDebugItem.endValue) { post("gExtendedVelocityOptions:", gExtendedVelocityOptions, "\n"); }
}

function showWidthOptions(aWhichOptions) {
    if (gDebugItem.functionName) { post("    --showWidthOptions--\n"); }
    
    gExtendedWidthOptions = (!!aWhichOptions) ? true : false;
    updateControlLeds();
    
    if(gDebugItem.endValue) { post("gExtendedWidthOptions:", gExtendedWidthOptions, "\n"); }
}

function showLengthOptions(aWhichOptions) {
    if (gDebugItem.functionName) { post("    --gExtendedLengthOptions--\n"); }
    
    gExtendedLengthOptions = (!!aWhichOptions) ? true : false;
    updateControlLeds();
    
    if(gDebugItem.endValue) { post("gExtendedLengthOptions:", gExtendedLengthOptions, "\n"); }
}

function toggleFollowingPlayingClip() {
    if (gDebugItem.functionName) { post("    --toggleFollowingPlayingClip--\n"); }
    gFollowingPlayingClip = (gFollowingPlayingClip == true) ? false : true;
    updateFunctionModeLeds();
    getPlayingSlotNumber();
    setParameter({
        key : "following",
        value : gFollowingPlayingClip
    });
}
function getPlayingSlotNumber() {
    if (gDebugItem.functionName) { post("--getPlayingSlotNumber--\n"); }
    var pc = parseInt(gWatchTrack.get("playing_slot_index"), 10);
    if (pc >= 0) {
        setClipScene(pc);
    }
    else {
        //playCurrentClip();
    }
}

//                                  ---===Clip Navigation===---
function clipArrows(aWhichArrow) {
    if (gDebugItem.functionName) { post("    --clipArrows--\n"); }
    switch (aWhichArrow) {
        
        case cFunctionButton.dynamic_0:
            leftInClip();
            break;
            
        case cFunctionButton.dynamic_1:
            rightInClip();
            break;
        
        case cFunctionButton.dynamic_2:
            upInClip();
            break;
        
        case cFunctionButton.dynamic_3:
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
    if (gDebugItem.functionName) { post("    --leftInClip--\n"); }
    
    if(!aHowMuch) { aHowMuch = 1; }
    
    changeTimeOffset(-aHowMuch);    
}


function rightInClip(aHowMuch) {
    if (gDebugItem.functionName) { post("    --rightInClip--\n"); }
    
    if(!aHowMuch) { aHowMuch = 1; }
    
    changeTimeOffset(aHowMuch);
}
function upInClip(aHowMuch) {
    if (gDebugItem.functionName) { post("    --upInClip--\n"); }
    
    if(!aHowMuch) { aHowMuch = 1; }
    changeRowOffset(-aHowMuch);

}
function downInClip(aHowMuch) {
    if (gDebugItem.functionName) { post("    --downInClip--\n"); }
    
    if(!aHowMuch) { aHowMuch = 1; }
    changeRowOffset(aHowMuch);

}

//                                  ---===Set Navigation===---
function liveSetArrows(aWhichArrow) {
    if (gDebugItem.functionName) { post("    --liveSetArrows--\n"); }
    switch (aWhichArrow) {
        
        case cFunctionButton.dynamic_0:
            leftInSet();
            break;
            
        case cFunctionButton.dynamic_1:
            rightInSet();
            break;
        case cFunctionButton.dynamic_2:
            upInSet();
            break;
        case cFunctionButton.dynamic_3:
            downInSet();
            break;
        default:
            post("error in liveSetArrows. whichArrow:", aWhichArrow, "\n");
            break;
    }
    updateNoteDisplay();
}

// Method: upInSet
// 
// Moves focus to a clip up (lower index) in the live set
// 
// Argument:
// 
//    aHowMuch - how far up in the set to move


function upInSet(aHowMuch) {
    if (gDebugItem.functionName) { post("    --upInSet--\n"); }
    if(!aHowMuch) { aHowMuch = 1; }

    if (gDebugItem.endValue) { post("clipScene before upInSet:", getClipScene(), "\n"); }
    
    changeClipScene(-aHowMuch);
    if (gDebugItem.functionEnd) { post("clipScene after upInSet:", gParameter.clipScene.value, "\n"); }
}

function downInSet(aHowMuch) {
    if (gDebugItem.functionName) { post("    --downInSet--\n"); }
    
    if(!aHowMuch) { aHowMuch = 1; }
    if (gDebugItem.functionEnd) { post("clipScene before downInSet:", getClipScene(), "\n"); }

    changeClipScene(aHowMuch);

    if (gDebugItem.functionEnd) { post("clipScene after downInSet:", gParameter.clipScene.value, "\n"); }
}

function rightInSet(aHowMuch) {
    if (gDebugItem.functionName) { post("    --rightInSet--\n"); }
    
    if(!aHowMuch) { aHowMuch = 1; }
    if (gDebugItem.startValue) {
        post("trackIndex before rightInSet:", getTrackIndex(), "\n");
    }
    if (gDebugItem.startValue) {    post("track before rightInSet:", gTrackArray[gParameter.trackIndex.value], "\n"); }
    
    changeTrackIndex(aHowMuch);
    focusOnClip();
    
    if (gDebugItem.endValue) { post("trackIndex after rightInSet:", gParameter.trackIndex.value, "\n"); }
    if (gDebugItem.startValue) {    post("track after rightInSet:", gTrackArray[gParameter.trackIndex.value], "\n"); }
}
function leftInSet(aHowMuch) {
    if (gDebugItem.functionName) { post("    --leftInSet--\n"); }
    if(!aHowMuch) { aHowMuch = 1; }
    if (gDebugItem.startValue) {
        post("trackIndex before leftInSet:", getTrackIndex(), "\n");
    }
    if (gDebugItem.startValue) {    post("track before leftInSet:", gTrackArray[gParameter.trackIndex.value], "\n"); }

    changeTrackIndex(-aHowMuch);
    focusOnClip();

    if (gDebugItem.endValue) { post("trackIndex after leftInSet:", gParameter.trackIndex.value, "\n"); }
    if (gDebugItem.startValue) {    post("track after leftInSet:", gTrackArray[gParameter.trackIndex.value], "\n"); }
}

//                                  ---===Monome Device Methods===---

// Method: setMonomeWidth
// 
// sets monome width and rebuilds monome
// 
// Argument:
// 
//    aWidth

function setMonomeWidth(aWidth) {
    if (gDebugItem.getSetName) { post("    --setMonomeWidth--\n"); }

    setParameter({
        key : gParameter.monomeWidth.name,
        value : aWidth
    });
    
    gMonome.rebuild(gParameter.monomeWidth.value, gParameter.monomeHeight.value);
    updateMonome();
}

// Method: setMonomeHeight
// 
// sets monome height and rebuilds monome
// 
// Argument:
// 
//    aHeight

function setMonomeHeight(aHeight) {
    if (gDebugItem.getSetName) { post("    --setMonomeHeight--\n"); }
    
    setParameter({
        key : gParameter.monomeHeight.name,
        value : aHeight
    });
    
    gMonome.rebuild(gParameter.monomeWidth.value, gParameter.monomeHeight.value);
    updateMonome();
}


   // Method: Monome
   // 
   // Monome abstraction
   // 
   // Parameters:
   // 
   //    aColumns - The number of columns to initialize with.
   //    aRows - The number of rows to initialize with.


function Monome(aColumns, aRows, aThirdParameter) {
    var iCol,
        iRow,
        mMonome = this, 
        mColumns = aColumns,
        mRows = aRows,
        updating = false;
        
    if (gDebugItem.functionName) { post("    --Monome--\n"); }
    if (gDebugItem.startValue) {
        post("monomeWidth:", aColumns, "\n");
        post("monomeHeight:", aRows, "\n");
    }

    function SingleCell(aCol, aRow, aOutlet) {
        var outletNumber = aOutlet;

        var col = aCol;
        var row = aRow;

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
            if(!updating) {
                outlet(outletNumber, col, row, actualState);
            }
        };

        this.ledOff = function() {
            actualState = 0;
            
            if (!updating) {
                outlet(outletNumber, col, row, actualState);
            }
        };

        this.checkActual = function() {
            outlet(outletNumber, col, row, actualState);
            tempState = 0;
        };

        this.blink = function() {
            tempState = (tempState == 1) ? 0: 1;
            outlet(outletNumber, col, row, tempState);
        };

        this.blinkIfOff = function() {
            if (actualState == 0) {
                tempState = (tempState == 1) ? 0: 1;
                outlet(outletNumber, col, row, tempState);
            }
        };

        this.tempOn = function() {
            tempState = 1;
            outlet(outletNumber, col, row, tempState);
        };

        this.tempOff = function() {
            tempState = 0;
            outlet(outletNumber, col, row, actualState);
        };
    }

    this.column = function(aColumn, aMethodToInvoke) {
        var iRow, 
            lHeight = gParameter.monomeHeight.value;
        
        for (iRow = 0; iRow < lHeight; iRow++) {
            mMonome[aColumn][iRow][aMethodToInvoke]();
        }
    };

    this.row = function(aRow, aMethodToInvoke) {
        var iColumn,
            lWidth = gParameter.monomeWidth.value;
            
        for (iColumn = 0; iColumn < lWidth; iColumn++) {
            mMonome[iColumn][aRow][aMethodToInvoke]();
        }
    };
    
    this.rebuild = function(aColumns, aRows) {
        var iCol,
            iRow,
            lMax = Math.max(aColumns, mColumns);
            
        for (iCol = 0; iCol < lMax; iCol++) {
            
            if((!mMonome[iCol]) && (iCol < aColumns)) { mMonome[iCol] = []; }
            else if ((mMonome[iCol]) && (iCol >= aColumns)) { mMonome[iCol] = null; }
            
            for (iRow = 0; iRow < aRows; iRow++) {
                if((!mMonome[iCol][iRow]) && (iRow < aRows)) { mMonome[iCol][iRow] = new SingleCell(iCol, iRow, 0); }
                else if ((mMonome[iCol][iRow]) && (iRow >= aRows)) { mMonome[iCol][iRow] = null; }
            }
            if (gDebugItem.endValue) {
                post("Monome[", iCol, "].length:", mMonome[iCol].length, "\n");
            }
        }
        if (gDebugItem.endValue) {
            post("Monome.length (width):", mMonome.length, "\n");
        }
    };
    
    this.refresh = function() {
        var iCol,
            iRow,
            lHeight = gParameter.monomeHeight.value,
            lWidth = gParameter.monomeWidth.value;

        post("refreshing!\n");
        for (iCol = 0; iCol < lWidth; iCol++) {
            for (iRow = 0, lHeight; iRow < lHeight; iRow++) {
                mMonome[iCol][iRow].checkActual();
            }
        }
    };

    this.beginUpdates = function() {
        if (gDebugItem.functionName) { post("    --beginUpdates--\n"); }
        
        mMonome.updating = true;
    };
    this.endUpdates = function() {
        if (gDebugItem.functionName) { post("    --endUpdates--\n"); }
        
        var iCol;
        var iRow;
        
        mMonome.updating = false;
        refresh();
    };
    
    for (iCol = 0; iCol < aColumns; iCol++) {
        
        mMonome[iCol] = [];
        for (iRow = 0; iRow < aRows; iRow++) {
            mMonome[iCol][iRow] = new SingleCell(iCol, iRow, 0);
        }
        if (gDebugItem.startValue) {
            post("Monome[", iCol, "].length:", mMonome[iCol].length, "\n");
        }
    }
    if (gDebugItem.startValue) {
        post("Monome.length (width):", mMonome.length, "\n");
    }
}

//                                  ---===cycles accessors===---
function setCycles(aNewCycleCount) {
    if (gDebugItem.getSetName) { post("    --setCycles--\n"); }
    
    setParameter({
        key : gParameter.cycles.name,
        value : aNewCycleCount
    });

    onScaleVariableChange();
}

//                                  ---===rootNote accessors===---
function setRootNote(aNewRoot) {
    if (gDebugItem.getSetName) { post("    --setRootNote--\n"); }

    setParameter({
        key : gParameter.rootNote.name,
        value : aNewRoot
    });

    onScaleVariableChange();
}

//                                  ---===onScaleVariableChange===---
function onScaleVariableChange () {
    if (gDebugItem.getSetName) { post("    --onScaleVariableChange--\n"); }

    if (gDebugItem.list) { post("my name is:", gParameter.currentScaleName.value, "\n"); }

    if(gParameter.currentScaleName.value != "Drums") {
        setCurrentScaleWithSymbol(gParameter.currentScaleName.value);
    }
}
//                                  ---===Scale Methods===---

function generateFullScaleList(aMapString) {
    if (gDebugItem.functionName) { post("    --generateFullScaleList--\n"); }
    
    if (gDebugItem.list) { post("maps[" + aMapString + "].value:", gMaps[aMapString].value, "\n"); }     

    var scaleMap = gMaps[aMapString].value.slice(0); //because i will manipulate this array
    var distanceToSecondRoot = scaleMap.pop(); // the last note is only needed for distance calculation
    if (gDebugItem.list) { post("distanceToSecondRoot:", distanceToSecondRoot, "\n");       }
    
    
    var scaleLength = scaleMap.length;
    if (gDebugItem.endValue) { post("scaleLength:", scaleLength, "\n"); }
    
    var numberOfNotes = scaleLength * gParameter.cycles.value + 1; //root on top
    if(gDebugItem.startValue) { post("numberOfNotes:", numberOfNotes, "\n"); }
    //i assume the scale starts at 0.
    // the distance to the root is needed more than 0
    scaleMap[0] = distanceToSecondRoot; 

    if (gDebugItem.list) { post("scaleMap:", scaleMap, "\n"); }
    
    var scaleNoteList = [];
    
    scaleNoteList.push(parseInt(gParameter.rootNote.value, 10));
    if (gDebugItem.list) { post("root", gParameter.rootNote.value, "\n"); }
    
    for (var n = 1; n < numberOfNotes; n++) {
        var noteNumberInQuestion = scaleNoteList[(n - 1)] + scaleMap[(n % scaleLength)];
        
        if (gDebugItem.list) { post("noteNumberInQuestion:", noteNumberInQuestion, "\n"); }
        
        if (isValidCCNumber(noteNumberInQuestion)) { 
            scaleNoteList.push(noteNumberInQuestion);
            
            if (gDebugItem.list) { 
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
    if(gDebugItem.startValue) { post("scaleNoteList:" + scaleNoteList, "\n"); }
    return scaleNoteList;
}

function setCurrentScale(aScaleToUse, aScaleName) {
    if (gDebugItem.getSetName) { post("    --setCurrentScale--\n"); }
    
    if (gParameter.currentScale.value != aScaleToUse) {
        gParameter.currentScale.value = aScaleToUse;
        setCurrentScaleName(aScaleName);
        updateNoteDisplay();
    }
}

function setCurrentScaleName(aNewName) {
    if (gDebugItem.getSetName) { post("    ---setCurrentScaleName-\n"); }
    gParameter.currentScaleName.value = aNewName;
    this.patcher.getnamed("currentScaleNameGsCssPattr").message(gParameter.currentScaleName.value);
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
    if (gDebugItem.functionName) { post("    --setCurrentScaleWithSymbol--\n"); }
    if (gDebugItem.startValue) { post("           aSymbolFromPatcher:", aSymbolFromPatcher, "\n"); }
    if (!gThereIsAClipInSlot) { return; }

    if (aSymbolFromPatcher == "Drums") {
        setCurrentScale(defaultDrumScale, aSymbolFromPatcher);
    }
    
    setCurrentScale(generateFullScaleList(aSymbolFromPatcher), aSymbolFromPatcher);

    if (gDebugItem.startValue) { post("aSymbolFromPatcher at end:", aSymbolFromPatcher, "\n"); }
}

function setInSuite(aNewValue) {
    setParameter({
        key : gParameter.inSuite.name,
        value : aNewValue
    });
}

function gParameter() {
    
    this.show = function(aObject) {

        var lOutlet = 2,
            aKey = aObject.key,
            aValue = aObject.value,
            aFormat = (aObject.format == undefined) ? 0 : aObject.format;        

        if (gDebugItem.functionName) { post("    --sendToHud - key: " + aKey + " value: " + aValue  + " format: " + aFormat + " --\n"); }
        if (gDebugItem.functionArguments) { post("aKey:", aKey, "aValue:", aValue, "aFormat:", aFormat, "\n"); }

        switch (aFormat) {
            case cHudFormat.set:
                outlet(lOutlet, aKey, "set", aValue);
                break;
            case cHudFormat.trigger:
                outlet(lOutlet, aKey, aValue);
                break;
            case cHudFormat.symbol:
                outlet(lOutlet, aKey, "setsymbol", aValue);
                break;
            case cHudFormat.measures:
                outlet(lOutlet, aKey, "set", aValue, (aValue == 1) ? "measure" : "measures");
                break;
            case HudFormat.slotSet:
                outlet(lOutlet, aSlot, aKey, "set", aValue);
                break;
            case HudFormat.slotTrigger:
                outlet(lOutlet, aSlot, "setsymbol", aValue);
                break;
            case HudFormat.slotSymbol:
                outlet(lOutlet, aSlot, aKey, "setsymbol", aValue);
                break;
            default: 
                post("error in sendToHud. aFormat:", aFormat, "\n");
                break;
        }
    }
    
    this.set = function(aObject) {
        var aParameter = gParameter[aObject.key],
            aValue = aObject.value,
            aSlot = (aObject.slot === undefined) ? null : aObject.slot,
            lPatcherObjectNameString,
            lValue,
            lMinimum = (aParameter.minValue instanceof Function) ? aParameter.minValue() : aParameter.minValue,
            lMaximum = (aParameter.maxValue instanceof Function) ? aParameter.maxValue() : aParameter.maxValue,
            lListenerKeys = aParameter.listeners,
            lLength = lListenerKeys.length,
            iCounter;

        //check validity of aValue
        if ((aParameter.type == "number") || (aParameter.type == "toggle") || (aParameter.type == "slotArray")) {
            if ((aValue >= lMinimum) && (aValue <= lMaximum)) { lValue = aValue; }
            else if (aValue < lMinimum) { lValue = lMinimum; }
            else if (aValue > lMaximum) { lValue = lMaximum; }
            else { post("something has gane awry in setParameter!\n"); }
        }
        else { lValue = aValue; }

        if (aParameter.type == "slotArray") { aParameter.value[aSlot] = lValue; }
        else { aParameter.value = lValue; }

        sendParameterValueToHud(aParameter);

        // call listeners
        for (iCounter = 0; iCounter < lLength; iCounter++) {
            gThis[lListenerKeys[iCounter]]();
            post("lListenerKeys[" +iCounter + "]:", lListenerKeys[iCounter], "\n");
        }

        // Save.
        if (aParameter.saveInPattr) {
            patcherObjectNameString = aParameter.name + gParameter.patchString + "Pattr";
            this.patcher.getnamed(patcherObjectNameString).setvalueof(aParameter.value);
        }
    }
    
    this.refresh = function(aParameter) {
        if (aParameter.format != null) {
            sendToHud({
                key: aParameter.name,
                value: (aParameter.type == "slotArray") ? aParameter.value[aSlot] : aParameter.value,
                format: aParameter.format,
                slot: aSlot
            });
        }
    }
    
    this.toggle = function(aParameterName) {
        if (gParameter[aParameterName].type == "toggle") {
            setParameter({
                key : aParameterName,
                value : Number(!Boolean(gParameter[aParameterName].value))
            });
        }
        else { post(aParameterName, "is not a toggle parameter\n");}
    }
    
    this.change = function(aParameterName, aAmount) {

        setParameter({
            key : aParameterName,
            value : gParameter[aParameterName].value + aAmount
        });
    }
    
    this.store = function(aNumber) {
        this.patcher.getnamed(gParameter.patchString + "-presetStore").message("store", aNumber);
    }

    this.recall = function(aNumber) {
        this.patcher.getnamed("gsClipStep-presetStore").message(aNumber);
        grabAllPattrValues();
        focusOnClip();
        updateMonome();
        updateHud();
    }
    
    this.grab = function(aParameter) {
        if (gDebugItem.functionName) { post("    --grabPattrValue " + aParameter.name + "--\n"); }

        var lPatcherObjectNameString = aParameter.name + gParameter.patchString + "Pattr",
            lValue;

        if (gDebugItem.startValue) { post(aParameter.name + ".value:", aParameter.value, "\n"); }
        if (gDebugItem.localValue) { post("lPatcherObjectNameString:", lPatcherObjectNameString, "\n"); }

        switch (aParameter.type) {
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
                post(aParameter.name + ".type:", aParameter.type , "\n");
                break;
        }

        if (gDebugItem.localValue) { post("lValue from " + lPatcherObjectNameString + ":", lValue, "\n"); }

        if (aParameter.format != null) {
            aParameter.value = lValue;
            sendToHud({
                key: aParameter.name,
                value: aParameter.value,
                format: aParameter.format
            });
        }

        if (gDebugItem.endValue) { post(aParameter.name + ".value: ", aParameter.value, "\n"); }
    }

    this.grabAll = function() {    
        var iProperty;

        for (iProperty in gParameter) {
            if (gParameter[iProperty].saveInPattr) {
                grabPattrValue(gParameter[iProperty]);
            }
        }
    }
}

function freebang() {
    if (gDebugItem.functionName) { post("    --freebang--\n"); }
    if (gDebugItem.list) { postPattrs("end"); }
    if (gWatchSet) { gWatchSet = null; }
    if (gCountAllTracks) { gCountAllTracks = null; }
    if (gWatchSetTracks) { gWatchSetTracks = null; }
    if (gWatchSetPlaying) { gWatchSetPlaying = null; }
    if (gCheckForClip) { gCheckForClip = null; }
    if (gEditClip) { gEditClip = null; }
    if (gWatchTrack) { gWatchTrack = null; }
    if (gWatchTrackForPlayingClip) { gWatchTrackForPlayingClip = null; }
    if (gWatchClipNotes) { gWatchClipNotes = null; }
    if (gWatchClipPlayingStatus) { gWatchClipPlayingStatus = null; }
    if (gWatchClipIsPlaying) { gWatchClipIsPlaying = null; }
    if (gWatchClipPlayhead) { gWatchClipPlayhead = null; }
}