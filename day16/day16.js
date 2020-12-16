const { SSL_OP_NO_TICKET } = require('constants');
const fs = require('fs');
let input = fs.readFileSync("./input.txt", 'utf-8').split("\n\n");
// console.log(input);

function withinRange(number, range){
    return range[0] <= number && number <= range[1];
}

function part1(){
    let rangeInput = input[0].split("\n");
    let ranges = [];
    for(let rangeString of rangeInput){
        // console.log(rangeString);
        rangeList = rangeString.split(": ")[1].split(" or ");
        // console.log(rangeList);
        let rangePair = [];
        for(let r of rangeList){
            let numbers = r.split("-");
            rangePair.push([parseInt(numbers[0]), parseInt(numbers[1])]);
        }
        ranges.push(rangePair)
    }

    let nearbyInput = input[2].split("\n");
    let errorSum = 0;
    for(let line of nearbyInput){
        let numbers = line.split(",").map(e => parseInt(e));
        for(let n of numbers){
            // console.log(n);
            let isError = true;
            for(let r of ranges){
                if(withinRange(n, r[0]) || withinRange(n, r[1]) ){
                    isError = false;
                    break;
                }
            }
            if(isError && !isNaN(n)){
                errorSum += n;
            }
        }
    }
    console.log(errorSum);
}
part1();


//requires discarded invalid lines.
//was done destrucively during the event, not in the code.
function part2(){
    let rangeInput = input[0].split("\n");
    let ranges = {};
    let names = new Array(input[2].split("\n")[0].split(",").length);
    for(let rangeString of rangeInput){
        let rangeSplit = rangeString.split(": ")
        let rangeList = rangeSplit[1].split(" or ");
        let rangeName = rangeSplit[0];
        for(let i = 0; i < names.length; i++){
            let n = names[i];
            if(n === undefined) names[i] = [rangeName]
            else n.push(rangeName)
        }
        let rangePair = [];
        for(let r of rangeList){
            let numbers = r.split("-");
            rangePair.push([parseInt(numbers[0]), parseInt(numbers[1])]);
        }
        ranges[rangeName] = rangePair;
    }
    
    let nearbyInput = input[2].split("\n");
    for(let line of nearbyInput){
        let ticket = line.split(",").map(e => parseInt(e));
        for(let numberIndex = 0; numberIndex < ticket.length; numberIndex++){
            let number = ticket[numberIndex];
            for(let rangeName in ranges){
                let range = ranges[rangeName];
                // console.log(range);
                if(withinRange(number, range[0]) || withinRange(number, range[1])){

                }else{
                    console.log(number, "not in range of", range);
                    let namePool = names[numberIndex];
                    if(namePool.indexOf(rangeName) !== -1)
                        namePool.splice(namePool.indexOf(rangeName), 1);
                }
            }
        }
    }
    let nameIndices = [];
    let nameCache = [...names]
    for(let i = 0; i < names.length; i++){
        nameIndices.push(i);
    }
    nameIndices.sort((a, b) => names[a].length - names[b].length);
    console.log("nameindicies", nameIndices);
    names.sort((a, b) => a.length - b.length);
    // console.log(names);

    for(let i = 0; i < names.length; i++){
        if(names[i].length !== 1){
            console.log("Wasnt length 1", names[i]);
        }

        for(let j = i+1; j < names.length; j++){
            names[j].splice(names[j].indexOf(names[i][0]), 1)
        }
    }
    console.log(names);

    let myTicket = input[1].split(",").map(e => parseInt(e));
    console.log(myTicket);
    let product = 1;
    let iters = 0;
    for(let i = 0; i < names.length; i++){
        if(names[i][0].indexOf("departure") !== -1){
            // console.log("Value: " + myTicket[i]);
            console.log("Index of ", i);
            product *= myTicket[nameIndices[i]]
            // console.log(ranges, names[i][0]);
            if(withinRange(myTicket[i], ranges[names[i][0]][0]) || withinRange(myTicket[i], ranges[names[i][0]][1])){}
            else{
                console.log("Outside range must be wrong");
            }
            iters++;
        }
    }
    console.log(product);
    console.log("Ran " + iters + " times");
}
part2();