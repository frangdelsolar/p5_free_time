class Agent{
    constructor(r, c, color){
        this.r = r;
        this.c = c;
        this.pos = createVector((this.c * sqSize) + sqSize/2, (this.r * sqSize) + sqSize/2);
        this.radius = 16;
        this.color = color;
        this.particle = new Particle(this.pos);
    }

    move(dir){
        this.c += dir[0];
        this.r += dir[1];

        if (this.c < 0){
            this.c = level.grid[0].length-1;
        } else if (this.c > level.grid[0].length-1){
            this.c = 0;
        }

        if (level.grid[this.r][this.c] == 1){
            this.c -= dir[0];
            this.r -= dir[1];
        }

        this.pos.x = (this.c * sqSize) + sqSize/2;
        this.pos.y = (this.r * sqSize) + sqSize/2;

        this.particle.pos =  createVector(x, y);
    }

    show(){
        
        fill(255, 200, 90);
        circle(this.pos.x, this.pos.y, this.radius);
        // this.particle.show();
        const scene = this.particle.look(level.walls);
        const w = width / scene.length;
        push();
        translate(width, 0);
        for (let i = 0; i < scene.length; i++) {
          noStroke();
          const sq = scene[i] * scene[i];
          const wSq = width * width;
          const b = map(sq, 0, wSq, 255, 0);
          const h = map(scene[i], 0, width, height, 0);
          fill(b);
          rectMode(CENTER);
          rect(i * w + w / 2, height / 2, w + 1, h-200);
        }
        pop();
        
    }
}

