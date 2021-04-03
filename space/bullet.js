class Bullet {
    constructor(pos, dir, color){
        this.pos = createVector(pos.x, pos.y);
        this.dir = dir;
        this.size = 20;
        this.color = color;
    }


    update() {
        this.pos.y += this.dir*10;
    }

    show(){
        push();
        stroke(this.color);
        line(this.pos.x, this.pos.y, this.pos.x, this.pos.y+this.size);
        pop();
    }
}