let width = 800;
let height = 400

let cycles = 0;

let particles = [];
let food = [];

let total = 50;
let ftotal = 30;
let psmall;
let pmedium;
let pbig;

let population = [];
let small = [];
let medium = [];
let big = [];

let totalP;
let ptotalP;
let psmallP;
let pmediumP;
let pbigP;
let fcountP;

function setup (){
    createCanvas(width, height);

    for (let i=0; i < total; i++){
        particles.push(new Particle());
    }


    for (let i=0; i < ftotal; i++){
        food.push(new Food());
    }

    totalP = createP();
    ptotalP = createP();
    psmallP = createP();
    pmediumP = createP();
    pbigP = createP();
    fcountP = createP();


}

function draw(){
    frameRate(30);
    background(255);

    if(cycles % 10 == 0){
        food.push(new Food());
        food.push(new Food());
    }
    for(let f of food){
        f.show();    
    }

    psmall = 0;
    pmedium = 0;
    pbig = 0;

    for(let particle of particles){
        particle.update();

        if(!particle.dead){
            if(particle.index === 0){
                psmall++;
            } else if (particle.index === 1){
                pmedium++;
            } else if (particle.index === 2){
                pbig++;
            }

            particle.show();
            for(let f of food){
                if (particle.eat(f)){
                    let i = food.indexOf(f);
                    food.splice(i, 1);
                }
            }
        } else {
            food.push(new Food(particle.pos));
            let i = particles.indexOf(particle);
            particles.splice(i, 1);
        }
    }

    population.push(particles.length);
    small.push(psmall);
    medium.push(pmedium);
    big.push(pbig);
 
    totalP.html('Población inicial: ' + total);
    ptotalP.html('Población actual: ' + particles.length);
    psmallP.html('Small:' + psmall);
    pmediumP.html('Medium: ' + pmedium);
    pbigP.html('Big: ' + pbig);
    fcountP.html('Alimentos:' + food.length);

    // graphics();
    cycles++;
}

function graphics(){
    push();
    fill(0);
    translate(0, height);
    rect(0, 0, width, height);

    stroke(255);
    strokeWeight(3);
    line(25, 25, 25, height-25);
    line(25, height-25, width-25, height-25);

    translate(25, height-25);

    beginShape()

    for (let i=0; i<pop.length; i++){
        stroke(255, 0, 0);
        strokeWeight(2);

        line(i, 0, i, -small[i]); 
        
        stroke(0, 255, 0);
        line(i, -small[i], i, -small[i]-medium[i]);  
        
        stroke(0,0,255);
        line(i, -small[i]-medium[i], i, -small[i]-medium[i]-big[i]);   

        let x = 0;
        for (let j=0; j<population.length; j++){
            x += population[j];
        }
        x /= population.length;
    
        stroke(255, 255, 0, 200);
        // line(i, -x, width, -x);
        vertex(i, -x);


    }
    endShape();
    pop();
}