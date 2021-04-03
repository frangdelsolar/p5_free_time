class Board{

    constructor(){
        // this.r = r;
        // this.c = c;
        this.width = null;
        this.height = null;
        this.x = null;
        this.y = null;
        this.snake = new Snake(this);
        this.food = new Food(this);
        this.food.pickLocation();
    }

    compare(a, b) {
        if (a.snake.fitness > b.snake.fitness) return 1;
        if (b.snake.fitness > a.snake.fitness) return -1;
      
        return 0;
      }

    update(){
        if (!pause){
            this.snake.update();
            if (this.snake.eat(this.food)){
                this.food.pickLocation();
                count ++;
            }
        }
    }

    show () {
        // background(100);
        push();
        fill(200);
        stroke(50);
        strokeWeight(2);
        rect(this.x, this.y, this.width, this.height);
        this.snake.show();
        this.food.show();
        pop();

        this.showNN()

    }

    showNN(){
        let offset = SQSZ*3;
        let brain = this.snake.think();


        stroke(100);
        for (let i=0; i < brain.input.length; i++ ){
            fill(0, 255*brain.input[i], 0);
            ellipse(this.x+this.width+offset, this.y+offset+offset*i, SQSZ*2, SQSZ*2)
        }

        for (let i=0; i < brain.output.length; i++ ){  
            let value = brain.output[i]; 
            let x = this.x+this.width+(offset*3);
            let y = this.y+(offset*2)*i+offset+offset;        
            fill(255*value);
            ellipse(x, y, SQSZ*5, SQSZ*5)
            textSize(SQSZ*2);
            textAlign(CENTER, CENTER);
            fill(255, 0, 0);
            text(value.toFixed(2), x, y);

        }

        textSize(20);
        fill(255);
        let x = this.x+this.width+(offset*8);
        let y = this.y+(offset*3);
        this.snake.calcFitness();
        text(this.snake.fitness.toFixed(2), x, y);
        // text(this.snake.distFood().toFixed(2), this.x+this.width+offset+offset, this.y+offset+offset);


    }
}