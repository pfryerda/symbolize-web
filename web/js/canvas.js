//This module is used to define the variables and functions used for the canvas
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
    console.log("cleared canvas");
}

//flipCanvas: Void
function flipCanvas() {
    "use strict";
    ctx.translate(0, scaling);
    ctx.scale(1, -1);
    console.log("fliped canvas")
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
        break;

    }
    ctx.rotate(a * Math.PI / 180);
    console.log("rotated canvas");
}

//drawLine: Line -> Void
function drawLine(line) {
    "use strict";
    ctx.beginPath();  // Not sure if this is neccecary
    ctx.moveTo(line.p1.x + (0.5 / scaling), line.p2.y + (0.5 / scaling));
    ctx.lineTo(line.p2.x + (0.5 / scaling), line.p2.y + (0.5 / scaling));
    ctx.stroke();
    console.log("drew line");
}

//drawGraph: Graph -> Void
function drawGraph(graph) {
    "use strict";
    for (var i = 0; i < graph.length; i += 1) { 
        drawLine(graph[i]); 
    }
    console.log("drew graph");
}

//drawSolution: UserSolution -> Void
function drawSolution(userSoln) {
    "use strict";

    var graph = userSoln.solution.sGraph,       //Graph
        rotation = userSoln.solution.roation,   //Rotation
        flip = userSoln.solution.isFliped;      //Boolean stating if canvas is to be flipped

    clearCanvas();                              //Clears the canvas
    ctx.save();                                 //Saves current coords
    ctx.scale(gameCanvas.width / scaling,
        gameCanvas.height / scaling);           //Scales the graph to have a max width and hiehgt of scaling

    if (flip) { flipCanvas(); }                 //Flips vertically if f is true
    if (rotation !== 0) rotateCanvas(rotation); //Sets the proper rotation
    drawGraph(graph);                           //Draws the graph

    ctx.restore();                              //Resets the coords for the next draw
    console.log("finished drawing solution");
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