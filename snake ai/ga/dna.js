class DNA{
    constructor(genes){
        if(genes){
            this.genes = genes;
        } else {
            this.genes = [];
            // for (var i = 0; i < cycles; i++) {
            //   this.genes[i] = random([[1, 0], [-1, 0], [0, 1], [0, -1]])
            // }
        }
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
        return new DNA(newgenes);
    }

    mutation(){
        for (let i=0; i<this.genes.length; i++){
            if (random(1) < 0.01){
                this.genes[i] = random([[1, 0], [-1, 0], [0, 1], [0, -1]])
            }
        }
    }
}