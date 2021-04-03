// let sudoku;
let population;


function setup(){
    createCanvas(600, 600);
    // sudoku = new Sudoku()
    population = new Population();
    // population.run();

}

function draw(){
    background(220);

    population.run();

    population.evaluate();
    population.selection();
    // sudoku.calcFitness();
    // sudoku.show();
}

function keyPressed(){

}