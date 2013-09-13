//A module used to store all the levels in one array called Levels
//This module requires puzzleStorage.js
//Written by: Luke Brown


//Variable Declaration
//-------------------

var gameCanvas, ctx, scaledWidth, Levels, currLevelNum, currLevel, currSoln;

gameCanvas = document.getElementById("gameCanvas");                       //Canvas
ctx = c.getContext("2d");                                                 //Context
scaledWidth = 100;      //Note this number still need to be decided!      //Max number for the width and height of the graph

currLevelNum = 1;                                                         //Defaults level 1
currLevel = Levels[currLevelNum - 1];                                     //Defaults level 1
currSoln = UserSolution("", Solution(0, false, getGraph(currLevel)), ""); //Defaults level 1


// An array containing all the Levels
//-----------------------------------

Levels = new Array();


 //Graph: '>' -> Solution: 'K'
Levels[0] = new Level([new Line(new Posn(10, 10), new Posn(50, 50)), new Line(new Posn(50, 50), new Posn(10, 90))],
	new Solution(180, false, [new Line(new Posn(10, 10), new Posn(50, 50)), new Line(new Posn(50, 50), new Posn(10, 90)), new Line(new Posn(50, 10), new Posn(50, 90))]),
		new Restriction(1, 0), "", "The 11th letter in the alphabet");

//Graph: '>' -> Solution: 'A'
Levels[1] = new Level([new Line(new Posn(10, 10), new Posn(50, 50)), new Line(new Posn(50, 50), new Posn(10, 90))],
	new Solution(270, false, [new Line(new Posn(10, 10), new Posn(50, 50)), new Line(new Posn(50, 50), new Posn(10, 90)), new Line(new Posn(30, 30), new Posn(30, 70))]),
		new Restriction(1, 0), "", "Your favourite grade!");

//Graph: '>' -> Solution: 'Y'
Levels[2] = new Level([new Line(new Posn(10, 10), new Posn(50, 50)), new Line(new Posn(50, 50), new Posn(10, 90))],
	new Solution(180, false, [new Line(new Posn(10, 10), new Posn(50, 50)), new Line(new Posn(50, 50), new Posn(10, 90)), new Line(new Posn(50, 50), new Posn(100, 50))]),
		new Restriction(1, 0), "", "");

