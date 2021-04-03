class Player {
    constructor(color) {
        this.color = color;
        this.set = [];


        if (this.color === 255){ // white

            // PAWNS
            for (let i=0; i<8; i++){
                this.set.push(new Pawn(this.color, 6, i));
            }

        } else {

            // PAWNS
            for (let i=0; i<8; i++){
                this.set.push(new Pawn(this.color, 1, i));
            }

        }
    }

    show (){
        for (let piece of this.set) {
            piece.show();
        }
    }
}