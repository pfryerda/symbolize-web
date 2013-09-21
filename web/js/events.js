//This module defined functions for events
//written by: Luke Brown


//Event Functions
//----------------

//gameReset: Canvas -> Context -> Void
function gameReset(c, ctx) {
    "use strict";
    while (currSoln.moves.length > 0) { undo(c, ctx); }
}

//loadLevel: Canvas -> Context -> Void
function loadLevel(c, ctx) {
    "use strict";
    gameReset(c, ctx);
    if (DEVMODE) { currLevelNum = 0; }
    currLevel = Levels[currLevelNum];
    currSoln = new UserSolution(map(makeNew, currLevel.graph), 0, 0, []);
    
    if (currLevelNum === 0) { document.getElementById("gameTitle").innerHTML = "Development Level "; }
    else if(currLevelNum === Levels.length) { document.getElementById("gameTitle").innerHTML = "Final Level "; }
    else { document.getElementById("gameTitle").innerHTML = "Level " + currLevelNum; }

    var lineDrawWord = "lines", lineEraseWord = "lines";
    if(currLevel.restriction.draw  === 1) { lineDrawWord = "line"; }
    if(currLevel.restriction.erase === 1) { lineEraseWord = "line"; }

    document.getElementById("hint").innerHTML = currLevel.hint; 
    document.getElementById("drawAmount").innerHTML = currLevel.restriction.draw;
    document.getElementById("lineDraw").innerHTML = lineDrawWord;
    document.getElementById("eraseAmount").innerHTML = currLevel.restriction.erase;
    document.getElementById("lineErase").innerHTML = lineEraseWord;

    console.log("loaded level", currLevelNum);
    drawSolution(currSoln, c, ctx);
}

//addLine: Line -> Canvas -> Context -> Void
function addLine(l, c, ctx) {
    "use strict";
    var j = -1;
    if (l.p1.x !== l.p2.x || l.p1.y !== l.p2.y) {
        if (currSoln.linesDrawn < (currLevel.restriction.draw)) {
            console.log("adding line to solution");
            for (var i = 0; i < currSoln.solution.length; i += 1) {
                if (isScalarMults(l, currSoln.solution[i]) && interset(l, currSoln.solution[i])) { 
                    j = i;
                    if (l.p1.y === l.p2.y && l.p1.y === currSoln.solution[i].p1.y && l.p1.y === currSoln.solution[i].p2.y) {
                        l = new Line(lowestX(l, currSoln.solution[i]), highestX(l, currSoln.solution[i]), "AppExtended");
                    } else {
                        l = new Line(lowestY(l, currSoln.solution[i]), highestY(l, currSoln.solution[i]), "AppExtended");
                    }
                }
            }
            if (j > -1) { 
                currSoln.moves.unshift(["drawSpecial", l, makeNew(currSoln.solution[j])]);
                if (currSoln.solution[j].owner == "User") { currSoln.linesDrawn -= 1; }
                currSoln.solution.splice(j, 1); 
            } else {
                currSoln.moves.unshift(["draw", l]);
            }
            currSoln.solution.unshift(l);
            currSoln.linesDrawn += 1;
            drawSolution(currSoln, c, ctx)
            console.log("added line to solution");
        } else {
            var options = {
                text: "Cannot draw any more lines",  // String
                duration: 2000 // Integer
            };

            var toast = new Toast(options);
        }
    }
}

//removeLine: Line -> Canvas -> Context -> Void
function removeLine(line, c, ctx) {
    "use strict";
    var eraseLine = [-1, new Line(new Posn(0, 0), new Posn(100, 100), "App")];
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

    if (eraseLine[0] > -1 && (eraseLine[1].owner === "User" || currSoln.linesErased < (currLevel.restriction.erase))) {
        console.log("removing line from solution");
        currSoln.solution.splice(eraseLine[0], 1);
        if (eraseLine[1].owner !== "User") { currSoln.linesErased += 1; }
        if (eraseLine[1].owner !== "App") { currSoln.linesDrawn -=1; }
        currSoln.moves.unshift(["erase", makeNew(eraseLine[1])]);
        drawSolution(currSoln, c, ctx);
        console.log("removed line from solution");
    } else if (currSoln.linesErased >= (currLevel.restriction.erase) && eraseLine[1].owner === "App") {
        var options = {
            text: "Cannot erase any more graph lines",  // String
            duration: 2000 // Integer
        };

        var toast = new Toast(options);
    }
}
