class Perceptron {
    constructor(amount){
        this.weights = [];
        if(amount){
            this.weightamt = amount;
        } else {
            this.weightamt = 2;
        }

        for (let i=0; i<this.weightamt; i++){
            this.weights[i] = random(-1, 1);
        }

        this.lr = 0.1;
    }

    train(inputs, target) {
        let guess = this.guess(inputs);
        let error = target - guess;

        for (let i=0; i < this.weights.length; i++){
            this.weights[i] += error * inputs[i] * this.lr; 
        }
    }

    feedforward(inputs) {
        let sum = 0;
        for (let i = 0; i < this.weights.length; i++) {
        sum += inputs[i] * this.weights[i];
        }
        return this.activate(sum);
    }

    activate(sum) {
        if (sum > 0) {
            return 1;
        } else {
            return -1;
        }
    }

    getWeights() {
        return this.weights;
    }
}