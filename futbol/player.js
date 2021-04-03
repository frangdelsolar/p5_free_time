class Player{
    constructor(team, index, co, brain){
        this.team = team;
        this.pos = null;
        this.resetPos();
        this.vel = createVector();
        this.target = createVector();
        this.r = 25;
        this.maxspeed = 100;
        if (brain){
            this.brain = brain;
        } else {
            this.brain = new NeuralNetwork(7, 12, 4);
        }
        this.goals = 0;
        this.kicks = 0;
        this.fitness = 0;
        this.index = index;
        this.co = co;

        this.score = null;
        if (this.team.team == 0){
            this.score = createVector(fieldMaxX, height/2);
        } else {
            this.score = createVector(fieldMinX, height/2);
        }
    }

    resetPos(){
        let x = random(0, width/2);
        let y = random(height);
        if (this.team.team == 1){
            x = random(width/2, width);
        } 
        this.pos = createVector(x, y);       
    }


    getFriend(){
        return this.team.players[this.index];
    }

    getEnemy(){
        if (this.team.team==0){
            return team1.players[this.index];
        } else {
            return team0.players[this.index];
        }
    }

    calcFitness(){
        this.fitness = 0;
        let d = ball.pos.dist(this.pos);
        this.fitness = 1/d + this.kicks + Math.pow(this.goals*100, 2);
        if (this.goals < 0){ // si hizo gol en contra
            this.fitness = 0;
        }
    }

    getInputs(){
        let inputs = [];

        inputs[0] = this.pos.x-ball.pos.x;
        inputs[1] = this.pos.y-ball.pos.y;
        inputs[2] = map(this.pos.x, 0, width, 0, 1);
        inputs[3] = map(this.pos.y, 0, height, 0, 1); 
        inputs[4] = map(ball.pos.x, 0, width, 0, 1);
        inputs[5] = map(ball.pos.y, 0, height, 0, 1); 

        let ck = this.canKick();
        if (ck){
            inputs[6] = 1;
        } else {
            inputs[6] = 0;
        }
         
        return inputs; 
    }

    drawInput(input){
        let x = 20;
        if (this.team.team == 1){
            x = width-200;
        }
        textSize(14);
        noStroke();
        fill(255);

        for(let i=0; i<input.length; i++){
            text(input[i], x, 20*i + 30);
        }
    }

    drawOutput(output){
        let x = 20;
        if (this.team.team == 1){
            x = width-200;
        }
        textSize(14);
        noStroke();
        fill(255);
        let pangle = 'pangle:  ' + map(output[0], 0, 1, 0, 360);
        let ppower = 'ppower:  ' + map(output[1], 0, 1, 0, 10);
        let kdir = 'kdir:  ' + map(output[2], 0, 1, 0, 360);
        let kpower = 'kpower:  ' + map(output[3], 0, 1, 0, 10);

        text(pangle, x, 30);
        text(ppower, x, 50);
        text(kdir, x, 70);
        text(kpower, x, 90);
    }

    think(){
        let inputs = this.getInputs();
        let output = this.brain.predict(inputs);        
        let max = Math.max(...output);
        let index = output.indexOf(max);

        // textSize(10);
        // textAlign(CENTER, CENTER);
        // fill(255);
        // let msg = output[2] + ' / ' + output[3];
        // text(msg, this.pos.x, this.pos.y);



        return {index:index, input: inputs, output:output}
    }

    execute(){
        let output = this.think().output;
        let pangle = map(output[0], 0, 1, 0, 360);
        let ppower = map(output[1], 0, 1, 0, 100);
        let kdir = map(output[2], 0, 1, 0, 360);
        let kpower = map(output[3], 0, 1, 0, 10);

        this.move(pangle, ppower);        
        this.kick(kdir, kpower);
    }

    kick(dir, power){
        if (this.canKick()){
            let force = p5.Vector.fromAngle(radians(dir), power)
            ball.applyForce(force);
            ball.lastkicked = this;
            this.kicks++;
        }       
    }

    edges(){
        if (this.pos.x <= fieldMinX){
            this.pos.x = fieldMinX;
        } else if (this.pos.x >= fieldMaxX){
            this.pos.x = fieldMaxX;
        }

        if (this.pos.y <= fieldMinY){
            this.pos.y = fieldMinY;
        } else if (this.pos.y >= fieldMaxY){
            this.pos.y = fieldMaxY;
        }
    }

    update(){
        this.pos.add(this.vel.normalize())
        if (abs(this.pos.x - this.target.x) <= this.r/4 && abs(this.pos.y - this.target.y)<= this.r/4){
            this.vel.mult(0);
            this.target.mult(0);
        }
        this.edges();
    }

    move(a, p) {

        this.vel = p5.Vector.fromAngle(radians(a), p)
    }

    canKick(){
        return (abs(this.pos.x - ball.pos.x) <= this.r - ball.r && 
                abs(this.pos.y - ball.pos.y)<= this.r - ball.r);
    }

    show(){
        push();
        fill(this.team.c);
        stroke(51);
        strokeWeight(1);
        circle(this.pos.x, this.pos.y, this.r);

        textSize(10);
        textAlign(CENTER, CENTER);
        fill(255);
        let msg = this.kicks + ' / ' + this.goals;
        text(msg, this.pos.x, this.pos.y);

        
        // let enemy = this.getEnemy();
        // stroke(220, 20, 0, 50);
        // line(this.pos.x, this.pos.y, enemy.pos.x, enemy.pos.y);

        // let friend = this.getFriend();
        // stroke(20, 220, 0, 50);
        // line(this.pos.x, this.pos.y, friend.pos.x, friend.pos.y);

        if (this.canKick()){
            noFill();
            stroke(0,255, 0);
            circle(this.pos.x, this.pos.y, this.r*2);
        }
        pop();
    }
}