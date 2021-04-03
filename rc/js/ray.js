function getDistance(x1, y1, x2, y2){
    return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
}

class Ray {
    constructor(ctx, level, x, y, a, increment, col){
        this.ctx = ctx;
        this.level = level;
        this.x = x;
        this.y = y;
        this.a = a;
        this.increment = increment;
        this.col = col;
        this.playera = 0;

        this.wallHitX = 0;
        this.wallHitY = 0;

        this.wallHitXH = 0;
        this.wallHitYH = 0;

        this.wallHitXV = 0;
        this.wallHitYV = 0;

        this.distance = 0;
    }

    updatePos(x, y, a){
        this.x = x;
        this.y = y;
        this.a = normalizeAngle(a + this.increment);
        this.playera = a;
    }

    cast (){
        this.xIntercept = 0;
        this.yIntercept = 0;

        this.xStep = 0;
        this.yStep = 0;

        // Averiguar dirección
        this.down = false;
        this.left = false;

        if (this.a < Math.PI){
            this.down = true;
        }

        if (this.a > Math.PI/2 && this.a < 3 * Math.PI/2){
            this.left = true;
        }   

        // Horizontal hit
        let horHit = false;
        let tileh = this.level.tileh;
        
        // Intersection
        this.yIntercept = Math.floor(this.y/tileh) * tileh;

        if (this.down){
            this.yIntercept += tileh;
        }

        this.adjacent = (this.yIntercept - this.y) / Math.tan(this.a);
        this.xIntercept = this.x + this.adjacent;

        // Distancia de cada paso
        this.yStep = tileh;
        this.xStep = this.yStep / Math.tan(this.a);

        // Si vamos hacia arriba invertimos.
        if (!this.down){
            this.yStep = -this.yStep;
        }

        // Comprobar si x es coherente.
        if ((this.left && this.xStep > 0) || (!this.left && this.xStep < 0)){
            this.xStep = -this.xStep
        }

        let nextXH = this.xIntercept;
        let nextYH = this.yIntercept;

        // Si apunta arriba, restar 1 px
        if (!this.down)
            nextYH--;

        // Bucle para buscar colisión
        while(!horHit){
            // obtener casilla redondeando abajo
            let boxC = parseInt(nextXH/tileh);
            let boxR = parseInt(nextYH/tileh);

            if (this.level.collide(boxR, boxC)){
                horHit = true;
                this.wallHitXH = nextXH;
                this.wallHitYH = nextYH;
            } else {
                nextXH += this.xStep;
                nextYH += this.yStep;
            }

        } // fin while


        // Colision Vertical
        let verHit = false;
        
        //Primera interseccion
        this.xIntercept = Math.floor(this.x/tileh) * tileh;

        // Si a la derecha incrementa 1 tile
        if (!this.left){
            this.xIntercept += tileh;
        }

        // Sumar cateto opuesto
        let opposite = (this.xIntercept - this.x) * Math.tan(this.a);
        this.yIntercept = this.y + opposite;

        // Calc dist cada paso
        this.xStep = tileh;

        // Si a la izq, invertir
        if (this.left){
            this.xStep = -this.xStep;
        }

        this.yStep = tileh * Math.tan(this.a);
        
        // Coherencia Y
        if ((!this.down && this.yStep > 0) || (this.down && this.yStep < 0)){
            this.yStep = -this.yStep;
        }

        let nextXV = this.xIntercept;
        let nextYV = this.yIntercept;

        if (this.left){
            nextXV--;
        }

        // Bucle para detectar colisión
        while(!verHit && (nextXV >= 0 && nextYV >= 0 && nextXV < this.level.canvasw && nextYV < this.level.canvash)) {
            // Redondeand casilla para abajo
            let boxC = parseInt(nextXV/tileh);
            let boxR = parseInt(nextYV/tileh);

            if (this.level.collide(boxR, boxC)){
                verHit = true;
                this.wallHitXV = nextXV;
                this.wallHitYV = nextYV;
            } else {
                nextXV += this.xStep;
                nextYV += this.yStep;
            }

        }

        let distHor = 9999;
        let distVer = 9999;

        if (horHit){
            distHor = getDistance(this.x, this.y, this.wallHitXH, this.wallHitYH);
        }

        if (verHit){
            distVer = getDistance(this.x, this.y, this.wallHitXV, this.wallHitYV);
        }

        if (distHor < distVer){
            this.wallHitX = this.wallHitXH;
            this.wallHitY = this.wallHitYH;
            this.distance = distHor;
        } else {
            this.wallHitX = this.wallHitXV;
            this.wallHitY = this.wallHitYV;
            this.distance = distVer;
        }

        //Correccion ojo de pez
        this.distance = this.distance * Math.cos(this.playera-this.a)
    }

    renderWall(){
        this.cast();
        let planeH = 500;
        let distanceToPlane = (this.level.canvasw/2) / Math.tan(FOV/2);
        let wallH = (planeH / this.distance) * distanceToPlane;

        let y0 = (this.level.canvash/2) - (wallH/2);
        let y1 = y0 + wallH;
        let x = this.col;

        this.ctx.beginPath();
        this.ctx.moveTo(x, y0);
        this.ctx.lineTo(x, y1);
        this.ctx.strokeStyle = '#BBBBBB';
        this.ctx.stroke();
    }

    show(){
        this.cast();

        let xDest = this.wallHitX;
        let yDest = this.wallHitY;

        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(xDest, yDest);
        this.ctx.strokeStyle = 'red';
        this.ctx.stroke();

    }
}