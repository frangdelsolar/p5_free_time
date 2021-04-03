class Snake{
    constructor(board, brain){
        this.board = board;
        this.r = Math.floor(ROWS/2);
        this.c = Math.floor(COLS/2);
        this.ySpeed = 1;
        this.xSpeed = 0;
        this.tail = [];
        this.death = false;

        this.particle = new Particle(this.get_pos())
        this.fov = 120;

        this.color = 255;
        this.isHuman = true;
        this.moves = [];
        this.eaten_times = [];

        if (brain){
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(8, 19, 3);
        }
        this.fitness = 0;
        this.age = 0;
    }

    get_pos(){
        let x = (this.r * SQSZ) + SQSZ/2;
        let y = (this.c * SQSZ) + SQSZ/2;
        let pos = createVector(x, y);
        return pos;
    }

    distFood(){
        let distance = abs(this.board.food.r - this.r) + abs(this.board.food.c - this.c);
        return distance/(ROWS+COLS);
    }    

    calcFitness() {
        let norm_age = this.age / count; 
        let norm_length = (this.tail.length + 1)/(ROWS*COLS);
        // let norm_moves = (this.age/(this.moves.length))/count;
        // if(this.moves.length == 0){
        //     norm_moves = 0;
        // }
        if(Number.isNaN(norm_age)){
            norm_age = 0;
        }
        this.fitness =  norm_length + this.tail.length + norm_age;
    }
    
    distAhead(){

        for (let piece of this.tail) {
            if (this.ySpeed == -1 && this.c == piece[1] && piece[0] < this.r){
                return (piece[0]-this.r)/ROWS;
            } else if (this.ySpeed == 1 && this.c == piece[1] && piece[0] > this.r){
                return (piece[0]-this.r)/ROWS;
            } else if (this.xSpeed == -1 && this.r == piece[0] && piece[1] < this.c){
                return (piece[1]-this.c)/COLS;
            } else if (this.xSpeed == 1 && this.r == piece[0] && piece[1] > this.c){
                return (piece[1]-this.c)/COLS;
            }          
        }

        if (this.ySpeed == -1){
            return (this.r - 0)/ROWS;
        } else if (this.ySpeed == 1){
            return (ROWS - this.r)/ROWS;
        } else if (this.xSpeed == -1){
            return (this.c)/COLS;
        } else if (this.xSpeed == 1){
            return (COLS-this.c)/COLS;
        } 
       
    }

    distRight(){
        for (let piece of this.tail) {
            if (this.ySpeed == -1 && this.r == piece[0] && piece[1] > this.c){
                return (piece[1]-this.c)/COLS;
            } else if (this.ySpeed == 1 && this.r == piece[0] && piece[1] < this.c){
                return (piece[1]-this.c)/COLS;
            } else if (this.xSpeed == -1 && this.c == piece[1] && piece[0] < this.r){
                return (piece[0]-this.r)/ROWS;
            } else if (this.xSpeed == 1 && this.c == piece[1] && piece[0] > this.r){
                return (piece[0]-this.r)/ROWS;
            }             
        }

        if (this.ySpeed == -1){
            return (COLS - this.c)/COLS;
        } else if (this.ySpeed == 1){
            return (this.c)/COLS;
        } else if (this.xSpeed == -1){
            return (this.r)/ROWS;
        } else if (this.xSpeed == 1){
            return (ROWS-this.r)/ROWS;
        } 

    }

    distLeft(){
        for (let piece of this.tail) {
            if (this.ySpeed == -1 && this.r == piece[0] && piece[1] < this.c){
                return (piece[1]-this.c)/COLS;
            } else if (this.ySpeed == 1 && this.r == piece[0] && piece[1] > this.c){
                return (piece[1]-this.c)/COLS;
            } else if (this.xSpeed == -1 && this.c == piece[1] && piece[0] < this.r){
                return (piece[0]-this.r)/ROWS;
            } else if (this.xSpeed == 1 && this.c == piece[1] && piece[0] > this.r){
                return (piece[0]-this.r)/ROWS;
            }             
        }

        if (this.ySpeed == -1){
            return (this.c)/COLS;
        } else if (this.ySpeed == 1){
            return (COLS - this.c)/COLS;
        } else if (this.xSpeed == -1){
            return (ROWS-this.r)/ROWS;
        } else if (this.xSpeed == 1){
            return ((this.r)/ROWS);
        } 
    }

    
    busyAhead(){
        if ( (this.ySpeed == -1 && this.r+this.ySpeed < 0) ||
             (this.ySpeed == 1 && this.r+this.ySpeed >= ROWS) ||
             (this.xSpeed == -1 && this.c+this.xSpeed < 0) ||
             (this.xSpeed == 1 && this.c+this.xSpeed >= COLS) ){
            return 1;
        }

        for (let piece of this.tail) {
            if ( (this.ySpeed == -1 && this.c == piece[1] && this.r + this.ySpeed == piece[0]) ||
                 (this.ySpeed == 1 && this.c == piece[1] && this.r + this.ySpeed == piece[0]) ||
                 (this.xSpeed == -1 && this.r == piece[0] && this.c + this.xSpeed == piece[1]) ||
                 (this.ySpeed == 1 && this.r == piece[0] && this.c + this.xSpeed == piece[1]) ){
                return 1;
            }            
        }
        return 0;
    }

    busyRight(){
        if ( (this.ySpeed == -1 && this.c + 1 >= COLS) ||
             (this.ySpeed == 1 && this.c - 1 < 0) ||
             (this.xSpeed == -1 && this.r - 1 < 0) ||
             (this.xSpeed == 1 && this.r + 1 >= ROWS) ){
            return 1;
        }

        for (let piece of this.tail) {
            if ( (this.ySpeed == -1 && this.r == piece[0] && this.c + 1 == piece[1]) ||
                 (this.ySpeed == 1 && this.r == piece[0] && this.c - 1 == piece[1]) ||
                 (this.xSpeed == -1 && this.c == piece[1] && this.r - 1 == piece[0]) ||
                 (this.xSpeed == 1 && this.c == piece[1] && this.r + 1 == piece[0]) ){
                return 1;
            }            
        }
        return 0;
    }

    busyLeft(){
        if ( (this.ySpeed == 1 && this.c + 1 >= COLS) ||
             (this.ySpeed == -1 && this.c - 1 < 0) ||
             (this.xSpeed == 1 && this.r - 1 < 0) ||
             (this.xSpeed == -1 && this.r + 1 >= ROWS) ){
            return 1;
        }

        for (let piece of this.tail) {
            if ( (this.ySpeed == -1 && this.r == piece[0] && this.c - 1 == piece[1]) ||
                 (this.ySpeed == 1 && this.r == piece[0] && this.c + 1 == piece[1]) ||
                 (this.xSpeed == -1 && this.c == piece[1] && this.r + 1 == piece[0]) ||
                 (this.xSpeed == 1 && this.c == piece[1] && this.r - 1 == piece[0]) ){
                return 1;
            }            
        }

        return 0;
    }

    foodAhead(){
        let food = this.board.food;

        if (this.ySpeed == -1 && food.c == this.c){
            return (this.r - food.r)/ROWS;
        } else if (this.ySpeed == 1 && food.c == this.c){
            return (food.r - this.r)/ROWS;
        } else if (this.xSpeed == -1 && food.r == this.r){
            return (this.c - food.c)/COLS;
        } else if (this.xSpeed == 1 && food.r == this.r){
            return (food.c - this.c)/COLS;
        } else {
            return -1;
        }       
    }

    foodRight(){
        let food = this.board.food;

        if (this.ySpeed == -1 && food.c > this.c){
            return (food.c - this.c)/COLS;
        } else if (this.ySpeed == 1 && food.c < this.c){
            return (this.c - food.c)/COLS;
        } else if (this.xSpeed == -1 && food.r < this.r){
            return (this.r - food.r)/ROWS;
        } else if (this.xSpeed == 1 && food.r > this.r){
            return (food.r - this.r)/ROWS;
        } else {
            return -1;
        }       
    }

    foodLeft(){
        let food = this.board.food;

        if (this.ySpeed == -1 && food.c < this.c){
            return (this.c - food.c)/COLS;
        } else if (this.ySpeed == 1 && food.c > this.c){
            return (food.c - this.c)/COLS;
        } else if (this.xSpeed == -1 && food.r > this.r){
            return (food.r - this.r)/ROWS;
        } else if (this.xSpeed == 1 && food.r < this.r){
            return (this.r - food.r)/ROWS;
        } else {
            return -1;
        }               
    }


    yFood(){
        let food = this.board.food;

        return abs(food.r - this.r)/ROWS;
    }

    xFood(){
        let food = this.board.food;
        return abs(food.c - this.c)/COLS;
    }


    goStraight(){
        // console.log('straight')
        this.moves.push(count);

    }

    goLeft(){
        // console.log('left')
        this.moves.push(count);


        if (this.ySpeed == -1){
            this.ySpeed = 0;
            this.xSpeed = -1;
        } else if (this.ySpeed == 1){
            this.ySpeed = 0;
            this.xSpeed = 1;
        } else if (this.xSpeed == -1){
            this.xSpeed = 0;
            this.ySpeed = 1;
        } else if (this.xSpeed == 1){
            this.xSpeed = 0;
            this.ySpeed = -1;
        }

    }

    goRight(){
        // console.log('right')
        this.moves.push(count);


        if (this.ySpeed == -1){
            this.ySpeed = 0;
            this.xSpeed = 1;
        } else if (this.ySpeed == 1){
            this.ySpeed = 0;
            this.xSpeed = -1;
        } else if (this.xSpeed == -1){
            this.xSpeed = 0;
            this.ySpeed = -1;
        } else if (this.xSpeed == 1){
            this.xSpeed = 0;
            this.ySpeed = 1;
        }

    }

    getInputs(){
        let inputs = [];
        inputs[0] = this.distAhead();
        inputs[1] = this.distRight();
        inputs[2] = this.distLeft(); 
        inputs[3] = this.foodAhead(); 
        inputs[4] = this.foodRight(); 
        inputs[5] = this.foodLeft();
        inputs[6] = this.distFood();
        inputs[6] = this.xSpeed;
        inputs[7] = this.ySpeed;
        return inputs; 
    }

    // getInputs(){
    //     let inputs = [];
    //     inputs[0] = this.r/ROWS;
    //     inputs[1] = this.c/COLS;
    //     inputs[2] = this.xFood(); 
    //     inputs[3] = this.yFood(); 
    //     inputs[4] = this.distFood();
    //     inputs[5] = this.xSpeed;
    //     inputs[6] = this.ySpeed;
    //     inputs[7] = this.distAhead();
    //     inputs[8] = this.distRight();
    //     inputs[9] = this.distLeft(); 
    //     inputs[10] = this.foodAhead(); 
    //     inputs[11] = this.foodRight(); 
    //     inputs[12] = this.foodLeft();        
    //     return inputs; 
    // }

    think(){

        let inputs = this.getInputs();
        let output = this.brain.predict(inputs);        
        let max = Math.max(...output);
        let index = output.indexOf(max);

        return {index:index, input: inputs, output:output}
    }

    execute(){
        let index = this.think().index;
        if (!manual){
            if (index == 0) {
                this.goStraight();
            } else if (index == 1) {
                this.goRight();
            } else {
                this.goLeft();
            }
        }
    }

    // execute(){
    //     let index = this.think().index;
    //     if (!manual){
    //         let dir = [0,0];
    //         if (index == 0) {
    //             dir = [-1, 0];                 
    //         } else if (index == 1) {
    //             dir = [1, 0]; 
    //         } else if (index == 1) {
    //             dir = [0, -1]; 
    //         }else {
    //             dir = [0, 1];
    //         }
    //         population.move(dir);
    //     }
    // }

    die(){
        if (this.r >= ROWS){
            this.death = true;
        } else if (this.r < 0) {
            this.death = true;
        }

        if (this.c >= COLS){
            this.death = true;
        } else if (this.c < 0) {
            this.death = true;
        }

        for (let piece of this.tail){
            if (this.r == piece[0] && this.c == piece[1]) {
                this.death = true;
            }
        }

        if (this.eaten_times.length>0){
            let last_move = this.eaten_times[this.eaten_times.length-1];
            if (count-last_move>=(ROWS*COLS)) {
                this.death = true;
            }
        } else if(this.eaten_times.length == 0){
            if (count>=(ROWS+COLS)*2) {
                this.death = true;
            }         
         }
    }

    update(){
        if(this.death){
            return;
        } else{
            this.age++;

            this.execute();

            for (let i=this.tail.length-1; i >= 0; i--){
            if ( i > 0){
                this.tail[i] = this.tail[i-1];
            } else {
                this.tail[i] = [this.r, this.c];
            } 
            }        
            
            this.r += this.ySpeed;
            this.c += this.xSpeed;

            this.die();
        }

    }

    move(dir){
        if ((this.xSpeed == -1 && dir[1] == 1) ||
            (this.xSpeed == 1 && dir[1] == -1) ||
            (this.ySpeed == -1 && dir[0] == 1) ||
            (this.ySpeed == 1 && dir[0] == -1)) {
            return;
        } 

        this.xSpeed = dir[1];
        this.ySpeed = dir[0];
        this.moves.push(count);
    }

    eat (food){
        if(this.r == food.r && this.c == food.c){
            this.tail.push([food.r, food.c]);
            this.eaten_times.push(count);
            return true;
        }
        return false;
    }

    show(){
        fill(255);
        rect(this.r*SQSZ, this.c*SQSZ, SQSZ, SQSZ);

        for (let i = this.tail.length-1; i >= 0; i--){
            let color = map(i,this.tail.length, 0, 0, 255);
            fill(color);
            stroke(100)
            rect(this.tail[i][0]*SQSZ, this.tail[i][1]*SQSZ, SQSZ, SQSZ);          
        }

        const scene = this.particle.look(walls);
        const w = WIDTH_EYE / scene.length;
        push();
        for (let i = 0; i < scene.length; i++) {
          noStroke();
          const sq = scene[i] * scene[i];
          const wSq = WIDTH_EYE * WIDTH_EYE;
          const b = map(sq, 0, wSq, 255, 0);
          const h = map(scene[i], 0, WIDTH_EYE, HEIGHT, 0);
          fill(b);
          rect(i * w + WIDTH, (HEIGHT-h)/2, w , h);
        }
        pop();

    }
}
