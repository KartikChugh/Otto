import { Layers } from "nn-architecture/hyperparams";
const StringBuilder = require('stringbuilder');

export const networkCode = (network) => {
    const sb = new StringBuilder( {newline:'\r\n'} );

    sb.appendLine("model = Sequential()");

    sb.appendLine(layerCode(network.layers));

    sb.appendLine(optimizerCode(network.optimizer));

    sb.appendLine(`model.compile(optimizer='${network.optimizer}', loss='${network.loss}')`);

    sb.appendLine("model.fit(x_train, y_train, batch_size=32, epochs=100");

    return sb;
}

const optimizerCode = (optimizer) => {
    const str = `opt=${optimizer}()`
    return str;
}

const layerCode = (layers) => {
    const sb = new StringBuilder( {newline:'\r\n'} );
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
    return sb;
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