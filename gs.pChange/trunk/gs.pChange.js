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
var gThisPatcher = this.patcher;

var post;
var outlet;
var Monome = [];

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


var gParameters = new Parameters({outlet : 1});

gParameters.monomeWidth = {
    name : "monomeWidth",
    type : "number",
    format: "set",
    value : 0,
    minValue : 2,
    maxValue : 2048,
    saveInPattr : true,
    preListeners : [],
    postListeners: []
};

gParameters.monomeHeight = {
    name : "monomeHeight",
    type : "number",
    format: "set",
    value : 0,
    minValue : 2,
    maxValue : 2048,
    saveInPattr : true,
    preListeners : [],
    postListeners: []
};

gParameters.channel = {
    name : "channel",
    type : "number",
    format: "set",
    value : 0,
    minValue : 0,
    maxValue : 127,
    saveInPattr : true,
    preListeners : [],
    postListeners: []
};

gParameters.patchString = "GsProgramChange";

function initialize() {
    setDebugLevel(0);
    gParameters.grabAll();
    
    buildMonome();
}

function setDebugLevel(level) {
    if (level > 0) { post("    --setDebugLevel = ", level, "--\n"); }
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

//                                  ---===Controller Methods===---
function press(aCol, aRow, aPress) {
    var lNumber;
    if (mDebugLevel[1]) { post("    --press--\n"); }
    
    if (mDebugLevel[2]) {
        post("press called.\n aCol:", aCol, "aRow", aRow, "aPress", aPress, "\n");
    }
    
    if (aPress == 1) {
        lNumber = aRow * gParameters.monomeWidth.value + aCol;
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
    
    messnamed("gs.channel", "channelProgramChange", gParameters.channel.value, aNumber);

}

function setChannel(aChannel) {
    gParameters.set({
        key : "channel",
        value : aChannel
    });
}


//                                  ---===Monome Device Methods===---
function setMonomeWidth( aWidth) {
    gParameters.set({
        key : "monomeWidth",
        value : aWidth
    });
    buildMonome();
}
function setMonomeHeight( aHeight) {
    gParameters.set({
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
    if (mDebugLevel[1]) { post("    --buildMonome--\n"); }
    if (mDebugLevel[2]) { post("buildMonome called\n"); }
    if (mDebugLevel[4]) {
        post("gParameters.monomeWidth.value:", gParameters.monomeWidth.value, "\n");
        post("gParameters.monomeHeight.value:", gParameters.monomeHeight.value, "\n");
    }
    
    for (var iCol = 0; iCol < gParameters.monomeWidth.value; iCol++) {
        Monome[iCol] = new Array();
        for (var iRow = 0; iRow < gParameters.monomeHeight.value; iRow++) {
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
            for (iColumn = 0; iColumn < gParameters.monomeWidth.value; iColumn++) {
                Monome[iColumn][aRow].ledOn();
            }
            break;
        case "ledOff":
            for (iColumn = 0; iColumn < gParameters.monomeWidth.value; iColumn++) {
                Monome[iColumn][aRow].ledOff();
            }
            break;
        case "tempOn":
            for (iColumn = 0; iColumn < gParameters.monomeWidth.value; iColumn++) {
                Monome[iColumn][aRow].tempOn();
            }
            break;
        case "tempOff":
            for (iColumn = 0; iColumn < gParameters.monomeWidth.value; iColumn++) {
                Monome[iColumn][aRow].tempOff();
            }
            break;
        case "blink":
            for (iColumn = 0; iColumn < gParameters.monomeWidth.value; iColumn++) {
                Monome[iColumn][aRow].blink();
            }
            break;
        case "blinkIfOff":
            for (iColumn = 0; iColumn < gParameters.monomeWidth.value; iColumn++) {
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
            for (iRow = 0; iRow < gParameters.monomeHeight.value; iRow++) {
                Monome[aColumn][iRow].ledOn();
            }
            break;
        case "ledOff":
            for (iRow = 0; iRow < gParameters.monomeHeight.value; iRow++) {
                Monome[aColumn][iRow].ledOff();
            }
            break;
        case "tempOn":
            for (iRow = 0; iRow < gParameters.monomeHeight.value; iRow++) {
                Monome[aColumn][iRow].tempOn();
            }
            break;
        case "tempOff":
            for (iRow = 0; iRow < gParameters.monomeHeight.value; iRow++) {
                Monome[aColumn][iRow].tempOff();
            }
            break;
        case "blink":
            for (iRow = 0; iRow < gParameters.monomeHeight.value; iRow++) {
                Monome[aColumn][iRow].blink();
            }
            break;
        case "blinkIfOff":
            for (iRow = 0; iRow < gParameters.monomeHeight.value; iRow++) {
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
    for (iCol = 0; iCol < gParameters.monomeWidth.value; iCol++) {
        for (iRow = 0; iRow < gParameters.monomeHeight.value; iRow++) {
            Monome[iCol][iRow].checkActual();
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