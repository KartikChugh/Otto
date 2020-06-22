/* eslint-disable array-callback-return */
import regression from "regression";
import { ModelActions } from "state/ModelActions";
import { datasetMetadata } from "static/datasets/metadata";
import { SampleDataset } from "state/StateTypes";
import { shuffleArray } from "js-ml/knn";

export function invokeLinReg(dispatch, indVar, setAxes = false) {
  dispatch({
    type: ModelActions.RUNNING,
  });
  const datas = datasetMetadata[SampleDataset.BOSTON];
  let data = datas.data;
  const trainAgainst =
    indVar != null ? datas.columns.indexOf(indVar) : datas.indVar;
  data = dressData(data, datas.depVar, trainAgainst, datas.columns);
  data = shuffleArray(data);

  const separationSize = 0.7 * data.length;
  const train = data.slice(0, separationSize);
  const test = data.slice(separationSize);

  const result = regression.linear(train);
  const testResult = test.map((point) => result.predict(point[0]));

  const dispatchObject = {
    type: ModelActions.LINREG_DONE,
    linreg_test_result: testResult,
    linreg_test_set: test,
    linreg_columns: datas.columns,
  };
  if (setAxes) {
    dispatchObject["linreg_x_name"] = datas.columns[datas.indVar];
    dispatchObject["linreg_y_name"] = datas.columns[datas.depVar];
  }

  dispatch(dispatchObject);
}

function dressData(data, depVar, indVar, columns) {
  const linRegData = [];
  data.map((point) => {
    linRegData.push([point[columns[indVar]], point[columns[depVar]]]);
  });
  return linRegData;
}
