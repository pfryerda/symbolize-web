//A module used to store commonly used functions
//This module requires puzzles.js
//Written by: Luke Brown


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

//getPuzzle: Level number -> Puzzle
function getPuzzle(l, n) {
    "use strict";
    return l.puzzles[n];
}


//getHints: Puzzle -> [String]
function getHints(p) {
    "use strict";
    return p.hints;
}

//getSolutionRotation: Puzzle -> Number[0,360)
function getSolutionRotation(p) {
    "use strict";
    return p.solution.roation;
}

//getSolutionGraph: Puzzle -> Graph
function getSolutionGraph(p) {
    "use strict";
    return p.solution.sGraph;
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
