class Population{
    constructor(){
        this.items = [];

        for (let i=0; i< popsize; i++){
            let x = (twidth + 10)*(i+1);
            this.items[i] = new Paint(x, 0, twidth, theight);
        }
    
        this.best = this.items[0];
        this.fitavg = 0;
        this.generation = 1;
    }

    run(){
        for (let paint of this.items){
            paint.update();
            paint.show();            
        }

        // this.best.show(twidth + 10, 0);
        
        // fill(0);
        // stroke(255);
        // textAlign(LEFT, CENTER);
        // textSize(18);
        // let msg = 'Gen: ' + this.generation;
        // text(msg, 20, 20);

        // text(this.fitavg, 20, 50);

    }

    calcFitness(){
        for (let item of this.items){
            item.calcFitness();
        }
        
        let maxfit = 0;
        this.fitavg = 0;
        for (let item of this.items){
            if(item.fitness > maxfit){
                maxfit = item.fitness;
                this.best = item;
            }
            this.fitavg += item.fitness;
        }
        this.fitavg /= this.items.length;

    }

    pickOne(list) {
        let index = 0;
        let r = random(1);
      
        while (r > 0) {
          r = r - list[index].fitness;
          index++;
        }
        index--;
        return list[index];
      }

    selection(){
        let newpopulation = [];

        for (let i=0; i<this.items.length; i++){

            let dad = this.pickOne(this.items).dna;
            let mom = this.pickOne(this.items).dna;
            let child = dad.crossover(mom);
            // let child = this.best.dna.copy();
            child.mutate(mutation); 
            let x = this.items[i].x;
            let y = this.items[i].y;
            let w = this.items[i].w;
            let h = this.items[i].h;    
            let paint = new Paint(x, y, w, h, child);

            // if(paint.fitness > this.items[i]){
                newpopulation[i] = paint;
            // } else {
                // newpopulation[i] = this.items[i];
            // }
        }
        this.items = newpopulation;
        this.generation++;             
    }
}

