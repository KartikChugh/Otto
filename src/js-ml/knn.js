import { iris, irisColumns } from "static/datasets/iris"; // Data
import KNN from "ml-knn";
import { initializeWidget } from "containers/WidgetContainer";
import { ModelActions } from "state/ModelActions";

let knn;
const names = ["Sepal Length", "Sepal Width", "Petal Length", "Petal Width"]; // For header

let seperationSize; // To seperate training and test data

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
}

export function invoke(k: Number, dispatch) {
  init();
  // Set Param
  K = k;
  DISPATCH = dispatch;
  data = iris;
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
  console.log("FIRST", typesArray);
  data.forEach((row) => {
    let rowArray, typeNumber;

    rowArray = Object.keys(row)
      .map((key) => parseFloat(row[key]))
      .slice(0, 4);

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
  console.log(
    `Test Set Size = ${testSetLength} and number of Misclassifications = ${predictionError} and ${typesArray}`
  );
  setTimeout(function () {
    DISPATCH({
      type: "KNN_DONE",
      knn_result_labels: result,
      knn_expected_labels: testSetY,
      knn_test_data: testSetX,
      knn_columns: irisColumns,
      knn_labels: typesArray,
    });
  }, 500);

  //   predict();
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

function predict() {
  let temp = [];

  //   prompt.get(
  //     ["Sepal Length", "Sepal Width", "Petal Length", "Petal Width"],
  //     function (err, result) {
  //       if (!err) {
  //         for (var key in result) {
  //           temp.push(parseFloat(result[key]));
  //         }
  //         console.log(`With ${temp} -- type =  ${knn.predict(temp)}`);
  //       }
  //     }
  //   );
}

/**
 * https://stackoverflow.com/a/12646864
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
