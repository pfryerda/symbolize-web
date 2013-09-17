//A module used to store all the levels in one array called Levels
//This module requires common.js
//Written by: Luke Brown

// An array containing all the Levels
//-----------------------------------

var Levels = new Array();


 //Graph: '>' -> Solution: 'K'
Levels[0] = new Level([new Line(new Posn(5, 5), new Posn(25, 25)), new Line(new Posn(25, 25), new Posn(5, 45))],
    [new Line(new Posn(5, 5), new Posn(25, 25)), new Line(new Posn(25, 25), new Posn(5, 45)), new Line(new Posn(25, 5), new Posn(25, 45))],
        new Restriction(1, 0), "Peter come up with a hint", "The 11th letter in the alphabet");

//Graph: '>' -> Solution: 'A'
Levels[1] = new Level([new Line(new Posn(5, 5), new Posn(25, 25)), new Line(new Posn(25, 25), new Posn(5, 45))],
    [new Line(new Posn(5, 5), new Posn(25, 25)), new Line(new Posn(25, 25), new Posn(5, 45)), new Line(new Posn(15, 15), new Posn(15, 35))],
        new Restriction(1, 0), "", "Your favourite grade!");

//Graph: '>' -> Solution: 'Y'
Levels[2] = new Level([new Line(new Posn(5, 5), new Posn(25, 25)), new Line(new Posn(25, 25), new Posn(5, 45))],
    [new Line(new Posn(5, 5), new Posn(25, 25)), new Line(new Posn(25, 25), new Posn(5, 45)), new Line(new Posn(25, 25), new Posn(50, 25))],
        new Restriction(1, 0), "", "");

