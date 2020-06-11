import { Optimizers, Losses, Activations, Initializers } from "nn-architecture/hyperparams"
import { Layer } from "nn-architecture/Layer"

export class FeedforwardNN {

    constructor() {
        this.layers = [
            new Layer(3),
            new Layer(5),
            new Layer(5),
            new Layer(5),
            new Layer(5),
            new Layer(2)
        ];
        this.activation = Activations.RELU;
        this.outputActivation = Activations.SOFTMAX;
        this.initializer = Initializers.GLOROT;
        this.optimizer = Optimizers.ADAM;
        this.loss = Losses.BINARY_CLASS;
        
    }

    pushLayer() {
        const layers = this.layers;
        const lastHiddenLayer = layers[layers.length-2];
        const lastHiddenSize = lastHiddenLayer.units;
        const newLayer = new Layer(lastHiddenSize);
        layers.splice(layers.length-1, 0, newLayer);
    }

    popLayer() {
        const layers = this.layers;
        layers.splice(layers.length-2, 1);
    }

}

    //  setBatchSize(newBatch) {
    //      this.batchSize = newBatch;
    //  }
    //  setLearnRate(newLearn) {
    //      this.learnRate = newLearn;
    //  } 

    //  setOptimizer(newOptimizer){
    //     this.optimizer = newOptimizer;
    // }

    //  setLoss(newLoss) {
    //      this.loss = newLoss; 
    //  }

    //  setEpochs(newEpochs) {
    //      this.epochs = newEpochs;
    //  }

    //  setlearningRateDecay(newDecay) {
    //      this.learningRateDecay = newDecay;
    //  }

    // // setInit(newInit) {
    // //     this.initializer = newInit;
    // // }

    // addLayer(newLayer) {
    //     this.arrLayers.push(newLayer);
    // }

    // removeLayer(index) {
    //     this.arrLayers.splice(index, 1);
    // }
