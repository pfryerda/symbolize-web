//This module defined functions for buttons and events
//This module requires canvas.js
//written by: Luke Brown


//Variable Declaration
//-------------------

var currLevelNum = 1,                                                               //Defaults level 1
    currLevel = Levels[currLevelNum - 1],                                           //Defaults level 1
    currSoln = new UserSolution([], new Solution(0, false, currLevel.graph), 0, 0), //Defaults level 1

    inDrawMode = true,                                                              //Defaults Draw  Mode enabled
    inEraseMode = !inDrawMode;                                                      //Defaults Erase Mode disabled


//Getter functions
//----------------

//getDrawRestriction: Number[0,∞)
function getDrawRestriction() {
    "use strict";
    return currLevel.restriction.draw;
}

//getEraseRestriction: Number[0,∞)
function getEraseRestriction() {
    "use strict";
    return currLevel.restriction.erase;
}

//getHint1: String
function getHint1() {
    "use strict";
    return currLevel.hint1;
}

//getHint2: String
function getHint2() {
    "use strict";
    return currLevel.hint2;
}


//Event Functions
//----------------

//loadLevel: Void
function loadLevel() {
    "use strict";
    currLevel = Levels[currLevelNum - 1];
    currSoln = new UserSolution([], new Solution(0, false, currLevel.graph), 0, 0);
    console.log("loaded level", currLevelNum);
    showHint();
}

//addLine: Posn Posn -> Void
function addLine(point1, point2) {
    "use strict";
    if (currSoln.linesDrawn < getDrawRestriction()){
        console.log("adding line to solution");
        var l = new Line(point1, point2);

        currSoln.solution.sGraph.unshift(l);
        currSoln.linesDrawn += 1;
        currSoln.moves.unshift(l);
        console.log("added line to solution");
    } else {
        //Add error message
    }
}

//removeLine: Posn -> Void
function removeLine(point) {
    "use strict";
    if (currSoln.linesErased < getEraseRestriction()){
        var index = getErasedIndex(point, currSoln.solution.sGraph);

        if (index > -1) {
            console.log("removing line from solution");
            currSoln.solution.sGraph = currSoln.solution.sGraph.splice(index, 1);
            currSoln.linesErased += 1;
            //currSoln.moves.unshift(); Work in progress
            console.log("removed line from solution");
        }
    } else {
        //Add error message
    }
}

//undo: Void
function undo() {
    "use strict"
    var oldMoves = currSoln.moves;
    if (oldMoves !== []) {
        switch (oldMoves[0]) {
        case 90: //Unrotate non flipped
            currSoln.solution.rotation = (currSoln.solution.rotation + 270) % 360;
            break;
        case 180: //Unflip
            currSoln.solution.rotation = (currSoln.solution.rotation + 180) % 360;
            currSoln.solution.isFliped = !(currSoln.solution.isFliped);
            break;
        case 270: //unrotate flipped
            currSoln.solution.rotation = (currSoln.solution.rotation + 90) % 360;
            break;

        //case (Line)
            //to do
        }
        currSoln.moves.splice(0, 1);
        console.log("undoed");
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

    if (currSoln.solution.isFliped) { 
        currSoln.solution.rotation = (currSoln.solution.rotation + 270) % 360; 
        currSoln.moves.unshift(270);
    }
    else { 
        currSoln.solution.rotation = (currSoln.solution.rotation + 90) % 360; 
        currSoln.moves.unshift(90);
    }
    console.log("rotated graph 90 degree");
}

//flipGraph: Void
function flipGraph() {
    "use strict";
    console.log("reflecting graph");

    currSoln.solution.isFliped = !(currSoln.solution.isFliped);
    currSoln.solution.rotation = ((currSoln.solution.rotation) + 180) % 360;
    currSoln.moves.unshift(180);
    console.log("reflected graph");
}

//showHint: Void
function showHint() {
    "use strict"; 
    console.log("showing hints")
    var hints = "1) " + getHint1() + "\n2) " + getHint2(),
        restrictions = "\nlines allowed drawn: " + (getDrawRestriction()).toString() + "\nlines allowed erased: " + (getEraseRestriction()).toString();
    App.dialog({
        title        : "Level " + currLevelNum.toString() + " Hints",
        text         : hints + restrictions,
        cancelButton : "OK"});
}

//resetGraph: Void
function resetGraph() {
    "use strict";
    currSoln = new UserSolution([], new Solution(0, false, currLevel.graph), 0, 0);
    console.log("reseted graph")
}

//checkSolution: Void
function checkSolution() {
    "use strict";
    console.log("checking solution");
    if (solutionEqual(currLevel.solution, currSoln)){
        App.dialog({
            title        : "Success!",
            text         : "Congratulations, you beat level " + currLevel + " press OK to continue.",
            cancelButton : "OK"});
        //Add end of game check
        currLevel += 1;
        loadLevel();
    } else {
        App.dialog({
            title : "Incorrect",
            text : "Your guess was wrong.",
            cancelButton : "OK"});
    }
}
