let target;
let twidth;
let theight;
let paint;
let population;
let popsize;
let mutation;
let gen=1;
let genP;
let avgP;

function setup(){
    canvas = createCanvas(1000, 250);
    target = loadImage('gioconda.jpg');
    twidth = 205;
    theight = 246;
    mutation = 0.01;
    popsize = 1;
    paint = new Paint(twidth+10, 0, twidth, theight);
    genP= createP();
    avgP = createP();
}

function draw(){
    background(255);
    image(target, 0, 0);
    paint.run();
    paint.show();
    genP.html('Gen: ' + str(gen));
    gen++;

    console.log(drawingContext.getImageData(0, 0, 100, 100));
}