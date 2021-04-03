
class Player {
    constructor(x, y){
        this.pos = createVector(x, y);
        this.vel = createVector();
        this.r = 8;
        this.color = [0, 255, 255];
    }

    move (x, y) {
        this.vel = createVector(x, y);
        this.vel = p5.Vector.sub(this.pos, this.vel).normalize();
        this.vel.setMag(0.03);
    }


    update() {
        this.pos.sub(this.vel);
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