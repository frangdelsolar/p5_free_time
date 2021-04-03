// Key codes a = 65 through z=90

let A = 65;
let Z = 90;
let pressed = false;
let keys = {};

//10 9 7

class Key{
  constructor(code, x, y, r){
    this.code = code;
    this.x = x;
    this.y = y;
    this.r = r;
    this.pressed = false;
  }

  show(){
    if (this.pressed){
      fill(0, 100, 0, 200);
    } else {
      noFill();
    }
    stroke(220);
    ellipse(this.x, this.y, this.r, this.r);
    
    fill(220);
    let c = String.fromCharCode(this.code);
    textSize(this.r*0.5);
    textAlign(CENTER, CENTER);
    text(c, this.x, this.y);
  }
}


function setup(){
  createCanvas(800, 800);

  let letterOrder = "QWERTYUIOPASDFGHJKLZXCVBNM";

  for (i=0; i<letterOrder.length; i++){
    let c = letterOrder.charCodeAt(i);

    let x = 0;
    let y = 0;
    let r = 50;

    if (i<10){
      y = height/2;
      x = width/12 + i*r*1.5;

      keys[c] = new Key(c, x, y, r);



    } else if(i<19) {
      y = height/2 + r*1.5;
      x = width/9 + ((i-10)*r*1.5);

      keys[c] = new Key(c, x, y, r);


    } else {
      y = height/2 + r*3;
      x = width/7 + ((i-19)*r*1.5);

      keys[c] = new Key(c, x, y, r);  
    }

  }

}
  
function draw() {
  background(0);

  for (let k of Object.entries(keys)){
    k[1].show();
  }
  // k.show();

}

// function mousePressed(){
//   let x = mouseX;
//   let y = mouseY;


// }

function keyPressed() {

  if (keyCode >= A && keyCode <= Z) {
    keys[keyCode].pressed = true;
    return false; // prevent default
  }
}

function keyReleased() {
  if (keyCode >= A && keyCode <= Z) {
    keys[keyCode].pressed = false;
    return false; // prevent default
  }
}