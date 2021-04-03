const width = 600;
const height = 300;
const fieldMinX = 10;
const fieldMaxX = width - 10;
const fieldMinY = 10;
const fieldMaxY = height - 10;
const fieldWidth = width - 20;
const fieldHeight = height - 20;
const porterMinY = height/3;
const porterHeight = height/3;
const porterMaxY = porterMinY + porterHeight;
const MUTATION = 0.01;

let ball;
let team0;
let team1;

let cycles = 0;
let generation = 1;
let cycP;
let genP;
let cycS;
let speedS;

function reset(){
    cycles = 0;

    ball = new Ball();

    team0.goals = 0;
    team1.goals = 0;


    team0.calcFitness();
    team1.calcFitness();

    team0.selection();
    team1.selection();

    generation++;
}

function setup(){
    createCanvas(width, height); 
    ball = new Ball();
    team0 = new Team(0, 11);
    team1 = new Team(1, 11);

    cycS = createSlider(100, 2000, 500);
    cycP = createP();
    genP = createP();
    speedS = createSlider(1, 500, 10);

    
}

function draw(){


    for (let i=0; i<speedS.value(); i++){
        if (cycles >= cycS.value() ){
            reset();
        }

        background(50, 150, 50);
        drawField();
        drawScore();

        ball.update();
        ball.show();

        team0.run();
        team1.run();

        cycles++;
    }

    team0.show();
    team1.show();
    ball.show();

    cycP.html(cycles);
    genP.html(generation);
}

function drawField(){
    noFill();
    stroke(200);
    strokeWeight(2);

    rect(fieldMinX, fieldMinY, fieldWidth, fieldHeight);
    line(width/2, 10, width/2, height-10);
    circle(width/2, height/2, height/4);

    rect(0, porterMinY, 10, porterHeight);
    rect(10, height/4, width/8, height/2);

    rect(width-10, porterMinY, 10, porterHeight);
    rect(width - width/8 - 10, height/4, width/8, height/2);
}

function drawScore(){
    textSize(38);
    noStroke();
    fill(team0.c);
    text(team0.goals + '/' + team0.total, 20, height-30);
    fill(team1.c);
    text(team1.goals + '/' + team1.total, width-80, height-30);
}

// function mousePressed(){
//     let angle = map(mouseX, 0, width, 0, 360);
//     let power = 4;
//     player.move(angle, power);
// }

// function keyPressed() {

//     if (keyCode == UP_ARROW) {
//         player.move(0, -2);
//     }
//     if (keyCode == DOWN_ARROW) {
//         player.move(0, 2);
//     }
//     if (keyCode == LEFT_ARROW) {
//         player.move(-2, 0);
//     }
//     if (keyCode == RIGHT_ARROW) {
//         player.move(2, 0);
//     }  

//     if (key == ' '){
//         player.plantBomb();
//     }


// }

// function keyReleased() {
//     player.release();
// }

