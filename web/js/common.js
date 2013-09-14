//A module used to store commonly used functions
//This module requires puzzles.js
//Written by: Luke Brown


//Helper Funcion
//----------------

//getErasedIndex: Posn Graph -> Number[0,∞)   Used only for removeLine
function getErasedIndex(p, g) {
    "use strict";
    var i;
    for (i = 0; i < g.length; i += 1) {
        if ((p === g[i].p1) || (p === g[i].p2)) { return i; }
    }
    return -1;
}

//midPoint: Line -> Posn
function midPoint(l) {
    "use strict";
    return new Posn((l.p1.x + l.p2.x) / 2, (l.p1.y + l.p2.y) / 2);
}

//distance: Line -> Number
function distanceFromOrigin(l) {
    "use strict";
    var mP = midPoint(l);
    return Math.sqrt(Math.pow(mP.x, 2) + Math.pow(mP.y, 2));
}

//lineLT: Line Line -> Bool
function lineLT(l1, l2) {
    "use strict";
    return distanceFromOrigin(l1) <= distanceFromOrigin(l2);
}

//graphEqual: Graph Graph -> Bool
function graphEqual(g1, g2) {
    "use strict";
    return g1.sort(lineLT) === g2.sort(lineLT);
}

//solutionEqual: Solution UserSolution -> Bool
function solutionEqual(s1, u) {
    "use strict";
    var s2 = u.solution;
    return ((s1.roation % 360) === (s2.roation % 360) && (s1.isFliped) === (s2.isFliped)
        && graphEqual(s1.sGraph, s2.sGraph));
}


//Getter functions
//----------------

//getLevel: Number -> Level
function getLevel(n) {
    "use strict";
    return Levels[n];
}

//getGraph: Level -> Graph
function getGraph(l) {
    "use strict";
    return l.graph;
}

//getDrawRestriction: Level -> Number[0,∞)
function getDrawRestriction(l) {
    "use strict";
    return l.restriction.draw;
}

//getEraseRestriction: Level -> Number[0,∞)
function getEraseRestriction(l) {
    "use strict";
    return l.restriction.erase;
}

//getHint1: Level -> String
function getHint1(l) {
    "use strict";
    return l.hint1;
}

//getHint2: Level -> String
function getHint1(l) {
    "use strict";
    return l.hint2;
}

//getSolutionFlip: Level -> Bool
function getSolutionFlip(l) {
    "use strict";
    return l.solution.isFliped;
}

//getSolutionRotation: Level -> Number[%90==0]
function getSolutionRotation(l) {
    "use strict";
    return l.solution.roation;
}

//getSolutionGraph: Level -> Graph
function getSolutionGraph(l) {
    "use strict";
    return l.solution.sGraph;
}
