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


//Event Functions
//----------------

//loadLevel: Void
function loadLevel(c, ctx) {
    "use strict";
    currLevel = Levels[currLevelNum - 1];
    currSoln = new UserSolution([], new Solution(0, false, currLevel.graph), 0, 0);
    console.log("loaded level", currLevelNum);
    showHint();
    drawSolution(currSoln, c, ctx)
}

//addLine: Posn Posn -> Void
function addLine(point1, point2, c, ctx) {
    "use strict";
    if (currSoln.linesDrawn < (currLevel.restriction.draw)){
        console.log("adding line to solution");
        var l = new Line(point1, point2);

        currSoln.solution.sGraph.unshift(l);
        currSoln.linesDrawn += 1;
        currSoln.moves.unshift(l);
        drawSolution(currSoln, c, ctx)
        console.log("added line to solution");
    } else {
        //Add error message
    }
}

//removeLine: Posn -> Void
function removeLine(point, c, ctx) {
    "use strict";
    if (currSoln.linesErased < (currLevel.restriction.erase)) {
        var index = getErasedIndex(point, currSoln.solution.sGraph);

        if (index > -1) {
            console.log("removing line from solution");
            currSoln.solution.sGraph = currSoln.solution.sGraph.splice(index, 1);
            currSoln.linesErased += 1;
            //currSoln.moves.unshift(); Work in progress
            drawSolution(currSoln, c, ctx)
            console.log("removed line from solution");
        }
    } else {
        //Add error message
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
function rotateGraph(c, ctx) {
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
    drawSolution(currSoln, c, ctx)
    console.log("rotated graph 90 degree");
}

//flipGraph: Void
function flipGraph(c, ctx) {
    "use strict";
    console.log("reflecting graph");

    currSoln.solution.isFliped = !(currSoln.solution.isFliped);
    currSoln.solution.rotation = ((currSoln.solution.rotation) + 180) % 360;
    currSoln.moves.unshift(180);
    drawSolution(currSoln, c, ctx)
    console.log("reflected graph");
}

//undo: Void
function undo(c, ctx) {
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
        drawSolution(currSoln, c, ctx)
        currSoln.moves.splice(0, 1);
        console.log("undoed");
    }  
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

//showHint: Void
function showHint() {
    "use strict"; 
    console.log("showing hints")
    var hints = "1) " + (currLevel.hint1) + "\n2) " + (currLevel.hint2),
        restrictions = ("\nlines allowed drawn: " + (currLevel.restriction.draw).toString() + 
            "\nlines allowed erased: " + (currLevel.restriction.erase).toString());
    App.dialog({
        title        : "Level " + currLevelNum.toString() + " Hints",
        text         : hints + restrictions,
        cancelButton : "OK"});
}

//resetGraph: Void
function resetGraph(c, ctx) {
    "use strict";
    App.dialog({
        title        : "Reset?",
        text         : "This will trash your progress on this puzzle.  Are you sure you wish to do this?",
        resetButton   : "Reset",
        cancelButton : "Cancel"
    }, function (result) { //result is a string

    if (result ===  "reset") {
        currSoln = new UserSolution([], new Solution(0, false, currLevel.graph), 0, 0);
        drawSolution(currSoln, c, ctx)
        console.log("reseted graph")
    } else {
        console.log("reseted graph canceled")
    }
    });
}
