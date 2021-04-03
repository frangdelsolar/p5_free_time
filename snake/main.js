let snake;
let food;
let fr = 15;
let count = 0;
const SQSZ = 20;
const COLS = 30;
const ROWS = 30;
const WIDTH = SQSZ * COLS;
const WIDTH_EYE = WIDTH * 2;
const HEIGHT = SQSZ * ROWS;
let walls = [];

function setup (){
    createCanvas(WIDTH + WIDTH_EYE, HEIGHT);
    frameRate(fr)
    snake = new Snake();
    food = new Food();
}

function draw (){
    background(0);  
    walls = [];
    // screen limits
    walls.push(new Boundary(0, 0, WIDTH, 0, 'wall'));
    walls.push(new Boundary(WIDTH, 0, WIDTH, HEIGHT, 'wall'));
    walls.push(new Boundary(WIDTH, HEIGHT, 0, HEIGHT, 'wall'));
    walls.push(new Boundary(0, HEIGHT, 0, 0, 'wall'));

    //food boundaries
    walls.push(new Boundary(food.x1, food.y1, food.x2, food.y1, 'food'));
    walls.push(new Boundary(food.x2, food.y1, food.x2, food.y2, 'food'));
    walls.push(new Boundary(food.x2, food.y2, food.x1, food.y1, 'food'));
    walls.push(new Boundary(food.x1, food.y2, food.x1, food.y1, 'food'));

    // for (let wall of walls) {
    //     wall.show();
    // }


    snake.show();
    snake.update();
    food.show();

    if (snake.eat(food)){
        food.pickLocation();
        count ++;
    }

}

function keyPressed() {
    let dir = [];
    if (keyCode  === UP_ARROW) {
        dir = [0, -1]; 
        snake.move(dir);
        snake.particle.heading = radians(270);

    } else if (keyCode  === DOWN_ARROW){
        dir = [0, 1]; 
        snake.move(dir);
        snake.particle.heading = radians(90);


    } else if (keyCode  === LEFT_ARROW){
        dir = [-1, 0];
        snake.move(dir);
        snake.particle.heading = radians(180);


    } else if (keyCode  === RIGHT_ARROW){
        dir = [1, 0];
        snake.move(dir);
        snake.particle.heading = radians(0);

    }
  }