let width = 801;
let height = 600
let lx = 0;
let ly = height/5;
let lw = width;
let lh = (height/5)*3;

let level;
let enemies = [];
let towermenu;
let count = 0;
let towers = [];

let kpressed = null;

function setup(){
    createCanvas(width, height);

    towermenu = new TowerMenu(0, height-height/5, width, height/5);
    level = new Level(L1, lx, ly, lw, lh);

}

function draw(){
    background(37, 36, 64);

    towermenu.show();
    level.show();

    if(count%100==0){
        enemies.push(new Enemy(random(-500, 0), lh/2+ly+level.bh/2));
    }

    for (let enemy of enemies){
        enemy.update();
        enemy.show();
        if(enemy.x > width){
            let i = enemies.indexOf(enemy)
            enemies.splice(i, 1);
        }    
    }

    for (let tower of towers){
        tower.show();
        for (let enemy of enemies){
            if (tower.contains(enemy)){
                console.log('algo')
                tower.shoot(enemy);
            }
        }

    }

    count++;
}

function keyPressed(){
    if (key == 't'){
        kpressed = 't';
    }
}

function keyReleased(){
    kpressed = null;
}

function mousePressed(){
    if (kpressed == 't'){
        towers.push(new Tower(mouseX, mouseY));
    }

}