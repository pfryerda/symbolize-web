//A module used to store commonly used functions
//This module requires puzzles.js
//Written by: Luke Brown


//Helper Funcion
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
    return ((solution1.roation % 360) === (solution2.roation % 360) && (solution1.isFliped) === (solution2.isFliped)
        && graphEqual(solution1.sGraph, solution2.sGraph));
}


//Getter functions
//----------------

//getLevel: Number -> Level
function getLevel(n) {
    "use strict";
    return Levels[n];
}

//getGraph: Level -> Graph
function getGraph(level) {
    "use strict";
    return level.graph;
}

//getDrawRestriction: Level -> Number[0,∞)
function getDrawRestriction(level) {
    "use strict";
    return level.restriction.draw;
}

//getEraseRestriction: Level -> Number[0,∞)
function getEraseRestriction(level) {
    "use strict";
    return level.restriction.erase;
}

//getHint1: Level -> String
function getHint1(level) {
    "use strict";
    return level.hint1;
}

//getHint2: Level -> String
function getHint1(level) {
    "use strict";
    return level.hint2;
}

//getSolutionFlip: Level -> Bool
function getSolutionFlip(level) {
    "use strict";
    return level.solution.isFliped;
}

//getSolutionRotation: Level -> Number[%90==0]
function getSolutionRotation(level) {
    "use strict";
    return level.solution.roation;
}

//getSolutionGraph: Level -> Graph
function getSolutionGraph(level) {
    "use strict";
    return level.solution.sGraph;
}
