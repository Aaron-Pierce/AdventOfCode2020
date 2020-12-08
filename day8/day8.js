const fs = require('fs');
const { start } = require('repl');
const { isDeepStrictEqual } = require('util');

let input = fs.readFileSync("./input.txt", 'utf-8').split("\n");

function part1(){
    let instructionsRan = new Set();
    let index = 0;
    let acc = 0;
    while(true){
        let keyValuePair = input[index].split(" ");

        if(keyValuePair[0] == "acc"){
            acc += parseInt(keyValuePair[1]);
        }else if(keyValuePair[0] == "jmp"){
            index += parseInt(keyValuePair[1]) - 1;
        }
        index++;

        if(instructionsRan.has(index)){
            return acc;
        }else{
            instructionsRan.add(index);
        }
    }
}

console.log(part1());


function part2(flipChoicesAlreadyTried){
    let index = 0;
    let acc = 0;

    let visited = new Set();
    let flipped = false;
    while(index < input.length){
        if(visited.has(index)){
            // console.log("inf loop at "+ index);
            return part2(flipChoicesAlreadyTried)
        }


        visited.add(index);
        let keyValuePair = input[index].split(" ");
        let delta = 0;
        if(keyValuePair[0] === "jmp"){
            delta = parseInt(keyValuePair[1]);
        }else if(keyValuePair[0] === "acc"){
            acc += parseInt(keyValuePair[1]);
            delta = 1;
        }else if(keyValuePair[0] === "nop"){
            delta = 1;
        }
        
        if(keyValuePair[0] === "nop" || keyValuePair[0] === "jmp"){
            if(!flipChoicesAlreadyTried.has(index) && !flipped){
                //try to change this
                if(keyValuePair[0] === "jmp"){
                    delta = 1;
                }else if(keyValuePair[0] === "nop"){
                    delta = parseInt(keyValuePair[1]);
                }
                flipChoicesAlreadyTried.add(index);
                flipped = true;
                console.log("flipped at index " + index)
            }
        }
        index += delta;
    }

    
    return acc;
}

console.log(part2(new Set()));