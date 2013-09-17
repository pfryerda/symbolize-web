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

		
		loadLevel(gameCanvas, context);

		//Dynamically Changes the title of the level
		var titleText = "Level " + currLevelNum;
		document.getElementById("gameTitle").innerHTML = titleText;


		//Buttons
		//-------
	
		$(page).find('.pencil').on('click', function () { activateDrawMode();                 });

	    $(page).find('.eraser').on('click', function () { activateEraseMode();                });

	    $(page).find('.rotate').on('click', function () { rotateGraph(gameCanvas, context);   });

	    $(page).find('.flip'  ).on('click', function () { flipGraph(gameCanvas, context);     });

	    $(page).find('.undo'  ).on('click', function () { undo(gameCanvas, context);          });

		$(page).find('.check' ).on('click', function () { checkSolution(gameCanvas, context); });

	    $(page).find('.hint'  ).on('click', function () { showHint();                         });

	    $(page).find('.reset' ).on('click', function () { resetGraph(gameCanvas, context);    });


	    //Interactive Drawing
	    //-------------------

	    //gameCanvas.addEventListener("touchstart", doTouchStart, false);
	    gameCanvas.addEventListener("mousedown", mouseDownEvent, false);
	    var startPoint = "";
	        
	    /*function doTouchStart(event) {
	    	"use strict";
	    	event.preventDefault();

			startPoint = scalePoint(event.targetTouches[0].pageX, event.targetTouches[0].pageY, SCALING, CANVASLENGTH);
	    	console.log("Start: ", startPoint);
	    	gameCanvas.addEventListener("touchend", doTouchEnd, false);
	    }

    	function doTouchEnd(event) {
    		"use strict";
    		event.preventDefault();
    		console.log(event.targetTouches);

    		if(startPoint !== "") {
				endPoint = scalePoint(event.targetTouches[0].pageX, event.targetTouches[0].pageY, SCALING, CANVASLENGTH);
		    	console.log("End  : X = ", endPoint);
		    	newLine = new Line(startPoint, endPoint);

		    	if (inDrawMode) { addLine(newLine, gameCanvas, context); }
		    	//if (inEraseMode) {}
		    	startPoint = "";
		    }
	    }*/

	    //Mouse Interactive Drawing:
	    //--------------------------
	   
	    function mouseDownEvent(event) {
			startPoint = scalePoint(event.pageX, event.pageY, SCALING, CANVASLENGTH);
	    	console.log("Start: ", startPoint);
	    	gameCanvas.addEventListener("mouseup", mouseUpEvent, false);
	    }

    	function mouseUpEvent(event) {
    		if(startPoint !== "") {
				endPoint = scalePoint(event.pageX, event.pageY, SCALING, CANVASLENGTH);
		    	console.log("End  : X = ", endPoint);
		    	newLine = new Line(startPoint, endPoint);

		    	if (inDrawMode) { addLine(newLine, gameCanvas, context); }
		    	//if (inEraseMode) {}
		    	startPoint = "";
		    }
	    }

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
