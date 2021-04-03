class Cell{
    constructor(r, c, w, h, grid){
        this.r = r;
        this.c = c;
        this.w = w;
        this.h = h;
        this.x = this.c * this.w;
        this.y = this.r * this.h;
        this.grid = grid;

        this.visited = false;

        this.neighbours = [];

        this.north = true;
        this.east = true;
        this.south = true;
        this.west = true;

        if(this.r > 0){
            this.neighbours.push([this.r-1, this.c]);
        }

        if(this.c > 0){
            this.neighbours.push([this.r, this.c-1]);
        }

        if(this.r < rows-1){
            this.neighbours.push([this.r+1, this.c]);
        }

        if(this.c < cols-1){
            this.neighbours.push([this.r, this.c+1]);
        }
    }

    getUnvisited(){
        let list = [];

        for (let n of this.neighbours){
            let r = n[0];
            let c = n[1];
            let cell = this.grid[r][c];
            if (!cell.visited){
                list.push(cell);
            }
        }
        return list;
    }

    hasNotVisited(){
        if (this.getUnvisited().length > 0){
            return true;
        }
        return false;
    }

    removeWalls(other){
        if (this.r > other.r){
            this.south = false;
            other.north = false;
        }

        if (this.r < other.r){
            this.north = false;
            other.south = false;
        }

        if (this.c > other.c){
            this.east = false;
            other.west = false;
        }

        if (this.c < other.c){
            this.west = false;
            other.east = false;
        }
    }

    show(){
        stroke(100);
        // noFill();
        // rect(this.x, this.y, this.w, this.h);

        if (this.north){
            line(this.x, this.y, this.x+this.w, this.y);
        }

        if (this.east){
            line(this.x + this.w, this.y, this.x + this.w, this.y + this.h);
        }

        if (this.south){
            line(this.x, this.y + this.h, this.x+this.w, this.y + this.h);
        }

        if (this.west){
            line(this.x, this.y, this.x, this.y + this.h);
        }

        if(this.visited){
            noStroke();
            fill(51);
            rect(this.x, this.y, this.w, this.h);
        }
    }
}



class Maze {
    constructor(cols, rows){
        this.grid = [];
        this.x = 0;
        this.y = 0;
        this.cols = cols;
        this.rows = rows;
        this.bw = width/this.cols;
        this.bh = height/this.rows;

        this.stack = [];
        this.current = null;

        this.createGrid();
    }

    createGrid(){
        for (let r = 0; r < this.rows; r++){
            this.grid[r] = [];
            for (let c = 0; c < this.cols; c++){  
                this.grid[r][c] = new Cell(r, c, this.bw, this.bh, this.grid);
            }
        }  

    }

    generate(){

        let cell = this.grid[0][0];
        cell.visited = true;
        this.stack.push(cell);

        while (this.stack.length > 0){
            this.showGrid();

            this.current = this.stack.pop(this.stack.length-1);

            if (this.current.hasNotVisited()){


                this.stack.push(this.current);
                let next = random(this.current.getUnvisited());
                this.current.removeWalls(next);
                next.visited = true;
                this.stack.push(next);
            }
        }
    }

    showGrid(){
        for (let r = 0; r < this.rows; r++){
            for (let c = 0; c < this.cols; c++){  
                this.grid[r][c].show();
            }
        }

    }
}