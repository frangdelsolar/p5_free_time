class Enemy {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.xs = 1;
        this.r = 16;
    }

    update(){
        this.x += this.xs;
    }

    show(){
        push();
        ellipse(this.x, this.y, this.r, this.r);
        pop();
    }
}