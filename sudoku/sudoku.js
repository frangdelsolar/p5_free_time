const EMPTY =   [[0, 0, 0,   0, 0, 0,   0, 0, 0],
[0, 0, 0,   0, 0, 0,   0, 0, 0],
[0, 0, 0,   0, 0, 0,   0, 0, 0],

[0, 0, 0,   0, 0, 0,   0, 0, 0],
[0, 0, 0,   0, 0, 0,   0, 0, 0],
[0, 0, 0,   0, 0, 0,   0, 0, 0],

[0, 0, 0,   0, 0, 0,   0, 0, 0],
[0, 0, 0,   0, 0, 0,   0, 0, 0],
[0, 0, 0,   0, 0, 0,   0, 0, 0]]

const E1 =   [[0, 0, 0,   0, 0, 0,   0, 0, 0],
[0, 0, 0,   0, 0, 0,   0, 0, 0],
[0, 0, 0,   0, 0, 0,   0, 0, 0],

[0, 0, 0,   0, 0, 0,   0, 0, 0],
[0, 0, 0,   0, 0, 0,   0, 0, 0],
[0, 0, 0,   0, 0, 0,   0, 0, 0],

[0, 0, 0,   0, 0, 0,   0, 0, 0],
[0, 0, 0,   0, 0, 0,   0, 0, 0],
[0, 0, 0,   0, 0, 0,   0, 0, 0]]

// const E1 =   [[0, 0, 0,   0, 0, 0,   9, 0, 0],
//               [0, 7, 0,   0, 0, 5,   0, 4, 0],
//               [1, 0, 8,   0, 0, 0,   5, 0, 0],

//               [0, 5, 0,   0, 6, 0,   0, 0, 0],
//               [0, 0, 0,   8, 0, 3,   0, 0, 0],
//               [0, 0, 0,   0, 2, 0,   0, 5, 0],

//               [0, 0, 1,   0, 0, 0,   2, 0, 4],
//               [0, 8, 0,   4, 0, 0,   0, 3, 0],
//               [0, 0, 5,   0, 0, 0,   0, 0, 0]]


const S1 = [[5, 3, 4,   6, 7, 8,   9, 1, 2],
            [6, 7, 2,   1, 9, 5,   3, 4, 8],
            [1, 9, 8,   3, 4, 2,   5, 6, 7],

            [8, 5, 9,   7, 6, 1,   4, 2, 3],
            [4, 2, 6,   8, 5, 3,   7, 9, 1],
            [7, 1, 3,   9, 2, 4,   8, 5, 6],

            [9, 6, 1,   5, 3, 7,   2, 8, 4],
            [2, 8, 7,   4, 1, 9,   6, 3, 5],
            [3, 4, 5,   2, 8, 6,   1, 7, 9]]

  class Sudoku{
    constructor(dna){
        this.grid = E1;
        this.solution = S1;

        this.zeroes =this.countZeros()

        if(dna){
          this.dna = dna;
        } else {
          this.dna = new DNA(null, this.zeroes);
        }

        this.guess = EMPTY;

        this.fitness = 0;
    }

    guessGrid(){
      let index = 0;
      for(let r=0; r<this.grid.length; r++){
        for(let c=0; c<this.grid[r].length; c++){
          if (this.grid[r][c] == 0){
            this.guess[r][c] = this.dna.genes[index];
            index++;
          } else {
            this.guess[r][c] = this.grid[r][c];
          }
        }
      }
    }

    countZeros(){
      let count = 0;
      for(let r=0; r<this.grid.length; r++){
        for(let c=0; c<this.grid[r].length; c++){
          if (this.grid[r][c] == 0){
            count++;
          } 
        }
      }
      return count;
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
      for (let row of this.guess){
        points += this.lineOk(row);
      }
      return points;
    }
    
    colsOk(){
      let points = 0;
      for (let c=0; c<this.guess[0].length; c++){
        let col = [];
        for (let r=0; r<this.guess.length; r++){
            col.push(this.guess[r][c]);
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
            line.push(this.guess[i][j])
          }
        }

        points += this.lineOk(line);
      }

      return points;
    }

    compare(){
      let points = 0;
      for(let r=0; r<this.guess.length; r++){
        for(let c=0; c<this.guess[r].length; c++){
          if(this.guess[r][c]==this.solution[r][c]){
            points++;
          }
        }
      }


      return points;
    }

    calcFitness(){
      this.guessGrid();
      let points = 0;
      // points += this.rowsOk();
      // points += this.colsOk();
      // points += this.squaresOk();
      points += this.compare();

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
          if(this.guess[r][c]==this.solution[r][c]){
            stroke(0, 255, 0);
          } else{
            stroke(255, 0, 0);
          }
          rect(x, y, scl, scl);


          // Original State
          textSize(scl*0.25);
          fill(150);
          textAlign(CENTER, CENTER);
          text(this.grid[r][c], x+scl/4, y+scl/4);

          // Solution Know
          textSize(scl*0.25);
          fill(50);
          textAlign(CENTER, CENTER);
          text(this.solution[r][c], x+(scl/4)*3, y+scl/4);

          // Guess
          textSize(scl*0.5);
          fill(200);
          textAlign(CENTER, CENTER);
          text(this.guess[r][c], x+scl/2, y+scl/2);
        }
      }
      stroke(120);

      textSize(100);
      fill(200, 70);
      textAlign(CENTER, CENTER);
      text(this.compare(), width/2, height/2);
    }
}