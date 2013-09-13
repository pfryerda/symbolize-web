//A module used to store all the levels in one array called Levels
//This module requires puzzleStorage.js
//Written by: Luke Brown


//Variable Declaration
//-------------------

var gameCanvas, ctx, scaling, Levels, currLevelNum, currLevel, currSoln, inDrawMode, inEraseMode;

gameCanvas = document.getElementById("gameCanvas");         //Canvas
ctx = gameCanvas.getContext("2d");                          //Context
scaling = 50; //Note this number still need to be decided!  //Max number for the width and height of the graph

currLevelNum = 1;                                                             //Defaults level 1
currLevel = Levels[currLevelNum - 1];                                         //Defaults level 1
currSoln = new UserSolution("", new Solution(0, false, currLevel.graph), ""); //Defaults level 1

inDrawMode = true;                                                            //Defaults Draw  Mode enabled
inEraseMode = !inDrawMode;                                                    //Defaults Erase Mode disabled


// An array containing all the Levels
//-----------------------------------

Levels = new Array();


 //Graph: '>' -> Solution: 'K'
Levels[0] = new Level([new Line(new Posn(5, 5), new Posn(25, 25)), new Line(new Posn(25, 25), new Posn(5, 45))],
    new Solution(180, false, [new Line(new Posn(5, 5), new Posn(25, 25)), new Line(new Posn(25, 25), new Posn(5, 45)), new Line(new Posn(25, 5), new Posn(25, 45))]),
        new Restriction(1, 0), "", "The 11th letter in the alphabet");

//Graph: '>' -> Solution: 'A'
Levels[1] = new Level([new Line(new Posn(5, 5), new Posn(25, 25)), new Line(new Posn(25, 25), new Posn(5, 45))],
    new Solution(270, false, [new Line(new Posn(5, 5), new Posn(25, 25)), new Line(new Posn(25, 25), new Posn(5, 45)), new Line(new Posn(15, 15), new Posn(15, 35))]),
        new Restriction(1, 0), "", "Your favourite grade!");

//Graph: '>' -> Solution: 'Y'
Levels[2] = new Level([new Line(new Posn(5, 5), new Posn(25, 25)), new Line(new Posn(25, 25), new Posn(5, 45))],
    new Solution(90, false, [new Line(new Posn(5, 5), new Posn(25, 25)), new Line(new Posn(25, 25), new Posn(5, 45)), new Line(new Posn(25, 25), new Posn(50, 25))]),
        new Restriction(1, 0), "", "");

