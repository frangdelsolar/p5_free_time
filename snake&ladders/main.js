const SQUARE_SIZE = 60;
const BOARD_SIZE = 20; // must be odd
const LINK_AMOUNT = 20; // BOARD_SIZE/2;
let board = [];
let player = new Player();

function getLadderEnd(current){
    let nextIndex = floor(random(current.index, board.length));
    let nextTile = board[nextIndex];

    // if (nextTile.row === current.row){
    //     return null;
    // }

    return nextTile;
}


function setup() {
    createCanvas(SQUARE_SIZE*BOARD_SIZE, SQUARE_SIZE*BOARD_SIZE);
    
    // BOARD SETUP
    let index = 1;
    let boardIndex = 0;
    for (let i = BOARD_SIZE-1; i >= 0; i--) {
        if (i % 2 == 0){
            for (let j = 0; j < BOARD_SIZE; j++){
                board.push(new Tile(i, j, boardIndex, index));
                index++;
                boardIndex++;
            }  
        } else {
            for (let j = BOARD_SIZE-1; j >= 0; j--){
                board.push(new Tile(i, j, boardIndex, index));
                index++;
                boardIndex++;
            }             
        }
             
    }

    // LINKS SETUP
    // ladders
    for (let i = 0; i < LINK_AMOUNT; i++){
        let first = random(board);
        let dir = random([1, -1]); 
        let link = null;
        if (dir > 0) {
            if (first.boardIndex < board.length-BOARD_SIZE){
                link = floor(random(first.boardIndex+1, board.length-1)) * dir;
                first.link = link - first.boardIndex;
            }
        } else {
            if (first.boardIndex > BOARD_SIZE){
                link = floor(random(1, first.boardIndex)) * dir;
                console.log(first, link)
                first.link = link;
            }

        }

    }

}

function draw (){
    frameRate(10);
    background(0);
    for (let tile of board) {
        tile.show();
    }
    for (let tile of board) {
        tile.showLinks();
    }

    player.show()

    player.rollDie();
}