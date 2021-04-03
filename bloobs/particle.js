function randomizeDna(){
    let size = random(); //set both speed and 

    let colors = [
        [0, 0, 1],
        [0, 1, 0],
        [1, 0, 0]
    ]
    let shade = 1;
    let color = colors[floor(random(3))];
    let cr = color[0]*shade;
    let cg = color[1]*shade;
    let cb = color[2]*shade;
    let mult = random();
    let lifespan = random();
    let force = random();
    return [size, cr, cg, cb, mult, lifespan, force];
}

class Particle {
    constructor(pos, dna) {
        if(pos){
            this.pos = pos;
        } else {
            this.pos = createVector(random(width), random(height));
        }
      this.xs = random(-1, 1);
      this.ys = random(-1, 1);
      this.count = 0; // frames vivo
      this.dead = false;

      this.available = false;

      if (dna){
        this.dna = dna;
      } else {
        this.dna = randomizeDna();
      }
      
      this.r = map(this.dna[0], 0, 1, 1, 40);
      this.color = color(255*this.dna[1],255*this.dna[2], 255*this.dna[3], 200*this.dna[0]);
      this.mult = map(this.dna[4], 0, 1, 0, 100); // Decide cuándo cambiar de dirección
      this.lifespan = map(this.dna[5], 0, 1, 1, 1000);; // Fecha de expiración
      this.force = map(this.dna[6], 0, 1, 0, 1);

    }

    die (){
        if (this.count >= this.lifespan){
            this.dead = true;
        }

    }

    mutate(p){
        let r = random();
        if (r<=p){
            return true;
        }
        return false
    }

    selectPartner(){
        for (let particle of particles){
            if(this != particle){
                if (particle.available){
                    if (dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y) <= (this.r + particle.r)*1.5){
                        return particle;
                    }
                }
            }
        }
    }

    crossover (other){
        let self = this.dna;
        other = other.dna;

        let size = (self[0] + other[0])/2;
        let cr = (self[1] + other[1]) % 2;
        let cg = (self[2] + other[2]) % 2;
        let cb = (self[3] + other[3]) % 2;
        let mult = (self[4] + other[4])/2;
        let lifespan = (self[5] + other[5])/2;
        let force = (self[6] + other[6])/2;

        return [size, cr, cg, cb, mult, lifespan, force];
    }

    reproduce(){
        if (!this.available){
            return;
        }
        let pos = createVector(this.pos.x, this.pos.y);
        let partner = this.selectPartner();

        if (partner){
            let dna = this.crossover(partner);
            if (this.mutate(0.3)){
                dna = randomizeDna();
            } 
            let p = new Particle(pos, dna);
            particles.push(p);
            this.available = false;
            partner.available = false;
        } else {
            // let dna = this.dna;
            // if (this.mutate(0.3)){
            //     dna = randomizeDna();
            // } 
        }       

    }

    eat (food){
        let d = dist(this.pos.x, this.pos.y, food.pos.x, food.pos.y);

        if (d <= this.r/2 + food.r/2){
            this.available = true;
            // this.reproduce();
            return true;
        } else {
            return false;
        }
    }
  
    edges(){
        if(this.pos.x + this.r <= 0){
            this.pos.x = width + this.r;
        } else if(this.pos.x - this.r >= width){
            this.pos.x = 0 - this.r;
        }
        if(this.pos.y + this.r <= 0){
            this.pos.y = height + this.r;
        } else if(this.pos.y - this.r >= height){
            this.pos.y = 0-this.r;
        }
    }

    update() {
        this.pos.x += this.xs*this.force; 
        this.pos.y += this.ys*this.force;
        
        if (this.count % floor(this.mult) == 0){
            this.xs = random(-1, 1);
            this.ys = random(-1, 1);
            }

        this.edges();
        this.reproduce();
        this.die();
        this.count++;
    }
  
 
    show() {
      fill(this.color);
      ellipse(this.pos.x, this.pos.y, this.r);

    }
  }