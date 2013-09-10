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

//getPuzzle: Level number -> Puzzle
function getPuzzle(l, n) {
    "use strict";
    return l.puzzles[n];
}


//getHint1: Puzzle -> String
function getHint1(p) {
    "use strict";
    return p.hint1;
}

//getHint2: Puzzle -> String
function getHint1(p) {
    "use strict";
    return p.hint2;
}

//getSolutionFlip: Puzzle -> Bool
function getSolutionFlip(p) {
    "use strict";
    return p.solution.isFlipped;
}

//getSolutionRotation: Puzzle -> Number[0,360)
function getSolutionRotation(p) {
    "use strict";
    return p.solution.roation;
}

//getSolutionGraph: Puzzle -> Graph
function getSolutionGraph(p) {
    "use strict";
    return p.solution.sGraph;
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

//solutionCheck: Solution Solution -> Bool
function solutionCheck(s1, s2) {
    "use strict";
    return (s1.roation % 360) === (s2.roation % 360) && graphEqual(s1.sGraph, s2.sGraph);
}


//Graphing Functions
//-------------------

var c = document.getElementById("gameCanvas");   //Canvas
var ctx = c.getContext("2d");                    //Context
var w = 20;                                      //Max number for the width of the graph
var h = 30;                                      //Max number for the height of the graph
//Note these two numbers still need to be decided!


//clearCanvas: Void
function clearCanvas() {
   "use strict";
   c.width=c.width;
}

//flipGraph: Void
function flipGraph() {
    "use strcit";
    ctx.translate(0, h);
    ctx.scale(1, -1);
} 

//rotateGraph: Number[0,360) -> Void
function rotateGraph(angle) {
    "use strict";
    var a = angle % 360
    if (a == 0){ ctx.translate(0, 0); }
    else if (a == 90) { ctx.translate(w, 0); }
    else if (a == 180) { ctx.translate(w, h); }
    else if (a == 270) { ctx.translate(0, h)}
    ctx.rotate(a * Math.PI / 180);
}

//drawLine: Line -> Void
function drawLine(l) {
    "use strict";
    ctx.moveTo(l.p1.x + (0.5 / w), l.p2.y + (0.5 / h));
    ctx.lineTo(l.p2.x + (0.5 / w), l.p2.y + (0.5 / h));
}

//drawGraph: Solution -> Void
function drawGraph(s) {
    "use strict";
    
    var g = s.sGraph;                                //Graph
    var r = s.roation;                               //Rotation
    var f = s.isFliped;                              //Boolean stating if canvas is to be flipped
  
    clearCanvas();                                   //Clears the canvas
    ctx.save();                                      //Saves current coords
    ctx.scale(c.width / w,  c.height / h)            //Scales the graph to have a max width of w and hieght of h
    if(f) { flipGraph(); }                           //Flips vertically if f is true
    rotateGraph(r);                                  //Sets the proper rotation

    for (var i=0;i<g.length;i++) { drawLine(g[i]); } //Sets the lines to be drawn

    ctx.stroke();                                    //Draws the set lines
    ctx.restore();                                   //Resets the coords for the next draw
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

