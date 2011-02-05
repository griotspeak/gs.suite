
//<License

/*
-*- coding: utf-8 -*-

gs.tile.client
Copyright (c) 2010, 2011, Thompson Usiyan a.k.a. griotspeak
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    *   Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
    *   Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
    *   Neither the name of the gs.tile.client nor the
        names of its contributors may be used to endorse or promote products
        derived from this software without specific prior written permission.
    *   Redistributions with Non-trivial alterations must state that alterations
        have been made.
    *   This work may not be used for commercial purposes without the express written
        consent of Thompson Usiyan
    *   This work may be freely used for non-commercial purposes without any
        further consent from Thompson Usiyan. 


GS.TILE.CLIENT IS PROVIDED BY THOMPSON USIYAN ``AS IS'' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THOMPSON USIYAN BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */
//License>


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

var gMonome;

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
    preListeners : ["clearAppWindow"],
    postListeners: ["updateAppWindowDetails"]
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
    postListeners: ["updateAppWindowDetails"]
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
    preListeners : ["clearAppWindow"],
    postListeners: ["updateAppWindowDetails"]
};
gParameters.windowHeight = {// used by client
    name : "windowHeight",
    type : "number",
    format : "set",
    value : 8,
    minValue : 1,
    maxValue : 2048,
    saveInPattr : true,
    preListeners : ["clearAppWindow"],
    postListeners: ["updateAppWindowDetails"]
};
gParameters.windowColumnOffset = {// used by client
    name : "windowColumnOffset",
    type : "number",
    format : "set",
    value : 0,
    minValue : 0,
    maxValue : 2048,
    saveInPattr : true,
    preListeners : ["clearAppWindow"],
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
    preListeners : ["clearAppWindow"],
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
    preListeners : ["clearAppWindow"],
    postListeners: ["updateAppWindowDetails"]
};
gParameters.displayRowOffset = {// used by router
    name : "displayRowOffset",
    type : "number",
    format : "set",
    value : 0,
    minValue : -2048,
    maxValue : 2048,
    saveInPattr : true,
    preListeners : ["clearAppWindow"],
    postListeners: ["updateAppWindowDetails"]
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
    if (gThisPatcher.getnamed("parametersLoadedGsTileClientPattr").getvalueof() == 1) {
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
        numberOfMonomeChannels(0);
        gMonome = new Monome(gParameters.appMonomeWidth.value, gParameters.appMonomeHeight.value, prepareLedForRouter);
        alertRouterOfNewClient();
    }
}



var mAppName = (jsarguments[1]    !=      null)       ?    jsarguments[1]      :       "unnamedClient";

var gsTileGlobal = new Global("gsTileRouter");
if (gsTileGlobal.appWindow === undefined) { gsTileGlobal.appWindow = null; }
if (gsTileGlobal.removeClient ===  undefined) { gsTileGlobal.removeClient = null; }
if (gsTileGlobal.led === undefined) {gsTileGlobal.led = null; }
if (gsTileGlobal.newClient === undefined) { gsTileGlobal.newClient = null; }


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

function updateAppWindowDetails() {
    if (gDebugItem.frequentFunctionName) { post("    --updateAppWindowDetails--\n"); }
    
    if (gsTileGlobal.appWindow != null) {
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

function grabFocus(aMonomeNumber) {
    var lMonomeNumber = parseInt(aMonomeNumber, 10);
    
    if (gsTileGlobal.newClient != null) {
        messnamed("gs.tile.allClients", "dropFocus", lMonomeNumber);
    }
    setAppMonomeNumber(lMonomeNumber);
}

function dropFocus(aMonomeNumber) {
    if (gParameters.appMonomeNumber.value == aMonomeNumber) {
        setAppMonomeNumber(0);
    }
}

function numberOfMonomeChannels(aNumber) {
    var iCounter;
    for (iCounter = 0; iCounter < 4; iCounter++) {
        outlet(1, "focus-" + iCounter, "active", (iCounter < aNumber) ? 1 : 0);
    }
}





function setWindowColumnOffset(aValue) {
    if (gDebugItem.functionName) { post("    --setWindowColumnOffset--\n"); }
    
    gParameters.set({
        key : "windowColumnOffset",
        value : aValue
    });
    
    if (gsTileGlobal.newClient != null) {
        messnamed("gs.tile.allClients", "refreshAppWindow");
    }
}

function setWindowRowOffset(aValue) {
    if (gDebugItem.functionName) { post("    --setWindowRowOffset--\n"); }
    
    gParameters.set({
        key : "windowRowOffset",
        value : aValue
    });
    
    if (gsTileGlobal.newClient != null) {
        messnamed("gs.tile.allClients", "refreshAppWindow");
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
    if (gsTileGlobal.newClient != null) {
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
    if (gsTileGlobal.removeClient != null) { gsTileGlobal.removeClient(mAppName, gParameters.appChannelNumber.value, gParameters.randomKeyOne.value, gParameters.randomKeyTwo.value); }
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
    
    if (isInWindow(aColumnFromMonomeFunction, aRowFromMonomeFunction) && (gsTileGlobal.led != null)) {
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
    if (gDebugItem.frequentFunctionName) { post("    --isInWindow--", aColumnInQuestion, aRowInQuestion, "\n"); }
    
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
        gMonome[lTranslatedColumn][lTranslatedRow].push();
    }
    else if(aStateFromRouter == 0) {
        gMonome[lTranslatedColumn][lTranslatedRow].release();
    }    
    //        -/
    
    outlet(0, "press", lTranslatedColumn, lTranslatedRow, aStateFromRouter);
}


function processMessagesOnPrivateChannel(aArray) {
    if (gDebugItem.functionName) { post("    ---processMessagesOnPrivateChannel-\n"); }

    post("app:", mAppName, "array:", aArray, "\n");
}

function led (aColumnFromPatcher, aRowFromPatcher, aStateFromPatcher) {
    if (gDebugItem.frequentFunctionName) { post("    ---led-\n"); }
    
    if (gDebugItem.startValue) { post("raw col:", aColumnFromPatcher, "row:", aRowFromPatcher, "state:", aStateFromPatcher, "\n"); }
    
    if (aStateFromPatcher == 1) {
        gMonome[aColumnFromPatcher][aRowFromPatcher].ledOn();
    }
    else if(aStateFromPatcher == 0) {
        gMonome[aColumnFromPatcher][aRowFromPatcher].ledOff();
    }
}

function led_col (aColumnFromPatcher, aStateFromPatcher) {
    if (gDebugItem.functionName) { post("    ---ledCol-\n"); }
    
    gMonome.column(aColumnFromPatcher, (aStateFromPatcher == 0) ? "ledOff" : "ledOn");
}

function led_row (aRowFromPatcher, aStateFromPatcher) {
    if (gDebugItem.functionName) { post("    ---ledCol-\n"); }
    
    gMonome.row(aRowFromPatcher, (aStateFromPatcher == 0) ? "ledOff" : "ledOn");
}

//                                  ---===Monome Device Methods===---

function setAppMonomeWidth(aValue) {
    var lFullAppWidthShown = gParameters.appMonomeWidth.value == gParameters.windowWidth.value;

    if (gDebugItem.functionName) { post("    ---setAppMonomeWidth-\n"); }
    
    gMonome.beginUpdates();
    gParameters.set({
        key : "appMonomeWidth",
        value : aValue
    });

    gMonome.rebuild(gParameters.appMonomeWidth.value, gParameters.appMonomeHeight.value);
    
    if (lFullAppWidthShown) {
        gParameters.set({
            key : "windowWidth",
            value : aValue
        });
    } 
    
    updateAppWindowDetails();
    gMonome.endUpdates();
}

function setAppMonomeHeight(aValue) {
    var lFullAppHeightShown = gParameters.appMonomeHeight.value == gParameters.windowHeight.value;
    
    if (gDebugItem.functionName) { post("    ---setAppMonomeHeight-\n"); }
    
    gMonome.beginUpdates();
    gParameters.set({
        key : "appMonomeHeight",
        value : aValue
    });

    gMonome.rebuild(gParameters.appMonomeWidth.value, gParameters.appMonomeHeight.value);
    
    if (lFullAppHeightShown) {
        gParameters.set({
            key : "windowHeight",
            value : aValue
        });
    }
    updateAppWindowDetails();
    gMonome.endUpdates();
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
        mUpdating = false,
        mOutlet;
        
        if (! (this instanceof arguments.callee)) {
            post("use new! - Monome\n");
            return new Monome(aColumns, aRows, aOutlet);
        }
    
    if (gDebugItem.functionArguments) { post("typeof aOutlet", typeof aOutlet, "\n"); }
    
    if (gDebugItem.functionArguments) { post("mColumns", mColumns, "mRows", mRows, "\n"); }
    
    if (gDebugItem.functionName) { post("    --Monome--\n"); }
    if (gDebugItem.startValue) {
        post("monomeWidth:", aColumns, "\n");
        post("monomeHeight:", aRows, "\n");
    }
    
    if (typeof aOutlet == "number") {
        mOutlet = aOutlet;
        that.ledFunction = function(aColumn, aRow, aState) {
            outlet(mOutlet, "led", aColumn, aRow, aState);
        };
    }
    else if (typeof aOutlet == "function") {
        that.ledFunction = aOutlet;
    }
    else if (aOutlet === undefined) {
        post("ERROR. No Outlet provided!\n");
        return false;
    }

    function SingleCell(aCol, aRow) {

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
                that.ledFunction(mCol, mRow, actualState);
            }
        };

        this.ledOff = function() {
            actualState = 0;
            if (!mUpdating) {
                that.ledFunction(mCol, mRow, actualState);
            }
        };

        this.checkActual = function() {
            //post("mUpdating:", (mUpdating) ? "true" : "false", "actualState:", actualState, "\n");
            that.ledFunction(mCol, mRow, actualState);
            tempState = 0;
        };

        this.blink = function() {
            tempState = (tempState == 1) ? 0: 1;
            that.ledFunction(mCol, mRow, tempState);
        };

        this.blinkIfOff = function() {
            if (actualState == 0) {
                tempState = (tempState == 1) ? 0: 1;
                that.ledFunction(mCol, mRow, tempState);
            }
        };

        this.tempOn = function() {
            tempState = 1;
            that.ledFunction(mCol, mRow, tempState);
        };

        this.tempOff = function() {
            tempState = 0;
            that.ledFunction(mCol, mRow, tempState);
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
    
    this.window = function(aMethodToInvoke, aLeftColumn, aRightColumn, aTopRow, aBottomRow) {
        if (gDebugItem.functionName) { post("    --window :", aMethodToInvoke, "--\n"); }
        var iColumn;
    	var iRow;    

        if (gDebugItem.functionArguments) {
            post("mColumns", mColumns, "\n");
            post("mRows", mRows, "\n");
            post("aLeftColumn", aLeftColumn, "\n");
            post("aRightColumn", aRightColumn, "\n");
            post("aTopRow", aTopRow, "\n");
            post("aBottomRow", aBottomRow, "\n");
        }

        for (iColumn = aLeftColumn; iColumn < aRightColumn; iColumn++) {
            for (iRow = aTopRow; iRow < aBottomRow; iRow++) {
                that[iColumn][iRow][aMethodToInvoke]();
            }
        }
    };
    
    this.refresh = function() {
        if (gDebugItem.functionName) { post("    --refresh--\n"); }
        that.window("checkActual", 0, mColumns, 0, mRows);
    };
    //TODO learn how to make a catch all and pass calls to the whole monome.
    
    this.clear = function() {
        if (gDebugItem.functionName) { post("    --clear--\n"); }
        
        window("ledOff", 0, mColumns, 0, mRows);
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

function clearAppWindow() {
    if (gDebugItem.functionName) { post("    --clearAppWindow--\n"); }

    var lLeft = gParameters.windowColumnOffset.value;
    var lRight = Math.min(gParameters.windowWidth.value + gParameters.windowColumnOffset.value, gParameters.appMonomeWidth.value);
    var lTop = gParameters.windowRowOffset.value;
    var lBottom = Math.min(gParameters.windowHeight.value + gParameters.windowRowOffset.value, gParameters.appMonomeHeight.value);
    
    gMonome.window("tempOff", lLeft, lRight, lTop, lBottom);
}

function refreshAppWindow() {
    if (gDebugItem.functionName) { post("    --refreshAppWindow--\n"); }
        
    var lLeft = gParameters.windowColumnOffset.value;
    var lRight = Math.min(gParameters.windowWidth.value + gParameters.windowColumnOffset.value, gParameters.appMonomeWidth.value);
    var lTop = gParameters.windowRowOffset.value;
    var lBottom = Math.min(gParameters.windowHeight.value + gParameters.windowRowOffset.value, gParameters.appMonomeHeight.value);
            
    gMonome.window("checkActual", lLeft, lRight, lTop, lBottom);
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
    if (gDebugItem.functionName) { post("    --store(gs.tile.client)--\n"); }
    
    gThisPatcher.getnamed("gsTileClientPattrstorage").message("store", aNumber);
}

function recall(aNumber) {
    if (gDebugItem.functionName) { post("    --recall(gs.tile.client)--\n"); }
    
    clearAppWindow();
    gThisPatcher.getnamed("gsTileClientPattrstorage").message(aNumber);
    gParameters.grabAll();
    updateAppWindowDetails();
    refreshAppWindow();
}



initialize();