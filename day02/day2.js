const fs = require('fs');

let input = fs.readFileSync("./input.txt", 'utf-8').split("\n");

function part1() {
    let valid = 0;
    //O(m*n)
    for (let inputLine of input) {
        let line = inputLine.split(": ");
        let occurances = 0;
        let mustContain = line[0].charAt(line[0].length - 1);
        for (let character of line[1]) {
            occurances += character == mustContain;
        }
        
        let bound = line[0].split("-");
        valid += parseInt(bound[0]) <= occurances && occurances <= parseIntW(bound[1]);
    }
    console.log(valid)
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
part1();
part2();