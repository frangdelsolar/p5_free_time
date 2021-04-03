class DNA{
    constructor(length, genes){
        if(genes){
            this.genes = genes;
        } else {
            this.genes = new Array(length);
            for (let i=0; i<this.genes.length; i++){
                this.initialize(i);
            }
        }
        this.fitness = 0;
    }

    initialize(index){
        this.genes[index] = {
            x: random(0, w), 
            y: random(0, h),
            r1: random(0, 100),
            r2: random(0, 100),
            // p2: createVector(floor(random(w)), floor(random(h))),
            // p3: createVector(floor(random(w)), floor(random(h))),
            r: floor(random(255)),
            g: floor(random(255)),
            b: floor(random(255)),
            a: 30
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
        return new DNA(this.genes.length, newgenes);       
    }

    mutate(rate){
        for (let i=0; i<this.genes.length; i++){
            if (random(1) < rate){
                this.genes[i].r1 = random(0, 100)
                this.genes[i].r2 = random(0, 100)
                this.genes[i].r = floor(random(255))
                this.genes[i].g = floor(random(255))
                this.genes[i].b = floor(random(255))
            }
        }
    }
}