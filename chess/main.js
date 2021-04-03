let board = new Board;
let SQUARE_SIZE = 100;
let players = [];

function setup (){
    createCanvas(SQUARE_SIZE*8, SQUARE_SIZE*8); 

    players.push(new Player(255))
    players.push(new Player(0))

}

function draw(){
    background(100);

    // Actualizar el tablero
    board.begin();
    for (let player of players){    
        for (let piece of player.set){
            console.log(piece)
            // console.log(board.grid[0][0]);
        }
    }


    board.show();

}