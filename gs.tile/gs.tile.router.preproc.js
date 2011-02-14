var gStandardHorizontal = 120;
var gStandardVertical = 30;

var gPatcher = this.patcher;

var gLeftEdge = 6;
var gTopEdge = 114;

var gInlet;
var gOutlet;

var gKeyRouteObject;
var gPressPrependObject;


function bang() {
    gInlet = gPatcher.getnamed("preprocInlet");
    gOutlet = gPatcher.getnamed("preprocOutlet");

    gKeyRouteObject = gPatcher.newdefault(gLeftEdge, gTopEdge, "route", jsarguments[1] + "/grid/key");
    gPressPrependObject = gPatcher.newdefault(gLeftEdge, gTopEdge + gStandardVertical, "prepend", "press");

    gPatcher.connect(gInlet, 0, gKeyRouteObject, 0);
    gPatcher.connect(gKeyRouteObject, 0, gPressPrependObject, 0);
    gPatcher.connect(gPressPrependObject, 0, gOutlet, 0);
    
}

function freebang() {
    post("freebanging\n");
    gPatcher.remove(gKeyRouteObject);
    gPatcher.remove(gPressPrependObject);
}
