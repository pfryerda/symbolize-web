//This module is used to define the functions used for the canvas
//Written by: Luke Brown


//Editing Functions
//-----------------
//rotateLine: Line -> Line
function rotateLine(l) {
    "use strict";
    //return new Line(new Posn((SCALING - l.p1.y), l.p1.x), new Posn((SCALING - l.p2.y), l.p2.x), l.owner);
    return(new Line(rotatePosn(l.p1, -Math.PI/600), rotatePosn(l.p2, -Math.PI/600)));
}

//rotatePosn: Posn Number -> Posn
function rotatePosn(p, a) {
    "use strict";
    var newPosn = new Posn(p.x - SCALING/2, SCALING/2 - p.y);
    if (newPosn.x != 0 || newPosn.y != 0) {
        var r = Math.sqrt(Math.pow(newPosn.x, 2) + Math.pow(newPosn.y, 2));
        var theta;
        if (newPosn.x == 0) {
            if (newPosn.y > 0) {
                theta = Math.PI/2;
            } else {
                theta = 3*Math.PI/2;
            }
        } else {
            theta = Math.atan(newPosn.y/newPosn.x);
            if (newPosn.x < 0) theta += Math.PI;
        }
        newPosn.x = r*Math.cos(theta+a) + SCALING/2;
        newPosn.y = SCALING/2 - r*Math.sin(theta+a);
    } else {
        newPosn.x = newPosn.x + SCALING/2;
        newPosn.y = SCALING/2 - newPosn.y;
    }
    return newPosn;
}

//unrotateLine: Line -> Line
function unrotateLine(l) {
    "use strict";
    return new Line(new Posn(l.p1.y, (SCALING - l.p1.x)), new Posn(l.p2.y, (SCALING - l.p2.x)), l.owner);
}

//flipLine: Line -> Line
function flipLine(l, n) {
    "use strict";
    //return new Line(new Posn((SCALING - l.p1.x), l.p1.y), new Posn((SCALING - l.p2.x), l.p2.y), l.owner);
    return new Line(flipPosn(l.p1, -1), flipPosn(l.p2, -1));
}

//flipPosn: Posn Number -> Number
function flipPosn(p, n) {
    "use strict";
    var newPosn = new Posn(p.x - SCALING/2, p.y);
    newPosn.x = n*newPosn.x + SCALING/2;
    return newPosn;
};


//Graphing Functions
//------------------

//clearCanvas: Canvas -> Void
function clearCanvas(can) {
    "use strict";
    console.log("clearing canvas");
    can.width = can.width;
}

//drawLine: Line -> Bool -> Context -> Void
function drawLine(line, isGridLine, ctx) {
    "use strict";
    if (isGridLine) { console.log("drawing grid line"); }
    else { console.log("drawing line"); }
    ctx.beginPath();
    ctx.moveTo(line.p1.x + (0.5 / SCALING), line.p1.y + (0.5 / SCALING));
    ctx.lineTo(line.p2.x + (0.5 / SCALING), line.p2.y + (0.5 / SCALING));
    if (isGridLine) {
        ctx.lineWidth = 1/3; 
        ctx.strokeStyle = '#A0A0A0';
        ctx.lineCap = 'butt'
    }
    else { 
        ctx.lineWidth = 4; 
        ctx.strokeStyle = '#000000'
        ctx.lineCap = 'round';  
    }
    ctx.stroke();
    ctx.closePath();
}

//drawGraph: Graph -> Bool -> Context -> Void
function drawGraph(graph, isGrid, ctx) {
    "use strict";
    if (isGrid) { console.log("drawing grid"); }
    else { console.log("drawing graph"); }
    for (var i = 0; i < graph.length; i += 1) { 
        drawLine(graph[i], isGrid, ctx); 
    }
}

//drawSolution: UserSolution -> Canvas -> Context ->  Void
function drawSolution(userSoln, can, ctx) {
    "use strict";
    console.log("starting canvas drawing");

    clearCanvas(can);                                           //Clears the canvas
    ctx.save();                                                 //Saves current coords
    ctx.scale(can.width / SCALING,                              //Scales the graph to have a max width and height of SCALING
        can.height / SCALING);                

    if (includeGrid || DEVMODE) { drawGraph(GRID, true, ctx); } //Draws the grid
    drawGraph(BORDER, false, ctx);                              //Draws border
    drawGraph(userSoln.solution, false, ctx);                   //Draws the graph

    ctx.restore();                                              //Resets the coords for the next draw
    console.log("finished canvas drawing");
}
