class DNA{
    constructor(genes){
        this.genes = genes;

        this.bloobs = [];
        this.deads = [];

        let c = map(this.genes[5], 0, 1, 50, 255);

        this.color = color(c, 0, c, 200);

        if(!dnas.includes(this)){
            dnas.push(this);
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

    mutate(){
        for (let i=0; i<this.genes.length; i++){
            if (random() < 0.01){
                this.genes[i] = random();
            }
        }
    }


    show(x, y, r){
        push();
        fill(this.color);
        ellipse(x, y, r, r);

        fill(220);
        noStroke();

        x += r;
        text(this.bloobs.length, x, y, r)

        
        x += r;
        text(this.deads.length, x, y, r)


        for (let i = 0; i < this.genes.length; i++){
            x += r; 
            text(this.genes[i].toFixed(2), x, y, r)
        }



        pop();
    }
}