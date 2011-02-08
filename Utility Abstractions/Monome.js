autowatch = 1;

var gMonome;

function initialize() {
    gMonome = new Monome(32, 32, 0);
}

function anything() {

    var lArguments = arrayfromargs(arguments);
    var lMessageArray = messagename.split("/");
    if (lMessageArray[0] === "") {
        lMessageArray.shift();
    }
    if (lMessageArray[lMessageArray.length - 1] === "") {
        lMessageArray.pop();
    }

    switch (lMessageArray[1]) {
    case "led":
        if (lMessageArray.length === 2) {
            post("LED:", lArguments, "\n");
        }
        else if (lMessageArray[2] == "row") {
            post("ROW:", lArguments, "\n");
        }
        else if (lMessageArray[2] == "col") {
            post("COL:", lArguments, "\n");
        }
        break;
    
    case "led_row":
        post("LED_ROW", lArguments, "\n");
        break;

    case "led_col":
        post("LED_COL", lArguments, "\n");
        break;

    case "press":
        post("PRESS:", lArguments, "\n");
        break;

    case "frame":
        post("FRAME:", lArguments, "\n");
        break;

    case "clear":
        post("CLEAR!\n");
        break;

    default:
        break;
    }
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

    if (gDebugItem.functionArguments) {
        post("typeof aOutlet", typeof aOutlet, "\n");
    }

    if (gDebugItem.functionArguments) {
        post("mColumns", mColumns, "mRows", mRows, "\n");
    }

    if (gDebugItem.functionName) {
        post("    --Monome--\n");
    }
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
            if (!mUpdating) {
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
        return (mColumns > aNumber) ? true: false;
    };

    this.isValidRow = function(aNumber) {
        return (aRows > aNumber) ? true: false;
    };

    this.rebuild = function(aColumns, aRows) {
        var iCol,
        iRow,
        lMaxColumns = Math.max(aColumns, mColumns),
        lMaxRows = Math.max(aRows, mRows);

        if (gDebugItem.functionName) {
            post("    --rebuild--\n");
        }

        mColumns = aColumns;
        mRows = aRows;

        for (iCol = 0; iCol < lMaxColumns; iCol++) {
            if ((that[iCol] != null) && (iCol < aColumns)) {
                if (gDebugItem.list) {
                    post("column:", iCol, "is fine!\n");
                }
            }
            else if ((that[iCol] != null) && (iCol >= aColumns)) {
                if (gDebugItem.list) {
                    post("column:", iCol, "will be deleted!\n");
                }
                that[iCol] = null;
            }

            else if ((!that[iCol]) && (iCol < aColumns)) {
                that[iCol] = [];
                if (gDebugItem.list) {
                    post("column:", iCol, "added!\n");
                }
            }


            if (that[iCol] != null) {
                for (iRow = 0; iRow < lMaxRows; iRow++) {
                    if ((that[iCol][iRow] != null) && (iRow < aRows)) {
                        if (gDebugItem.list) {
                            post("column:", iCol, "row:", iRow, "is fine!\n");
                        }
                    }
                    else if ((that[iCol][iRow] != null) && (iRow >= aRows)) {
                        that[iCol][iRow] = null;
                        if (gDebugItem.list) {
                            post("column:", iCol, "row:", iRow, "deleted!\n");
                        }
                    }

                    else if ((!that[iCol][iRow]) && (iRow < aRows)) {
                        if (gDebugItem.list) {
                            post("column:", iCol, "row:", iRow, "added!\n");
                        }
                        that[iCol][iRow] = new SingleCell(iCol, iRow, aOutlet);
                    }
                }
                if (gDebugItem.endValue) {
                    post("Monome[", iCol, "].length:", that[iCol].length, "\n");
                }
            }
        }

    };

    this.window = function(aMethodToInvoke, aLeftColumn, aRightColumn, aTopRow, aBottomRow) {
        if (gDebugItem.functionName) {
            post("    --window :", aMethodToInvoke, "--\n");
        }
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
        if (gDebugItem.functionName) {
            post("    --refresh--\n");
        }
        that.window("checkActual", 0, mColumns, 0, mRows);
    };
    //TODO learn how to make a catch all and pass calls to the whole monome.
    this.clear = function() {
        if (gDebugItem.functionName) {
            post("    --clear--\n");
        }

        window("ledOff", 0, mColumns, 0, mRows);
    };

    this.beginUpdates = function() {
        if (gDebugItem.functionName) {
            post("    --beginUpdates--\n");
        }

        mUpdating = true;
    };
    this.endUpdates = function() {
        if (gDebugItem.functionName) {
            post("    --endUpdates--\n");
        }

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
