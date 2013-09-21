//This module defined functions for the buttons
//written by: Luke Brown


//Button Functions
//-----------------

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
                if (lastMove[1].owner === "App") { currSoln.linesErased -= 1; }
                else { currSoln.linesDrawn += 1; }
                currSoln.solution.unshift(lastMove[1]);
            } else if(lastMove[0] === "drawSpecial") {
                if (lastMove[2].owner === "App") { currSoln.linesErased -= 1; }
                else { currSoln.linesDrawn += 1; }
                currSoln.solution.unshift(lastMove[2]);
                for(var i=0; (!lineEqual((currSoln.solution)[i], lastMove[1])); i+= 1) {}
                currSoln.solution.splice(i, 1);
                currSoln.linesDrawn -= 1;
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
            text: "There is nothing left to undo",  // String
            duration: 2000 // Integer
        };

        var toast = new Toast(options);
    }
}

//checkSolution: Canvas -> Context -> Void
function checkSolution(c, ctx) {
    "use strict";
    console.log("checking solution");
    arrangeMoves(currSoln.moves);
    if (solutionEqual(currLevel, currSoln)){
        gameReset(c, ctx);
        //Add end of game check
        currLevelNum += 1;
        loadLevel(c, ctx); 
        return true; 
    } else {
        App.dialog({
            title : "Incorrect",
            text : "Your guess was wrong.",
            cancelButton : "OK"});
        return false;

        // App.dialog({
        //     title        : "Stuff",
        //     text         : "[" + currLevel.solution[0].p1.x + ", " + currLevel.solution[0].p1.y + "] [" + currLevel.solution[0].p2.x + ", " + currLevel.solution[0].p2.y + "]" ,
        //     cancelButton : "OK"});
    }
}

//showHint: Void
// function showHint(p) {
//     "use strict"; 
//     console.log("showing hints")

//     var hints        = (currLevel.hint1) + ".  " + (currLevel.hint2) + ".  ",
//         restrictions = ("Can draw " + (currLevel.restriction.draw).toString() + "line(s).  " +
//                         "Can erase " + (currLevel.restriction.erase).toString() +" lines(s).");
// //     App.dialog({
// //         title        : "Level " + currLevelNum.toString() + " Hints",
// //         text         : hints + restrictions,
// //         cancelButton : "OK"});
// }

//resetGraph: Canvas -> Context -> Void
function resetGraph(c, ctx) {
    "use strict";
    App.dialog({
        title        : "Reset?",
        text         : "This will trash your progress on this puzzle.  Are you sure you wish to do this?",
        resetButton   : "Reset",
        cancelButton : "Cancel"
    }, function (result) { //result is a string

    if (result ===  "reset") {
        gameReset(c, ctx);
        drawSolution(currSoln, c, ctx);
        console.log("reseted graph");
    } else {
        console.log("reseted graph canceled");
    }
    });
}
