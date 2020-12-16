const fs = require('fs');
let input = fs.readFileSync("./input.txt", 'utf-8').split(",");

function part1(){
    let map = {};
    for(let i = 0; i < input.length; i++){
        map[input[i]] = i+1;
    }

    console.log("starting:", map);
    let number = input[input.length - 1];
    for(let i = input.length; i < 30000000; i++){
        let toSpeak = 0;
        if(map[number] === undefined){
            // console.log("first time we've seen " + number);
            //speak 0
            toSpeak = 0;
        }else{
            // console.log("last saw " + number + " at " + map[number]);
            toSpeak = i - map[number];
        }
        map[number] = i;
        console.log(i - 30000000);
        number = toSpeak;
        // console.log("Turn " + (i+1) + " spoke: ", number);
    }
    console.log(number);
}
part1();


function part2(){

}
part2();
