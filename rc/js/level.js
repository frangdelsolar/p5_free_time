const wallColor  = 'black';
const floorColor = '#BBBBBB';

let levelMap1 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

class Level {
    constructor(canvas, ctx){
        this.grid = levelMap1;
        this.canvas = canvas;
        this.ctx = ctx;

        // Dimensiones matriz
        this.rows = this.grid.length;
        this.cols = this.grid[0].length;

        // Dimensiones canvas
        this.canvasw = this.canvas.width;
        this.canvash = this.canvas.height;
        
        // Tiles
        this.tilew = this.canvasw/this.cols;
        this.tileh = this.canvash/this.rows;
    }

    collide(r, c){
        if (this.grid[r][c]!=0){
            return true;
        }
        return false;
    }

    show(){
        for (let r=0; r<this.rows; r++){
            for (let c=0; c<this.cols; c++){
                this.ctx.fillStyle = floorColor;
                if (this.grid[r][c] == 1){
                    this.ctx.fillStyle = wallColor;
                }
                this.ctx.fillRect(c*this.tilew, r*this.tileh, this.tilew, this.tileh); 
            }
        }
    }
}