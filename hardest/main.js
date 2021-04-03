let level;
let player;
let cycle;
let geneLength = 50;
let generation = 0;
let cycleP;
let genP;
let slider;

let population;


function reset(){
    generation++;
    level = new Level();

    if (generation % 5 == 0){
        geneLength += 10;
    }
    population.evaluate();
    population.selection();
    cycle = 0;

}

function setup(){
    createCanvas(800, 300); 
    level = new Level();

    population = new Population(level);
    cycle = 0;
    generation = 1;
    cycleP = createP();
    genP = createP();
    slider = createSlider(1, 300, 1);

}

function draw(){
    background(51);
    for (let n=0; n<slider.value(); n++){
        cycleP.html(cycle);
        genP.html(generation)

        level.showBackground();

        level.update();
        level.showDots();

        population.run();

        let deadtoll = 0;
        for(let p of population.players){
            if (p.dead){
                deadtoll++;
            }
        }
        if (deadtoll == population.popsize || cycle >= geneLength-1){
            reset();
        }

        cycle++;
    }

    population.show()
}


function keyPressed() {
    reset();

    // if (keyCode == UP_ARROW) {
    //     player.move(0, -1);
    // }
    // if (keyCode == DOWN_ARROW) {
    //     player.move(0, 1);
    // }
    // if (keyCode == LEFT_ARROW) {
    //     player.move(-1, 0);
    // }
    // if (keyCode == RIGHT_ARROW) {
    //     player.move(1, 0);
    // }  


}

// function keyReleased() {
//     player.release();
// }

