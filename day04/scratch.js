const fs = require('fs');

let input = fs.readFileSync("./input.txt", 'utf-8');


function part1() {
    let rules = [/^byr:/, /^iyr:/, /^eyr:/, /^hgt:/, /^hcl:/, /^ecl:/, /^pid:/];

    return input
        .split("\n\n")
        .map(line => line.split("\n").join(" ").split(" "))
        .filter(passport => rules.every(rule => passport.some(field => rule.test(field))))
        .length;
}

console.log(part1())