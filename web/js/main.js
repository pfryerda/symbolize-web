//Main module 
//written by: Peter Fryer Davis & Luke Brown

//Need to make a function that allows me to highlight the current tool and deselect the other tools.

cards.ready(function(){
	if ( cards.browser){
	  cards.browser.setOrientationLock('portrait');
	}
});

var WIDTH = window.innerWidth;											 //Document width
var CANVASWIDTH = WIDTH - 70;											 //Canvas width

var gameCanvas = document.getElementById("gameCanvas"); 		         //Canvas

gameCanvas.width = CANVASWIDTH;
gameCanvas.height = CANVASWIDTH;
document.getElementById('gameCanvas').width = CANVASWIDTH;

$('.hintBox').toggle();		//Shows the hintBox when the level loads


App.populator('home', function (page) {
	console.log("loaded home");
});

App.populator('game', function (page) {
	console.log("loaded game");


	$(page).on('appShow', function () {
		//This runs every time the page becomes visible to the user and is done animating
		App.removeFromStack(1);

		//Variable/Constant Definition, level set up
		//--------------------------------------------


		var gameCanvas = document.getElementById("gameCanvas"); 		         //Canvas
		if(gameCanvas.getContext) { var context = gameCanvas.getContext("2d"); } //Context
		loadLevel(gameCanvas, context);
		setTimeout(function() {$('.hintBox').toggle();},150);


		//Buttons
		//-------
	
		$(page).find('.pencil'         ).on('click', function () { 
			activateDrawMode();    
			//console.log($(page).find('.pencil'));
			//document.getElementById('.pencilimg').src = "img/pencil2.png";          
		});
	    $(page).find('.eraser'         ).on('click', function () { activateEraseMode();                });
	    $(page).find('.rotate'         ).on('click', function () { rotateGraph(gameCanvas, context);   });
	    $(page).find('.flip'           ).on('click', function () { flipGraph(gameCanvas, context);     });
	    $(page).find('.undo'           ).on('click', function () { undo(gameCanvas, context);          });
		$(page).find('.check'          ).on('click', function () { 
			if (checkSolution(gameCanvas, context)) { setTimeout(function() {$('.hintBox').toggle();},150); } 
		});
	    // $(page).find('.hint'           ).on('click', function () {                                     });
	    $(page).find('.reset'          ).on('click', function () { resetGraph(gameCanvas, context);    });
	    /*$(page).find('.app-button.left').on('click', function () {
	    	currLevelNum = 1;
	    	App.load('levels', 'slide-right');
	    	$('.hintBox').toggle();
	    });*/

		$('.hint').click(function() {
	    	$('.hintBox').toggle();
		});

		$('.close').click(function() {
		    $('.hintBox').toggle();
		});

	    //Interactive Drawing
	    //-------------------

	    var startPoint = "";
	    gameCanvas.addEventListener("mousedown"  , mouseDownEvent, false);
	    document.addEventListener(  "touchstart" , touchHandler  , true);
	    document.addEventListener(  "touchend"   , touchHandler  , true);
	    document.addEventListener(  "touchcancel", touchHandler  , true);	    
	  
	    //Mouse Interactive Drawing:	   
	    function mouseDownEvent(event) {
			startPoint = scalePoint(event.pageX, event.pageY, SCALING, CANVASWIDTH);
			console.log("Start Point: = ", startPoint);
	    	gameCanvas.addEventListener("mouseup", mouseUpEvent, false);
	    }

    	function mouseUpEvent(event) {
    		if(startPoint !== "") {
				endPoint = scalePoint(event.pageX, event.pageY, SCALING, CANVASWIDTH);
		    	console.log("End Point: = ", endPoint);
		    	newLine = new Line(startPoint, endPoint, "User");

		    	if (inDrawMode)  {    addLine(newLine, gameCanvas, context); }
		    	if (inEraseMode) { removeLine(newLine, gameCanvas, context); }
		    	startPoint = "";
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

App.populator('levels', function (page) {

	$(page).find('.app-button.left').on('click', function () {
    	App.load('home', 'slide-right');
    });

	$(page).on('appShow', function () {
		console.log("loaded levels");
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
		$(page).find('.lvl3').on('click', function () {
			console.log("loaded3");
			currLevelNum = 3;
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
		$(page).find('.lvl10').on('click', function () {
			console.log("loaded10");
			currLevelNum = 10;
			App.load('game');
		});
		$(page).find('.lvl11').on('click', function () {
			console.log("loaded11");
			currLevelNum = 11;
			App.load('game');
		});
		$(page).find('.lvl12').on('click', function () {
			console.log("loaded12");
			currLevelNum = 12;
			App.load('game');
		});
		$(page).find('.lvl13').on('click', function () {
			console.log("loaded13");
			currLevelNum = 13;
			App.load('game');
		});
		$(page).find('.lvl14').on('click', function () {
			console.log("loaded14");
			currLevelNum = 14;
			App.load('game');
		});
		$(page).find('.lvl15').on('click', function () {
			console.log("loaded15");
			currLevelNum = 15;
			App.load('game');
		});
		$(page).find('.lvl16').on('click', function () {
			console.log("loaded16");
			currLevelNum = 16;
			App.load('game');
		});
		$(page).find('.lvl17').on('click', function () {
			console.log("loaded17");
			currLevelNum = 17;
			App.load('game');
		});
		$(page).find('.lvl18').on('click', function () {
			console.log("loaded18");
			currLevelNum = 18;
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
