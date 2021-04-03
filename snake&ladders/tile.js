class Tile {

    constructor (r, c, boardIndex, placeholder){
        this.r = r;
        this.c = c;
        this.boardIndex = boardIndex;
        this.placeholder = placeholder;
        this.link = null;
    }

    getCenter () { 
        let x = this.c * SQUARE_SIZE + floor(SQUARE_SIZE/2);
        let y = this.r * SQUARE_SIZE + floor(SQUARE_SIZE/2);
        return [x, y];
    }

    getNextPlaceholder () {
        let nextPlaceholder = this.boardIndex;
        if (this.link != null) {
            nextPlaceholder = this.placeholder + this.link;
        }
        return nextPlaceholder;
    }

    getNextBoardIndex () {
        let placeholder = this.getNextPlaceholder();
        
        for (let tile of board){
            if (tile != this){
                if (tile.placeholder == placeholder) {
                    return tile.placeholder;
                }
            } 
        }
    }

    getNextTile () {
        return board[this.getNextBoardIndex()]
    }


    show(){
        if (this.boardIndex % 2 == 0) {
            fill(200);
        } else {
            fill(100);
        }
        strokeWeight(1);
        stroke(0);

        rect(this.c * SQUARE_SIZE, this.r * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
        
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(255);
        let txt = this.index;// + '=>' + this.getNextIndex();
        text(txt, this.getCenter()[0], this.getCenter()[1]);

    }

    showLinks() {

        if (this.link != null) {

            let color = [245, 0, 200];
            if (this.link < 0){
                color = [200, 245, 0];
            }

            let x1 = this.getCenter()[0];
            let y1 = this.getCenter()[1];
            let x2 = this.getNextTile().getCenter()[0];
            let y2 = this.getNextTile().getCenter()[1];

            stroke(color);
            strokeWeight(4);
            line(x1, y1, x2, y2);
        }

    }
}