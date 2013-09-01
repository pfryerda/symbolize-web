//A module used to define the basic JSON structures used for storing puzzles
//Written by: Luke Brown


//Level: Graph [Puzzle] -> Level
//A level contains the lines for the graph(As they appear at the start), and an array of puzzle soluntions. 
//Which contain the correct lines, the neccecary rotation, and then some hints
function Level(g, ps) {
    "use strict";
    return {"graph" : g, "puzzles" : ps};
}


//Puzzle: Solution [String] -> Puzzle
function Puzzle(soln, hs) {
    "use strict";
    return {"solution" : soln, "hints" : hs};
}

//Solution: Number[0,360) Graph -> Solution
function Solution(r, ls) {
    "use strict";
    return {"roation" : r, "sGraph" : ls};
}

//Line: Posn Posn -> Line
function Line(point1, point2) {
    "use strict";
    return {"p1" : point1, "p2" : point2};
}

//Posn: Number Number -> Posn
function Posn(c, l) {
    "use strict";
    return {"x" : c, "y" : l};
}

//Graph = [Line]