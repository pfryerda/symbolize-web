//A module used to store all the levels in one array called Levels
//Written by: Luke Brown

// An array containing all the Levels
//-----------------------------------

var Levels = new Array();


//Developer level:
Levels[0] = new Level([], [], new Restriction(99, 99), "Developer Level");

//Level 1: Answer: 'K'
Levels[1] = new Level([new Line(new Posn(1, 1), new Posn(5, 5), "App"), new Line(new Posn(5, 5), new Posn(1, 9), "App")],
    [([new Line(new Posn(9, 1), new Posn(5, 5), "App"), new Line(new Posn(5, 5), new Posn(9, 9), "App"), new Line(new Posn(5, 1), new Posn(5, 9), "App")])],
        new Restriction(2, 0), "The 11th letter in the alphabet");

//Level 2: Answer: 'A'
Levels[2] = new Level([new Line(new Posn(1, 1), new Posn(5, 5), "App"), new Line(new Posn(5, 5), new Posn(1, 9), "App")],
    [[new Line(new Posn(1, 9), new Posn(5, 5), "App"), new Line(new Posn(5, 5), new Posn(9, 9), "App"), new Line(new Posn(3, 7), new Posn(7, 7), "App")]],
        new Restriction(1, 0), "Your favourite grade!");

//Level 3: Answer: 'Y'
Levels[3] = new Level([new Line(new Posn(1, 2), new Posn(4, 5), "App"), new Line(new Posn(4, 5), new Posn(1, 8), "App")],
    [[new Line(new Posn(2, 1), new Posn(5, 4), "App"), new Line(new Posn(5, 4), new Posn(8, 1), "App"), new Line(new Posn(5, 4), new Posn(5, 9), "App")]],
        new Restriction(1, 0), "");

//Level 4: Answer: 'E'
Levels[4] = new Level([new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 2), new Posn(8, 2), "App"), new Line(new Posn(2, 8), new Posn(5, 8), "App")], 
	[[new Line(new Posn(5, 5), new Posn(7, 5), "App"), new Line(new Posn(5, 8), new Posn(8, 8), "App"),new Line(new Posn(5, 2), new Posn(5, 8), "App"),new Line(new Posn(5, 2), new Posn(8, 2), "App")]], 
		new Restriction(2, 1), "");

//Level 5: Answer: 'L'
Levels[5] = new Level([new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 2), new Posn(8, 2), "App"), new Line(new Posn(2, 8), new Posn(5, 8), "App")], 
	[[new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 8), new Posn(8, 8))]], 
		new Restriction(0, 1), "");

//Level 6: Answer '8'
Levels[6] = new Level([new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 2), new Posn(8, 2), "App"), new Line(new Posn(2, 8), new Posn(5, 8), "App")], 
	[[new Line(new Posn(5, 2), new Posn(5, 8), "App"), new Line(new Posn(5, 2), new Posn(8, 2), "App"), new Line(new Posn(2, 8), new Posn(5, 8), "App"), new Line(new Posn(2, 8), new Posn(8, 2), "App")]], 
		new Restriction(1, 0), "Figure _");

//level 7: Answer 'M'
Levels[7] = new Level([new Line(new Posn(5, 5), new Posn(8, 8), "App"),new Line(new Posn(2, 8), new Posn(5, 5), "App"),new Line(new Posn(8, 3), new Posn(8, 8), "App"),new Line(new Posn(2, 3), new Posn(2, 8), "App"),new Line(new Posn(2, 3), new Posn(8, 3), "App")], 
	[[new Line(new Posn(5, 5), new Posn(2, 2), "App"),new Line(new Posn(8, 2), new Posn(5, 5), "App"),new Line(new Posn(2, 7), new Posn(2, 2), "App"),new Line(new Posn(8, 7), new Posn(8, 2), "App")]], 
		new Restriction(0, 1), "");

//level 8: Answer "Envelope"
Levels[8] = new Level([new Line(new Posn(5, 5), new Posn(8, 8), "App"),new Line(new Posn(2, 8), new Posn(5, 5), "App"),new Line(new Posn(8, 3), new Posn(8, 8), "App"),new Line(new Posn(2, 3), new Posn(2, 8), "App"),new Line(new Posn(2, 3), new Posn(8, 3), "App")],
	[[new Line(new Posn(8, 2), new Posn(2, 2), "App"),new Line(new Posn(8, 7), new Posn(2, 7), "App"),new Line(new Posn(5, 5), new Posn(2, 2), "App"),new Line(new Posn(8, 2), new Posn(5, 5), "App"),new Line(new Posn(2, 7), new Posn(2, 2), "App"),new Line(new Posn(8, 7), new Posn(8, 2), "App")]], 
		new Restriction(1, 0), "You got mail!");

//level 9: Answer "Bridge"
Levels[9] = new Level([new Line(new Posn(5, 5), new Posn(8, 8), "App"),new Line(new Posn(2, 8), new Posn(5, 5), "App"),new Line(new Posn(8, 3), new Posn(8, 8), "App"),new Line(new Posn(2, 3), new Posn(2, 8), "App"),new Line(new Posn(2, 3), new Posn(8, 3), "App")], 
	[[new Line(new Posn(8, 5), new Posn(2, 5), "App"),new Line(new Posn(5, 5), new Posn(2, 2), "App"),new Line(new Posn(8, 2), new Posn(5, 5), "App"),new Line(new Posn(2, 7), new Posn(2, 2), "App"),new Line(new Posn(8, 7), new Posn(8, 2), "App")]], 
		new Restriction(1, 1), "");

//level 10: Answer '%'
Levels[10] = new Level([new Line(new Posn(2, 8), new Posn(4, 8), "App"),new Line(new Posn(2, 6), new Posn(2, 8), "App"),new Line(new Posn(4, 6), new Posn(6, 4), "App"),new Line(new Posn(8, 4), new Posn(6, 4), "App"),new Line(new Posn(8, 2), new Posn(8, 4), "App"),new Line(new Posn(6, 2), new Posn(8, 2), "App"),new Line(new Posn(6, 4), new Posn(6, 2), "App"),new Line(new Posn(4, 8), new Posn(4, 6), "App"),new Line(new Posn(4, 6), new Posn(2, 6), "App")], 
	[[new Line(new Posn(1, 9), new Posn(9, 1), "App"),new Line(new Posn(2, 2), new Posn(2, 4), "App"),new Line(new Posn(4, 2), new Posn(2, 2), "App"),new Line(new Posn(6, 8), new Posn(6, 6), "App"),new Line(new Posn(8, 8), new Posn(6, 8), "App"),new Line(new Posn(8, 6), new Posn(8, 8), "App"),new Line(new Posn(6, 6), new Posn(8, 6), "App"),new Line(new Posn(2, 4), new Posn(4, 4), "App"),new Line(new Posn(4, 4), new Posn(4, 2), "App")]], 
		new Restriction(1, 1), "");

//level 11: Answer "Arrow"
Levels[11] = new Level([new Line(new Posn(2, 8), new Posn(4, 8), "App"),new Line(new Posn(2, 6), new Posn(2, 8), "App"),new Line(new Posn(4, 6), new Posn(6, 4), "App"),new Line(new Posn(8, 4), new Posn(6, 4), "App"),new Line(new Posn(8, 2), new Posn(8, 4), "App"),new Line(new Posn(6, 2), new Posn(8, 2), "App"),new Line(new Posn(6, 4), new Posn(6, 2), "App"),new Line(new Posn(4, 8), new Posn(4, 6), "App"),new Line(new Posn(4, 6), new Posn(2, 6), "App")], 
	[[new Line(new Posn(4, 6), new Posn(6, 4), "App"),new Line(new Posn(8, 4), new Posn(6, 4), "App"),new Line(new Posn(8, 2), new Posn(8, 4), "App"),new Line(new Posn(6, 2), new Posn(8, 2), "App"),new Line(new Posn(6, 4), new Posn(6, 2), "App"),new Line(new Posn(4, 8), new Posn(4, 6), "App"),new Line(new Posn(4, 6), new Posn(2, 6), "App")]], 
		new Restriction(0, 2), "");

//level 12: Answer "Prism"
Levels[12] = new Level([new Line(new Posn(2, 8), new Posn(4, 8), "App"),new Line(new Posn(2, 6), new Posn(2, 8), "App"),new Line(new Posn(4, 6), new Posn(6, 4), "App"),new Line(new Posn(8, 4), new Posn(6, 4), "App"),new Line(new Posn(8, 2), new Posn(8, 4), "App"),new Line(new Posn(6, 2), new Posn(8, 2), "App"),new Line(new Posn(6, 4), new Posn(6, 2), "App"),new Line(new Posn(4, 8), new Posn(4, 6), "App"),new Line(new Posn(4, 6), new Posn(2, 6), "App")], 
	[[new Line(new Posn(8, 2), new Posn(4, 6), "App"),new Line(new Posn(4, 8), new Posn(8, 4), "App"),new Line(new Posn(2, 6), new Posn(6, 2), "App"),new Line(new Posn(2, 8), new Posn(4, 8), "App"),new Line(new Posn(2, 6), new Posn(2, 8), "App"),new Line(new Posn(8, 4), new Posn(6, 4), "App"),new Line(new Posn(8, 2), new Posn(8, 4), "App"),new Line(new Posn(6, 2), new Posn(8, 2), "App"),new Line(new Posn(6, 4), new Posn(6, 2), "App"),new Line(new Posn(4, 8), new Posn(4, 6), "App"),new Line(new Posn(4, 6), new Posn(2, 6), "App")]], 
	new Restriction(3, 0), "(No rotation)");

//level 13: Answer : '★'
Levels[13] = new Level([new Line(new Posn(1, 3), new Posn(9, 9), "App"),new Line(new Posn(1, 9), new Posn(5, 1), "App")], 
	[[new Line(new Posn(9, 3), new Posn(1, 9), "App"),new Line(new Posn(1, 3), new Posn(9, 3), "App"),new Line(new Posn(1, 3), new Posn(9, 9), "App"),new Line(new Posn(5, 1), new Posn(9, 9), "App"),new Line(new Posn(1, 9), new Posn(5, 1), "App")]], 
		new Restriction(3, 0), "Twinkle");

//level 14: Answer
Levels[14] = new Level([], [], new Restriction(99, 99), "Developer Level");

//level 15: Answer
Levels[15] = new Level([], [], new Restriction(99, 99), "Developer Level");

//level 16: Answer 'S'
Levels[16] = new Level([new Line(new Posn(7, 7), new Posn(7, 3), "App"),new Line(new Posn(3, 7), new Posn(3, 3), "App"),new Line(new Posn(5, 9), new Posn(7, 7), "App"),new Line(new Posn(5, 9), new Posn(3, 7), "App"),new Line(new Posn(3, 3), new Posn(5, 1), "App"),new Line(new Posn(7, 3), new Posn(5, 1), "App")], 
	[[new Line(new Posn(5, 6), new Posn(3, 5), "App"),new Line(new Posn(5, 7), new Posn(5, 6), "App"),new Line(new Posn(5, 4), new Posn(7, 5), "App"),new Line(new Posn(5, 3), new Posn(5, 4), "App"),new Line(new Posn(7, 7), new Posn(7, 3), "App"),new Line(new Posn(3, 7), new Posn(3, 3), "App"),new Line(new Posn(5, 9), new Posn(7, 7), "App"),new Line(new Posn(5, 9), new Posn(3, 7), "App"),new Line(new Posn(3, 3), new Posn(5, 1), "App"),new Line(new Posn(7, 3), new Posn(5, 1), "App")]], 
		new Restriction(4, 0), "S");

//level 17: Answer "Tetris"
Levels[17] = new Level([new Line(new Posn(2, 5), new Posn(2, 2), "App"),new Line(new Posn(0, 5), new Posn(2, 5), "App"),new Line(new Posn(1, 4), new Posn(0, 4), "App"),new Line(new Posn(1, 0), new Posn(1, 4), "App"),new Line(new Posn(3, 7), new Posn(3, 8), "App"),new Line(new Posn(1, 7), new Posn(3, 7), "App"),new Line(new Posn(1, 6), new Posn(1, 7), "App"),new Line(new Posn(1, 6), new Posn(0, 6), "App"),new Line(new Posn(3, 0), new Posn(3, 2), "App"),new Line(new Posn(5, 4), new Posn(4, 4), "App"),new Line(new Posn(4, 8), new Posn(4, 10), "App"),new Line(new Posn(2, 8), new Posn(4, 8), "App"),new Line(new Posn(2, 8), new Posn(0, 8), "App"),new Line(new Posn(1, 9), new Posn(1, 8), "App"),new Line(new Posn(3, 9), new Posn(1, 9), "App"),new Line(new Posn(3, 9), new Posn(3, 10), "App"),new Line(new Posn(3, 2), new Posn(1, 2), "App"),new Line(new Posn(3, 1), new Posn(4, 1), "App"),new Line(new Posn(6, 1), new Posn(6, 0), "App"),new Line(new Posn(5, 1), new Posn(6, 1), "App"),new Line(new Posn(4, 2), new Posn(4, 1), "App"),new Line(new Posn(5, 2), new Posn(4, 2), "App"),new Line(new Posn(5, 1), new Posn(5, 2), "App"),new Line(new Posn(5, 3), new Posn(5, 4), "App"),new Line(new Posn(5, 5), new Posn(6, 5), "App"),new Line(new Posn(5, 6), new Posn(5, 5), "App"),new Line(new Posn(4, 6), new Posn(5, 6), "App"),new Line(new Posn(4, 4), new Posn(4, 6), "App"),new Line(new Posn(6, 3), new Posn(5, 3), "App"),new Line(new Posn(6, 3), new Posn(6, 5), "App"),new Line(new Posn(6, 7), new Posn(6, 10), "App"),new Line(new Posn(6, 7), new Posn(9, 7), "App"),new Line(new Posn(10, 0), new Posn(0, 0), "App"),new Line(new Posn(10, 10), new Posn(10, 0), "App"),new Line(new Posn(0, 10), new Posn(10, 10), "App"),new Line(new Posn(0, 0), new Posn(0, 10), "App"),new Line(new Posn(0, 6), new Posn(0, 10), "App"),new Line(new Posn(0, 0), new Posn(3, 0), "App"),new Line(new Posn(6, 0), new Posn(4, 0), "App"),new Line(new Posn(7, 1), new Posn(7, 0), "App"),new Line(new Posn(7, 1), new Posn(8, 1), "App"),new Line(new Posn(9, 1), new Posn(8, 1), "App"),new Line(new Posn(9, 2), new Posn(9, 1), "App"),new Line(new Posn(10, 2), new Posn(9, 2), "App"),new Line(new Posn(8, 3), new Posn(8, 1), "App"),new Line(new Posn(9, 3), new Posn(8, 3), "App"),new Line(new Posn(9, 4), new Posn(9, 3), "App"),new Line(new Posn(10, 4), new Posn(9, 4), "App"),new Line(new Posn(9, 6), new Posn(10, 6), "App"),new Line(new Posn(9, 7), new Posn(9, 6), "App"),new Line(new Posn(6, 10), new Posn(9, 10), "App"),new Line(new Posn(7, 8), new Posn(10, 8), "App"),new Line(new Posn(7, 7), new Posn(7, 8), "App"),new Line(new Posn(10, 9), new Posn(10, 8), "App"),new Line(new Posn(9, 9), new Posn(10, 9), "App"),new Line(new Posn(9, 10), new Posn(9, 9), "App"),new Line(new Posn(8, 9), new Posn(8, 8), "App"),new Line(new Posn(7, 9), new Posn(8, 9), "App"),new Line(new Posn(7, 10), new Posn(7, 9), "App")], 
	[[new Line(new Posn(4, 9), new Posn(4, 10), "App"),new Line(new Posn(0, 9), new Posn(4, 9), "App"),new Line(new Posn(7, 7), new Posn(8, 7), "App"),new Line(new Posn(7, 9), new Posn(7, 7), "App"),new Line(new Posn(6, 9), new Posn(7, 9), "App"),new Line(new Posn(6, 9), new Posn(6, 10), "App"),new Line(new Posn(0, 7), new Posn(2, 7), "App"),new Line(new Posn(4, 5), new Posn(4, 6), "App"),new Line(new Posn(8, 6), new Posn(10, 6), "App"),new Line(new Posn(8, 8), new Posn(8, 6), "App"),new Line(new Posn(8, 8), new Posn(8, 10), "App"),new Line(new Posn(9, 9), new Posn(8, 9), "App"),new Line(new Posn(9, 7), new Posn(9, 9), "App"),new Line(new Posn(9, 7), new Posn(10, 7), "App"),new Line(new Posn(2, 7), new Posn(2, 9), "App"),new Line(new Posn(1, 7), new Posn(1, 6), "App"),new Line(new Posn(1, 4), new Posn(0, 4), "App"),new Line(new Posn(1, 5), new Posn(1, 4), "App"),new Line(new Posn(2, 6), new Posn(1, 6), "App"),new Line(new Posn(2, 5), new Posn(2, 6), "App"),new Line(new Posn(1, 5), new Posn(2, 5), "App"),new Line(new Posn(3, 5), new Posn(4, 5), "App"),new Line(new Posn(5, 5), new Posn(5, 4), "App"),new Line(new Posn(6, 5), new Posn(5, 5), "App"),new Line(new Posn(6, 6), new Posn(6, 5), "App"),new Line(new Posn(4, 6), new Posn(6, 6), "App"),new Line(new Posn(3, 4), new Posn(3, 5), "App"),new Line(new Posn(3, 4), new Posn(5, 4), "App"),new Line(new Posn(7, 4), new Posn(10, 4), "App"),new Line(new Posn(7, 4), new Posn(7, 1), "App"),new Line(new Posn(0, 0), new Posn(0, 10), "App"),new Line(new Posn(10, 0), new Posn(0, 0), "App"),new Line(new Posn(10, 10), new Posn(10, 0), "App"),new Line(new Posn(0, 10), new Posn(10, 10), "App"),new Line(new Posn(6, 10), new Posn(10, 10), "App"),new Line(new Posn(0, 10), new Posn(0, 7), "App"),new Line(new Posn(0, 4), new Posn(0, 6), "App"),new Line(new Posn(1, 3), new Posn(0, 3), "App"),new Line(new Posn(1, 3), new Posn(1, 2), "App"),new Line(new Posn(1, 1), new Posn(1, 2), "App"),new Line(new Posn(2, 1), new Posn(1, 1), "App"),new Line(new Posn(2, 0), new Posn(2, 1), "App"),new Line(new Posn(3, 2), new Posn(1, 2), "App"),new Line(new Posn(3, 1), new Posn(3, 2), "App"),new Line(new Posn(4, 1), new Posn(3, 1), "App"),new Line(new Posn(4, 0), new Posn(4, 1), "App"),new Line(new Posn(6, 1), new Posn(6, 0), "App"),new Line(new Posn(7, 1), new Posn(6, 1), "App"),new Line(new Posn(10, 4), new Posn(10, 1), "App"),new Line(new Posn(8, 3), new Posn(8, 0), "App"),new Line(new Posn(7, 3), new Posn(8, 3), "App"),new Line(new Posn(9, 0), new Posn(8, 0), "App"),new Line(new Posn(9, 1), new Posn(9, 0), "App"),new Line(new Posn(10, 1), new Posn(9, 1), "App"),new Line(new Posn(9, 2), new Posn(8, 2), "App"),new Line(new Posn(9, 3), new Posn(9, 2), "App"),new Line(new Posn(10, 3), new Posn(9, 3), "App")], [new Line(new Posn(4, 9), new Posn(3, 9), "App"),new Line(new Posn(6, 9), new Posn(6, 10), "App"),new Line(new Posn(10, 9), new Posn(6, 9), "App"),new Line(new Posn(3, 7), new Posn(2, 7), "App"),new Line(new Posn(3, 9), new Posn(3, 7), "App"),new Line(new Posn(4, 9), new Posn(4, 10), "App"),new Line(new Posn(10, 7), new Posn(8, 7), "App"),new Line(new Posn(6, 5), new Posn(6, 6), "App"),new Line(new Posn(2, 6), new Posn(0, 6), "App"),new Line(new Posn(2, 8), new Posn(2, 6), "App"),new Line(new Posn(2, 8), new Posn(2, 10), "App"),new Line(new Posn(1, 9), new Posn(2, 9), "App"),new Line(new Posn(1, 7), new Posn(1, 9), "App"),new Line(new Posn(1, 7), new Posn(0, 7), "App"),new Line(new Posn(8, 7), new Posn(8, 9), "App"),new Line(new Posn(9, 7), new Posn(9, 6), "App"),new Line(new Posn(9, 4), new Posn(10, 4), "App"),new Line(new Posn(9, 5), new Posn(9, 4), "App"),new Line(new Posn(8, 6), new Posn(9, 6), "App"),new Line(new Posn(8, 5), new Posn(8, 6), "App"),new Line(new Posn(9, 5), new Posn(8, 5), "App"),new Line(new Posn(7, 5), new Posn(6, 5), "App"),new Line(new Posn(5, 5), new Posn(5, 4), "App"),new Line(new Posn(4, 5), new Posn(5, 5), "App"),new Line(new Posn(4, 6), new Posn(4, 5), "App"),new Line(new Posn(6, 6), new Posn(4, 6), "App"),new Line(new Posn(7, 4), new Posn(7, 5), "App"),new Line(new Posn(7, 4), new Posn(5, 4), "App"),new Line(new Posn(3, 4), new Posn(0, 4), "App"),new Line(new Posn(3, 4), new Posn(3, 1), "App"),new Line(new Posn(10, 0), new Posn(10, 10), "App"),new Line(new Posn(0, 0), new Posn(10, 0), "App"),new Line(new Posn(0, 10), new Posn(0, 0), "App"),new Line(new Posn(10, 10), new Posn(0, 10), "App"),new Line(new Posn(4, 10), new Posn(0, 10), "App"),new Line(new Posn(10, 10), new Posn(10, 7), "App"),new Line(new Posn(10, 4), new Posn(10, 6), "App"),new Line(new Posn(9, 3), new Posn(10, 3), "App"),new Line(new Posn(9, 3), new Posn(9, 2), "App"),new Line(new Posn(9, 1), new Posn(9, 2), "App"),new Line(new Posn(8, 1), new Posn(9, 1), "App"),new Line(new Posn(8, 0), new Posn(8, 1), "App"),new Line(new Posn(7, 2), new Posn(9, 2), "App"),new Line(new Posn(7, 1), new Posn(7, 2), "App"),new Line(new Posn(6, 1), new Posn(7, 1), "App"),new Line(new Posn(6, 0), new Posn(6, 1), "App"),new Line(new Posn(4, 1), new Posn(4, 0), "App"),new Line(new Posn(3, 1), new Posn(4, 1), "App"),new Line(new Posn(0, 4), new Posn(0, 1), "App"),new Line(new Posn(2, 3), new Posn(2, 0), "App"),new Line(new Posn(3, 3), new Posn(2, 3), "App"),new Line(new Posn(1, 0), new Posn(2, 0), "App"),new Line(new Posn(1, 1), new Posn(1, 0), "App"),new Line(new Posn(0, 1), new Posn(1, 1), "App"),new Line(new Posn(1, 2), new Posn(2, 2), "App"),new Line(new Posn(1, 3), new Posn(1, 2), "App"),new Line(new Posn(0, 3), new Posn(1, 3), "App")]], 
		new Restriction(0, 2), "Remove the piece necessary to make it fit!");

//level 18: Answer
Levels[18] = new Level([], [], new Restriction(99, 99), "Developer Level");
