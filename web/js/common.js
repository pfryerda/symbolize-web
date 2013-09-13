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


//Functions for buttons and events
//--------------------------------


//undo: Void
function undo() {
    "use strict";
    var newSoln = currSoln.back;
    newSoln.forward = currSoln;
    currSoln = newSoln;
    drawSolution(currSoln);
}

//redo: Void
function redo() {
    "use strict";
    currSoln = currSoln.forward;
    drawSolution(currSoln);
}

//activateDrawMode: Void
function activateDrawMode() {
    "use strict";
    inDrawMode = true;
    inEraseMode = !isDrawMode;
}

//activateEraseMode: Void
function activateEraseMode() {
    "use strict";
    inEraseMode = true;
    inDrawMode = !isEraseMode;
    
}

//rotateGraph: Void
function rotateGraph() {
   "use strict";
   var newSoln, r; 
   newSoln = currSoln;
   r = newSoln.solution.roation;

   newSoln.solution.roation = (r + 90) % 360;
   newSoln.back = currSoln;
   currSoln = newSoln;
   drawSolution(currSoln);
}

//flipGraph: Void
function flipGraph() {
   "use strict";
   var newSoln, f;
   newSoln = currSoln;
   f = newSoln.solution.isFliped;

   newSoln.solution.isFliped = !f;
   newSoln.back = currSoln;
   currSoln = newSoln;
   drawSolution(currSoln);
}

//addLine: Posn Posn -> Void
function addLine(pon1, pon2) {
   "use strict";
   var newSoln, l; 
   newSoln = currSoln;
   l = new Line(pon1, pon2);

   newSoln.solution.sGraph.push(l);
   newSoln.back = currSoln;
   currSoln = newSoln;
   drawLine(l);
}

//removeLine: Posn -> Void
function removeLine(p) {
    "use strict";
    var newSoln, g, index; 
    index = getErasedIndex(p, g);
    if (index > -1) {
      newSoln = currSoln;
      g = newSoln.solution.sGraph;
     
      newSoln.solution.sGraph = newSoln.solution.sGraph.splice(index, 1)
      newSoln.back = currSoln;
      currSoln = newSoln;
      drawSolution(currSoln);
    }
}

//getErasedIndex: Posn Graph -> Number[0,∞)
function getErasedIndex(p, g) {
    "use strict";
    for(var i; i < g.length; i++) {
        if ((p === g[i].p1) || (p === g[i].p1)) { return i; }
    }
    return -1;
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

//flipCanvas: Void
function flipCanvas() {
    "use strict";
    ctx.translate(0, scaling);
    ctx.scale(1, -1);
}

//rotateCanvas: Number[%90==0] -> Void
function rotateCanvas(angle) {
    "use strict";
    var a = angle % 360;
    if (a === 0) { ctx.translate(0, 0); }
    else if (a === 90) { ctx.translate(scaling, 0); }
    else if (a === 180) { ctx.translate(scaling, scaling); }
    else if (a === 270) { ctx.translate(0, scaling); }
    ctx.rotate(a * Math.PI / 180);
}

//drawLine: Line -> Void
function drawLine(l) {
    "use strict";
    ctx.moveTo(l.p1.x + (0.5 / scaling), l.p2.y + (0.5 / scaling));
    ctx.lineTo(l.p2.x + (0.5 / scaling), l.p2.y + (0.5 / scaling));
    ctx.stroke();
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
    g = u.solution.sGraph;                   //Graph
    r = u.solution.roation;                  //Rotation
    f = u.solution.isFliped;                 //Boolean stating if canvas is to be flipped

    clearCanvas();                           //Clears the canvas
    ctx.save();                              //Saves current coords
    ctx.scale(gameCanvas.width / scaling,  
        gameCanvas.height / scaling);        //Scales the graph to have a max width and hiehgt of scaling

    if (f) { flipCanvas(); }                 //Flips vertically if f is true
    rotateCanvas(r);                         //Sets the proper rotation
    drawGraph(g)                             //Draws the graph

    ctx.restore();                           //Resets the coords for the next draw
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

