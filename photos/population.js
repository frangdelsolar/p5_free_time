class Population{
    constructor (target, maxpop, mutation){
        this.target = target;
        this.maxpop = maxpop;
        this.mutation = mutation;

        this.items = [];
        for (let i=0; i<maxpop; i++){
            this.items[i] = new Paint();
        }

        this.best = this.items[0];
        this.matingPool = [];
        this.found = false;
        this.generation = 1;
    }

    show(){
        push();
        translate(220, 0);
        this.best.show();
        pop();
    }

    calcFitness(){
        for (let item of this.items){
            item.calcFitness(this.target);
        }
        
        let maxfit = 0;
        for (let item of this.items){
            if(item.fitness > maxfit){
                maxfit = item.fitness;
                this.best = item;
            }
        }

        this.matingPool = [];
        for (let item of this.items){
            let fitness = item.fitness/maxfit;
            let amt = floor(fitness * 100);

            for (let j=0; j<amt; j++){
                this.matingPool.push(item);
            }
        }
    }

    select(){
        let newpopulation = [];

        for (let i=0; i<this.items.length; i++){

            let dad = random(this.matingPool).dna;
            let mom = random(this.matingPool).dna;
            let child = dad.crossover(mom);
            child.mutate(this.mutation); 
            newpopulation[i] = new Paint(child);
        }
        this.items = newpopulation;
        this.generation++;             
    }

    evaluate(){
        for (let i = 0; i < target.width; i++) {
            for (let j = 0; j < target.height; j++) {

                let c1 = target.get(i,j);
                let c2 = this.best.image.get(i, j);

                if (c1 != c2){
                    return false; 
                }
            }
        }

        this.found = true;

    }
}
