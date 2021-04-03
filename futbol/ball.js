class Ball{
    constructor(){
        this.pos = createVector(width/2, height/2);
        this.vel = createVector();
        this.r = 15;
        this.acc = createVector();
        this.friction = createVector(0.01, 0.01);
        this.maxspeed = 12;
        this.lastkicked = null;
    }

    edges(){
        if (this.pos.x <= fieldMinX){
            this.pos.x = fieldMinX;
        } else if (this.pos.x >= fieldMaxX){
            this.pos.x = fieldMaxX;
        }

        if (this.pos.y <= fieldMinX){
            this.pos.y = fieldMinY;
        } else if (this.pos.y >= fieldMaxY){
            this.pos.y = fieldMaxY;
        }
    }

    reset(){
        this.pos = createVector(width/2, height/2);
        this.vel.mult(0);
        this.acc.mult(0);
    }

    goal(){

        if(this.pos.x + this.r/2 >= fieldMaxX && this.pos.y >= porterMinY && this.pos.y <= porterMaxY){
            console.log('goal team 0')
            team0.goals++;
            team0.total++;
            
            if(this.lastkicked.team.team == 0){
                this.lastkicked.goals++;
            } else {
                this.lastkicked.goals-=1000;
            }

            this.reset();
            team0.resetPos();
            team1.resetPos();
        }

        if(this.pos.x - this.r/2 <= fieldMinX && this.pos.y >= porterMinY && this.pos.y <= porterMaxY){
            console.log('goal team 1');
            team1.goals++;
            team1.total++;

            if(this.lastkicked.team.team == 1){
                this.lastkicked.goals++;
            } else {
                this.lastkicked.goals-=1000;
            }

            this.reset();
            team0.resetPos();
            team1.resetPos();
        }

    }

    update(){

        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);

        this.pos.add(this.vel);
        this.acc.mult(0);
        
        this.friccion();
        this.goal();
        this.edges();

    }

    applyForce(f){
        this.acc.add(f);
    }

    friccion() {
   
          // Direction of Friction
          let friction = this.vel.copy();
          friction.normalize();
          friction.mult(-1);
          // Magnitude of Friction
          let mu = 0.1;
          let normal = 1;
          friction.setMag(mu * normal);
          this.applyForce(friction);
    
      }

    show(){
        push();
        fill(220);
        stroke(120);
        circle(this.pos.x, this.pos.y, this.r);
        pop();
    }
}