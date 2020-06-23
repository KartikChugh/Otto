export const Tasks = Object.freeze({
  CLASSIFICATION: "Classification",
  REGRESSION: "Regression",
  NATURAL_LANGUAGE: "Natural Language",
});

export const Models = Object.freeze({
  LINEAR_REGRESSION: "Linear Regression",
  POISSON_REGRESSION: "Poisson Regression",
  ORDINAL_REGRESSION: "Ordinal Regression",
  KNN: "K-Nearest Neighbors",
  NEURAL_NETWORK_FF: "Feedforward Neural Network",
  SENTIMENT_ANALYSIS: "Sentiment Analysis",
  ENTITY_RECOGNITION: "Entity Recognition",
});

export const TaskToModelsMap = (task: TasksType) => {
  let validModels;
  switch (task) {
    case Tasks.CLASSIFICATION:
      validModels = (({ KNN, NEURAL_NETWORK_FF }) => ({
        KNN,
        NEURAL_NETWORK_FF,
      }))(Models);
      return validModels;
    case Tasks.REGRESSION:
      validModels = (({
        LINEAR_REGRESSION,
        POISSON_REGRESSION,
        ORDINAL_REGRESSION,
      }) => ({
        LINEAR_REGRESSION,
        POISSON_REGRESSION,
        ORDINAL_REGRESSION,
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
  BOSTON: "boston",
  TWITTER: "twitter",
});

export const Preprocessors = Object.freeze({
  PCA: "Component Analysis",
  NORMALIZATION: "Normalization",
  TEXT_CLEANING: "Text Cleaning",
});

export const StepperState = Object.freeze({
  TASK: "task",
  DATASET: "dataset",
  MODEL: "model",
  PREPROCESSORS: "preprocessors",
  VISUALIZE: "visualize",
});

export const StepperStateOrder = [
  StepperState.TASK,
  StepperState.DATASET,
  StepperState.MODEL,
  StepperState.PREPROCESSORS,
  StepperState.VISUALIZE,
];

export type TasksType = "Classification" | "Regression" | "Natural Language";

export type ModelsType =
  | "Linear Regression"
  | "Poisson Regression"
  | "Ordinal Regression"
  | "K-Nearest Neighbors"
  | "Feedforward Neural Network"
  | "Sentiment Analysis"
  | "Entity Recognition";

export type DatasetCategoryType = "Custom" | "Sample";

export type SampleDatasetType = "iris | boston";

export type PreprocessorsType = "PCA" | "Normalization" | "Text Cleaning";

export type StepperStateType =
  | "task"
  | "dataset"
  | "model"
  | "preprocessors"
  | "visualize";

export type StateType = {
  task: ?TasksType,
  task_otto: ?TasksType,
  model: ?ModelsType,
  model_otto: ?ModelsType,
  nlp_models: Array<?ModelsType>,
  nlp_models_otto: Array<?ModelsType>,
  dataset_category: ?DatasetCategoryType,
  dataset_category_otto: ?DatasetCategoryType,
  sample_dataset: ?SampleDatasetType,
  sample_dataset_otto: ?SampleDatasetType,
  preprocessors: Array<PreprocessorsType>,
  preprocessors_otto: Array<PreprocessorsType>,

  stepper_state: StepperStateType,
  stepper_finish: Boolean,
};

// export const InitialState: () => StateType = () => ({
//   task: Tasks.REGRESSION,
//   task_otto: null,
//   model: Models.LINEAR_REGRESSION,
//   model_otto: null,
//   nlp_models: [],
//   nlp_models_otto: [],
//   dataset_category: DatasetCategory.CUSTOM,
//   dataset_category_otto: null,
//   sample_dataset: null,
//   sample_dataset_otto: null,
//   preprocessors: [],
//   preprocessors_otto: [],

//   stepper_state: StepperState.PREPROCESSORS,
//   stepper_finish: false,
// });

// export const InitialState: () => StateType = () => ({
//   task: Tasks.NATURAL_LANGUAGE,
//   task_otto: null,
//   model: null,
//   model_otto: null,
//   nlp_models: [],
//   nlp_models_otto: [],
//   dataset_category: DatasetCategory.CUSTOM,
//   dataset_category_otto: null,
//   sample_dataset: null,
//   sample_dataset_otto: null,
//   preprocessors: [],
//   preprocessors_otto: [],

//   stepper_state: StepperState.MODEL,
//   stepper_finish: false,
// });

export const InitialState: () => StateType = () => ({
  task: Tasks.CLASSIFICATION,
  task_otto: null,
  model: Models.NEURAL_NETWORK_FF,
  model_otto: null,
  nlp_models: [],
  nlp_models_otto: [],
  dataset_category: DatasetCategory.CUSTOM,
  dataset_category_otto: null,
  sample_dataset: null,
  sample_dataset_otto: null,
  preprocessors: [],
  preprocessors_otto: [],

  stepper_state: StepperState.VISUALIZE,
  stepper_finish: false,
});

// export const InitialState: () => StateType = () => ({
//   task: null,
//   task_otto: null,
//   model: null,
//   model_otto: null,
//   nlp_models: [],
//   nlp_models_otto: [],
//   dataset_category: null,
//   dataset_category_otto: null,
//   sample_dataset: null,
//   sample_dataset_otto: null,
//   preprocessors: [],
//   preprocessors_otto: [],

//   stepper_state: StepperStateOrder[0],
//   stepper_finish: false,
// });
