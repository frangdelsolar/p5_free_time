class Ball{
    constructor(){
        this.x = width/2;
        this.y = height/2;
        this.r = 12;
        this.xspeed = 4;
        this.yspeed = 3;
        this.acc = 1;
        this.reset();
    }

    accelerate(){
        let maxacc = 3.5;
        let increment = 0.15;

        this.xspeed *= this.acc;
        this.yspeed *= this.acc;
        this.acc += increment;

        if(this.acc >= maxacc){
            this.acc = maxacc;
        }

    }

    checkLeft(p){
        if (
            this.y - this.r < p.y + p.h / 2 &&
            this.y + this.r > p.y - p.h / 2 &&
            this.x - this.r < p.x + p.w / 2
          ) {
            if (this.x > p.x) {
              let diff = this.y - (p.y - p.h / 2);
              let rad = radians(45);
              let angle = map(diff, 0, p.h, -rad, rad);
              this.xspeed = 5 * cos(angle);
              this.yspeed = 5 * sin(angle);
              this.x = p.x + p.w / 2 + this.r;
              this.accelerate();
              left.hit();
            }
          }
    }
    
    checkRight(p){
        if (
            this.y - this.r < p.y + p.h / 2 &&
            this.y + this.r > p.y - p.h / 2 &&
            this.x + this.r > p.x - p.w / 2
          ) {
            if (this.x < p.x) {
              let diff = this.y - (p.y - p.h / 2);
              let angle = map(diff, 0, p.h, radians(225), radians(135));
              this.xspeed = 5 * cos(angle);
              this.yspeed = 5 * sin(angle);
              this.x = p.x - p.w / 2 - this.r;
              this.accelerate();
              right.hit();
                }
          }
    }

    reset(){
        this.acc = 1;

        this.x = width/2;
        this.y = height/2;
        
        let angle = random(-PI / 4, PI / 4);
        this.xspeed = 5 * Math.cos(angle);
        this.yspeed = 5 * Math.sin(angle);
    
        if (random(1) < 0.5) {
          this.xspeed *= -1;
        }
    }

    edges(){
        if (this.y - this.r < 0 || this.y + this.r > height){
            this.yspeed *= -1;
        }

        if (this.x - this.r < 0){
            right.score++;
            left.die();
            // ding.play();
            this.reset();
        }

        if (this.x + this.r > width){
            left.score++;
            right.die();

            // ding.play();
            this.reset();
        }
    }

    update(){

        this.x += this.xspeed;
        this.y += this.yspeed;
        this.edges();
    }

    show(){
        fill(255);
        ellipse(this.x, this.y, this.r*2, this.r*2);
    }
}