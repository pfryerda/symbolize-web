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


		//Canvas Creation
		//--------

		var gameCanvas = document.getElementById("gameCanvas"); 		         //Canvas

	    var width = $(page).width();
	    console.log('width = ' + width);

		var canvasLength = width - 70;

		gameCanvas.width = canvasLength;
		gameCanvas.height = canvasLength;

		$(page).find('gameCanvas').width = canvasLength;


		//Variable Definition and level loading
		//-------------------------------------

		if(gameCanvas.getContext) { var context = gameCanvas.getContext("2d"); } //Context

		loadLevel(gameCanvas, context);

		//Dynamically Changes the title of the level
		var titleText = "Level " + currLevelNum;
		console.log(titleText);
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

	    gameCanvas.addEventListener("mousedown", mouseDownEvent, false);
	    var startPoint = "";
	    
	    
	    function mouseDownEvent(event) {
	    	startPoint_x = to5((event.pageX - 25) * (SCALING / canvasLength));
	    	startPoint_y = to5((event.pageY - 68) * (SCALING / canvasLength));
			startPoint = new Posn(startPoint_x, startPoint_y);

	    	console.log("Start: ", startPoint);

	    	gameCanvas.addEventListener("mouseup", mouseUpEvent, false);



	    }

    	function mouseUpEvent(event) {
    		if(startPoint !== "") {
		    	endPoint_x = to5((event.pageX - 25) * (SCALING / canvasLength));
		    	endPoint_y = to5((event.pageY - 68) * (SCALING / canvasLength));
				endPoint = new Posn(endPoint_x, endPoint_y);

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
