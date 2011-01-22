/*
-*- coding: utf-8 -*-
gs.tile.client v0.020
Copyright (c) 2010, TJ Usiyan a.k.a. griotspeak
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the gs.tile nor the
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

autowatch = 1;

inlets = 2;
outlets = 2;

var debugItem = {
    endValue : false,
    frequentItem : false,
    frequentList: false,
    functionName : false,
    list : false,
    localValue : false,
    frequentFunctionName : false,
    startValue : false
};

var Monome = [];

var parameter = {
    appMonomeWidth : {
        name : "appMonomeWidth",
        value : 8,
        minValue : 2,
        maxValue : 2048,
        saveInPattr : true
    },
    appMonomeHeight : {
        name : "appMonomeHeight",
        value : 8,
        minValue : 2,
        maxValue : 2048,
        saveInPattr : true
    },
    appMonomeNumber : {// used by router
        name : "appMonomeNumber",
        value : 1,
        minValue : 0,
        maxValue : 127,
        saveInPattr : true
    },
    appMonomeLayer : {
        name : "appMonomeLayer",
        value : 1,
        minValue : 0,
        maxValue : 127,
        saveInPattr : true
    },
	appChannelNumber : {
	    name : "appChannelNumber",
	    value : 0,
	    minValue : 0,
	    maxValue : 3,
        saveInPattr : true
	},
    windowWidth : {// used by client
        name : "windowWidth",
        value : 8,
        minValue : 1,
        maxValue : 2048,
        saveInPattr : true
    },
    windowHeight : {// used by client
        name : "windowHeight",
        value : 8,
        minValue : 1,
        maxValue : 2048,
        saveInPattr : true
    },
    windowColumnOffset : {// used by client
        name : "windowColumnOffset",
        value : 0,
        minValue : 0,
        maxValue : 2048,
        saveInPattr : true
    },
    windowRowOffset : {// used by client
        name : "windowRowOffset",
        value : 0,
        minValue : 0,
        maxValue : 2048,
        saveInPattr : true
    },
    displayColumnOffset : {// used by router
        name : "displayColumnOffset",
        value : 0,
        minValue : -2048,
        maxValue : 2048,
        saveInPattr : true
    },
    displayRowOffset : {// used by router
        name : "displayRowOffset",
        value : 0,
        minValue : -2048,
        maxValue : 2048,
        saveInPattr : true
    },
    comOrderNumber : {
        name : "comOrderNumber",
        value : 0,
        minValue : 0,
        maxValue : 127,
        saveInPattr : true
    },
    channelMade : {
        value : false,
        saveInPattr : false
    },
    randomKeyOne : {
        name : "randomKeyOne",
        value : null,
        minValue : 0,
        maxValue : 1000,
        saveInPattr : true
    },
    randomKeyTwo : {
        name : "randomKeyTwo",
        value : null,
        minValue : 0,
        maxValue : 1000,
        saveInPattr : true
    },
    appChannelGlobalObject : {
        value : null,
        saveInPattr : false
    },
    patchString : "GsTileClient"
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
    if (debugItem.functionName) { post("    --initialize--\n"); }
    if (this.patcher.getnamed("parametersLoadedGsTileClientPattr").getvalueof() == 1) {
        grabAllPattrValues();
        
        if (parameter.randomKeyOne.value == 0) { setParameterProperty("randomKeyOne", Math.floor(Math.random()*1000) + 1); }
        if (parameter.randomKeyTwo.value == 0) { setParameterProperty("randomKeyTwo", Math.floor(Math.random()*1000) + 1); }
        
        Monome = [];
        buildMonome();
        alertRouterOfNewClient();

    }
}



var mAppName = (jsarguments[1]    !=      null)       ?    jsarguments[1]      :       "unnamedClient";

var gsTileGlobal = new Global("gsTileRouter");
if (!gsTileGlobal.appWindow) { gsTileGlobal.appWindow = false; }
if (!gsTileGlobal.removeClient) { gsTileGlobal.removeClient = false; }
if (!gsTileGlobal.led) {gsTileGlobal.led = false; }
if (!gsTileGlobal.newClient) { gsTileGlobal.newClient = false; }


//                        ---===Abstraction is a pain ===---
//            We do --NOT-- include edges
//             greater than and less than
//            NOT equal to
function leftEdgeOfDisplayedWindow(){
    return parameter.windowColumnOffset.value - 1;
}

function rightEdgeOfDisplayedWindow() {
    return parameter.windowColumnOffset.value + parameter.windowWidth.value;
}

function topEdgeOfWindow() {
    return parameter.windowRowOffset.value -1;
}

function bottomEdgeOfWindow() {
    return parameter.windowRowOffset.value + parameter.windowHeight.value;
}

//                        ---===Getter and Setter Functions===---
                        
function setWindowWidth(aValue) {
    if (debugItem.functionName) { post("    --setWindowWidth--\n"); }
    setParameterProperty("windowWidth", aValue);
    updateAppWindow();
}

function setWindowHeight(aValue) {
    if (debugItem.functionName) { post("    --setWindowHeight--\n"); }
    setParameterProperty("windowHeight", aValue);
    updateAppWindow();
}

function updateAppWindow() {
    if (gsTileGlobal.appWindow) {
        if (debugItem.list) { post("appName:", mAppName, "channel:", parameter.appChannelNumber.value, "windowHeight:", parameter.windowHeight.value, "\n"); }
        gsTileGlobal.appWindow(
            mAppName,
            parameter.appChannelNumber.value,
            parameter.randomKeyOne.value,
            parameter.randomKeyTwo.value,
            parameter.appMonomeNumber.value,
            parameter.windowWidth.value,
            parameter.windowHeight.value,
            parameter.displayColumnOffset.value,
            parameter.displayRowOffset.value,
            parameter.appMonomeLayer.value);
    }
}


function setWindowColumnOffset(aValue) {
    if (debugItem.functionName) { post("    --setWindowColumnOffset--\n"); }
    
    setParameterProperty("windowColumnOffset", aValue);
    
    if (gsTileGlobal.newClient) {
        messnamed("mMC.allClients", "refreshWindow");
    }
}

function setWindowRowOffset(aValue) {
    if (debugItem.functionName) { post("    --setWindowRowOffset--\n"); }
    
    setParameterProperty("windowRowOffset", aValue);
    
    if (gsTileGlobal.newClient) {
        messnamed("mMC.allClients", "refreshWindow");
    }
}

function list() {
    if ((arguments.length == 3) && !isNaN(parseFloat(arguments[0])) && isFinite(arguments[0])) {
        led(arguments[0], arguments[1], arguments[2]);
    }
}


function setDisplayColumnOffset(aValue) {
    if (debugItem.functionName) { post("    --setDisplayColumnOffset--\n"); }
    setParameterProperty("displayColumnOffset", aValue);
    updateAppWindow();
}

function setDisplayRowOffset(aValue) {
    if (debugItem.functionName) { post("    --setDisplayRowOffset--\n"); }
    setParameterProperty("displayRowOffset", aValue);
    updateAppWindow();
}

function setAppMonomeNumber(aValue) {
    if (debugItem.functionName) { post("    --setAppMonomNumber--\n"); }
    setParameterProperty("appMonomeNumber", aValue);
    updateAppWindow();
}

function setAppMonomeLayer(aValue) {
    if (debugItem.functionName) { post("    --setAppMonomLayer--\n"); }
    setParameterProperty("appMonomeLayer", aValue);
    updateAppWindow();
}


function incrementDisplayColumnOffset() {
    if (debugItem.functionName) { post("    --incrementDisplayColumnOffset--\n"); }
    changeParameterProperty("displayColumnOffset", 1);
    updateAppWindow();
}

function decrementDisplayColumnOffset() {
    if (debugItem.functionName) { post("    --decrementDisplayColumnOffset--\n"); }
    changeParameterProperty("displayColumnOffset", -1);
    updateAppWindow();
}

function incrementDisplayRowOffset() {
    if (debugItem.functionName) { post("    --incrementDisplayRowOffset--\n"); }
    changeParameterProperty("displayRowOffset", 1);
    updateAppWindow();
}

function decrementDisplayRowOffset() {
    if (debugItem.functionName) { post("    --decrementDisplayRowOffset--\n"); }
    changeParameterProperty("displayRowOffset", -1);
    updateAppWindow();
}

function newRouterAlert() {
    alertRouterOfNewClient();
}

function hasChannel() {
    if (parameter.appChannelNumber.value == null) { return 0; }
    else { return 1; }
}

function alertRouterOfNewClient() {
    if (debugItem.functionName) { post("    --alertRouterOfNewClient--\n"); }
    
    // send: "newClientNotification"
    // 0<appName> 1<randomKey> 2<hasChannel> 3<channelIfAssigned>
    // 4<windowWidth> 5<height> 6<windowColumnOffset> 7<windowRowOffset>
    if (gsTileGlobal.newClient) {
        if (debugItem.endValue) { 
            post("appName", mAppName,
            "randomKeyOne", parameter.randomKeyOne.value,
            "randomKeyTwo", parameter.randomKeyTwo.value,
            "comOrderNumber", parameter.comOrderNumber.value,
            "appMonomeNumber", parameter.appMonomeNumber.value, "\n");
            post(
                "windowWidth", parameter.windowWidth.value,
                "windowHeight", parameter.windowHeight.value,
                "displayColumnOffset", parameter.displayColumnOffset.value,
                "displayRowOffset", parameter.displayRowOffset.value, "\n");
        }
        gsTileGlobal.newClient(
            mAppName,
            parameter.randomKeyOne.value,
            parameter.randomKeyTwo.value,
            parameter.comOrderNumber.value,
            parameter.appMonomeNumber.value,
            parameter.windowWidth.value,
            parameter.windowHeight.value,
            parameter.displayColumnOffset.value,
            parameter.displayRowOffset.value,
            parameter.appMonomeLayer.value);
    }
}

function freebang () {
    if (debugItem.functionName) { post("    ---freebang-\n"); }
    sendRemoveClient();
}

function sendRemoveClient() {
    if (debugItem.functionName) { post("    --sendRemoveClient--\n"); }
    if (debugItem.list) { post("request removal of:", mAppName, parameter.randomKeyOne.value, parameter.randomKeyTwo.value, "\n"); }
    gsTileGlobal.removeClient(mAppName, parameter.appChannelNumber.value, parameter.randomKeyOne.value, parameter.randomKeyTwo.value);
}


function closebang() {
    if (debugItem.functionName) { post("    ---closebang-\n"); }
}


function alertRouterofClientRemoval() {
    if (debugItem.functionName) { post("    ---alertRouterofClientRemoval-\n"); }
    sendRemoveClient();
}


function clientAcknowledgement(aName, aChannelNumber, aKey1, aKey2) {
    if (debugItem.functionName) { post("    ---processClientAcknowledgement-\n"); }
    
    if (debugItem.list) { 
        post("full array:", aName, aChannelNumber, aKey1, aKey2, "\n");
        post("client name:", aName, "channel num:", aChannelNumber, "client key 1:", aKey1, " key 2:", aKey2, "\n");
        post("my name:", mAppName, "and keys:", parameter.randomKeyOne.value, parameter.randomKeyTwo.value, "\n");
    }
    if((aName == mAppName) && (aKey1 == parameter.randomKeyOne.value) && (aKey2 == parameter.randomKeyTwo.value)) {
        if (debugItem.endValue) { post("channel:", aChannelNumber, "\n"); }
        //make the send and recieve objects.
        makeChannel(aChannelNumber);
    }
}

function prepareLedForRouter(aColumnFromMonomeFunction, aRowFromMonomeFunction, aStateFromMonomeFunction) {    
    if (debugItem.frequentFunctionName) { post("    ---prepareLedForRouter-\n"); }
    
    var lTranslatedColumn = aColumnFromMonomeFunction - parameter.windowColumnOffset.value;
    var lTranslatedRow = aRowFromMonomeFunction - parameter.windowRowOffset.value;
    
    if (isInWindow(aColumnFromMonomeFunction, aRowFromMonomeFunction) && gsTileGlobal.led) {
        if (debugItem.frequentItem) { post("in window and channel made!\n"); }
        gsTileGlobal.led(
            mAppName,
            parameter.appChannelNumber.value,
            parameter.randomKeyOne.value,
            parameter.randomKeyTwo.value,
            parameter.appMonomeNumber.value,
            lTranslatedColumn,
            lTranslatedRow,
            aStateFromMonomeFunction);
   }
}

function isInWindow(aColumnInQuestion, aRowInQuestion) {
    if (debugItem.functionName) { post("    --isInWindow--\n"); }
    
    if (debugItem.frequentList) {
        post("col:", aColumnInQuestion, "row:", aRowInQuestion, "\n");
        post("leftEdgeOfDisplayedWindow:", leftEdgeOfDisplayedWindow(), "rightEdgeOfDisplayedWindow:", rightEdgeOfDisplayedWindow(), "\n");
        post("topEdgeOfWindow:", topEdgeOfWindow(), "bottomEdgeOfWindow:", bottomEdgeOfWindow(), "\n");
    }
    
    
    if ((leftEdgeOfDisplayedWindow() < aColumnInQuestion) && (aColumnInQuestion < rightEdgeOfDisplayedWindow())) {
        if ((topEdgeOfWindow() < aRowInQuestion) && (aRowInQuestion < bottomEdgeOfWindow())) { return true; }
    }

    else {
        return false;
    }
}

function makeChannel(aChannelNumber) {
    if (debugItem.functionName) { post("    ---makeChannel-\n"); }
    
    appChannel = null;
    parameter.appChannelNumber.value = aChannelNumber;
    var lChannelName = mAppName + aChannelNumber;
    appChannel = new Global(lChannelName);
    if (debugItem.startValue) { 
        post("channelName in client:", lChannelName, "\n");
        post("channel", mAppName + aChannelNumber, "created\n");
    }
    appChannel.connection = processMessagesOnPrivateChannel;
    appChannel.press = processPress;
    
    parameter.channelMade.value = true;
}

function processPress(aColumnFromRouter, aRowFromRouter, aStateFromRouter) {
    if (debugItem.functionName) { post("    ---press-\n"); }
    if (debugItem.endValue) { post("column", aColumnFromRouter, "row", aRowFromRouter, "state", aStateFromRouter ); }
    
    var lTranslatedColumn = aColumnFromRouter + parameter.windowColumnOffset.value;
    var lTranslatedRow = aRowFromRouter + parameter.windowRowOffset.value;
    
    //        not doing anything with this yet, but eventually
    if (aStateFromRouter == 1) {
        Monome[lTranslatedColumn][lTranslatedRow].push();
    }
    else if(aStateFromRouter == 0) {
        Monome[lTranslatedColumn][lTranslatedRow].release();
    }    
    //        -/
    
    outlet(0, lTranslatedColumn, lTranslatedRow, aStateFromRouter);
}


function processMessagesOnPrivateChannel(aArray) {
    if (debugItem.functionName) { post("    ---processMessagesOnPrivateChannel-\n"); }

    post("app:", mAppName, "array:", aArray, "\n");
}

function led (aColumnFromPatcher, aRowFromPatcher, aStateFromPatcher) {
    if (debugItem.functionName) { post("    ---led-\n"); }
    
    if (debugItem.startValue) { post("raw col:", aColumnFromPatcher, "row:", aRowFromPatcher, "\n"); }

    
    if (aStateFromPatcher == 1) {
        Monome[aColumnFromPatcher][aRowFromPatcher].ledOn();
    }
    else if(aStateFromPatcher == 0) {
        Monome[aColumnFromPatcher][aRowFromPatcher].ledOff();
    }
}

function ledCol (aColumnFromPatcher, aStateFromPatcher) {
    if (debugItem.functionName) { post("    ---ledCol-\n"); }
    
    var lDecimalNumberValue = Number(aStateFromPatcher);
    var lBinaryNumberValue = lDecimalNumberValue.toString(2); // little endian
    if (debugItem.startValue) { post("raw col:", aColumnFromPatcher, "decimal:", aStateFromPatcher, "binary:", lBinaryNumberValue, "\n"); }
    
    var lengthOfBinary = lBinaryNumberValue.length; 
    for (var iRow = 0; iRow < lengthOfBinary; iRow++) {
        
        if (lBinaryNumberValue[iRow] == 1) {
            Monome[aColumnFromPatcher][lengthOfBinary - iRow - 1].ledOn();
        }
        else if(lBinaryNumberValue[iRow] == 0) {
            Monome[aColumnFromPatcher][lengthOfBinary - iRow - 1].ledOff();
        }
    }
}

function ledRow (aRowFromPatcher, aStateFromPatcher) {
    if (debugItem.functionName) { post("    ---ledCol-\n"); }
    
    var lDecimalNumberValue = Number(aStateFromPatcher);
    var lBinaryNumberValue = lDecimalNumberValue.toString(2); // little endian
    if (debugItem.startValue) { post("raw row:", aColumnFromPatcher, "decimal:", aStateFromPatcher, "binary:", lBinaryNumberValue, "\n"); }
    
    var lengthOfBinary = lBinaryNumberValue.length; 
    for (var iColumn = 0; iColumn < lengthOfBinary; iColumn++) {
        
        if (lBinaryNumberValue[iColumn] == 1) {
            Monome[lengthOfBinary - iColumn - 1][aRowFromPatcher].ledOn();
        }
        else if(lBinaryNumberValue[iColumn] == 0) {
            Monome[lengthOfBinary - iColumn - 1][aRowFromPatcher].ledOff();
        }
    }
}

//                                  ---===Monome Device Methods===---

function setAppMonomeWidth(aValue) {
    if (debugItem.functionName) { post("    ---setAppMonomeWidth-\n"); }
    
    setParameterProperty("appMonomeWidth", aValue);

    buildMonome();
        
    updateAppWindow();
}

function setAppMonomeHeight(aValue) {
    if (debugItem.functionName) { post("    ---setAppMonomeHeight-\n"); }
    
    setParameterProperty("appMonomeHeight", aValue);

    buildMonome();
        
    updateAppWindow();
}

function SingleCell(col, row) {
    this.outlet = 0;

    this.col = col;
    this.row = row;
    
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
        prepareLedForRouter(this.col, this.row, this.actualState);
    };

    this.ledOff = function() {
        this.actualState = 0;
        prepareLedForRouter(this.col, this.row, this.actualState);
    };

    this.checkActual = function() {
        prepareLedForRouter(this.col, this.row, this.actualState);
        this.tempState = 0;
    };

    this.blink = function() {
        this.tempState = (this.tempState == 1) ? 0:1;
        prepareLedForRouter(this.col, this.row, this.tempState);
    };

    this.blinkIfOff = function() {
        if (this.actualState == 0) {
            this.tempState = (this.tempState == 1) ? 0:1;
            prepareLedForRouter(this.col, this.row, this.tempState);
        }
    };

    this.tempOn = function() {
        this.tempState = 1;
        prepareLedForRouter(this.col, this.row, this.tempState);
    };

    this.tempOff = function() {
        this.tempState = 0;
        prepareLedForRouter(this.col, this.row, this.tempState);
    };
}

function buildMonome() {
    if (debugItem.functionName) { post("    --buildMonome--\n"); }
    if (debugItem.startValue) {
        post("monomeWidth:", parameter.appMonomeWidth.value, "\n");
        post("monomeHeight:", parameter.appMonomeHeight.value, "\n");
    }
    
    for (var iWidth = 0; iWidth < (parameter.appMonomeWidth.value); iWidth++) {
        Monome[iWidth] = new Array();
        for (var iHeight = 0; iHeight < (parameter.appMonomeHeight.value); iHeight++) {
            Monome[iWidth][iHeight] = new SingleCell(iWidth , iHeight);
        }
    }
}

Monome.row = function(aRow, aMethodToInvoke) {
        switch (aMethodToInvoke) {
            case "ledOn":
                var iColumn;
                for (iColumn = 0; iColumn < parameter.appMonomeWidth.value; iColumn++) {
                    Monome[iColumn][aRow].ledOn();
                }
                break;
            case "ledOff":
                for (iColumn = 0; iColumn < parameter.appMonomeWidth.value; iColumn++) {
                    Monome[iColumn][aRow].ledOff();
                }
                break;
            case "tempOn":
                for (iColumn = 0; iColumn < parameter.appMonomeWidth.value; iColumn++) {
                    Monome[iColumn][aRow].tempOn();
                }
                break;
            case "tempOff":
                for (iColumn = 0; iColumn < parameter.appMonomeWidth.value; iColumn++) {
                    Monome[iColumn][aRow].tempOff();
                }
                break;
            case "blink":
                for (iColumn = 0; iColumn < parameter.appMonomeWidth.value; iColumn++) {
                    Monome[iColumn][aRow].blink();
                }
                break;
            case "blinkIfOff":
                for (iColumn = 0; iColumn < parameter.appMonomeWidth.value; iColumn++) {
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
                for (iRow = 0; iRow < parameter.appMonomeHeight.value; iRow++) {
                    Monome[aColumn][iRow].ledOn();
                }
                break;
            case "ledOff":
                for (iRow = 0; iRow < parameter.appMonomeHeight.value; iRow++) {
                    Monome[aColumn][iRow].ledOff();
                }
                break;
            case "tempOn":
                for (iRow = 0; iRow < parameter.appMonomeHeight.value; iRow++) {
                    Monome[aColumn][iRow].tempOn();
                }
                break;
            case "tempOff":
                for (iRow = 0; iRow < parameter.appMonomeHeight.value; iRow++) {
                    Monome[aColumn][iRow].tempOff();
                }
                break;
            case "blink":
                for (iRow = 0; iRow < parameter.appMonomeHeight.value; iRow++) {
                    Monome[aColumn][iRow].blink();
                }
                break;
            case "blinkIfOff":
                for (iRow = 0; iRow < parameter.appMonomeHeight.value; iRow++) {
                    Monome[aColumn][iRow].blinkIfOff();
                }
                break;
            default : {
                break;
            }
        }
};

function clearWindow() {
    if (debugItem.functionName) { post("    --clearWindow--\n"); }
    var iColumn;
    var lBottom = Math.min(parameter.windowWidth.value + parameter.windowColumnOffset.value, parameter.appMonomeWidth.value);
    var iRow;
    var lRight = Math.min(parameter.windowHeight.value + parameter.windowRowOffset.value, parameter.appMonomeHeight.value);
    

    for (iColumn = parameter.windowColumnOffset.value; iColumn < lBottom; iColumn++) {
        for (iRow = parameter.windowRowOffset.value; iRow < lRight; iRow++) {
            if (debugItem.endValue) { post("clear col:", iColumn, "row:", iRow, "\n"); }
            Monome[iColumn][iRow].tempOff();
        }
    }
}

function refreshWindow() {
    if (debugItem.functionName) { post("    --refreshWindow--\n"); }
    
    clearWindow();
    var iColumn;
    var lBottom = Math.min(parameter.windowWidth.value + parameter.windowColumnOffset.value, parameter.appMonomeWidth.value);
    var iRow;
    var lRight = Math.min(parameter.windowHeight.value + parameter.windowRowOffset.value, parameter.appMonomeHeight.value);
    

    for (iColumn = parameter.windowColumnOffset.value; iColumn < lBottom; iColumn++) {
        for (iRow = parameter.windowRowOffset.value; iRow < lRight; iRow++) {
            if (debugItem.endValue) { post("clear col:", iColumn, "row:", iRow, "\n"); }
            Monome[iColumn][iRow].checkActual();
        }
    }
}
function setParameterProperty(aPropertyString, aValue) {

    var lValue;

    if ((aValue >= parameter[aPropertyString].minValue) && (aValue <= parameter[aPropertyString].maxValue)) { lValue = aValue; }
    else if (aValue < parameter[aPropertyString].minValue) { lValue = parameter[aPropertyString].minValue; }
    else if (aValue > parameter[aPropertyString].maxValue) { lValue = parameter[aPropertyString].maxValue; }
    else { post("something has gane awry in setParameterProperty!\n"); }

    parameter[aPropertyString].value = lValue;

    sendToHud(parameter[aPropertyString].name, parameter[aPropertyString].value, HudFormat.set);
    
	if (parameter[aPropertyString].saveInPattr) {
	    var lPatcherObjectNameString = parameter[aPropertyString].name + parameter.patchString + "Pattr";
    	this.patcher.getnamed(lPatcherObjectNameString).setvalueof(parameter[aPropertyString].value);
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

function grabAllPattrValues() {
    for (iProperty in parameter) {
        if (parameter[iProperty].saveInPattr) {
            grabPattrValue(parameter[iProperty]);
        }
    }
}

function grabPattrValue(aProperty) {
    if (debugItem.functionName) {
        post("    --grabPattrValue--\n");
    }
    if (debugItem.startValue) { post(aProperty.name + ".value:", aProperty.value, "\n"); }
    
    var lPatcherObjectNameString = aProperty.name + parameter.patchString + "Pattr";
    
    if (debugItem.localValue) { post("lPatcherObjectNameString:", lPatcherObjectNameString, "\n"); }
    
    var lValue = Number(this.patcher.getnamed(lPatcherObjectNameString).getvalueof());
    
    if (debugItem.localValue) { post("lValue from " + lPatcherObjectNameString + ":", lValue, "\n"); }
    
    aProperty.value = lValue;
    sendToHud(aProperty.name, aProperty.value, HudFormat.set);
    
    if (debugItem.endValue) { post(aProperty.name + ".value:", aProperty.value, "\n"); }
}



function sendToHud(aKey, aValue, aFormat) {
    if (debugItem.functionName) { post("    --sendToHud - " + aKey + " --\n"); }
    if (debugItem.list) { post("aKey:", aKey, "aValue:", aValue, "\n"); }
    var lOutlet = 1;
    
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
        default: {
            post("error in sendToHud. aFormat:", aFormat, "\n");
            break;
        }
    }
}

function store(aNumber) {
    this.getnamed("gsTileClientPattrstorage").message("store", aNumber);
}

function recall(aNumber) {
    this.getnamed("gsTileClientPattrstorage").message(aNumber);
    grabAllPattrValues();
    updateAppWindow();
    refreshWindow();
}



initialize();