//A module used to define the basic JSON structures used for storing puzzles
//Written by: Luke Brown


//Graph = [Line]

//Level: Graph Solution Restriction String String -> Level
//A level contains the lines for the graph(As they appear at the start), a restriction to number of allowed
//lines drawn and erased, two hints, and a solution Which contain the correct lines, the neccecary rotation, 
//and then some weather it needs to be fliped.
function Level(g, soln, res, h1, h2) {
    "use strict";
    return {"graph" : g, "solution" : soln, "restriction" : res, "hint1" : h1, "hint2" : h2};
}

//Solution: Number[%90==0] Bool Graph -> Solution
function Solution(r, f, sg) {
    "use strict";
    return {"rotation" : r, "isFliped" : f, "sGraph" : sg};  //isFliped === ""  =>  doesn't matter
}

//Restriction: Number[0,∞) Number[0,∞) -> Restriction
function Restriction(d, e) {
    "use strict";
    return {"draw" : d, "erase" : e};
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
    return {"back" : b, "solution" : s, "forward" : f};   //""  =>  Not set
}