//This module defined functions for buttons and events
//This module requires canvas.js
//written by: Luke Brown


//Variable Declaration
//-------------------

var currLevelNum = 1,                                                               //Defaults level 1
    currLevel = Levels[currLevelNum - 1],                                           //Defaults level 1
    currSoln = new UserSolution(currLevel.graph, 0, 0, []),                         //Defaults level 1

    inDrawMode = true,                                                              //Defaults Draw  Mode enabled
    inEraseMode = !inDrawMode;                                                      //Defaults Erase Mode disabled

//Event Functions
//----------------

//loadLevel: Void
function loadLevel(c, ctx) {
    "use strict";
    currLevel = Levels[currLevelNum - 1];
    currSoln = new UserSolution(currLevel.graph, 0, 0, []);
    console.log("loaded level", currLevelNum);
    showHint();
    drawSolution(currSoln, c, ctx)
}

//addLine: Line -> Void
function addLine(l, c, ctx) {
    "use strict";
    if (currSoln.linesDrawn < (currLevel.restriction.draw) && (l.p1.x !== l.p2.x || l.p1.y !== l.p2.y)) {
        console.log("adding line to solution");

        currSoln.solution.unshift(l);
        currSoln.linesDrawn += 1;
        currSoln.moves.unshift(["draw", l]);
        drawSolution(currSoln, c, ctx)
        console.log("added line to solution");
    } else {
        //throw error
    }
}

//removeLine: Posn -> Void
function removeLine(point, c, ctx) {
    "use strict";
    if (currSoln.linesErased < (currLevel.restriction.erase)) {
        var index = getErasedIndex(point, currSoln.solution);

        if (index > -1) {
            console.log("removing line from solution");
            currSoln.solution = currSoln.solution.splice(index, 1);
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

//rotateGraph Canvas -> Context -> Void
function rotateGraph(c, ctx) {
    "use strict";
    console.log("rotating graph 90 degree");

    currSoln.solution = map(rotateLine, currSoln.solution);
    currSoln.moves.unshift("rotate");

    drawSolution(currSoln, c, ctx)
    console.log("rotated graph 90 degree");

}

//flipGraph: Canvas -> Context -> Void
function flipGraph(c, ctx) {
    "use strict";
    console.log("reflecting graph");

    currSoln.solution = map(flipLine, currSoln.solution);
    currSoln.moves.unshift("flip");

    drawSolution(currSoln, c, ctx);
    console.log("reflected graph");

}

//undo: Canvas -> Context -> Void
function undo(c, ctx) {
    "use strict"
    var oldMoves = currSoln.moves,
        lastMove = oldMoves[0];
    if (oldMoves.length !== 0) {
        switch (lastMove) {
        case "rotate": //Unrotate non flipped
            currSoln.solution = map(unrotateLine, currSoln.solution);
            break;
        case "flip": //Unflip
            currSoln.solution = map(flipLine, currSoln.solution);
            break;
        default:
            if(lastMove[0] === "draw") {
                for(var i=0; (currSoln.solution)[i] !== lastMove[1]; i+= 1) {}
                currSoln.solution.splice(i, 1);
                currSoln.linesDrawn -= 1;

            } else if(lastMove[0] === "erase") {

            } else {
                //throw error
            }
        }
        drawSolution(currSoln, c, ctx)
        currSoln.moves.splice(0, 1);
        console.log("undoed");
    }

    else {
        var options = {
            text: "XKTSE",  // String
            duration: 10000 // Integer
        };

        var toast = new Toast(options);
    }
}

//checkSolution: Void
function checkSolution() {
    "use strict";
    console.log("checking solution");
    console.log(currLevel.solution);
    console.log(currSoln.solution);
    if (solutionEqual(currLevel, currSoln)){
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
    var hints        = "1) " + (currLevel.hint1) + "\n2)\n " + (currLevel.hint2),
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
        //currSoln = new UserSolution(currLevel.graph, 0, 0, []);
        while(currSoln.moves.length > 0) { undo(c, ctx); }
        drawSolution(currSoln, c, ctx);
        console.log("reseted graph");
    } else {
        console.log("reseted graph canceled");
    }
    });
}
