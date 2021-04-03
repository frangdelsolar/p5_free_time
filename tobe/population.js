class Population{
    constructor (target, maxpop, mutation){
        this.target = target;
        this.maxpop = maxpop;
        this.mutation = mutation;

        this.items = [];
        for (let i=0; i<maxpop; i++){
            this.items[i] = new DNA(this.target.length);
        }

        this.best = this.items[0];
        this.matingPool = [];
        this.found = false;
        this.generation = 1;
    }

    show(){
        fill(0);
        for (let i=0; i<this.items.length; i++){
            let h = height/this.maxpop;
            textSize(h*0.75);

            let msg = '';
            for (let c of this.items[i].genes){
                msg += c;
            }
            text(msg, width*0.15, ((h)*i)+30);
        }

        let msg = '';
        for (let c of this.best.genes){
            msg += c;
        }
        textSize(32);
        text(msg, 0, 100);

        msg = 'Generation ' + this.generation;
        textSize(18);
        text(msg, 0, 130);

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

            let dad = random(this.matingPool);
            let mom = random(this.matingPool);
            let child = dad.crossover(mom);
            child.mutate(this.mutation); 
            newpopulation[i] = child;
        }
        this.items = newpopulation;
        this.generation++;             
    }

    evaluate(){
        let str = '';
        for (let item of this.best.genes){
            str += item;
        }
        if (str == target){
            this.found = true;
        }
    }
}
