class DNA{
    constructor(length, genes){
        if(genes){
            this.genes = genes;
        } else {
            this.genes = new Array(length);
            this.initialize();
        }
        this.fitness = 0;
    }

    initialize(){
        for (let i=0; i<this.genes.length; i++){
            let r = floor(random(65, 128)); 
            if (r==128){
                r = 32;
            } 

            this.genes[i] = String.fromCharCode(r);//random char
        }
    }

    calcFitness(target){
        let score=0;
        for (let i=0; i<this.genes.length; i++){
            if(this.genes[i] == target.charAt(i)){
                score++;
            }
        }
        this.fitness = score/this.genes.length;
    }

    crossover(other){
        let newgenes = [];
        let mid = floor(random(this.genes.length));
        for (let i=0; i < this.genes.length; i++){
            if (i > mid){
                newgenes[i] = this.genes[i];
            } else {
                newgenes[i] = other.genes[i];
            }
        }
        return new DNA(this.genes.length, newgenes);       
    }

    mutate(rate){
        for (let i=0; i<this.genes.length; i++){
            if (random(1) < rate){
                let r = floor(random(65, 128));
                if (r==128){
                    r = 32;
                } 

                this.genes[i] = String.fromCharCode(r);//random char
            }
        }
    }
}