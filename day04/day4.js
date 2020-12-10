const fs = require('fs');

let input = fs.readFileSync("./input.txt", 'utf-8').split("\n\n");

function part1(){

    let ids =  ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
    let valid = 0;
    for(let line of input){
        let v = true;
        for(let i of ids){
            if(line.indexOf(i) === -1) v = false;
        }
        if(v) valid++;
    }
    return valid;
}

function part2(){
    //counts one invalid passport as valid somewhere.
    let valid = 0;
    let validators = {
        "byr": e => 1920 <= e && e <= 2020,
        "iyr": e => 2010 <= e && e <= 2020,
        "eyr": e => 2020 <= e && e <= 2030,
        "hgt": e => {
            let unit = e.substr(e.length - 2);
            if(unit == "cm") return 150 <= e.substr(0, e.length-2) && e.substr(0, e.length-2) <= 193;
            if(unit == "in") return 59 <= e.substr(0, e.length-2) && e.substr(0, e.length-2) <= 76;
            return false; 
        },
        "hcl": e => e.charAt(0) == "#" && e.length == 7 && /([A-Zg-z])/.test(e) == false,
        "ecl": e => {
            let colors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
            let matches = 0;
            for(let c of colors){
                if(e.indexOf(c) !== -1) matches++;
            }
            return matches === 1;
        },
        "pid": e => {
            return e.length===9 && /([A-Za-z])/.test(e) === false
        },
        "cid": e => true
    }
    for(let line of input){
        let matches = 0;
        for(let pair of line.replaceAll("\n", " ").split(" ")){
            let keyvaluepair = pair.split(":");
            matches += validators[keyvaluepair[0]](keyvaluepair[1])
        }
        if(matches === 8 || (matches === 7 && line.indexOf("cid") === -1)) valid++;
    }
    return valid;
}

console.log(part1());
console.log(part2());