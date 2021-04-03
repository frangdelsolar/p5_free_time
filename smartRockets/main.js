let population;
let lifespan = 300;
let lifeP;
let count = 0;
let maxforce = 0.6;
let obstacles = [];

let width = 800;
let height = 600;
let maxdist = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));



class Obstacle{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    show (){
        fill(255);
        rect(this.x, this.y, this.w, this.h);
    }
}




function setup (){
    createCanvas(width, height);
    population = new Population();
    lifeP = createP();
    target = createVector(width/2, 50);

    for (let i = 0; i < 5; i ++){
        let w = random(10, width); 
        let h = 10;
        let x = random(width) - w/2;
        let y = random(height) - h/2;
        obs = new Obstacle(x, y, w, h);
        obstacles.push(obs);
    }

}

function draw(){
    background(0);
    population.run();
    lifeP.html(count);
    
    count++;
    if (count==lifespan){
        // population = new Population();
        population.evaluate();
        population.selection();
        count = 0;
    }

    for (let obstacle of obstacles){
        obstacle.show();
    }


    ellipse(target.x, target.y, 16, 16);
}