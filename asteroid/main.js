let score = 0;
let paddle;
let bricks = [];

function start(){
  paddle = new Paddle();
}

function setup() {

  createCanvas(800, 600);
  ding = loadSound('data/ding.mp3');

  ball = new Ball();

  let by = random(height); //height/5;
  let bx = random(width); //0;
  let bw = 40;
  let bh = 30;

  for(let i=0; i<width/bw; i++){
    by = random(height); //height/5;
    bx = random(width); //0;

    bricks.push(new Brick(bx, by, bw, bh));
    // bx += bw;
  }

  start();
}

function draw() {
  background(0);

  for (let brick of bricks){
    brick.show();
    ball.intersects(brick);
  }

  ball.update();
  ball.checkPaddle(paddle);
  ball.show();
  paddle.show();

  if(paddle.dead){
    start();
  }
  // paddle.execute();

  fill(255);
  textSize(36);
  text(paddle.score, 32, 40);


  if (keyIsDown(LEFT_ARROW)){
    paddle.move(-10);
  }

  if (keyIsDown(RIGHT_ARROW)){
    paddle.move(10);
  }

}
