function Parameters(aObject) {
    if (gDebugItem.functionName) { post("    --Parameters--\n"); }
    
    var mParameters = this,
        mOutlet = aObject.outlet;
    
    function sendToHud(aObject) {

        var aKey = aObject.key,
            aValue = (typeof aObject.value === "function") ? aObject.value() : aObject.value,
            aFormat = (aObject.format == undefined) ? Boolean(false) : aObject.format,
            aSlot = (aObject.slot == undefined) ? null : aObject.slot;

        if (gDebugItem.functionName) { post("    --Parameter.sendToHud --\n"); }
        if (gDebugItem.functionArguments) { post("aKey:", aKey, "aValue:", aValue, "aFormat:", aFormat, "aSlot", aSlot, "\n"); }

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
    
    this.set = function(aObject) {
        if (gDebugItem.functionName) { post("    --Parameters.set", aObject.key, "set:", aObject.value, "--\n"); }
        if (typeof aObject !== "object") { post("THAT IS NOT CORRECT SIR! NOT AT ALL CORRECT AND I DEMAND AN APOLOGY!"); }
        var aParameter = mParameters[aObject.key],
            aValue = aObject.value,
            lIsSlotArray = (aParameter.type == "slotArray"),
            aSlot = (aObject.slot === undefined) ? null : aObject.slot,
            aQuietly = (aObject.silent === true),
            lPatcherObjectNameString,
            lValue,
            lMinimum = (aParameter.minValue instanceof Function) ? aParameter.minValue() : aParameter.minValue,
            lMaximum = (aParameter.maxValue instanceof Function) ? aParameter.maxValue() : aParameter.maxValue,
            lListenerKeys = aParameter.listeners,
            lListenerLength = lListenerKeys.length,
            iCounter;

        //check validity of aValue
        if ((aParameter.type == "number") || (aParameter.type == "toggle") || lIsSlotArray) {
            if ((aValue >= lMinimum) && (aValue <= lMaximum)) { lValue = aValue; }
            else if (aValue < lMinimum) { lValue = lMinimum; }
            else if (aValue > lMaximum) { lValue = lMaximum; }
            else { post("something has gane awry in Parameters.set!\n"); }
        }
        else { lValue = aValue; }
        
        if (lIsSlotArray) { aParameter.value[aSlot] = lValue; }
        else { aParameter.value = lValue; }
        
        mParameters.display(aParameter.name);

        // call listeners
        
        if (aQuietly) { 
            return;
        }
        for (iCounter = 0; iCounter < lListenerLength; iCounter++) {
            gThis[lListenerKeys[iCounter]]((lIsSlotArray) ? aSlot : undefined);
            if (gDebugItem.localValue) { post("lListenerKeys[" +iCounter + ".name]:", iFunctionName, "\n"); }
        }
        
        // Save.
        if (aParameter.saveInPattr) {
            lPatcherObjectNameString = aParameter.name + mParameters.patchString + "Pattr";
            if (gDebugItem.localValue) { post("lPatcherObjectNameString", lPatcherObjectNameString, "\n"); }
            gThisPatcher.getnamed(lPatcherObjectNameString).message(aParameter.value);
        }
    };
    
    this.display = function(aParameterName, aSlot) {
        if (gDebugItem.functionName) { post("    --Parameters.display "+ aParameterName +"--\n"); }
        
        var iCounter,
            aParameter = mParameters[aParameterName],
            lValueIsFunction = (typeof aParameter.value == "function"),
            lLength = (lValueIsFunction) ? aParameter.value.arrayLength : aParameter.value.length;
            
        if (aParameter.format != undefined) {
            if (aParameter.type == "slotArray") {
                if (aSlot != undefined) {
                                        
                    sendToHud({
                        key: aParameter.name,
                        value: (lValueIsFunction) ? aParameter.value(aSlot) : aParameter.value[aSlot],
                        format: aParameter.format,
                        slot: aSlot
                    });
                }

                 else {
                    for (iCounter = 0; iCounter < lLength; iCounter++) {
                        sendToHud({
                            key: aParameter.name,
                            value: (lValueIsFunction) ? aParameter.value(iCounter) : aParameter.value[iCounter],
                            format: aParameter.format,
                            slot: iCounter
                        });
                    }
                } 
            }
            else {
                sendToHud({
                    key: aParameter.name,
                    value: aParameter.value,
                    format: aParameter.format
                });
            }
        }
    };
    
    this.displayAll = function(aSlot) {
        if (gDebugItem.functionName) { post("    --Parameters.displayAll --\n"); }

        var iProperty;

        if (!aSlot) {
            for (iProperty in mParameters) {
                if (mParameters[iProperty].format) {
                    mParameters.display(iProperty);
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
        else { post(aParameterName, "is not a toggle parameter\n");}
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
                lValue = gThisPatcher.getnamed(lPatcherObjectNameString).getvalueof();
                break;
            case "string" :
                lValue = gThisPatcher.getnamed(lPatcherObjectNameString).getvalueof();
                break;
            case "slotArray" :
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
}

gParameters.scene = {
    name: "scene",
    type: "number",
    format: "set",
    value: function() {
        return (Number(gParameters.clipScene.value) + 1);
    },
    minValue: -Infinity,
    maxValue: Infinity,
    saveInPattr: false,
    listeners: []
};