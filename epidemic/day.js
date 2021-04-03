class Day {
    constructor(){
        this.count = 0;
        this.start();
    }

    start(){
        for (let bloob of bloobs){
            bloob.setVisitsToZero();
            bloob.envejecer();

            if (bloob.dead){
                let i = bloobs.indexOf(bloob);
                bloobs.splice(i, 1);
            }

            bloob.morir();
        }

        this.reproduceBloobs();

        if(day == 1 || day % 5 == 0){
            this.sickBloobs();
        }
    }

    sickBloobs(){
        let b= random(bloobs);
        b.getSick();
    }

    reproduceBloobs(){
        let n = 0.18 * bloobs.length;

        for (let i = 0; i < n; i++){
            bloobs[i].reproduce();
        }
    }

    update(){
        this.count += 1;
    }

    execute(){

        switch(this.count){                
            case 10:
                bloobs.forEach(bloob => bloob.goWork());
                break;

            case 60:
                bloobs.forEach(bloob => bloob.goSomewhere());
                break;
                    
            case 110:
                bloobs.forEach(bloob => bloob.goSomewhere());
                break;

            case 160:
                bloobs.forEach(bloob => bloob.goHome());
                break;
        }

    }
}