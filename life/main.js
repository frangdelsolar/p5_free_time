function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  }
  
  let grid;
  let cols;
  let rows;
  let resolution = 30;

  let run = false;
  
  function setup() {
    createCanvas(600, 600);
    cols = width / resolution;
    rows = height / resolution;
  
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 0;
      }
    }
  }
  
  function draw() {
    background(0);

  
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        if (grid[i][j] == 1) {
          fill(255);
          stroke(0);
          rect(x, y, resolution - 1, resolution - 1);
        }
      }
    }
    
    if (run){
        let next = make2DArray(cols, rows);
    
        // Compute next based on grid
        for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            // Count live neighbors!
            let sum = 0;
            let neighbors = countNeighbors(grid, i, j);
    
            if (state == 0 && neighbors == 3) {
            next[i][j] = 1;
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
            next[i][j] = 0;
            } else {
            next[i][j] = state;
            }
        }
        }
    
        grid = next;
    }
  }
  
  function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        sum += grid[col][row];
      }
    }
    sum -= grid[x][y];
    return sum;
  }

  function mousePressed(){
      let x = floor(mouseX/resolution);
      let y = floor(mouseY/resolution);

      if (grid[x][y] == 0){
          grid[x][y] = 1;
      } else if (grid[x][y] == 1) {
          grid[x][y] = 0;
      }
  }

  function keyPressed(){
      if (run){
          run = false;
      } else {
          run = true;
      }
  }