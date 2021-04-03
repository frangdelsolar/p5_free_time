class Ball{
    constructor(){
        this.x = width/2;
        this.y = height/2;
        this.r = 12;
        this.xspeed = 4;
        this.yspeed = 2;
        this.acc = 1;
        this.reset();
    }

    intersects(b){

        // Bola desde la izquierda
        if(this.xspeed > 0){
            if (this.x + this.r >= b.x && 
                this.x - this.r <= b.x + b.w &&
                this.y + this.r >= b.y &&
                this.y - this.r <= b.y + b.h){
                    this.xspeed *= -1;
                }
        }

        // Bola desde la derecha
        if(this.xspeed < 0){
            if (this.x - this.r <= b.x + b.w && 
                this.x + this.r >= b.x &&
                this.y + this.r >= b.y &&
                this.y - this.r <= b.y + b.h){
                    this.xspeed *= -1;
                }
        }

        // Bola desde arriba
        if (this.yspeed > 0){
            if (this.x + this.r >= b.x &&
                this.x - this.r <= b.x + b.w &&
                this.y + this.r >= b.y &&
                this.y - this.r <= b.y + b.h){
                    this.yspeed *= -1;
                }
        }

        // Bola desde abajo
        if (this.yspeed < 0){
            if (this.x + this.r >= b.x &&
                this.x - this.r <= b.x + b.w &&
                this.y + this.r >= b.y &&
                this.y - this.r <= b.y + b.h){
                    this.yspeed *= -1;
                }         
        }
        

    }

    constrainSpeed(){
        let maxacc = 3.5;
        let maxspeed = 15;
        if(this.xspeed >= maxspeed){
            this.xspeed = maxspeed;
        }
        if(this.yspeed >= maxspeed){
            this.yspeed = maxspeed;
        }
        if(this.acc >= maxacc){
            this.acc = maxacc;
        }
    }

    accelerate(){

        let increment = 0.01;

        this.xspeed *= this.acc;
        this.yspeed *= this.acc;
        this.acc += increment;

        this.constrainSpeed();
    }

    checkPaddle(p){
        if (
            this.x - this.r < p.x + p.w / 2 &&
            this.x + this.r > p.x - p.w / 2 &&
            this.y - this.r < p.y + p.h / 2
          ) {
            if (this.y + this.r >= p.y - p.h/2) {
                this.yspeed *= -1;
            //   let diff = this.x - (p.x - p.w / 2);
            //   let rad = radians(45);
            //   let angle = map(diff, 0, p.w, rad, 0);
            //   if (random()<0.5){
            //       angle += radians(180);
            //   }

            //   this.xspeed = 5 * cos(angle);
            //   this.yspeed = 5 * sin(angle);
            //   this.x = p.x + p.w / 2 + this.r;

            //   this.accelerate();
              p.hit();
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
          this.yspeed *= -1;
        }
    }

    edges(){
        if (this.y - this.r < 0){
            this.yspeed *= -1;
            // this.accelerate();
        }

        if (this.x - this.r < 0 || this.x + this.r > width){
            this.xspeed *= -1;
            // this.accelerate();
        }

        if ( this.y + this.r > height){
            paddle.score++;
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