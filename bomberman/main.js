let level;
let player;



function reset(){
}

function setup(){
    createCanvas(400, 400); 
    level = new Level();
    player = new Player();


}

function draw(){
    background(50, 150, 50);

    level.update();
    level.show();

    player.update();
    player.show();

}

function mousePressed(){
    console.log(mouseX, mouseY);
}

function keyPressed() {

    if (keyCode == UP_ARROW) {
        player.move(0, -2);
    }
    if (keyCode == DOWN_ARROW) {
        player.move(0, 2);
    }
    if (keyCode == LEFT_ARROW) {
        player.move(-2, 0);
    }
    if (keyCode == RIGHT_ARROW) {
        player.move(2, 0);
    }  

    if (key == ' '){
        player.plantBomb();
    }


}

function keyReleased() {
    player.release();
}

