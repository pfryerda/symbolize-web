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
    currSoln = new UserSolution("", new Solution(0, false, currLevel.graph), "");
    console.log("loaded level", n);
    drawSolution(currSoln);
    showHint();
}

//addLine: Posn Posn -> Void
function addLine(point1, point2) {
    "use strict";
    if (currSoln.linesDrawn < getDrawRestriction(currLevel)){
        console.log("adding line to solution");
        var newSoln = currSoln,
            l = new Line(point1, point2);

        newSoln.solution.sGraph.push(l);
        newSoln.linesDrawn += 1;
        newSoln.back = currSoln;
        currSoln = newSoln;
        drawSolution(currSoln);
        console.log("added line to solution");
    } else {
        //Add error message
    }
}

//removeLine: Posn -> Void
function removeLine(point) {
    "use strict";
    if (currSoln.linesErased < getEraseRestriction(currLevel)){
        var newSoln = currSoln,
            graph = newSoln.solution.sGraph,
            index = getErasedIndex(point, graph);

        if (index > -1) {
            console.log("removing line from solution");
            newSoln.solution.sGraph = newSoln.solution.sGraph.splice(index, 1);
            newSoln.linesErased += 1;
            newSoln.back = currSoln;
            currSoln = newSoln;
            drawSolution(currSoln);
            console.log("removed line from solution");
        }
    } else {
        //Add error message
    }
}

//undo: Void
function undo() {
    "use strict";
    var newSoln = currSoln.back;
    if (newSoln !== "") {
        newSoln.forward = currSoln;
        currSoln = newSoln;
        drawSolution(currSoln);
        console.log("undoed");
    }  
}

//redo: Void
function redo() {
    "use strict";
    var newSoln = currSoln.forward;
     if (newSoln !== "") {
        currSoln = currSoln.forward;
        drawSolution(currSoln);
        console.log("redoed");
    }
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
    console.log("rotating graph 90 degree");
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
    console.log("reflecting graph");
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
    console.log("showing hints")
    App.dialog({
        title        : "Level " + currLevelNum.toString() + " Hints",
        text         : "1) " + getHint1(currLevel) + '\n' + "2) " + getHint2(currLevel),
        cancelButton : "OK"});
}

//resetGraph: Void
function resetGraph() {
    "use strict";
    var newSoln = new UserSolution(currSoln, new Solution(0, false, currLevel.graph), "");
    currSoln = newSoln;
    console.log("reseted graph")
}

//checkSolution: Void
function checkSolution() {
    "use strict";
    console.log("checking solution");
    if (solutionEqual(currLevel.solution, currSoln)){
        //do something special
        currLevel += 1;
        loadLevel(currLevel);
    } else {
        //do something special
    }
}
