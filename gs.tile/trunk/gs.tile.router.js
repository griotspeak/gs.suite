/*
-*- coding: utf-8 -*-
gs.gs.tile.router v0.020
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

/*jslint onevar:true */
/*global post : false, autowatch : true, inlets : true, outlets : true, outlet : false, Global : false, messnamed : false, inlet : false */

autowatch = 1;

inlets = 5;
outlets = 5;

var mAppChannelsMade = false,
    mMonomeChannelsMade = false,
    mNumberOfMonomeChannels = 0,
    mUdpSendObject,
    mUdpReceiveObject,
    mPrependPressObject = [],
    mRouteObject = [],
    mPrependLedObject = [],
    
    debugItem = {
        endValue : false,
        frequentItem : false,
        frequentList: false,
        functionName : false,
        frequentFunctionName : false,
        frequentFunctionName : false,
        list : false,
        startValue : false
    },

    mThisRouterObject = this.patcher.getnamed("routerJSObject"),

    gsTileGlobal = new Global("gsTileRouter");


gsTileGlobal.appList = [];
gsTileGlobal.toRouter = incomingMessages;
gsTileGlobal.newClient = processNewClientNotification;
gsTileGlobal.removeClient = removeClient;
gsTileGlobal.led = processLed;
gsTileGlobal.appWindow = updateWindowDimensions;

function reconnect() {
    if (debugItem.functionName) { post("    --reconnect--\n"); }

    gsTileGlobal = new Global("gsTileRouter");
    gsTileGlobal.appList = [];
    gsTileGlobal.toRouter = incomingMessages;
    gsTileGlobal.newClient = processNewClientNotification;
    gsTileGlobal.removeClient = removeClient;
    gsTileGlobal.led = processLed;
    gsTileGlobal.appWindow = updateWindowDimensions;
    mThisRouterObject = this.patcher.getnamed("routerJSObject");
    messnamed("gs.tile.allClients", "newRouterAlert");
    post("gs.tile.router reconnected\n");
}

function makeMonomeChannels(aHowManyChannels) {
    var iChannel,
        lRouteMessage,
        lLedPrependMessage;
    
    if (debugItem.functionName) { post("    ---makeMonomeChannels-\n"); }
    
    if (aHowManyChannels < 1) {
        aHowManyChannels = 1;
    }
    else if (aHowManyChannels > 4) {
        aHowManyChannels = 4;
    }

    if (mMonomeChannelsMade) { 
        // remove from patcher...
        this.patcher.remove(mUdpReceiveObject);
        this.patcher.remove(mUdpSendObject);
        for (iChannel = 0; iChannel < mRouteObject.length; iChannel++) {
            this.patcher.remove(mRouteObject[iChannel]);
            this.patcher.remove(mPrependPressObject[iChannel]);
            this.patcher.remove(mPrependLedObject[iChannel]);
        }
    }
    // ...then clear arrays

    mRouteObject = [];
    mPrependPressObject = [];
    mPrependLedObject = [];
    
    // then make udp objects (not strictly necessary)
    mUdpReceiveObject = this.patcher.newdefault(15, 15, "udpreceive", 8400);
    mUdpSendObject = this.patcher.newdefault(15, 360, "udpsend", "localhost", 8700);
    
    this.patcher.connect(mThisRouterObject, 4, mUdpSendObject, 0);
     
    for (iChannel = 0; iChannel < aHowManyChannels; iChannel++) {
        // make the receives, sends, routes, and prepends
        
        lRouteMessage = "/gs.tile-" + iChannel + "/press";
        lLedPrependMessage = "/gs.tile-" + iChannel + "/led";
                
        mRouteObject[iChannel] = this.patcher.newdefault(15 + (iChannel * 180), 60, "route", lRouteMessage);
        mPrependPressObject[iChannel] = this.patcher.newdefault(15 + (iChannel * 180), 105, "prepend", "press");
        mPrependLedObject[iChannel] = this.patcher.newdefault(15 + (iChannel * 180), 280, "prepend", lLedPrependMessage);
                
        //connect  -->                                                  the 
        this.patcher.connect(mUdpReceiveObject, 0, mRouteObject[iChannel], 0);             // udp     to the routes
        this.patcher.connect(mRouteObject[iChannel], 0, mPrependPressObject[iChannel], 0);            // routes to the prepends
        this.patcher.connect(mPrependPressObject[iChannel], 0, mThisRouterObject, iChannel + 1);    // press prepends to the thisRouterObject
        this.patcher.connect(mThisRouterObject, iChannel, mPrependLedObject[iChannel], 0);            // thisRouterObject to the prepend
        this.patcher.connect(mPrependLedObject[iChannel], 0, mUdpSendObject, 0);            // prepend to udpsend
    }
    
    mMonomeChannelsMade = true;
    mNumberOfMonomeChannels = aHowManyChannels;
}

function incomingMessages() {
    if (debugItem.functionName) { post("    ---incomingMessages-\n"); }
}

function processNewClientNotification(aAppName, aKey1, aKey2, aOrderNumber, aMonomeNumber, aWidth, aHeight, aDisplayColumnOffset, aDisplayRowOffset, aDisplayLayer) {
    var lAppEntry,
        iCounter,
        lListLength,
        lChannelNumbersUsed;
    
    if (debugItem.functionName) { post("    --processNewClientNotification--\n"); }
    
    //UPDATED
    if (debugItem.list) {
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
    if (!gsTileGlobal.appList.some(doesShareName, aAppName)) {
        // set channelNumber and add app to list.
        // gsTileGlobal.appList is an array of arrays
        lAppEntry.channelNumber = 0; // !!channel number
        gsTileGlobal.appList.push(lAppEntry);
    }
    else {
        if (debugItem.list) { post("in else\n"); }
        iCounter = 0;
        lListLength = gsTileGlobal.appList.length;
        if (debugItem.startValue) { post("listLength:", lListLength, "\n"); }
        lChannelNumbersUsed = [];
        
        //count and check for same app
        for (;iCounter < lListLength; iCounter++) {
            if (gsTileGlobal.appList[iCounter].appName === aAppName) { // !!app Name
                //check if keys 
                if ((gsTileGlobal.appList[iCounter].keyOne === aKey1) && (gsTileGlobal.appList[iCounter].keyTwo === aKey2)) { // !!key1
                    if (debugItem.endValue) { post(aAppName, aKey1, aKey2, "seems to be present already\n"); }
                    return;
                }
                else {
                    // no need to count apps explicitly. lChannelNumbersUsed.length = the number of apps.
                    lChannelNumbersUsed.push(gsTileGlobal.appList[iCounter].channelNumber); // !!Channel Number
                }
            }
        }
        
        iCounter = 0; 
        
        while (lAppEntry.channelNumber === "unassigned") { // !!channel number
            if (lChannelNumbersUsed.indexOf(iCounter) < 0) {
                lAppEntry.channelNumber = iCounter; // !!channel number
                gsTileGlobal.appList.push(lAppEntry);
            }
            else {
                iCounter++;
            }
        }
    }
    
    gsTileGlobal.appList.forEach(acknowledgeClient);
    if (debugItem.list) { gsTileGlobal.appList.forEach(postClient); }
    
    makeAppChannels();
    
    if (debugItem.startValue) { post("list Length:", gsTileGlobal.appList.length, "\n"); }
    if (debugItem.functionName) { post("    ---end processNewClientNotification-\n"); }
}

function isInAppLedWindow(aIndexOfApp, aColumnOfLed, aRowOfLed) {
    var lLeftEdgeOfWindow = gsTileGlobal.appList[aIndexOfApp].windowWidth, //!! width
        lRightEdgeOfWindow = gsTileGlobal.appList[aIndexOfApp].windowWidth + gsTileGlobal.appList[aIndexOfApp].displayColumnOffset, //!! width + columnOffset
        lTopEdgeOfWindow = gsTileGlobal.appList[aIndexOfApp].windowHeight, //!! height
        lBottomEdgeOfWindow = gsTileGlobal.appList[aIndexOfApp].windowHeight + gsTileGlobal.appList[aIndexOfApp].displayRowOffset; //!! height + rowOffset
    
    if ((lLeftEdgeOfWindow < aColumnOfLed < lRightEdgeOfWindow) && (lTopEdgeOfWindow < aRowOfLed < lBottomEdgeOfWindow)) {
        return true;
    }
    else { return false; }
}

function processLed(aAppName, aAppChannel, aKeyOne, aKeyTwo, aMonomeNumber, aCol, aRow, aState) {
    var lAppIndex = findApp(aAppName, aAppChannel, aKeyOne, aKeyTwo),
        lColumnValueAfterOffset,
        lRowValueAfterOffset,
        lProperOutlet;
    

    if (debugItem.frequentFunctionName) { post("    --processLed--", aCol, aRow, "\n"); }
    
    if(lAppIndex > -1) {
            lColumnValueAfterOffset = aCol + gsTileGlobal.appList[lAppIndex].displayColumnOffset; //!! columnOffset
            lRowValueAfterOffset = aRow +  gsTileGlobal.appList[lAppIndex].displayRowOffset; //!! rowOffset
            lProperOutlet = gsTileGlobal.appList[lAppIndex].monomeNumber - 1;
        
        if (gsTileGlobal.appList[lAppIndex].monomeNumber > mNumberOfMonomeChannels) {
            lProperOutlet = mNumberOfMonomeChannels - 1;
        }
        
        if (debugItem.frequentList) { post("properOutlet:", lProperOutlet, "\n"); }
        
        if (lProperOutlet > -1) {
            outlet(lProperOutlet, lColumnValueAfterOffset, lRowValueAfterOffset, aState);
        }
        
        if (debugItem.frequentList) { post("col:", lColumnValueAfterOffset, "row:", lRowValueAfterOffset, "\n"); }
    }
    else { if (debugItem.frequentList) { post("app:, ", aAppName, "channel:", aAppChannel, " not found!\n"); } }
}

function updateWindowDimensions(aAppName, aAppChannel, aKeyOne, aKeyTwo, aMonomeNumber, aWidth, aHeight, aColOffset, aRowOffset, aDisplayLayer) {
    var lAppIndex = findApp(aAppName, aAppChannel, aKeyOne, aKeyTwo);


    if (debugItem.functionName) { post("    ---updateWindowDimensions-\n"); }
    
    // 0<name> 1<channelObject> 2<channelNumber> 3<key1> 4<key2> 5<orderNumber>
    // 6<monomeNumber> 7<width>, 8<heigth>, 9<displayColumnOffset>, 10<displayRowOffset> 11<displayLayer>
            
    if(lAppIndex > -1) {
        if (debugItem.endValue) { post("name of app to update:", gsTileGlobal.appList[lAppIndex].appName, "\n"); }
        
        if (debugItem.list) { post("updating monome number to:", aMonomeNumber, "\n"); }
        gsTileGlobal.appList[lAppIndex].monomeNumber = aMonomeNumber; //!!

        if (debugItem.list) { post("updating width to:", aWidth, "\n"); }
        gsTileGlobal.appList[lAppIndex].windowWidth = aWidth; //!!
        
        if (debugItem.list) { post("updating height to:", aHeight, "\n"); }
        gsTileGlobal.appList[lAppIndex].windowHeight = aHeight; //!!
        
        if (debugItem.list) { post("updating colOffset to:", aColOffset, "\n"); }
        gsTileGlobal.appList[lAppIndex].displayColumnOffset = aColOffset; //!!
        
        if (debugItem.list) { post("updating rowOffset to:", aRowOffset, "\n"); }
        gsTileGlobal.appList[lAppIndex].displayRowOffset = aRowOffset; //!!

        if (debugItem.list) { post("updating displayLayer to:", aDisplayLayer, "\n"); }
        gsTileGlobal.appList[lAppIndex].displayLayer = aDisplayLayer; //!!
    }
    
    clearMonomes();
    messnamed("gs.tile.allClients", "refreshWindow");
}

function clearMonomes() {
    var lClearMessage,
        iMonome;
    
    if (debugItem.functionName) { post("    ---clearMonomes-\n"); }
    
    for (iMonome = 0;iMonome <mNumberOfMonomeChannels; iMonome++) {
        lClearMessage = "/mMC" + iMonome + "/clear";
        outlet(4,lClearMessage);
    }
}


function acknowledgeClient(element, index, array) {
    if (debugItem.functionName) { post("    ---acknowledgeClient-\n"); }
    
    if (debugItem.endValue) { post("acknowledging:", element.appName, element.channelNumber, element.keyOne, element.keyTwo, "\n"); }
    messnamed("gs.tile.allClients", "clientAcknowledgement", element.appName, element.channelNumber, element.keyOne, element.keyTwo); //!! name, number, keys
    if (debugItem.functionEnd) { post("client acknowledged\n"); }
}

function doesShareName(element, index, array) {
    if (debugItem.list) { post("    ---doesShareName-\n"); }
    
    if (debugItem.list) {
        post("name of element:", element.appName, "name i am looking for:", this.toString(), "\n"); //!! name
        post("are they equal?", (element.appName === this.toString()), "\n"); //!! name 
    }
    return (element.appName === this.toString());
}

function postClient(element, index, array) {
    if (debugItem.list) { post("    ---postClient-\n"); }
        
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
    
    if (debugItem.functionName) { post("    ---makeAppChannels-\n"); }
    
    if(mAppChannelsMade) {
        gsTileGlobal.appList.forEach(closeSingleChannel);
    }
    
    lListLength = gsTileGlobal.appList.length;
    
    for (iApp = 0; iApp < lListLength; iApp++){
        lChannelName = gsTileGlobal.appList[iApp].appName + gsTileGlobal.appList[iApp].channelNumber; //!! name number
        if (debugItem.startValue) { post("channel name is", lChannelName, "\n"); }
        gsTileGlobal.appList[iApp].channelObject = new Global(lChannelName); //!! channel object
    }
    if (debugItem.startValue) { post("channelName in router:", lChannelName, "\n"); }
    mAppChannelsMade = true;
}


function removeClient(aAppName, aChannelNumber, aKey1, aKey2) {
    var lAppEntry = [aAppName, aChannelNumber, aKey1, aKey2]; // !!name, number, key1, key2 --this is all findApp needs.

    if (debugItem.functionName) { post("    ---removeClient-\n"); }
    
    if (debugItem.startValue) { post("entry of app to remove", lAppEntry, "\n"); }
    var lTheApp = findApp(aAppName, aAppChannel, aKey1, aKey2);
    
    if (debugItem.endValue) { post("(removeClient) theApp =", lTheApp, "\n"); }
    if (lTheApp > -1) { 
        gsTileGlobal.appList.splice(lTheApp, 1);
    }
    
    if (gsTileGlobal.appList.length > 0) {
        makeAppChannels();
        gsTileGlobal.appList.forEach(acknowledgeClient);
        if (debugItem.list) { gsTileGlobal.appList.forEach(postClient); }
    }
    post("client removed!\n");
    gsTileGlobal.appList.forEach(postClient);
}

function findApp(aAppName, aAppChannel, aKeyOne, aKeyTwo) {
    var lListLength = gsTileGlobal.appList.length,
        iApp;
    
    if (debugItem.frequentFunctionName) { post("    ---findApp-\n"); }
    
    if (debugItem.endValue) { post("app array to find:", aAppName, aAppChannel, aKeyOne, aKeyTwo, "\n"); }
    if (debugItem.list) { 
        post("list of current clients:\n");
        gsTileGlobal.appList.forEach(postClient);
        post("list end.\n");
    }
    

    for (iApp = 0;iApp < lListLength; iApp++) {
        if ((gsTileGlobal.appList[iApp].appName === aAppName) &&
            (gsTileGlobal.appList[iApp].keyOne === aKeyOne) &&
            (gsTileGlobal.appList[iApp].keyTwo === aKeyTwo)) { //!! name number key1 key2 
            return iApp;
        }
    }
    if (debugItem.list) { post("app not found\n"); }
    return -1;
}

function freebang() {
    post("gs.tile.router freed");
    
}

function press(aColumn, aRow, aState) {
    if (debugItem.functionName) { post("    --press--\n"); }

    if (debugItem.list) { post("column:", aColumn, "row:", aRow, "state:", aState, "inlet:", inlet, "\n"); }
    gsTileGlobal.appList.forEach(sendPressToWindows, [aColumn, aRow, aState, inlet]);
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
    
    
    if (debugItem.functionName) { post("    ---sendPressToWindows-\n"); }
    if (debugItem.frequentList) { post("element:", element, "\n:", "passed array:", this, "\n"); }

    // this = [col, row, state]
    // element:
    // 0<name> 1<channelObject> 2<channelNumber> 3<key1> 4<key2> 5<orderNumber>
    // 6<monomeNumber> 7<width>, 8<heigth>, 9<displayColumnOffset>, 10<displayRowOffset> 11<displayLayer>

    // check which monome sent and if the message is for us
    
    if (debugItem.endValue) { post("inlet:", aInlet, "Monome of this app:", element.monomeNumber, "\n"); }
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
                if (debugItem.endValue) { post("press:", lTranslatedColumnn, lTranslatedRow, aState, "sent to:", element.appName, element[2], " n"); }
                //!! name and channel
                element.channelObject.press(lTranslatedColumnn, lTranslatedRow, aState);
            }
        }
    }
}

function testAppChannels(_ar) {
    var iApp;
    if (debugItem.functionName) { post("    ---testAppChannels-\n"); }
    
    if (debugItem.endValue) { post("list Length:", gsTileGlobal.appList.listLength, "\n"); }
    
    for (iApp = 0; iApp < gsTileGlobal.appList.listLength; iApp++){
        if (debugItem.endValue) { post("talking to:", gsTileGlobal.appList[iApp].appName, "\n"); } //!! name
        gsTileGlobal.appList[iApp].channelObject.connection();
    }
}

/*function initialize() {
    makeMonomeChannels(1);
    messnamed("gs.tile.allClients", "newRouterAlert");
    post("gs.tile.router Finished loading\n");
}*/