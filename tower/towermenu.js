class TowerMenu{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.options = [0, 1, 2];
        this.selection = null;
    }

    select(x, y){
        
    }

    show(){
        push();
        noFill();
        stroke(255);
        rect(this.x, this.y, this.w, this.h);

        translate(this.x, this.y);
        let x = 0;
        let y = 0;
        let w = this.w/this.options.length;
        let h = this.h;
        for(let o of this.options){            
            rect(x, y, w, h);
            x += w;
        }
        pop();
    }
}