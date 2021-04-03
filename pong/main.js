let paddles = [];
let leftscore = 0;
let rightscore = 0;

const WIDTH = 800;
const WIDTH_EYE = WIDTH * 2;
const HEIGHT = 600;
let walls;

function setup() {

  createCanvas(800, 600);
  ding = loadSound('data/ding.mp3');

  ball = new Ball();
  left = new Paddle(25);
  right = new Paddle(width-25);
  
  paddles.push(left);
  paddles.push(right);

}

function draw() {
  background(0);

  ball.update();
  ball.checkLeft(left);
  ball.checkRight(right);


  ball.show();

  left.show();
  right.show();

  if(left.dead){
    left = new Paddle(left.x); //, left.brain);
    // left.brain.mutate(0.1);

  }

  if(right.dead){
    right = new Paddle(right.x); //, right.brain);
    // right.brain.mutate(0.1);

  }
  right.execute();
  left.execute();

  fill(255);
  textSize(36);
  text(left.score, 32, 40);
  text(right.score, width-64, 40);



  if (keyIsDown(code = 87)){
    left.move(-10);
  }

  if (keyIsDown(code = 83)){
    left.move(10);
  }

  if (keyIsDown(UP_ARROW)){
    right.move(-10);
  }

  if (keyIsDown(DOWN_ARROW)){
    right.move(10);
  }

}
