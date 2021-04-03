class Snake{
    constructor(){
        this.r = Math.floor(random(ROWS));
        this.c = Math.floor(random(COLS));
        this.ySpeed = 1;
        this.xSpeed = 0;
        this.tail = [];
        this.particle = new Particle(this.get_pos())
        this.fov = 120;
    }

    get_pos(){
        let x = (this.r * SQSZ) + SQSZ/2;
        let y = (this.c * SQSZ) + SQSZ/2;
        let pos = createVector(x, y);
        return pos;
    }

    update(){

        for (let i=this.tail.length-1; i >= 0; i--){
           if ( i > 0){
               this.tail[i] = this.tail[i-1];
           } else {
               this.tail[i] = [this.r, this.c];
           } 
        }        
        
        this.r += this.ySpeed;
        this.c += this.xSpeed;

        if (this.r >= ROWS-1){
            this.r = ROWS-1;
        } else if (this.r <= 0) {
            this.r = 0;
        }

        if (this.c >= COLS-1){
            this.c = COLS-1;
        } else if (this.c <= 0) {
            this.c = 0;
        }

        this.particle.pos = this.get_pos();
        this.particle.updateFOV(this.fov);

    }

    move(dir){
        let can_move = true;
		if (this.xSpeed != 0 && dir[1] != 0){
            can_move = false;
        }
		if (this.ySpeed != 0 && dir[0] != 0){
            can_move = false;
        }

		if (can_move){
			this.xSpeed = dir[1];
            this.ySpeed = dir[0];
        }
    }

    eat (food){
        if(this.r == food.r && this.c == food.c){
            this.tail.push([food.r, food.c]);
            return true;
        }
        return false;
    }

    show(){
        fill(255);
        rect(this.r*SQSZ, this.c*SQSZ, SQSZ, SQSZ);

        for (let i = this.tail.length-1; i >= 0; i--){
            let color = map(i,this.tail.length, 0, 0, 255);
            fill(color);
            stroke(100)
            rect(this.tail[i][0]*SQSZ, this.tail[i][1]*SQSZ, SQSZ, SQSZ);          
        }

        const scene = this.particle.look(walls);
        const w = WIDTH_EYE / scene.length;
        push();
        for (let i = 0; i < scene.length; i++) {
          noStroke();
          const sq = scene[i] * scene[i];
          const wSq = WIDTH_EYE * WIDTH_EYE;
          const b = map(sq, 0, wSq, 255, 0);
          const h = map(scene[i], 0, WIDTH_EYE, HEIGHT, 0);
          fill(b);
          rect(i * w + WIDTH, (HEIGHT-h)/2, w , h);
        }
        pop();

    }
}
