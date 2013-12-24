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
function rotateGraph(c, ctx, dir) {
    "use strict";
    if (currLevelNum === 19) {
        for(var i = diceRoll; i == diceRoll; i = Math.floor(Math.random()*6)) {}
        diceRoll = i;
        currSoln.solution = map(makeNew, dice[diceRoll]);
        currSoln.moves = [];
        currSoln.linesDrawn = 0;
        currSoln.linesErased = 0;
        drawSolution(currSoln, c, ctx, true);
    } else {
        console.log("rotating graph 90 degree");

        var rFrames = ROTATIONFRAMES - ROTATIONDROPOFF*currSoln.solution.length;
        var j = 1;
        for (var i = 0; i < rFrames; i += 1) {
            (function (x) {
                setTimeout(function () {
                    if (j != rFrames) { currSoln.solution = map((function (l) { return rotateLine(l, (dir*Math.PI)/(2*rFrames), false); }), currSoln.solution); }
                    else { currSoln.solution = map((function (l) { return rotateLine(l, (dir*Math.PI)/(2*rFrames), true); }), currSoln.solution); }
                    drawSolution(currSoln, c, ctx, false);
                    j += 1;
                }, 1);
            })();
        }
        drawSolution(currSoln, c, ctx, true);
        currSoln.moves.unshift("rotate");
        console.log("rotated graph 90 degree");
    }
}


//flipGraph: Canvas -> Context -> Void
function flipGraph(c, ctx) {
    "use strict";
    if (currLevelNum === (Levels.length - 2)) {
        currSoln.solution = map(makeNew, dice[Math.floor(Math.random()*6)]);
        currSoln.moves = [];
        currSoln.linesDrawn = 0;
        currSoln.linesErased = 0;
        drawSolution(currSoln, c, ctx, true);
    } else {
        console.log("reflecting graph");

        var fFrames = FLIPPINGFRAMES - FLIPPINGDROPOFF*currSoln.solution.length;
        var j = 1;
        for (var i = 1; i <= fFrames; i += 1) {
            (function (x) {
                setTimeout(function () { 
                    if (j != (fFrames/2)) {
                        if (j != fFrames) { currSoln.solution = map((function (l) { return compressLine(l, j, false, fFrames); }), currSoln.solution); }
                        else { currSoln.solution = map((function (l) { return compressLine(l, j, true, fFrames); }), currSoln.solution); }
                        drawSolution(currSoln, c, ctx, false);
                        if (j != fFrames) { currSoln.solution = map((function (l) { return unCompressLine(l, j, fFrames); }), currSoln.solution); }  
                    }
                    j += 1;
                }, 1);
            })();
        }
        drawSolution(currSoln, c, ctx, true);
        currSoln.moves.unshift("flip");
        console.log("reflected graph");
    }
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
        drawSolution(currSoln, c, ctx, true)
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
        if (currLevelNum === (Levels.length - 2)) {
            App.dialog({
            title : "Congratulations",
            text : "You have beaten Symbolize!",
            cancelButton : "OK"});
            App.load('home')
        }
        else {
            App.dialog({
            title : "Correct!",
            text : "On to the next level!",
            cancelButton : "OK"});
            currLevelNum += 1;
            loadLevel(c, ctx); 
            return true; 
        }
    } else {
        App.dialog({
            title : "Incorrect",
            text : "Your guess was wrong.",
            cancelButton : "OK"});
        return false;
    }
}

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
        if (currLevelNum === 19) { currSoln.solution = map(makeNew, dice[Math.floor(Math.random()*6)])}
        drawSolution(currSoln, c, ctx, true);
        console.log("reseted graph");
    } else {
        console.log("reseted graph canceled");
    }
    });
}
