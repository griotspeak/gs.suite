/*
-*- coding: utf-8 -*-
gs.chordScale v00.000
Copyright (c) 2010, TJ Usiyan a.k.a. griotspeak
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the <AppName> nor the
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
var outlets = 4;

var mDebugLevel;

//mDebugLevel[1] = true;
//mDebugLevel[2] = true;
//mDebugLevel[3] = true;
//mDebugLevel[4] = true;
//mDebugLevel[5] = true;
//mDebugLevel[6] = true;
// 0 - silence
// 1 - function name at start
// 2 - function end
// 3 - variables at end of function
// 4 - variables at start of function
// 5 - lists. so many lists.
// 6 - setters and getters


function setDebugLevel(aLevel) {
    if (aLevel > 0) {
        post("                             --setDebugLevel = ", aLevel, "--\n");
    }
    mDebugLevel = new Array();
    for (var c = 0; c < 6; c++) {
        if (c <= aLevel) {
            mDebugLevel[c] = true;
        }
        else {
            mDebugLevel[c] = false;
        }
    }
}

setDebugLevel(0);

var post;
var outlet;
var watchSetPlaying;
var mMonomeWidth = 8;
var mMonomeHeight = 8;
var Monome = [];
buildMonome();

var gUnison                 =   {   passive: { scale: "uni-\nson",      tension: "P\n8"         },  opinionated: { scale: null,             tension: null           }   };
var gAugmentedUnison        =   {   passive: { scale: "aug\nuni",       tension: null           },  opinionated: { scale: "min\n2",         tension: "flat\n9"      }   };

var gDiminishedSecond       =   {   passive: { scale: "dim\n2",         tension: null           },  opinionated: { scale: "uni-\nson",      tension: null           }   };
var gMinorSecond            =   {   passive: { scale: "min\n2",         tension: "flat\n9"      },  opinionated: { scale: null,             tension: null           }   };
var gMajorSecond            =   {   passive: { scale: "maj\n2",         tension: "\n9"          },  opinionated: { scale: null,             tension: null           }   };
var gAugmentedSecond        =   {   passive: { scale: "aug\n2",         tension: "sharp\n9"     },  opinionated: { scale: "min\n3",         tension: null           }   };

var gDiminishedThird        =   {   passive: { scale: "dim\n3",         tension: null           },  opinionated: { scale: "maj\n2",         tension: null           }   };
var gMinorThird             =   {   passive: { scale: "min\n3",         tension: null           },  opinionated: { scale: null,             tension: null           }   };
var gMajorThird             =   {   passive: { scale: "maj\n3",         tension: "maj\n10"      },  opinionated: { scale: "maj\n3",         tension: null           }   };
var gAugmentedThird         =   {   passive: { scale: "aug\n3",         tension: null           },  opinionated: { scale: "P\n4",           tension: null           }   };

var gDiminishedFourth       =   {   passive: { scale: "dim\n4",         tension: null           },  opinionated: { scale: null,             tension: null           }   };
var gPerfectFourth          =   {   passive: { scale: "P\n4",           tension: "\n11"         },  opinionated: { scale: null,             tension: null           }   };
var gAugmentedFourth        =   {   passive: { scale: "aug\n4",         tension: "sharp\n11"    },  opinionated: { scale: null,             tension: null           }   };

var gDiminishedFifth        =   {   passive: { scale: "dim\n5",         tension: null           },  opinionated: { scale: null,             tension: null           }   };
var gPerfectFifth           =   {   passive: { scale: "P\n5",           tension: "\n12th"       },  opinionated: { scale: null,             tension: null           }   };
var gAugmentedFifth         =   {   passive: { scale: "aug\n5",         tension: null           },  opinionated: { scale: null,             tension: "flat\n13"     }   };

var gDiminishedSixth        =   {   passive: { scale: "dim\n6",         tension: null           },  opinionated: { scale: "P\n5",           tension: null           }   };
var gMinorSixth             =   {   passive: { scale: "min\n6",         tension: "flat\n13"     },  opinionated: { scale: null,             tension: null           }   };
var gMajorSixth             =   {   passive: { scale: "maj\n6",         tension: "\n13"         },  opinionated: { scale: null,             tension: null           }   };
var gAugmentedSixth         =   {   passive: { scale: "aug\n6",         tension: null           },  opinionated: { scale: null,             tension: null           }   };

var gDiminishedSeventh      =   {   passive: { scale: "dim\n7",         tension: null           },  opinionated: { scale: null,             tension: null           }   };
var gMinorSeventh           =   {   passive: { scale: "min\n7",         tension: null           },  opinionated: { scale: null,             tension: null           }   };
var gMajorSeventh           =   {   passive: { scale: "maj\n7",         tension: null           },  opinionated: { scale: null,             tension: null           }   };
var gAugmentedSeventh       =   {   passive: { scale: "aug\n7",         tension: null           },  opinionated: { scale: "P\n8",           tension: null           }   };

var gOctave                 =   {   passive: { scale: "P-\n8",          tension: null           },  opinionated: { scale: null,             tension: null           }   };

var gFlatNinth              =   {   passive: { scale: "min\n9",         tension: null           },  opinionated: { scale: null,             tension: null           }   };
var gNinth                  =   {   passive: { scale: "\n9",            tension: null           },  opinionated: { scale: null,             tenstion: null          }   };

var ScaleObject = {
    first: {
        degree: 1,
        value: [gMinorSeventh, gMajorSeventh, gUnison, gAugmentedUnison, gMajorSecond]
    },
    second: {
        degree: 2,
        value: [gDiminishedSecond, gMinorSecond, gMajorSecond, gAugmentedSecond, gMajorThird]
    },
    third: {
        degree: 3,
        value: [gDiminishedThird, gMinorThird, gMajorThird, gAugmentedThird, gAugmentedFourth]
    },
    fourth: {
        degree: 4,
        value: [gMinorThird, gDiminishedFourth, gPerfectFourth, gAugmentedFourth, gPerfectFifth]
    },
    fifth: {
        degree: 5,
        value: [gPerfectFourth, gDiminishedFifth, gPerfectFifth, gAugmentedFifth, gMajorSixth]
    },
    sixth: {
        degree: 6,
        value: [gDiminishedSixth, gMinorSixth, gMajorSixth, gAugmentedSixth, gMajorSeventh]
    },
    seventh: {
        degree: 7,
        value: [gDiminishedSeventh, gMinorSeventh, gMajorSeventh, gAugmentedSeventh, gFlatNinth]
    },
    octave: {
        degree: 8,
        value: [gMinorSeventh, gMajorSeventh, gOctave, gFlatNinth, gNinth]
    }
};
        
VoiceButton = {
    accidental_0 : 0,
    accidental_1 : 1,
    accidental_2 : 2,
    octaveUp : 3,
    octaveDown : 4,
    channelUp : 5,
    channelDown :6,
    onOff : 7
};

AccidentalType = {
  doubleFlat : -2,
  flat : -1,
  natural : 0,
  sharp : 1,
  doubleSharp : 2  
};

function bang() { setChannel((parameter.channel.value[0])?0:1); }

function initialize() {
    grabAllPattrValues();
    updateHud();
}

var mSemitoneValue = [0, 2, 4, 5, 7, 9, 11, 12];

function getSemitoneValue(aScaleDegree) {
    return mSemitoneValue[aScaleDegree - 1];
}

var parameter = {
    degree : {
        name : "degree",
        value : [],
        minValue : 1,
        maxValue : 8,
        isPatcherGlobal : false
    },
    accidental : {
        name : "accidental",
        value : [],
        minValue : -2,
        maxValue : 2,
        isPatcherGlobal : false
    },
    octave : {
        name : "octave",
        value : [],
        minValue : 0,
        maxValue : 5,
        isPatcherGlobal : false
    },
    split : {
        name : "split",
        value : [],
        minValue : 0,
        maxValue : 127,
        isPatcherGlobal : false
    },
    voiceOn : {
        name : "voiceOn",
        value : [],
        minValue : 0,
        maxValue : 1,
        isPatcherGlobal : false
    },
    opinion : {
        name : "opinion",
        value : [],
        minValue : 0,
        maxValue : 1,
        isPatcherGlobal : false
    },
    notePlaying : {
        name : "notePlaying",
        value : [],
        minValue : 0,
        maxValue : 1,
        isPatcherGlobal : false
    },
    lastPitchPlayed : {
        name : "lastPitchPlayed",
        value : [],
        minValue : 0,
        maxValue : 127,
        isPatcherGlobal : false
    },
    channel :  {
        name : "channel",
        value : [],
        minValue : 0,
        maxValue : 127,
        isPatcherGlobal : true
    },
    onChange : {
        name : "onChange",
        value : [],
        minValue : 0,
        maxValue : 2,
        isPatcherGlobal : true
    },
    lastRoot : 0,
    lastVelocity : 0
};

var onChangeValue = {
    hold : 0,
    clip : 1,
    retrigger : 2
};

function setDegree(aVoice, aValue) {
    if (aValue == undefined) { return; }
    setParameterProperty("degree", aVoice, aValue);
}

function setChannel(aValue) {
    if (aValue == undefined) { return; }
    setParameterProperty("channel", 0, aValue);
}

function setAccidental(aVoice, aValue) {
    if (aValue == undefined) { return; }
    setParameterProperty("accidental", aVoice, aValue);
}

function setSplit(aVoice, aValue) {
    if (aValue == undefined) { return; }
    setParameterProperty("split", aVoice, aValue);
}

function setOctave(aVoice, aValue) {
    if (aValue == undefined) { return; }
    setParameterProperty("octave", aVoice, aValue);
}

function setVoiceOn(aVoice, aValue) {
    if (aValue == undefined) { return; }
    setParameterProperty("voiceOn", aVoice, aValue);
}

function setOpinion(aVoice, aValue) {
    if (aValue == undefined) { return; }
    setParameterProperty("opinion", aVoice, aValue);
}

function setOnChange(aValue) {
    if (aValue == undefined) { return; }
    setParameterProperty("onChange", 0, aValue);
}

function note(aPitch, aVelocity) {
    var lSemitones;
    var listArray = new Array();

    sendNoteMessage("root", aPitch, aVelocity);
    
    for (var iVoice = 0; iVoice < 8; iVoice++) {
        
        if (parameter.onChange.value[0] == onChangeValue.hold) { flushNote(iVoice, 0); }
        
        if(parameter.voiceOn.value[iVoice]) {
            lSemitones = aPitch;
            lSemitones += getSemitoneValue(parameter.degree.value[iVoice]);
            lSemitones += parameter.octave.value[iVoice] * 12;
            lSemitones += parameter.accidental.value[iVoice];

            sendNoteMessage(iVoice, lSemitones, aVelocity);
        }
    }
}

function replaceNote(aVoice) {
    if(parameter.voiceOn.value[aVoice]) {
        var lSemitones = parameter.lastRoot;
        lSemitones += getSemitoneValue(parameter.degree.value[aVoice]);
        lSemitones += parameter.octave.value[aVoice] * 12;
        lSemitones += parameter.accidental.value[aVoice];

        sendNoteMessage(aVoice, lSemitones, parameter.lastVelocity);
    }
}

function updateVoiceOnMonome(aVoice) {
    Monome.column(aVoice, "ledOff");

    if (Monome[aVoice][VoiceButton.accidental_1].isHeld) {
        Monome[aVoice][VoiceButton.accidental_1].ledOn();
        
        var lBinaryString = padNumber(parameter.degree.value[aVoice].toString(2), 4);
        for (var iCounter = 0; iCounter < 4; iCounter++) {
            if ((lBinaryString.charAt(iCounter) != 0) && (lBinaryString.charAt(iCounter))) {
                    Monome[aVoice][4 + iCounter].ledOn();
            }
        }
    }
    else {
        //accidentals
        switch (parameter.accidental.value[aVoice]) {
            case (AccidentalType.doubleFlat) : {
                Monome[aVoice][VoiceButton.accidental_1].ledOn();
                Monome[aVoice][VoiceButton.accidental_2].ledOn();
                break;
            }
            case (AccidentalType.flat) : {
                Monome[aVoice][VoiceButton.accidental_2].ledOn();
                break;
            }
            case (AccidentalType.natural) : {
                break;
            }
            case (AccidentalType.sharp) : {
                Monome[aVoice][VoiceButton.accidental_0].ledOn();
                break;
            }
            case (AccidentalType.doubleSharp) : {
                Monome[aVoice][VoiceButton.accidental_0].ledOn();
                Monome[aVoice][VoiceButton.accidental_1].ledOn();
                break;
            }
            default : {
                break;
            }
        }


        // On or off
        if (parameter.voiceOn.value[aVoice]) { 
            Monome[aVoice][VoiceButton.onOff].ledOn();
        }

        //Channel Buttons
        if (parameter.split.value[aVoice] < parameter.channel.value[0]) {
            Monome[aVoice][VoiceButton.channelDown].ledOn();
        }
        else if (parameter.split.value[aVoice] == parameter.channel.value[0]) { 
            Monome[aVoice][VoiceButton.channelUp].ledOn();
            Monome[aVoice][VoiceButton.channelDown].ledOn();
        }
        else if (parameter.split.value[aVoice] > parameter.channel.value[0]) {
            Monome[aVoice][VoiceButton.channelUp].ledOn();
        }
    }
}


function updateCommentDisplay(aVoice) {
    
    for (var iIntervalName in ScaleObject) {
        if (parameter.degree.value[aVoice] == ScaleObject[iIntervalName].degree) {
            
            var lScaleDegreeObject = ScaleObject[iIntervalName].value[parameter.accidental.value[aVoice] + 2];
    
            if ((parameter.octave.value[aVoice] > 1) && (parameter.opinion.value[aVoice]) && (lScaleDegreeObject.opinionated.tension != null)) {
                    sendToHud(aVoice, "comment", lScaleDegreeObject.opinionated.tension, 0);
            }
            else if ((parameter.octave.value[aVoice] > 1) && (lScaleDegreeObject.passive.tension != null)) {                
                sendToHud(aVoice, "comment", lScaleDegreeObject.passive.tension, 0);
            }
            else if ((parameter.opinion.value[aVoice]) && (lScaleDegreeObject.opinionated.scale != null)) {             
                sendToHud(aVoice, "comment", lScaleDegreeObject.opinionated.scale, 0);
            }
            else {              
                sendToHud(aVoice, "comment", lScaleDegreeObject.passive.scale, 0);
            }
        }
    }
}

function updateVoiceDisplay(aVoice) {
    updateCommentDisplay(aVoice);
    updateVoiceOnMonome(aVoice);
    sendToHud(aVoice, parameter.voiceOn.name, parameter.voiceOn.value[aVoice], 0);
    sendToHud(aVoice, parameter.split.name, parameter.split.value[aVoice], 0);
    sendToHud(aVoice, parameter.octave.name, parameter.octave.value[aVoice], 0);
    sendToHud(aVoice, parameter.degree.name, parameter.degree.value[aVoice], 0);
    sendToHud(aVoice, parameter.accidental.name, parameter.accidental.value[aVoice], 0);
}

function updateHud() {
    for (var iVoice = 0; iVoice < 8; iVoice++) {
        updateVoiceDisplay(iVoice);
        
    }
}


function setParameterProperty(aPropertyString, aVoice, aValue) {
    if ((aVoice < 0) || (aVoice > 7)) { return; }
    if (parameter.voiceOn.length != 8) { grabAllPattrValues(); }

    var lValue;

    if ((aValue >= parameter[aPropertyString].minValue) && (aValue <= parameter[aPropertyString].maxValue)) { lValue = aValue; }
    else if (aValue < parameter[aPropertyString].minValue) { lValue = parameter[aPropertyString].minValue; }
    else if (aValue > parameter[aPropertyString].maxValue) { lValue = parameter[aPropertyString].maxValue; }
    else { post("something has gane awry!\n"); }

    parameter[aPropertyString].value[aVoice] = lValue;

    sendToHud(aVoice, parameter[aPropertyString].name, parameter[aPropertyString].value[aVoice], (parameter[aPropertyString].isPatcherGlobal) ? 4 : 0);
    updateVoiceDisplay(aVoice);
    var patcherObjectNameString = aVoice + "-" + parameter[aPropertyString].name + "GsChordObject";
    this.patcher.getnamed(patcherObjectNameString).message("set", parameter[aPropertyString].value[aVoice]);

    if (!parameter[aPropertyString].isPatcherGlobal) {
        if (parameter.onChange.value[0] == onChangeValue.clip) { flushNote(aVoice, 0); }
        else if (parameter.onChange.value[0] == onChangeValue.retrigger) { flushNote(aVoice, 1); }
        // nothing to do if onChangeValue.hold
    }
}

function incrementParameterProperty(aPropertyString, aVoice) {
    var lValue = parameter[aPropertyString].value[aVoice] + 1;
    setParameterProperty(aPropertyString, aVoice, lValue);    
}

function decrementParameterProperty(aPropertyString, aVoice) {
    var lValue = parameter[aPropertyString].value[aVoice] - 1;
    setParameterProperty(aPropertyString, aVoice, lValue);
}

function toggleParameterProperty(aPropertyString, aVoice) {
    var lValue = Number(!Boolean(parameter[aPropertyString].value[aVoice]));
    setParameterProperty(aPropertyString, aVoice, lValue);
}


function grabAllPattrValues() {
    grabPattrValues(parameter.voiceOn);
    grabPattrValues(parameter.split);
    grabPattrValues(parameter.octave);
    grabPattrValues(parameter.degree);
    grabPattrValues(parameter.accidental);
    parameter.channel.value[0] = Number(this.patcher.getnamed("0-channelGsChordObject").getvalueof());
    parameter.onChange.value[0] = Number(this.patcher.getnamed("0-onChangeGsChordObject").getvalueof());
}

function grabPattrValues(aProperty) {
    for (var iVoice = 0; iVoice < 8; iVoice++) {
        var patcherObjectNameString = iVoice + "-" + aProperty.name + "GsChordObject";
        aProperty.value[iVoice] = Number(this.patcher.getnamed(patcherObjectNameString).getvalueof());
        if (mDebugLevel[5]) {  post(aProperty.name + ".value[" + iVoice + "]:", aProperty.value[iVoice], "\n"); }
    }
}

function sendNoteMessage(aVoice, aPitch, aVelocity) {
        
    if (aVoice != "root") {
        if (parameter.split.value[aVoice] == parameter.channel.value[0]) {
            outlet(0, aPitch, aVelocity);
        }
        
        messnamed("gs.channel", "channelNote", parameter.split.value[aVoice], aPitch, aVelocity);
        

        if (aVelocity) {
            parameter.notePlaying.value[aVoice] = true;
            parameter.lastPitchPlayed.value[aVoice] = aPitch;
        }
        else {
            parameter.notePlaying.value[aVoice] = false;
        }
    }
    else {
        outlet(0, aPitch, aVelocity);
        parameter.lastRoot = aPitch;
        parameter.lastVelocity = aVelocity;
    }
}

function flushNote(aVoice, _makeNew) {
    if (parameter.notePlaying.value[aVoice]) {
        sendNoteMessage(aVoice, parameter.lastPitchPlayed.value[aVoice], 0);
        if (_makeNew) { replaceNote(aVoice); }
    }
}


function sendToHud(_slot, _key, aValue, _format) {
    if (mDebugLevel[1]) {
        post("                      --sendToHud - " + _key + " : " + aValue + " --\n");
    }
    if (mDebugLevel[5]) {
        post("_slot:", _slot, "_key:", _key, "aValue:", aValue, "\n");
    }

    switch (_format) {
        case 0: {
            outlet(1, _slot, _key, "set", aValue);
            break;
        }
        case 1: {
            outlet(1, _slot, _key, aValue);
            break;
        }
        case 2: {
            outlet(1, _slot, _key, "setsymbol", aValue);
            break;
        }
        case 3: {
            outlet(1, _slot, _key, "set", aValue, (aValue == 1) ? "measure": "measures");
            break;
        }
        case 4: {
            outlet(1, _key, "set", aValue);
            break;
        }
        default : {
            post("error in sendToHud _format:", _format, "\n");
            break;
        }
    }
}

var gTemplateChord = {
    ionian : {          //  r   9   3   s4  5   13  7
        voiceOn :        [   1,  1,  1,  0,  1,  1,  1,  0],
        degree :        [   1,  2,  3,  4,  5,  6,  7,  8],
        accidental :    [   0,  0,  0,  0,  0,  0,  0,  0],
        split :         [   0,  0,  0,  0,  0,  0,  0,  0],
        octave :        [   1,  2,  1,  0,  1,  2,  1,  2],
        opinion :       [   0,  0,  0,  0,  0,  0,  0,  0]
    },
    dorian : {          //  r   9   b3  11  5   s6  b7
        voiceOn :        [   1,  1,  1,  1,  1,  0,  1,  0],
        degree :        [   1,  2,  3,  4,  5,  6,  7,  8],
        accidental :    [   0,  0,  -1, 0,  0,  0,  -1, 0],
        split :         [   0,  0,  0,  0,  0,  0,  0,  0],
        octave :        [   1,  2,  1,  2,  1,  0,  1,  2],
        opinion :       [   0,  0,  0,  0,  0,  0,  0,  0]
    },
    phrygian : {        //  r   sb2 b3  11  5   sb6 b7
        voiceOn :        [   1,  0,  1,  1,  1,  0,  1,  0],
        degree :        [   1,  2,  3,  4,  5,  6,  7,  8],
        accidental :    [   0,  -1, -1, 0,  0,  -1, -1, 0],
        split :         [   0,  0,  0,  0,  0,  0,  0,  0],
        octave :        [   1,  0,  1,  2,  1,  0,  1,  2],
        opinion :       [   0,  0,  0,  0,  0,  0,  0,  0]
    },
    lydian : {          //  r   9   3   #11 5   13  7   (b7)
        voiceOn :        [   1,  1,  1,  1,  1,  1,  1,  0],
        degree :        [   1,  2,  3,  4,  5,  6,  7,  7],
        accidental :    [   0,  0,  0,  1,  0,  0,  0,  -1],
        split :         [   0,  0,  0,  0,  0,  0,  0,  0],
        octave :        [   1,  2,  1,  2,  1,  2,  1,  1],
        opinion :       [   0,  0,  0,  0,  0,  0,  0,  0]
    },

    mixolydian : {      //  r   (b9)    9   3   s4  5   13  b7
        voiceOn :        [   1,  0,      1,  1,  0,  1,  1,  1],
        degree :        [   1,  2,      2,  3,  4,  5,  6,  7],
        accidental :    [   0,  -1,     1,  0,  0,  0,  0,  -1],
        split :         [   0,  0,      0,  0,  0,  0,  0,  0],
        octave :        [   1,  2,      2,  1,  0,  1,  2,  1],
        opinion :       [   0,  0,      0,  0,  0,  0,  0,  0]
    },

    aeolian : {         //  r   9   b3  11  5   sb6 b7
        voiceOn :        [   1,  1,  1,  1,  1,  0,  1,  0],
        degree :        [   1,  2,  3,  4,  5,  6,  7,  8],
        accidental :    [   0,  0,  -1, 0,  0,  -1, -1, 0],
        split :         [   0,  0,  0,  0,  0,  0,  0,  0],
        octave :        [   1,  2,  1,  2,  1,  0,  1,  1],
        opinion :       [   0,  0,  0,  0,  0,  0,  0,  0]
    },

    locrian : {         //  r   sb2 b3  11  b5  b13 b7
        degree :        [   1,  2,  3,  4,  5,  6,  7,  8],
        accidental :    [   0,  -1, -1, 0,  -1, -1, -1, 0],
        voiceOn :        [   1,  0,  1,  1,  1,  0,  1,  0],
        split :         [   0,  0,  0,  0,  0,  0,  0,  0],
        octave :        [   1,  0,  1,  2,  1,  2,  1,  1],
        opinion :       [   0,  0,  0,  0,  0,  0,  0,  0]
    },

    symDiminished : {   //  r   9   b3  11  b5  b13 bb7 T7
        degree :        [   1,  2,  3,  4,  5,  6,  7,  7],
        accidental :    [   0,  0,  -1, 0,  -1, -1, -2, 0],
        voiceOn :        [   1,  1,  1,  1,  1,  1,  1,  0],
        split :         [   0,  0,  0,  0,  0,  0,  0,  0],
        octave :        [   1,  2,  1,  2,  1,  2,  1,  2],
        opinion :       [   0,  0,  0,  0,  0,  0,  0,  0]
        }
};

//                                  ---===Controller Methods===---
function press(aCol, aRow, aPress) {
    if (mDebugLevel[1]) { post("                               --press--\n"); }
    
    if (mDebugLevel[2]) { post("press called.\n aCol:", aCol, "aRow", aRow, "aPress", aPress, "\n"); }
    
    if (aPress == 1) { Monome[aCol][aRow].push(); }
    else if (aPress == 0) { Monome[aCol][aRow].release(); }

    switch (aRow) {
        case (VoiceButton.accidental_0) : {
            if (aPress == 1) { 
                (Monome[aCol][VoiceButton.accidental_1].isHeld) ?
                incrementParameterProperty("degree", aCol) : incrementParameterProperty("accidental", aCol);
            }
            break;
        }
        case (VoiceButton.accidental_1) : {
            updateVoiceDisplay(aCol);
            break;
        }
        case (VoiceButton.accidental_2) : {
            if (aPress == 1) { 
                (Monome[aCol][VoiceButton.accidental_1].isHeld) ?
                decrementParameterProperty("degree", aCol) : decrementParameterProperty("accidental", aCol);
            }
            break;
        }
        case (VoiceButton.octaveUp) : {
            if (aPress == 1) { incrementParameterProperty("octave", aCol); }
            break;
        }
        case (VoiceButton.octaveDown) : {
            if (aPress == 1) { decrementParameterProperty("octave", aCol); }
            break;
        }
        case (VoiceButton.channelUp) : {
            if (aPress == 1) { incrementParameterProperty("split", aCol); }
            break;
        }
        case (VoiceButton.channelDown) : {
            if (aPress == 1) { decrementParameterProperty("split", aCol); }
            break;
        }
        case (VoiceButton.onOff) : {
            if (aPress == 1) { toggleParameterProperty("voiceOn", aCol); }
            break;
        }
        default : {
            post("error in press aRow:", aRow, "\n");
            break;
        }
    }
}



//                                  ---===Monome Device Methods===---

function SingleCell(aCol, aRow, aOutlet) {
    this.outlet = aOutlet;

    this.col = aCol;
    this.row = aRow;
    
    // local variables
    this.actualState = 0;
    this.tempState =  0;
    this.isHeld = 0;

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
    if (mDebugLevel[1]) { post("                               --buildMonome--\n"); }
    if (mDebugLevel[2]) { post("buildMonome called\n"); }
    if (mDebugLevel[4]) {
        post("mMonomeWidth:", mMonomeWidth, "\n");
        post("mMonomeHeight:", mMonomeHeight, "\n");
    }
    
    for (var iCol = 0; iCol < mMonomeWidth; iCol++) {
        Monome[iCol] = new Array();
        for (var iRow = 0; iRow < mMonomeHeight; iRow++) {
            Monome[iCol][iRow] = new SingleCell(iCol , iRow, 2);
        }
        if (mDebugLevel[4]) { post("Monome[", iCol, "].length:", Monome[iCol].length, "\n"); }
    }
    if (mDebugLevel[4]) { post("Monome.length (width):", Monome.length, "\n"); }
}

Monome.row = function(aRow, aMethodToInvoke) {
        switch (aMethodToInvoke) {
            case "ledOn":
                var iColumn;
                for (iColumn = 0; iColumn < mMonomeWidth; iColumn++) {
                    Monome[iColumn][aRow].ledOn();
                }
                break;
            case "ledOff":
                for (iColumn = 0; iColumn < mMonomeWidth; iColumn++) {
                    Monome[iColumn][aRow].ledOff();
                }
                break;
            case "tempOn":
                for (iColumn = 0; iColumn < mMonomeWidth; iColumn++) {
                    Monome[iColumn][aRow].tempOn();
                }
                break;
            case "tempOff":
                for (iColumn = 0; iColumn < mMonomeWidth; iColumn++) {
                    Monome[iColumn][aRow].tempOff();
                }
                break;
            case "blink":
                for (iColumn = 0; iColumn < mMonomeWidth; iColumn++) {
                    Monome[iColumn][aRow].blink();
                }
                break;
            case "blinkIfOff":
                for (iColumn = 0; iColumn < mMonomeWidth; iColumn++) {
                    Monome[iColumn][aRow].blinkIfOff();
                }
                break;
            default: {
                post("error in Monome.row. aMethodToInvoke:", aMethodToInvoke, "\n");
                break;
            }
        }
};

Monome.column = function(aColumn, aMethodToInvoke) {
        switch (aMethodToInvoke) {
            case "ledOn":
                var iRow;
                for (iRow = 0; iRow < mMonomeHeight; iRow++) {
                    Monome[aColumn][iRow].ledOn();
                }
                break;
            case "ledOff":
                for (iRow = 0; iRow < mMonomeHeight; iRow++) {
                    Monome[aColumn][iRow].ledOff();
                }
                break;
            case "tempOn":
                for (iRow = 0; iRow < mMonomeHeight; iRow++) {
                    Monome[aColumn][iRow].tempOn();
                }
                break;
            case "tempOff":
                for (iRow = 0; iRow < mMonomeHeight; iRow++) {
                    Monome[aColumn][iRow].tempOff();
                }
                break;
            case "blink":
                for (iRow = 0; iRow < mMonomeHeight; iRow++) {
                    Monome[aColumn][iRow].blink();
                }
                break;
            case "blinkIfOff":
                for (iRow = 0; iRow < mMonomeHeight; iRow++) {
                    Monome[aColumn][iRow].blinkIfOff();
                }
                break;
            default: {
                post("error in Monome.column. aMethodToInvoke:", aMethodToInvoke, "\n");
                break;
            }
        }
};

function refreshMonome() {
    if (mDebugLevel[1]) { post("                               --refreshMonome--\n"); }
    var iCol;
    var iRow;
    for (iCol = 0; iCol < mMonomeWidth; iCol++) {
        for (iRow = 0; iRow < mMonomeHeight; iRow++) {
            Monome[iCol][iRow].checkActual();
        }
    }
}

function padNumber(number, length) {
   
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
   
    return str;

}
