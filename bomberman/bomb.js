class Bomb{
    constructor(r, c){
        let pos = level.getPos(r, c);
        this.x = pos.x;
        this.y = pos.y;
        this.r = 3;
        this.explode = false;
    }

    update(){
        this.r += 0.1;

        if (this.r > level.scl-2){
            this.r = level.scl-2;
            this.explode = true;
        }
    }

    show(){
        fill(0);
        stroke(51);
        ellipse(this.x, this.y, this.r, this.r)

    }
}