class Board {
    constructor(){
        this.grid = [];
        this.begin();       

    }

    begin() {
        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                this.grid[i][j] = null;            
            }
        }
    }

    show(){
        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {

                if ((i + j) % 2 == 0) {
                    fill(200);
                } else {
                    fill(100);
                }
                strokeWeight(1);
                stroke(0);

                rect(i * SQUARE_SIZE, j * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
                           
            }
        }

    }
}