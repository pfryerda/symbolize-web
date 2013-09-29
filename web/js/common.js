//A module used to store commonly used functions
//Written by: Luke Brown


//Constants
//---------

var SCALING = 100,      //Define Grid size (100 x 100)
    XOFFSET = 25,       //Width of document to canvas (from the left)
    YOFFSET = 68,       //Width of document to canvas (from top)
    GRID = new Array(); //Array of lines making the grid

for(var i = 10; i < 2*SCALING - 1;i += 10) {
    if (i < SCALING){ GRID[(i/10)-1] = new Line(new Posn(i, 0), new Posn(i, SCALING), "App"); }
    else { GRID[(i/10)-1] = new Line(new Posn(0, i - SCALING + 1), new Posn(SCALING, i - SCALING + 1), "App"); }
}

//Options
//-------

var DEVMODE = false,      //Force grid and level 0 (Dev level)
    includeGrid = false,  //Defaults false can be set to true by user
    snapDraw = false;     //Drawing snaps to nearest whole numbers (good for dev mode)



//Variable Declaration
//-------------------

var currLevelNum = 1,                                         //Defaults level 1
    currLevel = Levels[1],                                    //Defaults level 1
    currSoln = new UserSolution(currLevel.graph, 0, 0, []),   //Defaults level 1

    inDrawMode  = true,                                       //Defaults Draw  Mode enabled
    inEraseMode = !inDrawMode;                                //Defaults Erase Mode disabled


//Dev functions
//--------------

//toogleDevMode: Void
function toogleDevMode() {
    "use strict";
    DEVMODE = !DEVMODE;
}

//toogleSnap: Void
function toogleSnap() {
    "use strict";
    snapDraw = !snapDraw;
}

//toogleGrid: Void
function toogleGrid() {
    "use strict";
    includeGrid = !includeGrid;
}


//Helper Funcions
//----------------

//map: (X->Y) [X] -> [Y]
function map(f, lst) {
    "use strict";
    var newlst = new Array();
    for (var i = 0;i < lst.length; i++){
        newlst[i] = f(lst[i]);
    }
    return newlst;
}

//printLine:Line -> String
function printLine(line) {
    "use strict";
    return "new Line(new Posn(" + line.p1.x + ", " + line.p1.y +"), new Posn(" + line.p2.x + ", " + line.p2.y + "), \"App\")";
}

//printGraph: String
function printGraph() {
    "ues strict";
    var graphStr = "";
    for(var i = 0; i < currSoln.solution.length; i += 1) {
        if (i === (currSoln.solution.length - 1)) { graphStr += printLine(currSoln.solution[i]); }
        else { graphStr += (printLine(currSoln.solution[i]) + ","); }
    }
    return ("[" + graphStr + "]");
}

//scalePointscalePoint: Number -> Number -> Number -> Number -> Posn
function scalePoint(point_x, point_y, scaling, canvaslength){
    "use strict";
    var newPosn = new Posn((point_x - XOFFSET) * (scaling / canvaslength), ( point_y - YOFFSET) * (scaling / canvaslength));
    if ((snapDraw || DEVMODE) && inDrawMode) { newPosn = new Posn(Math.round(newPosn.x / 10) * 10, Math.round(newPosn.y / 10) * 10); }
    return newPosn;
}

//getSlope: Line -> Number
function getSlope(line) {
    "use strict";
    return ((line.p2.y - line.p1.y) / (line.p2.x - line.p1.x)).toFixed(4);
}

//isScalarMults: Line -> Line -> Bool
function isScalarMults(line1, line2) {
    "use strict";
    var slope1 = getSlope(line1),
        slope2 = getSlope(line2),
        yInt1  = line1.p1.y - (slope1 * line1.p1.x),
        yInt2  = line2.p1.y - (slope2 * line2.p1.x);
    return (slope1 == slope2 && yInt1 == yInt2) || ((slope1 === Infinity && slope2 === Infinity) && (line1.p1.x === line2.p1.x));
}

//lowestX: Line -> Line -> Posn
function lowestX(line1, line2) {
    "use strict";
    var newPosn = line1.p1;
    if (line1.p2.x < newPosn.x) { newPosn = line1.p2; }
    if (line2.p1.x < newPosn.x) { newPosn = line2.p1; }
    if (line2.p2.x < newPosn.x) { newPosn = line2.p2; }
    return new Posn(newPosn.x, newPosn.y);
}

//highestX: Line -> Line -> Posn
function highestX(line1, line2) {
    "use strict";
    var newPosn = line1.p1;
    if (line1.p2.x > newPosn.x) { newPosn = line1.p2; }
    if (line2.p1.x > newPosn.x) { newPosn = line2.p1; }
    if (line2.p2.x > newPosn.x) { newPosn = line2.p2; }
    return new Posn(newPosn.x, newPosn.y);
}

//lowestY: Line -> Line -> Posn
function lowestY(line1, line2) {
    "use strict";
    var newPosn = line1.p1;
    if (line1.p2.y < newPosn.y) { newPosn = line1.p2; }
    if (line2.p1.y < newPosn.y) { newPosn = line2.p1; }
    if (line2.p2.y < newPosn.y) { newPosn = line2.p2; }
    return new Posn(newPosn.x, newPosn.y);
}

//highestY: Line -> Line -> Posn
function highestY(line1, line2) {
    "use strict";
    var newPosn = line1.p1;
    if (line1.p2.y > newPosn.y) { newPosn = line1.p2; }
    if (line2.p1.y > newPosn.y) { newPosn = line2.p1; }
    if (line2.p2.y > newPosn.y) { newPosn = line2.p2; }
    return new Posn(newPosn.x, newPosn.y);
}

//counterClock: Posn -> Posn -> Posn -> Bool
function counterClock(point1, point2, point3) {
    "use strict";
    return (point3.y - point1.y) * (point2.x - point1.x) > (point2.y - point1.y) * (point3.x - point1.x);
}

//interset: Line -> Line -> Bool
function interset(line1, line2) {
    "use strict";
    return ((counterClock(line1.p1, line2.p1, line2.p2) != counterClock(line1.p2, line2.p1, line2.p2)) && 
            (counterClock(line1.p1, line1.p2, line2.p1) != counterClock(line1.p1, line1.p2, line2.p2))) ||
            (getSlope(line1) === Infinity && getSlope(line2) === Infinity && 
            (Math.max(line1.p1.y, line1.p2.y) >= Math.min(line2.p1.y, line2.p2.y))) ||
            (pointEqual(line1.p1, line2.p1)) || (pointEqual(line1.p1, line2.p2)) || 
            (pointEqual(line1.p2, line2.p1)) || (pointEqual(line1.p2, line2.p2));
}

//lineLength: Line -> Number
function lineLength(line) {
    "use strict";
    return Math.sqrt(Math.pow(line.p2.x - line.p1.x, 2) + Math.pow(line.p2.y - line.p1.y, 2));
}

//midPoint: Line -> Posn
function midPoint(line) {
    "use strict";
    return new Posn((line.p1.x + line.p2.x) / 2, (line.p1.y + line.p2.y) / 2);
}

//lineToPointDistance: Line -> Posn -> Number
function lineToPointDistance(line, point) {
    "use strict";
    var midpoint = midPoint(line);
    return Math.sqrt(Math.pow(point.x - midpoint.x, 2) + Math.pow(point.y - midpoint.y, 2));
}

//swap: Line -> Line
function swap(line) {
    "use strict";
    return new Line(new Posn(line.p2.x, line.p2.y), new Posn(line.p1.x, line.p1.y), line.owner);
}

//arrangePoints: Line -> Line
function arrangePoints(line) {
    "use strict";
    if (line.p1.x < line.p2.x) { return line; }
    else if (line.p1.x > line.p2.x) { return swap(line); }
    else if (line.p1.y < line.p2.y) { return line; }
    else if (line.p1.y > line.p2.y) { return swap(line); }
    return line;
}

//arrangeMoves: [Move] -> Void
function arrangeMoves(ms) {
    "use strict";
    for(var i = 0; i < ms.length; i += 1) {
        if ((ms[i])[0] === "draw" || (ms[i])[0] === "erase") { (ms[i])[1] = arrangePoints((ms[i])[1]); }
        else if ((ms[i])[0] === "drawSpecial") { 
            (ms[i])[1] = arrangePoints((ms[i])[1]);
            (ms[i])[2] = arrangePoints((ms[i])[2]);
        }
    }
}

//makeNew: Line -> Line
function makeNew(line) {
    "use strict";
    return new Line(new Posn(line.p1.x, line.p1.y), new Posn(line.p2.x, line.p2.y), line.owner);
}

//lineLT: Line Line -> Number
function lineLT(line1, line2) {
    "use strict";
    if      (Math.round(line1.p1.x) < Math.round(line2.p1.x)) { return  1; }
    else if (Math.round(line1.p1.x) > Math.round(line2.p1.x)) { return -1; }
    else if (Math.round(line1.p1.y) < Math.round(line2.p1.y)) { return  1; }
    else if (Math.round(line1.p1.y) > Math.round(line2.p1.y)) { return -1; }
    else if (Math.round(line1.p2.x) < Math.round(line2.p2.x)) { return  1; }
    else if (Math.round(line1.p2.x) > Math.round(line2.p2.x)) { return -1; }
    else if (Math.round(line1.p2.y) < Math.round(line2.p2.y)) { return  1; }
    else if (Math.round(line1.p2.y) > Math.round(line2.p2.y)) { return -1; }
    else                                                      { return  0; }
}

//pointEqual: Line Line -> Bool
function pointEqual(point1, point2) {
    "use strict";
    return (((point1.x - 15) <= point2.x) && (point2.x <= (point1.x + 15)) && 
            ((point1.y - 15) <= point2.y) && (point2.y <= (point1.y + 15)));
}

//lineEqual: Line Line -> Bool
function lineEqual(line1, line2) {
    "use strict";
    return (((pointEqual(line1.p1, line2.p1)) && (pointEqual(line1.p2, line2.p2))) ||
            ((pointEqual(line1.p1, line2.p2)) && (pointEqual(line1.p2, line2.p1))));
}

//graphEqual: Graph Graph -> Bool
function graphEqual(graph1, graph2) {
    "use strict";
    graph1 = map(arrangePoints, graph1);
    graph2 = map(arrangePoints, graph2);
    graph1.sort(lineLT);
    graph2.sort(lineLT);
    if (graph1.length !== graph2.length) { return false; }
    for(var i = 0; i < graph1.length; i += 1) {
        if (!(lineEqual(graph1[i], graph2[i]))) { return false; }
    }
    return true;
}

//solutionEqual: Level UserSolution -> Bool
function solutionEqual(level, usersolution) {
    "use strict";
    for(var i = 0; i < level.solution.length; i+= 1){
        if (graphEqual(level.solution[i], usersolution.solution)) { return true; }
    }
    return false;
}
