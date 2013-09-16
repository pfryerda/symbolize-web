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


		//Variable Definition
		//-------------------

		var gameCanvas = document.getElementById("gameCanvas"); 		         //Canvas

		if(gameCanvas.getContext) { var context = gameCanvas.getContext("2d"); } //Context

		//draw: Void
		function draw() { drawSolution(currSoln, gameCanvas, context); }         //Draws currSoln


		//loading and drawing level
		//-------------------------

		loadLevel();
		draw();


		//Buttons
		//-------
	
		$(page).find('.pencil').on('click', function () { activateDrawMode(); });
	    $(page).find('.eraser').on('click', function () { activateEraseMode(); });

	    $(page).find('.rotate').on('click', function () { 
	    	rotateGraph();       
	    	draw();
	    });
	    
	    $(page).find('.flip').on('click', function () { 
	    	flipGraph();         
	    	draw();
	    });

	    $(page).find('.undo').on('click', function () {   
	    	undo();
	    	draw();
	    });


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

	    $(page).find('.hint'  ).on('click', function () { showHint(); });

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

App.load('game');

// try {
// 	App.restore();
// }
// catch (err) {
// 	App.load('home');
// }
