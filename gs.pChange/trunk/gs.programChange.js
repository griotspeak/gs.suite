
//<License

/*
-*- coding: utf-8 -*-

gs.pChange
Copyright (c) 2010, 2011, Thompson Usiyan a.k.a. griotspeak
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    *   Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
    *   Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
    *   Neither the name of the gs.pChange nor the
        names of its contributors may be used to endorse or promote products
        derived from this software without specific prior written permission.
    *   Redistributions with Non-trivial alterations must state that alterations
        have been made.
    *   This work may not be used for commercial purposes without the express written
        consent of Thompson Usiyan
    *   This work may be freely used for non-commercial purposes without any
        further consent from Thompson Usiyan. 


GS.PCHANGE IS PROVIDED BY THOMPSON USIYAN ``AS IS'' AND ANY
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

var autowatch = 1;

var inlets = 1;
var outlets = 2;

var mDebugLevel;
var gThisPatcher = this.patcher;

var post;
var outlet;
var gMonome;

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
    
    gMonome = new Monome(gParameters.monomeWidth.value, gParameters.monomeHeight.value, 0);
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
        gMonome[aCol][aRow].push();
        gMonome[aCol][aRow].ledOn();
    }
    else if (aPress == 0) {
        gMonome[aCol][aRow].release();
        gMonome[aCol][aRow].ledOff();
    }
}
press.immediate = 1;

function sendMessageNumber(aNumber) {
    
    messnamed("gs.channel", "channelProgramChange", gParameters.channel.value, aNumber);

}
sendMessageNumber.immediate = 1;

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
    gMonome.rebuild(gParameters.monomeWidth.value, gParameters.monomeHeight.value);
}
function setMonomeHeight( aHeight) {
    gParameters.set({
        key : "monomeHeight",
        value : aHeight
    });
    gMonome.rebuild(gParameters.monomeWidth.value, gParameters.monomeHeight.value);
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