const fs = require('fs');

let input = fs.readFileSync("./input.txt", 'utf-8').split("\n");

function part1() {
    let valid = 0;
    //O(m*n)
    for (let inputLine of input) {
        let line = inputLine.split(": ");
        let characters = new Array(26).fill(0);

        for (let character of line[1]) {
            characters[character.charCodeAt(0) - 97]++;
        }
        let mustContain = line[0].charCodeAt(line[0].length - 1);
        let bound = line[0].split("-");
        valid += parseInt(bound[0]) <= characters[mustContain - 97] && characters[mustContain - 97] <= parseInt(bound[1]);
    }
}

function part2(){
    //O(n)
    let valid = 0;
    for(let inputLine of input){
        let line = inputLine.split(": ");
        line[0] = line[0].split(" ");
        line[0][0] = line[0][0].split("-");
        
        let occurances = 0;
        occurances += line[1].charAt(line[0][0][0] - 1) == line[0][1];
        occurances += line[1].charAt(line[0][0][1] - 1) == line[0][1];

        valid += occurances == 1;
    }
    console.log(valid)
}

part2();