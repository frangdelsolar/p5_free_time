class Food{
    constructor(){
        this.r = null;
        this.c = null;
        this.x1 = null;
        this.y1 = null;
        this.x2 = null;
        this.y2 = null;
        this.color = (0, 255, 0);
        this.pickLocation();
    }


    pickLocation(){
        this.r = Math.floor(random(ROWS));
        this.c = Math.floor(random(COLS));
        this.x1 = this.r * SQSZ;
        this.y1 = this.c * SQSZ;
        this.x2 = this.x1 + SQSZ;
        this.y2 = this.y1 + SQSZ;
    }
    show(){
        fill(0, 255, 0);
        noStroke();
        rect(this.r*SQSZ, this.c*SQSZ, SQSZ, SQSZ)
    }
}