import { Layers } from "nn-architecture/hyperparams";
const StringBuilder = require('string-builder');

export const networkCode = (network) => {
    const sb = new StringBuilder();

    sb.appendLine("model = Sequential()");
    sb.append(layerCode(network));

    sb.appendLine(`model.compile(optimizer='${network.optimizer}', loss='${network.loss}')`);


    return sb.toString();
}

const layerCode = (network) => {
    const sb = new StringBuilder();
    const layers = network.layers;
    for (let i = 0; i < layers.length; i++) {
        const layer = layers[i];

        let layerCode;
        if (i === 0) {
            layerCode = inputLayerCode(layer);
        } else if (i === layers.length - 1) {
            layerCode = outputLayerCode(layer, network);
        } else {
            layerCode = hiddenLayerCode(layer, network);
        }

        sb.appendLine(layerCode);

    }
    return sb.toString();
}

const inputLayerCode = (layer) => {
    const units = layer.units;

    const str = `model.add(Input(shape=(${units},)))`
    return str;
}

const hiddenLayerCode = (layer, network) => {
    const units = layer.units;
    const activation = network.activation;
    const initializer = network.initializer;

    const str = `model.add(Dense(${units}, activation='${activation}', kernel_initializer='${initializer}'))`
    return str;
}

const outputLayerCode = (layer, network) => {
    const units = layer.units;
    const activation = network.outputActivation;
    const initializer = network.initializer;

    const str = `model.add(Dense(${units}, activation='${activation}', kernel_initializer='${initializer}'))`
    return str;
}