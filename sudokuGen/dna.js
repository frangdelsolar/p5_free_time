function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

class DNA{
    constructor(genes){
        if(genes){
            this.genes = genes;
        } else {
            this.genes = [];            
 
            let index = 0;
            for (var i = 0; i < 9; i++) {
                let a = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                for (var j = 0; j < a.length; j++) {
                    this.genes[index] = a[j];
                    index++;
                }
            }
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

        for (let r=0; r<9; r++){
            let start = r*9;
            let end = start+9;
            if (random(1) < 1){
                // swap positions
                let i1 = floor(random(start, end));
                let i2 = floor(random(start, end));
                let temp = this.genes[i1];
                this.genes[i1] = this.genes[i2];
                this.genes[i2] = temp;
            }
        }
    }
}