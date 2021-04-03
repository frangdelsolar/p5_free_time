class Brick{
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w; 
        this.h = h;
        this.life = 1;
        this.dead = false;
    }

    die(){
        this.dead = true;
    }

    hit(){
        this.life--;
    }

    show() {
        push();
        fill(255);
        rect(this.x, this.y, this.w, this.h);
        pop();
    }
}