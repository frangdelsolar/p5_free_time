class Player{
    constructor(){
        this.x = 3 + (level.scl*2);
        this.y = 3 + (level.scl);
        this.scl = level.scl*0.6;
        this.dir = [];
        this.moving = false;

    }

    plantBomb(){
        let coord = level.getCoord(this.x, this.y);
        console.log(coord)
        level.bombs.push(new Bomb(coord.row, coord.col));
    }


    edges(x, y){
        let pos = level.getCoord(x, y);
        if (level.grid[pos.row][pos.col] == 1){
            return true;
        }
        return false;
    }

    hit(dot){
        // let dotPos = this.level.getPos(dot.x-dot.r, dot.y-dot.r);
        // let plaPos = this.level.getPos(this.x, this.y);

        // if (dotPos.col == plaPos.col && dotPos.row == plaPos.row){
        //     return true;
        // }
    }

    update(){
        if(this.moving){
            let x = this.x + this.dir[0];
            let y = this.y + this.dir[1];

            if (!this.edges(x, y)){
                this.x = x;
                this.y = y;
            }
        }
    }

    move(x, y){
        this.dir = [x, y];
        this.moving = true;
    }

    release(){
        this.dir = [];
        this.moving = false;
    }

    show(){
        push();
        stroke(0);
        fill(50, 50, 255);
        ellipse(this.x, this.y, this.scl, this.scl)
        pop();
    }
}