const fs = require('fs');
let input = fs.readFileSync("./input.txt", 'utf-8').split("\n");

function part1() {
    let instructionsRan = new Set();
    let index = 0;
    let acc = 0;
    while (true) {
        let keyValuePair = input[index].split(" ");

        if (keyValuePair[0] == "acc") {
            acc += parseInt(keyValuePair[1]);
        } else if (keyValuePair[0] == "jmp") {
            index += parseInt(keyValuePair[1]) - 1;
        }
        index++;

        if (instructionsRan.has(index)) {
            return acc;
        } else {
            instructionsRan.add(index);
        }
    }
}

console.log(part1());

//This solution is really bad.
//You should look at the next function instead,
//which is not so bad.
function part2(flipChoicesAlreadyTried) {
    let index = 0;
    let acc = 0;

    let visited = new Set();
    let flipped = false;
    while (index < input.length) {
        if (visited.has(index)) {
            // console.log("inf loop at "+ index);
            return part2(flipChoicesAlreadyTried)
        }


        visited.add(index);
        let keyValuePair = input[index].split(" ");
        let delta = 0;
        if (keyValuePair[0] === "jmp") {
            delta = parseInt(keyValuePair[1]);
        } else if (keyValuePair[0] === "acc") {
            acc += parseInt(keyValuePair[1]);
            delta = 1;
        } else if (keyValuePair[0] === "nop") {
            delta = 1;
        }

        if (keyValuePair[0] === "nop" || keyValuePair[0] === "jmp") {
            if (!flipChoicesAlreadyTried.has(index) && !flipped) {
                if (keyValuePair[0] === "jmp") {
                    delta = 1;
                } else if (keyValuePair[0] === "nop") {
                    delta = parseInt(keyValuePair[1]);
                }
                flipChoicesAlreadyTried.add(index);
                flipped = true;
            }
        }
        index += delta;
    }


    return acc;
}

console.log(part2(new Set()));


function computeDelta(keyValuePair) {
    if (keyValuePair[0] === "jmp") return parseInt(keyValuePair[1]);
    return 1;
}

//The idea of this one is to start from the bottom of the list
//and assign every element that can immediately terminate the sequence to have
//a score of Infinity, then set every node's score equal to the score of the node it points to
//so any node with score Infinity is in a terminating sequence.
//So flipping a jmp or nop if that would put us onto
//an Infinity track will always give a solution.
function part2BetterSolution() {
    let scores = new Array(input.length);

    //helper method, read the comments for the for loop after this first.
    function scoreNode(index, visited) {
        //if we've already scored the node, just return the score
        if(scores[index] !== undefined) return scores[index];

        //If we come on an infinite loop while trying to assign scores, all elements in the list have the same score.
        //Because it looped, it must not be infinity because the loop would have terminated
        //so this must be an infinite loop, and we should score every element -1.
        if (visited.indexOf(index) !== -1) return -1;
        let delta = computeDelta(input[index].split(" "));
        visited.push(index)
        //If the score of the next element has already been computed, use it
        //otherwise we need to scoreNode it.
        let score = scores[index + delta] ?? scoreNode(index + delta, visited);
        scores[index] = score;
        return score;
    }

    //Starts from the bottom of the list.
    //Every element's 'score' is the best element that it can reach.
    //The only possible scores are Infinity (the element's sequence will terminate the sequence)
    //or -1 (following the element's sequence results in an infinite loop)
    for (let i = input.length - 1; i >= 0; i--) {
        let keyValuePair = input[i].split(" ");
        //if the next instruction you would run would terminate the sequence
        //give the node a score of Infinity
        if (i + computeDelta(keyValuePair) >= input.length) scores[i] = Infinity;
        //If you can't immediately get to Infinity, maybe it's somewhere down the path,
        //so we set the score to the score of the next element, just in case that element can get to Infinity.
        //however, we may not have assigned that a score yet, so we run scoreNode to recursively fill in scores as we need them
        else scores[i] = scoreNode(i, []);
    }


    //once we have an array of scores, any jump or nop that can be flipped to get to an element with Infinity is immediately a solution
    let index = 0;
    let acc = 0;
    while (index < input.length) {
        let keyValuePair = input[index].split(" ");

        //For each jump or nop, see what would happen if we flipped it.
        let proposedDelta;
        if (keyValuePair[0] === "jmp" || keyValuePair[0] === "nop") {
            proposedDelta = keyValuePair[0] === "jmp" ? 1 : parseInt(keyValuePair[1]);
        }

        
        if (scores[index + proposedDelta] === Infinity && scores[index] !== Infinity) {
            // if that flip would put you onto an Infinity element, and you aren't already infinity,
            //just skip right to that next Infinity node
            index += proposedDelta;
        } else {
            //This node is either an acc or flipping it does us no good,
            //so we walk as normal
            if (keyValuePair[0] === "acc") {
                acc += parseInt(keyValuePair[1]);
                index++;
            } else if (keyValuePair[0] === "nop") {
                index++;
            } else if (keyValuePair[0] === "jmp") {
                index += parseInt(keyValuePair[1]);
            }
        }
    }
    return acc;
}

console.log(part2BetterSolution());


console.log("------- Is this solution actually more efficient? ----------");

let startTime = Date.now();
console.log(startTime)
for (let i = 0; i < 1000; i++) {
    part2(new Set());
}
let endTime = Date.now();
console.log("part2 took " + (endTime - startTime) + "ms");


let startTime2 = Date.now();
console.log(startTime2)
for (let i = 0; i < 1000; i++) {
    part2BetterSolution();
}
let endTime2 = Date.now();
console.log("part2better took " + (endTime2 - startTime2) + "ms");

//Approximately a 2.5x speedup. Less than I was expecting.