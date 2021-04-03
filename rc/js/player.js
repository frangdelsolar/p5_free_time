const playerColor = 'white';

function normalizeAngle(a){
    a = a % (Math.PI*2);
    if(a < 0){
        a += (Math.PI*2);
    }
    return a;
}

function toRadians(a){
    return  a * (Math.PI/180);
}

class Player {
    constructor(ctx, level){
        this.ctx = ctx;
        this.level = level;

        // Position
        this.x = width/2;
        this.y = height/2;

        // Rotation
        this.r = 8;
        this.a = 3*(Math.PI/2);

        // Movement
        this.walking = 0; //0 stop 1 forward -1 backwards
        this.turning = 0; //0 stop 1 right -1 left
        this.linearSpeed = 3; // Pixels
        this.angularSpeed = 3 * (Math.PI/180); // Radians

        this.rayAmt = this.level.canvasw;
        this.rays = [];
        
        // Calcular el incremento del ángulo
        this.FOV = FOV;
        this.aincrement = toRadians(this.FOV/this.rayAmt);

        let startangle = toRadians(this.a - (this.FOV/2));
        let rayangle = startangle;
        for (let i=0; i<this.rayAmt; i++){
            this.rays[i] = new Ray(this.ctx, this.level, this.x, this.y, this.a, rayangle, i);
            rayangle += this.aincrement;
        }

    }

    collide(x, y){
        let r = Math.floor(y/level.tileh);
        let c = Math.floor(x/level.tilew);

        if (this.level.collide(r, c)){
            return true;
        }

        return false;
    }

    update(){

        let newX = this.x + (Math.cos(this.a) * this.linearSpeed * this.walking);
        let newY = this.y + (Math.sin(this.a) * this.linearSpeed * this.walking);

        if (!this.collide(newX, newY)){
            this.x = newX;
            this.y = newY;
        }

        this.a += this.turning * this.angularSpeed;
        this.a = normalizeAngle(this.a);

        // Actualizar los rayos
        for (let ray of this.rays){
            ray.updatePos(this.x, this.y, this.a);
        }
    }

    // Drawing
    show(){
        this.ctx.fillStyle = playerColor;
        this.ctx.fillRect(this.x-this.r/2, this.y-this.r/2, this.r, this.r); 

        for (let ray of this.rays){
            ray.renderWall();
        }
    }

    showDir(){
        let len = 30;
        let newX = this.x + (Math.cos(this.a) * len);
        let newY = this.y + (Math.sin(this.a) * len);

        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(newX, newY);
        this.ctx.strokeStyle = '#FFFFFF';
        this.ctx.stroke();


    }

    // Movement
    walkUp() {
        this.walking = 1;
    }

    walkDown() {
        this.walking = -1;
    }

    rotateLeft() {
        this.turning = -1;
    }

    rotateRight() {
        this.turning = 1;
    }

    stopWalking() {
        this.walking = 0;
    }

    stopRotating() {
        this.turning = 0;
    }
}