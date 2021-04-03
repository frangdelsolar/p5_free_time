class Game {
    constructor() {
        this.cols = 10;
        this.rows = 20
        this.grid = buildGrid(this.cols, this.rows, 0);
        this.gx = width/3;
        this.gy = height/4;
        this.gw = width/3;
        this.gh = height/4*3; 
        this.sh = this.gh/this.rows;
        this.sw = this.gw/this.cols;
        this.speed = 2;
        this.cleared = 0;
        this.level = 0;
        this.play = true;
        
        this.next = new Piece(this);
        this.current = null;
        this.hold = null;
        this.start();

    }

    start(){
        this.current = this.next;
        this.current.col = 4;
        this.current.row = -4;
        this.next = new Piece(this);
    }

    clearRows(){
        for (let i=this.rows; i>=0; i--){
            let count = 0;
            for (let j=0; j<this.cols; j++){
                if (this.grid[j][i]==1){
                    count++;
                }
            }  
            if(count>=this.cols){
                for (let r=i; r>=0; r--){           
                    for (let c=0; c<this.cols; c++){
                        if (i>0){
                            this.grid[c][r] = this.grid[c][r-1];
                        } else {
                            this.grid[c][r] = 0;
                        }
                    }
                }
                this.cleared++;
            }      
        }
    }

    changeLevel(){
        let target = 10;
        if(this.cleared % target == 0){
            this.level = this.cleared/target;
        }
    }

    setSpeed(){
        this.speed = this.level + 2;
    }

    run() {
        if (this.play){
            this.current.update();
            if (this.current.stop){
                this.start();
            }
            this.clearRows();
            this.changeLevel();
            this.setSpeed();
        } 
    }

    onHold(){
        if (!this.hold){
            this.hold = this.current;
            this.hold.row = 0;
            this.hold.col = 0;
            this.start();
        } else {
            let temp = this.hold;
            this.hold = this.current;  
            this.current = temp;
            this.current.col = temp.col;
            this.current.row = temp.row;
            this.hold.row = 0;
            this.hold.col = 0;

        }
    }

    display() {
        this.showGrid();
        this.showNext();
        this.showHold();
        this.showScore();
    }

    showScore(){
        let x = this.gx/3;
        let y = this.gy + this.sh*6;

        let score = 'Score: ' + this.cleared + ' pts.';
        fill(255);
        textSize(width/40);
        text(score, x, y);

        let level = 'Level: ' + this.level;
        text(level, x, y+width/40);
    }

    showGrid(){
        fill(0);
        rect(this.gx, this.gy, this.gw, this.gh);
        push()
        translate(this.gx, this.gy);
        strokeWeight(1);
        for (let i=0; i<this.grid.length; i++){
            for (let j=0; j<this.grid[i].length; j++){
                if (this.grid[i][j]==1){
                    fill(255, 0, 0, 100);
                } else {
                    fill(0);
                }
                stroke(100);
                rect(i*this.sw, j*this.sh, this.sw, this.sh);
            }            
        }
        this.current.show(this.sw, this.sh);
        pop();
    }

    showNext(){
        let x = this.gx*2 + this.gx/3;
        let y = this.gy;
        let w = this.sw*4;
        let h = this.sh*4;

        fill(51);
        rect(x, y, w, h);
        push();
        translate(x, y);
        for (let i=0; i<4; i++){
            for (let j=0; j<4; j++){
                stroke(100);
                rect(i*this.sw, j*this.sh, this.sw, this.sh);
            }            
        }
        this.next.show(this.sw, this.sh);
        pop();
    }

    showHold(){
        let x = this.gx/3;
        let y = this.gy;
        let w = this.sw*4;
        let h = this.sh*4;

        fill(51);
        rect(x, y, w, h);
        push();
        translate(x, y);
        for (let i=0; i<4; i++){
            for (let j=0; j<4; j++){
                stroke(100);
                rect(i*this.sw, j*this.sh, this.sw, this.sh);
            }            
        }
        if (this.hold){
            this.hold.show(this.sw, this.sh);
        }
        pop();
    }
}

function buildGrid(cols, rows, value){
    let grid = [];
    for (let i=0; i<cols; i++){
        let row = new Array(rows)
        grid[i] = row;
    }
    for (let i=0; i<grid.length; i++){
        for (let j=0; j<grid[i].length; j++){
            grid[i][j] = value;
        }            
    }
    return grid;
}