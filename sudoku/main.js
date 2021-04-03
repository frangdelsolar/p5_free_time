// let sudoku;
let population;
let gen = 1;
let genp;
let STOP = false;


function setup(){
    createCanvas(600, 600);
    // sudoku = new Sudoku()
    population = new Population();
    // population.run();
    genp = createP();


}

function draw(){
    background(220);

    population.run();
    if(!STOP){
        population.evaluate();
        population.selection();
        gen++;

    }

    genp.html(gen)
}

function keyPressed(){

}