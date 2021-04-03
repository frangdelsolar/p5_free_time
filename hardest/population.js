class Population {
    constructor(level){
        this.players = [];
        this.popsize = 60;
        this.matingpool = [];
        this.best = null;

        for (let i=0; i<this.popsize; i++){
            this.players[i] = new Player(level);
        }
    }

    evaluate(){
        let maxfit = 0;
        for (let player of this.players){
            player.calcFitness();
            if (player.fitness > maxfit){
               maxfit = player.fitness;
               this.best = player;
            }

        }

        for (let player of this.players){
            if(maxfit == 0){
                maxfit = 1;
            } 
            player.fitness /= maxfit;
        }

        this.matingpool = [];

        for (let player of this.players){
            let n = player.fitness * 100;
            for (let j = 0; j < n; j++){
                this.matingpool.push(player);
            }
        }
    }

    selection () {
        let newPlayers = [];
        for (let i = 0; i < this.players.length; i++){
            let parentA = random(this.matingpool).brain;
            let parentB = random(this.matingpool).brain;
            let child = parentA.crossover(parentB);
            // let child = this.best.brain;
            child.mutation();
            newPlayers[i] = new Player(level, child);
            // newPlayers[i] = new Player(level, this.best.brain);
        }
        this.players = newPlayers;
    }

    run() {
        for (let player of this.players){
            player.update();
            player.think();
            for (let dot of level.dots){
                if (player.hit(dot)){
                    player.dead=true;
                }
            } 
            // player.show();
        }
    }

    show(){
        for (let player of this.players){
            player.show();
        }  
    }
}