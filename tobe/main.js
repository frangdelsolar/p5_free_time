let target;
let population;

function setup(){
    createCanvas(400, 800);

    target = "Francisco Javier";
    maxpop = 150;
    mutation = 0.02;
    
    population = new Population(target, maxpop, mutation); 

}

function draw(){
    background(255);
    population.calcFitness();
    population.select();
    population.evaluate();
    population.show();

    if (population.found){
        noLoop();
    }

}