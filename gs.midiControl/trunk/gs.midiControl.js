/*
-*- coding: utf-8 -*-
gs.midiControl v00.000
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
setDebugLevel(0);

var post;
var outlet;

var mMonomeWidth = 8;
var mMonomeHeight = 8;

var mTriggerWindowHeight = 4;
var mMessageBankRow = 4;
var mClientBankRow = 5;
var mClientWindowTopEdge = 6;

var Monome = [];
buildMonome();

var parameter = {
    messageBank : {
        name : "messageBank",
        value : 0,
        minValue : 0,
        maxValue : 7
    },
    clientBank : {
        name : "clientBank",
        value : 0,
        minValue : 0,
        maxValue : 7
    },
    currentClient : {
        name : "currentClient",
        value : 0,
        minValue : 0,
        maxValue : 127
    },
    patchString : "GsMidiControl"
};

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

var eBankType = {
    programChange : 0,
    note : 1
};

function initialize() {
    grabAllPattrValues();
    updateMessageBankOnMonome();
    updateClientBankOnMonome();
}


function getBankType(aBankNumber) {
    if ((aBankNumber >= 0) && (aBankNumber <= 3)) {
        return eBankType.programChange;
    }
    else if ((aBankNumber >= 4) && (aBankNumber <= 7)) {
        return eBankType.note;
    }
    else {
        post("invalid bank:", aBankNumber, "\n");
        return NaN;
    }
}

function makeMessageNumber(aCol, aRow) {
    
    var lTriggerNumber = aRow * mMonomeWidth + aCol; // 'raw'
    var lBankOffset = 32;
    
    if (getBankType(parameter.messageBank.value) == eBankType.programChange) {
        lBankOffset *= parameter.messageBank.value;
    }
    else if (getBankType(parameter.messageBank.value) == eBankType.note) {
        lBankOffset *= (parameter.messageBank.value - 4);
    }
    else {
        post("error in getMessageValue parameter.messageBank.value:", parameter.messageBank.value, "\n");
    }
    
    lTriggerNumber += lBankOffset;
    
    return lTriggerNumber;
}

function makeClientNumber(aCol, aRow) {
    var lNumber = (aRow - mClientWindowTopEdge) * mMonomeWidth + aCol; // 'raw'
    
    lNumber += (16 * parameter.clientBank.value);
    
    post("Client:", lNumber, "\n");
    return lNumber;
}

function setDebugLevel(aLevel) {
    if (aLevel > 0) { post("    --setDebugLevel = ", aLevel, "--\n"); }
    mDebugLevel = new Array();
     for (var c = 0; c < 9; c++) {
        if (c <= aLevel) {
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
function sendToHud(aKey, aValue, aFormat) {
    if (mDebugLevel[1]) { post("    --sendToHud - " + aKey + " --\n"); }
    if (mDebugLevel[5]) { post("aKey:", aKey, "aValue:", aValue, "\n"); }
    var lOutlet = 1;
    
    switch (aFormat) {
        case 0:
            outlet(lOutlet, aKey, "set", aValue);
            break;
        case 1:
            outlet(lOutlet, aKey, aValue);
            break;
        case 2:
            outlet(lOutlet, aKey, "setsymbol", aValue);
            break;
        case 3:
            outlet(lOutlet, aKey, "set", aValue, (aValue == 1) ? "measure" : "measures");
            break;
        default: {
            post("error in sendToHud. aFormat:", aFormat, "\n");
            break;
        }
    }
}

function setCurrentClient(aClientNumber) {
    setParameterProperty("currentClient", aClientNumber);
    updateClientWindow();
}

function setMessageBank(aValue) {
    setParameterProperty("messageBank", aValue);
    updateMessageBankOnMonome();
}

function sendMessageNumber(aNumber, aPress) {
    if (mDebugLevel[1]) { post("    --sendMessageNumber--\n"); }

    if (getBankType(parameter.messageBank.value) == eBankType.programChange) {
        if (aPress == 1) {messnamed("gs.channel", "channelProgramChange", parameter.currentClient.value, aNumber); }
    }
    else if (getBankType(parameter.messageBank.value) == eBankType.note) {
        messnamed("gs.channel", "channelNote",parameter.currentClient.value, aNumber, aPress*127);
    }
    else {
        post("error in sendMessageNumber parameter.messageBank.value:", parameter.messageBank.value, "\n");
        post("error in getBankType:", getBankType(parameter.messageBank.value), "\n");
    }
}


function setClientBank(aValue) {
    setParameterProperty("clientBank", aValue);
    updateClientBankOnMonome();
}

function updateClientBankOnMonome() {
    Monome.row(mClientBankRow, "ledOff");
    Monome[parameter.clientBank.value][mClientBankRow].ledOn();
    updateClientWindow();
}

function updateClientWindow() {
    Monome.row(6, "ledOff");
    Monome.row(7, "ledOff");
    
    var lRelativeValue = parameter.currentClient.value % 16; 
    var lBank = (parameter.currentClient.value - lRelativeValue) / 16;
    post("lBank:", lBank, "\n");
    if (lBank == parameter.clientBank.value) {
        var lRow = (lRelativeValue >= 8) ? 7: 6;
        var lCol = parameter.currentClient.value % 8;
        
        Monome[lCol][lRow].ledOn();
    }
}


function updateMessageBankOnMonome() {
    Monome.row(mMessageBankRow, "ledOff");
    Monome[parameter.messageBank.value][mMessageBankRow].ledOn();
}

//                                  ---===Controller Methods===---
function press(aCol, aRow, aPress) {
    if (mDebugLevel[1]) { post("    --press--\n"); }
    
    if (mDebugLevel[2]) {
        post("press called.\n aCol:", aCol, "aRow", aRow, "aPress", aPress, "\n");
    }
    
    if (aPress == 1) { Monome[aCol][aRow].push(); }
    else if (aPress == 0) { Monome[aCol][aRow].release(); }
    
    if (aRow < mTriggerWindowHeight) {
        sendMessageNumber(makeMessageNumber(aCol, aRow), aPress);
        switch (aPress) {
            case (1) : {
                Monome[aCol][aRow].ledOn();
                break;
            }
            case (0) : {
                Monome[aCol][aRow].ledOff();
                break;
            }
            default : {
                post("aPress:", aPress, "\n");
                break;
            }
        }
    }
    else if (aRow == mMessageBankRow) {
        switch (aPress) {
            case (1) : {
                setMessageBank(aCol);
                break;
            }
            case (0) : {
                break;
            }
            default : {
                post("aPress:", aPress, "\n");
                break;
            }
        }
    }
    else if (aRow == mClientBankRow) {
        switch (aPress) {
            case (1) : {
                setClientBank(aCol);
                break;
            }
            case (0) : {
                break;
            }
            default : {
                post("aPress:", aPress, "\n");
                break;
            }
        }
    }
    else if ((aRow > mClientBankRow) && (aRow < mMonomeHeight)) {
        switch (aPress) {
            case (1) : {
                setCurrentClient(makeClientNumber(aCol, aRow));
                break;
            }
            case (0) : {
                break;
            }
            default : {
                post("aPress:", aPress, "\n");
                break;
            }
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
    if (mDebugLevel[1]) { post("    --buildMonome--\n"); }
    if (mDebugLevel[2]) { post("buildMonome called\n"); }
    if (mDebugLevel[4]) {
        post("mMonomeWidth:", mMonomeWidth, "\n");
        post("mMonomeHeight:", mMonomeHeight, "\n");
    }
    
    for (var iCol = 0; iCol < mMonomeWidth; iCol++) {
        Monome[iCol] = new Array();
        for (var iRow = 0; iRow < mMonomeHeight; iRow++) {
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
    if (mDebugLevel[1]) { post("    --refreshMonome--\n"); }
    var iCol;
    var iRow;
    for (iCol = 0; iCol < mMonomeWidth; iCol++) {
        for (iRow = 0; iRow < mMonomeHeight; iRow++) {
            Monome[iCol][iRow].checkActual();
        }
    }
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
    
    var patcherObjectNameString = parameter[aPropertyString].name + parameter.patchString + "Object";
    this.patcher.getnamed(patcherObjectNameString).message("set", parameter[aPropertyString].value);
    
}

function changeParameterProperty(aPropertyString, aAmount) {
    var lValue = parameter[aPropertyString].value + aAmount;
    setParameterProperty(aPropertyString, lValue);    
}

function toggleParameterProperty(aPropertyString) {
    var lValue = Number(!Boolean(parameter[aPropertyString].value));
    setParameterProperty(aPropertyString, lValue);
}

function grabAllPattrValues() {
    grabPattrValue(parameter.currentClient);
    grabPattrValue(parameter.messageBank);
    grabPattrValue(parameter.clientBank);
}

function grabPattrValue(aProperty) {
    var patcherObjectNameString = aProperty.name + parameter.patchString + "Object";
    aProperty.value = Number(this.patcher.getnamed(patcherObjectNameString).getvalueof());
}