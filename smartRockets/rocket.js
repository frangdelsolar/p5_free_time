class Rocket {
    constructor(dna){
        this.pos = createVector(width/2, height);
        this.vel = createVector();
        this.acc = createVector();
        this.completed = false;
        this.crashed = false;
        if (dna){
            this.dna = dna;
        } else {
            this.dna = new DNA();
        }
        this.fitness = 0;
    }

    applyForce(force){
        this.acc.add(force);    
    }

    calcFitness() {
        
        let d = dist(this.pos.x, this.pos.y, target.x, target.y);
        this.fitness = map(d, 0, maxdist, maxdist, 0);
        
        if (this.completed){
            this.fitness ^= 3;
        }

        if (this.crashed) {
            this.fitness ^= 1/2; 
        }
    }

    update(){

        let d = dist(this.pos.x, this.pos.y, target.x, target.y);
        if (d < 10){
            this.completed = true;
            this.pos = target.copy();
        }

        for (let obstacle of obstacles){
            if (this.pos.x > obstacle.x && this.pos.x < obstacle.x + obstacle.w &&
                this.pos.y > obstacle.y && this.pos.y < obstacle.y + obstacle.h){
                    this.crashed = true;
                }
        }

        if (this.pos.x > width || this.pos.x < 0){
            this.crashed = true;
        }

        if (this.pos.y > height || this.pos.y < 0){
            this.crashed = true;
        }

        this.applyForce(this.dna.genes[count]);

        if (!this.completed && !this.crashed){
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(4);
        }
    }

    show(){
        push();
        noStroke();
        fill(255, 150);
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0, 0, 25, 5);
        pop();
    }
}