const EMPTY =   [[0, 0, 0,   0, 0, 0,   0, 0, 0],
[0, 0, 0,   0, 0, 0,   0, 0, 0],
[0, 0, 0,   0, 0, 0,   0, 0, 0],

[0, 0, 0,   0, 0, 0,   0, 0, 0],
[0, 0, 0,   0, 0, 0,   0, 0, 0],
[0, 0, 0,   0, 0, 0,   0, 0, 0],

[0, 0, 0,   0, 0, 0,   0, 0, 0],
[0, 0, 0,   0, 0, 0,   0, 0, 0],
[0, 0, 0,   0, 0, 0,   0, 0, 0]]

  class Sudoku{
    constructor(dna){
        this.grid = EMPTY;
        if(dna){
          this.dna = dna;
        } else {
          this.dna = new DNA();
        }

        this.fitness = 0;
    }

    guessGrid(){
      let index = 0;
      for(let r=0; r<this.grid.length; r++){
        for(let c=0; c<this.grid[r].length; c++){
            this.grid[r][c] = this.dna.genes[index];
            index++;
        }
      }
    }



    lineOk(line){
      let total = 9;
      let repeated = [];
      for (let char of line){
        let count = line.filter(value => char == value).length
        if (count > 1){
          if (!repeated.includes(char)){
            repeated.push(char);
          }
          // return false;
        }
      }
      let points = total - repeated.length;
      return points;      
    }

    rowsOk(){
      let points = 0;
      for (let row of this.grid){
        points += this.lineOk(row);
      }
      return points;
    }
    
    colsOk(){
      let points = 0;
      for (let c=0; c<this.grid[0].length; c++){
        let col = [];
        for (let r=0; r<this.grid.length; r++){
            col.push(this.grid[r][c]);
        }
        points += this.lineOk(col);
      }      
      return points;
    }

    squaresOk(){
      let points = 0;
      let ranges = [[0, 3], [3, 6], [6, 9]];
      let quads = [];
      for (let r1 of ranges){
        for (let r2 of ranges){
          quads.push([r1, r2])
        }
      }

      for (let quad of quads){
        let line =[]
        for (let i=quad[0][0]; i<quad[0][1]; i++){
          for (let j=quad[1][0]; j<quad[1][1]; j++){
            line.push(this.grid[i][j])
          }
        }

        points += this.lineOk(line);
      }

      return points;
    }

    calcFitness(){
      this.guessGrid();
      let points = 0;
      // points += this.rowsOk();
      points += this.colsOk();
      // points += this.squaresOk();

      this.fitness = points*points;
    }

    show(){
      let x = 0;
      let y = 0;
      let scl = width/this.grid.length;
      for(let r=0; r<this.grid.length; r++){
        for(let c=0; c<this.grid[r].length; c++){
          x = c*scl;
          y = r*scl;
          
          
          fill(120);
          stroke(220);
          rect(x, y, scl, scl);


          // Original State
          textSize(scl*0.5);
          fill(150);
          textAlign(CENTER, CENTER);
          text(this.grid[r][c], x+scl/2, y+scl/2);

          // // Solution Know
          // textSize(scl*0.25);
          // fill(50);
          // textAlign(CENTER, CENTER);
          // text(this.solution[r][c], x+(scl/4)*3, y+scl/4);

          // // Guess
          // textSize(scl*0.5);
          // fill(200);
          // textAlign(CENTER, CENTER);
          // text(this.guess[r][c], x+scl/2, y+scl/2);
        }
      }
      stroke(120);

      textSize(100);
      fill(200, 70);
      textAlign(CENTER, CENTER);
      text(this.fitness, width/2, height/2);
    }
}