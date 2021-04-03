function createBloob(house){
    let pos = house.chooseRandomPos();
    let r = house.w/5;
    let bloob = new Bloob(pos, r, house);

    bloob.getAJob();
    bloob.visits.push(random(jobs));
    bloob.visits.push(random(jobs));
    bloob.visits.push(random(jobs));
    
    house.bloobs.push(bloob);
    bloobs.push(bloob);
}

function createBuildings(){
    let max_width = width/2;
    let blockW = (max_width / block_amt);
    let gap = blockW/6;
    let w = blockW - gap;
    let h = blockW - gap;
    let index = 0;
    for (let i = 0; i < block_amt; i++){
        for (let j = 0; j < block_amt; j++){ 
            let x = blockW * i;
            let y = blockW * j;
            let x1 = x + gap/2;
            let y1 = y + gap/2;            
            blocks[index] = new Block(x1, y1, w, h);
            index++;
        }
    }
}

function setJobsAndHouses(){
    for (let block of blocks){
        for (let building of block.buildings){
            if (building.type != 'house'){
                jobs.push(building);                              
            } else {
                houses.push(building)
            }
        }
    }
}

function createBloobs(){
    let amt = 5;
    for (let house of houses){
        for (let i = 0; i < amt; i++){
            createBloob(house);
        }
    }
}