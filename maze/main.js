 
let cols;
let rows;
let resolution = 100;

let maze;

  
function setup() {
  createCanvas(600, 600);
  frameRate(1);

  cols = width / resolution;
  rows = height / resolution;

  maze = new Maze(cols, rows);
  maze.generate();



}
  
function draw() {
  // background(0);
  // maze.generate();




  maze.showGrid();


  



}
  