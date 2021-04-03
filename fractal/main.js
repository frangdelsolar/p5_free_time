let spiro;
let path = [];
class Spirograph{
    constructor(x, y, r, children){
        this.x = x;
        this.y = y;
        this.r = r;
        this.pointerX = 30;
        this.pointerY = 30;
        this.pointerA = 0;
        this.speed = random(-0.1, 0.1);

        this.child = null;

        if(children > 0){

            this.child = new Spirograph(this.x+this.r +this.r/2, this.y+this.r +this.r/2, this.r/2, children-1);
        }
    }

    update(){
        this.pointerX = this.r * Math.cos(this.pointerA) + this.x;
        this.pointerY = this.r * Math.sin(this.pointerA) + this.y;
        this.pointerA += this.speed;

        if(this.child){
            this.child.x = this.pointerX;
            this.child.y = this.pointerY;
            this.child.update();
        }
    }

    show(){
        stroke(0, 30);
        noFill();
        ellipse(this.x, this.y, this.r*2, this.r*2);

        push();
        
        strokeWeight(4);
        if (this.child<=0){
            strokeWeight(4);
            stroke(0, 100);
            point(this.pointerX, this.pointerY);
            path.push(createVector(this.pointerX, this.pointerY));
        }
        point(this.pointerX, this.pointerY);
        pop();



        if(this.child){
            this.child.show();
        }
    }
}

function setup(){
    createCanvas(800, 600);
    spiro = new Spirograph(width/2, height/2, width/8, 2);


}

function draw(){
    background(220);

    spiro.update();
    spiro.show();

    beginShape();
    for (let pt of path){
        stroke(0, 150);
        vertex(pt.x, pt.y);
    }
    endShape();

}