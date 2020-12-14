const fs = require('fs');
let input = fs.readFileSync("./input.txt", 'utf-8').split("\n");

function part1() {
    let facing = "E";
    const directions = ["N", "E", "S", "W"];
    let posX = 0;
    let posY = 0;

    function moveDirection(direction, amount) {
        if (direction === "N") posY += amount;
        else if (direction === "S") posY -= amount;
        else if (direction === "E") posX += amount;
        else if (direction === "W") posX -= amount;
    }

    for (let line of input) {
        let direction = line.charAt(0);
        let amount = parseInt(line.substr(1));

        if (directions.includes(direction)) {
            moveDirection(direction, amount);
        } else {
            if (direction === "F") {
                moveDirection(facing, amount);
            }else if(direction === "R" || direction === "L"){
                let steps = amount / 90 * (direction === "L" ? -1 : 1);
                let newIndex = (directions.indexOf(facing) + steps) % directions.length;
                if(newIndex < 0) newIndex = directions.length + newIndex;
                facing = directions[newIndex];
            }
        }
    }
    console.log(Math.abs(posX) + Math.abs(posY))
}
part1();


function part2() {
    let facing = "E";
    const directions = ["N", "E", "S", "W"];
    let posX = 0;
    let posY = 0;
    let waypointX = 10;
    let waypointY = 1;

    function moveDirection(direction, amount) {
        if (direction === "N") waypointY += amount;
        else if (direction === "S") waypointY -= amount;
        else if (direction === "E") waypointX += amount;
        else if (direction === "W") waypointX -= amount;
    }

    for (let line of input) {
        let direction = line.charAt(0);
        let amount = parseInt(line.substr(1));

        if (directions.includes(direction)) {
            moveDirection(direction, amount);
        } else {
            if (direction === "F") {
                posX += amount * (waypointX);
                posY += amount * (waypointY);
            }else if(direction === "R" || direction === "L"){
                let steps = amount / 90 * (direction === "L" ? 1 : -1);
                if(steps < 0){
                    //rotates to the right
                    steps = 3 * Math.abs(steps);
                    //3 left rotations is one right rotation
                }
                console.log("Stepping ", steps, "times");
                let offset = [waypointX - 0, waypointY - 0];
                for(let i = 0; i < steps; i++){
                    offset = [-offset[1], offset[0]];
                }
                waypointX = offset[0];
                waypointY = offset[1];
            }
        }
    }
    console.log(Math.abs(posX) + Math.abs(posY))
    console.log(waypointX, waypointY);
}
part2();