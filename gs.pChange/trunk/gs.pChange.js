/*
-*- coding: utf-8 -*-
gs.pChange v00.000
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
var outlets = 2;

var mDebugLevel;

var post;
var outlet;
var Monome = [];

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

var parameter = {
    monomeWidth : {
        name : "monomeWidth",
        type : "number",
        value : 0,
        minValue : 2,
        maxValue : 2048,
        saveInPattr : true
    },
    monomeHeight : {
        name : "monomeHeight",
        type : "number",
        value : 0,
        minValue : 2,
        maxValue : 2048,
        saveInPattr : true
    },
    channel : {
        name : "channel",
        type : "number",
        value : 0,
        minValue : 0,
        maxValue : 127,
        saveInPattr : true
    },
    patchString : "GsProgramChange"
};

function initialize() {
    setDebugLevel(0);
    grabAllPattrValues();
    sendToHud({
        key : "monomeWidth",
        value : parameter.monomeWidth.value,
        format : HudFormat.set
    });
    sendToHud({
        key : "monomeHeight",
        value : parameter.monomeHeight.value,
        format : HudFormat.set
    });
    sendToHud({
        key : "channel",
        value : parameter.channel.value,
        format : HudFormat.set
    });
    
    buildMonome();
}

var HudFormat = {
    set : 0
};

function setDebugLevel(level) {
    if (level > 0) { post("                           --setDebugLevel = ", level, "--\n"); }
    mDebugLevel = new Array();
     for (var c = 0; c < 6; c++) {
        if (c <= level) {
            mDebugLevel[c] = true;
        }
        else {
            mDebugLevel[c] = false;
        }
    }
}

//mDebugLevel[1] = true;
//mDebugLevel[2] = true;
//mDebugLevel[3] = true;
//mDebugLevel[4] = true;
//mDebugLevel[5] = true;
//mDebugLevel[6] = true;
//mDebugLevel[7] = true;
//mDebugLevel[8] = true;
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


//                                  ---===Communicate with Patcher===---
function sendToHud(aObject) {
    
    var lOutlet = 1,
        aKey = aObject.key,
        aValue = aObject.value,
        aFormat = (aObject.format === undefined) ? 0 : aObject.format,
        aSlot = (aObject.slot === undefined) ? null : aObject.slot;
        
    
    if (debugItem.functionName) { post("                               --sendToHud - " + aKey + " --\n"); }
    if (debugItem.list) { post("aKey:", aKey, "aValue:", aValue, "\n"); }
    
    switch (aFormat) {
        case HudFormat.set:
            outlet(lOutlet, aKey, "set", aValue);
            break;
        default: 
            post("error in sendToHud. aFormat:", aFormat, "\n");
            break;
    }
}

//                                  ---===Controller Methods===---
function press(aCol, aRow, aPress) {
    var lNumber;
    if (mDebugLevel[1]) { post("                               --press--\n"); }
    
    if (mDebugLevel[2]) {
        post("press called.\n aCol:", aCol, "aRow", aRow, "aPress", aPress, "\n");
    }
    
    if (aPress == 1) {
        lNumber = aRow * parameter.monomeWidth.value + aCol;
        sendMessageNumber(lNumber);
        Monome[aCol][aRow].push();
        Monome[aCol][aRow].ledOn();
    }
    else if (aPress == 0) {
        Monome[aCol][aRow].release();
        Monome[aCol][aRow].ledOff();
    }
}

function sendMessageNumber(aNumber) {
    
    messnamed("gs.channel", "channelProgramChange", parameter.channel.value, aNumber);

}

function setChannel(aChannel) {
    setParameterProperty({
        key : "channel",
        value : aChannel
    });
}


//                                  ---===Monome Device Methods===---
function setMonomeWidth( aWidth) {
    setParameterProperty({
        key : "monomeWidth",
        value : aWidth
    });
    buildMonome();
}
function setMonomeHeight( aHeight) {
    setParameterProperty({
        key : "monomeHeight",
        value : aHeight
    });
    buildMonome();
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
    if (mDebugLevel[1]) { post("                               --buildMonome--\n"); }
    if (mDebugLevel[2]) { post("buildMonome called\n"); }
    if (mDebugLevel[4]) {
        post("parameter.monomeWidth.value:", parameter.monomeWidth.value, "\n");
        post("parameter.monomeHeight.value:", parameter.monomeHeight.value, "\n");
    }
    
    for (var iCol = 0; iCol < parameter.monomeWidth.value; iCol++) {
        Monome[iCol] = new Array();
        for (var iRow = 0; iRow < parameter.monomeHeight.value; iRow++) {
            Monome[iCol][iRow] = new SingleCell(iCol , iRow, 0);
        }
        if (mDebugLevel[4]) { post("Monome[", iCol, "].length:", Monome[iCol].length, "\n"); }
    }
    if (mDebugLevel[4]) { post("Monome.length (width):", Monome.length, "\n"); }
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
    for (iCol = 0; iCol < parameter.monomeWidth.value; iCol++) {
        for (iRow = 0; iRow < parameter.monomeHeight.value; iRow++) {
            Monome[iCol][iRow].checkActual();
        }
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
        this.patcher.getnamed(patcherObjectNameString).message(aProperty.value);
    }
}

function changeParameterProperty(aPropertyString, aAmount) {
    var lValue = parameter[aPropertyString].value + aAmount;
    setParameterProperty({
        key : aPropertyString,
        value : lValue
    });    
}

function toggleParameterProperty(aPropertyString) {
    var lValue = Number(!Boolean(parameter[aPropertyString].value));
    setParameterProperty({
        key : aPropertyString,
        value : lValue
    });
}

function grabAllPattrValues() {
    grabPattrValue(parameter.monomeWidth);
    grabPattrValue(parameter.monomeHeight);
    grabPattrValue(parameter.channel);
}

function grabPattrValue(aProperty) {
    var patcherObjectNameString = aProperty.name + parameter.patchString + "Object";
    aProperty.value = Number(this.patcher.getnamed(patcherObjectNameString).getvalueof());
}