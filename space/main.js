let population;
let popsize = 500;
let enemies;
let dead = 0;
let generation = 0;
let genP;
let cycle = 0;
let cycleP;
let best_player_ever;
let bestP;
let slider;
let bullet = null;


const DISPLAY_WIDTH = 600;
const DISPLAY_HEIGHT = 300;

let pause = false;
let pauser;


function nextGeneration(){
    generation++;
    population.evaluate();
    population.selection();
    // population = new Population(popsize);

    dead = 0;
    cycle = 0;
}

function setup() {
    createCanvas(DISPLAY_WIDTH+600, DISPLAY_HEIGHT*1);
    population = new Population(popsize);
    cycleP = createP();
    genP = createP();
    bestP = createP();
    pauser = createP();
    slider = createSlider(1, 100, 1)

}

function draw() {
    background(0);
    // frameRate(100)

    for (let n=0; n<slider.value(); n++){
        cycle++;


        if (!pause){
            population.run();
        }

        if (dead >= population.size){
            nextGeneration();
        }
    }

    population.show();
    cycleP.html('Ciclo: ' + cycle);
    genP.html('Generation: ' + generation);
    bestP.html('Best Fitness: ' + best_player_ever.killed);
    pauser.html('Pausa: ' + pause);

}

function keyPressed() {
    if (key === ' ') {
        for(let sim of population.simulations){
            sim.shoot();
        }
    } else if (key === 'r'){
        nextGeneration();
    }

    if (keyCode  === ENTER) {
        if(!pause){
            pause = true;
        } else {
            pause = false;
        }
    }

  }