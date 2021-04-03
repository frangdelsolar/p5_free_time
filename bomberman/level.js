class Level {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.rows = 21;
        this.cols = 21;
        this.scl = width/this.cols;
        this.w = this.cols * this.scl;
        this.h = this.rows * this.scl;

        this.grid = [];
        this.build();

        this.bombs = [];

        this.enemies = [];
        // this.setEnemies();



    }

    build(){
        for (let i = 0; i < this.rows; i++){
            this.grid[i] = [];
            for (let j = 0; j < this.cols; j++){

                let value = 0;
                if (i == 0 || i == this.rows-1 || j == 0 || j == this.cols - 1)
                    value = 1;

                if ((i * j)%2 != 0)
                    value = 1;

                this.grid[i][j] = value;
            }
        }
    }

    setEnemies(){

    }

    update(){

        // for (let dot of this.dots){
        //     dot.update();
        // }   
        for (let bomb of this.bombs){
            bomb.update();
        }      
    }

    getPos(r, c){
        let x = c * this.scl + this.scl/2;
        let y = r * this.scl + this.scl/2;
        return {x: x, y: y};
    }

    getCoord(x, y){
        let col = floor((x - this.x) / this.scl);
        let row = floor((y - this.y ) / this.scl);
        return {row: row, col:col};
    }


    // showDots(){
    //     for (let dot of this.dots){
    //         dot.show();
    //     }
    // }

    show () {
        noStroke();
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                if (this.grid[i][j] == 1){
                    fill(51);
                    rect(j * this.scl, i * this.scl, this.scl, this.scl);
                }
            }
        }  
        
        for (let bomb of this.bombs){
            bomb.show();
        }   
    }
}