class Obstacle{
    constructor(type, speed){
        // type cactus
        this.w = 20;
        this.h = 60;
        this.x = width + this.w;
        this.y0 = piso.y1-this.h
        this.y1 = 0;

        this.r = this.h/2;
        this.a = 0;

        this.color = color(random(255), 0, random(255), 100);
        
        if (type == 'bird'){
            this.h = 20;
            this.y1 = piso.y1-79;
            this.color = color(0, random(255), 0, 100);

        }

        this.velocity = speed;
        this.dead = false;
    }

    update(){
        this.y1 = this.h * Math.sin(this.a) + this.y0;
        this.x += this.velocity;
        if (this.x + this.w < 0) {
            this.dead = true;
        }
        this.a += 0.1;
    }

    show(){
        fill(this.color);
        rect(this.x, this.y1, this.w, this.h);
    }

}

