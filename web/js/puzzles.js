//A module used to store all the levels in one array called Levels
//Written by: Luke Brown

// An array containing all the Levels
//-----------------------------------

var Levels = new Array();


//Developer level:
Levels[0] = new Level([], [], new Restriction(99, 99), "Developer Level", "The answer is nothing");

//Level 1: Answer: 'K'
Levels[1] = new Level([new Line(new Posn(1, 1), new Posn(5, 5), "App"), new Line(new Posn(5, 5), new Posn(1, 9), "App")],
    [new Line(new Posn(9, 1), new Posn(5, 5), "App"), new Line(new Posn(5, 5), new Posn(9, 9), "App"), new Line(new Posn(5, 1), new Posn(5, 9), "App")],
        new Restriction(1, 0), "Peter come up with a hint", "The 11th letter in the alphabet");

//Level 2: Answer: 'A'
Levels[2] = new Level([new Line(new Posn(1, 1), new Posn(5, 5), "App"), new Line(new Posn(5, 5), new Posn(1, 9), "App")],
    [new Line(new Posn(1, 9), new Posn(5, 5), "App"), new Line(new Posn(5, 5), new Posn(9, 9), "App"), new Line(new Posn(3, 7), new Posn(7, 7), "App")],
        new Restriction(1, 0), "", "Your favourite grade!");

//Level 3: Answer: 'Y'
Levels[3] = new Level([new Line(new Posn(1, 2), new Posn(4, 5), "App"), new Line(new Posn(4, 5), new Posn(1, 8), "App")],
    [new Line(new Posn(2, 1), new Posn(5, 4), "App"), new Line(new Posn(5, 4), new Posn(8, 1), "App"), new Line(new Posn(5, 4), new Posn(5, 9), "App")],
        new Restriction(1, 0), "", "");

//Level 4: Answer: 'F'
Levels[4] = new Level([new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 2), new Posn(8, 2), "App"), new Line(new Posn(2, 8), new Posn(5, 8), "App")], 
	[new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 2), new Posn(8, 2), "App"), new Line(new Posn(5, 5), new Posn(8, 5), "App")], 
		new Restriction(1, 1), "", "");

//Level 5: Answer: 'L'
Levels[5] = new Level([new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 2), new Posn(8, 2), "App"), new Line(new Posn(2, 8), new Posn(5, 8), "App")], 
	[new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 8), new Posn(8, 8))], 
		new Restriction(0, 1), "", "");

//Level 6: Answer '8'
Levels[6] = new Level([new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 2), new Posn(8, 2), "App"), new Line(new Posn(2, 8), new Posn(5, 8), "App")], 
	[new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 2), new Posn(8, 2), "App"), new Line(new Posn(2, 8), new Posn(5, 8), "App"), new Line(new Posn(2, 8), new Posn(8, 2), "App")], 
		new Restriction(1, 0), "Figure _", "");

Levels[7] = new Level([new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 2), new Posn(8, 2), "App"), new Line(new Posn(2, 8), new Posn(5, 8), "App")], 
	[new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 2), new Posn(8, 2), "App"), new Line(new Posn(2, 8), new Posn(5, 8), "App"), new Line(new Posn(2, 8), new Posn(8, 2), "App")], 
		new Restriction(1, 0), "Figure _", "");

Levels[8] = new Level([], [], new Restriction(99, 99), "Developer Level", "The answer is nothing");

Levels[9] = new Level([], [], new Restriction(99, 99), "Developer Level", "The answer is nothing");

