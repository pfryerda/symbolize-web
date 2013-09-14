//This module defined functions for buttons and events
//This module requires canvas.js
//written by: Luke Brown


//Variable Declaration
//-------------------

var currLevelNum = 1,                                                             //Defaults level 1
    currLevel = Levels[currLevelNum - 1],                                         //Defaults level 1
    currSoln = new UserSolution("", new Solution(0, false, currLevel.graph), ""), //Defaults level 1

    inDrawMode = true,                                                            //Defaults Draw  Mode enabled
    inEraseMode = !inDrawMode;                                                    //Defaults Erase Mode disabled


//Event Functions
//----------------

//loadLevel: Number -> Void
function loadLevel(n) {
    "use strict";
    currLevel = getLevel(n - 1);
    currSoln = new UserSolution("", new Solution(0, false, getGraph(currLevel)), "");
    console.log("loaded level ", n);
}

//addLine: Posn Posn -> Void
function addLine(point1, point2) {
    "use strict";
    var newSoln = currSoln,
        l = new Line(point1, point2);

    newSoln.solution.sGraph.push(l);
    newSoln.back = currSoln;
    currSoln = newSoln;
    drawSolution(currSoln );
    console.log("added line to solution");
}

//removeLine: Posn -> Void
function removeLine(point) {
    "use strict";
    var newSoln = currSoln,
        graph = newSoln.solution.sGraph,
        index = getErasedIndex(point, graph);

    if (index > -1) {
        newSoln.solution.sGraph = newSoln.solution.sGraph.splice(index, 1);
        newSoln.back = currSoln;
        currSoln = newSoln;
        drawSolution(currSoln);
    }
    console.log("removed line from solution");
}

//undo: Void
function undo() {
    "use strict";
    var newSoln = currSoln.back;
    if (newSoln !== "") {
        newSoln.forward = currSoln;
        currSoln = newSoln;
        drawSolution(currSoln);
    }
    console.log("unoded");
}

//redo: Void
function redo() {
    "use strict";
    var newSoln = currSoln.forward;
     if (newSoln !== "") {
        currSoln = currSoln.forward;
        drawSolution(currSoln);
    }
    console.log("redoed");
}

//activateDrawMode: Void
function activateDrawMode() {
    "use strict";
    inDrawMode = true;
    inEraseMode = !inDrawMode;
    console.log("activated DrawMode");
}

//activateEraseMode: Void
function activateEraseMode() {
    "use strict";
    inEraseMode = true;
    inDrawMode = !inEraseMode;
    console.log("activated EraseMode");
}

//rotateGraph: Void
function rotateGraph() {
    "use strict";
    var newSoln = currSoln,
        rotation = newSoln.solution.rotation;

    newSoln.solution.rotation = (rotation + 90) % 360;
    newSoln.back = currSoln;
    currSoln = newSoln;
    drawSolution(currSoln);
    console.log("rotated graph 90 degree");
}

//flipGraph: Void
function flipGraph() {
    "use strict";
    var newSoln = currSoln,
        flip = newSoln.solution.isFliped,
        rotation = newSoln.solution.rotation;

    newSoln.solution.isFliped = !flip;
    newSoln.solution.rotation = (rotation + 180) % 360;
    newSoln.back = currSoln;
    currSoln = newSoln;
    drawSolution(currSoln);
    console.log("reflected graph");
}

//showHint: Void
function showHint() {
    "use strict";
    // show hint with getHint1 and getHint2
    console.log("hint showed")
}

//resetGraph: Void
function resetGraph() {
    "use strict";
    var newSoln = new UserSolution(currSoln, new Solution(0, false, currLevel.graph), "");
    currSoln = newSoln;
    console.log("rested graph")
}

//checkSolution: Void
function checkSolution() {
    "use strict";
    if (solutionEqual(currLevel.solution, currSoln)){
        //do something special
        currLevel += 1;
        loadLevel(currLevel);
    } else {
        //do something special
    }
    console.log("checked solution");
}
