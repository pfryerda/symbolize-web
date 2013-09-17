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


		//Variable Definition and level loading
		//-------------------------------------

		var gameCanvas = document.getElementById("gameCanvas"); 		         //Canvas

		if(gameCanvas.getContext) { var context = gameCanvas.getContext("2d"); } //Context

		loadLevel(gameCanvas, context);


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

	    gameCanvas.addEventListener("mousedown", doMouseDown, false);
	    var height = $(page).height();
	    console.log('height = ' + height);

	    var width = $(page).width();
	    console.log('width = ' + width);

	    function doMouseDown(event) {
	    	gameCanvas_x = (event.pageX - ((width - gameCanvas.width) / 2)) * (scaling / 270);
	    	gameCanvas_y = (event.pageY - 68) * (scaling / 270);
	    	console.log("X = " + gameCanvas_x + ", Y = " + gameCanvas_y);
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
