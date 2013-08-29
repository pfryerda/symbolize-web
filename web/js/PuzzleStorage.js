//level: [line] [puzzle] -> level
//A level contains the lines for the graph and an array of puzzle soluntions. Which contain the correct lines,  
//the neccecary rotation and then the details containing strings for the description and hints
function level(graph, puzzles) {
    "use strict";
    return {"getGraph" : graph, "getPuzzles" : puzzles};
}


//puzzle: solution details -> puzzle
function puzzle(soln, dets) {
    "use strict";
    return {"getSolution" : soln, "getDetails" : dets};
}

//solution: number [line] -> solution
function solution(roation, lines) {
    "use strict";
    return {"getSolutionRoation" : roation, "getSolutionLines" : lines};
}

//details: String String String String -> details
function details(description, hint1, hint2, hint3) {
    "use strict";
    return {"getDescription" : description, "getHint1" : hint1, "getHint2" : hint2, "getHint3" : hint3};
}

//line: posn posn -> line
function line(p1, p2) {
    "use strict";
    return {"p1" : p1, "p2" : p2};
}

//posn: number number -> posn
function posn(x, y) {
    "use strict";
    return {"x" : x, "y" : y};
}