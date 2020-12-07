const fs = require('fs');

let input = fs.readFileSync("./input.txt", 'utf-8').split("\n\n");


function part1(){
    let sum = 0;
    for(let group of input){
        let charSet = new Set();
        for(let char of group){
            if(/([a-z])/.test(char)){
                charSet.add(char);
            }
        }
        sum += charSet.size;
    }
    console.log(sum)
}

function incrementOrSetTo1(map, key){
    if(map[key] == undefined) map[key] = 1;
    else map[key]++;
}

function part2(){
    let sum = 0;
    for(let group of input){
        let people = group.split("\n");
        let charMap = {};
        for(let person of people){
            for(let char of person){
                if(/([a-z])/.test(char)){
                    incrementOrSetTo1(charMap, char)
                }
            }
        }
        for(let char in charMap){
            if(charMap[char] == people.length) sum++;
        }
    }
    console.log(sum)
}

part1();
part2();