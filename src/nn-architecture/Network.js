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
        this.activations = Activations.RELU;
        this.outputActivations = Activations.SOFTMAX;

        this.optimizer = Optimizers.ADAM;
        this.loss = Losses.BINARY_CLASS;
        
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
