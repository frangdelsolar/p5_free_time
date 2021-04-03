class Population {
    constructor(){
        this.dinos = [];
        this.popsize = 100;
        this.matingpool = [];

        for (let i=0; i<this.popsize; i++){
            this.dinos[i] = new Dino();
        }
    }

    evaluate(){
        let maxfit = 0;
        for (let dino of this.dinos){
            dino.calcFitness();
            if (dino.fitness > maxfit){
               maxfit = dino.fitness;
            }
        }

        for (let dino of this.dinos){
            dino.fitness /= maxfit;
        }

        this.matingpool = [];

        for (let dino of this.dinos){
            let n = dino.fitness * 100;
            for (let j = 0; j < n; j++){
                this.matingpool.push(dino.brain);
            }
        }
    }

    selection () {
        let newDinos = [];
        for (let i = 0; i < this.dinos.length; i++){
            let parentA = random(this.matingpool);
            let parentB = random(this.matingpool);
            let child = parentA.crossover(parentB);
            child.mutate();
            newDinos[i] = new Dino(child);
        }
        this.dinos = newDinos;
    }

    run() {
        for (let dino of this.dinos){
            dino.update();
            dino.show(color(150, 10));
        }
    }
}