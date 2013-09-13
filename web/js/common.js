//A module used to store commonly used functions
//This module requires puzzles.js
//Written by: Luke Brown


//Getter functions
//----------------

//getLevel: Number -> Level
function getLevel(n) {
    "use strict";
    return Levels[n];
}

//getGraph: Level -> Graph
function getGraph(l) {
    "use strict";
    return l.graph;
}

//getDrawRestriction: Level -> Number[0,∞)
function getDrawRestriction(l) {
    "use strict";
    return l.restriction.draw;
}

//getEraseRestriction: Level -> Number[0,∞)
function getEraseRestriction(l) {
    "use strict";
    return l.restriction.erase;
}

//getHint1: Level -> String
function getHint1(l) {
    "use strict";
    return l.hint1;
}

//getHint2: Level -> String
function getHint1(l) {
    "use strict";
    return l.hint2;
}

//getSolutionFlip: Level -> Bool
function getSolutionFlip(l) {
    "use strict";
    return l.solution.isFliped;
}

//getSolutionRotation: Level -> Number[%90==0]
function getSolutionRotation(l) {
    "use strict";
    return l.solution.roation;
}

//getSolutionGraph: Level -> Graph
function getSolutionGraph(l) {
    "use strict";
    return l.solution.sGraph;
}


//Functions for UserSolution
//--------------------------

//getUserSoultion: UserSolution -> Solution
function getUserSoultion(u) {
   "use strict";
   return u.solution;
}

//undo: UserSolution -> UserSolution
function undo(u) {
    "use strict";
    var newSoln = u.back;
    newSoln.forward = u;
    return newSoln;
}

//redo: UserSolution -> UserSolution
function redo(u) {
    "use strict";
    return u.forward;
}


//Functions used to check for the corect solution
//-----------------------------------------------

//midPoint: Line -> Posn
function midPoint(l) {
    "use strict";
    return new Posn((l.p1.x + l.p2.x) / 2, (l.p1.y + l.p2.y) / 2);
}

//distance: Line -> Number
function distanceFromOrigin(l) {
    "use strict";
    var mP = midPoint(l);
    return Math.sqrt(Math.pow(mP.x, 2) + Math.pow(mP.y, 2));
}

//lineLT: Line Line -> Bool
function lineLT(l1, l2) {
    "use strict";
    return distanceFromOrigin(l1) <= distanceFromOrigin(l2);
}

//graphEqual: Graph Graph -> Bool
function graphEqual(g1, g2) {
    "use strict";
    return g1.sort(lineLT) === g2.sort(lineLT);
}

//solutionCheck: Solution UserSolution -> Bool
function solutionCheck(s1, u) {
    "use strict";
    var s2 = u.solution;
    return ((s1.roation % 360) === (s2.roation % 360) && (s1.isFliped) === (s2.isFliped)
        && graphEqual(s1.sGraph, s2.sGraph));
}


//Graphing Functions
//-------------------


//clearCanvas: Void
function clearCanvas() {
    "use strict";
    gameCanvas.width = gameCanvas.width;
}

//flipGraph: Void
function flipGraph() {
    "use strict";
    ctx.translate(0, scaledWidth);
    ctx.scale(1, -1);
}

//rotateGraph: Number[%90==0] -> Void
function rotateGraph(angle) {
    "use strict";
    var a = angle % 360;
    if (a === 0) { ctx.translate(0, 0); }
    else if (a === 90) { ctx.translate(scaledWidth, 0); }
    else if (a === 180) { ctx.translate(scaledWidth, scaledWidth); }
    else if (a === 270) { ctx.translate(0, scaledWidth); }
    ctx.rotate(a * Math.PI / 180);
}

//drawLine: Line -> Void
function drawLine(l) {
    "use strict";
    ctx.moveTo(l.p1.x + (0.5 / scaledWidth), l.p2.y + (0.5 / scaledWidth));
    ctx.lineTo(l.p2.x + (0.5 / scaledWidth), l.p2.y + (0.5 / scaledWidth));
}

//drawGraph: Graph -> Void
function drawGraph(g) {
   "use strict";
   for(var i = 0; i < g.length; i++) {drawLine(g[i]); }
}

//drawSolution: UserSolution -> Void
function drawSolution(u) {
    "use strict";

    var g, r, f;
    g = u.solution.sGraph;                                   //Graph
    r = u.solution.roation;                                  //Rotation
    f = u.solution.isFliped;                                 //Boolean stating if canvas is to be flipped

    clearCanvas();                                           //Clears the canvas
    ctx.save();                                              //Saves current coords
    ctx.scale(gameCanvas.width / scaledWidth,  
        gameCanvas.height / scaledWidth);                    //Scales the graph to have a max width and hiehgt of scaledWidth

    if (f) { flipGraph(); }                                  //Flips vertically if f is true
    rotateGraph(r);                                          //Sets the proper rotation
    drawGraph(g)                                             //Sets the lines to be drawn

    ctx.stroke();                                            //Draws the set lines
    ctx.restore();                                           //Resets the coords for the next draw
}


//Loading Level Function
//----------------------


//loadLevel: Number -> Void
function loadLevel(n) {
   "use strict";
   currLevel = getLevel(n - 1);
   currSoln = UserSolution("", Solution(0, false, getGraph(currLevel)), "");
}

/*
Example Canvas:
---------------

<!DOCTYPE html>
<html>
<body>

<

<script>

var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

ctx.save();

ctx.translate(c.width, 0);
ctx.rotate(Math.PI / 2);


ctx.moveTo(30,70);
ctx.lineTo(50,50);

ctx.moveTo(50,50);
ctx.lineTo(30,30);


ctx.stroke();
ctx.restore();


</script>

</body>
</html>
*/

