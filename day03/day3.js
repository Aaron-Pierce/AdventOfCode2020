const fs = require('fs');

let input = fs.readFileSync("./input.txt", 'utf-8').split("\n");


function part1(){
    let trees = 0;
    let index = 0;
    for(let line of input){
        if(line.charAt(index % line.length) == "#") trees++;
        index += 3;
    }
    console.log(trees)
}

function part2(dS, rS){
    let trees = 0;
    let index = 0;

    for(let i = 0; i < input.length; i += dS){
        let line = input[i];
        if(line.charAt(index % line.length) == "#") trees++;
        index += rS;
    }
    return trees
}

part1();
console.log(
part2(1, 1)*
part2(1, 3)*
part2(1, 5)*
part2(1, 7)*
part2(2, 1))