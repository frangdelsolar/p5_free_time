const ROWS = 4;
const COLS = 4;

let game;

function setup() {
    createCanvas(400, 400);
    console.log('2048');

    game = new Game(ROWS, COLS, 0, 0, 400, 400);
 
}

function draw() {
    background(0);

    game.run();


}