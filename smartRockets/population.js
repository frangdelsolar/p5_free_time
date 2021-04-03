class Population {
    constructor(){
        this.rockets = [];
        this.popsize = 100;
        this.matingpool = [];

        for (let i=0; i<this.popsize; i++){
            this.rockets[i] = new Rocket();
        }
    }

    evaluate(){
        let maxfit = 0;
        for (let rocket of this.rockets){
            rocket.calcFitness();
            if (rocket.fitness > maxfit){
               maxfit = rocket.fitness;
            }
        }

        for (let rocket of this.rockets){
            rocket.fitness /= maxfit;
        }

        this.matingpool = [];

        for (let rocket of this.rockets){
            let n = rocket.fitness * 100;
            for (let j = 0; j < n; j++){
                this.matingpool.push(rocket);
            }
        }
    }

    selection () {
        let newRockets = [];
        for (let i = 0; i < this.rockets.length; i++){
            let parentA = random(this.matingpool).dna;
            let parentB = random(this.matingpool).dna;
            let child = parentA.crossover(parentB);
            child.mutation();
            newRockets[i] = new Rocket(child);
        }
        this.rockets = newRockets;
    }

    run() {
        for (let rocket of this.rockets){
            rocket.update();
            rocket.show();
        }
    }
}