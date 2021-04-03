class KeyboardListener{     
    constructor(document){

        document.addEventListener('keydown', function(tecla){

            switch (tecla.keyCode){
                case 38:
                    player.walkUp();
                    break;

                case 40:
                    player.walkDown();
                    break;

                case 39:
                    player.rotateRight();
                    break;

                case 37:
                    player.rotateLeft();
                    break;
            }
        });

        document.addEventListener('keyup', function(tecla){

            switch (tecla.keyCode){
                case 38:
                    player.stopWalking();
                    break;

                case 40:
                    player.stopWalking();
                    break;

                case 39:
                    player.stopRotating();
                    break;

                case 37:
                    player.stopRotating();
                    break;
            }
        });
    }
}