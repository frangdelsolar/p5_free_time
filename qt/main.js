
let qt;
let boundary;

function setup() {
  createCanvas(800, 800);

  boundary = new Rectangle(0, 0, width, height);
  qt = new QuadTree(boundary, 10);

  for (let i=0; i<1000; i++){
      qt.insert(new Point(random(width), random(height)))
  }

}

function draw() {
  background(0);
  qt.show(); 

  noFill();
  strokeWeight(4);
//   rango = new Rectangle(mouseX, mouseY, 200, 100);
//   rect(rango.x, rango.y, rango.w, rango.h);

  rango = new Circle(mouseX, mouseY, 50)
  circle(rango.x, rango.y, rango.r*2)

  points = qt.query(rango, []);
//   console.log(points)
  for (let point of points){
      circle(point.x, point.y, 3);
  }

}