//This module is used to define the functions used for the canvas
//This module requires puzzles.js
//Written by: Luke Brown


//scaling: Number
//Max number for the width and height of the graph
var scaling = 50; //Note this number still need to be decided!  

//clearCanvas: Canvas -> Void
function clearCanvas(can) {
    "use strict";
    console.log("clearing canvas");
    can.width = can.width;
}

//flipCanvas: Context -> Void
function flipCanvas(ctx) {
    "use strict";
    console.log("setting canvas flip")
    ctx.translate(0, scaling);
    ctx.scale(1, -1);
}

//rotateCanvas: Number[%90==0] -> Context -> Void
function rotateCanvas(angle, ctx) {
    "use strict";
    console.log("setting canvas rotation");
    var a = angle % 360;
    switch (a) {
    case 0:
        ctx.translate(0, 0); //Should never happen
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
    
}

//drawLine: Line -> Context -> Void
function drawLine(line, ctx) {
    "use strict";
    console.log("drawing line");
    ctx.moveTo(line.p1.x + (0.5 / scaling), line.p1.y + (0.5 / scaling));
    ctx.lineTo(line.p2.x + (0.5 / scaling), line.p2.y + (0.5 / scaling));
    ctx.lineCap = 'round';
    ctx.lineWidth = 2;
    ctx.stroke();
}

//drawGraph: Graph -> Context -> Void
function drawGraph(graph, ctx) {
    "use strict";
    console.log("drawing graph");
    for (var i = 0; i < graph.length; i += 1) { 
        drawLine(graph[i], ctx); 
    }
}

//drawSolution: UserSolution -> Canvas -> Context ->  Void
function drawSolution(userSoln, can, ctx) {
    "use strict";
    console.log("starting canvas drawing");

    var graph = userSoln.solution.sGraph,            //Graph
        rotation = userSoln.solution.rotation,       //Rotation
        flip = userSoln.solution.isFliped;           //Boolean stating if canvas is to be flipped

    clearCanvas(can);                                //Clears the canvas
    ctx.save();                                      //Saves current coords
    ctx.scale(can.width / scaling,                   //Scales the graph to have a max width and hiehgt of scaling
        can.height / scaling);                

    if (flip) { flipCanvas(ctx); }                   //Flips vertically if f is true
    if (rotation !== 0) rotateCanvas(rotation, ctx); //Sets the proper rotation
    drawGraph(graph, ctx);                           //Draws the graph

    ctx.restore();                                   //Resets the coords for the next draw
    console.log("finished canvas drawing");
}