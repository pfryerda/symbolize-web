//A module used to store all the levels in one array called Levels
//This module requires puzzleStorage.js
//Written by: Luke Brown


// An array containing all the Levels
var Levels = new Array();

Levels[0] = new Level([new Line(new Posn(3, 7), new Posn(5, 5)), new Line(new Posn(5, 5), new Posn(3, 3))],    // StartShape = '>'
    [
        new Puzzle(new Solution(180, [new Line(new Posn(3, 7), new Posn(5, 5)), new Line(new Posn(5, 5), new Posn(3, 3)), new Line(new Posn(5, 7), new Posn(5, 3))]),
            ["The 11th letter in the alphabet"]),                                                              // Answer = 'K'
        new Puzzle(new Solution(270, [new Line(new Posn(3, 7), new Posn(5, 5)), new Line(new Posn(5, 5), new Posn(3, 3)), new Line(new Posn(4, 6), new Posn(4, 4))]),
            []),                                                                                               // Answer = 'A'
        new Puzzle(new Solution(90, [new Line(new Posn(3, 7), new Posn(5, 5)), new Line(new Posn(5, 5), new Posn(3, 3)), new Line(new Posn(5, 5), new Posn(10, 5))]),
            [""])                                                                                              // Answer = 'Y'
    ]
    );