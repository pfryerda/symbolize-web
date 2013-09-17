//A module used to store commonly used functions
//Written by: Luke Brown


//Storage Functions
//-----------------

//Graph = [Line]
//Move = Line | Number

//Level: Graph Graph Restriction String String -> Level
//A level contains the lines for the graph(As they appear at the start), a restriction to number of allowed
//lines drawn and erased, two hints, and a solution Which contain the correct lines, the neccecary rotation, 
//and then some weather it needs to be fliped.
function Level(g, soln, res, h1, h2) {
    "use strict";
    return {"graph" : g, "solution" : soln, "restriction" : res, "hint1" : h1, "hint2" : h2};
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

//UserSolution: Graph Number[0,∞) Number[0,∞) [Move] -> UserSolution
function UserSolution(s, d, e, ms) {
    "use strict";
    return {"solution" : s, "linesDrawn" : d, "linesErased" : e, "moves" : ms};
}


//Helper Funcions
//----------------

//map: (X->Y) [X] -> [Y]
function map(f, lst) {
    "use strict";
    var newlst = new Array();
    for (var i = 0;i < lst.length; i++){
        newlst[i] = f(lst[i]);
    }
    return newlst;
}

//to5: Number -> Number
function to5(n) {
    return (5*(Math.round(n/5)));
}

//scalePoint: Number -> Number -> Number -> Number -> Posn
function scalePoint(point_x, point_y, scaling, canvaslength){
    "use strict";
    return new Posn(to5((point_x - 25) * (scaling / canvaslength)), to5(( point_y - 68) * (scaling / canvaslength)));
}

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

//distanceFromOrigin: Line -> Number
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

//solutionEqual: Level UserSolution -> Bool
function solutionEqual(level, usersolution) {
    "use strict";
    var solution2 = usersolution.solution;
    return graphEqual(level.solution, usersolution.solution);

}
