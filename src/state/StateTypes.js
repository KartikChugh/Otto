export const Tasks = Object.freeze({
  CLASSIFICATION: "Classification",
  REGRESSION: "Regression",
  NATURAL_LANGUAGE: "Natural Language",
});

export const Models = Object.freeze({
  LINEAR_REGRESSION: "Linear Regression",
  KNN: "KNN",
  NEURAL_NETWORK_FF: "Neural Network FF",
  SENTIMENT_ANALYSIS: "Sentiment Analysis",
  ENTITY_RECOGNITION: "Entity Recognition",
});

export const TaskToModelsMap = (task: TasksType) => {
  let validModels;
  switch (Tasks[task]) {
    case Tasks.CLASSIFICATION:
      validModels = (({ KNN, NEURAL_NETWORK_FF }) => ({
        KNN,
        NEURAL_NETWORK_FF,
      }))(Models);
      return validModels;
    case Tasks.REGRESSION:
      validModels = (({ LINEAR_REGRESSION }) => ({
        LINEAR_REGRESSION,
      }))(Models);
      return validModels;
    case Tasks.NATURAL_LANGUAGE:
      validModels = (({ SENTIMENT_ANALYSIS, ENTITY_RECOGNITION }) => ({
        SENTIMENT_ANALYSIS,
        ENTITY_RECOGNITION,
      }))(Models);
      return validModels;
    default:
      return [];
  }
};

export const DatasetCategory = Object.freeze({
  CUSTOM: "Custom",
  SAMPLE: "Sample",
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

export type TasksType = "Classification" | "Regression" | "Natural Language";

export type ModelsType =
  | "Linear Regression"
  | "KNN"
  | "Neural Network FF"
  | "Sentiment Analysis"
  | "Entity Recognition";

export type DatasetCategoryType = "Custom" | "Sample";

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
