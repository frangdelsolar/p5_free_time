class Team{
    constructor(n, count){
        this.team = n;

        let c = color(255, 0, 0, 100);
        if (this.team == 1){
            c = color(0, 0, 255, 100);
        }
        this.c = c;

        this.players = [];
        for (let i=0; i<count; i++){
            let ni = floor(random(count));
            while (ni == i) ni = floor(random(count));
            this.players[i] = new Player(this, i, ni);
        }
        this.goals = 0;
        this.total = 0

        this.best = this.players[0];

    }

    resetPos(){
        for (let player of this.players){
            player.resetPos();
        }
    }

    calcFitness(){
        let maxfit = 0;
        let avgfit = 0;
        for (let player of this.players){
            player.calcFitness();
            if (player.fitness > maxfit){
                maxfit = player.fitness;
                this.best = player;
            }
            avgfit += player.fitness;
        }

        avgfit /= this.players.length;

        for (let player of this.players){
            player.fitness /= maxfit;
        }      
    }

    pickOne(list) {
        let index = 0;
        let r = random(1);
      
        while (r > 0) {
          r = r - list[index].fitness;
          index++;
        }
        index--;
        return list[index];
      }

    selection(){
        let newpopulation = [];

        for (let i=0; i<this.players.length; i++){

            let dad = this.pickOne(this.players).brain;
            let mom = this.pickOne(this.players).brain;
            let child = dad.crossover(mom);
            // let child = this.best.brain.copy();
            child.mutate(MUTATION); 
            let player = new Player(this, this.players[i].index, this.players[i].co, child);
            newpopulation[i] = player;
        }
        this.players = newpopulation;
    }

    run(){
        for (let player of this.players){
            player.update();
            player.execute();
        }

    }

    show(){
        for (let player of this.players){
            player.show();
        }

    }
}