import {
  TasksType,
  ModelsType,
  DatasetCategoryType,
  SampleDatasetType,
  PreprocessorsType,
} from "state/StateTypes";

export const Actions = Object.freeze({
  SET_TASK: "SET_TASK",
  SET_MODEL: "SET_MODEL",
  SET_DATASET_CATEGORY: "SET_DATASET_CATEGORY",
  SET_SAMPLE_DATASET: "SET_SAMPLE_DATASET",
  SET_TASK_OTTO: "SET_TASK_OTTO",
  SET_MODEL_OTTO: "SET_MODEL_OTTO",
  SET_DATASET_CATEGORY_OTTO: "SET_DATASET_CATEGORY_OTTO",
  SET_SAMPLE_DATASET_OTTO: "SET_SAMPLE_DATASET_OTTO",
  TOGGLE_PREPROCESSOR: "TOGGLE_PREPROCESSOR",
  TOGGLE_PREPROCESSOR_OTTO: "TOGGLE_PREPROCESSOR_OTTO",
  STEPPER_HANDLE_NEXT: "STEPPER_HANDLE_NEXT",
  STEPPER_HANDLE_PREVIOUS: "STEPPER_HANDLE_PREVIOUS",
  HANDLE_STEPPER_FINISH: "HANDLE_STEPPER_FINISH",
  HANDLE_RESET: "HANDLE_RESET",
});

export type ActionType =
  | { type: "SET_TASK", task: TasksType }
  | { type: "SET_MODEL", model: ModelsType }
  | { type: "SET_DATASET_CATEGORY", dataset_category: DatasetCategoryType }
  | { type: "SET_SAMPLE_DATASET", sample_dataset: SampleDatasetType }
  | { type: "SET_TASK_OTTO", task: TasksType }
  | { type: "SET_MODEL_OTTO", model: ModelsType }
  | {
      type: "SET_DATASET_CATEGORY_OTTO",
      dataset_category: DatasetCategoryType,
    }
  | { type: "SET_SAMPLE_DATASET_OTTO", sample_dataset: SampleDatasetType }
  | { type: "TOGGLE_PREPROCESSOR", preprocessor: PreprocessorsType }
  | { type: "TOGGLE_PREPROCESSOR_OTTO", preprocessor: PreprocessorsType }
  | { type: "STEPPER_HANDLE_NEXT" }
  | { type: "STEPPER_HANDLE_PREVIOUS" }
  | { type: "HANDLE_STEPPER_FINISH" }
  | { type: "HANDLE_RESET" };
