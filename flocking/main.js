let flock = [];
let player;

let alignmentSlider, cohesionSlider, separationSlider;

function setup() {
  createCanvas(1000, 600);
  alignmentSlider = createSlider(0, 5, 0.1);
  cohesionSlider = createSlider(0, 5, 0.1);
  separationSlider = createSlider(0, 5, 0.1);

  for (let i=0; i<100; i++){
    flock.push(new Boid(120, 4));
  }

  player = new Player(255, 8);
  
}

function draw() {
  // frameRate(30);
  background(51);
  let boundary = new Rectangle(0, 0, width, height);
  let qt = new QuadTree(boundary, 4);


  for (let boid of flock){
    boid.edges();
    qt.insert(new Point(boid.pos.x, boid.pos.y, boid));
    let scope = new Circle(boid.pos.x, boid.pos.y, boid.perceptionRadius);
    let points = qt.query(scope, []);

    if (boid != player){    
      if (points.length > 0){
        let local = [];
        for (let p of points){
          local.push(p.userData);
        }
        boid.flock(local);
      }
    }

    player.update();
    boid.update();
    player.show();
    boid.show();
  }

  // qt.show()


}

function mousePressed() {
  player.move(mouseX, mouseY);

}
