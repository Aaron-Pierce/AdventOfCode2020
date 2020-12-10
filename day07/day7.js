const fs = require('fs');

let input = fs.readFileSync("./input.txt", 'utf-8').split("\n");




function addToAdjacencyMap(map, key, value){
    if(map[key] === undefined) map[key] = new Set([value]);
    else map[key].add(value);

}

function part1(){
    //like an adjacency matrix but easier
    let adjacencyMap = {
        "shiny gold": new Set()
    };

    //The map represents a directed graph.
    //Every bag points to the bags that contain it.
    //i.e. every child bag points to its parents.
    //this loop constructs the directed graph
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

    //if we start at shiny gold and dfs (or bfs or however you want to search)
    //Every unique bag we visit is a new bag that could possibly contain a gold bag
    //because we arrived at that bag by traversing through parent bags who contained a gold bag.
    //this will do a dfs and every time we visit a new node increment the counter
    let visitedCount = 0;
    function traverse(alreadyVisited, nodeName){
        if(alreadyVisited.has(nodeName)) return;
        visitedCount++;
        alreadyVisited.add(nodeName);
        if(adjacencyMap[nodeName]){
            adjacencyMap[nodeName].forEach(child => {
                traverse(alreadyVisited, child);
            })
        }
    }

    traverse(new Set(), "shiny gold")
    console.log(visitedCount - 1)
    //shiny gold bags cannot themselves carry a shiny gold bag.
    //the loop counts a shiny gold bag as a unique bag that is in the search, so it must contain a gold bag, 
    ///but it can't carry itself so we subtract one to fix that.
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

    //creates another graph of the opposite direction
    //every parent points to all of their children
    //each child is an instance of Bag, which contains the color
    //of the child bag and the number of that bag that is in the parent
    //so that you can multiply the number of its children by that value.
    //For example, if a red bag contains 3 yellow bags, we want to multiply
    //the number of bags inside the yellow bag by 3 to get the 
    //total number of children in red.
    
    //this loop constructs that graph
    for(let line of input){
        let split = line.split(" bags contain ");
        let bagColor = split[0];
        map[bagColor] = [];
        for(let bagString of split[1].split(", ")){
            const bagStrSplit = bagString.split(" ");
            let subBagAmount = parseInt(bagStrSplit)
            let subBagColor = bagStrSplit[1] + " " + bagStrSplit[2];
            //"wavy blue bag contains no other bags"
            //has color of "other bags."
            //so this is a hacky way to not include parents with no children.
            if(subBagColor == "other bags.") continue;
            map[bagColor].push(new Bag(subBagColor, subBagAmount));
        }
    }

    //every bag's value is the sum of the values of its children
    //So a bag that contains 4 red and 2 yellow has a value of 6 bags + 4(children in red) + 2(children in yellow)
    //this recursively computes that
    function traverse(bagName, bagAmount){
        let numberOfChildren = 0;
        if(map[bagName]){
            map[bagName].forEach(child => {
                numberOfChildren += child.amount*bagAmount;
                let traversedValue = bagAmount * traverse(child.color, child.amount);
                numberOfChildren += traversedValue;
            });
            return numberOfChildren;
        }
        return 0;
    }
    console.log(traverse("shiny gold", 1))
}

part2();