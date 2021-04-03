class Piece {
    constructor(game){
        this.shape = random(PIECE_SHAPES).slice();
        this.index = 0;
        this.color = color(255*random(), 255*random(), 255*random(), 200);
        this.row = 0;
        this.col = 0;
        this.game = game;

        this.stop = false;
    }

    getPos(){
        let pos = [];
        let shape = this.shape[this.index];
        for(let i=0; i<shape.length; i++){
            for(let j=0; j<shape[i].length; j++){
                if (shape[i][j]==1){
                    pos.push([i+this.col, j+this.row]);
                }
            }
        }
        return pos;
    }

    detener(){
        this.stop = true;
        let pos = this.getPos();
        let grid = this.game.grid;
        for (let sq of pos){
            let i = sq[0];
            let j = sq[1];
            grid[i][j] = 1;
        }
    }

    update(){
        if (this.stop){
            return;
        }

        this.moveDown();

    }

    moveUp(){
        this.row -= 1;
    }

    moveDown(){
        this.row += 1;

        let pos = this.getPos();
        let grid = this.game.grid;

        for (let sq of pos){
            let i = sq[0];
            let j = sq[1];

            if (j >= this.game.rows-1){
                this.detener();
                break;
            }

            if (grid[i][j] == 1){
                this.row -= 1;
                this.detener();

                if (j <= 0){
                    console.log('juego finalizado');
                    this.game.play = false;
                }
                break;
            }
        }
    }

    moveRight(){
        this.col += 1;

        let pos = this.getPos();
        let grid = this.game.grid;

        for (let sq of pos){
            let i = sq[0];
            let j = sq[1];

            
            if (i >= this.game.cols){
                this.col -= 1;
                break;
            }

            if (grid[i][j] == 1){
                this.cols -= 1;
                this.detener();
                break;
            }
        }
    }

    moveLeft(){
        this.col -= 1;

        let pos = this.getPos();
        let grid = this.game.grid;

        for (let sq of pos){
            let i = sq[0];
            let j = sq[1];
            
            if (i < 0){
                this.col += 1;
                break;
            }

            if (grid[i][j] == 1){
                this.cols += 1;
                this.detener();
                break;
            }
        }
    }

    rotate(){
        let index = this.index;
        this.index += 1;
        if (this.index >= this.shape.length){
            this.index = 0;
        }

        let pos = this.getPos();
        let grid = this.game.grid;
        
        for (let sq of pos){
            let i = sq[0];
            let j = sq[1];

            
            if (i >= this.game.cols || i < 0){
                this.index = index;
                break;
            }

            if (grid[i][j] == 1){
                this.index = index;
                this.detener();
                break;
            }
        }
    }

    show(w, h){
        let shape = this.shape[this.index];
        for(let i=0; i<shape.length; i++){
            for(let j=0; j<shape[i].length; j++){
                if (shape[i][j]==1){
                    if (this.row + j >=0){
                        fill(this.color);
                    } else {
                        fill(100, 50);
                    }
                    rect((i+this.col)*w, (j+this.row)*h, w, h);
                }
            }
        }
    }
}