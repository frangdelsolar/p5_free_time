let inputs;
let brain;
let points=[];

function setup (){
    createCanvas(800, 800);
    brain = new Perceptron();

    for (let i=0; i<1000; i++){
        points[i] = new Point();
    }

    
    inputs = [-1, 0.5]
    let output = brain.guess(inputs);


}

function draw(){
    // frameRate(10);
    background(255);
    stroke(1);
    line(0, height, width, 0);


    for (let point of points){
        point.show();
    }

    for (let point of points){
        let inputs = [point.x, point.y];
        let target = point.label;
        brain.train(inputs, target);

        let guess = brain.guess(inputs); 
        if (guess == target){
            fill(0, 255, 0);
        } else {
            fill(255, 0, 0);
        }
        noStroke();
        let px = map(point.x, -1, 1, 0, width);
        let py = map(point.y, -1, 1, height, 0);
        ellipse(px, py, 4, 4);
        
    }




}