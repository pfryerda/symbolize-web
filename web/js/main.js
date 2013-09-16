//Main module 
//This module requires events.js
//written by: Peter Fryer Davis & Luke Brown

//Need to make a function that allows me to highlight the current tool and deselect the other tools.


App.populator('home', function (page) {
	console.log("loaded home");
});

App.populator('game', function (page) {
	console.log("loaded game");
	
	$(page).on('appShow', function () {
		//This runs every time the page becomes visible to the user and is done animating

		//Variable Declaration
		//-------------------

		var gameCanvas = document.getElementById("gameCanvas"),         //Canvas
		    scaling = 50; //Note this number still need to be decided!  //Max number for the width and height of the graph

		if(gameCanvas.getContext) {
		    var ctx = gameCanvas.getContext("2d");                      //Context
		}


		//Graphing Function
		//----------------- 

		//clearCanvas: Void
		function clearCanvas() {
		    "use strict";
		    console.log("clearing canvas");
		    gameCanvas.width = gameCanvas.width;
		}

		//flipCanvas: Void
		function flipCanvas() {
		    "use strict";
		    console.log("setting canvas flip")
		    ctx.translate(0, scaling);
		    ctx.scale(1, -1);
		}

		//rotateCanvas: Number[%90==0] -> Void
		function rotateCanvas(angle) {
		    "use strict";
		    console.log("setting canvas rotation");
		    var a = angle % 360;
		    switch (a) {
		    case 0:
		        ctx.translate(0, 0); //Should never happen
		        break;
		    case 90:
		        ctx.translate(scaling, 0);
		        break;
		    case 180:
		        ctx.translate(scaling, scaling);
		        break;
		    case 270:
		        ctx.translate(0, scaling);
		        break;
		    default:
		        throw new RangeError("rotateCanvas given a number other than 0, 90, 180, or 270")  //Should never happen
		        break;
		    }
		    ctx.rotate(a * Math.PI / 180);
		    
		}

		//drawLine: Line -> Void
		function drawLine(line) {
		    "use strict";
		    console.log("drawing line");
		    ctx.moveTo(line.p1.x + (0.5 / scaling), line.p1.y + (0.5 / scaling));
		    ctx.lineTo(line.p2.x + (0.5 / scaling), line.p2.y + (0.5 / scaling));
		    ctx.lineCap = 'round';
		    ctx.stroke();  
		}

		//drawGraph: Graph -> Void
		function drawGraph(graph) {
		    "use strict";
		    console.log("drawing graph");
		    for (var i = 0; i < graph.length; i += 1) { 
		        drawLine(graph[i]); 
		    }
		}

		//drawSolution: UserSolution -> Void
		function drawSolution(userSoln) {
		    "use strict";
		    console.log("starting canvas drawing");

		    var graph = userSoln.solution.sGraph,       //Graph
		        rotation = userSoln.solution.rotation,  //Rotation
		        flip = userSoln.solution.isFliped;      //Boolean stating if canvas is to be flipped

		    clearCanvas();                              //Clears the canvas
		    ctx.save();                                 //Saves current coords
		    ctx.scale(gameCanvas.width / scaling,
		        gameCanvas.height / scaling);           //Scales the graph to have a max width and hiehgt of scaling

		    if (flip) { flipCanvas(); }                 //Flips vertically if f is true
		    if (rotation !== 0) rotateCanvas(rotation); //Sets the proper rotation
		    drawGraph(graph);                           //Draws the graph

		    ctx.restore();                              //Resets the coords for the next draw
		    console.log("finished canvas drawing");
		}

		//Variable Declaration
		//-------------------

		var currLevelNum = 1,                                                             //Defaults level 1
		    currLevel = Levels[currLevelNum - 1],                                         //Defaults level 1
		    currSoln = new UserSolution("", new Solution(0, false, currLevel.graph), ""), //Defaults level 1

		    inDrawMode = true,                                                            //Defaults Draw  Mode enabled
		    inEraseMode = !inDrawMode;                                                    //Defaults Erase Mode disabled


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
		    currSoln = new UserSolution("", new Solution(0, false, currLevel.graph), "");
		    console.log("loaded level", currLevelNum);
		    drawSolution(currSoln);
		    showHint();
		}

		//addLine: Posn Posn -> Void
		function addLine(point1, point2) {
		    "use strict";
		    if (currSoln.linesDrawn < getDrawRestriction()){
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
		    if (currSoln.linesErased < getEraseRestriction()){
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

		loadLevel();
	

		$(page).find('.pencil').on('click', function () { activateDrawMode();  });
	    $(page).find('.eraser').on('click', function () { activateEraseMode(); });
	    $(page).find('.rotate').on('click', function () { rotateGraph();       });
	    $(page).find('.flip'  ).on('click', function () { flipGraph();         });
	    $(page).find('.hint'  ).on('click', function () { showHint();          });



		$(page).find('.check').on('click', function () {
			console.log("check");
			App.dialog({
					title        : "Check Solution?",
					text         : "Would you like to see if you have solved the puzzle correctly?",
					checkButton   : "Check!",
					cancelButton : "Cancel"
				}, function (result) {

				if (result ===  "check") {
					App.load("levels")
				}
			});
	    });

	    $(page).find('.reset').on('click', function () {
			console.log("reset");
			App.dialog({
					title        : "Reset?",
					text         : "This will trash your progress on this puzzle.  Are you sure you wish to do this?",
					resetButton   : "Reset",
					cancelButton : "Cancel"
				}, function (result) { //result is a string

				if (result ===  "reset") {
					App.load("levels")
				}
			});
	    });
	});
});

App.populator('levels', function (page) {
	console.log("loaded levels");
});

App.load('home');

// try {
// 	App.restore();
// }
// catch (err) {
// 	App.load('home');
// }
