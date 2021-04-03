let punto;

function setup () {
    createCanvas(800, 600);

    punto = new Point(width/2, height/2);
}

function draw() {
    background(0);
    punto.show();

    punto.update();
}

function mousePressed() {
    punto.move(mouseX, mouseY);

  }