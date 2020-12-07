const fs = require('fs');

let input = fs.readFileSync("./input.txt", 'utf-8').split("\n");




function addToAdjacencyMap(map, key, value){
    if(map[key] === undefined) map[key] = new Set([value]);
    else map[key].add(value);

}

function part1(){
    let adjacencyMap = {
        "shiny gold": new Set()
    };

    for(let line of input){
        let split = line.split(" bags contain ");
        let bagColor = split[0];
        for(let bagString of split[1].split(", ")){
            const bagStrSplit = bagString.split(" ");
            let subBagColor = bagStrSplit[1] + " " + bagStrSplit[2];
            if(subBagColor == "other bags.") continue;
            addToAdjacencyMap(adjacencyMap, subBagColor, bagColor);
        }
    }

    let visitedCount = 0;
    function traverse(alreadyVisited, nodeName){
        if(alreadyVisited.has(nodeName)) return;
        visitedCount++;
        alreadyVisited.add(nodeName);
        console.log(nodeName)
        if(adjacencyMap[nodeName]){
            adjacencyMap[nodeName].forEach(child => {
                traverse(alreadyVisited, child);
            })
        }
    }

    traverse(new Set(), "shiny gold")
    console.log(visitedCount - 1)  //shiny gold bags cannot themselves carry a shiny gold bag.
}

part1();

class Bag{
    constructor(color, amount){
        this.color = color;
        this.amount = amount;
    }
}

function part2(){
    let map = {};

    for(let line of input){
        let split = line.split(" bags contain ");
        let bagColor = split[0];
        map[bagColor] = [];
        for(let bagString of split[1].split(", ")){
            const bagStrSplit = bagString.split(" ");
            let subBagAmount = parseInt(bagStrSplit)
            let subBagColor = bagStrSplit[1] + " " + bagStrSplit[2];
            if(subBagColor == "other bags.") continue;
            map[bagColor].push(new Bag(subBagColor, subBagAmount));
        }
    }
    console.log(map)

    function traverse(bagName, bagAmount){
        let numberOfChildren = 0;
        if(map[bagName]){
            map[bagName].forEach(child => {
                numberOfChildren += child.amount*bagAmount;
                console.log(child.color)
                let traversedValue = bagAmount * traverse(child.color, child.amount);
                console.log(traversedValue)
                numberOfChildren += traversedValue;
            });
            return numberOfChildren;
        }
        return 0;
    }
    console.log(traverse("shiny gold", 1))
}

part2();