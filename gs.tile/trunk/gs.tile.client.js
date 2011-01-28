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

var gThis = this;
var gThisPatcher = this.patcher;
var gDebugItem = {
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

var gParameters = new Parameters({outlet : 1});

gParameters.appMonomeWidth = {
    name : "appMonomeWidth",
    type : "number",
    format : "set",
    value : 8,
    minValue : 2,
    maxValue : 2048,
    saveInPattr : true,
    preListeners : [],
    postListeners: []
};
gParameters.appMonomeHeight = {
    name : "appMonomeHeight",
    type : "number",
    format : "set",
    value : 8,
    minValue : 2,
    maxValue : 2048,
    saveInPattr : true,
    preListeners : [],
    postListeners: []
};
gParameters.appMonomeNumber = {// used by router
    name : "appMonomeNumber",
    type : "number",
    format : "set",
    value : 1,
    minValue : 0,
    maxValue : 127,
    saveInPattr : true,
    preListeners : ["clearWindow"],
    postListeners: ["updateAppWindow"]
};
gParameters.appMonomeLayer = {
    name : "appMonomeLayer",
    type : "number",
    format : "set",
    value : 1,
    minValue : 0,
    maxValue : 127,
    saveInPattr : true,
    preListeners : [],
    postListeners: ["updateAppWindow"]
};
gParameters.appChannelNumber = {
    name : "appChannelNumber",
    type : "number",
    format : "set",
    value : 0,
    minValue : 0,
    maxValue : 3,
    saveInPattr : true,
    preListeners : [],
    postListeners: []
};
gParameters.windowWidth = {// used by client
    name : "windowWidth",
    type : "number",
    format : "set",
    value : 8,
    minValue : 1,
    maxValue : 2048,
    saveInPattr : true,
    preListeners : [],
    postListeners: ["updateAppWindow"]
};
gParameters.windowHeight = {// used by client
    name : "windowHeight",
    type : "number",
    format : "set",
    value : 8,
    minValue : 1,
    maxValue : 2048,
    saveInPattr : true,
    preListeners : [],
    postListeners: ["updateAppWindow"]
};
gParameters.windowColumnOffset = {// used by client
    name : "windowColumnOffset",
    type : "number",
    format : "set",
    value : 0,
    minValue : 0,
    maxValue : 2048,
    saveInPattr : true,
    preListeners : ["clearWindow"],
    postListeners: []
};
gParameters.windowRowOffset = {// used by client
    name : "windowRowOffset",
    type : "number",
    format : "set",
    value : 0,
    minValue : 0,
    maxValue : 2048,
    saveInPattr : true,
    preListeners : ["clearWindow"],
    postListeners: []
};
gParameters.displayColumnOffset = {// used by router
    name : "displayColumnOffset",
    type : "number",
    format : "set",
    value : 0,
    minValue : -2048,
    maxValue : 2048,
    saveInPattr : true,
    preListeners : ["clearWindow"],
    postListeners: ["updateAppWindow"]
};
gParameters.displayRowOffset = {// used by router
    name : "displayRowOffset",
    type : "number",
    format : "set",
    value : 0,
    minValue : -2048,
    maxValue : 2048,
    saveInPattr : true,
    preListeners : ["clearWindow"],
    postListeners: ["updateAppWindow"]
};
gParameters.comOrderNumber = {
    name : "comOrderNumber",
    type : "number",
    format : null,
    value : 0,
    minValue : 0,
    maxValue : 127,
    saveInPattr : true,
    preListeners : [],
    postListeners: []
};
gParameters.channelMade = {
    name : "channelMade",
    type : "toggle",
    format : null,
    value : false,
    minValue : 0,
    maxValue : 1,
    saveInPattr : false,
    preListeners : [],
    postListeners: []
};
gParameters.randomKeyOne = {
    name : "randomKeyOne",
    type : "number",
    format : null,
    value : null,
    minValue : 0,
    maxValue : 1000,
    saveInPattr : true,
    preListeners : [],
    postListeners: []
};
gParameters.randomKeyTwo = {
    name : "randomKeyTwo",
    type : "number",
    format : null,
    value : null,
    minValue : 0,
    maxValue : 1000,
    saveInPattr : true,
    preListeners : [],
    postListeners: []
};

gParameters.patchString = "GsTileClient";

function initialize() {
    if (gDebugItem.functionName) { post("    --initialize--\n"); }
    if (this.patcher.getnamed("parametersLoadedGsTileClientPattr").getvalueof() == 1) {
        gParameters.grabAll();
        
        if (gParameters.randomKeyOne.value == 0) {
            gParameters.set({
                key : "randomKeyOne",
                value : Math.floor(Math.random()*1000) + 1
            });
        }
        if (gParameters.randomKeyTwo.value == 0) {
            gParameters.set({
                key : "randomKeyTwo",
                value : Math.floor(Math.random()*1000) + 1
            });
        }
        
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
    return gParameters.windowColumnOffset.value - 1;
}

function rightEdgeOfDisplayedWindow() {
    return gParameters.windowColumnOffset.value + gParameters.windowWidth.value;
}

function topEdgeOfWindow() {
    return gParameters.windowRowOffset.value -1;
}

function bottomEdgeOfWindow() {
    return gParameters.windowRowOffset.value + gParameters.windowHeight.value;
}

//                        ---===Getter and Setter Functions===---
                        
function setWindowWidth(aValue) {
    if (gDebugItem.functionName) { post("    --setWindowWidth--\n"); }
    gParameters.set({
        key :"windowWidth",
        value : aValue
    });
}

function setWindowHeight(aValue) {
    if (gDebugItem.functionName) { post("    --setWindowHeight--\n"); }
    gParameters.set({
        key : "windowHeight",
        value : aValue
    });
}

function updateAppWindow() {
    if (gsTileGlobal.appWindow) {
        if (gDebugItem.list) { post("appName:", mAppName, "channel:", gParameters.appChannelNumber.value, "windowHeight:", gParameters.windowHeight.value, "\n"); }
        gsTileGlobal.appWindow(
            mAppName,
            gParameters.appChannelNumber.value,
            gParameters.randomKeyOne.value,
            gParameters.randomKeyTwo.value,
            gParameters.appMonomeNumber.value,
            gParameters.windowWidth.value,
            gParameters.windowHeight.value,
            gParameters.displayColumnOffset.value,
            gParameters.displayRowOffset.value,
            gParameters.appMonomeLayer.value);
    }
}


function setWindowColumnOffset(aValue) {
    if (gDebugItem.functionName) { post("    --setWindowColumnOffset--\n"); }
    
    gParameters.set({
        key : "windowColumnOffset",
        value : aValue
    });
    
    if (gsTileGlobal.newClient) {
        messnamed("mMC.allClients", "refreshWindow");
    }
}

function setWindowRowOffset(aValue) {
    if (gDebugItem.functionName) { post("    --setWindowRowOffset--\n"); }
    
    gParameters.set({
        key : "windowRowOffset",
        value : aValue
    });
    
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
    if (gDebugItem.functionName) { post("    --setDisplayColumnOffset--\n"); }
    gParameters.set({
        key : "displayColumnOffset",
        value :aValue
    });
}

function setDisplayRowOffset(aValue) {
    if (gDebugItem.functionName) { post("    --setDisplayRowOffset--\n"); }
    gParameters.set({
        key : "displayRowOffset",
        value : aValue
    });
}

function setAppMonomeNumber(aValue) {
    if (gDebugItem.functionName) { post("    --setAppMonomNumber--\n"); }
    gParameters.set({
        key : "appMonomeNumber",
        value : aValue
    });
}

function setAppMonomeLayer(aValue) {
    if (gDebugItem.functionName) { post("    --setAppMonomLayer--\n"); }
    gParameters.set({
        key : "appMonomeLayer",
        value : aValue
    });
}


function incrementDisplayColumnOffset() {
    if (gDebugItem.functionName) { post("    --incrementDisplayColumnOffset--\n"); }
    gParameters.change("displayColumnOffset", 1);
}

function decrementDisplayColumnOffset() {
    if (gDebugItem.functionName) { post("    --decrementDisplayColumnOffset--\n"); }
    gParameters.change("displayColumnOffset", -1);
}

function incrementDisplayRowOffset() {
    if (gDebugItem.functionName) { post("    --incrementDisplayRowOffset--\n"); }
    gParameters.change("displayRowOffset", 1);
}

function decrementDisplayRowOffset() {
    if (gDebugItem.functionName) { post("    --decrementDisplayRowOffset--\n"); }
    gParameters.change("displayRowOffset", -1);
}

function newRouterAlert() {
    alertRouterOfNewClient();
}

function hasChannel() {
    if (gParameters.appChannelNumber.value == null) { return 0; }
    else { return 1; }
}

function alertRouterOfNewClient() {
    if (gDebugItem.functionName) { post("    --alertRouterOfNewClient--\n"); }
    
    // send: "newClientNotification"
    // 0<appName> 1<randomKey> 2<hasChannel> 3<channelIfAssigned>
    // 4<windowWidth> 5<height> 6<windowColumnOffset> 7<windowRowOffset>
    if (gsTileGlobal.newClient) {
        if (gDebugItem.endValue) { 
            post("appName", mAppName,
            "randomKeyOne", gParameters.randomKeyOne.value,
            "randomKeyTwo", gParameters.randomKeyTwo.value,
            "comOrderNumber", gParameters.comOrderNumber.value,
            "appMonomeNumber", gParameters.appMonomeNumber.value, "\n");
            post(
                "windowWidth", gParameters.windowWidth.value,
                "windowHeight", gParameters.windowHeight.value,
                "displayColumnOffset", gParameters.displayColumnOffset.value,
                "displayRowOffset", gParameters.displayRowOffset.value, "\n");
        }
        gsTileGlobal.newClient(
            mAppName,
            gParameters.randomKeyOne.value,
            gParameters.randomKeyTwo.value,
            gParameters.comOrderNumber.value,
            gParameters.appMonomeNumber.value,
            gParameters.windowWidth.value,
            gParameters.windowHeight.value,
            gParameters.displayColumnOffset.value,
            gParameters.displayRowOffset.value,
            gParameters.appMonomeLayer.value);
    }
}

function freebang () {
    if (gDebugItem.functionName) { post("    ---freebang-\n"); }
    sendRemoveClient();
}

function sendRemoveClient() {
    if (gDebugItem.functionName) { post("    --sendRemoveClient--\n"); }
    if (gDebugItem.list) { post("request removal of:", mAppName, gParameters.randomKeyOne.value, gParameters.randomKeyTwo.value, "\n"); }
    gsTileGlobal.removeClient(mAppName, gParameters.appChannelNumber.value, gParameters.randomKeyOne.value, gParameters.randomKeyTwo.value);
}


function closebang() {
    if (gDebugItem.functionName) { post("    ---closebang-\n"); }
}


function alertRouterofClientRemoval() {
    if (gDebugItem.functionName) { post("    ---alertRouterofClientRemoval-\n"); }
    sendRemoveClient();
}


function clientAcknowledgement(aName, aChannelNumber, aKey1, aKey2) {
    if (gDebugItem.functionName) { post("    ---processClientAcknowledgement-\n"); }
    
    if (gDebugItem.list) { 
        post("full array:", aName, aChannelNumber, aKey1, aKey2, "\n");
        post("client name:", aName, "channel num:", aChannelNumber, "client key 1:", aKey1, " key 2:", aKey2, "\n");
        post("my name:", mAppName, "and keys:", gParameters.randomKeyOne.value, gParameters.randomKeyTwo.value, "\n");
    }
    if((aName == mAppName) && (aKey1 == gParameters.randomKeyOne.value) && (aKey2 == gParameters.randomKeyTwo.value)) {
        if (gDebugItem.endValue) { post("channel:", aChannelNumber, "\n"); }
        //make the send and recieve objects.
        makeChannel(aChannelNumber);
    }
}

function prepareLedForRouter(aColumnFromMonomeFunction, aRowFromMonomeFunction, aStateFromMonomeFunction) {    
    if (gDebugItem.frequentFunctionName) { post("    ---prepareLedForRouter-\n"); }
    
    var lTranslatedColumn = aColumnFromMonomeFunction - gParameters.windowColumnOffset.value;
    var lTranslatedRow = aRowFromMonomeFunction - gParameters.windowRowOffset.value;
    
    if (isInWindow(aColumnFromMonomeFunction, aRowFromMonomeFunction) && gsTileGlobal.led) {
        if (gDebugItem.frequentItem) { post("in window and channel made!\n"); }
        gsTileGlobal.led(
            mAppName,
            gParameters.appChannelNumber.value,
            gParameters.randomKeyOne.value,
            gParameters.randomKeyTwo.value,
            gParameters.appMonomeNumber.value,
            lTranslatedColumn,
            lTranslatedRow,
            aStateFromMonomeFunction);
   }
}

function isInWindow(aColumnInQuestion, aRowInQuestion) {
    if (gDebugItem.functionName) { post("    --isInWindow--\n"); }
    
    if (gDebugItem.frequentList) {
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
    if (gDebugItem.functionName) { post("    ---makeChannel-\n"); }
    
    appChannel = null;
    gParameters.appChannelNumber.value = aChannelNumber;
    var lChannelName = mAppName + aChannelNumber;
    appChannel = new Global(lChannelName);
    if (gDebugItem.startValue) { 
        post("channelName in client:", lChannelName, "\n");
        post("channel", mAppName + aChannelNumber, "created\n");
    }
    appChannel.connection = processMessagesOnPrivateChannel;
    appChannel.press = processPress;
    
    gParameters.channelMade.value = true;
}

function processPress(aColumnFromRouter, aRowFromRouter, aStateFromRouter) {
    if (gDebugItem.functionName) { post("    ---press-\n"); }
    if (gDebugItem.endValue) { post("column", aColumnFromRouter, "row", aRowFromRouter, "state", aStateFromRouter ); }
    
    var lTranslatedColumn = aColumnFromRouter + gParameters.windowColumnOffset.value;
    var lTranslatedRow = aRowFromRouter + gParameters.windowRowOffset.value;
    
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
    if (gDebugItem.functionName) { post("    ---processMessagesOnPrivateChannel-\n"); }

    post("app:", mAppName, "array:", aArray, "\n");
}

function led (aColumnFromPatcher, aRowFromPatcher, aStateFromPatcher) {
    if (gDebugItem.functionName) { post("    ---led-\n"); }
    
    if (gDebugItem.startValue) { post("raw col:", aColumnFromPatcher, "row:", aRowFromPatcher, "\n"); }
    
    if (aStateFromPatcher == 1) {
        Monome[aColumnFromPatcher][aRowFromPatcher].ledOn();
    }
    else if(aStateFromPatcher == 0) {
        Monome[aColumnFromPatcher][aRowFromPatcher].ledOff();
    }
}

function ledCol (aColumnFromPatcher, aStateFromPatcher) {
    if (gDebugItem.functionName) { post("    ---ledCol-\n"); }
    
    var lDecimalNumberValue = Number(aStateFromPatcher);
    var lBinaryNumberValue = lDecimalNumberValue.toString(2); // little endian
    if (gDebugItem.startValue) { post("raw col:", aColumnFromPatcher, "decimal:", aStateFromPatcher, "binary:", lBinaryNumberValue, "\n"); }
    
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
    if (gDebugItem.functionName) { post("    ---ledCol-\n"); }
    
    var lDecimalNumberValue = Number(aStateFromPatcher);
    var lBinaryNumberValue = lDecimalNumberValue.toString(2); // little endian
    if (gDebugItem.startValue) { post("raw row:", aColumnFromPatcher, "decimal:", aStateFromPatcher, "binary:", lBinaryNumberValue, "\n"); }
    
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
    if (gDebugItem.functionName) { post("    ---setAppMonomeWidth-\n"); }
    
    gParameters.set({
        key : "appMonomeWidth",
        value : aValue
    });

    buildMonome();
        
    updateAppWindow();
}

function setAppMonomeHeight(aValue) {
    if (gDebugItem.functionName) { post("    ---setAppMonomeHeight-\n"); }
    
    gParameters.set({
        key : "appMonomeHeight",
        value : aValue
    });

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
    if (gDebugItem.functionName) { post("    --buildMonome--\n"); }
    if (gDebugItem.startValue) {
        post("monomeWidth:", gParameters.appMonomeWidth.value, "\n");
        post("monomeHeight:", gParameters.appMonomeHeight.value, "\n");
    }
    
    for (var iWidth = 0; iWidth < (gParameters.appMonomeWidth.value); iWidth++) {
        Monome[iWidth] = new Array();
        for (var iHeight = 0; iHeight < (gParameters.appMonomeHeight.value); iHeight++) {
            Monome[iWidth][iHeight] = new SingleCell(iWidth , iHeight);
        }
    }
}

Monome.row = function(aRow, aMethodToInvoke) {
        switch (aMethodToInvoke) {
            case "ledOn":
                var iColumn;
                for (iColumn = 0; iColumn < gParameters.appMonomeWidth.value; iColumn++) {
                    Monome[iColumn][aRow].ledOn();
                }
                break;
            case "ledOff":
                for (iColumn = 0; iColumn < gParameters.appMonomeWidth.value; iColumn++) {
                    Monome[iColumn][aRow].ledOff();
                }
                break;
            case "tempOn":
                for (iColumn = 0; iColumn < gParameters.appMonomeWidth.value; iColumn++) {
                    Monome[iColumn][aRow].tempOn();
                }
                break;
            case "tempOff":
                for (iColumn = 0; iColumn < gParameters.appMonomeWidth.value; iColumn++) {
                    Monome[iColumn][aRow].tempOff();
                }
                break;
            case "blink":
                for (iColumn = 0; iColumn < gParameters.appMonomeWidth.value; iColumn++) {
                    Monome[iColumn][aRow].blink();
                }
                break;
            case "blinkIfOff":
                for (iColumn = 0; iColumn < gParameters.appMonomeWidth.value; iColumn++) {
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
                for (iRow = 0; iRow < gParameters.appMonomeHeight.value; iRow++) {
                    Monome[aColumn][iRow].ledOn();
                }
                break;
            case "ledOff":
                for (iRow = 0; iRow < gParameters.appMonomeHeight.value; iRow++) {
                    Monome[aColumn][iRow].ledOff();
                }
                break;
            case "tempOn":
                for (iRow = 0; iRow < gParameters.appMonomeHeight.value; iRow++) {
                    Monome[aColumn][iRow].tempOn();
                }
                break;
            case "tempOff":
                for (iRow = 0; iRow < gParameters.appMonomeHeight.value; iRow++) {
                    Monome[aColumn][iRow].tempOff();
                }
                break;
            case "blink":
                for (iRow = 0; iRow < gParameters.appMonomeHeight.value; iRow++) {
                    Monome[aColumn][iRow].blink();
                }
                break;
            case "blinkIfOff":
                for (iRow = 0; iRow < gParameters.appMonomeHeight.value; iRow++) {
                    Monome[aColumn][iRow].blinkIfOff();
                }
                break;
            default : {
                break;
            }
        }
};

function clearWindow() {
    if (gDebugItem.functionName) { post("    --clearWindow--\n"); }
    var iColumn;
    var lBottom = Math.min(gParameters.windowWidth.value + gParameters.windowColumnOffset.value, gParameters.appMonomeWidth.value);
    var iRow;
    var lRight = Math.min(gParameters.windowHeight.value + gParameters.windowRowOffset.value, gParameters.appMonomeHeight.value);
    

    for (iColumn = gParameters.windowColumnOffset.value; iColumn < lBottom; iColumn++) {
        for (iRow = gParameters.windowRowOffset.value; iRow < lRight; iRow++) {
            if (gDebugItem.endValue) { post("clear col:", iColumn, "row:", iRow, "\n"); }
            Monome[iColumn][iRow].tempOff();
        }
    }
}

function refreshWindow() {
    if (gDebugItem.functionName) { post("    --refreshWindow--\n"); }
    
    clearWindow();
    var iColumn;
    var lBottom = Math.min(gParameters.windowWidth.value + gParameters.windowColumnOffset.value, gParameters.appMonomeWidth.value);
    var iRow;
    var lRight = Math.min(gParameters.windowHeight.value + gParameters.windowRowOffset.value, gParameters.appMonomeHeight.value);
    

    for (iColumn = gParameters.windowColumnOffset.value; iColumn < lBottom; iColumn++) {
        for (iRow = gParameters.windowRowOffset.value; iRow < lRight; iRow++) {
            if (gDebugItem.endValue) { post("clear col:", iColumn, "row:", iRow, "\n"); }
            Monome[iColumn][iRow].checkActual();
        }
    }
}

//<Parameters
//      \/\/\<Parameters(?m).+\/\/Parameters\>


function Parameters(aObject) {
    if (gDebugItem.functionName) { post("    --Parameters--\n"); }
    
    if (! (this instanceof arguments.callee)) {
        return new Parameters(aObject);
    }
    
    var mParameters = this,
        mOutlet = aObject.outlet;
    
    function resolveValue(aObject, aType, aSlot) {
        var lValue;
        if (gDebugItem.frequentFunctionName) { post("    --Parameters.resolveValue--\n"); }
        
        if (aType == "slotArray") {            
            if (aObject instanceof Function) {
                lValue = aObject(aSlot);
            }
            else if (aObject instanceof Array) {
                lValue = aObject[aSlot];
            }
            else {
                lValue = aObject;
            }

        }
        else {
            lValue = (aObject instanceof Function) ? aObject() : aObject;
        }
        return lValue;
    }
       
    function sendToHud(aObject) {

        var aKey = aObject.key,
            aFormat = (aObject.format == null) ? false : aObject.format,
            aSlot = (aObject.slot == undefined) ? null : aObject.slot,
            aValue = aObject.value;

        if (gDebugItem.frequentFunctionName) { post("    --Parameter.sendToHud --\n"); }
        if (gDebugItem.functionArguments) {
            post("aKey:", aKey, "aValue:", aValue, "aFormat:", aFormat);
            (mParameters[aObject.key].type == "slotArray") ? post("aSlot", aSlot, "\n") : post("\n");
        }
        
        switch (aFormat) {
            case "set":
                outlet(mOutlet, aKey, "set", aValue);
                break;
            case "trigger":
                outlet(mOutlet, aKey, aValue);
                break;
            case "symbol":
                outlet(mOutlet, aKey, "setsymbol", aValue);
                break;
            case "measures":
                outlet(mOutlet, aKey, "set", aValue, (aValue == 1) ? "measure" : "measures");
                break;
            case "slotSet":
                outlet(mOutlet, aSlot, aKey, "set", aValue);
                break;
            case "slotTrigger":
                outlet(mOutlet, aSlot, "setsymbol", aValue);
                break;
            case "slotSymbol":
                outlet(mOutlet, aSlot, aKey, "setsymbol", aValue);
                break;
            default: 
                post("error in Parameter.sendToHud. aFormat:", aFormat, "\n");
                break;
        }
    }
    
    function callListenersForParameter(aArrayOfListeners, aParameter, aSlot) {
        var lListenerArrayLength = aArrayOfListeners.length,
            lIsSlotArray = (aParameter.type == "slotArray"),
            iCounter;
        
        if (gDebugItem.functionName) { post("    --callListenersForParameter--\n"); }
        
        for (iCounter = 0; iCounter < lListenerArrayLength; iCounter++) {
            gThis[aArrayOfListeners[iCounter]]((lIsSlotArray) ? aSlot: undefined);
            if (gDebugItem.localValue) { post("lPostListenerKeys[" + iCounter + ".name]:", iFunctionName, "\n"); }
        }
    }
    
    this.set = function(aObject) {
        if (gDebugItem.functionName) { post("    --Parameters.set", aObject.key, "set:", aObject.value, "--\n"); }
        if (typeof aObject !== "object") { post("THAT IS NOT CORRECT SIR! NOT AT ALL CORRECT AND I DEMAND AN APOLOGY!"); }

        var aParameter = mParameters[aObject.key],
            aValue = aObject.value,
            lIsSlotArray = (aParameter.type == "slotArray"),
            aSlot = (aObject.slot === undefined) ? null: aObject.slot,
            aQuietly = (aObject.silent === true),
            lPatcherObjectNameString,
            lValue,
            lMinimum = resolveValue(aParameter.minValue, aParameter.type, aSlot),
            lMaximum = resolveValue(aParameter.maxValue, aParameter.type, aSlot),
            iCounter;
            
        //check validity of aValue
        if ((aParameter.type == "number") || (aParameter.type == "toggle") || lIsSlotArray) {
            if ((aValue >= lMinimum) && (aValue <= lMaximum)) {
                lValue = aValue;
            }
            else if (aValue < lMinimum) {
                lValue = lMinimum;
            }
            else if (aValue > lMaximum) {
                lValue = lMaximum;
            }
            else { post("something has gane awry in Parameters.set!\n"); }
        }
        else {
            lValue = aValue;
        }


        // call postListeners
        if (!aQuietly) {
            callListenersForParameter(aParameter.preListeners, aParameter, aSlot);
        }

        // either assign to slot or not.
        if (lIsSlotArray) {
            aParameter.value[aSlot] = lValue;
        }
        else {
            aParameter.value = lValue;
        }   

        if (!aQuietly) {
            callListenersForParameter(aParameter.postListeners, aParameter, aSlot);
            
            // Save.
            if (aParameter.saveInPattr) {
                lPatcherObjectNameString = aParameter.name + mParameters.patchString + "Pattr";
                if (gDebugItem.localValue) { post("lPatcherObjectNameString", lPatcherObjectNameString, "\n"); }
                gThisPatcher.getnamed(lPatcherObjectNameString).message(aParameter.value);
            }
        }
        mParameters.display(aParameter.name);

    };
    
    this.display = function(aParameterName, aSlot) {
        if (gDebugItem.functionName) {
            post("    --Parameters.display " + aParameterName + "--");
            (mParameters[aParameterName].type == "slotArray") ? post("aSlot", aSlot, "\n") : post("\n");
        }

        var iCounter,
        aParameter = mParameters[aParameterName],
        lValueIsFunction = aParameter.value instanceof Function,
        lLength;
        
        if (aParameter.format === null) return;
        
        if (aParameter.type == "slotArray") {
            lLength = (lValueIsFunction) ? aParameter.value.arrayLength: aParameter.value.length;
            
            if (aSlot != undefined) {
                sendToHud({
                    key: aParameter.name,
                    value: resolveValue(aParameter.value, aParameter.type, aSlot),
                    format: aParameter.format,
                    slot: aSlot
                });
            }

            else {
                for (iCounter = 0; iCounter < lLength; iCounter++) {
                    sendToHud({
                        key: aParameter.name,
                        value: resolveValue(aParameter.value, aParameter.type, iCounter),
                        format: aParameter.format,
                        slot: iCounter
                    });
                }
            }
        }
        else {

            sendToHud({
                key: aParameter.name,
                value: resolveValue(aParameter.value),
                format: aParameter.format
            });
        }
    };
    
    this.displayAll = function(aSlot) {
        if (gDebugItem.functionName) { post("    --Parameters.displayAll --\n"); }

        var iProperty;

        if (!aSlot) {
            for (iProperty in mParameters) {
                if (mParameters[iProperty].format != null) {
                    if (mParameters[iProperty].value != null) {
                        mParameters.display(iProperty);
                    }
                    else {
                        if (gDebugItem.startValue) { post("mParameters[" + iProperty + "].value is null\n"); }
                    }
                }
            }
        }
        else {
            for (iProperty in mParameters) {
                if ((mParameters[iProperty].format) || (mParameters[iProperty].type == "slotArray")) {
                    mParameters.display(iProperty, aSlot);
                }
            }
        }
    };

    this.toggle = function(aParameterName, aSlot) {
        if (gDebugItem.functionName) { post("    --Parameters.toggle--\n"); }
        
        if (mParameters[aParameterName].type == "toggle") {
            mParameters.set({
                key : aParameterName,
                value : Number(!Boolean(mParameters[aParameterName].value))
            });
        }
        else if (mParameters[aParameterName].type == "slotArray") {
            mParameters.set({
                key : aParameterName,
                value : Number(!Boolean(mParameters[aParameterName].value[aSlot])),
                slot : aSlot
            });
        }
        else { post(aParameterName, "is not a toggle gParameters\n");}
    };
    
    this.change = function(aParameterName, aAmount, aSlot) {
        if (gDebugItem.functionName) { post("    --Parameters.change--\n"); }

        if (mParameters[aParameterName].type == "slotArray") {
            mParameters.set({
                key: aParameterName,
                value: mParameters[aParameterName].value[aSlot] + aAmount,
                slot: aSlot
            });
        }
         else {
            mParameters.set({
                key: aParameterName,
                value: mParameters[aParameterName].value + aAmount
            });
        }
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
                lValue = String(gThisPatcher.getnamed(lPatcherObjectNameString).getvalueof()) ;
                break;
            case "slotArray" :
                /*jsl:fallthru*/
            case "array" :
                lValue = gThisPatcher.getnamed(lPatcherObjectNameString).getvalueof();
                break;
            default :
                post(aParameter.name + ".type:", aParameter.type , "\n");
                break;
        }

        if (gDebugItem.localValue) { post("lValue from " + lPatcherObjectNameString + ":", lValue, "\n"); }

        if (aParameter.type == "slotArray") {
            aParameter.value = lValue;
            mParameters.display(aParameter.name);
        }
         else {
            mParameters.set({
                key: aParameter.name,
                value: lValue,
                silent: true
            });
        }

        if (gDebugItem.endValue) {
            post(aParameter.name + ".value: ", aParameter.value, "\n");
        }
    };

    this.grabAll = function() {   
         if (gDebugItem.functionName) { post("    --Parameters.grabAll --\n"); }
         
        var iProperty,
            iCounter,
            lLength;

        for (iProperty in mParameters) {
            if (mParameters[iProperty].saveInPattr) {
                mParameters.grab(mParameters[iProperty]);
            }
        }
    };
    return this;
}

//Parameters>

function store(aNumber) {
    this.getnamed("gsTileClientPattrstorage").message("store", aNumber);
}

function recall(aNumber) {
    this.getnamed("gsTileClientPattrstorage").message(aNumber);
    gParameters.grabAll();
    updateAppWindow();
    refreshWindow();
}



initialize();