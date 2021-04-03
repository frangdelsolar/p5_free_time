class Paddle{
    constructor(brain) {
        this.x = width/2;
        this.y = height - 25;
        this.w = 100; 
        this.h = 10;
        this.score = 0;

        if (brain){
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(5, 20, 2);
        }
        this.fitness = 0;
        this.hits = 0;
        this.dead = false
    }

    die(){
        this.dead = true;
    }

    hit(){
        this.hits++;
    }

    calcFitness(){
        let points = this.hits;
        this.fitness = points*points;
    }

    getInputs(){
        let inputs = [];
        inputs[0] = ball.x - this.x;
        inputs[1] = ball.y - this.y; 
        inputs[2] = ball.xspeed; 
        inputs[3] = ball.yspeed; 
        inputs[4] = ball.acc;
        // inputs[5] = this.foodLeft();
        // inputs[6] = this.distFood();
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
        if (index == 0) {
            this.move(10);
        } else if (index == 1) {
            this.move(-10);
        } else {
        }
    }


    move(steps){
        this.x += steps;
        this.x = constrain(this.x, this.w/2, width-this.w/2);
    }

    show() {
        push();
        fill(255);
        rect(this.x-this.w/2, this.y-this.h/2, this.w, this.h);
        pop();
    }
}