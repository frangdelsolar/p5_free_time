class DNA{
    constructor(genes){
        if(genes){
            this.genes = genes;
            for (let i = this.genes.length; i < geneLength; i++){
                this.randomize(i);
            }

        } else {
            this.genes = [];
            for (var i = 0; i < geneLength; i++) {
                this.randomize(i);
            }
        }
    }

    randomize(i){
        let speed = 3;
        let moves = [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
            [0, -1],
            [-1, 0],
            [-1, -1]
        ];

        let move = random(moves);
        move[0] *= speed;
        move[1] *= speed;
        this.genes[i] = move;
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
                this.randomize(i);
            }
        }
    }
}