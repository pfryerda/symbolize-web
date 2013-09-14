//This module is used to define the variables and functions used for the canvas\
//This module requires common.js
//Written by: Luke Brown


//Variable Declaration
//-------------------


var gameCanvas = document.getElementById("gameCanvas"),         //Canvas
    ctx = gameCanvas.getContext("2d"),                          //Context
    scaling = 50; //Note this number still need to be decided!  //Max number for the width and height of the graph


//Graphing Function
//----------------- 


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
    switch (a) {
    case 0:
        ctx.translate(0, 0);
        break;
    case 90:
        ctx.translate(scaling, 0);
        break;
    case 180:
        ctx.translate(scaling, scaling);
        break;
    case 270:
        ctx.translate(0, scaling);
        break;
    default:
        throw new RangeError("rotateCanvas given a number other than 0, 90, 180, or 270")  //Should never happen
        breal;

    }
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
    var i;
    for (i = 0; i < g.length; i += 1) { drawLine(g[i]); }
}

//drawSolution: UserSolution -> Void
function drawSolution(u) {
    "use strict";

    var g = u.solution.sGraph,                   //Graph
        r = u.solution.roation,                  //Rotation
        f = u.solution.isFliped;                 //Boolean stating if canvas is to be flipped

    clearCanvas();                           //Clears the canvas
    ctx.save();                              //Saves current coords
    ctx.scale(gameCanvas.width / scaling,
        gameCanvas.height / scaling);        //Scales the graph to have a max width and hiehgt of scaling

    if (f) { flipCanvas(); }                 //Flips vertically if f is true
    rotateCanvas(r);                         //Sets the proper rotation
    drawGraph(g);                            //Draws the graph

    ctx.restore();                           //Resets the coords for the next draw
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