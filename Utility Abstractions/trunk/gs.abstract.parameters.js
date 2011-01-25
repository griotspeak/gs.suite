function Parameters() {
    if (gDebugItem.functionName) { post("    --Parameters--\n"); }
    
    var mParameters = this;
    
    function sendToHud(aObject) {

        var lOutlet = 2,
            aKey = aObject.key,
            aValue = (typeof aObject.value === "function") ? aObject.value() : aObject.value,
            aFormat = (aObject.format == undefined) ? Boolean(false) : aObject.format;        

        if (gDebugItem.functionName) { post("    --Parameter.sendToHud - key: " + aKey + " value: " + aValue  + " format: " + aFormat + " --\n"); }
        if (gDebugItem.functionArguments) { post("aKey:", aKey, "aValue:", aValue, "aFormat:", aFormat, "\n"); }

        switch (aFormat) {
            case "set":
                outlet(lOutlet, aKey, "set", aValue);
                break;
            case "trigger":
                outlet(lOutlet, aKey, aValue);
                break;
            case "symbol":
                outlet(lOutlet, aKey, "setsymbol", aValue);
                break;
            case "measures":
                outlet(lOutlet, aKey, "set", aValue, (aValue == 1) ? "measure" : "measures");
                break;
            case "slotSet":
                outlet(lOutlet, aSlot, aKey, "set", aValue);
                break;
            case "slotTrigger":
                outlet(lOutlet, aSlot, "setsymbol", aValue);
                break;
            case "slotSymbol":
                outlet(lOutlet, aSlot, aKey, "setsymbol", aValue);
                break;
            default: 
                post("error in Parameter.sendToHud. aFormat:", aFormat, "\n");
                break;
        }
    }
    
    this.set = function(aObject) {
        if (gDebugItem.functionName) { post("    --Parameters.set--\n"); }
        if (typeof aObject !== "object") { post("THAT IS NOT CORRECT SIR! NOT AT ALL CORRECT AND I DEMAND AN APOLOGY!"); }
        var aParameter = mParameters[aObject.key],
            aValue = aObject.value,
            aSlot = (aObject.slot === undefined) ? null : aObject.slot,
            aQuietly = (aObject.silent === true),
            lPatcherObjectNameString,
            lValue,
            lMinimum = (aParameter.minValue instanceof Function) ? aParameter.minValue() : aParameter.minValue,
            lMaximum = (aParameter.maxValue instanceof Function) ? aParameter.maxValue() : aParameter.maxValue,
            lListenerKeys = aParameter.listeners,
            lLength = lListenerKeys.length,
            iCounter;

        //check validity of aValue
        if ((aParameter.type == "number") || (aParameter.type == "toggle") || (aParameter.type == "slotArray")) {
            if ((aValue >= lMinimum) && (aValue <= lMaximum)) { lValue = aValue; }
            else if (aValue < lMinimum) { lValue = lMinimum; }
            else if (aValue > lMaximum) { lValue = lMaximum; }
            else { post("something has gane awry in Parameter.set!\n"); }
        }
        else { lValue = aValue; }

        if (aParameter.type == "slotArray") { aParameter.value[aSlot] = lValue; }
        else { aParameter.value = lValue; }

        mParameters.display(aParameter.name);

        // call listeners
        
        if (aQuietly) { 
            return;
        }
        for (iCounter = 0; iCounter < lLength; iCounter++) {
            gThis[lListenerKeys[iCounter]]();
            if (gDebugItem.localValue) { post("lListenerKeys[" +iCounter + "]:", lListenerKeys[iCounter], "\n"); }
        }

        // Save.
        if (aParameter.saveInPattr) {
            patcherObjectNameString = aParameter.name + mParameters.patchString + "Pattr";
            gThisPatcher.getnamed(patcherObjectNameString).message(aParameter.value);
        }
    }
    
    this.display = function(aParameterName, aSlot) {
        if (!gDebugItem.functionName) { post("    --Parameters.display "+ aParameterName +"--\n"); }
        
        var iCounter,
            lLength,
            aParameter = mParameters[aParameterName];
            
        if (aParameter.format != undefined) {
            if (aParameter.type == "slotArray") {
                
                if (aSlot) {
                    sendToHud({
                        key: aParameter.name,
                        value: aParameter.value[aSlot],
                        format: aParameter.format,
                        slot: aSlot
                    });
                }
                 else {
                    for (iCounter = 0, lLength = aParameter.value.length; iCounter < lLength; iCounter++) {
                        sendToHud({
                            key: aParameter.name,
                            value: aParameter.value[iCounter],
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
    }
    this.displayAll = function() {   
         if (gDebugItem.functionName) { post("    --Parameters.displayAll --\n"); }
         
        var iProperty;

        for (iProperty in mParameters) {
            if (mParameters[iProperty].format) {
                mParameters.display(iProperty);
            }
        }
    }
    
    this.toggle = function(aParameterName) {
        if (gDebugItem.functionName) { post("    --Parameters.toggle--\n"); }
        
        if (mParameters[aParameterName].type == "toggle") {
            mParameters.set({
                key : aParameterName,
                value : Number(!Boolean(mParameters[aParameterName].value))
            });
        }
        else { post(aParameterName, "is not a toggle parameter\n");}
    }
    
    this.change = function(aParameterName, aAmount) {
        if (gDebugItem.functionName) { post("    --Parameters.change--\n"); }

        mParameters.set({
            key : aParameterName,
            value : mParameters[aParameterName].value + aAmount
        });
    }
    
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
                lValue = String(gThisPatcher.getnamed(lPatcherObjectNameString).getvalueof());
                break;
            case "slotArray" :
                lValue = Array(gThisPatcher.getnamed(lPatcherObjectNameString).getvalueof());
                break;
            default :
                post(aParameter.name + ".type:", aParameter.type , "\n");
                break;
        }

        if (gDebugItem.localValue) { post("lValue from " + lPatcherObjectNameString + ":", lValue, "\n"); }

        mParameters.set({
            key : aParameter.name,
            value : lValue,
            silent : true
        });

        if (gDebugItem.endValue) { post(aParameter.name + ".value: ", aParameter.value, "\n"); }
    }

    this.grabAll = function() {   
         if (gDebugItem.functionName) { post("    --Parameters.grabAll --\n"); }
         
        var iProperty;

        for (iProperty in mParameters) {
            if (mParameters[iProperty].saveInPattr) {
                mParameters.grab(mParameters[iProperty]);
            }
        }
    }
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