class Enemy{
    constructor(sim, x, y){
        this.simulation = sim;
        this.pos = createVector(x, y);
        this.xSpeed = -1;
        this.size = this.simulation.height/20;
        this.bullet = null;
        this.color = [255, 255, 255];
    }

    shoot(){
        if(!this.bullet){
            this.bullet = new Bullet(this.pos, 1, this.color);
            bullet = this.bullet;
        }
    }

    hit(other){
        if (!this.bullet){
            return false;
        }

        if (this.bullet.pos.x >= other.pos.x-other.size/2 && 
            this.bullet.pos.x <= other.pos.x+other.size/2 &&
            this.bullet.pos.y + this.bullet.size >= other.pos.y-other.size/2 &&
            this.bullet.pos.y + this.bullet.size <= other.pos.y+other.size/2){
            this.bullet = null;
            bullet = null;
            return true;
        } 

    }

    advance(){
        // this.pos.y += this.size;
        this.xSpeed *= -1;
    }

    update(){
        this.pos.x += this.xSpeed;
        if (this.bullet){
            this.bullet.update();

            if (this.bullet.pos.y >= this.simulation.y + this.simulation.height){
                this.bullet=null;
            }
        }
    }

    moveLeft(){
        this.pos.x -= 5;
        if(this.pos.x <= 0 + this.size/2){
            this.pos.x = 0 + this.size/2;
        }
    }

    moveRight(){
        this.pos.x += 5;
        if(this.pos.x >= this.simulation.width - this.size/2){
            this.pos.x = this.simulation.width - this.size/2;
        }
    }

    show(){
        push();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
        pop();

        if (this.bullet){
            this.bullet.show();
        }
    }
}