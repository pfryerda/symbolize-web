//A module used to store all the levels in one array called Levels
//Written by: Luke Brown

// An array containing all the Levels
//-----------------------------------

var Levels = new Array();


//Developer level:
Levels[0] = new Level([], [], new Restriction(99, 99), "Developer Level", "The answer is nothing");

 //Graph: '>' -> Solution: 'K'
Levels[1] = new Level([new Line(new Posn(1, 1), new Posn(5, 5), "App"), new Line(new Posn(5, 5), new Posn(1, 9), "App")],
    [new Line(new Posn(9, 1), new Posn(5, 5), "App"), new Line(new Posn(5, 5), new Posn(9, 9), "App"), new Line(new Posn(5, 1), new Posn(5, 9), "App")],
        new Restriction(1, 1), "Peter come up with a hint", "The 11th letter in the alphabet");

//Graph: '>' -> Solution: 'A'
Levels[2] = new Level([new Line(new Posn(1, 1), new Posn(5, 5), "App"), new Line(new Posn(5, 5), new Posn(1, 9), "App")],
    [],
        new Restriction(1, 0), "", "Your favourite grade!");

//Graph: '>' -> Solution: 'Y'
Levels[3] = new Level([new Line(new Posn(1, 1), new Posn(5, 5), "App"), new Line(new Posn(5, 5), new Posn(1, 9), "App")],
    [],
        new Restriction(1, 0), "", "");

