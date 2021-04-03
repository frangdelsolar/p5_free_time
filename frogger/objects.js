class Rectangle{
    constructor(x, y, w, h, c){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = c;
        this.xs = null;
    }

    intersects(other){
        return !(this.x + this.w <= other.x || 
            this.x >= other.x + other.w ||
            this.y + this.h <= other.y ||
            this.y >= other.y + other.h); 
    }
    
    show(){
        fill(this.color);
        rect(this.x, this.y, this.w, this.h);
    }
}

class Vehicle extends Rectangle {
    constructor(x, y, w, h, c, xs){
        super(x, y, w, h, c);
        this.xs = xs;        
    }
    
    update(){
        this.x += this.xs;

        if (this.xs > 0 && this.x > WIN_WIDTH){
            this.x = -this.w*2;
        } else if (this.xs < 0 && this.x + this.w < 0) {
            this.x = WIN_WIDTH + this.w*2;
        }
    }
}





class Lane {    
    constructor(row, isSafe, vtype){
        this.isSafe = isSafe;
        this.row = row;
        this.x = 0;
        this.y = this.row *scl;
        this.w = WIN_WIDTH;
        this.h = scl;
        this.c = color(120);

        if (!this.isSafe){
            this.c = color(60);
            this.vtype = vtype;
            this.vehicles = [];
            this.vamt = 4;


            if (this.vtype == 'car'){
                // this.vamt = floor(random(2, 5));
                this.vw = scl*2;
                this.vxs = random(-5, 5);
                if(this.vxs == 0 ){
                    this.vxs = random([-1, 1]);
                }
                this.vc = color(random(255), random(255), random(255), 150);

            } else if (this.vtype == 'log'){
                this.c = color(0, 0, 50);
                // this.vamt = floor(random(2, 5));
                this.vw = scl*random(2, 5);
                // this.vxs = floor(random([-5,-4, -3, -2, -1, 1, 2, 3, 4, 5]));
                this.vxs = random(-5, 5);
                if(this.vxs == 0 ){
                    this.vxs = random([-1, 1]);
                }

                this.vc = color(random(255), random(255), random(255), 150);


            } else if (this.vtype == 'bay'){
                this.c = color(0, 0, 50);
                // this.vamt = 4;
                this.vw = scl;
                this.vxs = 0;
                this.vc = color(255);

            }
            this.vh = scl;
            this.vspace = (WIN_WIDTH - this.vamt*scl)/this.vamt;
            for (let i=0; i<this.vamt; i++){
                let vx = ((this.vw + this.vspace) * i)+scl*2;

                let v = new Vehicle(vx, this.y, this.vw, this.vh, this.vc, this.vxs);
                this.vehicles.push(v);
            }
        }
    }

    update(){
        if (!this.isSafe){
            for (let v of this.vehicles){
                v.update();
            }
        }
    }

    display () {
        push();
        noStroke();
        fill(this.c);
        if (!this.isSafe){
            rect(this.x, this.y, this.w, this.h);
            for (let v of this.vehicles){
                v.show();
            }
        } else {
            rect(this.x, this.y, this.w, this.h);
        }
        pop();
    }

}