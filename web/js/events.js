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
    document.getElementById("gameTitle").innerHTML = "Level " + currLevelNum;
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
function removeLine(line, c, ctx) {
    "use strict";
    if (currSoln.linesErased < (currLevel.restriction.erase)) {
        var eraseLine = [-1, new Line(new Posn(0, 0), new Posn(100, 100))];
        for(var i = 0; i < currSoln.solution.length; i+= 1) {
            if (interset(currSoln.solution[i], line)) {
                if (lineEqual(currSoln.solution[i], line) || 
                    (lineToPointDistance(currSoln.solution[i], line.p1) < lineToPointDistance(eraseLine[1], line.p1)) ||
                        (lineToPointDistance(currSoln.solution[i], line.p1) === lineToPointDistance(eraseLine[1], line.p1) && 
                            lineLength(currSoln.solution[i]) > lineLength(eraseLine[1]))) {
                    eraseLine = [i, currSoln.solution[i]];
                }
            }
        }

        if (eraseLine[0] > -1) {
            console.log("removing line from solution");
            currSoln.solution.splice(eraseLine[0], 1);
            currSoln.linesErased += 1;
            currSoln.moves.unshift(["erase", new Line(new Posn(eraseLine[1].p1.x, eraseLine[1].p1.y), 
                new Posn(eraseLine[1].p2.x, eraseLine[1].p2.y))]);
            drawSolution(currSoln, c, ctx);
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
                for(var i=0; (!lineEqual((currSoln.solution)[i], lastMove[1])); i+= 1) {}
                currSoln.solution.splice(i, 1);
                currSoln.linesDrawn -= 1;

            } else if(lastMove[0] === "erase") {
                currSoln.solution.unshift(lastMove[1]);
                currSoln.linesErased -=1;
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

//checkSolution: Canvas -> Context -> Void
function checkSolution(c, ctx) {
    "use strict";
    console.log("checking solution");
    console.log(currLevel.solution);
    console.log(currSoln.solution);
    if (solutionEqual(currLevel, currSoln)){
        App.dialog({
            title        : "Success!",
            text         : "Congratulations, you beat level " + currLevelNum + " press OK to continue.",
            cancelButton : "OK"});
        while(currSoln.moves.length > 0) { undo(c, ctx); }
        //Add end of game check
        currLevelNum += 1;
        loadLevel(c, ctx);
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
