class DNA{
    constructor(genes, gene_count){
        if(genes){
            this.genes = genes;
        } else {
            this.genes = [];
            for (var i = 0; i < gene_count; i++) {
              this.genes[i] = floor(random(1,10));
            }
        }

    }

    crossover(other){
        let newgenes = [];
        let mid = floor(random(this.genes.length));
        for (let i=0; i < this.genes.length; i++){
            if (i > mid){
            // if(mid % 2 == 0){
                newgenes[i] = this.genes[i];
            } else {
                newgenes[i] = other.genes[i];
            }
        }
        return new DNA(newgenes, 61);
    }

    mutation(){
        for (let i=0; i<this.genes.length; i++){
            if (random(1) < 0.01){
                this.genes[i] = floor(random(1,10));
            }
        }
    }
}