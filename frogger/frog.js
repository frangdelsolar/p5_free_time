class Frog extends Rectangle {
    constructor(x, y, w, h, c, brain){
        super(x, y, w, h, c); 
        this.log = null;
        this.dead = false;

        if (brain){
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(18, 19, 4);
        }
        this.fitness = 0;     
    }

    showD(){
        let currentIndex = this.y/scl;
        let currentLane = lanes[currentIndex];

        let bottomIndex = currentIndex + 1;
        let bottomLane = lanes[bottomIndex];

        let topIndex = currentIndex - 1;
        let topLane = lanes[topIndex];

        if (topIndex === -1){
            topLane = null;
        }

        if (bottomIndex >= height/scl){
            bottomLane = null;
        }

        if (!currentLane.isSafe){
            for (let car of currentLane.vehicles){
                stroke(255);
                line(this.x + this.w/2, this.y + this.h/2, car.x + car.w/2, car.y + car.h/2)
            }
        }

        if (topLane && !topLane.isSafe){
            for (let car of topLane.vehicles){
                stroke(255);
                line(this.x + this.w/2, this.y + this.h/2, car.x + car.w/2, car.y + car.h/2)
            }
        }

        if (bottomLane && !bottomLane.isSafe){
            for (let car of bottomLane.vehicles){
                stroke(255);
                line(this.x + this.w/2, this.y + this.h/2, car.x + car.w/2, car.y + car.h/2)
            }
        }
    }



    calcFitness() {        
        this.fitness = 1/this.y;
    }

    currentLane(){
        let index = this.y/scl;
        let lane = lanes[index];


        let rd = 99999;
        let ld = 99999;

        let rxs = 0;
        let lxs = 0;

        if (!lane.isSafe){

            for (let v of lane.vehicles){

                if (v.x >= this.x && v.x - this.x <= rd){
                    rd = v.x - this.x;
                    rxs = v.xs
                }

                if (v.x <= this.x && this.x - v.x <= ld){
                    ld = this.x - v.x;
                    lxs = v.xs
                }
            }
        }

        let data = {
            rightDist: rd,
            leftDist: ld,
            rxs: rxs,
            lxs: lxs,
        }

        if (lane.isSafe){
            data.safe = 1;
        } else {
            data.safe = 0;
        }

        if (lane.vtype == 'car'){
            data.isCar = 1;
        } else {
            data.isCar = 0;
        }

        if (lane.vtype == 'bay'){
            data.isBay = 1;
        } else {
            data.isBay = 0;
        }

        if (lane.vtype == 'log'){
            data.isLog = 1;
        } else {
            data.isLog = 0;
        }

        // console.log(data)

        return data;
    }

    topLane(){
        let currentIndex = this.y/scl;

        let topIndex = currentIndex - 1;
        let lane = lanes[topIndex];

        let rd = 99999;
        let ld = 99999;

        let rxs = 0;
        let lxs = 0;

        if (!lane.isSafe){

            for (let v of lane.vehicles){

                if (v.x >= this.x && v.x - this.x <= rd){
                    rd = v.x - this.x;
                    rxs = v.xs
                }

                if (v.x <= this.x && this.x - v.x <= ld){
                    ld = this.x - v.x;
                    lxs = v.xs
                }
            }
        }

        let data = {
            rightDist: rd,
            leftDist: ld,
            rxs: rxs,
            lxs: lxs,
        }

        if (lane.isSafe){
            data.safe = 1;
        } else {
            data.safe = 0;
        }

        if (lane.vtype == 'car'){
            data.isCar = 1;
        } else {
            data.isCar = 0;
        }

        if (lane.vtype == 'bay'){
            data.isBay = 1;
        } else {
            data.isBay = 0;
        }

        if (lane.vtype == 'log'){
            data.isLog = 1;
        } else {
            data.isLog = 0;
        }

        // console.log(data)

        return data;
    }

    getInputs(){
        let inputs = [];
        inputs[0] = this.x;
        inputs[1] = this.y;

        // Current Lane
        let cL = this.currentLane();
        inputs[2] = cL.safe;
        inputs[3] = cL.isCar;
        inputs[4] = cL.isLog;
        inputs[5] = cL.isBay;
        inputs[6] = cL.rightDist;
        inputs[7] = cL.leftDist;
        inputs[8] = cL.rxs;
        inputs[9] = cL.lxs;

    

        // Top Lane
        let tL = this.topLane();
        inputs[10] = tL.safe;
        inputs[11] = tL.isCar;
        inputs[12] = tL.isLog;
        inputs[13] = cL.isBay;
        inputs[14] = tL.rightDist;
        inputs[15] = tL.leftDist;
        inputs[16] = cL.rxs;
        inputs[17] = cL.lxs;
        // console.log(inputs)

        return inputs;         
    }

    think(){

        let inputs = this.getInputs();
        let output = this.brain.predict(inputs);        
        let max = Math.max(...output);
        let index = output.indexOf(max);


        console.log('output: '+ output)

        return {index:index, input: inputs, output:output}
    }

    execute(){
        let index = this.think().index;
        let dir = [0,0];
        if (index == 0) {
            dir = [0, -1];
            this.move(dir);
        } else if (index == 1) {
            dir = [0, -1];
            this.move(dir);
        } else if (index == 2) {
            dir = [0, -1];
            this.move(dir);
        } else if (index == 3) {
            dir = [0, -1];
            this.move(dir);
        }
    }

    update(){

        if (this.dead){
            return;
        }

        this.execute();

        // this.calcFitness();
        // console.log(this.fitness);

        let index = this.y/scl;
        let lane = lanes[index];
        this.log = null;

        if (!lane.isSafe){
            if (lane.vtype == 'car'){
                for (let car of lane.vehicles){
                    if(this.intersects(car)){
                        // reset();
                        this.dead = true;
                    }
                }
            } else {

                for (let log of lane.vehicles){
                    if(this.intersects(log)){
                        this.log = log;
                    }
                }

                if (!this.log){
                    // reset()
                    this.dead = true;
                }

            } 
        }


        if(this.log){
            this.x += this.log.xs;
        }
        this.edges();
    }

    edges(){
        if (this.x <= 0){
            this.x = 0
        } else if (this.x + this.w >= WIN_WIDTH){
            this.x = WIN_WIDTH - this.w
        }
        if (this.y <= 0){
            this.y = 0
        } else if (this.y + this.h >= height){
            this.y = height-this.h
        }
    }

    move(dir){
        this.x += dir[0] * this.w;
        this.y += dir[1] * this.h;
        this.edges();
    }


}