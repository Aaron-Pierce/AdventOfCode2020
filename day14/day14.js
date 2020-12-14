const fs = require('fs');
const { moveMessagePortToContext } = require('worker_threads');
let input = fs.readFileSync("./input.txt", 'utf-8').split("\n");

function reverseString(str){
    return str.split("").reverse().join("");
}

function part1(){
    let mask = "";
    let memory = {
        
    }
    for(let line of input){
        let pair = line.split(" = ");
        if(pair[0] === "mask") mask = pair[1];
        else{
            let binaryString = (parseInt(pair[1]) >>> 0).toString(2);
            // console.log("parsedIn", binaryString);
            let toCreate = "";
            // console.log(binaryString);
            for(let i = 1; i <= mask.length; i++){
                let maskChar = mask.charAt(mask.length - i);
                if(maskChar !== "X"){
                    toCreate += maskChar
                }else{
                    if(i > binaryString.length){
                        toCreate += "0"
                    }
                    toCreate += binaryString.charAt(binaryString.length - i);
                }
            }
            toCreate = reverseString(toCreate);
            let index = pair[0].split("mem[")[1].replace("]", "");
            memory[index] = parseInt(toCreate, 2)
            // console.log("Placed at index", index, memory[index]);
        }
    }

    let sum = 0;
    for(let key in memory){
        sum += memory[key]
    }
    console.log(sum);
}
part1();


function part2(){
    let memory = {};
    let mask = "";
    for(let line of input){
        let pair = line.split(" = ");
        if(pair[0] === "mask") mask = pair[1];
        else{
            let value = parseInt(pair[1]);
            let baseAddress = pair[0].split("mem[")[1].replace("]", "");
            let binaryString = (parseInt(baseAddress) >>> 0).toString(2);
            let paddedAddress = "0".repeat(mask.length - binaryString.length) + binaryString;

            if(paddedAddress.length != mask.length){
                console.log(paddedAddress.length, mask.length, mask.length - baseAddress.length);
                console.error("Lengths don't match");
            }

            let toCreate = "";
            for(let i = 0; i < paddedAddress.length; i++){
                if(mask.charAt(i) === "0"){
                    toCreate += paddedAddress.charAt(i);
                }else if(mask.charAt(i) === "1"){
                    toCreate += "1";
                }else{
                    //wildcard
                    toCreate += "X";
                }
            }
            
            let addresses = [];
            function createAll(add){
                for(let i = 0; i < add.length; i++){
                    if(add.charAt(i) === "X"){
                        let copy = add.split("");
                        copy[i] = "1";
                        createAll(copy.join(""));
                        copy[i] = "0";
                        createAll(copy.join(""));
                        return;
                    }
                }

                //reached end of string
                addresses.push(add);
            }
            createAll(toCreate);
            for(let a of addresses){
                memory[parseInt(a, 2)] = value;
            }
        }
    }
    let sum = 0;
    for(let key in memory){
        sum += memory[key]
    }
    console.log(sum);
}
part2();