class Triangle{
    constructor(){
        this.x = random(twidth);
        this.y = random(theight);
        this.r1 = random(10, 100);
        // this.r2 = random(theight);

        let r = random(255);
        let g = random(255);
        let b = random(255);
        let a = random(100);


        this.color = color(r, g, b, a);
    }

    show(pg){
        pg.fill(this.color);
        pg.ellipse(this.x, this.y, this.r1, this.r1);
    }

}