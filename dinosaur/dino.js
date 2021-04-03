class Dino{
    constructor(brain){
        this.w = 30;
        this.h = 60;
        this.x = width/5;
        this.y = piso.y1-this.h;
        this.gravity = 0.7;
        this.lift = -15;
        this.velocity = 0;
        this.dead = false;

        this.frames = 0;

        if (brain){
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(5, 9, 3);
        }
        this.fitness = 0;
    }

    calcFitness(){
        this.fitness = this.frames;
    }

    nextObs(){
        let exists = 0;
        let next = 0;
        let dist = Infinity;
        let h = Infinity;


        for (let obs of obstacles){
            if (obs != next){
                let aprox = obs.x - this.x;
                if (aprox < dist){
                    if (this.x + this.w <= obs.x ){
                        next = obs;
                        dist = aprox;
                        h = obs.h;
                        exists = 1;
                    }
                }
            }
        }

        let data = {
            exists: exists,
            dist: dist,
            h: h
        }
        
        if(next){
            stroke(0);
            line(this.x + this.w, this.y1, next.x, next.y);
        }
        return data;
    }

    getInputs(){
        let inputs = [];
        inputs[0] = this.y;
        inputs[1] = this.velocity;

        let nextD = this.nextObs();
        inputs[2] = nextD.exists; // Hay obstaculo? 1 o 0 
        inputs[3] = nextD.dist; // Distancia
        inputs[4] = nextD.h; // Velocidad        
        // inputs[5] = 0; // dista
        // inputs[6] = 0;
        // inputs[6] = this.xSpeed;
        // inputs[7] = this.ySpeed;
        // console.log(inputs)
        return inputs; 
    }


    think(){

        let inputs = this.getInputs();
        let output = this.brain.predict(inputs);        
        let max = Math.max(...output);
        let index = output.indexOf(max);

        return {index:index, input: inputs, output:output}
    }

    execute(){
        let index = this.think().index;
        this.h = 60;

        if (index == 0) {
            this.jump();
        } else if (index == 1) {
            this.h = 30;
        } else {

        }
    }

    update(){
        if (this.dead){
            return;
        }

        this.frames++;

        this.execute();

        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y + this.h > piso.y1) {
            this.y = piso.y1 - this.h;
            this.velocity = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }

        if(keyIsDown(DOWN_ARROW)){
            this.h = 30;
        } else {
            this.h = 60;
        }
    }

    jump(){
        if (this.dead){
            return;
        }
        if(this.velocity == 0){
            this.velocity += this.lift;
        }
    }

    // bend(){
    //     this.h = 30;
    // }


    die(){
        this.dead = true;
    }

	intersects(rango){
        if (this.dead){
            return;
        }
        
		return !(rango.x > this.x + this.w ||
				    rango.x + rango.w < this.x ||
				    rango.y > this.y + this.h ||
                    rango.y + rango.h < this.y);
        }

    show(color){
        if (this.dead){
            return;
        }
        fill(color);
        rect(this.x, this.y, this.w, this.h);
    }

}

