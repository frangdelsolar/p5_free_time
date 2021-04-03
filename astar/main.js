let cols = 50;
let rows = 50;
let grid = new Array(cols);
let w;
let h;

let openSet = [];
let closedSet = [];
let start;
let end;


function removeFromArray(arr, elt){
    for (let i=arr.length-1; i>=0; i--){
        if (arr[i] == elt){
            arr.splice(i, 1);
        }
    }
}

function setup() {
    createCanvas(800, 800);
    console.log('A*');
   
    w = width/cols;
    h = height/rows;

    for (let i=0; i<cols; i++){
        grid[i] = new Array(rows);
    }

    for (let i=0; i<cols; i++){
        for (let j=0; j<rows; j++){
            grid[i][j] = new Spot(i, j);
        }
    }

    for (let i=0; i<cols; i++){
        for (let j=0; j<rows; j++){
            grid[i][j].addNeighbours();
        }
    }

    start = grid[0][0];
    end = grid[cols-1][rows-1];


    openSet.push(start);

}

function draw() {
    background(0);

    if (openSet.length > 0){

        let winner = 0;
        for (let i=0; i<openSet.length; i++){
            if (openSet[i].f < openSet[winner].f){
                winner = i;
            }
        }

        let current = openSet[winner];

        if (current === end){
            console.log('DONE!!!');
        }

        removeFromArray(openSet, current);
        closedSet.push(current);


    } else {
        console.log('No solution')
    }


    for (let i=0; i<cols; i++){
        for (let j=0; j<rows; j++){
            grid[i][j].show(color(255));
        }
    }

    for (let i=0; i<closedSet.length; i++){
        closedSet[i].show(color(255, 0, 0));
    }

    for (let i=0; i<openSet.length; i++){
        openSet[i].show(color(0, 255, 0));
    }
}