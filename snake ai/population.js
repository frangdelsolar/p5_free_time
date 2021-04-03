class Population{
    constructor(size){
        this.boards = [];
        this.size = size;

        this.matingpool = [];

        for (let i=0; i<size; i++){
            this.boards[i] = new Board();
        }

        this.bestsnake = this.boards[0].snake;

        best_snake_ever = this.bestsnake;

        this.display = [];
        this.setDisplay()



    }

    setDisplay(){
        this.display=[];
        for (let i=0; i<MULTIPLO; i++){
            for (let j=0; j<MULTIPLO; j++){  
                let board = random(this.boards);
                this.display.push(board); 
            }
        }
    }

    show(){
        let index = 0;
        for (let i=0; i<MULTIPLO; i++){
            for (let j=0; j<MULTIPLO; j++){                       
                let board = this.display[index];
                board.x = i * (DISPLAY_WIDTH*2);
                board.y = j * DISPLAY_HEIGHT;
                board.width = DISPLAY_WIDTH;
                board.height = DISPLAY_HEIGHT;
                board.show();
                index++;
            }
        }
    }

    run(){
        death = 0;
        for (let board of this.boards){
            board.update();
            if(board.snake.death){
                death++;
            }
        }
    }

    move(dir){

        for (let board of this.boards){
            board.snake.move(dir);
        }
    }

    goLeft(dir){
        for (let board of this.boards){
            board.snake.goLeft();
        }
    }

    goRight(dir){
        for (let board of this.boards){
            board.snake.goRight();
        }
    }


    evaluate(){
        let maxfit = 0;
        for (let board of this.boards){
            let snake = board.snake;
            snake.calcFitness();
            if (snake.fitness > maxfit){
                maxfit = snake.fitness;
                this.bestsnake = snake;

                if (this.bestsnake.tail.length > best_snake_ever.tail.length){
                    best_snake_ever = this.bestsnake;
                }

            }
        }

        for (let board of this.boards){
            if(maxfit == 0){
                maxfit = 1;
            } 
            board.snake.fitness /= maxfit;
        }

        this.matingpool = [];
        for (let board of this.boards){
            let n = board.snake.fitness * 100;
            for (let j = 0; j < n; j++){
                this.matingpool.push(board.snake.brain);
            }
        }

    }

    // pickOne(){
    //     let index = 0;
    //     let r = random(1);
    //     while(r>0){
    //         r = r - this.boards[index].snake.fitness;
    //         index++;
    //     }
    //     index--;

    //     let snake = this.boards[index].snake;
    //     this.bestsnake = snake;
    //     console.log(this.bestsnake.brain.serialize());
    //     console.log(this.bestsnake.tail.length);


    // }

    reproduce(){

        for (let board of this.boards){
            board.snake = new Snake(board, this.bestsnake.brain);
            board.snake.brain.mutate(0.1);
            board.food.pickLocation();
        }
    }

    selection () {
        let newBoards = [];
        for (let i = 0; i < this.boards.length; i++){
            let parentA = random(this.matingpool);
            let parentB = random(this.matingpool);
            // let parentA = this.bestsnake.brain;
            // let parentB = this.bestsnake.brain;           
            let child = parentA.crossover(parentB);
            child.mutate(0.1);
            let newBoard = new Board();
            let newSnake = new Snake(newBoard, child);
            newBoard.snake = newSnake;
            newBoards[i] = newBoard;   
        }
        this.boards = newBoards;
        this.setDisplay();
    }

}