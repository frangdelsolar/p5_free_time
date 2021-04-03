class Population{
    constructor(size){
        this.simulations = [];
        this.size = size;

        this.matingpool = [];

        for (let i=0; i<size; i++){
            let x = 0;
            let y = i * DISPLAY_HEIGHT;
            let width = DISPLAY_WIDTH;
            let height = DISPLAY_HEIGHT;
            this.simulations[i] = new Simulation(x, y, width, height);
        }

        this.bestplayer = this.simulations[0].player;

        best_player_ever = this.bestplayer;

    }

    // setDisplay(){
    //     // this.display=[];
    //     // for (let i=0; i<2; i++){
    //     //     let simulation = random(this.simulations);
    //     //     this.display.push(simulation); 
    //     // }
    //     this.display = this.simulations;

    // }

    show(){
        let fitness = -Infinity;
        let chosen = null;
        for(let sim of this.simulations){
            if(sim.player.fitness>= fitness){
                fitness = sim.fitness;
                chosen = sim;
            }

        }
        if(chosen){
            chosen.show();
        }
        // best_player_ever.simulation.show();
        // random(this.simulations).show();
    }

    run(){
        dead = 0;
        for (let simulation of this.simulations){
            simulation.update();
            if(simulation.player.dead){
                dead++;
            }
        }
    }

    evaluate(){
        let maxfit = 0;
        for (let simulation of this.simulations){
            let player = simulation.player;
            player.calcFitness();
            if (player.fitness > maxfit){
                maxfit = player.fitness;
                this.bestplayer = player;

                if (player.fitness > best_player_ever.fitness){
                    best_player_ever = player;
                }

            }
        }

        for (let simulation of this.simulations){
            if(maxfit == 0){
                maxfit = 1;
            } 
            simulation.player.fitness /= maxfit;
        }

        this.matingpool = [];
        for (let simulation of this.simulations){
            let n = simulation.player.fitness * 100;
            for (let j = 0; j < n; j++){
                this.matingpool.push(simulation.player.brain);
            }
        }

    }



    selection () {
        let newSimulations = [];
        for (let i = 0; i < this.simulations.length; i++){
            let parentA = random(this.matingpool);
            let parentB = random(this.matingpool);
            // let parentA = this.bestsnake.brain;
            // let parentB = this.bestsnake.brain;           
            let child = parentA.crossover(parentB);
            child.mutate(0.1);
            let x = 0;
            let y = i * DISPLAY_HEIGHT;
            let width = DISPLAY_WIDTH;
            let height = DISPLAY_HEIGHT;
            let newSimulation = new Simulation(x, y, width, height);
            let newPlayer = new Player(newSimulation, child);
            newSimulation.player = newPlayer;
            newSimulations[i] = newSimulation;   
        }
        this.simulations = newSimulations;
        // this.setDisplay();
    }

}