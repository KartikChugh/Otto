import { Activations, Initializers } from "./hyperparams";

export class Layer {

    constructor(units, activation, initializer) {
        this.units = units;
        this.activation = activation ? activation : Activations.RELU;
        this.initializer = initializer ? initializer : Initializers.GLOROT;
    }

}