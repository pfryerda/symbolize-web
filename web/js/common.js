//A module used to store commonly used functions
//Written by: Luke Brown


//Storage Functions
//-----------------

//Graph = [Line]
//Move = Line | Number

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

//UserSolution: [Move] Solution Number[0,∞) Number[0,∞) -> UserSolution
function UserSolution(ms, s, d, e) {
    "use strict";
    return {"moves" : ms, "solution" : s, "linesDrawn" : d, "linesErased" : e};   //""  =>  Not set
}


//Helper Funcions
//----------------

//getErasedIndex: Posn Graph -> Number[0,∞)   Used only for removeLine in events.js
function getErasedIndex(point, graph) {
    "use strict";
    for (var i = 0; i < graph.length; i += 1) {
        if ((point === graph[i].p1) || (point === graph[i].p2)) { return i; }
    }
    return -1;
}

//midPoint: Line -> Posn
function midPoint(line) {
    "use strict";
    return new Posn((line.p1.x + line.p2.x) / 2, (line.p1.y + line.p2.y) / 2);
}

//distance: Line -> Number
function distanceFromOrigin(line) {
    "use strict";
    var midpoint = midPoint(line);
    return Math.sqrt(Math.pow(midpoint.x, 2) + Math.pow(midpoint.y, 2));
}

//lineLT: Line Line -> Bool
function lineLT(line1, line2) {
    "use strict";
    return distanceFromOrigin(line1) <= distanceFromOrigin(line2);
}

//graphEqual: Graph Graph -> Bool
function graphEqual(graph1, graph2) {
    "use strict";
    return graph1.sort(lineLT) === graph2.sort(lineLT);
}

//solutionEqual: Solution UserSolution -> Bool
function solutionEqual(solution1, usersolution) {
    "use strict";
    var solution2 = usersolution.solution;
    return ((solution1.roation % 360) === (solution2.roation % 360) && graphEqual(solution1.sGraph, solution2.sGraph))
        && (solution1.isFliped === "" || (solution1.isFliped) === (solution2.isFliped));
}
