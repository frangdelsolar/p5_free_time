let piso;
// let dino;
let obstacles = [];
let population;

let cycles = 0;
let deadtoll = 0;
let gen = 1;
let genP;
let livesP;
let obsP;
let obsCount= 0;
let speed = -4;


function nextGen(){
    deadtoll = 0;
    population.evaluate();
    population.selection();
    gen ++;
    obsCount=0;
}

function setup(){
    createCanvas(800, 600);

    piso = {
        x1: 0,
        y1: height-height/4,
        x2: width,
        y2: height-height/4 
    };

    // dino = new Dino();
    population = new Population();
    genP = createP();
    livesP = createP();
    obsP = createP();
}

function draw(){
    background(220);
    genP.html('Generation: ' + gen);
    livesP.html('Lives: ' + (population.popsize-deadtoll));
    obsP.html('Obstacles this gen: ' + obsCount);

    stroke(0);
    line(piso.x1, piso.y1, piso.x2, piso.y2);

    population.run();

    // dino.update();
    // dino.show(color(150));

    if (cycles % 100 == 0){
        // speed--;    
        speed = -floor(random(4, 30));
    }


    // if (cycles % floor(random(70, 150)) == 0){
    if (random()< 0.008){
        if (random()<0.5){
            obstacles.push(new Obstacle('bird', speed));
        } else {
            obstacles.push(new Obstacle('cactus', speed));
        }
        obsCount++
    }

    for (let obs of obstacles){
        obs.update();
        obs.show(color(255, 0, 0, 100))

        for (let dino of population.dinos){
            if (dino.intersects(obs)){
                dino.die();
                deadtoll++;
                break;
            }
        }

        if (obs.dead){
            let index = obstacles.indexOf(obs);
            obstacles.splice(index, 1);
        }
    }

    if(deadtoll >= population.popsize){
        nextGen();
    }

    cycles++;
}

function keyPressed() {

    if (key == ' ') {
        for (let dino of population.dinos){
            dino.jump();
        }
    }


}