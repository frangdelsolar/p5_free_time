let sqSize;
let width;
let height;
let level;
let agent;


function setup() {
  sqSize = 30;
  level = new Level();
  width = (sqSize * level.grid.length);
  height = sqSize * level.grid[0].length;
  createCanvas(width*2, height);

  agent = new Agent(11, 10, (255, 200, 90));

}

function draw() {
  background(0);
  level.show();
  agent.show();

}

function keyPressed() {
  let dir = [];
  if (keyCode  === UP_ARROW) {
    dir = [0, -1]; 
    agent.move(dir);
    agent.particle.heading = radians(270);

  } else if (keyCode  === DOWN_ARROW){
    dir = [0, 1]; 
    agent.move(dir);
    agent.particle.heading = radians(90);

  } else if (keyCode  === LEFT_ARROW){
    dir = [-1, 0];
    agent.move(dir);
    agent.particle.heading = radians(180);

  }
  else if (keyCode  === RIGHT_ARROW){
    dir = [1, 0];
    agent.move(dir);
    agent.particle.heading = radians(0);

  }
}