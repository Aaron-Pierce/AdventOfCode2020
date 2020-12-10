const fs = require('fs');
let input = fs.readFileSync("./input.txt", 'utf-8').split("\n");

class Set25{
    constructor(arr=[]){
        this.arr = [];
        this.map = {};
    }

    add(elem){
        if(this.arr.length < 25){
            this.arr.push(elem);
            this.map[elem] = true;
        }else{
            let removed = this.arr.shift();
            this.map[removed] = false;
            this.arr.push(elem);
            this.map[elem] = true;
        }
    }

    contains(elem){
        if(map[elem]) return true;
        return false;
    }
}


function part1(){
    let last25 = new Set25();
    for(let i = 0; i < input.length; i++){
        if(i < 25){
            last25.add(parseInt(input[i]));
        }else{
            let inputNumber = parseInt(input[i]);
            // console.log("Now checking inputNumber ", inputNumber);
            let foundCorrespondingNumber = false;
            for(let elem of last25.arr){
                let mapResult = last25.map[parseInt(inputNumber - elem) + ""]; 
                if(mapResult && mapResult != inputNumber){
                    foundCorrespondingNumber = true;
                    break;
                }
            }

            if(!foundCorrespondingNumber){
                console.log("Not a sum ", inputNumber);
                return;
            }

            last25.add(parseInt(input[i]))   
        }
    }
}
part1();


function part2(){
    let inputCopy = [...input];
    let invalidNumber = 70639851;
    // inputCopy = inputCopy.sort((a, b) => parseInt(a) - parseInt(b));
    inputCopy = inputCopy.map(e => parseInt(e))

    for(let size = 2; size <= inputCopy.length; size++){
        for(let offset = 0; offset < inputCopy.length - (size - 1); offset++){
            let sum = 0;
            let min = Infinity;
            let max = -Infinity;
            for(let i = offset; i <= size + offset; i++){
                sum += inputCopy[i];
                min = inputCopy[i] < min ? inputCopy[i] : min;
                max = inputCopy[i] > max ? inputCopy[i] : max;
            }
            if(sum == invalidNumber) return max + min;
        }
    }
}
console.log(part2());