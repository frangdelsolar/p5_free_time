class Point {
    constructor () {
        this.x = random(-1, 1);
        this.y = random(-1, 1);
        this.label = null;
        if (this. x > this.y) {
            this.label = 1;
        } else {
            this.label = -1;
        }
    }

    show (){
        stroke(0);
        if (this.label == 1){
            fill(255);
        } else {
            fill(0);
        }
        let px = map(this.x, -1, 1, 0, width);
        let py = map(this.y, -1, 1, height, 0);
        ellipse (px, py, 8, 8);
    }
}