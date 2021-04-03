class Tower {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.range = 100;
    }

    show(){
        push()
        rectMode(CENTER);
        rect(this.x, this.y, 16, 16);

        fill(200, 200, 0, 100);
        stroke(200, 200, 0, 100);
        ellipse(this.x, this.y, this.range, this.range);
        pop();
    }

    contains(enemy){
        let d = dist (this.x, this.y, enemy.x, enemy.y);
        if (d < this.range/2 + enemy.r){
            return true;
        }
        return false;
    }

    shoot(enemy){
        console.log('shooting')
    }
}