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
        post("    --setDebugLevel = ", aLevel, "--\n");
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

var gDebugItem = {
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

var post;
var outlet;
var watchSetPlaying;
var mMonomeWidth = 8;
var mMonomeHeight = 8;
var gMonome = new Monome(mMonomeWidth, mMonomeHeight, 2);

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

var HudFormat = {
    set : 0,
    trigger : 1,
    symbol : 2,
    measures : 3,
    slotSet : 4,
    slotTrigger : 5,
    slotSymbol : 6
};

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
        type : "slotArray",
        value : [],
        minValue : 1,
        maxValue : 8,
        saveInPattr : true
    },
    accidental : {
        name : "accidental",
        type : "slotArray",
        value : [],
        minValue : -2,
        maxValue : 2,
        saveInPattr : true
    },
    octave : {
        name : "octave",
        type : "slotArray",
        value : [],
        minValue : 0,
        maxValue : 5,
        saveInPattr : true
    },
    split : {
        name : "split",
        type : "slotArray",
        value : [],
        minValue : 0,
        maxValue : 127,
        saveInPattr : true
    },
    voiceOn : {
        name : "voiceOn",
        type : "slotArray",
        value : [],
        minValue : 0,
        maxValue : 1,
        saveInPattr : true
    },
    opinion : {
        name : "opinion",
        type : "slotArray",
        value : [],
        minValue : 0,
        maxValue : 1,
        saveInPattr : true
    },
    notePlaying : {
        name : "notePlaying",
        type : "slotArray",
        value : [],
        minValue : 0,
        maxValue : 1,
        saveInPattr : true
    },
    lastPitchPlayed : {
        name : "lastPitchPlayed",
        type : "slotArray",
        value : [],
        minValue : 0,
        maxValue : 127,
        saveInPattr : true
    },
    channel :  {
        name : "channel",
        type : "number",
        value : [],
        minValue : 0,
        maxValue : 127,
        saveInPattr : true
    },
    onChange : {
        name : "onChange",
        type : "number",
        value : [],
        minValue : 0,
        maxValue : 2,
        saveInPattr : true
    },
    lastRoot : 0,
    lastVelocity : 0,
    patchString : "GsChord"
};

var onChangeValue = {
    hold : 0,
    clip : 1,
    retrigger : 2
};

function setDegree(aVoice, aValue) {
    if (aValue == undefined) { return; }
    setParameterProperty({
        key : "degree",
        slot : aVoice,
        value : aValue
    });
    updateVoiceOnMonome(aVoice);
}

function setChannel(aValue) {
    if (aValue == undefined) { return; }
    setParameterProperty({
        key : "channel",
        value : aValue
    });
}

function setAccidental(aVoice, aValue) {
    if (aValue == undefined) { return; }
    setParameterProperty({
        key : "accidental",
        slot : aVoice,
        value : aValue
    });
}

function setSplit(aVoice, aValue) {
    if (aValue == undefined) { return; }
    setParameterProperty({
        key :"split",
        slot :aVoice,
        value :aValue
    });
}

function setOctave(aVoice, aValue) {
    if (aValue == undefined) { return; }
    setParameterProperty({
        key :"octave",
        slot :aVoice,
        value :aValue
    });
}

function setVoiceOn(aVoice, aValue) {
    if (aValue == undefined) { return; }
    setParameterProperty({
        key :"voiceOn",
        slot :aVoice,
        value :aValue
    });
}

function setOpinion(aVoice, aValue) {
    if (aValue == undefined) { return; }
    setParameterProperty({
        key :"opinion",
        slot :aVoice,
        value :aValue
    });
}

function setOnChange(aValue) {
    if (aValue == undefined) { return; }
    setParameterProperty({
        key : "onChange",
        value : aValue
    });
}

function note(aPitch, aVelocity) {
    var lSemitones;
    var listArray = new Array();

    sendNoteMessage("root", aPitch, aVelocity);
    
    for (var iVoice = 0; iVoice < 8; iVoice++) {
        
        if (parameter.onChange.value == onChangeValue.hold) { flushNote(iVoice, 0); }
        
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
    gMonome.column(aVoice, "ledOff");

    if (gMonome[aVoice][VoiceButton.accidental_1].isHeld()) {
        gMonome[aVoice][VoiceButton.accidental_1].ledOn();
        
        var lBinaryString = padNumber(parameter.degree.value[aVoice].toString(2), 4);
        for (var iCounter = 0; iCounter < 4; iCounter++) {
            if ((lBinaryString.charAt(iCounter) != 0) && (lBinaryString.charAt(iCounter))) {
                    gMonome[aVoice][4 + iCounter].ledOn();
            }
        }
    }
    else {
        //accidentals
        switch (parameter.accidental.value[aVoice]) {
            case (AccidentalType.doubleFlat) : {
                gMonome[aVoice][VoiceButton.accidental_1].ledOn();
                gMonome[aVoice][VoiceButton.accidental_2].ledOn();
                break;
            }
            case (AccidentalType.flat) : {
                gMonome[aVoice][VoiceButton.accidental_2].ledOn();
                break;
            }
            case (AccidentalType.natural) : {
                break;
            }
            case (AccidentalType.sharp) : {
                gMonome[aVoice][VoiceButton.accidental_0].ledOn();
                break;
            }
            case (AccidentalType.doubleSharp) : {
                gMonome[aVoice][VoiceButton.accidental_0].ledOn();
                gMonome[aVoice][VoiceButton.accidental_1].ledOn();
                break;
            }
            default : {
                break;
            }
        }


        // On or off
        if (parameter.voiceOn.value[aVoice]) { 
            gMonome[aVoice][VoiceButton.onOff].ledOn();
        }

        //Channel Buttons
        if (parameter.split.value[aVoice] < parameter.channel.value) {
            gMonome[aVoice][VoiceButton.channelDown].ledOn();
        }
        else if (parameter.split.value[aVoice] == parameter.channel.value) { 
            gMonome[aVoice][VoiceButton.channelUp].ledOn();
            gMonome[aVoice][VoiceButton.channelDown].ledOn();
        }
        else if (parameter.split.value[aVoice] > parameter.channel.value) {
            gMonome[aVoice][VoiceButton.channelUp].ledOn();
        }
    }
}


function updateCommentDisplay(aVoice) {
    
    for (var iIntervalName in ScaleObject) {
        if (parameter.degree.value[aVoice] == ScaleObject[iIntervalName].degree) {
            
            var lScaleDegreeObject = ScaleObject[iIntervalName].value[parameter.accidental.value[aVoice] + 2];
    
            if ((parameter.octave.value[aVoice] > 1) && (parameter.opinion.value[aVoice]) && (lScaleDegreeObject.opinionated.tension != null)) {
                    sendToHud({
                        slot : aVoice,
                        key : "comment",
                        value : lScaleDegreeObject.opinionated.tension,
                        format : HudFormat.slotSet
                    });
            }
            else if ((parameter.octave.value[aVoice] > 1) && (lScaleDegreeObject.passive.tension != null)) {                
                sendToHud({
                    slot : aVoice,
                    key : "comment",
                    value : lScaleDegreeObject.passive.tension,
                    format : HudFormat.slotSet
                });
            }
            else if ((parameter.opinion.value[aVoice]) && (lScaleDegreeObject.opinionated.scale != null)) {             
                sendToHud({
                    slot : aVoice,
                    key : "comment",
                    value : lScaleDegreeObject.opinionated.scale,
                    format : HudFormat.slotSet
                });
            }
            else {              
                sendToHud({
                    slot : aVoice,
                    key : "comment",
                    value : lScaleDegreeObject.passive.scale,
                    format : HudFormat.slotSet
                });
            }
        }
    }
}

function updateVoiceDisplay(aVoice) {
    updateCommentDisplay(aVoice);
    updateVoiceOnMonome(aVoice);
    sendToHud({
        slot : aVoice,
        key : parameter.voiceOn.name,
        value : parameter.voiceOn.value[aVoice],
        format : HudFormat.slotSet
    });
    sendToHud({
        slot : aVoice,
        key : parameter.split.name,
        value : parameter.split.value[aVoice],
        format : HudFormat.slotSet
    });
    sendToHud({
        slot : aVoice,
        key : parameter.octave.name,
        value : parameter.octave.value[aVoice],
        format : HudFormat.slotSet
    });
    sendToHud({
        slot : aVoice,
        key : parameter.degree.name,
        value : parameter.degree.value[aVoice],
        format : HudFormat.slotSet
    });
    sendToHud({
        slot : aVoice,
        key : parameter.accidental.name,
        value : parameter.accidental.value[aVoice],
        format : HudFormat.slotSet
    });
}

function updateHud() {
    for (var iVoice = 0; iVoice < 8; iVoice++) {
        updateVoiceDisplay(iVoice);
    }
}


function setParameterProperty(aObject) {

    var aProperty = parameter[aObject.key],
        aValue = aObject.value,
        aSlot = (aObject.slot === undefined) ? null : aObject.slot,
        lPatcherObjectNameString,
        lValue;
    
    //check validity of aValue
    if ((aProperty.type === "number") || (aProperty.type === "toggle") || (aProperty.type === "slotArray")) {
        if ((aValue >= aProperty.minValue) && (aValue <= aProperty.maxValue)) { lValue = aValue; }
        else if (aValue < aProperty.minValue) { lValue = aProperty.minValue; }
        else if (aValue > aProperty.maxValue) { lValue = aProperty.maxValue; }
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
        updateVoiceDisplay(aSlot);
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

function changeParameterProperty(aPropertyString, aVoice, aAmount) {
    var lValue = parameter[aPropertyString].value[aVoice] + aAmount;
    setParameterProperty({
        key : aPropertyString,
        slot : aVoice,
        value : lValue
    });    
}

function toggleParameterProperty(aPropertyString, aVoice) {
    var lValue = Number(!Boolean(parameter[aPropertyString].value[aVoice]));
    setParameterProperty({
        key : aPropertyString,
        slot : aVoice,
        value : lValue
    });
}


function grabAllPattrValues() {
    grabPattrValue(parameter.voiceOn);
    grabPattrValue(parameter.split);
    grabPattrValue(parameter.octave);
    grabPattrValue(parameter.degree);
    grabPattrValue(parameter.accidental);
    grabPattrValue(parameter.onChange);
    grabPattrValue(parameter.channel);
}

function grabPattrValue(aProperty) {
    if (gDebugItem.functionName) { post("    --grabPattrValue--\n"); }
    
    var lPatcherObjectNameString = aProperty.name + parameter.patchString + "Pattr",
        iCounter,
        lLength;
        
    if (gDebugItem.startValue) { post(aProperty.name + ".value:", aProperty.value, "\n"); }
    if (gDebugItem.localValue) { post("lPatcherObjectNameString:", lPatcherObjectNameString, "\n"); }
    
    switch (aProperty.type) {
        case "number" : 
            /*jsl:fallthru*/
        case "toggle" :
            aProperty.value = Number(this.patcher.getnamed(lPatcherObjectNameString).getvalueof());
            break;
        case "string" :
            aProperty.value = String(this.patcher.getnamed(lPatcherObjectNameString).getvalueof());
            break;
        case "slotArray" :
            aProperty.value = this.patcher.getnamed(lPatcherObjectNameString).getvalueof();
            break;
        default :
            post(aProperty.name + ".type:", aProperty.type , "\n");
            break;
    }
    
    if (gDebugItem.localValue) { post("lValue from " + lPatcherObjectNameString + ":", lValue.toString(), "\n"); }
    
    if (aProperty.type == "slotArray") {
        lLength = aProperty.value.length;
        for (iCounter = 0; iCounter < lLength; iCounter++) {
            sendToHud({
                key : aProperty.name,
                value : aProperty.value[iCounter],
                format : HudFormat.slotSet,
                slot : iCounter
            });
        }
    }
    else {
        sendToHud({
            key : aProperty.name,
            value : aProperty.value,
            format : HudFormat.set
        });
    }
   
    if (gDebugItem.endValue) { post(aProperty.name + ".value:", aProperty.value, "\n"); }
}

function sendNoteMessage(aVoice, aPitch, aVelocity) {
        
    if (aVoice != "root") {
        if (parameter.split.value[aVoice] == parameter.channel.value) {
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


function sendToHud(aObject) {
    
    var lOutlet = 1,
        aKey = aObject.key,
        aValue = aObject.value,
        aFormat = (aObject.format === undefined) ? 0 : aObject.format,
        aSlot = (aObject.slot === undefined) ? null : aObject.slot;
        
    
    if (gDebugItem.functionName) { post("    --sendToHud - " + aKey + " --\n"); }
    if (gDebugItem.arguments) { post("aKey:", aKey, "aValue:", aValue, "\n"); }
    
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

var gTemplateChord = {
    ionian : {          //  r   9   3   s4  5   13  7
        voiceOn :       [   1,  1,  1,  0,  1,  1,  1,  0],
        degree :        [   1,  2,  3,  4,  5,  6,  7,  8],
        accidental :    [   0,  0,  0,  0,  0,  0,  0,  0],
        split :         [   0,  0,  0,  0,  0,  0,  0,  0],
        octave :        [   1,  2,  1,  0,  1,  2,  1,  2],
        opinion :       [   0,  0,  0,  0,  0,  0,  0,  0]
    },
    dorian : {          //  r   9   b3  11  5   s6  b7
        voiceOn :       [   1,  1,  1,  1,  1,  0,  1,  0],
        degree :        [   1,  2,  3,  4,  5,  6,  7,  8],
        accidental :    [   0,  0,  -1, 0,  0,  0,  -1, 0],
        split :         [   0,  0,  0,  0,  0,  0,  0,  0],
        octave :        [   1,  2,  1,  2,  1,  0,  1,  2],
        opinion :       [   0,  0,  0,  0,  0,  0,  0,  0]
    },
    phrygian : {        //  r   sb2 b3  11  5   sb6 b7
        voiceOn :       [   1,  0,  1,  1,  1,  0,  1,  0],
        degree :        [   1,  2,  3,  4,  5,  6,  7,  8],
        accidental :    [   0,  -1, -1, 0,  0,  -1, -1, 0],
        split :         [   0,  0,  0,  0,  0,  0,  0,  0],
        octave :        [   1,  0,  1,  2,  1,  0,  1,  2],
        opinion :       [   0,  0,  0,  0,  0,  0,  0,  0]
    },
    lydian : {          //  r   9   3   #11 5   13  7   (b7)
        voiceOn :       [   1,  1,  1,  1,  1,  1,  1,  0],
        degree :        [   1,  2,  3,  4,  5,  6,  7,  7],
        accidental :    [   0,  0,  0,  1,  0,  0,  0,  -1],
        split :         [   0,  0,  0,  0,  0,  0,  0,  0],
        octave :        [   1,  2,  1,  2,  1,  2,  1,  1],
        opinion :       [   0,  0,  0,  0,  0,  0,  0,  0]
    },

    mixolydian : {      //  r   (b9)    9   3   s4  5   13  b7
        voiceOn :       [   1,  0,      1,  1,  0,  1,  1,  1],
        degree :        [   1,  2,      2,  3,  4,  5,  6,  7],
        accidental :    [   0,  -1,     1,  0,  0,  0,  0,  -1],
        split :         [   0,  0,      0,  0,  0,  0,  0,  0],
        octave :        [   1,  2,      2,  1,  0,  1,  2,  1],
        opinion :       [   0,  0,      0,  0,  0,  0,  0,  0]
    },

    aeolian : {         //  r   9   b3  11  5   sb6 b7
        voiceOn :       [   1,  1,  1,  1,  1,  0,  1,  0],
        degree :        [   1,  2,  3,  4,  5,  6,  7,  8],
        accidental :    [   0,  0,  -1, 0,  0,  -1, -1, 0],
        split :         [   0,  0,  0,  0,  0,  0,  0,  0],
        octave :        [   1,  2,  1,  2,  1,  0,  1,  1],
        opinion :       [   0,  0,  0,  0,  0,  0,  0,  0]
    },

    locrian : {         //  r   sb2 b3  11  b5  b13 b7
        degree :        [   1,  2,  3,  4,  5,  6,  7,  8],
        accidental :    [   0,  -1, -1, 0,  -1, -1, -1, 0],
        voiceOn :       [   1,  0,  1,  1,  1,  0,  1,  0],
        split :         [   0,  0,  0,  0,  0,  0,  0,  0],
        octave :        [   1,  0,  1,  2,  1,  2,  1,  1],
        opinion :       [   0,  0,  0,  0,  0,  0,  0,  0]
    },

    symDiminished : {   //  r   9   b3  11  b5  b13 bb7 T7
        degree :        [   1,  2,  3,  4,  5,  6,  7,  7],
        accidental :    [   0,  0,  -1, 0,  -1, -1, -2, 0],
        voiceOn :       [   1,  1,  1,  1,  1,  1,  1,  0],
        split :         [   0,  0,  0,  0,  0,  0,  0,  0],
        octave :        [   1,  2,  1,  2,  1,  2,  1,  2],
        opinion :       [   0,  0,  0,  0,  0,  0,  0,  0]
        }
};

//                                  ---===Controller Methods===---
function press(aCol, aRow, aPress) {
    if (mDebugLevel[1]) { post("    --press--\n"); }
    
    if (mDebugLevel[2]) { post("press called.\n aCol:", aCol, "aRow", aRow, "aPress", aPress, "\n"); }
    
    if (aPress == 1) { gMonome[aCol][aRow].push(); }
    else if (aPress == 0) { gMonome[aCol][aRow].release(); }

    switch (aRow) {
        case (VoiceButton.accidental_0) : {
            if (aPress == 1) { 
                (gMonome[aCol][VoiceButton.accidental_1].isHeld()) ?
                changeParameterProperty("degree", aCol, 1) : changeParameterProperty("accidental", aCol, 1);
            }
            break;
        }
        case (VoiceButton.accidental_1) : {
            updateVoiceDisplay(aCol);
            break;
        }
        case (VoiceButton.accidental_2) : {
            if (aPress == 1) { 
                (gMonome[aCol][VoiceButton.accidental_1].isHeld()) ?
                changeParameterProperty("degree", aCol, -1) : changeParameterProperty("accidental", aCol, -1);
            }
            break;
        }
        case (VoiceButton.octaveUp) : {
            if (aPress == 1) { changeParameterProperty("octave", aCol, 1); }
            break;
        }
        case (VoiceButton.octaveDown) : {
            if (aPress == 1) { changeParameterProperty("octave", aCol, -1); }
            break;
        }
        case (VoiceButton.channelUp) : {
            if (aPress == 1) { changeParameterProperty("split", aCol, 1); }
            break;
        }
        case (VoiceButton.channelDown) : {
            if (aPress == 1) { changeParameterProperty("split", aCol, -1); }
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

function store(aNumber) {
    if (mDebugLevel[1]) { post("    --store--\n"); }
    
    this.patcher.getnamed("gsChordScale-presetStore").message("store", aNumber);
}

function recall(aNumber) {
    if (mDebugLevel[1]) { post("    --recall--\n"); }
    this.patcher.getnamed("gsChordScale-presetStore").message(aNumber);
    grabAllPattrValues();
    updateHud;
}

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
            lHeight = gParameters.monomeHeight.value,
            lWidth = gParameters.monomeWidth.value;

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
}

function Parameters() {
    if (gDebugItem.functionName) { post("    --Parameters--\n"); }
    
    var mParameters = this;
    
    function sendToHud(aObject) {

        var lOutlet = 2,
            aKey = aObject.key,
            aValue = (typeof aObject.value === "function") ? aObject.value() : aObject.value,
            aFormat = (aObject.format == undefined) ? Boolean(false) : aObject.format;        

        if (gDebugItem.functionName) { post("    --Parameter.sendToHud - key: " + aKey + " value: " + aValue  + " format: " + aFormat + " --\n"); }
        if (gDebugItem.functionArguments) { post("aKey:", aKey, "aValue:", aValue, "aFormat:", aFormat, "\n"); }

        switch (aFormat) {
            case "set":
                outlet(lOutlet, aKey, "set", aValue);
                break;
            case "trigger":
                outlet(lOutlet, aKey, aValue);
                break;
            case "symbol":
                outlet(lOutlet, aKey, "setsymbol", aValue);
                break;
            case "measures":
                outlet(lOutlet, aKey, "set", aValue, (aValue == 1) ? "measure" : "measures");
                break;
            case "slotSet":
                outlet(lOutlet, aSlot, aKey, "set", aValue);
                break;
            case "slotTrigger":
                outlet(lOutlet, aSlot, "setsymbol", aValue);
                break;
            case "slotSymbol":
                outlet(lOutlet, aSlot, aKey, "setsymbol", aValue);
                break;
            default: 
                post("error in Parameter.sendToHud. aFormat:", aFormat, "\n");
                break;
        }
    }
    
    this.set = function(aObject) {
        if (gDebugItem.functionName) { post("    --Parameters.set--\n"); }
        if (typeof aObject !== "object") { post("THAT IS NOT CORRECT SIR! NOT AT ALL CORRECT AND I DEMAND AN APOLOGY!"); }
        var aParameter = mParameters[aObject.key],
            aValue = aObject.value,
            aSlot = (aObject.slot === undefined) ? null : aObject.slot,
            aQuietly = (aObject.silent === true),
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
            else { post("something has gane awry in Parameter.set!\n"); }
        }
        else { lValue = aValue; }

        if (aParameter.type == "slotArray") { aParameter.value[aSlot] = lValue; }
        else { aParameter.value = lValue; }

        mParameters.display(aParameter.name);

        // call listeners
        
        if (aQuietly) { 
            return;
        }
        for (iCounter = 0; iCounter < lLength; iCounter++) {
            gThis[lListenerKeys[iCounter]]();
            if (gDebugItem.localValue) { post("lListenerKeys[" +iCounter + "]:", lListenerKeys[iCounter], "\n"); }
        }

        // Save.
        if (aParameter.saveInPattr) {
            patcherObjectNameString = aParameter.name + mParameters.patchString + "Pattr";
            gThisPatcher.getnamed(patcherObjectNameString).message(aParameter.value);
        }
    };
    
    this.display = function(aParameterName, aSlot) {
        if (gDebugItem.functionName) { post("    --Parameters.display "+ aParameterName +"--\n"); }
        
        var iCounter,
            lLength,
            aParameter = mParameters[aParameterName];
            
        if (aParameter.format != undefined) {
            if (aParameter.type == "slotArray") {
                
                if (aSlot) {
                    sendToHud({
                        key: aParameter.name,
                        value: aParameter.value[aSlot],
                        format: aParameter.format,
                        slot: aSlot
                    });
                }
                 else {
                    for (iCounter = 0, lLength = aParameter.value.length; iCounter < lLength; iCounter++) {
                        sendToHud({
                            key: aParameter.name,
                            value: aParameter.value[iCounter],
                            format: aParameter.format,
                            slot: iCounter
                        });
                    }
                }
            }
            else {
                sendToHud({
                    key: aParameter.name,
                    value: aParameter.value,
                    format: aParameter.format
                });
            }
        }
    };
    
    this.displayAll = function() {   
         if (gDebugItem.functionName) { post("    --Parameters.displayAll --\n"); }
         
        var iProperty;

        for (iProperty in mParameters) {
            if (mParameters[iProperty].format) {
                mParameters.display(iProperty);
            }
        }
    };
    
    this.toggle = function(aParameterName) {
        if (gDebugItem.functionName) { post("    --Parameters.toggle--\n"); }
        
        if (mParameters[aParameterName].type == "toggle") {
            mParameters.set({
                key : aParameterName,
                value : Number(!Boolean(mParameters[aParameterName].value))
            });
        }
        else { post(aParameterName, "is not a toggle parameter\n");}
    };
    
    this.change = function(aParameterName, aAmount) {
        if (gDebugItem.functionName) { post("    --Parameters.change--\n"); }

        mParameters.set({
            key : aParameterName,
            value : mParameters[aParameterName].value + aAmount
        });
    };
    
    this.grab = function(aParameter) {
        if (gDebugItem.functionName) { post("    --Parameters.grab " + aParameter.name + "--\n"); }

        var lPatcherObjectNameString = aParameter.name + mParameters.patchString + "Pattr",
            lValue;

        if (gDebugItem.startValue) { post(aParameter.name + ".value:", aParameter.value, "\n"); }
        if (gDebugItem.localValue) { post("lPatcherObjectNameString:", lPatcherObjectNameString, "\n"); }

        switch (aParameter.type) {
            case "number" : 
                /*jsl:fallthru*/
            case "toggle" :
                lValue = Number(gThisPatcher.getnamed(lPatcherObjectNameString).getvalueof());
                break;
            case "string" :
                lValue = String(gThisPatcher.getnamed(lPatcherObjectNameString).getvalueof());
                break;
            case "slotArray" :
                lValue = Array(gThisPatcher.getnamed(lPatcherObjectNameString).getvalueof());
                break;
            default :
                post(aParameter.name + ".type:", aParameter.type , "\n");
                break;
        }

        if (gDebugItem.localValue) { post("lValue from " + lPatcherObjectNameString + ":", lValue, "\n"); }

        mParameters.set({
            key : aParameter.name,
            value : lValue,
            silent : true
        });

        if (gDebugItem.endValue) { post(aParameter.name + ".value: ", aParameter.value, "\n"); }
    };

    this.grabAll = function() {   
         if (gDebugItem.functionName) { post("    --Parameters.grabAll --\n"); }
         
        var iProperty;

        for (iProperty in mParameters) {
            if (mParameters[iProperty].saveInPattr) {
                mParameters.grab(mParameters[iProperty]);
            }
        }
    };
}

function padNumber(number, length) {
   
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
   
    return str;

}
