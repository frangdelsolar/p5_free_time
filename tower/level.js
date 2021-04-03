class Level {
    constructor(grid, x, y, w, h) {
        this.map = grid;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.rows = this.map.length;
        this.cols = this.map[0].length;
        this.bw = this.w/this.cols;
        this.bh = this.h/this.rows;
    }

    show(){
        push();
        translate(this.x, this.y);
        for (let r = 0; r < this.rows; r++){
            for (let c = 0; c < this.cols+1; c++){
                let cell = this.map[r][c];
            
                if(cell == 0){
                    noStroke();
                    noFill();
                } else if(cell == -1){
                    stroke(122);
                    fill(100, 150, 100);
                } else if(cell == 9){
                    stroke(122);
                    fill(150, 100, 100);
                } else {
                    stroke(122);
                    fill(150, 150, 150);
                }
            
                rect(c*this.bw, r*this.bh, this.bw, this.bh);
            }
        }
        pop();
    }
}