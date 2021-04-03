class Simulation{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.enemies = new Group(this);
    }

    die(){

        if(this.player.age - this.player.lastHit >= 150){
            this.player.dead = true;
            return; 
        }

        for(let enemy of this.enemies.agents){

            if (enemy.pos.y + enemy.size/2 >= this.y+this.height ){
                this.player.dead = true;
                return;               
            }

            if (enemy.hit(this.player)){
                this.player.dead = true;
                return;
            }
    
            if (this.player.hit(enemy)){
                if (enemy.bullet){
                    enemy.bullet = null;
                }
                let index = this.enemies.agents.indexOf(enemy);                
                this.enemies.agents.splice(index, 1);
            }
        }
    }

    update(){
        if(this.player.dead){
            return;
        }
        this.player.update();
        this.enemies.update();

        this.die();

        if (keyIsDown(LEFT_ARROW)) {
            this.player.moveLeft();
        }

        if (keyIsDown(RIGHT_ARROW)) {
            this.player.moveRight();
        }
    }

    shoot(){
        this.player.shoot();
    }

    show(){
        push();
        fill(50);
        rect(this.x, this.y, this.width, this.height);
        pop();
        this.player.show();
        this.enemies.show();

        this.showNN();
    }

    showNN(){
        let SQSZ = 10;
        let offset = SQSZ*3;
        let brain = this.player.think();


        stroke(100);
        for (let i=0; i < brain.input.length; i++ ){
            SQSZ = this.height/brain.input.length/3;

            fill(0, 255*brain.input[i], 0);
            ellipse(this.x+this.width+offset, this.y+offset+SQSZ*i*2, SQSZ*2, SQSZ*2)
        }

        for (let i=0; i < brain.output.length; i++ ){  
            let value = brain.output[i]; 

            let x = this.x+this.width+(offset*3);
            let y = this.y+(offset*2)*i+offset+offset;        
            fill(255*value);
            ellipse(x, y, SQSZ*5, SQSZ*5)
            textSize(SQSZ*2);
            textAlign(CENTER, CENTER);
            fill(255, 0, 0);
            text(value.toFixed(2), x, y);

        }

        textSize(20);
        fill(255);
        let x = this.x+this.width+(offset*8);
        let y = this.y+(offset*3);
        this.player.calcFitness();
        text(this.player.fitness.toFixed(2), x, y);


    }
}