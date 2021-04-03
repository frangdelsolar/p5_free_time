let population;
let popsize = 16;
let fr = 15;
let pause = false;
let manual = false;
let cycle = 1;
let cycler;
let lives = 100;
let count = 0;
let counter;
let death = 0;
let slider;

let best_snake_ever = 0;
let bester;



// Canvas
const WIDTH = 800;
const HEIGHT = 400;
const ROWS = 30;
const COLS = 30;
const MULTIPLO = 4;
const DISPLAY_ELEMENTS = 4 * MULTIPLO; // multiplo de 4
const DISPLAY_WIDTH = (WIDTH/2) / (DISPLAY_ELEMENTS/MULTIPLO);
const DISPLAY_HEIGHT = HEIGHT / (DISPLAY_ELEMENTS/MULTIPLO);
const SQSZ = DISPLAY_WIDTH/COLS;


function nextGeneration(){
    cycle++;
    population.evaluate();
    // population.reproduce();
    population.selection();
    count = 0;
}

function setup (){
    createCanvas(WIDTH, HEIGHT);
    frameRate(fr);
    population = new Population(popsize);
    counter = createP();
    cycler = createP();
    bester = createP();
    slider = createSlider(1, 1000, 1);
}

function draw (){
    background(0);  

    for (let n=0; n<slider.value(); n++){
        if(!pause){
            count++;
            population.run();


            let display_deaths = 0;
            for (let board of population.display){
                if (board.snake.death){
                    display_deaths++;
                }
            }
            if(display_deaths >= population.display.length){
                nextGeneration();
            }

        }
        counter.html('Ciclos: ' + count);
        cycler.html('Generation: ' + cycle);
        bester.html('Best length: ' +  best_snake_ever.tail.length);

    }

    
    population.show();




}

function keyPressed() {

    let dir = [];

    if (key === ' ') {
        if(!pause){
            pause = true;
        } else {
            pause = false;
        }
    } else if (key === 'm') {
        if(!manual){
            manual = true;
        } else {
            manual = false;
        }
    } else if (key === 'r'){
        nextGeneration();
    } else if (key === 's'){

        saveJSON(best_snake_ever.brain, 'snake.json');
    }

    if (keyCode  === UP_ARROW) {
        dir = [-1, 0]; 
        population.move(dir);
    } else if (keyCode  === DOWN_ARROW){
        dir = [1, 0]; 
        population.move(dir);
    } else if (keyCode  === LEFT_ARROW){
        dir = [0, -1];
        population.move(dir);
        // population.goLeft();

    } else if (keyCode  === RIGHT_ARROW){
        dir = [0, 1];
        population.move(dir);
        // population.goRight();
    }
  }