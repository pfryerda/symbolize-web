//Main module 
//This module requires events.js
//written by: Peter Fryer Davis & Luke Brown

//Need to make a function that allows me to highlight the current tool and deselect the other tools.

cards.ready(function(){
	if ( cards.browser){
	  cards.browser.setOrientationLock('portrait');
	}
});


App.populator('home', function (page) {
	console.log("loaded home");
});

App.populator('game', function (page) {
	console.log("loaded game");

	$(page).on('appShow', function () {
		//This runs every time the page becomes visible to the user and is done animating


		//Variable Definition, level loading and Canvas Creation
		//------------------------------------------------------

		var gameCanvas = document.getElementById("gameCanvas"); 		         //Canvas
		if(gameCanvas.getContext) { var context = gameCanvas.getContext("2d"); } //Context

	    var WIDTH = $(page).width();											 //Document width
		var CANVASLENGTH = WIDTH - 70;											 //Canvas width

		gameCanvas.width = CANVASLENGTH;
		gameCanvas.height = CANVASLENGTH;
		$(page).find('gameCanvas').width = CANVASLENGTH;

		while(currSoln.moves.length > 0) { undo(gameCanvas, context); }
		loadLevel(gameCanvas, context);


		//Buttons
		//-------
	
		$(page).find('.pencil'         ).on('click', function () { activateDrawMode();                 });

	    $(page).find('.eraser'         ).on('click', function () { activateEraseMode();                });

	    $(page).find('.rotate'         ).on('click', function () { rotateGraph(gameCanvas, context);   });

	    $(page).find('.flip'           ).on('click', function () { flipGraph(gameCanvas, context);     });

	    $(page).find('.undo'           ).on('click', function () { undo(gameCanvas, context);          });

		$(page).find('.check'          ).on('click', function () { checkSolution(gameCanvas, context); });

	    $(page).find('.hint'           ).on('click', function () { showHint();                         });

	    $(page).find('.reset'          ).on('click', function () { resetGraph(gameCanvas, context);    });

	    $(page).find('.app-button.left').on('click', function () { currLevelNum = 1;                   });


	    //Interactive Drawing
	    //-------------------

	    var startPoint = "";	    

	  
	    //Mouse Interactive Drawing:

	    gameCanvas.addEventListener("mousedown", mouseDownEvent, false);
	   
	    function mouseDownEvent(event) {
			startPoint = scalePoint(event.pageX, event.pageY, SCALING, CANVASLENGTH);
	    	console.log("Start: ", startPoint);
	    	gameCanvas.addEventListener("mouseup", mouseUpEvent, false);
	    }

    	function mouseUpEvent(event) {
    		if(startPoint !== "") {
				endPoint = scalePoint(event.pageX, event.pageY, SCALING, CANVASLENGTH);
		    	console.log("End  : X = ", endPoint);
		    	newLine = new Line(startPoint, endPoint, "User");

		    	if (inDrawMode)  {    addLine(newLine, gameCanvas, context); }
		    	if (inEraseMode) { removeLine(newLine, gameCanvas, context); }
		    	startPoint = "";
		    }
	    }

	    //Touch interactive Drawing:

	    document.addEventListener("touchstart", touchHandler, true);
	    document.addEventListener("touchmove", touchHandler, true);
	    document.addEventListener("touchend", touchHandler, true);
	    document.addEventListener("touchcancel", touchHandler, true); 


	    function touchHandler(event) {
		    var touches = event.changedTouches,
		        first = touches[0],
		        type = "";
		         switch(event.type)
		    {
		        case "touchstart": type = "mousedown"; break;
		        case "touchmove":  type="mousemove"; break;        
		        case "touchend":   type="mouseup"; break;
		        default: return;
		    }

		    var simulatedEvent = document.createEvent("MouseEvent");
		    simulatedEvent.initMouseEvent(type, true, true, window, 1, 
		                              first.screenX, first.screenY, 
		                              first.clientX, first.clientY, false, 
		                              false, false, false, 0/*left*/, null);

		    first.target.dispatchEvent(simulatedEvent);
		    event.preventDefault();
		}
	    
	});
});

App.populator('levels', function (page) {

	$(page).on('appShow', function () {
		console.log("loaded levels appShow");
		$(page).find('.lvl1').on('click', function () {
			console.log("loaded1");
			currLevelNum = 1;
			App.load('game');
		});
		$(page).find('.lvl2').on('click', function () {
			console.log("loaded2");
			currLevelNum = 2;
			App.load('game');
		});
		$(page).find('.app-button.lvl3').on('click', function () {
			console.log("loaded3");
			currLevelNum = 3;
			console.log("currLevelNum = " + currLevelNum);
			App.load('game');
		});
		$(page).find('.lvl4').on('click', function () {
			console.log("loaded4");
			currLevelNum = 4;
			App.load('game');
		});
		$(page).find('.lvl5').on('click', function () {
			console.log("loaded5");
			currLevelNum = 5;
			App.load('game');
		});
		$(page).find('.lvl6').on('click', function () {
			console.log("loaded6");
			currLevelNum = 6;
			App.load('game');
		});
		$(page).find('.lvl7').on('click', function () {
			console.log("loaded7");
			currLevelNum = 7;
			App.load('game');
		});
		$(page).find('.lvl8').on('click', function () {
			console.log("loaded8");
			currLevelNum = 8;
			App.load('game');
		});
		$(page).find('.lvl9').on('click', function () {
			console.log("loaded9");
			currLevelNum = 9;
			App.load('game');
		});
	});
});

App.load('home');

// try {
// 	App.restore();
// }
// catch (err) {
// 	App.load('home');
// }
