class Building{
    constructor(x, y, w, h, type, face){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.type = type;
        this.color = null;

        this.face = face;
        this.door = null;

        this.bloobs = [];

        this.setColor();
        this.setDoorPos();
    }

    chooseRandomPos(){
        let x = random(this.x, this.x + this.w);
        let y = random(this.y, this.y + this.h);

        return createVector(x, y);        
    }

    setDoorPos(){
        let x = this.x + this.w/2;
        let y = this.y;

        if (this.face == 'south'){
            y = this.y + this.h;
        }
        this.door = createVector(x, y);
    }

    setColor(){
        // type house
        this.color = color(51, 0, 0);
        if (this.type == 'commerce'){
            this.color = color(0, 0, 51);
        } else if (this.type == 'industry'){
            this.color = color(51, 51, 0);
        }
    }

    show() {

        push();
        stroke(100);
        // fill(this.color);
        rect(this.x, this.y, this.w, this.h);

        // textSize(28);
        // fill(255, 40);
        // noStroke();
        // textAlign(CENTER, CENTER);
        // text(this.bloobs.length, this.x+this.w/2, this.y+this.h/2)
        // pop();
    }
}

class Block{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.buildings = [];

        let index = 0;
        let cols = 4;
        let rows = 2;
        for (let i = 0; i < rows; i ++){
            for (let j = 0; j < cols; j++){
                let w = this.w / cols;
                let h = this.h / rows;
                let x = this.x + (j * w);
                let y = this.y + (i * h);


                let r = random();
                let type = 'house';
                if (r < 0.23){
                    type = 'commerce';
                } else if (r < 0.33){
                    type = 'industry';
                }

                let face = 'north';
                if (i == 1){
                    face = 'south';
                }
                this.buildings[index] = new Building(x, y, w, h, type, face);
                index++;
            }
        }
    }

    show() {

        push();
        stroke(100);
        fill(0);
        rect(this.x, this.y, this.w, this.h);

        for (let building of this.buildings){
            building.show();
        }
        pop();
    }
}