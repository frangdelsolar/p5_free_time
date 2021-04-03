class Boundary {
    constructor(x1, y1, x2, y2, type){
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
        this.type = type;
    }

    show(){
        stroke(color);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}