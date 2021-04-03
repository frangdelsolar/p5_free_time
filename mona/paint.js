class Paint{
    constructor(x, y, w, h, dna){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        if (dna){
            this.dna = dna;
            this.dna.addGene();
        } else {
            this.dna = new DNA(1);
        }
        
        this.img = null;
    }

    run(){
        this.update();
        let prevFit = this.calcFitness();
        let prevDNA = this.dna.copy();

        this.dna.addGene();
        this.update();
        let nextFit = this.calcFitness()


        if (nextFit < prevFit){
            this.dna = prevDNA;
            this.update();
        }
    }

    update(){
        push();
        let pg = createGraphics(this.w, this.h);
        pg.noStroke();
        
        for (let i=0; i < this.dna.genes.length; i++){
            let e = this.dna.genes[i];
            pg.fill(e.color);
            pg.ellipse(e.x, e.y, e.r1, e.r1);
        }
        this.img = pg;
        pop();
    }

    calcFitness(){

        let fitness = 0;
        let img = this.img;
        if(!img){
            return 0;
        }



        for (let i = 0; i < this.w; i++) {
            for (let j = 0; j < this.h; j++) {

                let c1 = target.get(i, j);
                let c2 = img.get(i, j);

                //get delta per color
                let deltaRed = c1[0] - c2[0];
                let deltaGreen = c1[1] - c2[1];
                let deltaBlue = c1[2] - c2[2];
                let deltaAlpha = c1[3] - c2[3];
        
                // measure the distance between the colors in 3D space
                let pixelFitness = (deltaRed * deltaRed +
                                    deltaGreen * deltaGreen +
                                    deltaBlue * deltaBlue +
                                    deltaAlpha * deltaAlpha);

                //add the pixel fitness to the total fitness ( lower is better )
                fitness += pixelFitness;
            }
        }
        return fitness;
    }

    show(x, y){
        
        if (!x || !y){
            image(this.img, this.x, this.y);
        } else {
            image(this.img, x, y);
        }

    }
}