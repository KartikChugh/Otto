import {
  TasksType,
  ModelsType,
  DatasetCategoryType,
  SampleDatasetType,
} from "state/StateTypes";

export const Actions = Object.freeze({
  SET_TASK: "SET_TASK",
  SET_MODEL: "SET_MODEL",
  SET_DATASET_CATEGORY: "SET_DATASET_CATEGORY",
  SET_SAMPLE_DATASET: "SET_SAMPLE_DATASET",
  STEPPER_HANDLE_NEXT: "STEPPER_HANDLE_NEXT",
  STEPPER_HANDLE_PREVIOUS: "STEPPER_HANDLE_PREVIOUS",
  HANDLE_STEPPER_FINISH: "HANDLE_STEPPER_FINISH",
  HANDLE_RESET: "HANDLE_RESET",
});

export type ActionType =
  | { type: "SET_TASK", task: TasksType }
  | { type: "SET_MODEL", model: ModelsType }
  | { type: "SET_DATASET_CATEGORY", data_category: DatasetCategoryType }
  | { type: "SET_SAMPLE_DATASET", sample_dataset: SampleDatasetType }
  | { type: "STEPPER_HANDLE_NEXT" }
  | { type: "STEPPER_HANDLE_PREVIOUS" }
  | { type: "HANDLE_STEPPER_FINISH" }
  | { type: "HANDLE_RESET" };
