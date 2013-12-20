//Main module 
//written by: Peter Fryer Davis & Luke Brown


cards.ready(function(){    //Force portrait mode
	if ( cards.browser){
	  cards.browser.setOrientationLock('portrait');
	}
});


//Constants definition and canvas set up
//----------------------------------------

var WIDTH = window.innerWidth;											 //Document width
var hintStartLeft = WIDTH/2 - 110;										 //Hint Box position from left
var CANVASWIDTH = WIDTH - 30;											 //Canvas width
var gameCanvas = document.getElementById("gameCanvas"); 		         //Canvas

gameCanvas.width = CANVASWIDTH;
gameCanvas.height = CANVASWIDTH;
document.getElementById('gameCanvas').width = CANVASWIDTH;
document.getElementById('hintbox').style.left = hintStartLeft + "px";

$('.hintBox').toggle();				//Shows the hintBox when the level loads


//Home Page
//---------

App.populator('home', function (page) {
	console.log("loaded home");
	if (App.getStack().length > 2) { 
		for (var i = 0; i < App.getStack().length; i += 1) { App.removeFromStack(1); }
	}
});


//Game Page
//----------

App.populator('game', function (page) {
	console.log("loaded game");	
	$(page).find('.pencil')[0].className = "app-button tools-Active pencil"; // Default highlighted pencil

	$(page).on('appShow', function () {
		//This runs every time the page becomes visible to the user and is done animating

		//Variable/Constant Definition, level set up
		//--------------------------------------------

		var gameCanvas = document.getElementById("gameCanvas"); 		         //Canvas
		if(gameCanvas.getContext) { var context = gameCanvas.getContext("2d"); } //Context
		loadLevel(gameCanvas, context);
		setTimeout(function() { $('.hintBox').toggle(); },150);


		//Buttons
		//-------
	
		$(page).find('.pencil').on('click', function () { 
			activateDrawMode(); 
			if(this.className === "app-button tool pencil") {
				this.className = "app-button tools-Active pencil";
				$(page).find('.eraser')[0].className = "app-button tool eraser";
			}
		});
	    $(page).find('.eraser').on('click', function () {
	    	activateEraseMode();
	    	if(this.className === "app-button tool eraser") {
				this.className = "app-button tools-Active eraser";
				$(page).find('.pencil')[0].className = "app-button tool pencil";
			}
	    });
	    $(page).find('.rotate'         ).on('click', function () { rotateGraph(gameCanvas, context);   });
	    $(page).find('.flip'           ).on('click', function () { flipGraph(gameCanvas, context);     });
	    $(page).find('.undo'           ).on('click', function () { undo(gameCanvas, context);          });
		$(page).find('.check'          ).on('click', function () { 
			if (checkSolution(gameCanvas, context)) { setTimeout(function() {$('.hintBox').toggle();},150); } 
		});
	    $(page).find('.reset'          ).on('click', function () { resetGraph(gameCanvas, context);    });
	    $(page).find('.app-button.left').on('click', function () { activateDrawMode();                 });

		$('.hint' ).click(function() { $('.hintBox').toggle(); });
		$('.close').click(function() { $('.hintBox').toggle(); });

	    //Interactive Drawing
	    //-------------------

	    var startPoint = "";
	    var tmpPoint = "";
	    var mouseDown = false
	    gameCanvas.addEventListener("mousedown"  , mouseDownEvent  , false);
	    gameCanvas.addEventListener("mouseup"    , mouseUpEvent    , false);
	    gameCanvas.addEventListener("mousemove"  , mouseMoveEvent  , false);
	    gameCanvas.addEventListener("dblclick"   , doubleClickEvent, false);
	    gameCanvas.addEventListener("dbltap"     , doubleClickEvent, false);
	    document.addEventListener(  "touchstart" , touchHandler    , true);
	    document.addEventListener(  "touchmove"  , touchHandler    , true);
	    document.addEventListener(  "touchend"   , touchHandler    , true);
	    document.addEventListener(  "touchcancel", touchHandler    , true);
	  
	    //Mouse Interactive Drawing:
	    function mouseDownEvent(event) {
			startPoint = scalePoint(event.pageX, event.pageY, SCALING, CANVASWIDTH);
			console.log("Start Point: = ", startPoint);
	    	mouseDown = true;
	    }

	    function mouseMoveEvent(event) {
	    	if (!mouseDown || !inEraseMode) return;
	    	tmpPoint = scalePoint(event.pageX, event.pageY, SCALING, CANVASWIDTH);
	    	removeLine(tmpPoint, gameCanvas, context);
	    }

    	function mouseUpEvent(event) {
    		if(startPoint !== "") {
    			mouseDown = false;
				endPoint = scalePoint(event.pageX, event.pageY, SCALING, CANVASWIDTH);
		    	console.log("End Point: = ", endPoint);
		    	newLine = new Line(startPoint, endPoint, "User");

		    	if (inDrawMode)  {    addLine(newLine, gameCanvas, context); }
		    	//if (inEraseMode) { removeLine(newLine, gameCanvas, context); }
		    	startPoint = "";
		    }
	    }

	    function doubleClickEvent(event) {
	    	if(inDrawMode) { 
	    		activateEraseMode();
		    	if(this.className === "app-button tool eraser") {
					this.className = "app-button tools-Active eraser";
					$(page).find('.pencil')[0].className = "app-button tool pencil";
				}
	    	}
	    	else           { 
	    		activateDrawMode(); 
				if(this.className === "app-button tool pencil") {
					this.className = "app-button tools-Active pencil";
					$(page).find('.eraser')[0].className = "app-button tool eraser";
				}
	    	}
	    }

	    //Touch interactive Drawing (simulates mouse):
	    function touchHandler(event) {
		    var tocuhLst = event.changedTouches,
		        fst = tocuhLst[0],
		        touchType = "";
		    switch(event.type) {
		        case "touchstart": touchType = "mousedown"; break;      
		        case "touchend"  : touchType = "mouseup"  ; break;
		        default: return;
		    }

		    var mouseSimulatedEvent = document.createEvent("MouseEvent");
		    mouseSimulatedEvent.initMouseEvent(touchType, true, true, window, 1, fst.screenX, fst.screenY, 
		                              fst.clientX, fst.clientY, false, false, false, false, 0/*left*/, null);

		    fst.target.dispatchEvent(mouseSimulatedEvent);
		    event.preventDefault();
		}
	    
	});
});


//Levels Page
//------------

App.populator('levels', function (page) {

	$(page).on('appShow', function () {
		console.log("loaded levels");
		$(page).find('.lvl1' ).on('click', function () { currLevelNum = 1;  });
		$(page).find('.lvl2' ).on('click', function () { currLevelNum = 2;  });
		$(page).find('.lvl3' ).on('click', function () { currLevelNum = 3;  });
		$(page).find('.lvl4' ).on('click', function () { currLevelNum = 4;  });
		$(page).find('.lvl5' ).on('click', function () { currLevelNum = 5;  });
		$(page).find('.lvl6' ).on('click', function () { currLevelNum = 6;  });
		$(page).find('.lvl7' ).on('click', function () { currLevelNum = 7;  });
		$(page).find('.lvl8' ).on('click', function () { currLevelNum = 8;  });
		$(page).find('.lvl9' ).on('click', function () { currLevelNum = 9;  });
		$(page).find('.lvl10').on('click', function () { currLevelNum = 10; });
		$(page).find('.lvl11').on('click', function () { currLevelNum = 11; });
		$(page).find('.lvl12').on('click', function () { currLevelNum = 12; });
		$(page).find('.lvl13').on('click', function () { currLevelNum = 13; });
		$(page).find('.lvl14').on('click', function () { currLevelNum = 14; });
		$(page).find('.lvl15').on('click', function () { currLevelNum = 15; });
		$(page).find('.lvl16').on('click', function () { currLevelNum = 16; });
		$(page).find('.lvl17').on('click', function () { currLevelNum = 17; });
		$(page).find('.lvl18').on('click', function () { currLevelNum = 18; });
	});
});


App.load('home'); //Game start up
