class Dot {
    constructor(x, y, r, xs, level){
        this.x = x;
        this.y = y;
        this.r = r;
        this.xs = xs;
        this.level = level;
    }

    edges(){
        let pos = this.level.getCoord(this.x, this.y);
        if (this.level.grid[pos.row][pos.col] != 2){
            return true;
        }
    }

    update(){
        this.x += this.xs;
        if (this.edges(this.x)){
            this.x -= this.xs;
            this.xs *= -1;
        } 
    }

    show(){
        push();
        stroke(0);
        fill(0, 0, 220);
        ellipse(this.x, this.y, this.r, this.r);
        pop();
    }


}