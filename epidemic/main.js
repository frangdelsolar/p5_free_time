let blocks = [];
let houses = [];
let jobs = [];
let bloobs = [];
let block_amt = 6;

let dnas = [];

let count = 0;
let day = 0;
let today;
let countP;
let dayP;

function setup(){
    createCanvas(1200, 600);

    createBuildings();
    setJobsAndHouses();
    createBloobs();

    countP = createP();
    dayP = createP();
}

function draw(){
    background(0);
    countP.html(count);
    dayP.html(day);

    blocks.forEach(block => block.show());

    for (let bloob of bloobs){
        bloob.update();
        bloob.show();
    }



    if (count%300 == 0){
        today = new Day();
        day++;
    }

    today.update();
    today.execute()

    push();
    stroke(200);
    line(width/2, 0, width/2, height)
    pop();

    fill(220);
    noStroke();

    let x = 625;
    let y = 50;

    text('Total: ' + bloobs.length, x, y);
    
    y+=50;
    let r = 40;


    x1 = x-r/2;
    text('cepa', x1, y);
    x1 += r;
    text('current', x1, y);
    x1 += r;
    text('dead', x1, y);
    x1 += r;
    text('Duración', x1, y);
    x1 += r*1.5;
    text('dias', x1, y);
    x1 += r;
    text('Rango', x1, y);
    x1 += r;
    text('Contagio', x1, y);
    x1 += r;
    text('Mortal', x1, y);



    y += 50;


    for (let dna of dnas){
        dna.show(x, y, r);
        y += 50;
    }
    count++;
}