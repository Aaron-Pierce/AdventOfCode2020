const fs = require('fs');

let input = fs.readFileSync("./input.txt", 'utf-8').split("\n").map(e => parseInt(e));
function part1(){
    let elems = {}
    for(let e of input){
        elems[e] = true;
    
        if(elems[2020 - e]) return(e*2020-e**2)
    }
}


function part2(){
    let twoSums = {};
    for(let a of input){
        for(let b of input){
            twoSums[a+b] = [a, b];
        }
    }

    for(let elem of input){
        if(twoSums[2020-elem]) return(elem*twoSums[2020-elem][0]*twoSums[2020-elem][1]);
    }
}

console.log(part1(), part2());