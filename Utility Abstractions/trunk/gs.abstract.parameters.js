

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
        
        if (aParameter.format === null) {
            return;
        }
        
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
        
            var lPatcherObjectNameString = aParameter.name + mParameters.patchString + "Pattr", lValue;

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