class Pawn {
    constructor(color, r, c){
        this.color = color;
        this.r = r;
        this.c = c;
    }

    show(){
        fill(this.color);
        circle(this.c*SQUARE_SIZE +SQUARE_SIZE/2, this.r*SQUARE_SIZE +SQUARE_SIZE/2, SQUARE_SIZE/2)
    }
}