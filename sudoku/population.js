class Population {
    constructor(){
        this.rockets = [];
        this.popsize = 1200;
        this.matingpool = [];

        for (let i=0; i<this.popsize; i++){
            this.rockets[i] = new Sudoku();
        }

        this.best = this.rockets[0];
    }

    evaluate(){
        let maxfit = 0;
        for (let rocket of this.rockets){
            rocket.calcFitness();
            if (rocket.fitness > maxfit){
               maxfit = rocket.fitness;
               this.best = rocket;
            }
        }

        for (let rocket of this.rockets){
            rocket.fitness /= maxfit;
        }

        // this.matingpool = [];

        // for (let rocket of this.rockets){
        //     let n = rocket.fitness * 100;
        //     for (let j = 0; j < n; j++){
        //         this.matingpool.push(rocket);
        //     }
        // }
    }

    selection () {
        let newRockets = [];
        for (let i = 0; i < this.rockets.length; i++){
            // let parentA = random(this.matingpool).dna;
            // let parentB = random(this.matingpool).dna;
            let parentA = this.best.dna;
            let parentB = this.best.dna;
            let child = parentA.crossover(parentB);
            child.mutation();
            newRockets[i] = new Sudoku(child);
        }
        this.rockets = newRockets;
    }

    run() {
        this.best.calcFitness();
        this.best.show();
        if(this.best.compare() >= 81){
            console.log('Solved');
            STOP = true;
        }
    }
}