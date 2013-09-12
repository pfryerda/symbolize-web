//A module used to define the basic JSON structures used for storing puzzles
//Written by: Luke Brown


//Graph = [Line]

//Level: Graph [Puzzle] -> Level
//A level contains the lines for the graph(As they appear at the start), and an array of puzzle solutions. 
//Which contain the correct lines, the neccecary rotation, and then some hints
function Level(g, ps) {
    "use strict";
    return {"graph" : g, "puzzles" : ps};
}


//Puzzle: Solution Restriction String String -> Puzzle
function Puzzle(soln, res, h1, h2) {
    "use strict";
    return {"solution" : soln, "restriction" : res, "hint1" : h1, "hint2" : h2};
}

//Restriction: Number[0,∞) Number[0,∞) -> Restriction
function Restriction(d, e) {
    "use strict";
    return {"draw" : d, "erase" : e};
}

//Solution: Number[%90==0] Bool Graph -> Solution
function Solution(r, f, ls) {
    "use strict";
    return {"roation" : r, "isFliped" : f, "sGraph" : ls};
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


//UserSolution: UserSolution Solution UserSolution -> UserSolution
function UserSolution(b, s, f) {
    "use strict";
    return {"back" : b, "solution" : s, "forward" : f};
}