class Game{
    constructor(r, c, x, y, w, h){
        this.rows = r;
        this.cols = c;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        
        this.grid = [];
        for (let i=0; i<this.rows; i++){
            this.grid[i] = [];
            for (let j=0; j<this.cols; j++){
                this.grid[i][j] = 0;
            }
        }

    }

    randomize(){
        
    }

    run(){
        this.randomize();
        this.show();
    }

    show(){
        push();
        translate(this.x, this.y);

        let w = this.w / this.cols;
        let h = this.h / this.rows;
        for (let i=0; i<this.rows; i++){
            for (let j=0; j<this.cols; j++){
                fill(220);
                rect(i*w, j*h, w, h);

                textSize(40);
                fill(0);
                textAlign(CENTER, CENTER);
                text(this.grid[i][j], (i*w) + (w/2), (j*h) + (h/2));
            }
        }
        pop();
    }
}