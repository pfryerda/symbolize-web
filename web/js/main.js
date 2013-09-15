//Main module 
//This module requires events.js
//written by: Peter Fryer Davis & Luke Brown

//Need to make a function that allows me to highlight the current tool and deselect the other tools.


App.populator('home', function (page) {
	console.log("loaded home");
});

App.populator('game', function (page) {
	$(page).on('appShow', function () {
		//This runs every time the page becomes visible to the user and is done animating
		loadLevel();
	});


	console.log("loaded game");

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

    console.log("comment");
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
