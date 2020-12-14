const fs = require('fs');
let input = fs.readFileSync("./input.txt", 'utf-8').split("\n");

function getAdjacentIndexes(x, y, matrix){
    let pairs = [];
    const modifiers = [-1, 0, 1];
    for(let m1 of modifiers){
        for(let m2 of modifiers){
            if(m1 === m2 && m2 === 0) continue;
            let pair = [x + m1, y + m2];
            if(pair[0] >= 0 && pair[1] >= 0 && pair[0] < matrix.length && pair[1] < matrix[x].length){
                pairs.push(pair);
            }
        }
    }
    return pairs;
}

function deepCopy(matrix){
    let toReturn = [];
    for(let row of matrix){
        toReturn.push([...row]);
    }
    return toReturn;
}

function part1(){
    let copyMatrix = [...input].map(e => e.split(""));
    let dummyMatrix = [...input].map(e => e.split(""));
    let changes = 0;
    function step(){
        for(let rowIndex = 0; rowIndex < copyMatrix.length; rowIndex++){
            for(let colIndex = 0; colIndex < copyMatrix[rowIndex].length; colIndex++){
                let neighborIndices = getAdjacentIndexes(rowIndex, colIndex, copyMatrix);
                let occupiedNeighbors = 0;
                for(let pair of neighborIndices){
                    // console.log(pair);
                    if(copyMatrix[pair[0]][pair[1]] === "#"){
                        occupiedNeighbors++;
                    }
                }
                
                if(copyMatrix[rowIndex][colIndex] === "#" && occupiedNeighbors >= 4){
                    dummyMatrix[rowIndex][colIndex] = "L";
                    changes++;
                }else if(copyMatrix[rowIndex][colIndex] === "L" && occupiedNeighbors === 0){
                    dummyMatrix[rowIndex][colIndex] = "#";
                    changes++;
                }
            }
        }
    }
    do{
        changes = 0;
        step();
        copyMatrix = deepCopy(dummyMatrix);
    }while(changes != 0)

    let count = 0;
    for(let row of copyMatrix){
        for(let el of row){
            if(el === "#") count++;
        }
    }
    console.log(count);
}
part1();


function getSightIndices(x, y, matrix){
    let pairs = [];
    const modifiers = [-1, 0, 1];
    for(let m1 of modifiers){
        for(let m2 of modifiers){
            if(m1 === m2 && m2 === 0) continue;
            let position = [x + m1, y + m2];
            while(matrix[position[0]] && matrix[position[0]][position[1]] && matrix[position[0]][position[1]] === "."){
                position[0] += m1;
                position[1] += m2;
            }
            if(matrix[position[0]] && matrix[position[0]][position[1]]){
                pairs.push(position);
            }
        }
    }
    return pairs;
}

function part2(){
    let copyMatrix = [...input].map(e => e.split(""));
    let dummyMatrix = [...input].map(e => e.split(""));
    let changes = 0;
    function step(){
        for(let rowIndex = 0; rowIndex < copyMatrix.length; rowIndex++){
            for(let colIndex = 0; colIndex < copyMatrix[rowIndex].length; colIndex++){
                let neighborIndices = getSightIndices(rowIndex, colIndex, copyMatrix);
                let occupiedNeighbors = 0;
                for(let pair of neighborIndices){
                    // console.log(pair);
                    if(copyMatrix[pair[0]][pair[1]] === "#"){
                        occupiedNeighbors++;
                    }
                }
                
                if(copyMatrix[rowIndex][colIndex] === "#" && occupiedNeighbors >= 5){
                    dummyMatrix[rowIndex][colIndex] = "L";
                    changes++;
                }else if(copyMatrix[rowIndex][colIndex] === "L" && occupiedNeighbors === 0){
                    dummyMatrix[rowIndex][colIndex] = "#";
                    changes++;
                }
            }
        }
    }
    do{
        changes = 0;
        step();
        copyMatrix = deepCopy(dummyMatrix);
    }while(changes != 0)

    let count = 0;
    for(let row of copyMatrix){
        for(let el of row){
            if(el === "#") count++;
        }
    }
    console.log(count);
}
part2();