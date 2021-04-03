let canvas;
let ctx;
const FPS = 50;

// Dimensiones
let width = 800;
let height = 800;

let level;
let player;

const FOV = 60;


function setupCanvas(){


    canvas = document.getElementById('levelCanvas');
    ctx = canvas.getContext('2d');
    
    // Definir tamaño del canvas
    canvas.width = width;
    canvas.height = height;

    // Escuchar al teclado
    new KeyboardListener(document);

    //Inicializa el bucle del juego
    setInterval(function(){draw();}, 1000/FPS);

    // Inicializa el Nivel
    level = new Level(canvas, ctx);
    player = new Player(ctx, level);
    
}

function eraseCanvas(){
    canvas.width = canvas.width;
    canvas.height = canvas.height;
}

function draw(){
    eraseCanvas();

    // level.show();

    player.update();
    player.show();
    // player.showDir();

}


