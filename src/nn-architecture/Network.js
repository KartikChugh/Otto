import {
  Optimizers,
  Losses,
  Activations,
  Initializers,
} from "nn-architecture/hyperparams";
import { Layer } from "nn-architecture/Layer";

export class FeedforwardNN {
  constructor(state) {
    this.layers = state.layers;
    this.activation = state.activation;
    this.outputActivation = state.outputActivation;
    this.initializer = state.initializer;
    this.optimizer = state.optimizer;
    this.loss = state.loss;
  }

  pushLayer() {
    const layers = this.layers;
    const lastHiddenLayer = layers[layers.length - 2];
    const lastHiddenSize = lastHiddenLayer.units;
    const newLayer = new Layer(lastHiddenSize);
    layers.splice(layers.length - 1, 0, newLayer);
  }

  popLayer() {
    const layers = this.layers;
    layers.splice(layers.length - 2, 1);
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
