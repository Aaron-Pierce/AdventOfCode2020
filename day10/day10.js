const fs = require('fs');
let input = fs.readFileSync("./input.txt", 'utf-8').split("\n");

function part1(){
    let joltage = 0;
    let inputCopy = input.map(a => parseInt(a)).sort((a, b) => a - b);
    let diff1Count = 0;
    let diff3Count = 1; //last jump is always 3
    for(let i of inputCopy){
        if(joltage - i === -1) diff1Count++;
        if(joltage - i === -3) diff3Count++;
        joltage = i;
    }
    console.log(diff1Count * diff3Count);
}

part1();

function factorial(n){
    if(n === 0) return 1;
    return n * factorial(n-1);
}

function addToMap(map, key, value){
    if(map[key]) map[key].push(value);
    else map[key] = [value];
}

function part2(){
    let inputCopy = input.map(a => parseInt(a)).sort((a, b) => a - b);
    let choiceMap = {};
    for(let i = 0; i < inputCopy.length; i++){
        let adapterValue = inputCopy[i];
        if(adapterValue <= 3){
            addToMap(choiceMap, 0, adapterValue);
        }

        for(let j = 1; j <= 3; j++){
            if(inputCopy[i + j] - adapterValue <= 3 ){
                addToMap(choiceMap, adapterValue, inputCopy[i + j]);
            }
        }
    }
    console.log(choiceMap);


    let cache = {};

    function getPossibilities(value){
        if(cache[value] !== undefined) return cache[value];
        if(!choiceMap[value]){
            cache[value] = 1;
            return 1;
        }else{
            let count = 0;
            for(let child of choiceMap[value]){
                count += getPossibilities(child);
            }
            cache[value] = count;
            return count;
        }
    }

    console.log(getPossibilities(0));
}
part2();