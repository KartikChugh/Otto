import { datasetMetadata } from "static/datasets/metadata";
import KNN from "ml-knn";
import { ModelActions } from "state/ModelActions";

let knn;
let seperationSize; // To seperate training and test data

let dataInfo = {};
let data = [],
  X = [],
  y = [];

let trainingSetX = [],
  trainingSetY = [],
  testSetX = [],
  testSetY = [];

let K, DISPATCH, typesArray;

function init() {
  X = [];
  y = [];
  dataInfo = {};
}

export function invokeKNN(k: Number, sampleDataset, dispatch) {
  dispatch({
    type: ModelActions.RUNNING,
  });
  init();
  // Set Param
  K = k;
  DISPATCH = dispatch;
  dataInfo = datasetMetadata[sampleDataset];
  data = dataInfo.data;
  seperationSize = 0.7 * data.length;
  data = shuffleArray(data);
  dressData();
}

export default function dressData() {
  /**
   * There are three different types of Iris flowers
   * that this dataset classifies.
   *
   * 1. Iris Setosa (Iris-setosa)
   * 2. Iris Versicolor (Iris-versicolor)
   * 3. Iris Virginica (Iris-virginica)
   *
   * We are going to change these classes from Strings to numbers.
   * Such that, a value of type equal to
   * 0 would mean setosa,
   * 1 would mean versicolor, and
   * 3 would mean virginica
   */

  let types = new Set(); // To gather UNIQUE classes

  data.forEach((row) => {
    types.add(row.type);
  });

  typesArray = [...types]; // To save the different types of classes.
  data.forEach((row) => {
    let rowArray, typeNumber;

    rowArray = Object.keys(row).map((key) => parseFloat(row[key]));

    if (dataInfo.title === "Iris") {
      rowArray = rowArray.slice(0, 4);
    } else {
      rowArray = rowArray.slice(1);
    }

    typeNumber = typesArray.indexOf(row.type); // Convert type(String) to type(Number)

    X.push(rowArray);
    y.push(typeNumber);
  });

  trainingSetX = X.slice(0, seperationSize);
  trainingSetY = y.slice(0, seperationSize);
  testSetX = X.slice(seperationSize);
  testSetY = y.slice(seperationSize);

  train();
}

function train() {
  knn = new KNN(trainingSetX, trainingSetY, { k: K });
  test();
}

function test() {
  const result = knn.predict(testSetX);
  const testSetLength = testSetX.length;
  const predictionError = error(result, testSetY);
  setTimeout(function () {
    DISPATCH({
      type: ModelActions.KNN_DONE,
      knn_result_labels: result,
      knn_expected_labels: testSetY,
      knn_test_data: testSetX,
      knn_columns: dataInfo.columns,
      knn_columns_map: dataInfo.columnsMap,
      knn_labels: typesArray,
      knn_column_units: dataInfo.units,
      knn_accuracy: [trainingSetX.length, testSetLength, predictionError],
    });
  }, 700);
}

function error(predicted, expected) {
  let misclassifications = 0;
  for (var index = 0; index < predicted.length; index++) {
    if (predicted[index] !== expected[index]) {
      misclassifications++;
    }
  }
  return misclassifications;
}

/**
 * https://stackoverflow.com/a/12646864
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
export function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
