class Paint{
    constructor(dna){
        if (dna){
            this.dna = dna;
        } else {
            this.dna = new DNA(geneAmt);
        }

        this.image = null;
        this.fitness = 0;
    }

    calcFitness(){
        this.storeImage();

        this.fitness = 0;

        for (let i = 0; i < w; i++) {
            for (let j = 0; j < h; j++) {

                let c1 = target.get(i, j);
                let c2 = this.image.get(i, j);

                //get delta per color
                let deltaRed = c1[0] - c2[0];
                let deltaGreen = c1[1] - c2[1];
                let deltaBlue = c1[2] - c2[2];
                // let deltaAlpha = c1[3] - c2[3];
        
                // measure the distance between the colors in 3D space
                let pixelFitness = (deltaRed * deltaRed +
                                        deltaGreen * deltaGreen +
                                        deltaBlue * deltaBlue); // +
                                        // deltaAlpha * deltaAlpha);

                //add the pixel fitness to the total fitness ( lower is better )
                this.fitness += pixelFitness;
            }
        }
    }

    storeImage(){
        push();
        let pg = createGraphics(w, h);
        pg.noStroke();
        translate(w, 0);
        for (let i=0; i<this.dna.genes.length; i++){
            let gen = this.dna.genes[i];
            let c = color(gen.r, gen.g, gen.b, gen.a);
            pg.fill(c);
            pg.ellipse(gen.x, gen.y, gen.r1, gen.r2);
        }
        this.image = pg;
        pop();
    }

    show(){
        image(this.image, 0, 0)
    }
}