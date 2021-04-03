const L1 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 9, 9, 0],
    [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 9, 9, 0],
    [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]


class Level {
    constructor(){
        this.grid = L1;
        this.w = width;
        this.scl = this.w / this.grid[0].length;
        this.x = 0;
        this.y = 0;

        this.dots = []

        this.setDots();

    }

    setDots(){
        let locs = [[1, 4],
                    [6, 5],
                    [1, 6],
                    [6, 7],
                    [1, 8], 
                    [6, 9],
                    [1, 10],
                    [6, 11],
                    [1, 12],
                    [6, 13]
                ]

        // let locs = []

        for (let i = 0; i < locs.length; i++){
            let x = this.x + (locs[i][1] * this.scl);
            let y = this.y + (locs[i][0] * this.scl);

            let xs = 2;
            if (locs[i][0] % 2 == 0){
                xs = -2;
            }
            this.dots.push(new Dot(x + this.scl/2, y + this.scl/2, this.scl/2, xs, this))
        }
    }

    update(){
        for (let dot of this.dots){
            dot.update();
        }       
    }

    getPos(r, c){
        let x = c * this.scl + this.scl;
        let y = r * this.scl + this.scl;
        return {x: x, y: y};
    }

    getCoord(x, y){
        let col = floor((x - this.x) / this.scl);
        let row = floor((y - this.y ) / this.scl);
        return {row: row, col:col};
    }


    showDots(){
        for (let dot of this.dots){
            dot.show();
        }
    }

    showBackground(){
        push();
        translate(this.x, this.y);
        for (let r = 0; r < this.grid.length; r++){
            for (let c = 0; c < this.grid[0].length; c++){
                if (this.grid[r][c] == 1){
                    noStroke();
                    fill(0, 100, 70);
                    rect(c*this.scl, r*this.scl, this.scl, this.scl);
                } else if (this.grid[r][c] == 2){
                    noStroke();
                    if ((c+r)%2 == 0){
                        fill(100, 100, 120);

                    } else {
                        fill(150, 150, 170);

                    }
                    rect(c*this.scl, r*this.scl, this.scl, this.scl);
                } else if (this.grid[r][c] == 9){
                    noStroke();
                    fill(0, 100, 70);
                    rect(c*this.scl, r*this.scl, this.scl, this.scl);
                } 
            }
        }
        pop();
    }
}