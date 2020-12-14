const fs = require('fs');
let input = fs.readFileSync("./input.txt", 'utf-8').split("\n");

function part1() {
    let departTime = parseInt(input[0]);
    let buses = input[1].split(",").filter(e => e !== "x").map(e => parseInt(e));
    console.log(departTime, buses);
    let minTime = Infinity;
    let bestBus = buses[0];
    for (let b of buses) {
        let closestDepartureToTime = b * Math.ceil(departTime / b);
        if (closestDepartureToTime < minTime) {
            minTime = closestDepartureToTime;
            bestBus = b;
        }
    }
    return (minTime - departTime) * bestBus
}
