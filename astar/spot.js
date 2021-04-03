class Spot {
    constructor(i, j){
        this.i = i;
        this.j = j;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbours = [];
    }

    show(color){
        fill(color);
        noStroke();
        rect(this.i*w, this.j*h, w-1, h-1);
    }

    addNeighbours(grid){
        let i = this.i;
        let j = this.j;

        console.log(i, j, rows, cols)

        if (i < cols - 1){
            this.neighbours.push(grid[i + 1][j]);
        }
        if (i > 0){
            this.neighbours.push(grid[i - 1][j]);
        }
        if (j < rows - 1){
            this.neighbours.push(grid[i][j + 1]);
        }
        if (i > 0){
            this.neighbours.push(grid[i][j - 1]);
        }
    }
}