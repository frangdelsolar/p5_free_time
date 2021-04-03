class Food{
    constructor(board){
        this.board = board;

        this.r = null;
        this.c = null;
        this.color = (0, 255, 0);
        this.pickLocation();
    }


    pickLocation(){
        this.r = Math.floor(random(ROWS));
        this.c = Math.floor(random(COLS));
        let snake = this.board.snake
        if (this.r == snake.r && this.c == snake.c){
            this.pickLocation();
        }
        for (let piece of snake.tail){
            if (this.r == piece[0] && this.c == piece[1]){
                this.pickLocation();
            }
        }

    }

    show(){
        fill(0, 255, 0, 100);
        rect((this.c*SQSZ)+(this.board.x), (this.r*SQSZ)+(this.board.y), SQSZ, SQSZ);

    }
}