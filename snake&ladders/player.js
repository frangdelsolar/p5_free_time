class Player {
    pos = 0;
    
    rollDie(){
        let r = floor(random(1, 7));
        // let r = 1;
        for (let i=0; i<r; i++){
            fill(0,255,0, 50);
            rect(board[this.pos].c * SQUARE_SIZE, board[this.pos].r * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
            this.pos++;
            fill(0,255,0, 100);
            rect(board[this.pos].c * SQUARE_SIZE, board[this.pos].r * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
        }
        this.checkPos()
    }

    checkPos(){
        if (this.pos >= board.length){
            this.pos = 0;
        } else if (this.pos <= 0) {
            this.pos = 0;
        }

        let ni = board[this.pos].getNextBoardIndex();
        if (ni+1 != ni){
            this.pos = ni;
        }
    }

    getCenter () { 
        let x = board[this.pos].c * SQUARE_SIZE + floor(SQUARE_SIZE/2);
        let y = board[this.pos].r * SQUARE_SIZE + floor(SQUARE_SIZE/2);

        return [x, y];
    }

    show(){
        let x = this.getCenter()[0];
        let y = this.getCenter()[1];
        fill(255, 255, 0)
        circle(x, y, 16)
    }
}