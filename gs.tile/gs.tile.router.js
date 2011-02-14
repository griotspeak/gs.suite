

//<License

/*
-*- coding: utf-8 -*-

gs.tile.router
Copyright (c) 2010, 2011, Thompson Usiyan a.k.a. griotspeak
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    *   Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
    *   Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
    *   Neither the name of the gs.tile.router nor the
        names of its contributors may be used to endorse or promote products
        derived from gs.tile.router without specific prior written permission.
    *   Redistributions with Non-trivial alterations must state that alterations
        have been made.
    *   This work may not be used for commercial purposes without the express written
        consent of Thompson Usiyan
    *   This work may be freely used for non-commercial purposes without any
        further consent from Thompson Usiyan. 


GS.TILE.ROUTER IS PROVIDED BY THOMPSON USIYAN ``AS IS'' AND ANY
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

/*jslint onevar:true */
/*global post : false, autowatch : true, inlets : true, outlets : true, outlet : false, Global : false, messnamed : false, inlet : false */

autowatch = 1;

inlets = 5;
outlets = 5;
var gThis = this;
var gThisPatcher = this.patcher;

var gAppChannelsMade = false;
var gMonomeChannelsMade = false;
var gNumberOfMonomeChannels = 0;
var gUdpSendObject;
var gUdpReceiveObject;
var gPrependPressObject = [];
var gRouteObject = [];
var gDebugItem = {
        endValue : false,
        frequentItem : false,
        frequentList: false,
        functionName : false,
        frequentFunctionName : false,
        frequentFunctionName : false,
        list : false,
        startValue : false
};
var gFocusArray = [0, 0, 0, 0];

var gThisRouterObject = gThisPatcher.getnamed("routerJSObject");

var gGsTileGlobal = new Global("gsTileRouter");

function reconnect() {
    if (gDebugItem.functionName) { post("    --reconnect--\n"); }

    gGsTileGlobal = new Global("gsTileRouter");
    gGsTileGlobal.appList = [];
    gGsTileGlobal.toRouter = incomingMessages;
    gGsTileGlobal.newClient = processNewClientNotification;
    gGsTileGlobal.removeClient = removeClient;
    gGsTileGlobal.led = processLed;
    gGsTileGlobal.appWindow = updateWindowDimensions;
    gThisRouterObject = gThisPatcher.getnamed("routerJSObject");
    messnamed("gs.tile.allClients", "newRouterAlert");
    post("gs.tile.router reconnected\n");
}

function initialize() {
    gGsTileGlobal.appList = [];
    gGsTileGlobal.toRouter = incomingMessages;
    gGsTileGlobal.newClient = processNewClientNotification;
    gGsTileGlobal.removeClient = removeClient;
    gGsTileGlobal.led = processLed;
    gGsTileGlobal.appWindow = updateWindowDimensions;
    messnamed("gs.tile.allClients", "newRouterAlert");
    post("gs.tile.router Finished loading\n");
}

function focus(aState) {

    gFocusArray[inlet - 1] = aState;
    
    gNumberOfMonomeChannels = gFocusArray[0] + gFocusArray[1] + gFocusArray[2] + gFocusArray[3];

}

function sendMonomeFocusStatus() {
    if (gGsTileGlobal.newClient != null) {
        messnamed("gs.tile.allClients", "monomeChannelFocus", gFocusArray[0], gFocusArray[1], gFocusArray[2], gFocusArray[3]);
    }
}


function incomingMessages() {
    if (gDebugItem.functionName) { post("    ---incomingMessages-\n"); }
}

function processNewClientNotification(aAppName, aKey1, aKey2, aOrderNumber, aMonomeNumber, aWidth, aHeight, aDisplayColumnOffset, aDisplayRowOffset, aDisplayLayer) {
    var lAppEntry,
        iCounter,
        lListLength,
        lChannelNumbersUsed;
    
    if (gDebugItem.functionName) { post("    --processNewClientNotification--\n"); }
    
    //UPDATED
    if (gDebugItem.list) {
        post("appName:", aAppName, "key1:", aKey1, "key2:", aKey2, "orderNumber", aOrderNumber, "monomeNumber", aMonomeNumber, "\n");
        post("width:", aWidth, "height:", aHeight, "displayColumnOffset:", aDisplayColumnOffset, "displayRowOffset:", aDisplayRowOffset, "displayLayer", aDisplayLayer, "\n");
    }   
    
    lAppEntry = {
        appName : aAppName,
        channelObject : "unassigned",
        channelNumber : "unassigned",
        keyOne : aKey1,
        keyTwo : aKey2,
        orderNumber : aOrderNumber,
        monomeNumber : aMonomeNumber,
        windowWidth : aWidth,
        windowHeight : aHeight,
        displayColumnOffset : aDisplayColumnOffset,
        displayRowOffset : aDisplayRowOffset,
        displayLayer : aDisplayLayer 
    };
    
    //first check for name of app
    if (!gGsTileGlobal.appList.some(doesShareName, aAppName)) {
        // set channelNumber and add app to list.
        // gGsTileGlobal.appList is an array of arrays
        lAppEntry.channelNumber = 0; // !!channel number
        gGsTileGlobal.appList.push(lAppEntry);
    }
    else {
        if (gDebugItem.list) { post("in else\n"); }
        iCounter = 0;
        lListLength = gGsTileGlobal.appList.length;
        if (gDebugItem.startValue) { post("listLength:", lListLength, "\n"); }
        lChannelNumbersUsed = [];
        
        //count and check for same app
        for (;iCounter < lListLength; iCounter++) {
            if (gGsTileGlobal.appList[iCounter].appName === aAppName) { // !!app Name
                //check if keys 
                if ((gGsTileGlobal.appList[iCounter].keyOne === aKey1) && (gGsTileGlobal.appList[iCounter].keyTwo === aKey2)) { // !!key1
                    if (gDebugItem.endValue) { post(aAppName, aKey1, aKey2, "seems to be present already\n"); }
                    return;
                }
                else {
                    // no need to count apps explicitly. lChannelNumbersUsed.length = the number of apps.
                    lChannelNumbersUsed.push(gGsTileGlobal.appList[iCounter].channelNumber); // !!Channel Number
                }
            }
        }
        
        iCounter = 0; 
        
        while (lAppEntry.channelNumber === "unassigned") { // !!channel number
            if (lChannelNumbersUsed.indexOf(iCounter) < 0) {
                lAppEntry.channelNumber = iCounter; // !!channel number
                gGsTileGlobal.appList.push(lAppEntry);
            }
            else {
                iCounter++;
            }
        }
    }
    
    gGsTileGlobal.appList.forEach(acknowledgeClient);
    if (gDebugItem.list) { gGsTileGlobal.appList.forEach(postClient); }
    
    makeAppChannels();
    sendMonomeFocusStatus();
    
    if (gDebugItem.startValue) { post("list Length:", gGsTileGlobal.appList.length, "\n"); }
    if (gDebugItem.functionName) { post("    ---end processNewClientNotification-\n"); }
}

function isInAppLedWindow(aIndexOfApp, aColumnOfLed, aRowOfLed) {
    var lLeftEdgeOfWindow = gGsTileGlobal.appList[aIndexOfApp].windowWidth, //!! width
        lRightEdgeOfWindow = gGsTileGlobal.appList[aIndexOfApp].windowWidth + gGsTileGlobal.appList[aIndexOfApp].displayColumnOffset, //!! width + columnOffset
        lTopEdgeOfWindow = gGsTileGlobal.appList[aIndexOfApp].windowHeight, //!! height
        lBottomEdgeOfWindow = gGsTileGlobal.appList[aIndexOfApp].windowHeight + gGsTileGlobal.appList[aIndexOfApp].displayRowOffset; //!! height + rowOffset
    
    if ((lLeftEdgeOfWindow < aColumnOfLed < lRightEdgeOfWindow) && (lTopEdgeOfWindow < aRowOfLed < lBottomEdgeOfWindow)) {
        return true;
    }
    else { return false; }
}

function processLed(aAppName, aAppChannel, aKeyOne, aKeyTwo, aMonomeNumber, aCol, aRow, aState) {
    var lAppIndex = findApp(aAppName, aAppChannel, aKeyOne, aKeyTwo),
        lColumnValueAfterOffset,
        lRowValueAfterOffset,
        lAppEntry = gGsTileGlobal.appList[lAppIndex],
        lMonomeNumber = lAppEntry.monomeNumber;


    if (gDebugItem.frequentFunctionName) { post("    --processLed--", aCol, aRow, "\n"); }

    if (lAppIndex > -1) {
        lColumnValueAfterOffset = aCol + lAppEntry.displayColumnOffset;
        lRowValueAfterOffset = aRow + lAppEntry.displayRowOffset;

        if (gDebugItem.frequentList) { post("lMonomeNumber:", lMonomeNumber, "\n"); }

        if (lMonomeNumber != 0) {
            outlet(lMonomeNumber, "/gs.tile-" + lMonomeNumber + "/grid/led/set", lColumnValueAfterOffset, lRowValueAfterOffset, aState);
        }

        if (gDebugItem.frequentList) { post("col:", lColumnValueAfterOffset, "row:", lRowValueAfterOffset, "\n"); }
    }
    else {
        if (gDebugItem.frequentList) { post("app:, ", aAppName, "channel:", aAppChannel, " not found!\n"); }
    }
}

function updateWindowDimensions(aAppName, aAppChannel, aKeyOne, aKeyTwo, aMonomeNumber, aWidth, aHeight, aColOffset, aRowOffset, aDisplayLayer) {
    var lAppIndex = findApp(aAppName, aAppChannel, aKeyOne, aKeyTwo);


    if (gDebugItem.functionName) { post("    ---updateWindowDimensions-\n"); }
    
    // 0<name> 1<channelObject> 2<channelNumber> 3<key1> 4<key2> 5<orderNumber>
    // 6<monomeNumber> 7<width>, 8<heigth>, 9<displayColumnOffset>, 10<displayRowOffset> 11<displayLayer>
            
    if(lAppIndex > -1) {
        if (gDebugItem.endValue) { post("name of app to update:", gGsTileGlobal.appList[lAppIndex].appName, "\n"); }
        
        if (gDebugItem.list) { post("updating monome number to:", aMonomeNumber, "\n"); }
        gGsTileGlobal.appList[lAppIndex].monomeNumber = aMonomeNumber; //!!

        if (gDebugItem.list) { post("updating width to:", aWidth, "\n"); }
        gGsTileGlobal.appList[lAppIndex].windowWidth = aWidth; //!!
        
        if (gDebugItem.list) { post("updating height to:", aHeight, "\n"); }
        gGsTileGlobal.appList[lAppIndex].windowHeight = aHeight; //!!
        
        if (gDebugItem.list) { post("updating colOffset to:", aColOffset, "\n"); }
        gGsTileGlobal.appList[lAppIndex].displayColumnOffset = aColOffset; //!!
        
        if (gDebugItem.list) { post("updating rowOffset to:", aRowOffset, "\n"); }
        gGsTileGlobal.appList[lAppIndex].displayRowOffset = aRowOffset; //!!

        if (gDebugItem.list) { post("updating displayLayer to:", aDisplayLayer, "\n"); }
        gGsTileGlobal.appList[lAppIndex].displayLayer = aDisplayLayer; //!!
    }
    
    clearMonomes();
    messnamed("gs.tile.allClients", "refreshAppWindow");
}

function clearMonomes() {
    var lClearMessage,
        iMonome,
        lLength;
    
    if (gDebugItem.functionName) { post("    ---clearMonomes-\n"); }
    
    for (iMonome = 0, lLength = gFocusArray.length;iMonome < lLength; iMonome++) {
        
        if (gFocusArray[iMonome]) {
            lClearMessage = "/gs.tile-" + (iMonome + 1) + "/clear";
            outlet((iMonome + 1), lClearMessage);
        }
    }
}


function acknowledgeClient(element, index, array) {
    if (gDebugItem.functionName) { post("    ---acknowledgeClient-\n"); }
    
    if (gDebugItem.endValue) { post("acknowledging:", element.appName, element.channelNumber, element.keyOne, element.keyTwo, "\n"); }
    messnamed("gs.tile.allClients", "clientAcknowledgement", element.appName, element.channelNumber, element.keyOne, element.keyTwo); //!! name, number, keys
    if (gDebugItem.functionEnd) { post("client acknowledged\n"); }
}

function doesShareName(element, index, array) {
    if (gDebugItem.list) { post("    ---doesShareName-\n"); }
    
    if (gDebugItem.list) {
        post("name of element:", element.appName, "name i am looking for:", this.toString(), "\n"); //!! name
        post("are they equal?", (element.appName === this.toString()), "\n"); //!! name 
    }
    return (element.appName === this.toString());
}

function postClient(element, index, array) {
    if (gDebugItem.list) { post("    ---postClient-\n"); }
        
    post("#" + index + ":", element.appName, "key1:", element.keyOne, "key2:", element.keyTwo, "order:", element.orderNumber, "monome:", element.monomeNumber, "channel #:", element.channelNumber, "\n", 
    "        width", element.windowWidth, "height", element.windowHeight, "widthOffset", element.displayColumnOffset, "heightOffset", element.displayRowOffset, "\n"); // !! everything
    //post("full entry:", element, "\n");
}

function closeSingleChannel(element, index, array) {
    element.channelObject = null; //!! channel object
}

function makeAppChannels() {
    var lListLength,
        iApp,
        lChannelName;
    
    if (gDebugItem.functionName) { post("    ---makeAppChannels-\n"); }
    
    if(gAppChannelsMade) {
        gGsTileGlobal.appList.forEach(closeSingleChannel);
    }
    
    lListLength = gGsTileGlobal.appList.length;
    
    for (iApp = 0; iApp < lListLength; iApp++){
        lChannelName = gGsTileGlobal.appList[iApp].appName + gGsTileGlobal.appList[iApp].channelNumber; //!! name number
        if (gDebugItem.startValue) { post("channel name is", lChannelName, "\n"); }
        gGsTileGlobal.appList[iApp].channelObject = new Global(lChannelName); //!! channel object
    }
    if (gDebugItem.startValue) { post("channelName in router:", lChannelName, "\n"); }
    gAppChannelsMade = true;
}


function removeClient(aAppName, aChannelNumber, aKey1, aKey2) {
    var lAppEntry = [aAppName, aChannelNumber, aKey1, aKey2]; // !!name, number, key1, key2 --this is all findApp needs.

    if (gDebugItem.functionName) { post("    ---removeClient-\n"); }
    
    if (gDebugItem.startValue) { post("entry of app to remove", lAppEntry, "\n"); }
    var lTheApp = findApp(aAppName, aChannelNumber, aKey1, aKey2);
    
    if (gDebugItem.endValue) { post("(removeClient) theApp =", lTheApp, "\n"); }
    if (lTheApp > -1) { 
        gGsTileGlobal.appList.splice(lTheApp, 1);
    }
    
    if (gGsTileGlobal.appList.length > 0) {
        makeAppChannels();
        gGsTileGlobal.appList.forEach(acknowledgeClient);
        if (gDebugItem.list) { gGsTileGlobal.appList.forEach(postClient); }
    }
}

function findApp(aAppName, aChannelNumber, aKeyOne, aKeyTwo) {
    var lListLength = gGsTileGlobal.appList.length,
        iApp;
    
    if (gDebugItem.frequentFunctionName) { post("    ---findApp-\n"); }
    
    if (gDebugItem.endValue) { post("app array to find:", aAppName, aChannelNumber, aKeyOne, aKeyTwo, "\n"); }
    if (gDebugItem.list) { 
        post("list of current clients:\n");
        gGsTileGlobal.appList.forEach(postClient);
        post("list end.\n");
    }
    

    for (iApp = 0;iApp < lListLength; iApp++) {
        if ((gGsTileGlobal.appList[iApp].appName === aAppName) &&
            (gGsTileGlobal.appList[iApp].keyOne === aKeyOne) &&
            (gGsTileGlobal.appList[iApp].keyTwo === aKeyTwo)) { //!! name number key1 key2 
            return iApp;
        }
    }
    if (gDebugItem.list) { post("app not found\n"); }
    return -1;
}

function freebang() {
    
    gNumberOfMonomeChannels = 0;
    sendMonomeFocusStatus();
    
    gGsTileGlobal.appList = null;
    gGsTileGlobal.toRouter = null;
    gGsTileGlobal.newClient = null;
    gGsTileGlobal.removeClient = null;
    gGsTileGlobal.led = null;
    gGsTileGlobal.appWindow = null;
    gGsTileGlobal = null;
    
    post("gs.tile.router freed");
    
}

function press(aColumn, aRow, aState) {
    if (gDebugItem.functionName) { post("    --press--\n"); }

    if (gDebugItem.list) { post("column:", aColumn, "row:", aRow, "state:", aState, "inlet:", inlet, "\n"); }
    gGsTileGlobal.appList.forEach(sendPressToWindows, [aColumn, aRow, aState, inlet]);
}

function sendPressToWindows(element, index, array) {
    var lLeftEdgeOfWindow,
        lRightEdgeOfWindow,
        lTopEdgeOfWindow,
        lBottomEdgeOfWindow,
        lTranslatedColumnn,
        lTranslatedRow,
        aColumn = this[0],
        aRow = this[1],
        aState = this[2],
        aInlet = this[3];
    
    
    if (gDebugItem.functionName) { post("    ---sendPressToWindows-\n"); }
    if (gDebugItem.frequentList) { post("element:", element, "\n:", "passed array:", this, "\n"); }

    // this = [col, row, state]
    // element:
    // 0<name> 1<channelObject> 2<channelNumber> 3<key1> 4<key2> 5<orderNumber>
    // 6<monomeNumber> 7<width>, 8<heigth>, 9<displayColumnOffset>, 10<displayRowOffset> 11<displayLayer>

    // check which monome sent and if the message is for us
    
    if (gDebugItem.endValue) { post("inlet:", aInlet, "Monome of this app:", element.monomeNumber, "\n"); }
    if (element.monomeNumber === aInlet) {
        
        //!! columnOffset
        lLeftEdgeOfWindow = element.displayColumnOffset - 1; 
        //!! width + columnOffset
        lRightEdgeOfWindow = element.windowWidth + element.displayColumnOffset;
        //!! rowOffset
        lTopEdgeOfWindow = element.displayRowOffset - 1;
        //!! height + rowOffset
        lBottomEdgeOfWindow = element.windowHeight + element.displayRowOffset;
        //!! column offset
        lTranslatedColumnn = aColumn - element.displayColumnOffset;
        //!! row offset
        lTranslatedRow = aRow - element.displayRowOffset;
        
        if ((lLeftEdgeOfWindow < aColumn) && (aColumn < lRightEdgeOfWindow)) {
            if ((lTopEdgeOfWindow < aRow) && (aRow < lBottomEdgeOfWindow)) {
                if (gDebugItem.endValue) { post("press:", lTranslatedColumnn, lTranslatedRow, aState, "sent to:", element.appName, element[2], " n"); }
                //!! name and channel
                element.channelObject.press(lTranslatedColumnn, lTranslatedRow, aState);
            }
        }
    }
}

function testAppChannels(_ar) {
    var iApp;
    if (gDebugItem.functionName) { post("    ---testAppChannels-\n"); }
    
    if (gDebugItem.endValue) { post("list Length:", gGsTileGlobal.appList.listLength, "\n"); }
    
    for (iApp = 0; iApp < gGsTileGlobal.appList.listLength; iApp++){
        if (gDebugItem.endValue) { post("talking to:", gGsTileGlobal.appList[iApp].appName, "\n"); } //!! name
        gGsTileGlobal.appList[iApp].channelObject.connection();
    }
}