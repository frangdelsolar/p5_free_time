class Player{
    constructor(level, brain){
        let pos = level.getPos(3, 0);
        this.x = pos.x + 2;
        this.y = pos.y + 2;
        this.scl = level.scl*0.6;
        this.level = level;
        this.dead = false;
        this.dir = [];
        this.moving = false;
        this.recordDist = 1000000;


        if(brain){
            this.brain = brain;
        } else {
            // let best = loadJSON('best.json');
            // this.brain = new DNA(best.genes);
            // console.log(best.genes==this.brain.genes)
            this.brain = new DNA();
        }
        this.fitness = 0;
        // this.checkpoints = [[157, 215],
        //                     [212, 290],
        //                     [540, 193],
        //                     [660, 355]]
        // this.visited = [false, false, false, false]
    }

    visitCP(){
        for (let i=0; i<this.visited.length; i++){
            if (!this.visited[i]){
                let x = this.checkpoints[i][0];
                let y = this.checkpoints[i][1];
                let distance = dist(this.x, this.y, x, y);
                if(distance < 10){
                    this.visited[i] = true;
                }
            } 
        }
    }

    checkTarget (){
        let pos = level.getPos(3, 16);

        let d = dist(this.x, this.y, pos.x, pos.y);
        if (d < this.recordDist) 
            this.recordDist = d;
    }

    calcFitness(){

        if (this.recordDist < 1) this.recordDist = 1;        
        this.fitness = 1/(this.recordDist);
        this.fitness = Math.pow(this.fitness, 4);
        if (this.dead) this.fitness *= 0.1;
    }

    think(){
        if(this.dead){
            return;
        }
        let gene = this.brain.genes[cycle];  
        this.move(gene[0], gene[1]);
    }


    edges(x, y){
        if(this.dir[0] > 0){
            x += this.scl;
        }
        if(this.dir[1] > 0){
            y += this.scl;
        }
        let pos = this.level.getCoord(x, y);
        if (this.level.grid[pos.row][pos.col] == 0){
            return true;
        }
        return false;
    }

    hit(dot){
        let dotPos = this.level.getCoord(dot.x-dot.r, dot.y-dot.r);
        let plaPos = this.level.getCoord(this.x, this.y);

        if (dotPos.col == plaPos.col && dotPos.row == plaPos.row){
            return true;
        }
    }

    update(){
        if(this.dead){
            return;
        }

        if(this.moving){
            let x = this.x + this.dir[0];
            let y = this.y + this.dir[1];
            if (!this.edges(x, y)){
                this.x = x;
                this.y = y;
            }
        }

        this.checkTarget();
    }

    move(x, y){
        if(this.dead){
            return;
        }

        this.dir = [x, y];
        this.moving = true;
    }

    release(){
        if(this.dead){
            return;
        }
        this.dir = [];
        this.moving = false;
    }

    show(){

        if(this.dead){
            return;
        }

        push();
        stroke(0);
        fill(220, 100, 100, 100);
        rect(this.x, this.y, this.scl, this.scl)
        pop();
    }
}