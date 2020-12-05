const fs = require('fs');

let input = fs.readFileSync("./input.txt", 'utf-8').split("\n");

function splitInterval(interval, useUpperHalf){
    let range = interval[1] - interval[0];
    let halfOfRange = Math.floor(range / 2) + 1;
    if(useUpperHalf){
        interval[0] +=  halfOfRange;
    }else{
        interval[1] -= halfOfRange
    }
}

function computeId(line){
    let rowString = line.substr(0, 7);
    let seatString = line.substr(7);

    let rowInterval = [0, 127];
    let seatInterval = [0, 7];

    for(let char of rowString){
        splitInterval(rowInterval, char === "B");
    }

    for(let char of seatString){
        splitInterval(seatInterval, char === "R");
    }
    let seatId = rowInterval[0]*8 + seatInterval[0];
    return seatId;
}

function part1(){
    let maxValue = -Infinity;
    for(let line of input){
        let seatId = computeId(line);
        if(seatId > maxValue) maxValue = seatId;
    }
    console.log(maxValue)
}
part1();


function part2(){
    let ids = [];
    for(let line of input){
       ids.push(computeId(line));
    }
    
    ids.sort((a, b) => a-b);

    for(let i = 1; i < ids.length; i++){
        if(ids[i-1] != ids[i] - 1){
            console.log(ids[i] - 1)
        }
    }   
}
part2();

function incrementOrSetTo1(map, key){
    if(map[key] === undefined) map[key] = 1;
    else map[key]++;
}


function part2Oofn(){
    let ids = [];
    for(let line of input){
       ids.push(computeId(line));
    }
    
    let map = {};

    for(let id of ids){
        incrementOrSetTo1(map, id+1);
        incrementOrSetTo1(map, id-1);
    }
    
    let keySet = Object.keys(map);
    let valuesOf1 = [];
    for(let index in keySet){
        if(index > 1 && index < keySet.length - 2){
            if(map[keySet[index]] == 1){
                valuesOf1.push(keySet[index]);
            }
        }
    }
    
    if(valuesOf1.length == 2 && parseInt(valuesOf1[0]) + 2 == valuesOf1[1]){
        console.log("match!")
        console.log(parseInt(valuesOf1[0]) + 1)
    }else{
        console.error("no match found")
    }
}
part2Oofn();