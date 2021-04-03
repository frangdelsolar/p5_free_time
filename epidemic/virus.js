class Virus{
    constructor(dna){
        if(dna){
            this.dna = dna;
        } else {
            let genes = this.randomizeGenes();
            this.dna = new DNA(genes);
        }

        this.can = true;
        this.age = 0;
        this.lifespan = this.getLifespan();
    }

    envejecer(){
        this.age++;

        if (this.age == this.getDiasContagia()){
            this.can = false;
        }
    }

    getLifespan(){
        let days = this.dna.genes[0];
        return map(days, 0, 1, 0, 15);       
    }

    getDiasContagia(){
        let range = this.dna.genes[1];
        return map(range, 0, 1, 0, 7);
    }

    getDist(){
        let distance = this.dna.genes[2];
        return map(distance, 0, 1, 0, 10);
    }

    getProbContagio(){
        return this.dna.genes[3];
    }

    getMortalidad(){
        return this.dna.genes[4];
    }

    getColor(){
        let color = map(this.dna.genes[5], 0, 1, 50, 255);
        return color;
    }
        
    randomizeGenes(){
        let genes = [];

        genes[0] = random(); // lifespan
        genes[1] = random(); // cuántos días contagia?
        genes[2] = random(); // range
        genes[3] = random(); // probabilidad de contagio
        genes[4] = random(); // mortalidad
        genes[5] = random();; // color

        return genes;
    }

}