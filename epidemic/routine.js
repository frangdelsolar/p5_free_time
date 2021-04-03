class Routine{
    constructor(agent){
        this.agent = agent;
        this.destination = null;        
        this.step = 0;
        this.aux = null;
    }

    go(destination){
        this.destination = destination;
        this.execute();
        this.stepUp();
    }

    execute(){
        if(this.destination){            
            let distance = this.destination.dist(this.agent.pos);
            if (distance > this.agent.speed){
                this.agent.go(this.destination);
            } else {
                this.destination = null;
            }
        }
    }

    stepUp(){
        if (!this.destination){
            this.step++;
        }
    }

    update(destination){

        switch (this.step){
            case 0:
                this.go(this.agent.location.door);
                break;

            case 1:
                this.agent.location = null; 
                this.go(destination.door);
                break;

            case 2:
                this.agent.location = destination;
                if (!destination.bloobs.includes(this.agent)){
                    destination.bloobs.push(this.agent);
                }
                if (this.aux == null){
                    this.aux = this.agent.location.chooseRandomPos();
                }
                this.go(this.aux);
                break;

            case 3:
                this.agent.contagiar();
                break;

            case 4:
                this.agent.routine = null;
                this.agent.visitIndex++;
                break
        }
    }

}

class SomewhereRoutine extends Routine{
    constructor(agent){
        super(agent);
    }

    update(){
        super.update(this.agent.visits[this.agent.visitIndex])
    }
}

class HomeRoutine extends Routine{
    constructor(agent){
        super(agent);
    }

    update(){
        super.update(this.agent.house)
    }
}

class WorkRoutine extends Routine {
    constructor(agent){
        super(agent);
    }

    update(){
        super.update(this.agent.job)
    }
}