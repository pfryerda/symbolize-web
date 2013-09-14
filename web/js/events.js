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


//undo: Void
function undo() {
    "use strict";
    var newSoln = currSoln.back;
    if (newSoln !== "") {
        newSoln.forward = currSoln;
        currSoln = newSoln;
        drawSolution(currSoln);
    }
}

//redo: Void
function redo() {
    "use strict";
    var newSoln = currSoln.forward;
     if (newSoln !== "") {
        currSoln = currSoln.forward;
        drawSolution(currSoln);
    }
}

//activateDrawMode: Void
function activateDrawMode() {
    "use strict";
    inDrawMode = true;
    inEraseMode = !inDrawMode;
}

//activateEraseMode: Void
function activateEraseMode() {
    "use strict";
    inEraseMode = true;
    inDrawMode = !inEraseMode;
}

//rotateGraph: Void
function rotateGraph() {
    "use strict";
    var newSoln = currSoln,
        r = newSoln.solution.roation;

    newSoln.solution.roation = (r + 90) % 360;
    newSoln.back = currSoln;
    currSoln = newSoln;
    drawSolution(currSoln);
}

//flipGraph: Void
function flipGraph() {
    "use strict";
    var newSoln = currSoln,
        f = newSoln.solution.isFliped;

    newSoln.solution.isFliped = !f;
    newSoln.back = currSoln;
    currSoln = newSoln;
    drawSolution(currSoln);
}

//addLine: Posn Posn -> Void
function addLine(pon1, pon2) {
    "use strict";
    var newSoln = currSoln,
        l = new Line(pon1, pon2);

    newSoln.solution.sGraph.push(l);
    newSoln.back = currSoln;
    currSoln = newSoln;
    drawLine(l);
}

//removeLine: Posn -> Void
function removeLine(p) {
    "use strict";
    var newSoln = currSoln,
        g = newSoln.solution.sGraph,
        index = getErasedIndex(p, g);
        
    if (index > -1) {
        newSoln.solution.sGraph = newSoln.solution.sGraph.splice(index, 1);
        newSoln.back = currSoln;
        currSoln = newSoln;
        drawSolution(currSoln);
    }
}

//loadLevel: Number -> Void
function loadLevel(n) {
    "use strict";
    currLevel = getLevel(n - 1);
    currSoln = new UserSolution("", new Solution(0, false, getGraph(currLevel)), "");
}