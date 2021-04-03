class Player{
    constructor(simulation, brain){
        this.simulation = simulation;
        this.size = this.simulation.height/15;
        this.pos = createVector();
        this.vel = createVector();
        this.bullet = null;
        this.lastHit = 0;
        this.color = [0, 255, 0];
        this.dead = false;
        this.setPos();

        this.killed = 0;

        if (brain){
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(20, 40, 4);
        }
        this.fitness = 0;
        this.age = 0;

    }

    calcFitness() {

        if(this.killed == this.simulation.enemies.agentamt){
            this.fitness = Infinity;
        } else {         
            let norm_age = this.age / cycle; 
            let norm_killed = (this.killed)/this.simulation.enemies.agentamt;
            if(Number.isNaN(norm_killed)){
                norm_age = 0;
            }
            if(Number.isNaN(norm_age)){
                norm_age = 0;
            }
            this.fitness =  this.killed + norm_age;

        }
    }

    getInputs(){
        let inputs = [];
        // Self
        inputs[0] = this.pos.x;
        inputs[1] = this.pos.y;
        inputs[2] = this.vel.x;
        inputs[3] = this.vel.y;    

        // Other Bullet data
        let otherbulletData = this.getOtherBulletData();
        inputs[4] = otherbulletData[0];
        inputs[5] = otherbulletData[1];
        inputs[6] = otherbulletData[2];
        inputs[7] = otherbulletData[2];

        // Next Enemy
        let enemyData = this.getEnemyData();
        inputs[8] = enemyData[0];
        inputs[9] = enemyData[1];
        inputs[10] = enemyData[2];
        inputs[11] = enemyData[3];
        inputs[12] = enemyData[4];
        inputs[13] = enemyData[5];
        inputs[14] = enemyData[6];
        inputs[15] = enemyData[7];

        // This bullet
        let thisbulletData = this.getThisBulletData();
        inputs[16] = thisbulletData[0];
        inputs[17] = thisbulletData[1];
        inputs[18] = thisbulletData[2];
        inputs[19] = thisbulletData[2];
        

        // console.log(inputs)


        return inputs; 
    }

    getEnemyData(){
        let data=[];
        
        let left = null;
        let distX = Infinity;
        let distY = Infinity;
        let leftY = Infinity;
        let leftDistX = Infinity;
        let leftDistY = Infinity;
        let right = null;
        let rightY = Infinity;
        let rightDistX = Infinity;
        let rightDistY = Infinity;




        for(let enemy of this.simulation.enemies.agents){
            distX = abs(this.pos.x - enemy.pos.x);
            distY = abs(this.pos.y - enemy.pos.y);
            if(enemy != left && enemy.pos.x <= this.pos.x && distX < leftDistX){
                left = enemy;                
                leftY = this.pos.y - enemy.pos.y;
                leftDistX = distX;
                leftDistY = distY;
            }

            if(enemy != right && enemy.pos.x > this.pos.x && distX < rightDistX){
                right = enemy;
                rightY = this.pos.y - enemy.pos.y;
                rightDistX = distX;
                rightDistY = distY;

            }
        }


        // Left enemy
        let leftExist = 0;
        let leftXDist = Infinity;
        let leftYDist = Infinity;
        let leftXVel = 0;

        if(left){
            leftExist = 1;
            leftXDist = left.pos.x - this.pos.x;
            leftYDist = left.pos.y - this.pos.y;
            leftXVel = left.xSpeed;

            fill(255, 0, 0);
            ellipse(left.pos.x, left.pos.y, 10, 10);
        } 

        // Right enemy
        let rightExist = 0;
        let rightXDist = Infinity;
        let rightYDist = Infinity;
        let rightXVel = 0;

        if(right){
            rightExist = 1;
            rightXDist = right.pos.x - this.pos.x;
            rightYDist = right.pos.y - this.pos.y;
            rightXVel = right.xSpeed;
            fill(0, 0, 255);
            ellipse(right.pos.x, right.pos.y, 10, 10);

        } 
        data = [leftExist, leftXDist, leftYDist, leftXVel, 
                rightExist, rightXDist, rightYDist, rightXVel]

        return data;
    }

    getThisBulletData(){
        let data =[];
        let atacking = 0;
        let bulletX = Infinity;
        let bulletY = Infinity;
        let bulletDir = 0;

        if (this.bullet){
            atacking = 1;
            bulletX = this.bullet.pos.x;
            bulletY = this.bullet.pos.y;
            bulletDir = this.bullet.dir;
        } 

        data = [atacking, bulletX, bulletY, bulletDir];

        return data
    }

    getOtherBulletData(){
        let data =[];
        let underAtack = 0;
        if (bullet){
            let bulletDistX = abs(bullet.pos.x - this.pos.x)/this.simulation.width;
            let bulletDistY = abs(bullet.pos.y - this.pos.y)/this.simulation.height;
            if (bullet.pos.x >= this.pos.x-this.size/2 && bullet.pos.x <= this.pos.x + this.size/2){
                underAtack = 1;
            }
            data = [1, underAtack, bulletDistX, bulletDistY];
            
        } else {
            data = [0, underAtack, Infinity, Infinity];
        }

        return data
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
            this.moveLeft();
        } else if (index == 1) {
            this.moveRight();
        } else if (index == 2){
            return;
        } else {
           this.shoot();
        }
    }

    setPos(){
        this.pos.x = this.simulation.x + this.simulation.width/2;
        this.pos.y = this.simulation.y + this.simulation.height - this.size;
    }

    shoot(){
        if(!this.bullet){
            this.bullet = new Bullet(this.pos, -1, this.color);
        }
    }

    hit(other){
        if (!this.bullet){
            return false;
        }

        if (this.bullet.pos.x >= other.pos.x-other.size/2 && 
            this.bullet.pos.x <= other.pos.x+other.size/2 &&
            this.bullet.pos.y <= other.pos.y+other.size/2 &&
            this.bullet.pos.y >= other.pos.y-other.size/2){
            this.bullet = null;
            this.lastHit = this.age;
            this.killed++;
            return true;
        }
    }

    update(){
        if(this.dead){
            return;
        } 
        this.age++;
        this.pos.add(this.vel);
        if(this.pos.x <= 0 + this.size/2){
            this.pos.x = 0 + this.size/2;
        } else if(this.pos.x >= this.simulation.width - this.size/2){
            this.pos.x = this.simulation.width - this.size/2;
        }

        this.execute();

        if (this.bullet){
            this.bullet.update();
            if (this.bullet.pos.y<= this.simulation.y){
                this.bullet=null;
            }
        }
    }

    moveLeft(){
        if(this.dead){
            return;
        } 
        // this.pos.x -= 5;
        this.vel = createVector(-5, 0);

    }

    moveRight(){
        if(this.dead){
            return;
        } 
        // this.pos.x += 5;
        this.vel = createVector(5, 0);


    }

    show(){
        if(this.dead){
            return;
        } 
        push();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
        pop();

        if (this.bullet){
            this.bullet.show();
        }
    }
}