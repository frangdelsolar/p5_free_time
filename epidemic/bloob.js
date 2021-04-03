class Bloob {
    constructor(pos, r, house){
        this.pos = pos;
        this.vel = createVector();
        this.r = r;
        this.speed = 20;
        this.house = house; // the place where he lives
        this.location = house; // the building is right now
        this.job = null; // the place where it works
        this.visitIndex = 0;
        this.visits = [];
        this.routine = null;

        this.lifespan = floor(random(1, 10));
        this.dead = false;

        this.status = 0; // 0 Susceptible, 1 contagious, 2 no contagioso
        this.virus = null;
        // this.dna = new DNA();

        this.color = color(20, 200, 200, 80);
    }

    contagiar(){
        let proseguir = false;

        if (this.status == 1){
            let conprob = this.virus.getProbContagio()
            if (random() < conprob){
                if (this.virus.can){
                    for(let other of this.location.bloobs){
                        if(this != other){
                            if(other.status == 0){
                                proseguir = true;
                            } else if (other.status == 1){
                                if(conprob > other.virus.getProbContagio()){
                                    proseguir = true;
                                }
                            }

                            if (proseguir){
                                let distance = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
                                let max_distance = this.virus.getDist();
                                if (distance <= max_distance){
                                    other.getSick(this.virus);
                                }
                            }
                        } 
                    }
                }
            }
        }


    }

    morir(){
        if(this.virus){
            if(random() < this.virus.getMortalidad()){
                this.dead = true;
                if(!this.virus.dna.deads.includes(this)){
                    this.virus.dna.deads.push(this);
    
                }
            }

        }

    }

    getSick(virus){
        this.status = 1;
        if(virus){
            this.virus = new Virus(virus.dna);
            this.virus.dna.mutate();

            if(!virus.dna.bloobs.includes(this)){
                virus.dna.bloobs.push(this);

            }
           
        } else {
            this.virus = new Virus();
        }

        let c = this.virus.getColor();
        this.color = color(c, 0, c, 200);
    }

    curarse(){
        this.status = -1;
        this.color = color(0, 200, 0, 100);
    }

    envejecer(){
        if(this.lifespan <= 0){
            this.dead = true;
        }
        this.lifespan--;

        if(this.virus){
            this.virus.envejecer();

            if(this.virus.lifespan == this.virus.age){
                this.curarse();
                this.virus = null
            }
        }
    }

    reproduce(){
        createBloob(this.house);
    }

    setVisitsToZero(){
        this.visitIndex = 0;
    }

    getAJob(){
        this.job = random(jobs);
    }

    go(dest){
        // stroke(255, 10)
        // line(this.pos.x, this.pos.y, dest.x, dest.y);
        let destPos = dest.copy();
        let vel = destPos.sub(this.pos);
        this.vel = vel.normalize();
        this.pos.add(this.vel.mult(this.speed));
    }

    goWork(){
        this.routine = new WorkRoutine(this);
    }

    goHome(){
        this.routine = new HomeRoutine(this);
    }

    goSomewhere(){
        this.routine = new SomewhereRoutine(this);
    }

    update(){

        if (this.routine){
            this.routine.update();
        } 

    }

    show(){
        push();
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
        pop();
    }
}