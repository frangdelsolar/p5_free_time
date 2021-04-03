let game;

function setup() {
  createCanvas(400, 400);
  game = new Game();
}


function draw() {
    frameRate(game.speed);
    background(51);

    game.display();
    game.run();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
      game.current.moveUp();
  } else if (keyCode  === DOWN_ARROW){
      game.current.moveDown();
  } else if (keyCode  === LEFT_ARROW){
      game.current.moveLeft();
  } else if (keyCode  === RIGHT_ARROW){
      game.current.moveRight();
  } else if (keyCode === ENTER){
      game.onHold();
  }

  if (key == ' '){
    game.current.rotate();
  }
}