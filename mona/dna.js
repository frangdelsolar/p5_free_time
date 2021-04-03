class DNA{
    constructor(length, genes){
        if(genes){
            this.genes = genes;
        } else {
            this.genes = new Array(length);
            for (let i=0; i<this.genes.length; i++){
                this.genes[i] = new Elipse();
            }
        }
        this.fitness = 0;
    }

    addGene(){
        this.genes.push(new Elipse());
    }

    copy(){
        let genes = [];
        for (let gene of this.genes){
            genes.push(gene);
        }
        return new DNA(this.genes.length, genes);
    }


    crossover(other){
        let newgenes = [];
        // let mid = floor(random(this.genes.length));
        for (let i=0; i < this.genes.length; i++){
            // if (i > mid){
            if (i%2==0){
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
                this.genes[i].r1 = random(0,100);
       
                let r = random(255);
                let g = random(255);
                let b = random(255);
                let a = random(100);
                this.genes[i].color = color(r, g, b, a);

            }
        }
    }
}