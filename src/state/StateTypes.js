export const Tasks = Object.freeze({
  CLASSIFICATION: "classification",
  REGRESSION: "regression",
  NATURAL_LANGUAGE_PROCESSING: "natural_language_processing",
});

export const Models = Object.freeze({
  LINEAR_REGRESSION: "linear_regression",
  KNN: "knn",
  NEURAL_NETWORK_FF: "neural_network_ff",
  SENTIMENT_ANALYSIS: "sentiment_analysis",
  ENTITY_RECOGNITION: "entity_recognition",
});

export const DatasetCategory = Object.freeze({
  CUSTOM: "custom",
  SAMPLE: "sample",
});

export const SampleDataset = Object.freeze({
  IRIS: "iris",
});

export const StepperState = Object.freeze({
  TASK: "task",
  DATASET: "dataset",
  MODEL: "model",
});

export const StepperStateOrder = [
  StepperState.TASK,
  StepperState.DATASET,
  StepperState.MODEL,
];

export type TasksType =
  | "classification"
  | "regression"
  | "natural_language_processing";

export type ModelsType =
  | "linear_regression"
  | "knn"
  | "neural_network_ff"
  | "sentiment_analysis"
  | "entity_recognition";

export type DatasetCategoryType = "custom" | "sample";

export type SampleDatasetType = "iris";

export type StepperStateType = "task" | "dataset" | "model";

export type StateType = {
  task: ?TasksType,
  model: ?ModelsType,
  dataset_category: ?DatasetCategoryType,
  sample_dataset: ?SampleDatasetType,
  stepper_state: StepperStateType,
  stepper_finish: Boolean,
};

export const InitialState: StateType = {
  task: null,
  model: null,
  dataset_category: null,
  sample_dataset: null,
  stepper_state: StepperState.TASK,
  stepper_finish: false,
};
