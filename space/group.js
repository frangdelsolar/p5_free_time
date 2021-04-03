class Group{
    constructor(sim){
        const xA = 15;
        const yA = 2;

        this.agentamt = xA*yA;
        this.agents = [];
        this.shooting = null;
        this.simulation = sim;


        let x = 50;
        let y = this.simulation.y + 50;

        for (let i = 0; i < yA; i++){
            for (let j = 0; j < xA; j++){
                let posx = x + (35*j);
                let posy = y + (22*i);
                this.agents.push(new Enemy(this.simulation, posx, posy));            
            }    
        }
    }

    advance(){
        for(let agent of this.agents){
            agent.advance();
        }
    }

    update(){
        for(let agent of this.agents){
            agent.update();

            if (agent.pos.x - agent.size/2 <= 0 || agent.pos.x + agent.size/2 >= this.simulation.width){
                this.advance();
            }
        }

        if(!this.shooting){
            let agent = random(this.agents);
            agent.shoot();
            this.shooting = agent;
        }

        if(this.shooting){
            if(!this.shooting.bullet){
                this.shooting = null;
            }
        }

    }

    show(){
        for(let agent of this.agents){
            agent.show();
        }
    }
}