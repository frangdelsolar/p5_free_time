class Food{
    constructor(pos) {
        if(pos){
            this.pos = pos;
        } else {
            this.pos = createVector(random(width), random(height));
        }
        
        this.r = 10;
      }
   
    show() {
        fill(0, 150, 0, 100);
        ellipse(this.pos.x, this.pos.y, this.r);
    }
}