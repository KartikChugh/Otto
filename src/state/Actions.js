import {
  TasksType,
  ModelsType,
  DatasetCategoryType,
  SampleDatasetType,
} from "state/StateTypes";

export const Actions = Object.freeze({
  SET_TASK: "",
  SET_MODEL: "",
  SET_DATASET_CATEGORY: "",
  SET_SAMPLE_DATASET: "",
});

export type ActionType =
  | { type: "SET_TASK", task: TasksType }
  | { type: "SET_MODEL", model: ModelsType }
  | { type: "SET_DATASET_CATEGORY", data_category: DatasetCategoryType }
  | { type: "SET_SAMPLE_DATASET", sample_dataset: SampleDatasetType };
