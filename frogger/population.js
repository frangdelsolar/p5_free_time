class Population {
    constructor(){
        this.agents = [];
        this.popsize = 50;
        this.matingpool = [];

        for (let i=0; i<this.popsize; i++){
            this.agents[i] = new Frog(WIN_WIDTH/2, height-scl*1, scl, scl, color(0, 255, 0, 100));
        }
    }

    evaluate(){
        let maxfit = 0;
        for (let agent of this.agents){
            agent.calcFitness();
            if (agent.fitness > maxfit){
               maxfit = agent.fitness;
            }
        }

        for (let agent of this.agents){
            agent.fitness /= maxfit;
        }

        this.matingpool = [];

        for (let agent of this.agents){
            let n = agent.fitness * 100;
            for (let j = 0; j < n; j++){
                this.matingpool.push(agent.brain);
            }
        }
    }


    selection () {
        let newAgents = [];
        for (let i = 0; i < this.agents.length; i++){
            let parentA = random(this.matingpool);
            let parentB = random(this.matingpool);
            let child = parentA.crossover(parentB);
            child.mutate(0.1);
            newAgents[i] = new Frog(WIN_WIDTH/2, height-scl*1, scl, scl, color(0, 255, 0, 200), child)
        }
        this.agents = newAgents;
    }

    run() {
        for (let agent of this.agents){

            if (!agent.dead){
                agent.update();
                agent.show();
                // agent.showD();
            }
        }
    }
}