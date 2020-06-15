import { Layers } from "nn-architecture/hyperparams";
const StringBuilder = require("string-builder");

export const model = (state) => {
  const sb = new StringBuilder();

  sb.appendLine("model = Sequential()");
  sb.append(layerCode(state));

  sb.appendLine(
    `model.compile(optimizer='${state.optimizer}', loss='${state.loss}')`
  );

  sb.appendLine("model.fit(X_train, y_train, batch_size=32, epochs=100)");

  return sb.toString();
};

const layerCode = (state) => {
  const sb = new StringBuilder();
  const layers = state.layers;
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];

    let layerCode;
    if (i === 0) {
      layerCode = inputLayerCode(layer);
    } else if (i === layers.length - 1) {
      layerCode = outputLayerCode(layer, state);
    } else {
      layerCode = hiddenLayerCode(layer, state);
    }

    sb.appendLine(layerCode);
  }
  return sb.toString();
};

const inputLayerCode = (layer) => {
  const units = layer.units;

  const str = `model.add(Input(shape=(${units},)))`;
  return str;
};

const hiddenLayerCode = (layer, state) => {
  const units = layer.units;
  const activation = state.activation;
  const initializer = state.initializer;

  const str = `model.add(Dense(${units}, activation='${activation}', kernel_initializer='${initializer}'))`;
  return str;
};

const outputLayerCode = (layer, state) => {
  const units = layer.units;
  const activation = state.outputActivation;
  const initializer = state.initializer;

  const str = `model.add(Dense(${units}, activation='${activation}', kernel_initializer='${initializer}'))`;
  return str;
};
