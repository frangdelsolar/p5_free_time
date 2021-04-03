let population;
let lanes = [];

let WIN_WIDTH = 800;
let height = 800;
let scl = WIN_WIDTH/20;

let count=0;
let lifespan = 200;
let countP;
let gen = 1;
let genP;

let deadToll;

function reset(){
    // frog = new Frog(WIN_WIDTH/2, height-scl*1, scl, scl, color(0, 255, 0, 200));
}

function setup(){
    createCanvas(WIN_WIDTH, height); 
    countP = createP();
    genP = createP();

    lanes[0] = new Lane(0, true);
    lanes[1] = new Lane(1, false, 'bay'); 

    for (let i=2; i<8; i++){
        lanes[i] = new Lane(i, false, 'log');
    }

    lanes[8] = new Lane(8, false, 'bay'); 


    lanes[9] = new Lane(9, true);

    for (let i=10; i<14; i++){
        lanes[i] = new Lane(i, false, 'car');
    }

    lanes[14] = new Lane(14, true);

    for (let i=15; i<19; i++){
        lanes[i] = new Lane(i, false, 'car');
    }

    lanes[19] = new Lane(19, true);

    // reset();
    population = new Population();


}

function draw(){
    // frameRate(5)
    count++;
    countP.html('Cicles: ' + count);
    genP.html('Gen: ' + gen);
    background(51);

    deadToll = 0;
    for (let frog of population.agents){
        if (frog.dead){
            deadToll++;
        }
    }

    count++;
    if (deadToll >= population.popsize){
        console.log('NextGen');
        // population = new Population();
        population.evaluate();
        population.selection();
        count = 0;
        gen++;
    }

    for (let lane of lanes){
        lane.update();
        lane.display();
    }

    population.run();

}


function keyPressed() {

    if (keyCode == UP_ARROW) {
        dir = [0, -1];
    } else if (keyCode == DOWN_ARROW) {
        dir = [0, 1];
    } else if (keyCode == LEFT_ARROW) {
        dir = [-1, 0];
    } else if (keyCode == RIGHT_ARROW) {
        dir = [1, 0];
    }  

    for (let frog of population.agents){
        frog.move(dir);
    }
}
