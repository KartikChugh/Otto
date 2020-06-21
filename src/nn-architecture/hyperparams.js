export const Optimizers = Object.freeze({
  ADAM: "adam",
});

export const Losses = Object.freeze({
  BINARY_CLASS: "binary_crossentropy",
  MULTI_CLASS: "categorical_crossentropy",
});

export const Activations = Object.freeze({
  RELU: "relu",
  SIGMOID: "sigmoid",
  TANH: "tanh",
  SOFTMAX: "softmax",
});

export const Initializers = Object.freeze({
  GLOROT: "glorot_uniform",
  RANDOM: "random_uniform",
  HE: "he_uniform",
  LECUN: "lecun_uniform",
});

export const Layers = Object.freeze({
  INPUT: "Input",
  DENSE: "Dense",
});
