//level: [line] [puzzle] -> level
//A level contains the lines for the graph and an array of puzzle soluntions. Which contain the correct lines,  
//the neccecary rotation and then the details containing strings for the description and hints
function Level(graph, puzzles) {
    "use strict";
    return {"graph" : graph, "puzzles" : puzzles};
}


//puzzle: solution details -> puzzle
function Puzzle(soln, dets) {
    "use strict";
    return {"solution" : soln, "details" : dets};
}

//solution: number [line] -> solution
function Solution(roation, lines) {
    "use strict";
    return {"solutionRoation" : roation, "solutionLines" : lines};
}

//details: String String String String -> details
function Details(description, hint1, hint2, hint3) {
    "use strict";
    return {"description" : description, "hint1" : hint1, "hint2" : hint2, "hint3" : hint3};
}

//line: posn posn -> line
function Line(p1, p2) {
    "use strict";
    return {"p1" : p1, "p2" : p2};
}

//posn: number number -> posn
function Posn(c, l) {
    "use strict";
    return {"x" : c, "y" : l};
}