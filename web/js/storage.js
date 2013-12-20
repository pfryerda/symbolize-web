//A Module used to store the basic storage functions
//Written by : Luke Brown

//Storage Functions
//-----------------

//Graph = [Line]
//Move = Line || Number

//Level: Graph Graph Restriction String -> Level
//A level contains the lines for the graph(As they appear at the start), a restriction to number of allowed
//lines drawn and erased, two hints, and a solution Which contain the correct lines, the neccecary rotation, 
//and then some weather it needs to be fliped.
function Level(g, soln, res, h) {
    "use strict";
    return {"graph" : g, "solution" : soln, "restriction" : res, "hint" : h};
}

//Restriction: Number[0,∞) Number[0,∞) -> Restriction
function Restriction(d, e) {
    "use strict";
    return {"draw" : d, "erase" : e};
}

//Line: Posn Posn String -> Line
function Line(point1, point2, info) {
    "use strict";
    return {"p1" : point1, "p2" : point2, "owner" : info};
}

//Posn: Number Number -> Posn
function Posn(c, l) {
    "use strict";
    return {"x" : c, "y" : l};
}

//UserSolution: Graph Number[0,∞) Number[0,∞) [Move] -> UserSolution
function UserSolution(s, d, e, ms) {
    "use strict";
    return {"solution" : s, "linesDrawn" : d, "linesErased" : e, "moves" : ms};
}
