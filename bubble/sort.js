let values;

function setup() {
    createCanvas(600, 600);
    values = float[600];
    for (let i=0; i<values.length; i++){
        values[i] = random(height);
    }
    console.log(values)
}
  
function draw() {
    background(0);
    for (let i=0; i<values.length; i++){
        values[i] = random(height);
    }

}
