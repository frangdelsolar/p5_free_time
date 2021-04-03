
class Point {
    constructor(x, y){
        this.pos = createVector(x, y);
        this.vel = createVector();
        this.dest = createVector();
        this.r = 8;
        this.color = [0, 255, 255];
    }

    move (x, y) {
        this.dest = createVector(x, y);
        this.vel = p5.Vector.sub(this.pos, this.dest).normalize();
        this.vel.setMag(5);
    }


    update() {
        this.pos.sub(this.vel);

        if (dist(this.pos.x, this.pos.y, this.dest.x, this.dest.y) <= this.r){
            this.vel.mult(0);
            this.dest.mult(0);
        }


        if (this.pos.x >= width - this.r){
            this.pos.x = width - this.r;
        } else if (this.pos.x <= 0 + this.r){
            this.pos.x = 0 + this.r;
        }

        if (this.pos.y >= height - this.r){
            this.pos.y = height - this.r;
        } else if (this.pos.y <= 0 + this.r){
            this.pos.y = 0 + this.r;
        }
    }

    show(){
        stroke(this.color);
        strokeWeight(this.r*2);
        point(this.pos.x, this.pos.y);
    }
}