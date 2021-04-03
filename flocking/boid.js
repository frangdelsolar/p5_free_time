class Boid {
    constructor(color, size){
        this.pos = createVector(random(width), random(height));
        // this.pos = createVector(width/2, height/2)
        this.vel = p5.Vector.random2D();
        this.vel.setMag(random(0.5, 1.5));
        this.acc = p5.Vector.random2D();
        this.perceptionRadius = 100;
        this.maxForce = 0.2; //0.2
        this.maxSpeed = 4; //4
        this.color = color;
        this.size = size;
    }

    edges () {
        if (this.pos.x > width){
            this.pos.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = width;
        }
        if (this.pos.y > height){
            this.pos.y = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = height;
        }
    }

    align(boids){
        let steering = createVector();
        let total = 0
        for (let other of boids){
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            if (other != this && d < this.perceptionRadius){
                steering.add(other.vel);
                total ++;
            }
        }
        if (total > 0){
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.vel);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    cohesion(boids){
        let steering = createVector();
        let total = 0
        for (let other of boids){
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            if (other != this && d < this.perceptionRadius){
                steering.add(other.pos);
                total ++;
            }
        }
        if (total > 0){
            steering.div(total);
            steering.sub(this.pos);
            steering.setMag(this.maxSpeed);
            steering.sub(this.vel);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    separation(boids){
        let steering = createVector();
        let total = 0
        for (let other of boids){
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            if (other != this && d < this.perceptionRadius){
                let diff = p5.Vector.sub(this.pos, other.pos);
                diff.div(d);
                steering.add(diff);
                total ++;
            }
        }
        if (total > 0){
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.vel);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    flock(boids){
        this.acc.set(0, 0);
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);

        separation.mult(separationSlider.value());
        cohesion.mult(cohesionSlider.value());
        alignment.mult(alignmentSlider.value());

        this.acc.add(alignment);
        this.acc.add(cohesion);
        this.acc.add(separation);
    }

    update(){
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
    }

    show() {
        strokeWeight(this.size);
        stroke(this.color);
        point(this.pos.x, this.pos.y);
    }
}