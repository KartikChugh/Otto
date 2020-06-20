import * as importsCode from "codegen/importsCode";
import * as regressionCode from "codegen/regressionCode";
import * as knnCode from "codegen/knnCode";
import * as sharedCode from "codegen/sharedCode";
import * as preprocessCode from "codegen/preprocessCode";
import { Models, DatasetCategory, Preprocessors, Tasks } from "state/StateTypes";
import * as networkCode from "codegen/networkCode";
import * as nlpCode from "codegen/nlpCode";
const StringBuilder = require("string-builder");

export const CodeGen = (state, nn_state) => {
  const sb = new StringBuilder();

  // task-based imports
  if (state.task === Tasks.NATURAL_LANGUAGE) {
    sb.append(importsCode.nlp());
  } else {
    sb.append(importsCode.supervised());
  }

  // model-specific imports
  switch (state.model) {
    case Models.KNN:
      sb.appendLine(importsCode.knn());
      break;
    case Models.NEURAL_NETWORK_FF:
      sb.appendLine(importsCode.nn());
      break;
    case Models.LINEAR_REGRESSION:
      sb.appendLine(importsCode.linear());
      break;
    case Models.ORDINAL_REGRESSION:
      sb.appendLine(importsCode.ordinal());
      break;
    case Models.POISSON_REGRESSION:
      sb.appendLine(importsCode.poisson());
      break;
  }

  // preprocessor imports
  if (state.preprocessors.includes(Preprocessors.NORMALIZATION)) {
    sb.appendLine(importsCode.normalization());
  }
  if (state.preprocessors.includes(Preprocessors.PCA)) {
    sb.appendLine(importsCode.pca());
  }
  if (state.preprocessors.includes(Preprocessors.TEXT_CLEANING)) {
    sb.appendLine(importsCode.textCleaning());
  }

  // import sklearn datasets
  if (state.dataset_category === DatasetCategory.SAMPLE && state.task !== Tasks.NATURAL_LANGUAGE) {
    sb.appendLine(importsCode.sklearnDatasets());
  }

  sb.appendLine();

  // defines loadData function
  if (state.dataset_category === DatasetCategory.SAMPLE) {
    if (state.task === Tasks.NATURAL_LANGUAGE) {
      sb.appendLine(sharedCode.defineLoadDatasetNLP()); // FIXME: names of datasets
    } else {
      sb.appendLine(sharedCode.defineLoadDataset()); // FIXME: names of datasets
    }
  } else {
    sb.appendLine(sharedCode.defineLoadUnspecified());
  }

  sb.appendLine();

  // defines params
  sb.appendLine(params(state));

  sb.appendLine();

  // loads data
  if (state.task === Tasks.NATURAL_LANGUAGE) {
    sb.appendLine(sharedCode.loadNLP());
  } else {
    sb.appendLine(sharedCode.load());
  }

  // scales data
  if (state.preprocessors.includes(Preprocessors.NORMALIZATION)) {
    sb.appendLine(preprocessCode.normalization());
  }

  // slices data (feature selection OR pca)
  sb.appendLine(sliceData(state));

  // splits training/testing sets
  if (state.task !== Tasks.NATURAL_LANGUAGE) {
    sb.appendLine(sharedCode.split()); // TODO: exempt nlp
  }

  // cleans text data
  if (state.preprocessors.includes(Preprocessors.TEXT_CLEANING)) {
    sb.appendLine(preprocessCode.textCleaning());
  }

  sb.appendLine();

  // fits model
  switch (state.model) {
    case Models.KNN:
      sb.appendLine(knnCode.model());
      break;
    case Models.NEURAL_NETWORK_FF:
      sb.appendLine(networkCode.model(nn_state));
      break;
    case Models.LINEAR_REGRESSION:
      sb.appendLine(regressionCode.modelLinear());
      break;
    case Models.ORDINAL_REGRESSION:
      sb.appendLine(regressionCode.modelOrdinal());
      break;
    case Models.POISSON_REGRESSION:
      sb.appendLine(regressionCode.modelPoisson());
      break;
  }
  if (state.task === Tasks.NATURAL_LANGUAGE) {
    sb.appendLine(nlpCode.modelNLP(true, true));
  }

  return sb.toString();
};

const componentsForModel = (model) => {
  switch (model) {
    case Models.KNN:
      return 2;
    case Models.NEURAL_NETWORK_FF:
      return "None";
    case Models.ORDINAL_REGRESSION:
    case Models.POISSON_REGRESSION:
    case Models.LINEAR_REGRESSION:
      return 1;
  }
};

const params = (state) => {
  if (state.preprocessors.includes(Preprocessors.PCA)) {
    const components = componentsForModel(state.model);
    return preprocessCode.paramsPca(components);
  }

  switch (state.model) {
    case Models.KNN:
      return knnCode.params(7); // TODO: replace with number of neighbors
    case Models.LINEAR_REGRESSION:
      return regressionCode.params(5); // TODO: replace with feature column
    case Models.ENTITY_RECOGNITION: // FIXME: array based
    case Models.SENTIMENT_ANALYSIS:
      return nlpCode.params(1); // TODO: replace with feature column
  }
};

const sliceData = (state) => {
  if (state.preprocessors.includes(Preprocessors.PCA)) {
    return preprocessCode.pca();
  }

  switch (state.model) {
    case Models.KNN:
      return knnCode.slice();
    case Models.ENTITY_RECOGNITION: // FIXME: array based
    case Models.SENTIMENT_ANALYSIS:
      return nlpCode.slice();
    case Models.ORDINAL_REGRESSION:
    case Models.POISSON_REGRESSION:
    case Models.LINEAR_REGRESSION:
      return regressionCode.slice();
  }
};
